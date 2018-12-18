<template>
  <div class="page eb-orderlist-page">

    <!-- 头部 -->
    <mt-header title="订单管理"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="page-content" style="background-color: #efeff4;">

      <!-- 顶部搜索栏、筛选按钮、条件过滤按钮等 -->
			<section class="eb-order-list-top">
				<div class="olt-row" style="padding: 0.1rem;">
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

      
    </div>
  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import END from '@/components/END.vue'

export default {
  name: 'EBOrderList',
  data(){
    return {
      activeStatus: '0',

    }
  },
  props: {},
  components: {
    GoBack,
    END
  },
  watch: {},
  created(){},
  computed: {},
  mounted(){},
  methods:{
    switchOrderStatus(status){
      this.activeStatus = status
    },

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
    background-color: #efefef;
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


.eb-order-list-wrap{
    margin-top: 0.15rem;
    margin-bottom: 0;
}

.eb-order-list-item{
    background: white;
    padding: 0 0.1rem;
    margin-bottom: 0.15rem;
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
    font-size: 0.15rem;
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