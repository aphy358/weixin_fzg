<template>
  <div class="page hotelList-page">
    <!-- 关键字搜索 -->
    <KeywordInput />

    <!-- 搜索条件过滤 -->
    <SearchFilter />

  </div>
</template>

<script>
import KeywordInput from './modules/keywordInput'
import SearchFilter from './modules/searchFilter'

export default {
  name: 'hotelList',
  data(){
    return {
    }
  },
  props: {
  },
  components: {
    KeywordInput,
    SearchFilter,
  },
  created(){
  },
  computed: {
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style lang="scss">
</style>