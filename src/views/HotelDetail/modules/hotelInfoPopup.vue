<template>
  <mt-popup
    v-model="getHotelInfoPopupVisible"
    position="bottom">
  
    <div class="hotel-info-wrap">
      <!-- 头部 -->
      <mt-header title="酒店信息" @click.native="hidePopup">
        <mt-button class="iconfont icon-delete2" slot="right"></mt-button>
      </mt-header>

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

export default {
  name: 'hotelInfoPopup',
  data(){
    return {
    }
  },
  props: {},
  components: {
  },
  watch: {
    $route(to, from) {
      // 切换页面时隐藏 popup
      this.hidePopup()
    },    
  },
  created(){
  },
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
    // 隐藏 popup
    hidePopup(){
      this.$store.commit(`hotelDetail/setCommonState`, {k: 'hotelInfoPopupVisible', v: false})
    }
  }
}
</script>

<style lang="scss">
.hotel-info-wrap{
  overflow: hidden;
  height: 3rem;

  .h-i-wrap{
    position: relative;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    padding: 0 0.1rem;
    padding-bottom: 0.5rem;
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