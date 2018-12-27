<template>
  <div class="page qnb-supplier-list-page">

    <!-- 头部 -->
    <mt-header :title="this.pageType == 1 ? '添加关注酒店' : '酒店-供应商列表'"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />
    
    <div class="page-content" style="background-color: #efeff4;">

      <ul 
        class="qnb-hotel-list"
        v-infinite-scroll="getHotelList"
        infinite-scroll-disabled="infiniteLoad"
        infinite-scroll-distance="10">

        <li v-for="(n, i) in hotelList" :key="i" class="qnb-hotel-item">
          <div class="qnb-hi-title-wrap" @click="expandSupplier(n)">
            <span class="info-name">{{ n.n }}</span>
            <i class="iconfont" :class="[n.expand ? 'icon-down-thin' : 'icon-right-thin']"></i>
          </div>
          <ul class="supplier-list" v-if="n.expand && n.supplierList && n.supplierList.length > 0">
            <li class="supplier-item line-after" v-for="(o, j) in n.supplierList" :key="j" @click="clickOneSupplier(o)">
              {{ o.suppName }}
              <i v-if="o.hasAttention" class="iconfont icon-gouxuan"></i>
            </li>
          </ul>
          <ul class="supplier-list" v-if="n.expand && n.supplierList && n.supplierList.length < 1">
            <li class="supplier-item line-after" style="color: #999;">无供应商</li>
          </ul>
        </li>
        
      </ul>
      
      <Loading v-if="hotelList.length == 0 && !infiniteLoad" />

      <LoadMore v-if="hotelList.length > 0 && !infiniteLoad" />

      <END v-if="hotelList.length > 0 && infiniteLoad" />

    </div>
  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import GoBack from '@/components/GoBack.vue'
import Loading from '@/components/Loading.vue'
import LoadMore from '@/components/LoadMore.vue'
import END from '@/components/END.vue'
import { gotoPage, replacePage, queryString } from '@/assets/util'
import { debounce } from 'lodash'

import { _hotelList } from './hotelList.js'

export default {
  name: 'QNBSupplierList',
  data(){
    return {
      titleText: '',
      
      // 1：用于添加关注   2：直接由供应商页面进入到房型列表页
      pageType: '',

      hotelList: [],
      loading: false,
      infiniteLoad: false,
      pageNow: 1,

      iterator: 1,
    }
  },
  props: {},
  components: {
    GoBack,
    Loading,
    LoadMore,
    END
  },
  watch: {},
  created(){
    this.getHotelList(1)
  },
  activated(){
    if(!window.goBack){
      this.getQueryParams()
    }
  },
  computed: {},
  mounted(){},
  methods:{
    // 跳转到房型列表页，要先验证用户有没有操作权限
    gotoRoomListPage(n){
      let params = {infoId: n.infoId, suppId: n.suppId}
      this.$api.qnb.syncQNBHasAuthority(params).then(res => {
        if(res.returnCode === 1){
          // TO DO
        }
      })
    },
    // 获取 url 参数
    getQueryParams(){
      this.pageType = queryString('pageType')
    },
    // 获取酒店列表
    getHotelListDebounce: debounce(function(flag){
      this.getHotelList(flag)
    }, 290),
    // 获取酒店列表回调函数
    getHotelList: debounce(function(flag){
      // 如果已经在查询酒店列表，则暂时不允许再查询
      if(this.loading)   return false
      this.loading = true

      if(flag){
        this.resetData()
      }

      let params = {
        pageSize: 15,
        pageNum: this.pageNow,
        countryType: 0,
        key: '',
      }

      this.$api.qnb.syncQNBQueryHotels(params).then(res => {
        this.loading = false
        this.hotelList = _hotelList
        if(res.returnCode === 1){
          // TO DO
        }
      })
    }, 10),
    // 重置数据
    resetData(){
      this.hotelList = []
      this.loading = false
      this.infiniteLoad = false
      this.pageNow = 1
    },
    // 展开某个酒店下的所有供应商
    expandSupplier(n){
      if(!n.supplierList){
        this.$api.qnb.syncQNBQuerySuppliers({hotelId: n.i}).then(res => {
          n.supplierList = [
            {suppId: '1', suppName: '供应商' + this.iterator++, hasAttention: false},
            {suppId: '1', suppName: '供应商' + this.iterator++, hasAttention: false},
            {suppId: '1', suppName: '供应商' + this.iterator++, hasAttention: false},
            {suppId: '1', suppName: '供应商' + this.iterator++, hasAttention: true},
          ]
          n.expand = !n.expand

          if(res.returnCode === 1){
            // TO DO
          }
        })
      }else{
        n.expand = !n.expand
      }
    },
    // 单击某个供应商，或关注，或跳转到房型列表页面
    clickOneSupplier(o){

    }
  }
}
</script>

<style lang="scss">
.qnb-hotel-list{

  @at-root .qnb-hotel-item{
    margin: 0.1rem;
    background: white;
    border-radius: 0.02rem;
    box-shadow: 0 0 0.05rem 0 rgba(0, 0, 0, 0.1);

    @at-root .qnb-hi-title-wrap{
      position: relative;
      padding: 0.1rem;
      font-size: 0.15rem;

      .info-name{

      }

      .iconfont{
        position: absolute;
        right: 0.05rem;
        font-size: 0.12rem;
        color: #ccc;

      }
    }

    .supplier-list{
      padding: 0 0.1rem 0.1rem 0.3rem;

      .supplier-item{
        position: relative;padding: 10px 0;

        .icon-gouxuan{
          position: absolute;
          right: 0;
          top: 9px;
          color: green;
        }
      }

    }
  }
}
</style>