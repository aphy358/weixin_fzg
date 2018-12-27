<template>
  <div class="page qnb-my-concern-list-page">

    <!-- 头部 -->
    <mt-header title="我关注的酒店">
      <mt-button class="iconfont icon-cc-plus-circle" slot="right" style="font-size: 0.22rem;" @click="gotoSupplierListPage"></mt-button>
    </mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />
    
    <div class="page-content" style="background-color: #efeff4;">

      <ul 
        class="qnb-concern-list"
        v-infinite-scroll="queryMyConcernList"
        infinite-scroll-disabled="infiniteLoad"
        infinite-scroll-distance="10">

        <li v-for="(n, i) in concernList" :key="i" class="qnb-concern-item">
      
          <mt-cell-swipe
            @click.native="gotoRoomListPage(n)"
            :right="[{
                content: '取消关注',
                style: { background: 'rgba(255, 0, 0, 0.8)', color: '#fff' },
                handler: () => deleteConcern(n, i)
            }]">
          
            <div class="concern-item-content">
              <p class="info-name">{{ n.infoName }}</p>
              <p class="supp-name">{{ n.suppName }}</p>
            </div>
          </mt-cell-swipe>

        </li>
        
      </ul>
      
      <Loading v-if="concernList.length == 0 && !infiniteLoad" />

      <LoadMore v-if="concernList.length > 0 && !infiniteLoad" />

      <END v-if="concernList.length > 0 && infiniteLoad" />

    </div>
  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import GoBack from '@/components/GoBack.vue'
import Loading from '@/components/Loading.vue'
import LoadMore from '@/components/LoadMore.vue'
import END from '@/components/END.vue'
import { gotoPage, replacePage } from '@/assets/util'
import { debounce } from 'lodash'

import { _concernList } from './concernList.js'

export default {
  name: 'QNBMyConcernList',
  data(){
    return {
      concernList: [],
      loading: false,
      infiniteLoad: false,
      pageNow: 1,
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
    this.queryMyConcernList()
    this.concernList = _concernList
  },
  computed: {},
  mounted(){},
  methods:{
    // 查询我关注的酒店列表
    queryMyConcernList: debounce(function(flag){

      let _this = this

      // 如果已经在查询酒店列表，则暂时不允许再查询
      if(_this.loading)   return false
      _this.loading = true

      if(flag){ // 如果是根据新的查询条件重新查询，则重置相关变量
        _this.resetData()
      }

      let params = {pageSize: 10, pageNum: this.pageNow}
      this.$api.eb.syncEBQueryHotelList(params).then(res => {
        console.log('queryMyConcernList');
        _this.loading = false

        if(res.returnCode === 1){
          let content = res.data
          if(content.pageCount <= _this.pageNow){ // 如果所有页面都加载完了，则终止无限加载
            _this.infiniteLoad = true
          }else{
            _this.infiniteLoad = false
            _this.pageNow++
          }

          if(content.data){
            _this.concernList = _this.concernList.concat(content.data)
          }
        }
      })
    }, 300),
    // 取消关注酒店
    deleteConcern(n, i){
      MessageBox.confirm('是否取消关注该供应商？').then(action => {
        let params = {supplierId: n.suppId, infoId: n.infoId}
        this.$api.qnb.syncQNBCancleConcern(params).then(res => {
          this.concernList.splice(i, 1)
          if(res.returnCode === 1){
          }
        })
      });
      
    },
    // 重置相关数据
    resetData(){
      this.concernList = []
      this.pageNow = 1
      this.infiniteLoad = false
    },
    // 跳转到房型列表页，要先验证用户有没有操作权限
    gotoRoomListPage(n){
      let params = {infoId: n.infoId, suppId: n.suppId}
      this.$api.qnb.syncQNBHasAuthority(params).then(res => {
        if(res.returnCode === 1){
          // TO DO
        }
      })
    },
    // 跳转到供应商列表页面，添加关注
    gotoSupplierListPage(){
      gotoPage(this.$router, 'qnbSupplierList', {pageType: 1})
    }
  }
}
</script>

<style lang="scss">
.qnb-concern-list{

  @at-root .qnb-concern-item{
    margin: 0.15rem 0.1rem;
    border-radius: 0.02rem;
    box-shadow: 0 0 0.05rem 0 rgba(0, 0, 0, 0.1);

    .mint-cell-title{
      display: none;
    }

    .mint-cell-value{
      padding: 0.1rem 0;

      @at-root .concern-item-content{

        .info-name{
          color: #333;
          font-size: 0.14rem;
          margin-bottom: 0.05rem;
        }

        .supp-name{
          font-size: 0.12rem;
        }
      }
    }

  }
}
</style>