<template>
  <div class="nav-top">
		<div class="KWI_wrap">
			<div class="nav-back">
        <i class="iconfont icon-left-thin"></i>
      </div>
      <i class="iconfont icon-search0 searchIcon"></i>
      <i class="iconfont icon-shanchu kw_del" v-if="keywords != ''" @click="keywords = ''"></i>
      <input type="text" id="getCity" class="keyw-input has-city" placeholder="城市关键字" v-model="keywords" @input="inputKeyword" />
    </div>
        
    <div class="card" id="cityCard" v-show="keywords != ''">
			<div class="card-content">
				<div class="list-block">
					<ul id="cityUl">
            <li class="city-li" v-if="cities.length > 0" v-for="n in cities" :key="n.cityId" data-ctype="0">{{ n.cityName }}</li>
            <li class="city-li no-data" v-if="cities.length <= 0">无相关城市</li>
          </ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// 顶部关键字输入区域

export default {
  name: "keywordInput",
  data() {
    return {
      cities: [
        {cityName: '深圳', cityId: '70002', cityType: '0'},
      ],
      keywords: '',
    }
  },
  props: {},
  components: {},
  created() {},
  computed: {},
  mounted() {},
  methods: {
    inputKeyword($event){
      // 当下面两句联合使用时，输入空格才不会闪烁
      this.keywords = this.keywords.replace(/^\s+|\s+$/g, '')
      $event.srcElement.value = $event.srcElement.value.replace(/^\s+|\s+$/g, '')


    }
  }
};
</script>

<style lang="scss">
.nav-top {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ff7625;
  color: white;
  z-index: 4000;

  .KWI_wrap {
    margin: 0.1rem 0.20rem 0.10rem 0.40rem;

    .nav-back {
      position: fixed;
      width: 0.40rem;
      height: 0.36rem;
      left: 0;
      top: 0.10rem;
      text-align: center;
      font-size: 0.23rem;
      font-weight: bold;
      color: white;
      z-index: 9999;
      transform: translate3d(0, 0, 0) scale(1);
    }

    .searchIcon{
      position: fixed;
      color: #c1c1c1;
      top: 0.17rem;
      left: 0.47rem;
    }

    .kw_del{
      position: fixed;
      color: #c1c1c1;
      height: 0.34rem;
      line-height: 0.36rem;
      width: 0.30rem;
      top: 0.09rem;
      right: 0.20rem;
      text-align: center;
      padding-top: 0.02rem;
    }

    .keyw-input {
      border: 0;
      border-radius: 0.02rem;
      height: 0.36rem;
      font-size: 0.14rem;
      padding: 0 0.30rem;
      width: calc(100% - 0.60rem);
    }
  }

  .card {
    background: #fff;
    box-shadow: 0 0.01rem 0.02rem rgba(0,0,0,.3);
    margin: 0.10rem;
    position: relative;
    border-radius: 0.02rem;
    font-size: 0.14rem;

    .card-content {
        position: relative;
    }
  }

  #cityCard {
    margin: -0.10rem 0.20rem 0.10rem 0.40rem;

    #cityUl {
      padding: 0;
      position: relative;
      max-height: 2.85rem;
      overflow: auto;
      border-top: 1px solid #ddd;

      li.city-li {
        padding-left: 0.30rem;
        margin: 0.10rem auto;
        color: #333333;
        font-size: 0.16rem;

        &.no-data{
          color: #d25b5b;
        }
      }
    }
  }

}
</style>