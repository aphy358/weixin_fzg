<template>
  <mt-popup
    v-model="getAreaBizPopupVisible"
    position="bottom">

    <div class="area-biz-outer">
      <div class="area-biz-tab-wrap">
        <div class="area-biz-tab-bar" :class="{'current': showArea}" @click="showArea = true">行政区</div>
        <div class="area-biz-tab-bar" :class="{'current': !showArea}" @click="showArea = false">商业圈</div>
      </div>
      <div class="area-biz-list-wrap">
        <ul class="area-list area-biz-wrap" v-show="showArea">
          <li v-for="n in areaArr" :key="n.zoneid">
            <label>
              <input type="checkbox" class="area-biz-checkbox area" @click="checkArea(n.zoneid)">
              <span>{{ n.name }}</span>
            </label>
          </li>
        </ul>
        <ul class="biz-list area-biz-wrap" v-show="!showArea">
          <li v-for="n in bizArr" :key="n.bizzoneid">
            <label>
              <input type="checkbox" class="area-biz-checkbox biz" @click="checkBiz(n.bizzoneid)">
              <span>{{ n.description }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="operation-btn" style="margin: 10px 0;">
      <button class="area-empty">清空</button>
      <button class="area-submit">确定</button>
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

      // 商圈
      bizArr: [],
    }
  },
  props: {
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
          this.bizArr = res.data.bizzoneList || []
        }else if(res.errcode == 'notLogin'){
        }
      })
    },
    // 点击某个行政区
    checkArea(zoneid){

    },
    // 点击某个商圈
    checkBiz(bizzoneid){

    },
  }
}
</script>

<style lang="scss">

.area-biz-outer {
    font-size: 0.14rem;
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
                color: #099FDE;
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
                    color: #099FDE;
                }
            }
        }
    }
}

.operation-btn {
    text-align: center;

    button {
        display: inline-block;
        border: none;
        border-radius: 0.03rem;
        background: none;
        height: 0.3rem;
        line-height: 0.3rem;
        outline: none;
        font-size: 0.14rem;

        &.area-empty {
            width: 1rem;
            color: #ff531a;
        }

        &.area-submit {
            width: 1.75rem;
            flex: 1;
            background-color: #099FDE;
            color: #fff;
        }
    }
    
}
</style>