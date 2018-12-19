<template>
  <div>
    <div class="city-type-toggle-wrap">
      <ul class="cui-tab-mod">
        <li data-key="0" :class="{'current': cityType == '0'}" @click="cityType='0'">境内城市</li>
        <li data-key="1" :class="{'current': cityType == '1'}" @click="cityType='1'">境外城市</li>
        <i class="cui-tab-scrollbar"></i>
      </ul>

      <div v-show="cityType == '0'" class="nav-bar-wrap">
        <ul>
          <li v-for="n in cityArr" :key="n" @click="scrollIntoView('城市0' + n, 'type-0')">{{ n }}</li>
          <!-- <li v-for="n in cityArr" :key="n"><a :href="'#城市' + n">{{ n }}</a></li> -->
        </ul>
      </div>
      <div v-show="cityType == '1'" class="nav-bar-wrap">
        <ul>
          <li v-for="n in cityArr" :key="n" @click="scrollIntoView('城市1' + n, 'type-1')">{{ n }}</li>
        </ul>
      </div>
    </div>

    <div class="city-list-wrap">
      <!-- 境内城市 -->
      <div v-show="cityType == '0'" class="city-list-inner-wrap type-0">
        <span class="cui-city-t">热门城市</span>
        <ul class="hotel-city-tags">
          <li v-for="n in hotCity0" :key="n.cityId" @click="selectOneCity(n)">{{ n.cityName }}</li>
        </ul>

        <div v-for="n in cityArr" :key="n" :id="'城市0' + n" class="one-city-list-wrap">
          <label class="cui-city-t" :for="'radio_city_0' + n">{{ n }}</label>
          <input type="checkbox" class="radio-city" name="radio_city_0" :checked="n == 'A'" :id="'radio_city_0' + n" />
          <ul class="hotel-city-tags">
            <li v-for="(p, i) in cities.filter(o => o.cityType === '0' && o.w === n)" :key="i" @click="selectOneCity(p)">{{ p.cityName }}</li>
          </ul>
        </div>
      </div>

      <!-- 境外城市 -->
      <div v-show="cityType != '0'" class="city-list-inner-wrap type-1">
        <span class="cui-city-t">热门城市</span>
        <ul class="hotel-city-tags">
          <li v-for="n in hotCity1" :key="n.cityId" @click="selectOneCity(n)">{{ n.cityName }}</li>
        </ul>

        <div v-for="n in cityArr" :key="n" :id="'城市1' + n" class="one-city-list-wrap">
          <label class="cui-city-t" :for="'radio_city_1' + n">{{ n }}</label>
          <input type="checkbox" class="radio-city" name="radio_city_1" :checked="n == 'A'" :id="'radio_city_1' + n" />
          <ul class="hotel-city-tags">
            <li v-for="(p, i) in cities.filter(o => o.cityType === '1' && o.w === n)" :key="i" @click="selectOneCity(p)">{{ p.cityName }}</li>
          </ul>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import { HotCity, Cities } from './cities.js'
import Velocity from 'velocity-animate';

export default {
  name: 'cityList',
  data(){
    return {
      cityType: '0',
      hotCity0: [],
      hotCity1: [],
      cities: [],
      cityArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    }
  },
  props: {
  },
  components: {
  },
  created(){
    if(HotCity){
      this.hotCity0 = HotCity.filter(n => n.cityType === '0')
      this.hotCity1 = HotCity.filter(n => n.cityType === '1')
    }

    this.cities = Cities
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    scrollIntoView(id, type){
      let elem = document.getElementById(id)
      let container = document.querySelector('.city-list-inner-wrap.' + type)

      Velocity(elem, 'scroll', {offset: '0px', container: container})
      Velocity(elem, 'finish')
      elem.querySelector('input').checked = true
    },
    selectOneCity(city){
      this.$store.commit(`setCityType`, city.cityType)
      this.$store.commit(`setCommonState`, {k: 'cityId', v: city.cityId})
      this.$store.commit(`setCommonState`, {k: 'cityText', v: city.cityName})
      sessionStorage.setItem('queryHotelList', 'query')
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="scss">
.city-type-toggle-wrap{
  position: fixed;
  width: 100%;
  top: 0.56rem;
  z-index: 2;

  .cui-tab-mod{
    display: flex;
    height: 0.35rem;
    line-height: 0.35rem;
    border-bottom: #ddd 1px solid;
    background-color: #fafafa;
    color: #666;
    position: relative;
    width: 100%;
    margin: 0 auto;

    li{
      font-size: 0.15rem;
      text-align: center;
      flex: 1;

      &.current{
        color: #ff7625;
      }

      &:nth-of-type(1){
        &.current{
          ~ .cui-tab-scrollbar{
            transform: translate3d(0, 0, 0);
          }
        }
      }

      &:nth-of-type(2){
        &.current{
          ~ .cui-tab-scrollbar{
            transform: translate3d(100%, 0, 0);
          }
        }
      }
    }

    @at-root .cui-tab-scrollbar{
      position: absolute;
      width: 50%;
      left: 0;
      height: 0.03rem;
      bottom: 0;
      background-color: #ff7625;
      transition: transform 300ms ease-in-out;
      z-index: 2;
    }

  }

  .nav-bar-wrap{
    position: absolute;
    width: 0.25rem;
    top: 0.35rem;
    right: 0;
    z-index: 3001;

    ul{
      background-color: rgba(255, 255, 255, .5);
      text-transform: uppercase;
      color: #ff7625;
      font-size: 0.12rem;

      li{
        line-height: 0.19rem;
        text-align: center;
      }
    }
  }
}

.city-list-wrap{
  padding-top: 0.91rem;

  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;


  @at-root .city-list-inner-wrap{
    position: relative;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    @at-root .cui-city-t{
      font-size: 0.14rem;
      color: #666;
      background-color: #efefef;
      border-bottom: #bcbcbc 1px solid;
      line-height: 0.3rem;
      padding: 0 0.1rem;
      display: block;
      border-width: 0 0 1px;
      border-color: #ddd;
    }

    @at-root input.radio-city[type='checkbox']{
      display: none;

      &:checked+ul.hotel-city-tags{
        display: block;
      }

      &+ul.hotel-city-tags{
        display: none;
      }
    }

    @at-root .hotel-city-tags{
      background-color: #fff;
      overflow: hidden;
      padding: 0 0.15rem 0.1rem 0.1rem;

      li{
        font-size: 0.14rem;
        width: 30%;
        float: left;
        height: 0.25rem;
        line-height: 0.25rem;
        padding: 0 0.03rem;
        box-sizing: border-box;
        text-align: center;
        margin: 0.1rem 3% 0 0;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:after{
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          border: 1px #ddd solid;
          content: "";
          border-radius: 0.04rem;
          box-sizing: border-box;
          transform: scale(.49);
          -webkit-transform-origin: left top;
          transform-origin: left top;
        }
      }
    }

    // @at-root .one-city-list-wrap{
    //   padding-top: 0.91rem;
    //   margin-top: -0.91rem;
    // }    
  }

}
</style>