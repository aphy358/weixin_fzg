<template>
  <div class="page hotelDetail-page">
    <div class="page-content" style="background: #efeff4;" >

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

      <!-- 酒店地图 popup -->
      <HotelMapPopup />
      
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
import HotelMapPopup from './modules/hotelMapPopup.vue'
import GAP from '@/components/GAP.vue'
import ToTop from '@/components/ToTop.vue'


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
    HotelMapPopup,
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
    if(!window.goBack){
      this.initHotelShare()
    }
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
          title: hotel.infoName, // 分享标题
          desc: hotel.infoName, // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: hotel.picSrc, // 分享图标
          success: function () {
          },
          fail: function (res) {
          }
        });

        wx.updateTimelineShareData({
          title: hotel.infoName, // 分享标题
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: hotel.picSrc, // 分享图标
          success: function () {
          },
          fail: function (res) {
          }
        });

        wx.openLocation({
          latitude: hotel.latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: hotel.longitude, // 经度，浮点数，范围为180 ~ -180。
          name: '', // 位置名
          address: '', // 地址详情说明
          scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
        
      }
    }
  }
}
</script>

<style lang="scss">
</style>