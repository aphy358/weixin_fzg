<template>
  <div class="page qnb-batchmodify-page">

    <!-- 头部 -->
    <mt-header :title="titleText">
      <mt-button slot="right" @click="resetParams">重置</mt-button>
    </mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="page-content" style="background-color: #efeff4;padding-bottom: 0.4rem;">

      <!-- 头部 -->
      <!-- <Head :formulaType="formulaType" @switchFormulaType="switchFormulaType" /> -->
      
      <div class="rsp-popup-inner">

        <!-- 房型、价格类型 -->
        <RoomPriceType 
          :mtype="mtype" :roomTypes="roomTypes" :priceTypes="priceTypes" :checkedRoomTypes="checkedRoomTypes" :checkedPriceTypes="checkedPriceTypes"
          @showPopup="showPopup" />

        <!-- 时段 -->
        <div class="rsp-popup-title">时段</div>
        <div class="rsp-popup-block items-float line-after"
          v-for="(n, i) in timeZoneArr" :key="i">

          <i class="iconfont icon-rili"></i>
          <input class="calendar-input-fake" type="text" v-model="timeZoneArr[i].start" placeholder="起始日期" >
          <input type="date" v-model="timeZoneArr[i].start" @change="timeZoneChange(i, 'start')" class="calendar-input" style="background: transparent;color: transparent;">
          <span>至</span>
          <input class="calendar-input-fake" type="text" v-model="timeZoneArr[i].end" placeholder="终止日期" >
          <input type="date" v-model="timeZoneArr[i].end" @change="timeZoneChange(i, 'end')" class="calendar-input" style="background: transparent;color: transparent;">
          <i class="iconfont" :class="[i == 0 ? 'icon-plus2' : 'icon-minus2']" @click="addOrReduceTimeZoneArr(i)"></i>
        </div>

        <!-- 适用星期 -->
        <div class="rsp-popup-title">适用星期</div>
        <div class="rsp-popup-block line-after">
          <ul class="rsp-popup-week-list">
            <li class="rsp-popup-week-item" 
              v-for="(n, i) in 7" :key="n" :class="weekActive(weekNumberArr[i])" 
              @click="switchWeek(weekNumberArr[i])">{{ weekTextArr[i] }}</li>
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


        <!-- 配额类型 -->
        <div class="rsp-popup-title">配额类型</div>
        <div class="rsp-popup-block items-float">
          <div class="rsp-popup-label">配额类型</div>
          <select v-model="formulaType" style="padding: 0 0.05rem;border: none;margin-right: 0.1rem;height: 100%;width: calc(100% - 0.95rem);">
            <option value="0,1,2">全部类型</option>
            <option value="1">合约配额</option>
            <option value="2">outside</option>
            <option value="0">包房</option>
          </select>
          <i class="iconfont icon-right-thin"></i>
        </div>


        <div class="rsp-popup-title">调价方式</div>
        <div class="rsp-popup-block">
          <div class="rsp-room-price-wrap">
            <select v-model="priceAdjustStyle" style="padding: 0 0.05rem;border: 0.01rem solid #ccc;margin-right: 0.1rem;">
              <option value="2">输入目标值</option>
              <option value="0">按固定加幅</option>
              <option value="1">按比例加幅</option>
            </select>
            <div>
              底价 <input type="number" v-model="basePrice" @keyup="basePriceInput" /><span v-if="priceAdjustStyle == 1">%</span>
            </div>
            <div>
              卖价 <input type="number" v-model="salePrice" @keyup="salePriceInput" /><span v-if="priceAdjustStyle == 1">%</span>
            </div>
          </div>
        </div>


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

      <!-- 房型选择 popup -->
      <RoomTypePopup 
        :mtype="mtype" :visible="roomTypeVisible" :checkedTypes="checkedRoomTypes" :types="roomTypes"
        @hidePopup="hidePopup(1)" @checked="popupChecked($event, 1)" />

      <!-- 价格类型 popup -->
      <PriceTypePopup 
        :mtype="mtype" :visible="priceTypeVisible" :checkedTypes="checkedPriceTypes" :types="priceTypes"
        @hidePopup="hidePopup(2)" @checked="popupChecked($event, 2)" />


      <div style="padding: 0.2rem 0.1rem;">
        <button class="qnb-batch-save" @click="saveAll">保存</button>
      </div>

    </div>
  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import END from "@/components/END.vue";
import { gotoPage, queryString, formatDateTwo, addDays, goBackPage } from '@/assets/util'
import { Toast } from 'mint-ui'
import { debounce } from 'lodash'

