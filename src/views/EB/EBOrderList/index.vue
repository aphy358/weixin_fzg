<template>
  <div class="page eb-orderlist-page">

    <!-- 头部 -->
    <mt-header title="订单管理"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="page-content" style="background-color: #efeff4;">

      <!-- 顶部搜索栏、筛选按钮、条件过滤按钮等 -->
			<section class="eb-order-list-top">
				<div class="olt-row" style="padding: 0.1rem;background: rgb(239, 239, 244);">
					<div class="olt-search-wrap" @click="showPopup">
						<i class="iconfont icon-search0 searchIcon"></i>
            <span style="color: #D8D8DC;margin-left: 0.05rem;">请输入筛选条件</span>
						<i class="iconfont icon-delete olt-icon-delete hidden"></i>
					</div>

					<div class="olt-filter-wrap" @click="showPopup">
						<i class="iconfont icon-filter"></i>
						<span>筛选</span>
					</div>
				</div>

        <!-- 切换显示的订单状态 -->
				<div class="olt-row">
					<div class="olt-status-wrap">
						<div class="olt-status-item" :class="{'active': activeStatus == '0'}" @click="switchOrderStatus('0')">待处理(<span>{{ tobeConfirmNum }}</span>)</div>
						<div class="olt-status-item" :class="{'active': activeStatus == '1'}" @click="switchOrderStatus('1')">今日入住</div>
						<div class="olt-status-item" :class="{'active': activeStatus == '2'}" @click="switchOrderStatus('2')">已拒单</div>
						<div class="olt-status-item" :class="{'active': activeStatus == '3'}" @click="switchOrderStatus('3')">已取消</div>
						<div class="olt-status-item" :class="{'active': activeStatus == 'a'}" @click="switchOrderStatus('a')">全部</div>
					</div>
				</div>
			</section>

      <GAP />

      <div 
        class="eb-order-list-wrap" 
        style="padding-bottom: 0.4rem;margin-top: 0.05rem;"
        v-infinite-scroll="queryEBOrderList"
        infinite-scroll-disabled="infiniteLoad"
        infinite-scroll-distance="10" >

        <EbOrderItems :orderList="orderResults[activeStatus]" />

        <div v-if="infiniteLoad && orderResults[activeStatus].length < 1" style="text-align: center;color: red;margin: 0.2rem 0;">无相关订单</div>

        <Loading v-if="orderResults[activeStatus].length == 0 && !infiniteLoad" />

        <LoadMore v-if="orderResults[activeStatus].length > 0 && !infiniteLoad" />

        <END v-if="infiniteLoad && orderResults[activeStatus].length > 0" />

      </div>

      <div class="loading-mask" v-if="loading"></div>


      <mt-popup
        style="width: 2.6rem;border-radius: 0.03rem;overflow: hidden;"
        v-model="filterPopupVisible" >
        
        <div class="eol-pop-wrap">
          <div class="eol-pop-title-wrap">
            <span>筛选条件</span>
            <i class="iconfont icon-delete2" style="position: absolute;right: 0;padding: 0 0.08rem;color: #ccc;" @click="hidePopup"></i>
          </div>
          <div class="eol-pop-row">
            <input type="text" placeholder="酒店名称" class="eol-pop-hname" v-model="itemName_c" />
          </div>
          <div class="eol-pop-row">
            <div class="eol-pop-row-subdiv">
              <input type="text" class="eol-pop-date-fake eol-pop-checkin" placeholder="起始日期" readonly :value="beginDate_c" >
              <input type="date" v-model="beginDate_c" style="color: transparent;background: transparent;">
            </div>
            <span></span>
            <div class="eol-pop-row-subdiv">
              <input type="text" class="eol-pop-date-fake eol-pop-checkout" placeholder="终止日期" readonly :value="endDate_c" style="text-align: right;">
              <input type="date" v-model="endDate_c" style="color: transparent;background: transparent;">
            </div>
          </div>
          <div class="eol-pop-row">
            <input type="text" placeholder="订单号" class="eol-pop-ordercode" v-model="orderCode_c" />
          </div>
          <div class="eol-pop-row">
            <input type="text" placeholder="入住人" class="eol-pop-name" v-model="userName_c" />
          </div>

          <div class="eol-pop-btn-wrap">
            <button class="eol-pop-btn-reset" @click="resetFilter">重置</button>
            <button class="eol-pop-btn-confirm" @click="confirmFilter">确定</button>
          </div>
        </div>

      </mt-popup>

    </div>

    <ToTop />

  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import ToTop from '@/components/ToTop.vue'
import END from '@/components/END.vue'
import Loading from '@/components/Loading.vue'
import LoadMore from '@/components/LoadMore.vue'
import GAP from '@/components/GAP.vue'
import { _ebOrderList } from './ebOrderList.js'
import { gotoPage, replacePage, formatDateTwo } from '@/assets/util'
import EbOrderItems from './ebOrderItems'
import { debounce } from 'lodash'


