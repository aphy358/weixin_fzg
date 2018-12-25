<template>
  <div class="page eb-batchmodify-page">

    <!-- 头部 -->
    <mt-header :title="titleText"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="page-content" style="background-color: #efeff4;padding-bottom: 0.5rem;">

      <!-- 头部 -->
      <Head :formulaType="formulaType" @switchFormulaType="switchFormulaType" />
      
      <div class="rsp-popup-inner">

        <!-- 房型、价格类型 -->
        <div class="rsp-popup-title">房型、价格类型</div>
        <div class="rsp-popup-block items-float line-after">
          <div class="rsp-popup-label">房型</div>
          <input type="text" placeholder="请选择房型" readonly>
          <i class="iconfont icon-right-thin"></i>
        </div>
        <div class="rsp-popup-block items-float">
          <div class="rsp-popup-label">价格类型</div>
          <input type="text" placeholder="请选择价格类型" readonly>
          <i class="iconfont icon-right-thin"></i>
        </div>

        <!-- 时段 -->
        <div class="rsp-popup-title">时段</div>
        <div class="rsp-popup-block items-float line-after"
          v-for="(n, i) in timeZoneArr" :key="i">

          <i class="iconfont icon-rili"></i>
          <input class="calendar-input-fake" type="text" v-model="timeZoneArr[i].start" placeholder="起始日期" >
          <input type="date" v-model="timeZoneArr[i].start" class="calendar-input">
          <span>至</span>
          <input class="calendar-input-fake" type="text" v-model="timeZoneArr[i].end" placeholder="终止日期" >
          <input type="date" v-model="timeZoneArr[i].end" class="calendar-input">
          <i class="iconfont" :class="[i == 0 ? 'icon-plus2' : 'icon-minus2']" @click="addOrReduceTimeZoneArr(i)"></i>

        </div>

        <!-- 适用星期 -->
        <div class="rsp-popup-title">适用星期</div>
        <div class="rsp-popup-block line-after">
          <ul class="rsp-popup-week-list">
            <li class="rsp-popup-week-item" :class="weekActive(i)" 
              v-for="(n, i) in 7" :key="n"  
              @click="switchWeek(i)">{{ weekTextArr[i] }}</li>
          </ul>
        </div>
        <div class="rsp-popup-block">
          <mt-radio
            class="rsp-popup-weekqs"
            v-model="weekQuickSwitch"
            @change="weekQSChange"
            :options="['工作日', '周末', '全部']">
          </mt-radio>
        </div>


        <div v-if="mtype == 1">
          <div class="rsp-popup-title">房态</div>
          <div class="rsp-popup-block">
            <ul class="rsp-room-status-list">
              <li class="rsp-room-status-item" :class="{'active': roomStatus == 3}" @click="swithRoomStatus(3)">满房</li>
              <li class="rsp-room-status-item" :class="{'active': roomStatus == 0}" @click="swithRoomStatus(0)">剩余库存</li>
              <li class="rsp-room-status-item" :class="{'active': roomStatus == 2}" @click="swithRoomStatus(2)">待查</li>
              <li class="rsp-room-status-item" :class="{'active': roomStatus == 5}" @click="swithRoomStatus(5)">不可超售</li>
              <li class="rsp-room-status-item" :class="{'active': roomStatus == 1}" @click="swithRoomStatus(1)">畅订</li>
            </ul>
          </div>

          <div class="rsp-popup-title">房量</div>
          <div class="rsp-popup-block">
            <div class="rsp-room-num-wrap">
              <i class="iconfont icon-minus2" style="color: #ea6868;" @click="minusRoomNum"></i>
              <input
                v-if="!roomNumDisable"
                v-model="showStock" 
                @input="inputRoomNum" 
                @keyup="inputRoomNum" />
              <input v-else type="text" disabled>
              <i class="iconfont icon-plus2" style="color: #89BFF5;" @click="plusRoomNum"></i>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="rsp-popup-title">底价</div>
          <div class="rsp-popup-block">
            <div class="rsp-room-price-wrap">
              <span>{{ getSupplierCurrency }}</span>
              <input type="number" v-model="basePrice" />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import END from "@/components/END.vue";
import { gotoPage, queryString } from '@/assets/util'
import { Toast } from 'mint-ui'
import { debounce } from 'lodash'

import '../components/roomStatusPriceEditItems.scss'
import Head from '../components/head'

