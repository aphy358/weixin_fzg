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
      <DateBar @pickDate="pickDate" />

      <!-- 房型列表 -->
      <RoomList :roomList="roomList" />
      
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
import RoomList from './roomList'


export default {
  name: 'EBRoomList',
  data(){
    return {
      titleText: '',
      roomList: [],
    }
  },
  props: {},
  components: {
    GoBack,
    Loading,
    Head,
    DateBar,
    RoomList
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
    },
    // 选择了一个日期
    pickDate($event){
      console.log($event);
      
    },
    // 查询某一天的房态、房价数据
    queryRoomStatusAndPriceForOneDay(){

    },
  }
}
</script>

<style lang="scss">

</style>