export default {
  name: 'EBOrderList',
  data(){
    return {
      filterPopupVisible: false,
      infiniteLoad: false,
      loading: false,
      tobeConfirmNum: 0,
      orderResults: {'0':[], '1':[], '2':[], '3':[], 'a':[]},
      subParams: {
        '0': { currPage: 1, pageCount: null, finished: false, },
        '1': { currPage: 1, pageCount: null, finished: false, },
        '2': { currPage: 1, pageCount: null, finished: false, },
        '3': { currPage: 1, pageCount: null, finished: false, },
        'a': { currPage: 1, pageCount: null, finished: false, },
      },

      // 订单列表查询条件
      activeStatus: '0',
      itemName: null,
      orderCode: null,
      userName: null,
      beginDate: null,
      endDate: null,

      // popup 临时数据
      itemName_c: null,
      orderCode_c: null,
      userName_c: null,
      beginDate_c: null,
      endDate_c: null,
    }
  },
  props: {},
  components: {
    GoBack,
    ToTop,
    END,
    Loading,
    LoadMore,
    GAP,
    EbOrderItems
  },
  watch: {
    endDate_c(){
      if(this.endDate_c){
        let d2 = +new Date( formatDateTwo(this.endDate_c) )

        if(this.beginDate_c){
          let d1 = +new Date( formatDateTwo(this.beginDate_c) )
    
          if(d1 > d2){
            this.beginDate_c = ''
          }
        }
      }
    },
    beginDate_c(){
      if(this.beginDate_c){
        let d1 = +new Date( formatDateTwo(this.beginDate_c) )

        if(this.endDate_c){
          let d2 = +new Date( formatDateTwo(this.endDate_c) )
    
          if(d1 > d2){
            this.endDate_c = ''
          }
        }
      }
    }
  },
  created(){
    this.queryEBOrderList()
  },
  computed: {},
  mounted(){},
  methods:{
    // 切换显示的订单状态，同时记得更改 infiniteLoad 的状态
    switchOrderStatus(status){
      this.activeStatus = status
      this.infiniteLoad = this.subParams[this.activeStatus].finished

      if(this.subParams[this.activeStatus].pageCount == null){ // 如果某个订单状态下之前从未查过订单，则需要查询订单
        this.queryEBOrderList()
      }
    },
    // 查询 eb 订单列表
    queryEBOrderList: debounce(function(flag){
      if(this.loading)  return
      this.loading = true

      if(flag){ // 表示改变了搜索条件，要先清空之前的搜索数据
        this.resetData()
      }
      
      let params = {
        orderType: this.activeStatus == 'a' ? null : this.activeStatus,
        itemName: this.itemName,
        orderCode: this.orderCode,
        userName: this.userName,
        beginDate: this.beginDate,
        endDate: this.endDate,
        currPage: this.subParams[this.activeStatus].currPage
      }

      this.$api.eb.syncSearchOrderList(params).then(res => {
        this.loading = false

        if(res.returnCode === 1 && res.data){
          // TO DO，将相关数据赋值给 orderResults 和 subParams
          this.orderResults[this.activeStatus] = this.orderResults[this.activeStatus].concat(res.data.item)
          this.subParams[this.activeStatus].currPage = res.data.currPage + 1
          this.subParams[this.activeStatus].pageCount = res.data.pageCount
          this.subParams[this.activeStatus].finished = res.data.currPage >= res.data.pageCount
          this.infiniteLoad = res.data.currPage >= res.data.pageCount

          if(this.activeStatus == 0){
            this.tobeConfirmNum = res.data.nowDateNum
          }
        }
      })
    }, 10),
    // 修改搜索条件，重置相关数据项
    resetData(){
      this.tobeConfirmNum = 0
      this.infiniteLoad = false
      this.orderResults = {'0':[], '1':[], '2':[], '3':[], 'a':[]}
      this.subParams = {
        '0': { currPage: 1, pageCount: null, finished: false, },
        '1': { currPage: 1, pageCount: null, finished: false, },
        '2': { currPage: 1, pageCount: null, finished: false, },
        '3': { currPage: 1, pageCount: null, finished: false, },
        'a': { currPage: 1, pageCount: null, finished: false, },
      }
    },
    // 隐藏条件过滤 popup
    hidePopup(){
      this.filterPopupVisible = false
    },
    // 显示条件过滤 popup
    showPopup(){
      this.itemName_c = this.itemName
      this.orderCode_c = this.orderCode
      this.userName_c = this.userName
      this.beginDate_c = this.beginDate
      this.endDate_c = this.endDate

      this.filterPopupVisible = true
    },
    // popup 点击 '重置'
    resetFilter(){
      this.itemName_c = null
      this.orderCode_c = null
      this.userName_c = null
      this.beginDate_c = null
      this.endDate_c = null
    },
    // popup 点击 '确定'
    confirmFilter(){
      this.itemName = this.itemName_c
      this.orderCode = this.orderCode_c
      this.userName = this.userName_c
      this.beginDate = this.beginDate_c
      this.endDate = this.endDate_c

      this.queryEBOrderList(1)

      this.hidePopup()
    }

  }
}
</script>

