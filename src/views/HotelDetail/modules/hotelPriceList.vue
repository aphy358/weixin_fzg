<template>
  <div class="">

    <transition @leave="loadLeave">
      <div v-if="slowLoading || roomTypeBasesShow.length < 1" class="slow-load">{{ slowLoading ? '正在加载最新价格...' : '无可预订房间！' }}</div>
    </transition>

    <!-- <Loading v-if="loading" /> -->

    <div class="hotel-price-wrap">
      <ul class="hotel-roomtype-list">
        <li v-for="(n, i) in roomTypeBasesShow" :key="i" class="hotel-roomtype-item">
          <div class="hotel-roomtype-name-head" @click="switchPriceShow(i)">
            <p class="roomtype-name">
              <i v-if="n.recommend" class="iconfont icon-hot" style="color: orange;font-size: 0.14rem;"></i>
              {{ n.roomName }}
            </p>
            <div class="roomtype-price-wrap">
              日均
              <span class="red" style="margin-left: 0.02rem;">￥</span>
              <span class="red price" style="margin-right: 0.02rem;">{{ n.lowestAverage }}</span>
              起
              <i class="iconfont" :class="[n.ifShow ? 'icon-up-thin' : 'icon-down-thin']"></i>
            </div>
          </div>

          <transition name="slide-fade"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
            >
            <div class="hotel-roomtype-price-wrap" v-show="n.ifShow">
              <ul class="hotel-roomtype-price-list">
                <li v-for="(m, j) in n.roomTypePrices" :key="j" class="hotel-roomtype-price-item">
                  <div class="breakfast-bedtype">
                    <i v-if="m.isHasMarketing" class="iconfont icon-gift" style="color:#FE4BB7;"></i>
                    {{ m.rateTypeName }} {{ m.bedTypeName }}
                  </div>
                  <div class="order-clause">{{ m.orderClauseText }}</div>
                  <div class="cancel-type">{{ m.cancellationText }}</div>
                  <div class="room-status"><span v-html="m.roomStatusText"></span></div>
                  <div class="right-outer">
                    <div class="price-wrap">
                      日均<span class="red">￥</span>
                      <span class="red price">{{ m.averagePriceRMB }}</span>
                    </div>
                    <div class="price-wrap">
                      总价<span>￥</span>
                      <span class="price gray">{{ m.totalPriceRMB }}</span>
                    </div>
                    <div v-if="m.isBook" class="book-btn" @click="goOrderWrite(m)">预订</div>
                    <div v-else class="book-btn disable">满房</div>
                  </div>
                </li>
              </ul>
            </div>
          </transition>

        </li>
      </ul>
    </div>

    <!-- <div v-if="roomTypeBasesShow.length < 1 && !loading && !slowLoading" style="text-align: center;margin: 0.3rem 0;color: #ea2c2c;">无可预订房间！</div> -->

    <END v-if="!loading && roomTypeBasesShow.length > 0" />

  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import END from '@/components/END.vue'
import { queryString } from '@/assets/util'
import Velocity from 'velocity-animate'
import { debounce } from 'lodash'
import { gotoPage } from '@/assets/util'

