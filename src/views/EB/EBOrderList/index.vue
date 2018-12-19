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
					<div class="olt-search-wrap">
						<i class="iconfont icon-search0 searchIcon"></i>
            <span style="color: #D8D8DC;margin-left: 0.05rem;">请输入筛选条件</span>
						<i class="iconfont icon-delete olt-icon-delete hidden"></i>
					</div>

					<div class="olt-filter-wrap">
						<i class="iconfont icon-filter"></i>
						<span>筛选</span>
					</div>
				</div>

				<div class="olt-row">
					<div class="olt-status-wrap">
						<div class="olt-status-item" :class="{'active': activeStatus == '0'}" @click="switchOrderStatus('0')">待处理(<span>0</span>)</div>
						<div class="olt-status-item" :class="{'active': activeStatus == '1'}" @click="switchOrderStatus('1')">今日入住</div>
						<div class="olt-status-item" :class="{'active': activeStatus == '2'}" @click="switchOrderStatus('2')">已拒单</div>
						<div class="olt-status-item" :class="{'active': activeStatus == '3'}" @click="switchOrderStatus('3')">已取消</div>
						<div class="olt-status-item" :class="{'active': activeStatus == 'a'}" @click="switchOrderStatus('a')">全部</div>
					</div>
				</div>
			</section>

      <GAP />

      <div class="eb-order-list-wrap" style="padding-bottom: 0.4rem;margin-top: 0.05rem;">
        <ul 
          class="eb-order-list"
          v-infinite-scroll="queryEBOrderList"
          infinite-scroll-disabled="infiniteLoad"
          infinite-scroll-distance="10">

          <li class="eb-order-list-item" v-for="(n, i) in orderResults[activeStatus]" :key="i">
            <div class="eoli-title">
              <span v-html="getStatus(n.status)"></span>
              <span v-html="getAttribute(n.attribute)"></span>
            </div>
            <div class="eoli-sub-title">
              <div class="eoli-sub-title-row">
                <label>订单号/入住人：</label>
                <span>{{ n.orderCode + '/' + (n.userName || '').split(',')[0] }}</span>
              </div>
              <div class="eoli-sub-title-row">
                <label>下单时间：</label>
                <span>{{ n.createTime }}</span>
              </div>
              <div class="eoli-sub-title-row">
                <label>已发渠道：</label>
                <span class="blue">{{ (n.sendType || '无') }}</span>
              </div>
            </div>
            <div class="eoli-main-content">
              <p class="eoli-hname">{{ n.itemName }}</p>
              <p class="eoli-room">{{ n.roomType + ' - ' + n.acount + '间' }}</p>
              <p class="eoli-hname">{{ n.distrbName }}</p>
              <div class="eoli-price-outer">
                <span class="eoli-date">{{ n.beginDate + '至' + n.endDate + ' 共' + n.days + '晚' }}</span>
                <span class="eoli-price-wrap">{{ n.currency + ':' }}<span class="eoli-price-num">{{ n.basePrice }}</span></span>
              </div>
            </div>
          </li>

        </ul>

        <div v-if="infiniteLoad && orderResults[activeStatus].length < 1" style="text-align: center;color: red;margin: 0.2rem 0;">无相关订单</div>

        <END v-if="infiniteLoad && orderResults[activeStatus].length > 0" />

      </div>

      <mt-popup
        v-model="getAreaBizPopupVisible"
        position="bottom">
      
        

      </mt-popup>

    </div>
  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import END from '@/components/END.vue'
import GAP from '@/components/GAP.vue'
import { _ebOrderList } from './ebOrderList.js'
import { gotoPage, replacePage } from '@/assets/util'

const orderStatus = [
  {status: 'to-be-confirm', icon: 'icon-daichuli', name: '待处理'},
  {status: 'to-be-confirm', icon: 'icon-daichuli', name: '待处理'},
  {status: 'confirmed', icon: 'icon-yiqueren', name: '已确认'},
  {status: 'refused', icon: 'icon-yijudan', name: '已拒单'},
  {status: 'canceled', icon: 'icon-yiquxiao', name: '已取消'},
  {status: 'apply-cancel', icon: 'icon-shenqingquxiao', name: '不可取消'},
  {status: 'apply-cancel', icon: 'icon-shenqingquxiao', name: '申请取消'},
]

