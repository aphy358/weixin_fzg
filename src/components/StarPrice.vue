<template>
  <mt-popup
    v-model="getStarPopupVisible"
    position="bottom">

    <div class="star-price-pop-wrap">
      <div class="s-p-p-row">
        <ul>
          <li v-for="(n, i) in starArr" :key="n.value" 
            :class="{'checked': n.checked}"
            @click="handleStarArr(i)">
            {{ n.text }}
          </li>
        </ul>
      </div>

      <div class="s-p-p-row">
        <div class="home-price-range-wrap">

          <select class="range-sel" name="" v-model="priceRange1">
            <option value="0" selected="">¥0</option>
            <option value="150">¥150</option>
            <option value="300">¥300</option>
            <option value="500">¥500</option>
            <option value="800">¥800</option>
          </select>

          <span style="margin: 0 0.1rem;">&lt;</span>
          <span class="">金额范围</span>
          <span style="margin: 0 0.1rem;">&lt;</span>

          <select class="range-sel" name="" v-model="priceRange2">
            <option value="150">¥150</option>
            <option value="300">¥300</option>
            <option value="500">¥500</option>
            <option value="800">¥800</option>
            <option value="999999" selected="selected">无限大</option>
          </select>
          
        </div>
      </div>

      <div class="s-p-p-row">
        <button @click="hidePopup">取消</button>
        <button @click="setStarPrice">确定</button>
      </div>

    </div>

  </mt-popup>
</template>

<script>
// 星级价格

export default {
  name: 'starPrice',
  data(){
    return {
      // 金额范围第一个选择框
      priceRange1: '0',

      // 金额范围第二个选择框
      priceRange2: '999999',

      starArr: [
        {
          text: '经济型',
          value: '10,15,20,25',
          checked: false
        },
        {
          text: '舒适型',
          value: '30,35',
          checked: false
        },
        {
          text: '高档型',
          value: '40,45',
          checked: false
        },
        {
          text: '豪华型',
          value: '50,55',
          checked: false
        },
        {
          text: '不限',
          value: '',
          checked: true
        },
      ]
    }
  },
  props: ['page'],
  components: {
  },
  created(){
  },
  computed: {
    getStarPopupVisible: {
      get: function () {
        return this.$store.state[this.page].starPopupVisible
      },
      set: function (newValue) {
        this.$store.commit(`${this.page}/setCommonState`, {k: 'starPopupVisible', v: newValue})
      }
    },
  },
  watch: {
    // 监视第一个金额选择框的变化，如果金额大于等于第二个金额选择框，则将第二个金额选择框设置为999999
    priceRange1(){
      if(this.priceRange1 >= this.priceRange2){
        this.priceRange2 = '999999'
      }
    },
    // 监视第二个金额选择框的变化，如果金额小于等于第一个金额选择框，则将第二个金额选择框设置为0
    priceRange2(){
      if(this.priceRange1 >= this.priceRange2){
        this.priceRange1 = '0'
      }
    },
    // 监视星级价格弹出框的状态，弹出的时候初始化选择项
    getStarPopupVisible(){
      if(this.getStarPopupVisible){
        this.initStarArr()
        this.initPrice()
      }
    }
  },
  mounted(){
  },
  methods:{
    initStarArr(){
      let checkedStar = this.$store.state.checkedStar

      this.starArr.forEach(n => {
        checkedStar.indexOf(n.value) != -1
          ? n.checked = true
          : n.checked = false
      })

      if(checkedStar != ''){
        this.starArr[4].checked = false
      }
    },
    initPrice(){
      let priceRange = this.$store.state.priceRange
      if(priceRange == ''){
        this.priceRange1 = '0'
        this.priceRange2 = '999999'
      }else{
        var tmpArr = priceRange.split('-')
        this.priceRange1 = tmpArr[0]
        this.priceRange2 = tmpArr[1]
      }
    },
    // 处理星级选择事件
    handleStarArr(index){
      let _this = this.starArr[index]
      
      if(index == 4){
        this.checkNoStar()
      }else{
        _this.checked = !_this.checked

        if(this.starArr[0].checked == true 
          && this.starArr[1].checked == true 
          && this.starArr[2].checked == true 
          && this.starArr[3].checked == true){ // 全选中

            this.checkNoStar()

        }else if(this.starArr[0].checked == false 
          && this.starArr[1].checked == false 
          && this.starArr[2].checked == false 
          && this.starArr[3].checked == false){  // 全不选中

            this.starArr[4].checked = true

        }else{  // 部分选中
            this.starArr[4].checked = false
        }
      }
    },
    // 星级全选中，也相当于都不选中
    checkNoStar(){
      this.starArr.forEach(n => {
        n.checked = false
      });

      this.starArr[4].checked = true
    },
    setStarPrice(){
      var showText = 
        [this.setStar(), this.setPrice()]
          .join('，')
          .replace(/^，|，$/, '')

      this.$emit('setStarPrice', showText)
      this.hidePopup()
    },
    // 设置星级
    setStar(){
      let resultStar = 
        this.starArr
          .filter(n => n.checked)
          .map(n => n.value)
          .join('，')

      let showResultStar = 
        this.starArr
          .filter(n => n.checked && n.text != '不限')
          .map(n => n.text)
          .join('，')
      
      this.$store.commit(`setCommonState`, {k: 'checkedStar', v: resultStar})

      return showResultStar
    },
    // 设置价格范围
    setPrice(){
      var showPrice = ''
      var statePrice = this.priceRange1 + '-' + this.priceRange2

      if(this.priceRange1 == '0' && this.priceRange2 != '999999'){
        showPrice = '<' + this.priceRange2
      }else if(this.priceRange1 != '0' && this.priceRange2 == '999999'){
        showPrice = '>' + this.priceRange1
      }else if(this.priceRange1 != '0' && this.priceRange2 != '999999'){
        showPrice = this.priceRange1 + '-' + this.priceRange2
      }else if(this.priceRange1 == '0' && this.priceRange2 == '999999'){
        statePrice = ''
      }

      this.$store.commit(`setCommonState`, {k: 'priceRange', v: statePrice})

      return showPrice
    },
    // 隐藏 popup
    hidePopup(){
      this.$store.commit(`${this.page}/setCommonState`, {k: 'starPopupVisible', v: false})
    }
  }
}
</script>

