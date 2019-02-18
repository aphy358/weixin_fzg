<template>
  <div class="page hotelDetail-page">
    <div class="page-content" style="background: #efeff4;" >

      <i class="iconfont icon-left-thin" @click="gobackPage"></i>

      <!-- banner -->
      <Banner />

      <GAP />

      <!-- 搜索条件 -->
      <SearchFilter />

      <GAP />

      <!-- 酒店价格列表 -->
      <HotelPriceList />

      <!-- 成人小孩选择 popup -->
      <AdultChildPopup />

      <!-- 酒店信息 popup -->
      <HotelInfoPopup />

    </div>

    <ToTop />

  </div>
</template>

<script>
import Banner from './modules/banner.vue'
import SearchFilter from './modules/searchFilter.vue'
import HotelPriceList from './modules/hotelPriceList.vue'
import AdultChildPopup from './modules/adultChildPopup.vue'
import HotelInfoPopup from './modules/hotelInfoPopup.vue'
import GAP from '@/components/GAP.vue'
import ToTop from '@/components/ToTop.vue'
import { goBackPage } from '@/assets/util'


export default {
  name: 'hotelDetail',
  data(){
    return {
      // 如果是通过分享页面直接进入的酒店详情页，就会用到这个 flag
      initShareFlag: 0,
    }
  },
  props: {},
  components: {
    Banner,
    SearchFilter,
    HotelPriceList,
    AdultChildPopup,
    HotelInfoPopup,
    GAP,
    ToTop
  },
  watch: {
    getCurHotel(){
      if(this.getCurHotel){
        this.initShareFlag++
      }
    },
    getWXReady(){
      if(this.getWXReady){
        this.initShareFlag++
      }
    },
    initShareFlag(){
      if(this.initShareFlag == 2){
        this.initHotelShare()
      }
    },
  },
  created(){
  },
  activated(){
    this.initJSSDK()
    
  },
  deactivated(){
    this.initShareFlag = 0
  },
  computed: {
    getCurHotel(){
      return this.$store.state.curHotel
    },
    getWXReady(){
      return this.$store.state.wx_ready
    }
  },
  mounted(){
  },
  methods:{
    initHotelShare(){
      if(this.getCurHotel){
        let hotel = this.getCurHotel

        wx.updateAppMessageShareData({
          title: hotel.infoName,  // 分享标题
          desc: hotel.infoName,   // 分享描述
          link: location.href,    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: hotel.picSrc,   // 分享图标
          success: function () {},
          fail: function (res) {}
        });

        wx.updateTimelineShareData({
          title: hotel.infoName,  // 分享标题
          link: location.href,    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: hotel.picSrc,   // 分享图标
          success: function () {},
          fail: function (res) {}
        });
      }
    },
    gobackPage(){
      goBackPage(this.$router)
    },
    // 初始化 JSSDK
    initJSSDK(){
      this.$api.common.syncInitJSSDK({url: encodeURIComponent(location.href.split('#')[0])}).then(res => {
        if(res.returnCode == 1){
          let data = res.data

          wx.config({
            debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId : data.appId, // 必填，公众号的唯一标识
            timestamp : data.timestamp, // 必填，生成签名的时间戳
            nonceStr : data.nonceStr, // 必填，生成签名的随机串
            signature : data.signature,// 必填，签名，见附录1
            jsApiList : [
              'updateAppMessageShareData', 
              'updateTimelineShareData', 
              'openLocation', 
              'getLocation',
              'chooseWXPay'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      })

      let _this = this
      wx.ready(function(){
        _this.$store.commit('setCommonState', {k: 'wx_ready', v: true})
        _this.initHotelShare()
      });
    }
  }
}
</script>

<style lang="scss">
.hotelDetail-page{

  .icon-left-thin{
    position: absolute;
    width: 0.26rem;
    height: 0.26rem;
    text-align: center;
    background: rgba(0, 0, 0, 0.2);
    z-index: 9;
    line-height: 0.26rem;
    color: white;
    border-radius: 100%;
    top: 0.1rem;
    left: 0.1rem;
  }
}
</style>