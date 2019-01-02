<template>
  <ul class="eb-order-list">
    <li class="eb-order-list-item" v-for="(n, i) in orderList" :key="i" @click="gotoConfirmPage(n)">
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
</template>

<script>
import { gotoPage } from '@/assets/util'

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
  name: 'ebOrderItems',
  data(){
    return {}
  },
  props: ['orderList'],
  components: {},
  watch: {},
  created(){},
  computed: {},
  mounted(){},
  methods:{
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
    // 跳转到订单待确认页（或取消页）
    gotoConfirmPage(order){
      gotoPage(this.$router, 'ebOrderToBeConfirm', {id: order.orderInfoId, status: order.status})
    }
  }
}
</script>

<style lang="scss">

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
    position: relative;
    height: 0.2rem;
    padding: 0.1rem 0;
    overflow: hidden;
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