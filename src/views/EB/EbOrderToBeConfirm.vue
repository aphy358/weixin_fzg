<template>
  <div class="page eb-order-tobe-confirm-page">
    <!-- 头部 -->
    <mt-header :title="titleText"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem"/>

    <div class="page-content" style="background-color: #efeff4;">
      <div class="eb-oc-block-wrap">
        <div class="eb-oc-block-row line-after" style="height: 0.4rem;line-height: 0.4rem;">
          <span class="eb-oc-block-label">订单编号</span>
          <span class="eb-oc-block-content" style="display: inline;font-size: 0.15rem;">AA18092045457</span>
          <input type="text" value="AA180408478737" id="orderCode" style="position: absolute;right: 100%;" />
          <span
            style="padding: 0.1rem;font-size: 0.12rem;color: #474bf5;"
            data-clipboard-action="copy"
            data-clipboard-target="#orderCode"
            @click="copyOrderCode"
            id="copyBtn"
          >复制</span>
        </div>
        <div class="eb-oc-block-row" style="height: 0.4rem;line-height: 0.4rem;">
          <span class="eb-oc-block-label">订单总额</span>
          <span class="eb-oc-block-content" style="line-height: 0.4rem;">
            <span class="amount">88</span>
            <span class="currency">元</span>
          </span>
        </div>
      </div>

      <div class="eb-oc-block-wrap" style="padding: 0.06rem 0;">
        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">入住时间</span>
          <span class="eb-oc-block-content">2018-09-20 1晚</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">酒店名称</span>
          <span class="eb-oc-block-content">深圳阳光酒店</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">客人姓名</span>
          <span class="eb-oc-block-content">joker</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">订房类型</span>
          <span class="eb-oc-block-content">预定</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">预订房型</span>
          <span class="eb-oc-block-content">单人房</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">价格类型</span>
          <span class="eb-oc-block-content">限住2晚</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">配额类型</span>
          <span class="eb-oc-block-content">包房-剩余库存</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">客户要求</span>
          <span class="eb-oc-block-content">无</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">捷旅备注</span>
          <span class="eb-oc-block-content">无</span>
        </div>
      </div>

      <div class="eb-oc-block-wrap" style="padding: 0.05rem 0;">
        <table>
          <thead>
            <tr style="line-height: 0.3rem;">
              <th>日期</th>
              <th>挂账价</th>
              <th>间数</th>
              <th>床*早*宽</th>
              <th>小计</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09-20</td>
              <td>
                <span class="currency">￥</span>88
              </td>
              <td>1</td>
              <td>0*0*0</td>
              <td>
                <span class="currency">￥</span>88
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <div class="eb-oc-opt-btn-wrap">
      <button :class="{'disable': refuseDisable}" style="background: rgb(245, 76, 76);" @click="clickRefuseBtn">拒绝</button>
      <button :class="{'disable': acceptDisable}" @click="clickAcceptBtn">接受</button>
    </div>

    <!-- 拒绝理由 popup -->
    <mt-popup
      style="width: 3rem;border-radius: 0.03rem;overflow: hidden;"
      v-model="refuseReasonPopupVisible" >

      <div class="eol-pop-wrap">
        <div class="eol-pop-title-wrap">
          <span>请选择拒绝理由</span>
          <i class="iconfont icon-delete2" style="position: absolute;right: 0;padding: 0 0.08rem;color: #ccc;" @click="hideRefuseReasonPopup"></i>
        </div>
      </div>

      <mt-checklist v-model="checkedRefuseArr" :options="refuseArr"></mt-checklist>

      <div class="eol-pop-footer">
        <button @click="submitRefuse">提交</button>
      </div>

    </mt-popup>

    <!-- 接受 popup -->
    <mt-popup
      style="width: 3rem;border-radius: 0.03rem;overflow: hidden;"
      v-model="acceptPopupVisible" >

      <div class="eol-pop-wrap">
        <div class="eol-pop-title-wrap">
          <span>请输入确认号</span>
          <i class="iconfont icon-delete2" style="position: absolute;right: 0;padding: 0 0.08rem;color: #ccc;" @click="hideAcceptPopup"></i>
        </div>
      </div>

      <div style="margin: 0.2rem 0.3rem;">
        <div>
          <input type="text" placeholder="请输入确认号，如无可不填" v-model="hotelCode" class="accept-pop-input">
        </div>
        <mt-checklist v-model="checkedFinallyOrderArr" :options="finallyOrderArr" style="padding: 0;margin-left: -0.1rem;"></mt-checklist>
      </div>

      <div class="eol-pop-footer">
        <button @click="submitAccept">提交</button>
      </div>

    </mt-popup>

  </div>
</template>

<script>
import GoBack from "@/components/GoBack.vue"
import Clipboard from 'clipboard'
import { Toast } from 'mint-ui'
import { queryString } from '@/assets/util'

