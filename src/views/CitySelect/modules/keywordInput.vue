<template>
  <div class="nav-top">
		<div class="KWI_wrap">
			
      <!-- 返回上一页 -->
      <GoBack />
      
      <i class="iconfont icon-search0 searchIcon"></i>
      <i class="iconfont icon-shanchu kw_del" v-if="keywords != ''" @click="keywords = ''"></i>
      <input type="text" id="getCity" class="keyw-input has-city" placeholder="城市关键字" v-model="keywords" @keyup="inputKeyword" />
    </div>
        
    <div class="card" id="cityCard" v-show="keywords != ''">
			<div class="card-content">
				<div class="list-block">
					<ul id="cityUl" v-if="cities.length > 0">
            <li class="city-li" v-for="n in cities" :key="n.cityId" data-ctype="0">{{ n.cityName }}</li>
          </ul>
          <ul id="cityUl" v-if="cities.length <= 0">
            <li class="city-li no-data" >无相关城市</li>
          </ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// 城市选择 顶部关键字输入区域
import GoBack from '@/components/GoBack.vue'

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
  components: {
    GoBack
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    inputKeyword($event){
      this.keywords = this.keywords.replace(/^\s+|\s+$/g, '')
    },
  }
};
</script>

<style scoped lang="scss">
.nav-top {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ff7625;
  color: white;
  z-index: 1000;

  .KWI_wrap {
    margin: 0.1rem 0.20rem 0.10rem 0.40rem;

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