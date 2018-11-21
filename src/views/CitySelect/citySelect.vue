<template>
  <div class="citySelect-page">

    <!-- 顶部关键字输入区域 -->
    <KeywordInput />

    <!-- 城市列表 -->
    <CityList />

  </div>
</template>

<script>
import KeywordInput from './modules/keywordInput'
import CityList from './modules/cityList'

export default {
  name: 'citySelect',
  data(){
    return {
    }
  },
  props: {
  },
  components: {
    KeywordInput,
    CityList
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