export default {
  name: "EbOrderToBeConfirm",
  data() {
    return {
      titleText: '',
      orderId: null,

      // 供应商状态(status) -1:待处理 0已发送 5申请取消 (待确认)    1已确认 2已拒单 3已取消 4不取消
      orderStatus: null,

      acceptPopupVisible: false,
      refuseReasonPopupVisible: false,
      checkedRefuseArr: [],
      refuseArr: [
        {label: '重复预订', value: '重复预订'},
        {label: '提供出生日期', value: '提供出生日期'},
        {label: '价格不对', value: '价格不对'},
        {label: '满房', value: '满房'},
        {label: '请使用包房配额', value: '请使用包房配额'},
        {label: '保证入住/GTD', value: '保证入住/GTD'},
        {label: '提供联系号码', value: '提供联系号码'},
        {label: '床型无法安排', value: '床型无法安排'},
      ],
      hotelCode: null,
      checkedFinallyOrderArr: [],
      finallyOrderArr: [{label: '末单确认', value: '末单确认'},],
      refuseDisable: false,
      acceptDisable: false,

    };
  },
  props: {},
  components: {
    GoBack
  },
  watch: {
    orderStatus(){
      this.getTitleAndInitFooterBtns()
    }
  },
  created() {
  },
  activated(){
    this.getQueryParams()
    this.getTitleAndInitFooterBtns()
    this.queryOrderInfo()
  },
  computed: {},
  mounted() {},
  methods: {
    // 点击 '复制'
    copyOrderCode() {
      var clipboard = new Clipboard('#copyBtn')
      clipboard.on('success', function(e) {
          e.clearSelection()
          Toast("复制成功！")
      });
    },
    // 获取 url 参数
    getQueryParams(){
      this.orderId = queryString('id')
      this.orderStatus = queryString('status')
    },
    // 获取页面标题并且初始化底部俩按钮的状态
    getTitleAndInitFooterBtns(){
      let o = this.orderStatus

      this.titleText =
        o == '-1' ? '待确认' :
        o == '0'  ? '待确认' :
        o == '1'  ? '已确认' :
        o == '2'  ? '已拒单' :
        o == '3'  ? '已取消' :
        o == '4'  ? '不可取消' :
        o == '5'  ? '申请取消' : '未知状态'

      if(o == '1'){ // 已确认订单只能修改确认号
        this.refuseDisable = true
      }

      if(o == '2' || o == '3' || o == '4'){ // 已拒单、已取消、不可取消 都不可以再有任何操作
        this.refuseDisable = true
        this.acceptDisable = true
      }
    },
    // 查询订单信息
    queryOrderInfo(){
      let param = {orderid: this.orderId}

      this.$api.eb.syncQueryOrderInfo1(param).then(res => {
        //*** 上线放开 */
        return
        if(res.returnCode === 1){

        }else if(res.errcode == 'notLogin'){
          // 跳转到微信 eb 登录页
          replacePage(this.$router, 'eblogin')
        }else{
          Toast(res.returnMsg)
        }
      })

      this.$api.eb.syncQueryOrderInfo2(param).then(res => {
        //*** 上线放开 */
        return
        if(res.returnCode === 1){

        }else if(res.errcode == 'notLogin'){
          // 跳转到微信 eb 登录页
          replacePage(this.$router, 'eblogin')
        }else{
          Toast(res.returnMsg)
        }
      })
    },
    // 取消订单
    cancelOrder(){
      let param = {"status": 3, "orderInfoId": this.orderId, "textVal": "", "isChange": ""}
      this.$api.eb.syncHandleOrder(param).then(res => {
        //*** 上线放开 */
        return
        if(res.returnCode === 1){
          // 已取消，俩按钮都不可操作
          this.orderStatus = '3'
          Toast('订单已取消！')
        }else if(res.errcode == 'notLogin'){
          // 跳转到微信 eb 登录页
          replacePage(this.$router, 'eblogin')
        }else{
          Toast(res.returnMsg)
        }
      })
    },
    // 拒绝取消订单
    refuseCancelOrder(){
      let param = {"status": 4, "orderInfoId": this.orderId, "textVal": "", "isChange": ""}
      this.$api.eb.syncHandleOrder(param).then(res => {
        //*** 上线放开 */
        return
        if(res.returnCode === 1){
          // 不可取消，俩按钮都不可操作
          this.orderStatus = '4'
          Toast('已拒绝取消！')
        }else if(res.errcode == 'notLogin'){
          // 跳转到微信 eb 登录页
          replacePage(this.$router, 'eblogin')
        }else{
          Toast(res.returnMsg)
        }
      })
    },
    // 拒绝订单
    refuseOrder(){
      let param = {"status": 2, "orderInfoId": this.orderId, "textVal": this.checkedRefuseArr.join(','), "isChange": ""}

      this.$api.eb.syncHandleOrder(param).then(res => {
        //*** 上线放开 */
        return
        if(res.returnCode === 1){
          // 已拒单，俩按钮都不可操作
          this.orderStatus = '2'
          Toast('已拒单！')
        }else if(res.errcode == 'notLogin'){
          // 跳转到微信 eb 登录页
          replacePage(this.$router, 'eblogin')
        }else{
          Toast(res.returnMsg)
        }
      })
    },
    // 确认订单
    confirmOrder(){
      let param = {"status": 1, "orderInfoId": this.orderId, "textVal": this.hotelCode, "isChange": this.hotelCode != 'oldVal' ? 1 : ""}

      this.$api.eb.syncHandleOrder(param).then(res => {
        //*** 上线放开 */
        return
        if(res.returnCode === 1){
          if(this.checkedFinallyOrderArr.length && 'extId'){
            this.updateOrderSuppRemark()
          }else{
            this.orderStatus = '1'
            Toast('订单确认成功！')
          }
        }else if(res.errcode == 'notLogin'){
          // 跳转到微信 eb 登录页
          replacePage(this.$router, 'eblogin')
        }else{
          Toast(res.returnMsg)
        }
      })
    },
    // 更新供应商 Remark
    updateOrderSuppRemark(){
      let param = {"orderExtId": 'extId', "suppReturnRemark": "末单确认"}

      this.$api.eb.syncUpdateOrderSuppRemark(param).then(res => {
        console.log('updateOrderSuppRemark');
        //*** 上线放开 */
        return
        if(res.returnCode === 1){

        }else if(res.errcode == 'notLogin'){
          // 跳转到微信 eb 登录页
          replacePage(this.$router, 'eblogin')
        }else{
          Toast(res.returnMsg)
        }
      })
    },
    // 隐藏拒绝原因 popup
    hideRefuseReasonPopup(){
      this.refuseReasonPopupVisible = false
    },
    //
    hideAcceptPopup(){
      this.acceptPopupVisible = false
    },
    // 点击 '拒绝' 按钮
    clickRefuseBtn(){
      if(!this.refuseDisable){
        let o = this.orderStatus

        if(o == '-1' || o == '0'){
          this.refuseReasonPopupVisible = true
        }else{
          this.refuseCancelOrder()
        }
      }
    },
    // 点击 '接受' 按钮
    clickAcceptBtn(){
      if(!this.acceptDisable){
        let o = this.orderStatus

        if(o == '-1' || o == '0' || o == '1'){
          this.acceptPopupVisible = true
        }else{
          this.cancelOrder()
        }
      }
    },
    // 提交拒绝理由
    submitRefuse(){
      if(this.checkedRefuseArr.length < 1){
        return Toast('至少选择一个理由！');
      }

      this.hideRefuseReasonPopup()
      this.refuseOrder()
    },
    // 提交接受
    submitAccept(){
      this.hideAcceptPopup()
      this.confirmOrder()
    },
  }
};
</script>

