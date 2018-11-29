<template>
  <div class="page home-page">

    <!-- 头部 -->
    <mt-header title="境内/境外酒店">
      <mt-button class="iconfont icon-user" slot="right"></mt-button>
    </mt-header>

    <!-- banner -->
    <Banner />

    <!-- 搜索区域 -->
    <SearchSection />

    <!-- 页面分隔符 -->
    <GAP />

    <!-- 精选酒店 -->
    <Recommended />

    <!-- 底部 END 标识 -->
    <END />

  </div>
</template>

<script>
// @ is an alias to /src
import Banner from './modules/banner.vue'
import SearchSection from './modules/searchSection.vue'
import Recommended from './modules/recommended.vue'
import END from '@/components/END.vue'
import GAP from '@/components/GAP.vue'

export default {
  name: 'home',
  data(){
    return {
    }
  },
  components: {
    Banner,
    SearchSection,
    END,
    GAP,
    Recommended
  }
}
</script>

<style lang="scss">
.home-page{

  .icon-user{
    font-size: 0.24rem;
  }
}
</style>