export default {
  name: 'hotelPriceList',
  data(){
    return {
      // 用于标记是否已经查过价了
      loading: false,
      // 用于标记是否在实查
      slowLoading: false,
      // 普通的房型价格
      roomTypeBases: [],
      // 推荐的房型价格
      roomTypeBasesRecommend: [],
      // 全部显示的房型价格，包含普通房型和推荐房型
      roomTypeBasesShow: [],
      hotelId: null,
    }
  },
  props: {},
  components: {
    Loading,
    END,
  },
  watch: {
    getCheckin(){
      this.initQueryString()
      this.reQueryHotelPrice()
    },
    getCheckout(){
      this.initQueryString()
      this.reQueryHotelPrice()
    },
    getAdultNum(){
      this.initQueryString()
      this.reQueryHotelPrice()
    },
    getChildrenStr(){
      this.initQueryString()
      this.reQueryHotelPrice()
    },
    getCurHotel(){
      this.initQueryString()
      this.reQueryHotelPrice()
    }
  },
  created(){
  },
  activated(){
    if(!window.goBack){
      this.initQueryString()
      this.reQueryHotelPrice()
    }
  },
  computed: {
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
    getAdultNum(){
      return this.$store.state.adultNum
    },
    getChildrenNum(){
      return this.$store.state.childrenNum
    },
    getChildrenStr(){
      return this.$store.state.childrenStr
    },
    getCurHotel(){
      return this.$store.state.curHotel
    }
  },
  mounted(){},
  methods:{
    // 重新查询酒店价格
    reQueryHotelPrice: debounce(function(){
      this.resetData()
      this.queryHotelPrice()
    }, 100),
    // 重新设置数据
    resetData(){
      this.loading = false
      this.slowLoading = false
      this.roomTypeBases = []
      this.roomTypeBasesRecommend = []
      this.roomTypeBasesShow = []
    },
    // 处理 queryString 带过来的参数
    initQueryString(){
      let infoId = this.$store.state.curHotel ? this.$store.state.curHotel.infoId : null
      this.hotelId = queryString('hotelId') || infoId
      let cityType = queryString('cityType') || this.$store.state.cityType

      // 如果 queryString 上传过来的 cityType 和 store 里存的 cityType 不相等，则说明这种情况不是从酒店列表页点击进的酒店详情页
      if(cityType && cityType != this.$store.state.cityType){ 
        this.$store.commit(`setCityType`, cityType)
      }
    },
    // 查询酒店价格
    queryHotelPrice(){
      if(this.loading) return
      this.loading = true
      this.slowLoading = true

      let param = {
        checkInDate: this.getCheckin,
        checkOutDate: this.getCheckout,
        hotelId: this.hotelId,
        roomNum: 1,
        adultNum: this.getAdultNum || 2,
        childrenNum: this.getChildrenNum || 0,
        childrenAgesStr: this.getChildrenStr || '',
        isSearchSurcharge: 0
      }

      // 查落地
      this.$api.hotelDetail.syncGetHotelPriceListInStock(param).then(res => {
        this.loading = false
        if(res.returnCode === 1){
          this.roomTypeBases = res.data.roomTypeBases || []
          this.roomTypeBasesRecommend = res.data.roomTypeBasesRecommend || []

          this.roomTypeBasesRecommend.forEach(n => n.recommend = true)
          this.roomTypeBasesShow = this.roomTypeBasesRecommend.concat(this.roomTypeBases)

          this.processRoomTypeBases()
        }
      })

      // 实查
      this.$api.hotelDetail.syncGetHotelPriceList(param).then(res => {
        this.slowLoading = false
        if(res.returnCode === 1){
          this.roomTypeBases = res.data.roomTypeBases || []
          this.roomTypeBasesRecommend = res.data.roomTypeBasesRecommend || []

          this.roomTypeBasesRecommend.forEach(n => n.recommend = true)
          this.roomTypeBasesShow = this.roomTypeBasesRecommend.concat(this.roomTypeBases)

          this.processRoomTypeBases()
        }
      })
    },
    // 将返回的价格列表数据进一步的加工，以适用于 html 模板
    processRoomTypeBases(){
      for (let i = 0; i < this.roomTypeBasesShow.length; i++) {
        const roomTypeBase = this.roomTypeBasesShow[i];

        roomTypeBase.roomTypePrices = roomTypeBase.roomTypePrices.filter(n => n.isBook) // 过滤掉所有不可预订的价格
        if(roomTypeBase.roomTypePrices.length < 1){
          this.roomTypeBasesShow.splice(i--, 1)
          continue
        }

        roomTypeBase.ifShow = i == 0 ? true : false
        roomTypeBase.lowestAverage = Math.min.apply(null, roomTypeBase.roomTypePrices.map(n => n.averagePriceRMB))

        for (let j = 0; j < roomTypeBase.roomTypePrices.length; j++) {
          const p = roomTypeBase.roomTypePrices[j]
          p.cancellationText = p.isCanCancle ? '可取消' : '不可取消'
          this.setRoomStatusText(p)
          this.setOrderClause(p)
        }
      }
    },
    switchPriceShow(i){
      const roomTypeBase = this.roomTypeBasesShow[i]
      roomTypeBase.ifShow = !roomTypeBase.ifShow
      this.roomTypeBasesShow.splice(0, 0)
    },
    // 设置预订条款的显示
    setOrderClause(roomTypePrice) {
      // 预定条款不区分每一天，所有只拿第一天的数据进行计算
      let reserveShowArr = roomTypePrice.nightlyPriceList[0].reserveShow.split(/[|;]/)
      let clauses = []
      
      for (var j = 0; j < reserveShowArr.length; j++) {
        var o = reserveShowArr[j];
        ~o.indexOf('限住') ? clauses.push({name: '限制晚数', tip: o}) :
        ~o.indexOf('提前') ? clauses.push({name: '提前预订', tip: o}) :
        ~o.indexOf('至少连住') ? clauses.push({name: '至少连住', tip: o}) :
				~o.indexOf('最大连住') ? clauses.push({name: '最大连住', tip: o}) :
        ~o.indexOf('连住') ? clauses.push({name: '连住多晚', tip: o}) :
        ~o.indexOf('时间') ? clauses.push({name: '限时预订', tip: o}) :
        ~o.indexOf('间数') ? clauses.push({name: '限制间数', tip: o}) :
        ~o.indexOf('没有') ? clauses.push({name: '无预订条款', tip: o}) : ''
      }

      roomTypePrice.orderClauses = clauses
      roomTypePrice.orderClauseText = clauses.map(n => n.name).join('/')
    },
    // 设置房态的显示，如：'60秒确认'、'满房'、'畅订' 等...
    setRoomStatusText(p) {
      // 设置房态显示    0：剩余库存  1畅订  2：待查  3：满房 5不可超售
      if (p.roomStatus === 3) {
        p.roomStatusText = '<span class="red">满房</span>';
      } else if (p.roomStatus === 2) {
        p.roomStatusText = '<span class="purple">待查</span>';
      } else if (p.roomStatus === 0 || p.roomStatus === 5) {
        p.roomStatusText =
          p.isTimeLimitConfirSupplier === 1
            ? '<span class="blue">60秒确认</span>'
            : '剩余库存';
      } else if (p.roomStatus === 1) {
        p.roomStatusText =
          p.isTimeLimitConfirSupplier === 1
            ? '<span class="blue">60秒确认</span>'
            : '<span class="green">畅订</span>';
      }
      
      if (p.roomStatusText === '剩余库存') {
        let stockArr = [];
        for (var k = 0; k < p.nightlyPriceList.length; k++) {
          var q = p.nightlyPriceList[k];
          if (q.status === 1) {
            q.stock = 999;
          }	// 畅订情况下库存为 0 ！
          stockArr.push(q.stock - q.sellStock);
        }
        
        let minStock = Math.min.apply(this, stockArr);
        p.roomStatusText =
          minStock < 1
            ? '<span class="red">满房</span>'
            : '<span class="green">剩余 [' + Math.min.apply(this, stockArr) + ']</span>';
      }
    },


    enter: function (el, done) {
      let liCount = el.querySelectorAll('.hotel-roomtype-price-item').length
      el.style.height = '0rem'
      Velocity(el, {height: liCount * 1.18 + 'rem'}, {duration: 300, complete: done})
    },
    afterEnter: function (el) {
      el.removeAttribute('style')
      el.style.display = 'block'
    },
    leave: function (el, done) {
      let liCount = el.querySelectorAll('.hotel-roomtype-price-item').length
      el.style.height = liCount * 1.18 + 'rem'
      Velocity(el, {height: '0rem'}, {duration: 300, complete: done})
    },
    afterLeave: function (el) {
      el.removeAttribute('style')
      el.style.display = 'none'
    },
    goOrderWrite(m){
      let obj = {
        staticInfoId: m.hotelId,
        hotelId: m.hotelId,
        supplierId: m.supplierId,
        roomId: m.roomId,
        breakFastId: m.breakFastId,
        paymentType: m.paymentType,
        rateType: m.rateType,
        isQueryPrice: true,
        startDate: this.$store.state.checkin,
        endDate: this.$store.state.checkout,
        citytype: this.$store.state.cityType,
        adultNum: this.$store.state.adultNum,
        childrenNum: this.$store.state.childrenNum,
        childrenAgeStr: this.$store.state.childrenStr,
        roomNum: this.$store.state.roomNum,
      };
  
      if (m.hasOwnProperty('isHasMarketing') && m.isHasMarketing === 1) {
        obj.isHasMarketing = m.isHasMarketing;
        obj.marketingPrice = m.marketing.marketingPrice;
        obj.startTime = m.marketing.startTime;
        obj.endTime = m.marketing.endTime;
      }
      
      //设置hotelPriceStr
      sessionStorage.setItem('hotelPriceStr', encodeURIComponent(window.JSON.stringify(m)));
      gotoPage(this.$router, 'orderWrite', obj);
      
    },

    loadLeave: function (el, done) {
      Velocity(el, {height: '0rem'}, {duration: 300, complete: done})
    },
  }
}
</script>

