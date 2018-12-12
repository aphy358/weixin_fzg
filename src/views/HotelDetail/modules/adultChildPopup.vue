<template>
  <mt-popup
    v-model="getAdultChildPopupVisible"
    position="right">
  
    <div class="adult-child-select-wrap">
      <!-- 头部 -->
      <mt-header title="入住人类型选择"></mt-header>

      <!-- 返回 -->
      <GoBack _style="top: 0.02rem" :onClick="clickGoBack" />

      <div class="a-c-s-body-wrap">

        <div class="adult-row">
          <label class="a-c-s-label" for="adultSelect">成人</label>
          <span class="a-c-s-span">{{ adultValue }}位</span>
          <select id="adultSelect" v-model="adultValue">
            <option v-for="n in adultSelectArr" :key="n" :value="n">{{ n }}位</option>
          </select>
        </div>

        <div style="line-height: 0.46rem;color: #999;font-size: 0.12rem;padding: 0 0.1rem;">
          <span style="color: #000;font-size: 0.16rem;">儿童</span>
          (每间最多携带3名儿童)
        </div>

        <div style="background: white;">
          <div class="child-row line-after">
            <label class="a-c-s-label" for="adultSelect">儿童1</label>
            <span class="a-c-s-span">{{ childAgesTextArr[+childValue1 + 1] }}</span>
            <select id="adultSelect" v-model="childValue1">
              <option v-for="(n, i) in childAgesValueArr" :key="i" :value="n">{{ childAgesTextArr[i] }}</option>
            </select>
          </div>

          <div class="child-row line-after">
            <label class="a-c-s-label" for="adultSelect">儿童2</label>
            <span class="a-c-s-span">{{ childAgesTextArr[+childValue2 + 1] }}</span>
            <select id="adultSelect" v-model="childValue2">
              <option v-for="(n, i) in childAgesValueArr" :key="i" :value="n">{{ childAgesTextArr[i] }}</option>
            </select>
          </div>

          <div class="child-row">
            <label class="a-c-s-label" for="adultSelect">儿童3</label>
            <span class="a-c-s-span">{{ childAgesTextArr[+childValue3 + 1] }}</span>
            <select id="adultSelect" v-model="childValue3">
              <option v-for="(n, i) in childAgesValueArr" :key="i" :value="n">{{ childAgesTextArr[i] }}</option>
            </select>
          </div>
        </div>

        <div class="a-c-s-bottom">
          <button @click="setAdultChild">确认</button>
        </div>

      </div>

    </div>

  </mt-popup>
</template>

<script>
import GoBack from '@/components/GoBack.vue'

export default {
  name: 'adultChildPopup',
  data(){
    return {
      adultSelectArr: [1, 2, 3, 4, 5, 6, 7],
      childAgesValueArr: ['-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
      childAgesTextArr: ['不携带', '一岁以下', '1岁', '2岁', '3岁', '4岁', '5岁', '6岁', '7岁', '8岁', '9岁', '10岁', '11岁', '12岁', '13岁', '14岁', '15岁', '16岁', '17岁'],
      adultValue: '1',
      childValue1: '-1',
      childValue2: '-1',
      childValue3: '-1',
    }
  },
  props: {},
  components: {
    GoBack
  },
  watch: {
    // 监视成人小孩弹出框的状态，弹出的时候初始化选择项
    getAdultChildPopupVisible(){
      if(this.getAdultChildPopupVisible){

      }
    }
  },
  created(){},
  computed: {
    getAdultChildPopupVisible: {
      get: function () {
        return this.$store.state.hotelDetail.adultChildPopupVisible
      },
      set: function (newValue) {
        this.$store.commit(`hotelDetail/setCommonState`, {k: 'adultChildPopupVisible', v: newValue})
      }
    },
  },
  mounted(){},
  methods:{
    // 设置成人小孩
    setAdultChild(){
      let adultNum = this.adultValue
      let childrenNum = [this.childValue1, this.childValue2, this.childValue3].filter(n => n != '-1').length
      let childrenStr = [this.childValue1, this.childValue2, this.childValue3].filter(n => n != '-1').join(',')

      this.$store.commit(`setCommonState`, {k: 'adultNum', v: adultNum})
      this.$store.commit(`setCommonState`, {k: 'childrenNum', v: childrenNum})
      this.$store.commit(`setCommonState`, {k: 'childrenStr', v: childrenStr})

      this.hidePopup()
    },
    // 点击回退按钮
    clickGoBack(){
      this.hidePopup()
    },
    // 隐藏 popup
    hidePopup(){
      this.$store.commit(`hotelDetail/setCommonState`, {k: 'adultChildPopupVisible', v: false})
    }
  }
}
</script>

<style lang="scss">
.adult-child-select-wrap{
  height: 100vh;
  background: #F2F3F8;

  @at-root .a-c-s-body-wrap{

    .adult-row{
      position: relative;
      background: white;
      padding: 0 0.1rem;
      line-height: 0.5rem;
      margin-top: 0.15rem;
      overflow: hidden;
    }

    .child-row{
      position: relative;
      background: white;
      padding-right: 0.1rem;
      margin-left: 0.1rem;
      line-height: 0.5rem;
      height: 0.5rem;
    }

    .a-c-s-label{
      float: left;
      color: #999;
      font-size: 0.16rem;
      width: 0.45rem;
    }

    select{
      position: absolute;
      border: none;
      height: 0.5rem;
      font-size: 0.16rem;
      width: calc(100% - 0.6rem);
      opacity: 0;
      background: transparent;
    }

    .a-c-s-span{
      position: absolute;
      height: 0.5rem;
      font-size: 0.16rem;
      width: calc(100% - 0.6rem);
      text-align: center;
    }

    .a-c-s-bottom{
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 0.1rem;
      background: white;
      
      button{
        border: none;
        width: calc(100% - 0.2rem);
        color: white;
        line-height: 0.4rem;
        font-size: 0.18rem;
        background: #ff7625;
        border-radius: 0.02rem;
      }
    }
  }
}
</style>