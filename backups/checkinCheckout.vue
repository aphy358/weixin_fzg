<template>
  <mt-popup
    v-model="getPopupVisible"
    class="my-popup"
    >

    <div>
      <div class="pop-title">入离日期选择<i class="iconfont icon-delete2" @click="closePopup"></i></div>
      <div class="pop-content-wrap">
        <div class="pop-content-row" @click="openPicker('openPicker1')">
          <label class="pop-content-label">入住</label>
          <span class="pop-content-span">{{ getCheckin }}</span>
          <i class="iconfont icon-down-thin"></i>
        </div>
        <div class="pop-content-row" @click="openPicker('openPicker2')">
          <label class="pop-content-label">离店</label>
          <span class="pop-content-span">{{ getCheckout }}</span>
          <i class="iconfont icon-down-thin"></i>
        </div>
      </div>
    </div>    

  </mt-popup>
</template>

<script>

export default {
  name: 'checkinCheckout',
  data(){
    return {
    }
  },
  props: [],
  components: {
  },
  created(){
  },
  watch: {
  },
  computed: {
    getPopupVisible: {
      get: function () {
        return this.$store.state.hotelList.checkincheckoutPopupVisible
      },
      set: function (newValue) {
        this.$store.commit(`hotelList/setCommonState`, {k: 'checkincheckoutPopupVisible', v: newValue})
      }
    },
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
  },
  mounted(){
  },
  methods:{
    closePopup(){
      this.$store.commit(`hotelList/setCommonState`, {k: 'checkincheckoutPopupVisible', v: false})
    },
    openPicker(picker){
      var _this = this
      _this.$store.commit(`hotelList/setCommonState`, {k: picker, v: true})

      setTimeout(function(){
        _this.$store.commit(`hotelList/setCommonState`, {k: picker, v: false})
      }, 10)
    },
    
  }
}
</script>

<style lang="scss">
.mint-popup{

  &.my-popup{
    width: 2.5rem;

    .pop-title{
      position: relative;
      background: #ff7625;
      color: white;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.16rem;

      .icon-delete2{
        position: absolute;
        right: 0;
        width: 0.4rem;
        text-align: center;
      }
    }

    .pop-content-wrap{
      padding: 0.2rem;
      font-size: 0.15rem;
      width: 1.45rem;
      margin: auto;

      .pop-content-row{
        line-height: 0.4rem;
        overflow: hidden;

        *{
          float: left;
        }

        .pop-content-label{
          color: #999999;
          margin-right: 0.1rem;
        }

        .pop-content-span{
          width: 0.85rem;
        }

        .iconfont{
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>