<style lang="scss">
.mint-popup{
  width: 100%;
}

.star-price-pop-wrap{

  @at-root .s-p-p-row{
    overflow: hidden;
    padding: 0.4rem 0.1rem 0;

    &:last-child{
      padding: 0.4rem 0 0;
    }

    ul{
      margin: auto;
      width: 3.06rem;
      font-size: 0.15rem;

      li{
        float: left;
        border: 0.01rem solid #e2e2e2;
        color: #333333;
        width: 0.60rem;
        text-align: center;
        line-height: 0.35rem;
        margin-left: -0.01rem;
        box-sizing: border-box;

        &.checked{
          position: relative;
          color: #ff7625;
          border-color: #ff7625;
        }

        &:last-child{
          margin-left: 0.1rem;
        }
      }
    }

    @at-root .home-price-range-wrap{
      font-size: 0.15rem;
      line-height: 0.35rem;
      width: 2.42rem;
      margin: auto;
      color: #333333;

      & > *{
        float: left;
      }

      .range-sel{
        width: 0.6rem;
        padding-left: 0.05rem;
        height: 0.35rem;
        box-sizing: border-box;
        border-radius: 0;
        border: 0.01rem solid #e2e2e2;
      }
    }

    button{
      border: none;
      width: 50%;
      background: #e2e2e2;
      color: #666666;
      height: 0.4rem;
      font-size: 0.18rem;

      &:last-child{
        color: white;
        background: #ff7625;
      }
    }
  }
}
</style>