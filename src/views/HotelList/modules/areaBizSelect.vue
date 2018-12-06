<template>
  <mt-popup
    v-model="getAreaBizPopupVisible"
    position="bottom">
  
  
    <div class="operation-btn">
      <button class="area-empty" @click="clearAreaBiz">清空</button>
      <button class="area-submit" @click="confirmAreaBiz">确定</button>
    </div>

    <div class="area-biz-outer">
      <div class="area-biz-tab-wrap">
        <div class="area-biz-tab-bar" :class="{'current': showArea}" @click="showArea = true">行政区</div>
        <div class="area-biz-tab-bar" :class="{'current': !showArea}" @click="showArea = false">商业圈</div>
      </div>
      <div class="area-biz-list-wrap">
        <mt-checklist
          v-model="checkedArea"
          :options="areaArr"
          v-show="showArea">
        </mt-checklist>

        <mt-checklist
          v-model="checkedBiz"
          :options="bizArr"
          v-show="!showArea">
        </mt-checklist>
      </div>
    </div>
    

  </mt-popup>
</template>

<script>
// 行政区、商圈

export default {
  name: 'areaBizSelect',
  data(){
    return {
      // 为 true 时，当前显示的是行政区选择面板，为 false 时，显示的是商圈选择面板
      showArea: true,

      // 行政区
      areaArr: [],

      // 选中的行政区
      checkedArea: [],

      // 商圈
      bizArr: [],

      // 选中的商圈
      checkedBiz: [],
    }
  },
  props: {
  },
  watch: {
    // 监视行政区、商圈弹出框的状态，弹出的时候初始化选择项
    getAreaBizPopupVisible(){
      if(this.getAreaBizPopupVisible){
        this.checkedArea = this.$store.state.hotelList.checkedArea
        this.checkedBiz = this.$store.state.hotelList.checkedBiz
      }
    }
  },
  components: {
  },
  created(){
    // 查询行政区、商圈
    this.getAreaBiz()
  },
  computed: {
    getAreaBizPopupVisible: {
      get: function () {
        return this.$store.state.hotelList.areaBizPopupVisible
      },
      set: function (newValue) {
        this.$store.commit(`hotelList/setCommonState`, {k: 'areaBizPopupVisible', v: newValue})
      }
    },
  },
  mounted(){
  },
  methods:{
    // 查询行政区、商圈
    getAreaBiz(){
      let param = {cityid: this.$store.state.cityId}

      this.$api.hotelList.syncGetAreaBiz(param).then(res => {
        if(res.returnCode === 1 && res.data){
          this.areaArr = res.data.zoneList || []
          this.areaArr.forEach(n => {
            n.label = n.name
            n.value = n.zoneid
          });

          this.bizArr = res.data.bizzoneList || []
          this.bizArr.forEach(n => {
            n.label = n.description
            n.value = n.bizzoneid
          });
        }
      })
    },
    // 点击 '清空'
    clearAreaBiz(){
      this.checkedArea = []
      this.checkedBiz = []
    },
    // 点击 '确定'
    confirmAreaBiz(){
      this.$store.commit(`hotelList/setCommonState`, {k: 'checkedArea', v: this.checkedArea})
      this.$store.commit(`hotelList/setCommonState`, {k: 'checkedBiz', v: this.checkedBiz})
      this.hidePopup()
    },
    // 隐藏 popup
    hidePopup(){
      this.$store.commit(`hotelList/setCommonState`, {k: 'areaBizPopupVisible', v: false})
    }
  }
}
</script>

<style lang="scss">

.area-biz-outer {
    font-size: 0.15rem;
    overflow: hidden;
    border-bottom: 0.01rem solid #eee;

    @at-root .area-biz-tab-wrap {
        float: left;

        @at-root .area-biz-tab-bar {
            height: 0.5rem;
            line-height: 0.5rem;
            padding: 0.1rem 0.4rem;
            border-bottom: 0.01rem solid #eee;

            &.current{
                color: #ff7625;
            }

            &:last-child{
                border-bottom: none;
            }
        }
    }

    @at-root .area-biz-list-wrap {
        float: left;
        width: calc(100% - 1.3rem);
        min-height: 1.5rem;
        max-height: 3rem;
        overflow-y: scroll;
        border-left: 0.01rem solid #eee;

        @at-root .area-biz-wrap {
            margin: 0;
            padding: 0.1rem 0 0.1rem 0.1rem;
            overflow: hidden;
            max-height: 3rem;
            overflow-y: auto;

            li{
                display: block;
                padding: 0.1rem;

                .area-biz-checkbox:checked+span {
                    color: #ff7625;
                }
            }
        }
    }
}

.operation-btn {

    button {
        border: none;
        width: 50%;
        background: #f0f0f0;
        color: #666666;
        height: 0.4rem;
        font-size: 0.16rem;

        &.area-submit {
            color: white;
            background: #099FDE;
        }
    }
}

.mint-checkbox-core{
  width: 0.14rem;
  height: 0.14rem;

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
  font-size: 0.15rem;
  background-image: none;
}
.mint-cell{
  min-height: 0.35rem;
}

.mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #ff7625;
  border-color: #ff7625;
}

</style>