export default {
  name: 'EBOrderList',
  data(){
    return {
      infiniteLoad: true,
      orderResults: {'0':[], '1':[], '2':[], '3':[], 'a':[]},
      subParams: {
        '0': {
          currPage: 1,
          pageCount: 1,
        },
        '1': {
          currPage: 1,
          pageCount: 1,
        },
        '2': {
          currPage: 1,
          pageCount: 1,
        },
        '3': {
          currPage: 1,
          pageCount: 1,
        },
        'a': {
          currPage: 1,
          pageCount: 1,
        },
      },


      // 订单列表查询条件
      activeStatus: '0',
      itemName: null,
      orderCode: null,
      userName: null,
      beginDate: null,
      endDate: null,
    }
  },
  props: {},
  components: {
    GoBack,
    END,
    GAP
  },
  watch: {},
  created(){
    for (const key in this.orderResults) {
      this.orderResults[key] = _ebOrderList.filter(n => n.status == key)
    }
    this.orderResults.a = _ebOrderList

    this.queryEBOrderList()
  },
  computed: {},
  mounted(){},
  methods:{
    // 切换显示的订单状态，同时记得更改 infiniteLoad 的状态
    switchOrderStatus(status){
      this.activeStatus = status
    },
    // 获取订单状态的显示，如 '待处理'、'申请取消' 等图标
    getStatus(status){
      var st = orderStatus[++status]
      if(!st){
        st = {status: 'canceled', icon: 'icon-yiquxiao', name: '未知状态'}
      }
      return '<span class="eoli-status-item ' + st.status + '"><i class="iconfont ' + st.icon + '"></i>' + st.name + '</span>';
    },
    // 获取订单属性，如 '新订'、'取消' 等字样
    getAttribute(attribute){
      var clazz =
          ~attribute.indexOf('新订') ? 'new-book' :
          ~attribute.indexOf('取消') ? 'cancel' :
          ~attribute.indexOf('修改') ? 'erase' : '';

      return '<span class="eoli-attr-flag ' + clazz + '">' + attribute + '</span>';
    },
    // 查询 eb 订单列表
    queryEBOrderList(){
      let params = {
        orderType: this.activeStatus,
        itemName: this.itemName,
        orderCode: this.itemName,
        userName: this.userName,
        beginDate: this.beginDate,
        endDate: this.endDate,
        currPage: this.subParams[this.activeStatus].currPage
      }

      this.$api.eb.syncSearchOrderList(params).then(res => {
        //*** 上线放开 */
        return
        if(res.returnCode === 1){
          // TO DO，将相关数据赋值给 orderResults 和 subParams

        }else if(res.errcode == 'notLogin'){
          // 跳转到微信 eb 登录页
          replacePage(this.$router, 'eblogin')
        }else{
          Toast(res.returnMsg)
        }
      })
    },
    // 修改搜索条件，重置相关数据项
    resetData(){
      this.infiniteLoad = false
      this.orderResults = {'0':[], '1':[], '2':[], '3':[], 'a':[]}
      this.subParams = {
        '0': {
          currPage: 1,
          pageCount: 1,
        },
        '1': {
          currPage: 1,
          pageCount: 1,
        },
        '2': {
          currPage: 1,
          pageCount: 1,
        },
        '3': {
          currPage: 1,
          pageCount: 1,
        },
        'a': {
          currPage: 1,
          pageCount: 1,
        },
      }
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

.olt-row,
.eoli-title{
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


.eb-order-list-item{
    background: white;
    padding: 0 0.1rem;
    margin-bottom: 0.1rem;
    color: #666666;
    overflow: hidden;
}

.eb-order-list-item:last-child{
    margin-bottom: 0;
}

.eoli-title{
    height: 0.2rem;
    padding: 0.1rem 0;
}

.eoli-title img{
    height: 0.2rem;
}

.eoli-attr-flag{
    float: right;
    border: 0.01rem solid;
    font-size: 0.12rem;
    padding: 0 0.1rem;
    border-radius: 0.1rem;
    height: 0.18rem;
    line-height: 0.18rem;
}

.eoli-title span.new-book{
    color: #FBBD85;
    border-color: #FBBD85;
}

.eoli-title span.cancel{
    color: #aaa;
    border-color: #aaa;  
}

.eoli-title span.erase{
    color: #79C6FB;
    border-color: #79C6FB;
}


.eoli-sub-title{
    position: relative;
    padding: 0.1rem 0 0;
}

.eoli-sub-title::after{
    position: absolute;
    bottom: -0.08rem;
    left: 0;
    transform-origin: 50% 100%;
    content: '';
    width: 100%;
    height: 0.01rem;
    display: block;
    border-bottom: 0.01rem dashed rgba(200, 199, 204, 0.65);
    transform: scaleY(.5);
}

.eoli-sub-title-row{
    margin-bottom: 0.02rem;
}

.eoli-sub-title-row label{
    float: left;
    color: #999;
}

.eoli-sub-title-row .blue{
    color: #4848F3;
}

.eoli-main-content{
    margin-top: 0.16rem;
}

.eoli-hname{
    color: #333333;
    margin: 0;
    // font-size: 0.13rem;
}

.eoli-room{
    margin: 0.02rem 0;
}

.eoli-price-outer{
    overflow: hidden;
    margin: 0.05rem 0 0.1rem;
    height: 0.25rem;
    line-height: 0.25rem;
}

.eoli-date{
    font-size: 0.12rem;
    float: left;
    color: #999;
}

.eoli-price-wrap{
    font-size: 0.12rem;
    float: right;
    color: rgb(241, 88, 152);
}

.eoli-price-num{
    font-size: 0.18rem;
}


.eoli-status-item{
    float: left;
    font-size: 0.12rem;
    color: white;
    padding: 0 0.1rem;
    border-radius: 0.1rem;
    height: 0.2rem;
    line-height: 0.2rem;
}

.eoli-status-item i{
    float: left;
    margin-right: 0.03rem;
    font-size: 0.14rem;
}


.eoli-status-item.to-be-confirm{
    background: linear-gradient(to bottom, #6CB7FF , #8B9CF8);
}

.eoli-status-item.canceled{
    background: linear-gradient(to bottom, #CBCBCB , #9B9B9B);
}

.eoli-status-item.confirmed{
    background: linear-gradient(to bottom, #75E59C , #51C4D7);
}

.eoli-status-item.apply-cancel{
    background: linear-gradient(to bottom, #FBDEA6 , #FFAD43);
}

.eoli-status-item.refused{
    background: linear-gradient(to bottom, #F7A3BD , #F2818C);
}

</style>