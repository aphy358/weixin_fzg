<template>
  <div class="page hotelDetail-page">

    <!-- banner -->
    <Banner />

    <!-- 搜索条件 -->
    <SearchFilter />

    <GAP />

  </div>
</template>

<script>
import Banner from './modules/banner.vue'
import SearchFilter from './modules/searchFilter.vue'
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