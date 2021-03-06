<template>
  <div class="hotel-list-result-wrap">

    <div class="hotellist-nodata" v-if="hotelList.length == 0 && !loading">
      <img :src="noHotel">
      <div>暂无相关酒店</div>
      <div>建议更换关键字进行搜索</div>
    </div>

    <div v-if="dataType != 0" class="line-after" style="background: white;line-height: 0.4rem;padding-left: 0.1rem;">
      <i class="iconfont icon-hot" style="margin-right: 0.05rem;color: orange;font-size: 0.14rem;"></i>
      <span>您可能对如下酒店感兴趣</span>
    </div>
    <ul
      v-if="hotelList.length > 0"
      class="hotel-list-result-ul"
      v-infinite-scroll="queryHotel"
      infinite-scroll-disabled="infiniteLoad"
      infinite-scroll-distance="10">

      <li v-for="(n, i) in hotelList" :key="i" class="item-content" @click="gotoHotelDetail(n)">
          <div class="item-media">
            <img :src="n.picSrc.indexOf('nopic') != -1 ? logo : n.picSrc" :class="{'nopic': n.picSrc.indexOf('nopic') != -1}">
          </div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">{{ n.infoName }}</div>
            </div>
            <div class="item-subtitle">
              <span class="star-group">
                <span class="iconfont">{{ n.starText }}</span>
              </span>
              <span class="fr" v-if="n.lowest > 0">
                <span class="currency">¥</span>
                <span class="price">{{ n.lowest }}</span>
                <span class="price-text">起</span>
              </span>
            </div>
            <div class="icon-row">
              <span class="iconfont icon-wifi"></span>
              <span class="iconfont icon-park2"></span>
            </div>
            <div class="item-text address">{{ n.address }}</div>
            <div class="item-text biz-area">
              <span class="ico-biz">{{ n.businessCircle }}</span>
            </div>
            <div class="item-text price"></div>
          </div>
      </li>

    </ul>

    <Loading v-if="hotelList.length == 0 && !infiniteLoad && loading" />

    <LoadMore v-if="hotelList.length > 0 && !infiniteLoad" />

    <END v-if="hotelList.length > 0 && infiniteLoad" />

  </div>
</template>

<script>
import logo from '@/assets/img/fzglogo.jpg'
import noHotel from '@/assets/img/no-hotel.png'
import END from '@/components/END.vue'
import LoadMore from '@/components/LoadMore.vue'
import Loading from '@/components/Loading.vue'
import { gotoPage, getStarText } from '@/assets/util'
import { debounce } from 'lodash'

export default {
  name: 'hotelListInfinite',
  data(){
    return {
      logo: '',
      noHotel: '',
      hotelList: [],
      loading: false,
      infiniteLoad: false,
      pageNow: 1,

      // 2:热门推荐，   0：普通数据
      dataType: 0,
    }
  },
  props: ['showKeywordBoard'],
  components: {
    END,
    LoadMore,
    Loading
  },
  watch: {
    getCheckedArea(){
      this.queryHotel(1)
    },
    getCheckedBiz(){
      this.queryHotel(1)
    },
    getCheckin(){
      this.queryHotel(1)
    },
    getCheckout(){
      this.queryHotel(1)
    },
    getPriceRange(){
      this.queryHotel(1)
    },
    getCheckedStar(){
      this.queryHotel(1)
    },
    getCityId(){
      this.queryHotel(1)
    }
  },
  created(){
    this.logo = logo
    this.queryHotel()
    this.noHotel = noHotel
  },
  computed: {
    getCheckedArea(){
      return this.$store.state.hotelList.checkedArea
    },
    getCheckedBiz(){
      return this.$store.state.hotelList.checkedBiz
    },
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
    getPriceRange(){
      return this.$store.state.priceRange
    },
    getCheckedStar(){
      return this.$store.state.checkedStar
    },
    getCityId(){
      return this.$store.state.countryId + this.$store.state.stateId + this.$store.state.cityId
    }
  },
  activated(){
    if(!window.goBack){
      this.queryHotel(1)
    }
  },
  mounted(){},
  methods:{
    queryHotel: debounce(function(flag){
      let _this = this
      // 如果已经在查询酒店列表，则暂时不允许再查询
      if(_this.loading)   return false
      _this.loading = true

      if(flag){ // 如果是根据新的查询条件重新查询，则重置相关变量
        _this.resetData()
      }

      let _state = _this.$store.state
      let param = {
        countryId: _state.countryId,
        stateId: _state.stateId,
        cityId: _state.cityId,
        type: _state.cityType,
        pageNow: _this.pageNow,
        startDate: _state.checkin,
        endDate: _state.checkout,
        keyWords: _state.keyword,

        star: _state.checkedStar,
        priceRange: _state.priceRange,
        bizCircleId: _state.hotelList.checkedBiz.join(','),
        zoneId: _state.hotelList.checkedArea.join(','),

        selRoomNum: 1,
        adultNum: 2,
        childrenNum: 0,
        childrenAgesStr: '',
      }

      this.$api.hotelList.syncGetHotelList(param).then(res => {
        // 将这个变量设置为 false，表示允许再次查询酒店列表
        _this.loading = false

        if(res.returnCode === 1){
          _this.dataType = res.data || 0

          if(res.pageTotal <= _this.pageNow){ // 如果所有页面都加载完了，则终止无限加载
            _this.infiniteLoad = true
          }else{
            _this.infiniteLoad = false
            _this.pageNow++
          }

          res.dataList = res.dataList || []

          for (let i = 0; i < res.dataList.length; i++) {
            getStarText(res.dataList[i])
          }
  
          _this.hotelList = _this.hotelList.concat(res.dataList)
        }
      })
    }, 10),
    resetData(){
      this.hotelList = []
      this.pageNow = 1
      this.infiniteLoad = false
    },
    // 跳转到酒店详情页（或分销页？）
    gotoHotelDetail(hotel){
      this.$store.commit(`setCommonState`, {k: 'curHotel', v: hotel})
      gotoPage(this.$router, 'hotelDetail', {hotelId: hotel.infoId, cityType: this.$store.state.cityType})
    }
  }
}
</script>

