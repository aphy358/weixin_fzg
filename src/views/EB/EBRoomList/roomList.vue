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

    <mt-popup
      v-model="setRSPPopupVisible"
      position="bottom">

      <div class="rsp-popup-wrap">
        <div class="rsp-toolbar">
          <button @click="hidePopup">取消</button>
          <button class="submit" @click="saveRoomStatusAndPrice">保存</button>
        </div>

        <div class="rsp-popup-inner">
          <div class="rsp-popup-block rsp-popup-fline">
            <div>{{ activeDay }}</div>
            <div style="text-align: center;">{{ checkedPriceType.roomTypeName }}</div>
            <div style="text-align: right;">{{ checkedPriceType.priceTypeName }}</div>
          </div>

          <div v-if="typeFlag == 1">
            <div class="rsp-popup-title">房态</div>
            <div class="rsp-popup-block">
              <ul class="rsp-room-status-list">
                <li class="rsp-room-status-item" :class="{'active': checkedPriceType.status == 3}" @click="swithPopupRoomStatus(3)">满房</li>
                <li class="rsp-room-status-item" :class="{'active': checkedPriceType.status == 0}" @click="swithPopupRoomStatus(0)">剩余库存</li>
                <li class="rsp-room-status-item" :class="{'active': checkedPriceType.status == 2}" @click="swithPopupRoomStatus(2)">待查</li>
                <li class="rsp-room-status-item" :class="{'active': checkedPriceType.status == 5}" @click="swithPopupRoomStatus(5)">不可超售</li>
                <li class="rsp-room-status-item" :class="{'active': checkedPriceType.status == 1}" @click="swithPopupRoomStatus(1)">畅订</li>
              </ul>
            </div>

            <div class="rsp-popup-title">房量</div>
            <div class="rsp-popup-block">
              <div class="rsp-room-num-wrap">
                <i class="iconfont icon-minus2" style="color: #ea6868;" @click="minusRoomNum"></i>
                <input
                  v-if="!checkedPriceType.roomNumDisable"
                  v-model="checkedPriceType.showStock" 
                  @input="inputRoomNum" 
                  @keyup="inputRoomNum" />
                <input v-else type="text" disabled>
                <i class="iconfont icon-plus2" style="color: #89BFF5;" @click="plusRoomNum"></i>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="rsp-popup-title">底价</div>
            <div class="rsp-popup-block">
              <div class="rsp-room-price-wrap">
                <span>RMB</span>
                <input type="number" v-model="checkedPriceType.basePrice" />
              </div>
            </div>
          </div>

        </div>
        
      </div>
    </mt-popup>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { debounce } from 'lodash'