<style lang="scss">
.eb-oc-block-wrap {
  margin-bottom: 0.1rem;
  background: white;

  .eb-oc-block-row {
    line-height: 0.25rem;
    padding: 0 0.15rem;

    .eb-oc-block-label {
      float: left;
      color: #999999;
      width: 0.8rem;
    }

    .eb-oc-block-content {
      display: inline-block;
      width: calc(100% - 0.8rem);
      line-height: 0.16rem;

      .amount {
        font-size: 0.24rem;
        color: #ff7625;
        margin-right: 0.02rem;
      }

      .currency {
        color: #ff7625;
        font-size: 0.1rem;
      }
    }
  }

  table {
    width: 100%;

    tr {
      position: relative;
      line-height: 0.2rem;
    }

    th {
      font-weight: normal;
      // line-height: 0.3rem;
    }

    td {
      text-align: center;

      .currency {
        font-size: 0.1rem;
      }
    }
  }
}

.eb-oc-opt-btn-wrap{
  position: fixed;
  bottom: 0;
  width: 100%;

  button{
    height: 0.4rem;
    line-height: 0.4rem;
    border: none;
    width: 50%;
    color: white;
    font-size: 0.16rem;
    background: #389c38;

    &.disable{
      background: #ccc!important;
    }
  }
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


.mint-checkbox-core{
    width: 0.14rem;
    height: 0.14rem;
    top: -0.01rem;

    &:after{
        top: 0.015rem;
        left: 0.045rem;
        width: 0.03rem;
        height: 0.07rem;
    }
}

.mint-checkbox-label{
    color: #333333;
    margin-left: 0.03rem;
}
.mint-cell-wrapper{
    font-size: 0.14rem;
    background-image: none;
}
.mint-cell{
    min-height: 0.35rem;
}

.mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #ff7625;
    border-color: #ff7625;
}


.mint-checklist{
  padding-left: 0.1rem;
  overflow: hidden;
}

.mint-checklist .mint-cell{
  width: 50%;
  float: left;
}

.mint-checklist-label{
  padding: 0;
}

.mint-toast{
  z-index: 9999;
}

.eol-pop-footer{
  margin: 0.15rem 0.3rem;

  button{
    border: none;
    width: 100%;
    height: 0.3rem;
    color: white;
    background: #ff7625;
    border-radius: 0.02rem;
  }
}

.accept-pop-input{
  width: 100%;
  border: none;
  border-bottom: 0.01rem solid #ccc;
  line-height: 0.3rem;
  padding-left: 0.05rem;
}

</style>