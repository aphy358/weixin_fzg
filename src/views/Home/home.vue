<template>
  <div class="page home-page">
    <div class="page-content">

      <!-- 头部 -->
      <mt-header title="境内/境外酒店">
        <mt-button class="iconfont icon-user" slot="right" @click="goMyCenter"></mt-button>
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

    <ToTop />

  </div>
</template>

<script>
// @ is an alias to /src
import Banner from './modules/banner.vue'
import SearchSection from './modules/searchSection.vue'
import Recommended from './modules/recommended.vue'
import END from '@/components/END.vue'
import GAP from '@/components/GAP.vue'
import ToTop from '@/components/ToTop.vue'
import {gotoPage} from '@/assets/util';

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
    ToTop,
    Recommended
  },
  created(){
    //*** 模拟登录，测试 */
//     let params = {
//       code: '8998',
//       name: 'fenghan',
//       password: '1'
//     }
//
//     this.$api.qnb.syncQNBLoginForTest(params).then(res => {
//       console.log(res);
//     })
  },
  mounted(){
  },
  methods: {
    goMyCenter(){
      gotoPage(this.$router, 'myCenter');
    }
  }
}
</script>

<style lang="scss">
.home-page{

  .icon-user{
    font-size: 0.22rem;
  }
}
</style>