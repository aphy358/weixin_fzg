<template>
  <div class="page qnb-roomlist-page">

    <!-- 头部 -->
    <mt-header :title="titleText"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="page-content" style="background-color: #efeff4;padding-bottom: 0.5rem;">

      <!-- 头部 -->
      <Head :formulaType="formulaType" @switchFormulaType="switchFormulaType" />

      <!-- 日期选择操作栏 -->
      <DateBar @pickDate="pickDate" :mtype="mtype" :formulaType="formulaType" :hotelId="hotelId" :suppId="suppId" />

      <!-- 房型列表 -->
      <RoomList 
        v-if="roomList.length > 0" 
        :roomList="roomList" 
        :activeDay="activeDay"
        :typeFlag="mtype"
        :hotelId="hotelId"
        :suppId="suppId"
        :formulaType="formulaType"
        @refreshData="refreshData" />

      <div v-if="roomList.length < 1 && !loading" class="qnb-roomlist-no-data">当前日期无数据</div>

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
import { debounce } from 'lodash'

import Head from '../components/head'
import DateBar from './dateBar'
import RoomList from './roomList'

//** 测试数据 */
import { _qnbRoomList } from './qnbRoomList.js'


export default {
  name: 'QNBRoomList',
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

      // 供应商 ID
      suppId: '',
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
    }else{
      // 如果是从批量设置页面回退过来的，则重新查数据
      this.queryRoomStatusAndPriceForOneDay()
    }
  },
  computed: {},
  mounted(){},
  methods:{
    // 获取 url 参数
    getQueryParams(){
      this.mtype = queryString('mtype')
      this.hotelId = queryString('hotelId')
      this.suppId = queryString('suppId')
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
      console.log('queryRoomStatusAndPriceForOneDay');
      
      
      // 查询之前先清空数据
      this.roomList = []

      if(this.activeDay){  // 只有当前被选中的日期是一个有效日期才开始查询
        this.loading = true

        let params = {
          infoId:       this.hotelId,
          strBeginDate: this.activeDay,
          formulaType:  this.formulaType,
          suppId:       this.suppId
        }
  
        this.$api.qnb.syncQNBQueryRoomStatusAndPriceForOneDay(params).then(res => {
          this.loading = false
          this.roomList = _qnbRoomList

          if(res.returnCode === 1){
  
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
.qnb-roomlist-no-data{
  text-align: center;
  margin: 0.3rem 0;
  color: #ea2c2c;
}
</style>