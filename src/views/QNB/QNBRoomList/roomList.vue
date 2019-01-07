<template>
  <div class="eb-room-list-wrap">

    <ul class="eb-room-type-list">
      <li class="eb-room-type-item" v-for="(n, i) in roomList" :key="i">
          <mt-switch 
            class="switch-comp-wrap" :class="{'disabled': !n.canCutRoom}"  
            v-if="typeFlag == 1" 
            :value="n.canCutRoom"
            @click.native="cutHotelRoom(n)"
            :disabled="!n.canCutRoom">
            
            {{ n.canCutRoom ? '开房' : '关房' }}
          </mt-switch>

					<div class="eb-room-type-row">
						<div class="eb-room-type-row-left">
							<span class="room-name">{{ n.roomTypeName }}</span>
						</div>
					</div>
					
          <div 
            v-for="(o, j) in n.hotelPriceEbDtoList" :key="j"
            class="eb-room-type-row eb-rate-type-item" :class="typeFlag" @click="clickSinglePriceType(o, n)">
            <div class="eb-room-type-row-left">
              <span class="breakfast-name">{{ o.priceTypeName }}</span>
            </div>
            <div class="eb-room-type-row-right">
              <span v-html="typeFlag == 1 ? getRoomStatusText(o) : getRoomPriceText(o)"></span>
              <i class="iconfont icon-right-thin"></i>
            </div>
          </div>

			</li>
    </ul>

    <!-- 房态房价编辑框 popup -->
    <RoomStatusPriceEditPopup 
      :visible="rSPPopupVisible"
      :checkedPriceType="checkedPriceType"
      @hidePopup="hidePopup"
      @refreshData="refreshData"
      :activeDay="activeDay"
      :hotelId="hotelId"
      :formulaType="formulaType"
      :suppId="suppId"
      :typeFlag="typeFlag" />

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { debounce } from 'lodash'
import RoomStatusPriceEditPopup from './roomStatusPriceEditPopup'

export default {
  name: 'roomList',
  data(){
    return {
      // 设置单个房态房价的 popup 显示状态
      rSPPopupVisible: false,

      // 被点击到的价格类型
      checkedPriceType: {
        roomType: '',
        roomTypeName: '',
        showStock: '',
        priceTypeName: '',
        status: '',
        basePrice: '',
        priceType: '',
        roomNumDisable: false
      },
    }
  },
  props: ['roomList', 'typeFlag', 'hotelId', 'suppId', 'activeDay', 'formulaType'],
  components: {
    RoomStatusPriceEditPopup
  },
  watch: {},
  created(){},
  activated(){},
  computed: {},
  mounted(){},
  methods:{
    // 获取房态字符串，0：剩余库存  1畅订  2：待查  3：满房   5不可超售
    getRoomStatusText(price){
      let roomStatusText = ''

      switch(price.status){
        case 0:
          roomStatusText = '<span class="room-status-tag green">剩</span><span class="room-status-text color-gray">剩' + (price.stock - price.sellStock) + '间</span>';
          break;
        case 1:
          roomStatusText = '<span class="room-status-tag green">畅</span>';
          break;
        case 2:
          roomStatusText = '<span class="room-status-tag orange">待</span>';
          break;
        case 3:
          roomStatusText = '<span class="room-status-tag red">满</span>';
          break;
        case 5:
          roomStatusText = '<span class="room-status-tag blue">超</span><span class="room-status-text color-gray">剩' + (price.stock - price.sellStock) + '间</span>';
          break;
        default:
          roomStatusText = ''
      }

      return roomStatusText;
    },
    // 获取房型价格字符串 DOM
    getRoomPriceText(price){
      return `
        <span class="eb-room-price-text1">底:</span><span class="eb-room-price-text2">${price.basePrice}</span>
      `
    },
    refreshData(){
      this.$emit('refreshData')
    },
    // 关房
    cutHotelRoom: debounce(function(n){
      if(n.canCutRoom){
        let params = {
          staticInfoId: this.hotelId,
          checkInDates: this.activeDay,
          roomTypes:    n.roomType,
          priceTypes:   n.hotelPriceEbDtoList.map(o => o.priceType).join(','),
          formulaTypes: this.typeFlag,
          suppId:       this.suppId
        }

        this.$api.qnb.syncQNBCutHotelRoom(params).then(res => {
          if(res.returnCode === 1){
            Toast('当前房型关房成功！')
            this.refreshData()
          }
        })
      }
    }, 10),
    // 点击单个价格类型弹出 popup 进行设置
    clickSinglePriceType(price, room){
      this.showPopup()

      this.checkedPriceType.roomType      = room.roomType
      this.checkedPriceType.roomTypeName  = room.roomTypeName
      this.checkedPriceType.showStock     = price.stock - price.sellStock
      this.checkedPriceType.priceTypeName = price.priceTypeName
      this.checkedPriceType.status        = price.status
      this.checkedPriceType.basePrice     = price.basePrice
      this.checkedPriceType.priceType     = price.priceType

      this.getRoomNumStatus(price.status)
    },
    // 获取 popup 房量输入框的状态
    getRoomNumStatus(status){
      if(status === 1 || status === 2 || status === 3){
        this.checkedPriceType.roomNumDisable = true
			}else{
        this.checkedPriceType.roomNumDisable = false
			}
    },
    // 显示房态房价 popup
    showPopup(){
      this.rSPPopupVisible = true
    },
    // 隐藏房态房价 popup
    hidePopup(){
      this.rSPPopupVisible = false
    },
  }

}
</script>