<style lang="scss">
.hotel-list-result-wrap{
  padding-top: 0.96rem;
  min-height: calc(100vh - 1rem);

  .hotellist-nodata {
    text-align: center;
    padding: 0.8rem 0;
    color: gray;
    font-size: 0.12rem;

    img{
      width: 1.5rem;
      margin-bottom: 0.1rem;
    }

    div{
      margin-top: 0.05rem;
    }
  }

  ul{
    position: relative;
    margin: 0;
    padding: 0 0.1rem;
    background: white;

    .item-content {
      box-sizing: border-box;
      padding-left: 0.15rem;
      min-height: 0.44rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0;

      .item-media{
        display: flex;
        flex-shrink: 0;
        flex-wrap: nowrap;
        box-sizing: border-box;
        align-items: center;
        padding-top: 0.09rem;
        padding-bottom: 0.1rem;
        width: 1.2rem;

        img{
          display: block;
          width: 100%;
          height: 1.04rem;

          &.nopic{
            width: 1.04rem;
            margin-left: 0.08rem;
          }
        }
      }

      .item-inner{
        position: relative;
        width: 100%;
        min-height: 0.44rem;
        box-sizing: border-box;
        display: flex;
        display: block;
        overflow: hidden;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        margin-left: 0.15rem;
        padding-top: 0.1rem;
        padding-bottom: 0.09rem;
        align-self: stretch;

        &:after{
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          border-bottom: 0.01rem solid #EFEEEC;
          width: 100%;
          transform: scaleY(0.5);
          transform-origin: 50% 100%;
          z-index: 15;
        }

        .item-title-row{
          display: flex;
          justify-content: space-between;

          .item-title{
            flex-shrink: 1;
            min-width: 0;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
            white-space: inherit;
            font-weight: 500;
            font-size: 0.14rem;
          }
        }

        .item-subtitle{
          font-size: 0.15rem;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          max-width: 100%;
          text-overflow: ellipsis;
          height: 0.18rem;
          line-height: 0.18rem;

          .fr{
            float: right;
          }

          span.currency {
            font-size: 0.1rem;
            color: orangered;
          }

          .price {
            color: #ff7d13;
            font-size: 0.18rem;
            line-height: 0.18rem;
            font-weight: 700;
            margin-right: 0.01rem;
          }

          span.price-text {
            font-size: 0.12rem;
            color: #ff7d13;
          }

          .iconfont{
            letter-spacing: -0.01rem;
            color: orange;
            font-size: 0.12rem;
          }
        }

        .icon-row{
          height: 0.18rem;
          line-height: 0.18rem;

          .iconfont {
            color: #b2b2b2;
            margin-right: 0.05rem;
            font-size: 0.14rem;
          }
        }

        .item-text {
          position: relative;
          font-size: 0.12rem;
          color: #b2b2b2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &.address,
          &.biz-area{
            height: 0.18rem;
            line-height: 0.18rem;
          }

          .ico-biz {
            color: #5eccec;
            border: 0.01rem solid transparent;
            border-width: 0.01rem 0;
            max-width: 1.2rem;
          }
        }
      }

      &:last-child{
        .item-inner:after{
          content: none;
        }
      }
    }
  }
}
</style>