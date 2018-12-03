<template>
  <div class="hotel-list-result-wrap">
    <ul
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
  </div>
</template>

<script>

export default {
  name: 'hotelListInfinite',
  data(){
    return {
      hotelList: [],
      loading: false,
      infiniteLoad: false,
      _infiniteLoad: false,
      pageNow: 1,
    }
  },
  props: {},
  components: {},
  watch: {},
  created(){
    this.queryHotel()
  },
  computed: {},
  activated(){
    this.infiniteLoad = this._infiniteLoad
  },
  deactivated(){
    // 当跳转到其他页面时，先将该组件的无限滚动禁用。
    this.infiniteLoad = true
  },
  mounted(){},
  methods:{
    queryHotel(){
      let _this = this
      // 如果已经在查询酒店列表，则暂时不允许再查询
      if(_this.loading)   return false
      _this.loading = true

      let _state = _this.$store.state
      let param = {
        cityId: _state.cityId,
        type: _state.cityType,
        pageNow: _this.pageNow,
        startDate: _state.checkin,
        endDate: _state.checkout,
        keyWords: _state.hotelList.keyword,
        star: _state.checkedStar,
        priceRange: _state.priceRange,
        bizCircleId: _state.hotelList.checkedBiz.join(','),
        zoneId: _state.hotelList.checkedArea.join(','),
      }

      this.$api.hotelList.syncGetHotelList(param).then(res => {
        // 将这个变量设置为 false，表示允许再次查询酒店列表
        _this.loading = false

        if(res.success && res.content){
          let content = res.content
          if(content.pageCount <= _this.pageNow){ // 如果所有页面都加载完了，则终止无限加载
            _this.infiniteLoad = true
            _this._infiniteLoad = true
          }else{
            _this.infiniteLoad = false
            _this._infiniteLoad = false
            _this.pageNow++

            for (let i = 0; i < content.data.length; i++) {
              const n = content.data[i];
              n.starText = 
                n.star <= 25 ? '经济型' : 
                n.star <= 35 ? '舒适型' : 
                n.star <= 45 ? '高档型' : '豪华型'
            }

            _this.hotelList = _this.hotelList.concat(content.data)
            
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.hotel-list-result-wrap{
  padding-top: 1rem;
  min-height: calc(100vh - 1rem);

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
    }
  }
}
</style>