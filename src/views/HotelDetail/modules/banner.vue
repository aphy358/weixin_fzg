<template>
  <div v-if="curHotel">
    <!-- banner 区域 -->
    <div class="banner-wrap">
      <mt-swipe :auto="0" :showIndicators="false" >
        <mt-swipe-item v-for="(n, i) in curHotel.picList" :key="i">
          <img :src="n" width="100%">
        </mt-swipe-item>
      </mt-swipe>

      <div class="banner-text-wrap">
        {{ curHotel.infoName }}
        <span class="star-text">{{ curHotel.starText }}</span>
      </div>
    </div>

    <div class="hotel-info-list">
      <div class="hotel-info-item line-after">
        <p>{{ curHotel.address }}</p>
        <p>{{ curHotel.businessCircle }}</p>
        <div class="mask-left-div">
          地图<i class="iconfont icon-right-thin"></i>
        </div>
      </div>
      <div class="hotel-info-item line-after">
        <p>{{ curHotel.infoDesc }}</p>
        <div class="mask-left-div">
          酒店详情<i class="iconfont icon-right-thin"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'banner',
  data(){
    return {
      curHotel: null,
    }
  },
  props: {},
  components: {},
  watch: {},
  created(){
  },
  activated(){
    this.initHotelInfo()
  },
  computed: {
    getCurHotel(){
      return this.$store.state.curHotel
    }
  },
  mounted(){},
  methods:{
    // 初始化酒店基本信息的显示
    initHotelInfo(){
      let _curHotel = sessionStorage.getItem('curHotel')
      if(_curHotel){ this.curHotel = JSON.parse(_curHotel) }
      console.log(this.curHotel);
      
    }
  }
}
</script>

<style lang="scss">
@keyframes bgscroll {
  0% {
    transform: translateY(0)
  }
  45% {
    transform: translateY(-30px)
  }
  50% {
    transform: translateY(-30px)
  }
  95% {
    transform: translateY(0)
  }
  100% {
    transform: translateY(0)
  }
}

.mask-left-div{
  position: absolute;
  right: 0;
  top: 0;
  box-shadow: 0 0 0.2rem 0.3rem white;
  height: 100%;
  line-height: 0.47rem;
  width: 0.85rem;
  background: white;
  text-align: right;
}

.hotelDetail-page{

  .banner-wrap{
    position: relative;
    overflow: hidden;
    height: 1.8rem;

    .mint-swipe{
      height: 1.8rem;
  
      .mint-swipe-item{
  
        img{
          min-height: 2.1rem;
        }
  
        &.is-active{
          img{
            animation: bgscroll 15s infinite ease-in-out;
          }
        }
      }
    }

    .banner-text-wrap{
      position: absolute;
      width: 200%;
      box-shadow: -0.3rem -0.2rem 0.3rem 0 rgba(0, 0, 0, 0.2) inset;
      color: white;
      height: 0.5rem;
      line-height: 0.5rem;
      bottom: 0;
      padding-left: 0.1rem;
      font-size: 0.16rem;

      .star-text{
        font-size: 0.12rem;
      }
    }

  }

  .hotel-info-list{

    .hotel-info-item{
      position: relative;
      color: #666666;
      padding: 0.13rem 0.1rem;
      overflow: hidden;

      p{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>