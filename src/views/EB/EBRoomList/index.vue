<template>
  <div class="page">

    <!-- 头部 -->
    <mt-header :title="titleText"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="page-content" style="background-color: #efeff4;">

      <!-- 头部 -->
      <Head @switchType="switchType" />

      <!-- 日期选择操作栏 -->
      <DateBar />
      
    </div>
  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import Loading from '@/components/Loading.vue'
import { gotoPage, queryString } from '@/assets/util'
import { Toast } from 'mint-ui'

import Head from './head'
import DateBar from './dateBar'


export default {
  name: 'EBRoomList',
  data(){
    return {
      titleText: '',
    }
  },
  props: {},
  components: {
    GoBack,
    Loading,
    Head,
    DateBar
  },
  watch: {},
  created(){},
  activated(){
    this.getQueryParams()
  },
  computed: {},
  mounted(){},
  methods:{
    // 获取 url 参数
    getQueryParams(){
      this.titleText = decodeURIComponent(queryString('hname')) + ' - ' + (queryString('mtype') == '1' ? '房态' : '房价')
    },
    // 切换配额类型
    switchType($event){
      console.log($event);
    }
  }
}
</script>

<style lang="scss">

</style>