<style lang="scss">
.eb-room-list-wrap{

  .color-gray,
  .disabled{
    color: #999999;
  }

  .eb-room-type-list{
      overflow: hidden;
      background: #efeff4;
      margin: 0;
  }

  .eb-room-type-item{
    position: relative;
      background: white;
      margin-bottom: 0.1rem;

      .switch-comp-wrap{
        display: block;
        position: absolute;
        right: 0.1rem;
        top: 0.15rem;
        z-index: 99;

        .mint-switch-input:checked + .mint-switch-core::after{
          transform: translateX(0.2rem);
        }
        
        .mint-switch-core{
          width: 0.4rem;
          height: 0.21rem;
          border: 0.01rem solid #d9d9d9;
          border-radius: 0.16rem;

          &::before{
            width: 0.38rem;
            height: 0.19rem;
            border-radius: 0.15rem;
          }

          &:after{
            width: 0.18rem;
            height: 0.18rem;
            border-radius: 0.15rem;
          }
        }

        .mint-switch-label{
          float: left;
          margin-right: 0.05rem;
        }

        &.disabled{
          .mint-switch-label{
            color: #cccccc;
          }
        }
      }
  }

  .eb-room-type-row{
    position: relative;
    height: 0.5rem;
      line-height: 0.5rem;
      padding: 0 0.1rem;
  }

  .eb-room-type-row:after{
      content: '';
      transform-origin: 50% 100%;
      border-bottom: 0.01rem solid rgba(200, 199, 204, 0.65);
      width: 100%;
      height: 0;
      transform: scaleY(0.5);
      position: absolute;
      left: 0;
      bottom: 0;
  }

  .eb-room-price-text1{
    float: left;
      color: #E699D9;
      font-size: 0.1rem;
  }

  .eb-room-price-text2{
    float: left;
      color: #EF38D0;
  }

  .eb-room-type-row .icon-right-thin{
      color: rgba(200, 199, 204, 0.8);
      font-size: 0.12rem;
      float: right;
  }

  .eb-room-type-row:last-child:after{
      content: none;
  }

  .eb-room-type-row-left{
      float: left;
      width: 60%;
      margin-right: 0.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }

  .eb-room-type-row-left .room-name{
    border-left: 0.03rem solid #ff7625;
      padding-left: 0.08rem;
  }

  .eb-room-type-row-left .breakfast-name{
      padding-left: 0.11rem;
  }

  .eb-room-type-row-right{

  }

  .eb-room-type-row-right .room-status-tag{
      font-size: 0.1rem;
      border-radius: 0.03rem;
      float: left;
      width: 0.16rem;
      height: 0.16rem;
      margin-top: 0.17rem;
      margin-right: 0.1rem;
      text-align: center;
      line-height: 0.16rem;
  }

  .eb-room-type-row-right .room-status-tag.red{
      background: #FFCCCC;
      color: #F74363;
  }

  .eb-room-type-row-right .room-status-tag.green{
    background: #CCFAEC;
    color: #00AE73;
  }

  .eb-room-type-row-right .room-status-tag.blue{
    background: #DCE5FC;
    color: #4A72E1;
  }

  .eb-room-type-row-right .room-status-tag.orange{
    background: #FCECD3;
    color: #FF8400;
  }

  .room-status-text{
    float: left;
    font-size: 0.12rem;
  }
  .color-pink{
      color: #F74363;
      margin: 0 0.02rem;
  }


}
</style>