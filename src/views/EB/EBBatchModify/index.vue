<template>
  <div class="page eb-batchmodify-page">

    <!-- 头部 -->
    <mt-header :title="titleText"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="page-content" style="background-color: #efeff4;padding-bottom: 0.5rem;">

      <!-- 头部 -->
      <Head :formulaType="formulaType" @switchFormulaType="switchFormulaType" />
      
    </div>
  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import END from "@/components/END.vue";
import { gotoPage, queryString } from '@/assets/util'
import { Toast } from 'mint-ui'
import { debounce } from 'lodash'

import Head from '../components/head'

export default {
  name: 'ebbatchmodify',
  data(){
    return {
      titleText: '',

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
    END,
    Head
  },
  watch: {},
  created(){},
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
      this.formulaType = queryString('formulaType')
      this.hotelId = queryString('hotelId')
      this.titleText = (this.mtype == 1 ? '房态' : '房价') + '批量修改'
    },
    // 切换配额类型
    switchFormulaType($event){
      this.formulaType = $event
    },
  }
}
</script>

<style lang="scss">
</style>