<template>
  <mt-popup
    v-model="getHotelInfoPopupVisible"
    position="right">
  
    <div class="hotel-info-wrap">
      <!-- 头部 -->
      <mt-header title="酒店信息"></mt-header>

      <!-- 返回 -->
      <GoBack _style="top: 0.02rem" :onClick="clickGoBack" />

      <div class="h-i-wrap" v-if="getCurHotel">

        <div class="h-i-block-wrap line-after">
          <p class="h-i-block-title">酒店简介</p>
          <p class="h-i-block-content">{{ getCurHotel.infoDesc || '无' }}</p>
        </div>

        <div class="h-i-block-wrap line-after">
          <p class="h-i-block-title">酒店设施</p>
          <p class="h-i-block-content">{{ getCurHotel.facilities || '无' }}</p>
        </div>

        <div class="h-i-block-wrap line-after">
          <p class="h-i-block-title">特别提示</p>
          <p class="h-i-block-content">{{ getCurHotel.indicate || '无' }}</p>
        </div>

        <div class="h-i-block-wrap line-after">
          <p class="h-i-block-title">联系方式</p>
          <p class="h-i-block-content">{{ getCurHotel.bookingPhone || '无' }}</p>
        </div>
      

      </div>

    </div>

  </mt-popup>
</template>

<script>
import GoBack from '@/components/GoBack.vue'

export default {
  name: 'hotelInfoPopup',
  data(){
    return {
    }
  },
  props: {},
  components: {
    GoBack
  },
  watch: {
    // 监视成人小孩弹出框的状态，弹出的时候初始化选择项
    getHotelInfoPopupVisible(){
    },
    $route(to, from) {
      // 切换页面时隐藏 popup
      this.hidePopup()
    }
  },
  created(){},
  computed: {
    getHotelInfoPopupVisible: {
      get: function () {
        return this.$store.state.hotelDetail.hotelInfoPopupVisible
      },
      set: function (newValue) {
        this.$store.commit(`hotelDetail/setCommonState`, {k: 'hotelInfoPopupVisible', v: newValue})
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
      this.$store.commit(`hotelDetail/setCommonState`, {k: 'hotelInfoPopupVisible', v: false})
    }
  }
}
</script>

<style lang="scss">
.hotel-info-wrap{
  height: 100%;
  height: 100vh;

  .h-i-wrap{
    padding: 0 0.1rem;

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