export default {
  name: 'roomList',
  data(){
    return {
      // 设置单个房态房价的 popup 显示状态
      setRSPPopupVisible: false,

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
  props: ['roomList', 'typeFlag', 'hotelId', 'activeDay', 'formulaType'],
  components: {},
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
    // 关房
    cutHotelRoom: debounce(function(n){
      if(n.canCutRoom){
        let params = {
          staticInfoId: this.hotelId,
          checkInDates: this.activeDay,
          roomTypes: n.roomType,
          priceTypes: n.hotelPriceEbDtoList.map(o => o.priceType).join(','),
          formulaTypes: this.typeFlag,
        }

        this.$api.eb.syncEBCutHotelRoom(params).then(res => {
          if(res.returnCode === 1){
            Toast('当前房型关房成功！')
            this.$emit('refreshData')
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
      this.setRSPPopupVisible = true
    },
    // 隐藏房态房价 popup
    hidePopup(){
      this.setRSPPopupVisible = false
    },
    // 点击 '保存'
    saveRoomStatusAndPrice(){
      this.hidePopup()

      let params = {
        staticInfoId: this.hotelId,
				checkInDates: this.activeDay,
				roomTypes:    this.checkedPriceType.roomType,
				priceTypes:   this.checkedPriceType.priceType,
				formulaTypes: this.formulaType,
				status:       this.checkedPriceType.status,
      }
      
      this.typeFlag == 1 
        ? this.saveRoomStatus(params) 
        : this.saveRoomPrice(params)
    },
    // 保存房态
    saveRoomStatus(params){
      params.remainStock = this.checkedPriceType.showStock

      this.$api.eb.syncEBSaveRoomStatus(params).then(res => {
        if(res.returnCode === 1){
          this.$emit('refreshData')
        }
      })
    },
    // 保存房价
    saveRoomPrice(params){
      params.basePrice = this.checkedPriceType.basePrice

      this.$api.eb.syncEBSaveRoomPrice(params).then(res => {
        if(res.returnCode === 1){
          this.$emit('refreshData')
        }
      })
    },
    // 切换 popup 房态，0：剩余库存  1畅订  2：待查  3：满房   5不可超售
    swithPopupRoomStatus(status){
      this.checkedPriceType.status = status
      this.getRoomNumStatus(status)
    },
    // 减少房量   
    minusRoomNum(){
      if(!this.checkedPriceType.roomNumDisable && +this.checkedPriceType.showStock > 0){
        --this.checkedPriceType.showStock
      }
    },
    // 增加房量
    plusRoomNum(){
      if(!this.checkedPriceType.roomNumDisable){
        ++this.checkedPriceType.showStock
      }
    },
    // 编辑房量
    inputRoomNum(){
      this.checkedPriceType.showStock = parseInt(this.checkedPriceType.showStock) || 0
    }
    
  }

}
</script>

<style scoped lang="scss">
.rsp-popup-wrap{

  @at-root .rsp-toolbar{

    button {
			border: none;
			width: 50%;
			background: #f0f0f0;
			color: #666666;
			height: 0.4rem;
			font-size: 0.16rem;
			
			&.submit {
				color: white;
				background: #ff7625;
			}
		}
  }

  @at-root .rsp-popup-inner{
    background: #efeff4;

    @at-root .rsp-popup-title{
      padding: 0.15rem 0.1rem 0.05rem;
      color: #3399FF;
    }
    
    @at-root .rsp-popup-block{
      background: white;
      padding: 0.15rem 0.1rem;

      @at-root .rsp-popup-fline{
        display: flex;
        padding: 0.2rem 0.1rem;
        font-size: 0.15rem;

        div{
          flex: 1;
          justify-content: space-between;
          color: #435f7d;
          line-height: 0.15rem;
        }
      }

      @at-root .rsp-room-status-list{
        display: flex;
        justify-content: space-between;

        @at-root .rsp-room-status-item{
          width: 0.6rem;
          text-align: center;
          border: 1px solid rgba(255, 118, 37, 0.8);
          height: 0.25rem;
          line-height: 0.25rem;
          border-radius: 0.02rem;
          font-size: 0.12rem;
          color: rgba(255, 118, 37, 0.8);

          &.active{
            color: white;
            background: rgba(255, 118, 37, 0.8);
            border-color: rgba(255, 118, 37, 0.8);
          }
        }
      }

      @at-root .rsp-room-num-wrap{
        overflow: hidden;

        &>*{
          float: left;
          height: 0.25rem;
          line-height: 0.25rem;
        }

        input{
          box-sizing: border-box;
          width: 0.8rem;
          margin: 0 0.1rem;
          padding: 0 0.05rem;
          border: 1px solid #ccc;
        }

        .iconfont{
          font-size: 0.22rem;
        }
      }

      @at-root .rsp-room-price-wrap{
        overflow: hidden;

        &>*{
          float: left;
          height: 0.25rem;
          line-height: 0.25rem;
        }

        input{
          box-sizing: border-box;
          width: 0.8rem;
          margin-left: 0.02rem;
          padding: 0 0.05rem;
          border: 1px solid #ccc;
        }
      }

    }
  }
}
</style>

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