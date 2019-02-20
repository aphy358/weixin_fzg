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
          <span class="eb-oc-block-content" style="display: inline;font-size: 0.15rem;">{{ orderInfo.parentOrderCode }}</span>
          <input type="text" :value="orderInfo.parentOrderCode" id="orderCode" style="position: absolute;right: 100%;" />
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
            <span class="amount">{{ totalPrice }}</span>
            <span class="currency">{{ orderInfo.currency }}</span>
          </span>
        </div>
      </div>

      <div class="eb-oc-block-wrap" style="padding: 0.06rem 0;">
        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">入住时间</span>
          <span class="eb-oc-block-content">{{ checkinPeriod }}</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">酒店名称</span>
          <span class="eb-oc-block-content">{{ orderInfo.itemName }}</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">客人姓名</span>
          <span class="eb-oc-block-content">{{ userName }}</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">订房类型</span>
          <span class="eb-oc-block-content">预订</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">预订房型</span>
          <span class="eb-oc-block-content">{{ roomType }}</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">价格类型</span>
          <span class="eb-oc-block-content">{{ rateType }}</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">配额类型</span>
          <span class="eb-oc-block-content">{{ formulateType }}</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">客户要求</span>
          <span class="eb-oc-block-content">无</span>
        </div>

        <div class="eb-oc-block-row">
          <span class="eb-oc-block-label">捷旅备注</span>
          <span class="eb-oc-block-content">{{ suppRemark }}</span>
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
            <tr v-for="(n, i) in orderChargeList" :key="i">
              <td>{{ n.checkinDate }}</td>
              <td>
                <span class="currency">￥</span>{{ n.basePrice }}
              </td>
              <td>{{ n.sellAmout }}</td>
              <td>{{ n.bedNum }}*{{ n.brfNum }}*{{ n.wifiNum }}</td>
              <td>
                <span class="currency">￥</span>{{ n.subTotal }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="order-record-wrap" v-html="logList"></div>

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
          <input type="text" placeholder="请输入确认号，如无可不填" v-model="hotelCode" @keyup="hotelCodeInput" @input="hotelCodeInput" class="accept-pop-input">
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
import { queryString, addDays, formatDateTwo, formatDateOne } from '@/assets/util'

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
      hotelCode: '',
      checkedFinallyOrderArr: [],
      finallyOrderArr: [{label: '末单确认', value: '末单确认'},],
      refuseDisable: true,
      acceptDisable: true,

      // 以下是订单页面基础信息字段
      orderInfo: {},      // 订单信息（部分）
      userName: '',       // 入住人
      orderExtId: '',
      suppRemark: '',     // 捷旅备注
      hotelOrderCode: '', // 确认号
      roomType: '',       // 房型
      rateType: '',       // 价格类型
      formulateType: '',  // 配额类型
      checkinPeriod: '',  // 入住时间区间
      totalPrice: 0,      // 订单总计
      orderChargeList: [],// 订单费用清单列表
      logList: '',        // 日志列表

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
    if(!window.goBack){
      this.resetData()
      this.getQueryParams()
      this.getTitleAndInitFooterBtns()
      this.queryOrderInfo()
    }
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
    // 重置数据
    resetData(){
      this.acceptPopupVisible = false
      this.refuseReasonPopupVisible = false
      this.checkedRefuseArr = []

      this.orderInfo = {}
      this.userName = ''
      this.orderExtId = ''
      this.suppRemark = ''
      this.hotelOrderCode = ''
      this.roomType = ''
      this.rateType = ''
      this.formulateType = ''
      this.checkinPeriod = ''
      this.totalPrice = 0
      this.orderChargeList = []
      this.logList = ''
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

      this.refuseDisable = true
      this.acceptDisable = true
    },
    // 查询订单信息
    queryOrderInfo(){
      let param = {orderId: this.orderId}

      this.$api.eb.syncQueryOrderInfo2(param).then(res => {
        if(res.returnCode === 1){
          this.orderInfo = res.data.orderInfo

          // 查询住客
          this.queryTenant({orderCode: res.data.orderInfo.parentOrderCode, orderId: this.orderId})

          // 获取入住区间，从哪天到哪天，一共几晚
          this.getCheckinPeriod(res.data.orderInfo)

          let orderInfoExt = res.data.orderInfoExt

          this.orderExtId = orderInfoExt.orderExtId

          // 捷旅备注
          this.suppRemark = orderInfoExt.suppRemark

          // 获取确认号、房型、价格类型
          this.getOrderInfo1(res.data.hotelCode)

          // 配额类型
          this.formulateType = res.data.itemName

          // 获取订单详情（处理子单费用清单、杂费等）
          this.getOrderChargeList(res.data.subOrderList, res.data.orderSurchargeList)

          // 获取订单日志
          this.getOrderLogs(res.data.logs)

          // 设置底部俩按钮的状态：'拒绝'、'接受'
          this.setOperatorBtnStatus(res.data.orderInfo)
        }
      })
    },
    // 设置底部俩按钮的状态：'拒绝'、'接受'
    setOperatorBtnStatus(orderInfo){
      // 供应商状态(status) -1:待处理 0已发送 5申请取消 (待确认)    1已确认 2已拒单 3已取消 4不取消
      if(orderInfo.status == 5){
        if(orderInfo.innerStatus == 2 || orderInfo.innerStatus == 4){
          this.refuseDisable = false
          this.acceptDisable = false
        }
      }else if(orderInfo.status == -1 || orderInfo.status  == 0){
        this.refuseDisable = false
        this.acceptDisable = false
      }else if(orderInfo.status == 1){
        this.acceptDisable = false
      }
    },
    // 获取订单日志
    getOrderLogs(logs){
      if(logs){
        for (let i = 0; i < logs.length; i++) {
          const log = logs[i]
          if((log.operateFrom == '2' && log.opertatorType != 11) || (log.operateFrom == '3' && log.opertatorType != 11)){

            this.logList += `
              <div class="order-record">
                <span class="mr-5">${log.createTime.substring(0, 10)}</span>
                <span class="mr-5">${log.opertatorType == '26' ? '发送微信EB' : log.newValue}</span>
                <span class="mr-5">${log.operateFrom == 3 ? log.operatorName : 'system'}</span>
                ${log.opertatorType == '26' ? '<div class="tellPhone">0755-33397777</div>' : ''}
              </div>
              `
          }
        }
      }
    },
    // 获取入住区间，从哪天到哪天，一共几晚
    getCheckinPeriod(orderInfo){
      let checkin = formatDateOne(orderInfo.beginDate)
      let checkout = formatDateOne(orderInfo.endDate)
      let nights = (new Date(checkout) - new Date(checkin)) / (24*60*60*1000)
      this.checkinPeriod = addDays(new Date(checkin), 0, '/') + ' - ' + addDays(new Date(checkout), 0, '/') + ' (' + nights + '晚)'
    },
    // 获取订单详情（处理子单费用清单、杂费等）
    getOrderChargeList(subOrderList, orderSurchargeList){
      if(subOrderList && subOrderList.length > 0){

        for (let i = 0; i < subOrderList.length; i++) {
          const subOrder = subOrderList[i]

          this.totalPrice += subOrder.basePrice   // 这个字段就应该是保存了该子单的总费用，包含杂费，也扣除了房劵等，我是这么想的

          for (let j = 0; j < subOrder.orderDetails.length; j++) {
            const orderDetail = subOrder.orderDetails[j];
            if(orderDetail.ifValid == '1')  continue

            let bedNum = 0
            let brfNum = 0
            let wifiNum = 0
            let checkinDate = addDays(new Date(formatDateOne(orderDetail.checkinDate)), 0)    // 该订单明细下的某一天日期

            let subTotal = (+orderDetail.basePrice) * (+orderDetail.sellAmout)

            // 如果有房券，则总价需要扣除这部分价格（不应该这么麻烦的计算订单总额，注释掉）
            // if(orderDetail.orderVouchers){
            //   this.totalPrice -= (orderDetail.basePrice - orderDetail.orderVouchers.basePrice) * orderDetail.orderVouchers.vouchersNum
            // }

            // 计算杂费..杂费金额加入总计，加入小计
            if(orderSurchargeList){
              for (let k = 0; k < orderSurchargeList.length; k++) {
                const orderSurcharge = orderSurchargeList[k]
                let surDate = addDays(new Date(formatDateOne(orderSurcharge.startTime)), 0)

                if(checkinDate == surDate){
                  // 统计加床.加早.加宽带数量，附加费类型 1为加早 2为加床 3为宽带
                  if(orderSurcharge.typeId == 1){
                    brfNum += (+orderSurcharge.sellReal)
                  }else if(orderSurcharge.typeId == 2){
                    bedNum += (+orderSurcharge.sellReal)
                  }else if(orderSurcharge.typeId == 3){
                    wifiNum += (+orderSurcharge.sellReal)
                  }

                  subTotal += orderSurcharge.basePrice * orderSurcharge.sellReal
                }
              }
            }

            this.orderChargeList.push({
              checkinDate: checkinDate,
              basePrice: orderDetail.basePrice,
              sellAmout: orderDetail.sellAmout,
              bedNum: bedNum,
              brfNum: brfNum,
              wifiNum: wifiNum,
              subTotal: subTotal
            })

            // this.totalPrice += subTotal   // 订单总价叠加（不应该这么麻烦的计算订单总额，注释掉）
          }
        }
      }
    },
    // 获取确认号、房型、价格类型
    getOrderInfo1(hotelCode){
      if(hotelCode){
        let attr = hotelCode.attr
        if(attr){
          let attrs = attr.split(";")
          for(let attrIdx = 0; attrIdx < attrs.length; attrIdx++){
            var attrStr = attrs[attrIdx]
            var attrValue = attrStr.split(":")[1]

            if(attrStr.indexOf("hotelOrderCode") != -1){  // 确认号
              this.hotelOrderCode = attrValue.replace("%%", ",")
              this.hotelCode = this.hotelOrderCode
            }else if(attrStr.indexOf("roomtype") != -1){  // 房型
              this.roomType = attrValue.split("#")[1]
            }else if(attrStr.indexOf("ratetype") != -1){  // 价格类型
              this.rateType = attrValue.split("#")[1]
            }
          }
        }
      }
    },
    // 查询住客
    queryTenant(params){
      this.$api.eb.syncQueryUser(params).then(res => {
        if(res.returnCode === 1){
          if(res.data && res.data.orderUsers){
            // 入住人
            this.userName = res.data.orderUsers.map(n => n.firstName + n.lastName).join('，')
          }
        }
      })
    },
    // 取消订单
    cancelOrder(){
      let param = {"status": 3, "orderInfoId": this.orderId, "textVal": "", "isChange": ""}
      this.$api.eb.syncHandleOrder(param).then(res => {
        if(res.returnCode === 1){
          // 已取消，俩按钮都不可操作
          this.orderStatus = '3'
          Toast('订单已取消！')
        }
      })
    },
    // 拒绝取消订单
    refuseCancelOrder(){
      let param = {"status": 4, "orderInfoId": this.orderId, "textVal": "", "isChange": ""}
      this.$api.eb.syncHandleOrder(param).then(res => {
        if(res.returnCode === 1){
          // 不可取消，俩按钮都不可操作
          this.orderStatus = '4'
          Toast('已拒绝取消！')
        }
      })
    },
    // 拒绝订单
    refuseOrder(){
      let param = {"status": 2, "orderInfoId": this.orderId, "textVal": this.checkedRefuseArr.join(','), "isChange": ""}

      this.$api.eb.syncHandleOrder(param).then(res => {
        if(res.returnCode === 1){
          // 已拒单，俩按钮都不可操作
          this.orderStatus = '2'
          Toast('已拒单！')
        }
      })
    },
    // 确认订单
    confirmOrder(){
      let pattern

      // 去哪儿确认号，只能是数字、大小写字母、逗号
      if(!!this.hotelCode.replace(/^\s+|\s+$/g, '')){
        if(this.orderInfo.suppId == '31334'){
          pattern = new RegExp("^[a-zA-Z 0-9  ， ,]+$")
          if(!pattern.test(this.hotelCode)){
            Toast('去哪儿客户确认号 只能输入数字、 大小字母或逗号！')
            return false
          }
        }else{
          pattern = new RegExp("^[a-zA-Z 0-9  ， % \\- _ () ‘ ’ '' & @ ,]+$")
          if(!pattern.test(this.hotelCode)){
            Toast('确认号格式有误！')
            return false
          }
        }
      }

      let param = {"status": 1, "orderInfoId": this.orderId, "textVal": this.hotelCode, "isChange": this.hotelCode != this.hotelOrderCode ? 1 : ""}

      this.$api.eb.syncHandleOrder(param).then(res => {
        if(res.returnCode === 1){
          if(this.checkedFinallyOrderArr.length && this.orderExtId){
            this.updateOrderSuppRemark()
          }else{
            this.orderStatus = '1'
            Toast('订单确认成功！')
          }
        }
      })

      this.hideAcceptPopup()
    },
    // 更新供应商 Remark（修改确认号？）
    updateOrderSuppRemark(){
      // 这里 orderExtId 一定要传数字型参数
      let param = {"orderExtId": this.orderExtId, "suppReturnRemark": "末单确认"}

      this.$api.eb.syncUpdateOrderSuppRemark(param).then(res => {
        if(res.returnCode === 1){
          this.orderStatus = '1'
          Toast('订单确认成功！')
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
      this.confirmOrder()
    },
    // 输入确认号
    hotelCodeInput($event){
      this.hotelCode = $event.srcElement.value.replace(/[\u4E00-\u9FA5]/g, '')
    }
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
    font-size: 0.14rem;
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

.order-record-wrap{
  padding: 0.1rem;
  font-size: 0.1rem;
  color: #999;
  margin-bottom: 1rem;

  .mr-5{
    margin-right: 0.05rem;
  }

  .tellPhone{
    float: right;
  }
}

</style>