<template>
  <mt-popup
    v-model="getHotelMapPopupVisible"
    position="right">
  
    <div class="hotel-info-wrap" :getCurHotel="getCurHotel">
      <!-- 头部 -->
      <mt-header title="酒店地图"></mt-header>

      <!-- 返回 -->
      <GoBack _style="top: 0.02rem" :onClick="clickGoBack" />

      <div class="h-i-wrap" v-if="getCurHotel">

        
      

      </div>

    </div>

  </mt-popup>
</template>

<script>
import GoBack from '@/components/GoBack.vue'

export default {
  name: 'hotelMapPopup',
  data(){
    return {
    }
  },
  props: {},
  components: {
    GoBack
  },
  watch: {
    $route(to, from) {
      // 切换页面时隐藏 popup
      this.hidePopup()
    },
  },
  created(){},
  computed: {
    getHotelMapPopupVisible: {
      get: function () {
        return this.$store.state.hotelDetail.hotelMapPopupVisible
      },
      set: function (newValue) {
        this.$store.commit(`hotelDetail/setCommonState`, {k: 'hotelMapPopupVisible', v: newValue})
      }
    },
    getCurHotel(){
      return this.$store.state.curHotel
    }
  },
  mounted(){},
  methods:{
    // 点击回退按钮
    clickGoBack(){
      this.hidePopup()
    },
    // 隐藏 popup
    hidePopup(){
      this.$store.commit(`hotelDetail/setCommonState`, {k: 'hotelMapPopupVisible', v: false})
    }
  }
}
</script>

<style lang="scss">
.hotel-info-wrap{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: white;
  box-sizing: border-box;

  .h-i-wrap{
    position: relative;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    padding: 0 0.1rem;
    overflow-x: hidden;

    .h-i-block-wrap{
      position: relative;

      .h-i-block-title{
        font-size: 0.16rem;
        line-height: 0.5rem;
        font-weight: bold;
      }

      .h-i-block-content{
        padding-bottom: 0.15rem;
        font-size: 0.12rem;
        color: #484F55;
      }
    }
  }

}
</style>