// import '../components/roomStatusPriceEditItems.scss'
import '../components/srpChecklistRadio.scss'
import Head from '../components/head'
import RoomTypePopup from './roomTypePopup'
import PriceTypePopup from './priceTypePopup'
import RoomPriceType from './roomPriceType'

export default {
  name: 'qnbBatchModify',
  data(){
    return {
      roomTypeVisible: false,
      priceTypeVisible: false,

      // 房型、价格类型
      roomTypes: [],
      priceTypes: [],

      // 选择的房型、价格类型
      checkedRoomTypes: [],
      checkedPriceTypes: [],


      weekTextArr: ['日', '一', '二', '三', '四', '五', '六'],
      weekNumberArr: [7, 1, 2, 3, 4, 5, 6],

      titleText: '',

      // 1：房态管理    2：房价管理
      mtype: '',

      // 1：合约配额    2：outside
      formulaType: '0,1,2',

      // 当前酒店 ID
      hotelId: '',

      // 当前供应商 ID
      suppId: '',

      // 房态，0：剩余库存  1畅订  2：待查  3：满房   5不可超售
      roomStatus: null,

      // 房量的可编辑状态，true：不可编辑   false：可编辑
      roomNumDisable: false,

      // 剩余库存
      showStock: null,

      // 底价
      basePrice: null,

      // 卖价
      salePrice: null,

      // 选中的适用星期
      checkedWeekArr: [1, 2, 3, 4, 5, 6, 7],

      // 快速切换星期
      weekQuickSwitch: '全部',

      // 底价加幅方式，0: 按固定加幅 1: 按比例加幅 2: 输入目标值 
      priceAdjustStyle: '2',

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
    Head,
    RoomTypePopup,
    PriceTypePopup,
    RoomPriceType,
  },
  watch: {},
  created(){
    this.getQueryParams()
    this.queryAlwaysType()
  },
  activated(){
  },
  computed: {
    getSupplierCurrency(){
      // return this.$store.state.qnb.supplierCurrency
    }
  },
  mounted(){},
  methods:{
    // 获取 url 参数
    getQueryParams(){
      this.mtype = queryString('mtype')
      // this.formulaType = queryString('formulaType')
      this.hotelId = queryString('hotelId')
      this.suppId = queryString('suppId')

      this.checkedRoomTypes = []
      this.checkedPriceTypes = []
      this.titleText = '批量修改'
    },
    // 查询房型、价格类型
    queryAlwaysType(){
      this.$api.qnb.syncQNBQueryAlwaysType({staticInfoId: this.hotelId, suppId: this.suppId}).then(res => {
        if(res.returnCode == 1){
          res.data.roomtypeList.forEach(o => {
            o.label = o.roomTypeName
            o.value = o.roomTypeId + ''
          });

          res.data.ratetypeList.forEach(o => {
            o.label = o.ratetypeName
            o.value = o.ratetypeId + ''
          });

          this.roomTypes = res.data.roomtypeList
          this.priceTypes = res.data.ratetypeList
        }
      })
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
      if(o == '1,2,3,4,7'){
        this.weekQuickSwitch = '工作日'
      }else if(o == '5,6'){
        this.weekQuickSwitch = '周末'
      }else if(o == '1,2,3,4,5,6,7'){
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
            _this.checkedWeekArr = [7,1,2,3,4]
        }else if(o == '周末'){
            _this.checkedWeekArr = [5,6]
        }else if(o == '全部'){
            _this.checkedWeekArr = [1,2,3,4,5,6,7]
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
    },
    // 隐藏房型或者价格类型的 popup
    hidePopup(flag){
      flag == 1
        ? this.roomTypeVisible = false
        : this.priceTypeVisible = false
    },
    // 房型、价格类型的选择，flag： 1：房型   2：价格类型
    popupChecked($event, flag){
      flag == 1
        ? this.checkedRoomTypes = $event
        : this.checkedPriceTypes = $event
    },
    showPopup($event){
      $event == 1
        ? this.roomTypeVisible = true
        : this.priceTypeVisible = true
    },
    // 批量保存之前先验证各项值
    validate(){
      // 房型
      if(!this.checkedRoomTypes.length){
        Toast('请选择房型')
        return false
      }

      // 价格类型
      if(!this.checkedPriceTypes.length){
        Toast('请选择价格类型')
        return false
      }

      // 时段
      for (let i = 0; i < this.timeZoneArr.length; i++) {
        const n = this.timeZoneArr[i]
        if(!n.start || !n.end){
          Toast('请将每个时段填完整')
          return false
        }
      }

      // 适用星期
      if(this.checkedWeekArr.length == 0){
        Toast('请选择适用星期')
        return false
      }

      // 如果设置了房态，则视情况而设置房量
      if((this.roomStatus == 0 || this.roomStatus == 5) && this.showStock == null){
        Toast('请设置房量')
        return false
      }

      // 如果是按照输入目标值的方式设置房价，则卖价不能低于底价
      if(this.priceAdjustStyle == 2 && this.basePrice != null && this.salePrice != null){
        if(parseFloat(this.basePrice) > parseFloat(this.salePrice)){
          Toast('卖价不能低于底价')
          return false
        }
      }

      // 当不上按照输入目标值方式设置房价时，底价卖价不能为负数
      if( (this.basePrice < 0 || this.salePrice < 0) ){
        Toast('价格不能为负数')
        return false
      }

      return true
    },
    basePriceInput(){
    },
    salePriceInput(){
    },
    // 保存批量修改
    saveAll(){
      if(!this.validate())  return

      // 验证时段是否重叠
      this.timeZoneArr.sort(function(n1, n2){
        let t1 = +new Date(n1.start.replace(/-/g, '/') + ' 00:00:00')
        let t2 = +new Date(n2.start.replace(/-/g, '/') + ' 00:00:00')
        return t1 > t2
      })

      for (let i = 0; i < this.timeZoneArr.length - 1; i++) {
        let t1 = +new Date(this.timeZoneArr[i].end.replace(/-/g, '/') + ' 00:00:00')
        let t2 = +new Date(this.timeZoneArr[i + 1].start.replace(/-/g, '/') + ' 00:00:00')
        if(t1 >= t2){
          return Toast('时段重叠，请重新设置')
        }
      }

      let params = {
        staticInfoId:   this.hotelId,
				checkInDates:   this.timeZoneArr.map(n => n.start).join(','),
				checkOutDates:  this.timeZoneArr.map(n => n.end).join(','),
				roomTypes:      this.mtype == 1 ? this.checkedRoomTypes.join(',') : this.checkedRoomTypes,
				priceTypes:     this.mtype == 1 ? this.checkedPriceTypes.join(',') : this.checkedPriceTypes,
				formulaTypes:   this.formulaType,
        weekRange:      this.checkedWeekArr.join(''),
        suppId:         this.suppId
      }

      if(this.roomStatus != null){
        params.status = this.roomStatus
        
        if(this.roomStatus == 0 || this.roomStatus == 5){   // 只有在不可超售和剩余库存的时候才才传这个参数
          params.remainStock = this.showStock
        }
      }

      if(this.salePrice != null || this.basePrice != null){
        params.priceAdjustStyle = this.priceAdjustStyle

        if(this.basePrice != null)  params.basePrice = this.basePrice
        if(this.salePrice != null)  params.price = this.salePrice
      }

      this.$api.qnb.syncQNBBatchSaveRoomStatus(params).then(res => {
        if(res.returnCode === 1){
          if(res.data.result == 'fail'){
            Toast('没有查询结果')
          }else{
            Toast('批量设置成功')
            goBackPage(this.$router)
          }
        }
      })
    },
    // 选择时段日期时触发
    timeZoneChange(i, key){
      let today = +new Date( formatDateTwo(addDays(new Date)) )
      let picked = +new Date( formatDateTwo(this.timeZoneArr[i][key]) )

      if(picked < today){
        Toast('日期须大于等于今日')
        this.timeZoneArr[i][key] = addDays(new Date)
      }

      if(key == 'start'){
        let end = +new Date( formatDateTwo(this.timeZoneArr[i]['end']) )
        if(picked > end){
          // this.timeZoneArr[i]['end'] = ''
        }
      }

      if(key == 'end'){
        let start = +new Date( formatDateTwo(this.timeZoneArr[i]['start']) )
        if(picked < start){
          // this.timeZoneArr[i]['start'] = ''
        }
      }
    },

    // 重置
    resetParams(){
      this.checkedRoomTypes = []
      this.checkedPriceTypes = []

      this.formulaType = '0,1,2'

      this.roomStatus = null
      this.roomNumDisable = false
      this.showStock = null
      this.basePrice = null
      this.salePrice = null
      this.checkedWeekArr = [1, 2, 3, 4, 5, 6, 7]
      this.weekQuickSwitch = '全部'
      this.priceAdjustStyle = '2'
      this.timeZoneArr = [
        {start: '', end: ''},
      ]
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

}

.qnb-batch-save{
  height: 0.4rem;
  border: none;
  width: 100%;
  background: rgba(255, 118, 37, 0.8);
  color: white;
  font-size: 0.16rem;
  border-radius: 0.02rem;
}
</style>