<style lang="scss">
.eoli-mycenter {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 0.08rem;
    text-align: center;
    z-index: 4000;
    height: 0.44rem;
    line-height: 0.45rem;
}   

.olt-row{
    position: relative;
    background: white;
    padding: 0 0.1rem;
    overflow: hidden;
}

.olt-row::after,
.eoli-title::after{
    position: absolute;
    bottom: 0;
    left: -0.2rem;
    transform-origin: 50% 100%;
    content: '';
    width: calc(100% + 0.4rem);
    height: 0.01rem;
    display: block;
    background-color: rgba(224, 224, 224, 0.5);
    transform: scaleY(.5);
}

.olt-search-wrap{
    position: relative;
    width: calc(100% - 0.6rem);
    float: left;
    line-height: 0.32rem;
    text-align: center;
    border-radius: 0.18rem;
    background-color: white;
    overflow: hidden;
}

.olt-search-wrap .iconfont{color: #ccc;margin-left: 0.07rem;}
.olt-search-wrap .iconfont.icon-delete{padding: 0.07rem 0.08rem;position: absolute;top: 0;margin-left: 0.03rem;}

.olt-filter-wrap{
  float: right;
  color: #666666;
  height: 0.32rem;
  line-height: 0.32rem;
}
.olt-filter-wrap .iconfont{
    width: 0.16rem;
    height: 0.22rem;
    color: #666666;
    margin-right: 0.02rem;
    margin-top: -0.02rem;
}

.olt-status-wrap{
    display: flex;
    justify-content: space-between;
}

.olt-status-item{
    height: 0.45rem;
    line-height: 0.45rem;
    color: #333333;
}

.olt-status-item.active{
    color: #ff7625;
    border-bottom: 0.02rem solid #ff7625;
    box-sizing: border-box;
}
















.eol-pop-wrap{
    background: white;
}

.eol-pop-title-wrap{
  text-align: center;
  color: #ff7625;
  position: relative;
  line-height: 0.45rem;
  font-size: 0.16rem;
  border-bottom: 0.01rem solid;
}

.pop-single-line{
	margin: 0.6rem 0 0.4rem;
}

.eol-pop-title{
    font-size: 0.16rem;
    height: 0.45rem;
    line-height: 0.45rem;
    text-align: center;
    color: #ff7625;
    border-bottom: 0.01rem solid #ff7625;
    margin-bottom: 0.2rem;
}

.modalCloseBtn{
    position: absolute;
    width: 0.45rem;
    height: 0.45rem;
    background: none;
    border-radius: 0;
    line-height: 0.45rem;
    color: gray;
    right: 0;
}

.modalCloseBtn .iconfont.icon-delete2{
    color: #ccc;
}

.eol-pop-row{
    line-height: 0.4rem;
    overflow: hidden;
    margin: 0.15rem 0.2rem;
    border: 0.01rem solid #eee;
}

.eol-pop-row > input{
    float: left;
    padding: 0 0.1rem;
    width: calc(100% - 0.2rem);
    height: 0.4rem;
    line-height: 0.16rem;
    border: none;
    font-size: 0.14rem;
}

.eol-pop-row-subdiv{
  position: relative;
  margin-top: 0.01rem;
    float: left;
    height: 0.38rem;
    width: calc(50% - 0.05rem);
    overflow: hidden;
}

.eol-pop-row-subdiv input{
    float: left;
    padding: 0 0.1rem;
    width: calc(100% - 0.2rem);
    background: white;
    height: 0.38rem;
    line-height: 0.16rem;
    border: none;
    font-size: 0.14rem;
}

.eol-pop-row-subdiv input[type='date']{
    width: 200%;
    margin-top: -0.4rem;
    color: transparent;
    background: transparent;
}

.eol-pop-row-subdiv+span{
    float: left;
    width: 0.1rem;
    height: 0.01rem;
    background: #eee;
    margin-top: 0.19rem;
}

.eol-pop-btn-wrap{
    margin: 0.2rem 0 0.15rem;
    display: flex;
    justify-content: space-around;
}

.eol-pop-btn-wrap button{
    width: 0.8rem;
    border: none;
    height: 0.35rem;
    border-radius: 0.05rem;
    color: #666;
    font-size: 0.16rem;
    background: #E0E0E0;
}

.eol-pop-btn-cancel{

}

button.eol-pop-btn-confirm{
    color: white;
    background: #ff7625;
}

</style>