export default {
  name: 'ebbatchmodify',
  data(){
    return {
      weekTextArr: ['日', '一', '二', '三', '四', '五', '六'],

      titleText: '',

      // 1：房态管理    2：房价管理
      mtype: '1',

      // 1：合约配额    2：outside
      formulaType: '1',

      // 当前酒店 ID
      hotelId: '',

      // 房态，0：剩余库存  1畅订  2：待查  3：满房   5不可超售
      roomStatus: '0',

      // 房量的可编辑状态，true：不可编辑   false：可编辑
      roomNumDisable: false,

      // 剩余库存
      showStock: 0,

      // 底价
      basePrice: 0,

      // 选中的适用星期
      checkedWeekArr: [0, 1, 2, 3, 4, 5, 6],

      // 快速切换星期
      weekQuickSwitch: '全部',

      // 时段
      timeZoneArr: [
        {start: '', end: ''},
      ]
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
  computed: {
    getSupplierCurrency(){
      return this.$store.state.eb.supplierCurrency
    }
  },
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
    // 切换房态，0：剩余库存  1畅订  2：待查  3：满房   5不可超售
    swithRoomStatus(status){
      this.roomStatus = status
      this.getRoomNumStatus(status)
    },
    // 获取房量输入框的状态
    getRoomNumStatus(status){
      (status === 1 || status === 2 || status === 3)
        ? this.roomNumDisable = true
        : this.roomNumDisable = false
    },
    // 减少房量   
    minusRoomNum(){
      if(!this.roomNumDisable && +this.showStock > 0){
        --this.showStock
      }
    },
    // 增加房量
    plusRoomNum(){
      if(!this.roomNumDisable){
        ++this.showStock
      }
    },
    // 编辑房量
    inputRoomNum(){
      this.showStock = parseInt(this.showStock) || 0
    },
    // 获取适用星期的选中状态类名
    weekActive(week){
      return !!~this.checkedWeekArr.indexOf(week) ? 'active' : ''
    },
    // 切换适用星期（点击某个星期）
    switchWeek(week){
      let index = this.checkedWeekArr.indexOf(week)
      index == -1
        ? this.checkedWeekArr.push(week)
        : this.checkedWeekArr.splice(index, 1)

      let o = this.checkedWeekArr.sort().join(',')
      if(o == '0,1,2,3,4'){
        this.weekQuickSwitch = '工作日'
      }else if(o == '5,6'){
        this.weekQuickSwitch = '周末'
      }else if(o == '0,1,2,3,4,5,6'){
        this.weekQuickSwitch = '全部'
      }else{
        this.weekQuickSwitch = ''
      }
    },
    // 点击 '工作日'、'周末'、'全部'
    weekQSChange(){
      let _this = this

      this.$nextTick(() => {
        let o = _this.weekQuickSwitch

        if(o == '工作日'){
            _this.checkedWeekArr = [0,1,2,3,4]
        }else if(o == '周末'){
            _this.checkedWeekArr = [5,6]
        }else if(o == '全部'){
            _this.checkedWeekArr = [0,1,2,3,4,5,6]
        }else{
            _this.checkedWeekArr = []
        }
      })
    },
    // 新增或减少一行时段
    addOrReduceTimeZoneArr(i){
      i == 0
        ? this.timeZoneArr.push({start: '', end: ''})
        : this.timeZoneArr.splice(i, 1)
    }

  }
}
</script>

<style lang="scss">
.rsp-popup-block{

  &.items-float{
    overflow: hidden;
    line-height: 0.2rem;
    height: 0.2rem;

    &>*{
      float: left;
    }

    input{
      border: none;
      background: transparent;
      line-height: 0.2rem;
      width: calc(100% - 0.85rem);

      &.calendar-input-fake{
        width: 1rem;
        text-align: center;
      }

      &.calendar-input{
        position: absolute;
        width: 1rem;
        height: 100%;
        top: 0;
        margin-left: -1rem;
        color: transparent;
      }
    }

    .iconfont{
      color: #ccc;
      font-size: 0.12rem;

      &.icon-rili{
        font-size: 0.14rem;
      }

      &.icon-minus2{
        float: right;
        font-size: 0.22rem;
        color: rgb(234, 104, 104);
      }

      &.icon-plus2{
        float: right;
        font-size: 0.22rem;
        color: rgb(137, 191, 245);
      }
    }
  }

  @at-root .rsp-popup-label{
    color: #999999;
    width: 0.7rem;
  }

  @at-root .rsp-popup-week-list{
    display: flex;
    justify-content: space-between;

    @at-root .rsp-popup-week-item{
      width: 0.3rem;
      height: 0.3rem;
      text-align: center;
      line-height: 0.3rem;
      font-size: 0.12rem;
      border-radius: 50%;
      transition: all 0.1s linear;

      &.active{
        color: white;
	      background: rgba(255, 118, 37, 0.8);
      }

    }
  }

  @at-root .rsp-popup-weekqs{
    display: flex;
    justify-content: space-between;

    .mint-radiolist-title{
      display: none;
    }

    .mint-cell{
      min-height: auto;

      &:last-child{
        background-image: unset;
      }
    }

    .mint-cell-wrapper{
      padding: 0;
      background-image: unset;
    }

    .mint-radiolist-label{
      padding: 0;
    }

    .mint-radio-label{
      font-size: 0.14rem;
      margin-left: 0.03rem;
    }

    .mint-radio-core{
      width: 0.16rem;
      height: 0.16rem;

      &::after{
        top: 0.03rem;
        left: 0.03rem;
      }
    }

    .mint-radio-input:checked + .mint-radio-core{
      background-color: rgba(255, 118, 37, 0.8);
      border-color: rgba(255, 118, 37, 0.8);
    }

  }

}
</style>