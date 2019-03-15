<template>
  <div style="background: white;" v-if="curHotel">
    <!-- banner 区域 -->
    <div class="banner-wrap">
      <mt-swipe :auto="0" :showIndicators="false" >
        <mt-swipe-item v-for="(n, i) in curHotel.picList" :key="i">
          <img :src="n.indexOf('nopic') != -1 ? logo : n" width="100%" >
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
        <p style="color: #bbb;font-size: 0.12rem;line-height: 0.12rem;margin-bottom: 0.03rem;">
          <i class="iconfont icon-weizhi" style="position: relative;top: 0.01rem;color: #bbb;font-size: 0.14rem;margin-right: 0.05rem;"></i>
          {{ curHotel.businessCircle }}
        </p>
        <div class="mask-left-div" @click="showHotelMap">
          地图<i class="iconfont icon-right-thin"></i>
        </div>
      </div>
      <div class="hotel-info-item line-after">
        <p style="line-height: 0.24rem;">{{ curHotel.infoDesc }}</p>
        <div class="mask-left-div" @click="showHotelInfo">
          详情<i class="iconfont icon-right-thin"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import logo from '@/assets/img/fzglogo.jpg'
import { queryString, getStarText, initPageShare, initJSSDK } from '@/assets/util'

export default {
  name: 'banner',
  data(){
    return {
      logo: '',
      curHotel: null,
    }
  },
  props: {},
  components: {},
  watch: {
    curHotel(){
      this.initPageShare()
    }
  },
  created(){
    this.logo = logo
  },
  activated(){
    initJSSDK(this)
    this.initHotelInfo()
    this.initPageShare()
  },
  computed: {
  },
  mounted(){},
  methods:{
    initPageShare(){
      let _this = this
      
      if(_this.curHotel){
        setTimeout(function(){
          wx.ready(function(){
            initPageShare(_this.curHotel)
          })
        }, 500)
      }
    },
    // 初始化酒店基本信息的显示
    initHotelInfo(){
      let _curHotel = this.$store.state.curHotel

      if(_curHotel){
        this.curHotel = _curHotel
        this.setHotelPic(this.curHotel)
      }else{
        let hotelId = queryString('hotelId')
        let cityType = queryString('cityType')

        this.$api.hotelDetail.syncGetHotelInfo({infoIds: hotelId, type: cityType}).then(res => {
          if(res.returnCode === 1){
            getStarText(res.dataList[0])
            this.curHotel = res.dataList[0]
            this.setHotelPic(this.curHotel)
            this.$store.commit(`setCommonState`, {k: 'curHotel', v: res.dataList[0]})
          }
        })
      }
      
    },
    // 设置酒店图片
    setHotelPic(hotel){
      hotel.picList = hotel.picList || [];
      let picArr = hotel.picSrc.split('|');
      if(!hotel.picList.length)	hotel.picList = picArr;
      hotel.picSrc = picArr[0];
    },
    showHotelInfo(){
      this.$store.commit(`hotelDetail/setCommonState`, {k: 'hotelInfoPopupVisible', v: true})
    },
    showHotelMap(){
      wx.openLocation({
        latitude: +this.curHotel.latitude,    // 纬度，浮点数，范围为90 ~ -90
        longitude: +this.curHotel.longitude,  // 经度，浮点数，范围为180 ~ -180。
        name: this.curHotel.infoName,         // 位置名
        address: this.curHotel.infoName,      // 地址详情说明
        scale: 16,                            // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '',                          // 在查看位置界面底部显示的超链接,可点击跳转
        fail: function (res) { alert(JSON.stringify(res)) }
      });
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
    transform: translateY(-0.3rem)
  }
  50% {
    transform: translateY(-0.3rem)
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
  right: 0.1rem;
  bottom: 0;
  font-size: 0.12rem;
  color: #576690;
  box-shadow: 0 0 0.1rem 0.1rem white;
  height: 0.5rem;
  line-height: 0.5rem;
  width: 0.8rem;
  background: white;
  text-align: right;
  font-weight: bold;

  .iconfont{
    font-size: 0.12rem;
    line-height: 0.5rem;
    color: rgb(153, 153, 153);
  }
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