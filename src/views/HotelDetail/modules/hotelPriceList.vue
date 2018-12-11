<template>
  <div class="">
    <Loading v-if="!loadedPrice" />

    <div class="hotel-price-wrap">
      <ul class="hotel-roomtype-list">
        <li v-for="(n, i) in roomTypeBases" :key="i" class="hotel-roomtype-item line-after">
          <div class="hotel-roomtype-name-head" @click="switchPriceShow(i)">
            <p class="roomtype-name">{{ n.roomName }}</p>
            <div class="roomtype-price-wrap">
              日均<span class="red">￥</span><span class="red price">200</span>起
              <i class="iconfont" :class="[n.ifShow ? 'icon-up-thin' : 'icon-down-thin']"></i>
            </div>
          </div>

          <div class="hotel-roomtype-price-wrap" v-show="n.ifShow">
            <ul class="hotel-roomtype-price-list">
              <li v-for="(m, j) in n.roomTypePrices" :key="j" class="hotel-roomtype-price-item">
                <div class="breakfast-bedtype">{{ m.rateTypeName }} {{ m.bedTypeName }}</div>
                <div class="rate-type">{{ m.roomName }}</div>
                <div class="cancel-type">不可取消</div>
                <div class="room-status">剩余 [1]</div>
                <div class="right-outer">
                  <div class="price-wrap">
                    日均<span class="red">￥</span>
                    <span class="red price">{{ m.totalPriceRMB }}</span>
                  </div>
                  <div class="book-btn">预订</div>
                </div>
              </li>
            </ul>
          </div>

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

export default {
  name: 'hotelPriceList',
  data(){
    return {
      // 用于标记是否已经查过价了
      loadedPrice: false,
      hotelId: null,
      roomTypeBases: [],
    }
  },
  props: {},
  components: {
    Loading,
    END,
  },
  watch: {},
  created(){
  },
  activated(){
    this.resetData()
    this.initQueryString()
    this.queryHotelPrice()
  },
  computed: {
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
  },
  mounted(){},
  methods:{
    // 重新设置数据
    resetData(){
      this.loadedPrice = false
      this.hotelId = null
      this.roomTypeBases = []
    },
    // 处理 queryString 带过来的参数
    initQueryString(){
      this.hotelId = queryString('hotelId')
      let cityType = queryString('cityType')

      if(cityType != this.$store.state.cityType){ // 如果 queryString 上传过来的 cityType 和 store 里存的 cityType 不相等，则说明这种情况不是从酒店列表页点击进的酒店详情页
        this.$store.commit(`setCityType`, cityType)
      }
    },
    queryHotelPrice(){
      let param = {
        startDate: this.getCheckin,
        endDate: this.getCheckout,
        hotelId: this.hotelId,
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
          console.log(this.roomTypeBases);
        }
      })
    },
    processRoomTypeBases(){
      console.log(this.roomTypeBases);
      
      for (let i = 0; i < this.roomTypeBases.length; i++) {
        const roomTypeBase = this.roomTypeBases[i];

        if(i == 0){
          roomTypeBase.ifShow = true
        }else{
          roomTypeBase.ifShow = false
        }
      }
    },
    switchPriceShow(i){
      const roomTypeBase = this.roomTypeBases[i]
      roomTypeBase.ifShow = !roomTypeBase.ifShow
      this.roomTypeBases.splice(0, 0)
    }
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
  
        .roomtype-name{
          font-size: 0.16rem;
          padding: 0.15rem 0;
          color: #576690;
        }
  
        .roomtype-price-wrap{
          position: absolute;
          height: 0.3rem;
          line-height: 0.3rem;
          top: 0.12rem;
          right: 0.1rem;
          font-size: 0.1rem;
          color: #999999;
  
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

        @at-root .hotel-roomtype-price-list{

          @at-root .hotel-roomtype-price-item{
            position: relative;
            padding: 0.12rem 0.1rem;

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

            .rate-type{
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
              right: 0.1rem;
              text-align: right;

              .price-wrap{
                font-size: 0.1rem;
                color: #999999;

                .red{
                  color: #E8010F;
                }

                .price{
                  font-size: 0.18rem;
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
              }
            }

          }
        }
      }

    }

  }
}
</style>