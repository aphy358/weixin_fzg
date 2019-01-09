<template>
  <div class="page eb-roomlist-page">

    <!-- 头部 -->
    <mt-header :title="titleText"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="page-content" style="background-color: #efeff4;padding-bottom: 0.5rem;">

      <!-- 头部 -->
      <Head :formulaType="formulaType" @switchFormulaType="switchFormulaType" />

      <!-- 日期选择操作栏 -->
      <DateBar @pickDate="pickDate" :mtype="mtype" :formulaType="formulaType" :hotelId="hotelId" />

      <!-- 房型列表 -->
      <RoomList 
        v-if="roomList.length > 0" 
        :roomList="roomList" 
        :activeDay="activeDay"
        :typeFlag="mtype"
        :hotelId="hotelId"
        :formulaType="formulaType"
        @refreshData="refreshData" />

      <div v-if="roomList.length < 1 && !loading" class="eb-roomlist-no-data">当前日期无数据</div>

      <Loading v-if="loading" />

      <END v-if="!loading && roomList.length > 0" />
      
    </div>

    <ToTop />

  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import ToTop from '@/components/ToTop.vue'
import Loading from '@/components/Loading.vue'
import END from "@/components/END.vue";
import { gotoPage, queryString, goBackPage } from '@/assets/util'
import { Toast } from 'mint-ui'
import { debounce } from 'lodash'

import Head from '../components/head'
import DateBar from './dateBar'
import RoomList from './roomList'



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

      // 1：合约配额    2：outside
      formulaType: '1',

      // 当前酒店 ID
      hotelId: '',
    }
  },
  props: {},
  components: {
    GoBack,
    ToTop,
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
    // 观察当前被选中的酒店，一旦变化，则重新查询当天的房态房价
    hotelId(){
      this.queryRoomStatusAndPriceForOneDay()
    }
  },
  created(){
  },
  activated(){
    if(!window.goBack){
      this.activeDay = (new Date).Format('yyyy-MM-dd')
      this.formulaType = '1'
      this.getQueryParams()
    }

    this.queryRoomStatusAndPriceForOneDay()
  },
  computed: {},
  mounted(){},
  methods:{
    // 获取 url 参数
    getQueryParams(){
      this.mtype = queryString('mtype')
      this.hotelId = queryString('hotelId')
      this.titleText = decodeURIComponent(queryString('hname')) + ' - ' + (this.mtype == 1 ? '房态' : '房价')
    },
    // 切换配额类型
    switchFormulaType($event){
      this.formulaType = $event
      this.queryRoomStatusAndPriceForOneDay()
    },
    // 选择了一个日期
    pickDate($event){
      this.activeDay = $event
    },
    // 查询某一天的房态、房价数据
    queryRoomStatusAndPriceForOneDay: debounce(function(){
      // 查询之前先清空数据
      this.roomList = []

      if(this.activeDay){  // 只有当前被选中的日期是一个有效日期才开始查询
        this.loading = true

        let params = {
          infoId: this.hotelId,
          strBeginDate: this.activeDay,
          formulaType: this.formulaType,
        }
  
        this.$api.eb.syncEBQueryRoomStatusAndPriceForOneDay(params).then(res => {
          this.loading = false

          if(res.returnCode === 1){
            this.roomList = res.data.hotelRoomEbDtoList || []
          }
        })
      }
    }, 10),
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