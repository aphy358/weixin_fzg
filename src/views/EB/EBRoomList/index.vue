<template>
  <div class="page">

    <!-- 头部 -->
    <mt-header :title="titleText"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="page-content" style="background-color: #efeff4;padding-bottom: 0.5rem;">

      <!-- 头部 -->
      <Head @switchType="switchType" />

      <!-- 日期选择操作栏 -->
      <DateBar @pickDate="pickDate" />

      <!-- 房型列表 -->
      <RoomList 
        v-if="roomList.length > 0" 
        :roomList="roomList" 
        :activeDay="activeDay"
        :typeFlag="mtype"
        :hotelId="hotelId"
        @refreshData="refreshData" />

      <div v-if="roomList.length < 1 && !loading" class="eb-roomlist-no-data">当前日期无数据</div>

      <Loading v-if="loading" />

      <END v-if="!loading && roomList.length > 0" />
      
    </div>
  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import Loading from '@/components/Loading.vue'
import END from "@/components/END.vue";
import { gotoPage, queryString } from '@/assets/util'
import { Toast } from 'mint-ui'

import Head from './head'
import DateBar from './dateBar'
import RoomList from './roomList'

//** 测试数据 */
import { _ebRoomList } from './ebRoomList.js'


export default {
  name: 'EBRoomList',
  data(){
    return {
      // 用于标识当前是否正在查询房态房价
      loading: false,

      titleText: '',
      roomList: [],
      activeDay: '',

      // 1：房态管理    2：房价管理
      mtype: '1',

      // 当前酒店 ID
      hotelId: '',
    }
  },
  props: {},
  components: {
    GoBack,
    END,
    Loading,
    Head,
    DateBar,
    RoomList
  },
  watch: {
    // 观察当前被选中的日期，一旦变化，则重新查询当天的房态房价
    activeDay(){
      this.queryRoomStatusAndPriceForOneDay()
    },
  },
  created(){
    this.activeDay = (new Date).Format('yyyy-MM-dd')
  },
  activated(){
    if(!window.goBack){
      this.getQueryParams()
    }
  },
  computed: {},
  mounted(){},
  methods:{
    // 获取 url 参数
    getQueryParams(){
      this.mtype = queryString('mtype')
      this.hotelId = queryString('hotelId')
      this.titleText = decodeURIComponent(queryString('hname')) + ' - ' + (this.mtype ? '房态' : '房价')
    },
    // 切换配额类型
    switchType($event){
      this.mtype = $event
      this.queryRoomStatusAndPriceForOneDay()
    },
    // 选择了一个日期
    pickDate($event){
      this.activeDay = $event
    },
    // 查询某一天的房态、房价数据
    queryRoomStatusAndPriceForOneDay(){
      // 查询之前先清空数据
      this.roomList = []

      if(this.activeDay){  // 只有当前被选中的日期是一个有效日期才开始查询
        this.loading = true

        let params = {
          infoId: this.hotelId,
          strBeginDate: this.activeDay,
          formulaType: this.mtype,
        }
  
        this.$api.eb.syncEBQueryRoomStatusAndPriceForOneDay(params).then(res => {
          this.loading = false
          this.roomList = _ebRoomList

          if(res.returnCode === 1){
  
          }
        })
      }
    },
    // 重新刷新数据
    refreshData(){
      this.queryRoomStatusAndPriceForOneDay()
    }
  }
}
</script>

<style lang="scss">
.eb-roomlist-no-data{
  text-align: center;
  margin: 0.3rem 0;
  color: #ea2c2c;
}
</style>