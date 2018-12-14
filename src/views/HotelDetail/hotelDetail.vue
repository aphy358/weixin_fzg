<template>
  <div class="page hotelDetail-page">
    <div class="page-content" style="background: #efeff4;">

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
      
    </div>
  </div>
</template>

<script>
import Banner from './modules/banner.vue'
import SearchFilter from './modules/searchFilter.vue'
import HotelPriceList from './modules/hotelPriceList.vue'
import AdultChildPopup from './modules/adultChildPopup.vue'
import GAP from '@/components/GAP.vue'


export default {
  name: 'hotelDetail',
  data(){
    return {}
  },
  props: {},
  components: {
    Banner,
    SearchFilter,
    HotelPriceList,
    AdultChildPopup,
    GAP,
  },
  watch: {},
  created(){},
  computed: {},
  mounted(){},
  methods:{}
}
</script>

<style lang="scss">
</style>