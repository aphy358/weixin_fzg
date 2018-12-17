<template>
  <div style="background: white;" class="">
    <Loading v-if="!loadedPrice" />

    <div class="hotel-price-wrap">
      <ul class="hotel-roomtype-list">
        <li v-for="(n, i) in roomTypeBases" :key="i" class="hotel-roomtype-item line-after">
          <div class="hotel-roomtype-name-head" @click="switchPriceShow(i)">
            <p class="roomtype-name">{{ n.roomName }}</p>
            <div class="roomtype-price-wrap">
              日均<span class="red">￥</span><span class="red price">{{ n.lowestAverage }}</span>起
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
                  <div class="breakfast-bedtype">{{ m.rateTypeName }} {{ m.bedTypeName }}</div>
                  <div class="order-clause">{{ m.orderClauseText }}</div>
                  <div class="cancel-type">{{ m.cancellationText }}</div>
                  <div class="room-status">{{ m.roomStatusText || '占位' }}</div>
                  <div class="right-outer">
                    <div class="price-wrap">
                      日均<span class="red">￥</span>
                      <span class="red price">{{ m.averagePriceRMB }}</span>
                    </div>
                    <div v-if="m.isBook" class="book-btn">预订</div>
                    <div v-else class="book-btn disable">满房</div>
                  </div>
                </li>
              </ul>
            </div>
          </transition>

        </li>
      </ul>
    </div>

    <END v-if="loadedPrice && roomTypeBases.length > 0" />

  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import END from '@/components/END.vue'
import { queryString } from '@/assets/util'
import Velocity from 'velocity-animate'
import { debounce } from 'lodash'

export default {
  name: 'hotelPriceList',
  data(){
    return {
      // 用于标记是否已经查过价了
      loadedPrice: false,
      roomTypeBases: [],
    }
  },
  props: {},
  components: {
    Loading,
    END,
  },
  watch: {
    getCheckin(){
      this.reQueryHotelPrice()
    },
    getCheckout(){
      this.reQueryHotelPrice()
    },
    getAdultNum(){
      this.reQueryHotelPrice()
    },
    getChildrenStr(){
      this.reQueryHotelPrice()
    },
  },
  created(){
  },
  activated(){
    if(sessionStorage.getItem('queryHotelPrice')){
      this.reQueryHotelPrice()
      sessionStorage.removeItem('queryHotelPrice')
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
    getChildrenStr(){
      return this.$store.state.childrenStr
    },
  },
  mounted(){},
  methods:{
    // 重新查询酒店价格
    reQueryHotelPrice: debounce(function(){
      this.resetData()
      this.initQueryString()
      this.queryHotelPrice()
    }, 300),
    // 重新设置数据
    resetData(){
      this.loadedPrice = false
      this.roomTypeBases = []
    },
    // 处理 queryString 带过来的参数
    initQueryString(){
      let cityType = queryString('cityType')

      if(cityType != this.$store.state.cityType){ // 如果 queryString 上传过来的 cityType 和 store 里存的 cityType 不相等，则说明这种情况不是从酒店列表页点击进的酒店详情页
        this.$store.commit(`setCityType`, cityType)
      }
    },
    // 查询酒店价格
    queryHotelPrice(){
      let param = {
        startDate: this.getCheckin,
        endDate: this.getCheckout,
        hotelId: queryString('hotelId'),
        roomNum: 1,
        adultNum: 2,
        childrenNum: 0,
        childrenAgesStr: ''
      }

      this.$api.hotelDetail.syncGetHotelPriceList(param).then(res => {
        this.loadedPrice = true
        if(res.returnCode === 1){
          this.roomTypeBases = res.data.roomTypeBases || []
          this.processRoomTypeBases()
        }
      })
    },
    // 将返回的价格列表数据进一步的加工，以适用于 html 模板
    processRoomTypeBases(){
      console.log(this.roomTypeBases);
      
      for (let i = 0; i < this.roomTypeBases.length; i++) {
        const roomTypeBase = this.roomTypeBases[i];

        roomTypeBase.ifShow = i == 0 ? true : false
        roomTypeBase.lowestAverage = Math.min.apply(null, roomTypeBase.roomTypePrices.map(n => n.averagePriceRMB))

        for (let j = 0; j < roomTypeBase.roomTypePrices.length; j++) {
          const p = roomTypeBase.roomTypePrices[j]
          p.cancellationText = p.cancellationType ? '可取消' : '不可取消'
          this.setRoomStatusText(p)
          this.setOrderClause(p)
          
        }
      }
    },
    switchPriceShow(i){
      const roomTypeBase = this.roomTypeBases[i]
      roomTypeBase.ifShow = !roomTypeBase.ifShow
      this.roomTypeBases.splice(0, 0)
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
  }
}
</script>

<style lang="scss">
.hotel-price-wrap{

  @at-root .hotel-roomtype-list{

    @at-root .hotel-roomtype-item{
      position: relative;

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
        background: #FAFAFA;
        overflow: hidden;

        @at-root .hotel-roomtype-price-list{

          @at-root .hotel-roomtype-price-item{
            position: relative;
            padding: 0.12rem 0.15rem;
            box-sizing: border-box;

            &:before{
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              border-bottom: 0.01rem solid #e2e2e2;
              width: 100%;
              transform: scaleY(0.5);
              transform-origin: 50% 100%;
              z-index: 15;
            }

            .breakfast-bedtype{
              color: #666;
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
              color: #3CAC84;
            }

            .right-outer{
              position: absolute;
              top: 0.3rem;
              right: 0.15rem;
              text-align: right;

              .price-wrap{
                font-size: 0.1rem;
                color: #999999;

                .red{
                  color: #E8010F;
                }

                .price{
                  font-size: 0.16rem;
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