<style lang="scss">
.slow-load{
  text-align: center;
  color: orangered;
  padding-bottom: 0.05rem;
  height: 0.2rem;
  line-height: 0.2rem;
}

.hotel-price-wrap{
  margin: 0 0.05rem;

  @at-root .hotel-roomtype-list{

    @at-root .hotel-roomtype-item{
      position: relative;
      background: white;
      margin-bottom: 0.05rem;

      @at-root .hotel-roomtype-name-head{
        position: relative;
        padding: 0 0.1rem;
        overflow: hidden;
  
        .roomtype-name{
          font-size: 0.16rem;
          height: 0.24rem;
          padding: 0.15rem 0;
          color: #576690;
          width: 500%;
        }
  
        .roomtype-price-wrap{
          position: absolute;
          height: 0.3rem;
          line-height: 0.3rem;
          top: 0.12rem;
          right: 0;
          font-size: 0.1rem;
          color: #999999;
          background: white;
          padding-right: 0.1rem;
          box-shadow: 0 0 0.2rem 0.3rem white;
  
          .red{
            color: #E8010F;
          }
  
          .price{
            font-size: 0.18rem;
          }

          .iconfont{
            font-size: 0.1rem;
          }
        }
      }

      @at-root .hotel-roomtype-price-wrap{
        overflow: hidden;
        padding-bottom: 0.05rem;

        @at-root .hotel-roomtype-price-list{

          @at-root .hotel-roomtype-price-item{
            position: relative;
            padding: 0.1rem;
            box-sizing: border-box;
            background: #FAFAFA;
            margin: 0 0.1rem 0.05rem;
            border-radius: 0.03rem;
            overflow: hidden;

            .breakfast-bedtype{
              color: #666;
              width: 500%;
              margin-bottom: 0.05rem;
            }

            .order-clause{
              color: #999;
              margin-bottom: 0.02rem;
            }

            .cancel-type{
              color: #999;
              margin-bottom: 0.02rem;
            }

            .room-status{

              .red{
                  color: #ff6666;
              }

              .purple{
                  color: #ffa825;
              }

              .orange{
                  color: orange;
              }

              .blue{
                  color: #3366cc;
              }

              .green{
                  color: #4cba92;
              }
            }

            .right-outer{
              position: absolute;
              top: 0;
              right: 0;
              width: 0.8rem;
              padding: 0.2rem 0.1rem 0.2rem 0;
              text-align: right;
              box-shadow: 0 0 0.1rem 0.1rem #FAFAFA;
              background: #FAFAFA;

              .price-wrap{
                font-size: 0.1rem;
                color: #999999;

                .red{
                  color: #E8010F;
                }

                .price{
                  font-size: 0.16rem;

                  &.gray{
                    font-size: 0.12rem;
                  }
                }

              }

              .book-btn{
                float: right;
                background: #0BC071;
                color: white;
                height: 0.25rem;
                line-height: 0.25rem;
                width: 0.5rem;
                text-align: center;
                border-radius: 0.02rem;
                font-size: 0.14rem;

                &.disable{
                  background: #ccc;
                }
              }
            }

          }
        }
      }

    }

  }
}
</style>