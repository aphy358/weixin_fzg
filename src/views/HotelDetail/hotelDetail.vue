<template>
  <div class="page hotelDetail-page">

    <!-- banner -->
    <Banner />

    <!-- 搜索条件 -->
    <SearchFilter />

    <GAP />
    
    <!-- 酒店价格列表 -->
    <HotelPriceList />


  </div>
</template>

<script>
import Banner from './modules/banner.vue'
import SearchFilter from './modules/searchFilter.vue'
import HotelPriceList from './modules/hotelPriceList.vue'
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