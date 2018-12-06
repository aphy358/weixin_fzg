<template>
  <div class="hotel-list-result-wrap">

    <div class="hotellist-nodata" v-if="hotelList.length == 0 && infiniteLoad">
      <img :src="noHotel">
      <div>暂无相关酒店</div>
      <div>建议更换关键字进行搜索</div>
    </div>

    <ul
      v-else
      class="hotel-list-result-ul"
      v-infinite-scroll="queryHotel"
      infinite-scroll-disabled="infiniteLoad"
      infinite-scroll-distance="10">

      <li v-for="n in hotelList" :key="n.infoId" class="item-content">
          <div class="item-media">
            <img :src="n.picSrc" :class="{'nopic': n.picSrc.indexOf('nopic') != -1}">
          </div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">{{ n.infoName }}</div>
            </div>
            <div class="item-subtitle">
              <span class="star-group">
                <span class="iconfont">{{ n.starText }}</span>
              </span>
              <span class="fr">
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

    <LoadMore v-if="!infiniteLoad" />

    <END v-if="hotelList.length > 0 && infiniteLoad" />

  </div>
</template>

<script>
import noHotel from '@/assets/img/no-hotel.png'
import END from '@/components/END.vue'
import LoadMore from '@/components/LoadMore.vue'

export default {
  name: 'hotelListInfinite',
  data(){
    return {
      noHotel: '',
      hotelList: [],
      loading: false,
      infiniteLoad: false,
      _infiniteLoad: false,
      pageNow: 1,
    }
  },
  props: ['showKeywordBoard'],
  components: {
    END,
    LoadMore,
  },
  watch: {
    showKeywordBoard(){
      if(this.showKeywordBoard){
        // 当显示关键字输入组件时，先将该组件的无限滚动禁用。
        this.infiniteLoad = true
      }else{
        // 当隐藏关键字输入组件时，恢复之前的无限滚动状态
        this.infiniteLoad = this._infiniteLoad
      }
    },
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
  },
  created(){
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
  },
  activated(){
    this.infiniteLoad = this._infiniteLoad
    // console.log(sessionStorage.getItem('queryHotelList'));
    
    if(sessionStorage.getItem('queryHotelList')){
      this.queryHotel(1)
      sessionStorage.removeItem('queryHotelList')
    }
  },
  deactivated(){
    // 当跳转到其他页面时，先将该组件的无限滚动禁用。
    this.infiniteLoad = true
  },
  mounted(){},
  methods:{
    queryHotel(flag){
      let _this = this
      // 如果已经在查询酒店列表，则暂时不允许再查询
      if(_this.loading)   return false
      _this.loading = true

      if(flag){ // 如果是根据新的查询条件重新查询，则重置相关变量
        _this.resetData()
      }

      let _state = _this.$store.state
      let param = {
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
      }

      this.$api.hotelList.syncGetHotelList(param).then(res => {
        // 将这个变量设置为 false，表示允许再次查询酒店列表
        _this.loading = false

        if(res.returnCode === 1 && res.data){
          let content = res.data
          if(content.pageCount <= _this.pageNow){ // 如果所有页面都加载完了，则终止无限加载
            _this.infiniteLoad = true
            _this._infiniteLoad = true
          }else{
            _this.infiniteLoad = false
            _this._infiniteLoad = false
            _this.pageNow++
          }

          for (let i = 0; i < content.data.length; i++) {
            const n = content.data[i];
            n.starText = 
              n.star <= 25 ? '经济型' : 
              n.star <= 35 ? '舒适型' : 
              n.star <= 45 ? '高档型' : '豪华型'
          }

          _this.hotelList = _this.hotelList.concat(content.data)
            
        }
      })
    },
    resetData(){
      this.hotelList = []
      this.pageNow = 1
      this.infiniteLoad = false
      this._infiniteLoad = false
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
          right: auto;
          top: auto;
          height: 0.01rem;
          width: 100%;
          background-color: #c8c7cc;
          display: block;
          z-index: 15;
          transform-origin: 50% 100%;
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
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 3;
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