<template>
  <div class="page hotelDetail-page">

    <!-- banner -->
    <Banner />

    <!-- 搜索条件 -->
    <SearchFilter />

    <GAP />

    <!-- 成人小孩选择 popup -->
    <AdultChildPopup />

  </div>
</template>

<script>
import Banner from './modules/banner.vue'
import SearchFilter from './modules/searchFilter.vue'
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