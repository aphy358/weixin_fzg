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
  },
  created(){
  },
  activated(){
  },
  deactivated(){
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    gobackPage(){
      goBackPage(this.$router)
    },
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