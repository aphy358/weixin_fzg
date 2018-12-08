<template>
  <div class="search-filter-outer">
    <div class="s-f-inner">
      <div class="filter-item">
        <label class="s-f-label" for="selRoomNum">预定</label>
        <select id="selRoomNum" class="search-select-item" v-model="getRoomNum">
          <option v-for="n in 7" :key="n" :value="n">{{ n }}间</option>
        </select>
      </div>
      <div class="filter-item" style="text-align: center;min-width: 1.5rem;">
        <label class="s-f-label" for="adultNum">每间住客</label>
				<select id="adultNum" name="adultNum" class="search-select-item" @change="selectAdultChild" v-model="adultChildValue" :v="getAdultChildValue">
					<option value="1">1成人</option>
          <option value="2">2成人</option>
          <option v-if="getAdultNum > 2 || getChildrenNum > 0" value="3">{{ getAdultNum + '成人' + getChildrenNum > 0 ? '，' + getChildrenNum + '小孩' : '' }}</option>
          <option value="more">更多选项</option>
				</select>
      </div>
      <div class="filter-item" style="text-align: right;">
        <div class="s-f-time-condition" @click="gotoCheckinCheckout">
          <p><label class="s-f-label">入住</label><span>{{ formatDate(getCheckin) }}</span></p>
          <p><label class="s-f-label">离店</label><span>{{ formatDate(getCheckout) }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gotoPage, addDays } from "@/assets/util"

export default {
  name: 'searchFilter',
  data(){
    return {
      adultChildValue: '1'
    }
  },
  props: {},
  components: {},
  watch: {},
  created(){},
  computed: {
    getAdultChildValue(){
      let adultNum = parseInt(this.$store.state.adultNum)
      let childrenNum = parseInt(this.$store.state.childrenNum)
      
      if(adultNum > 2 || childrenNum > 0){
        this.adultChildValue = '3'
      }else{
        this.adultChildValue = adultNum + ''
      }
    },
    getAdultNum(){
      return parseInt(this.$store.state.adultNum)
    },
    getChildrenNum(){
      return parseInt(this.$store.state.childrenNum)
    },
    getChildrenStr(){
      return this.$store.state.childrenStr
    },
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
    getRoomNum: {
      get(){
        return this.$store.state.roomNum
      },
      set(newValue){
        this.$store.commit(`setCommonState`, {k: 'roomNum', v: newValue})
      }
    }
  },
  mounted(){},
  methods:{
    gotoCheckinCheckout(){
      gotoPage(this.$router, 'checkinCheckout')
    },
    // 格式化日期，返回格式为 '01-01'
    formatDate(date){
      return addDays(date).substring(5)
    },
    // 选择成人小孩
    selectAdultChild(){
      if(this.adultChildValue == 'more'){
        this.$store.commit(`hotelDetail/setCommonState`, {k: 'adultChildPopupVisible', v: true})
      }
    }
  }
}
</script>

<style lang="scss">
.hotelDetail-page{
  .search-filter-outer{
    padding: 0 0.1rem;

    .s-f-inner{
      display: flex;
      position: relative;
      height: 0.4rem;
      line-height: 0.4rem;

      .filter-item{
        flex: 1;

        &:last-child{
          text-align: right
        }

        .s-f-label{
          display: inline-block;
          padding-right: 0.05rem;
          color: #999999;
        }

        select{
          display: inline-block;
          line-height: 0.4rem;
          border: none;
        }

        @at-root .s-f-time-condition{
          padding: 0.07rem 0;

          p{
            font-size: 0.12rem;
            height: 0.13rem;
            line-height: 0.13rem;
          }

        }
      }
    }
  }
}
</style>