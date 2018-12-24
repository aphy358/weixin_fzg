<template>
  <mt-popup
    v-model="rSPPopupVisible"
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
</template>

<script>

export default {
  name: 'roomStatusPriceEditPopup',
  data(){
    return {
      rSPPopupVisible: false
    }
  },
  props: ['visible', 'checkedPriceType', 'activeDay', 'formulaType', 'typeFlag'],
  components: {},
  watch: {
    visible(){
      this.rSPPopupVisible = this.visible
    },
    rSPPopupVisible(){
      if(!this.rSPPopupVisible){
        this.hidePopup()
      }
    }
  },
  created(){},
  activated(){},
  computed: {},
  mounted(){},
  methods:{
    // 隐藏房态房价 popup
    hidePopup(){
      this.$emit('hidePopup')
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
    // 获取 popup 房量输入框的状态
    getRoomNumStatus(status){
      if(status === 1 || status === 2 || status === 3){
        this.checkedPriceType.roomNumDisable = true
			}else{
        this.checkedPriceType.roomNumDisable = false
			}
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