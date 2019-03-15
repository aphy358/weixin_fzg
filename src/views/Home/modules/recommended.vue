<template>
  <div class="content_wrap">
    <!--精选酒店-->
    <div class="hotel-block-title">精选酒店</div>

    <div class="hotel-block-item" v-for="n in recommendArr" :key="n.hotelId" @click="gotoHotelDetailPage(n)">
      <div class="h-b-img-wrap">
        <img :src="n.img">
        <div class="hotel-block-hname">{{ n.hotelName }}</div>
        <div class="hotel-block-location">{{ n.location }}</div>
      </div>
      <div class="h-b-price-wrap">
        <span class="h-b-shotcut">{{ n.shotcut }}</span>
        <span class="h-b-price"><span class="currency">￥</span>{{ n.lowest }}</span>
        <span class="h-b-book-btn">查看</span>
      </div>
    </div>

  </div>
</template>

<script>
// 精选酒店
import { gotoPage } from '@/assets/util'

export default {
  name: 'recommended',
  data(){
    return {
      recommendArr: [
        { // <!--济州神话世界度假酒店--蓝鼎 193847   -->
          hotelId: '193847',
          img: 'http://image.jladmin.cn/real_1537842545089.jpg',
          hotelName: '济州神话世界度假酒店',
          location: '济州岛',
          lowest: '240起',
        },
        { // <!--广州长隆香江酒店 254542   -->
          hotelId: '254542',
          img: 'http://image.jladmin.cn/real_1539249071142.jpg',
          hotelName: '广州长隆香江酒店',
          location: '广州',
          lowest: '454起'
        },
        { // <!--广州长隆酒店 43846   -->
          hotelId: '43846',
          img: 'http://image.jladmin.cn/real_1526027500309.jpg',
          hotelName: '广州长隆酒店',
          location: '番禺区，广州',
          lowest: '1099起'
        },
        { // <!--广州长隆熊猫酒店 200595   -->
          hotelId: '200595',
          img: 'http://image.jladmin.cn/real_1526027385546.jpg',
          hotelName: '广州长隆熊猫酒店',
          location: '番禺区，广州',
          lowest: '929起'
        },
        { // <!--珠海长隆横琴湾酒店 43798-->
          hotelId: '43798',
          img: 'http://image.jladmin.cn/real_1535942049899.jpg',
          hotelName: '珠海长隆横琴湾酒店',
          location: '香洲区，珠海',
          lowest: '929起'
        },
        { // <!--珠海长隆马戏酒店 43813-->
          hotelId: '43813',
          img: 'http://image.jladmin.cn/real_1535942087096.jpg',
          hotelName: '珠海长隆马戏酒店',
          location: '横琴新区，珠海',
          lowest: '739起'
        },
        { // <!--珠海长隆企鹅酒店 38441-->
          hotelId: '38441',
          img: 'http://image.jladmin.cn/real_1535942117856.jpg',
          hotelName: '珠海长隆企鹅酒店',
          location: '横琴新区，珠海',
          lowest: '1009起'
        },
        { // <!--珠海长隆迎海酒店公寓 43823-->
          hotelId: '43823',
          img: 'http://image.jladmin.cn/real_1535942144683.jpg',
          hotelName: '珠海长隆迎海酒店公寓',
          location: '横琴新区，珠海',
          lowest: '369起'
        },
        { // 广州白天鹅宾馆
          hotelId: '80',
          img: 'http://image.jladmin.cn/real_1542188371165.jpg',
          hotelName: '广州白天鹅宾馆',
          location: '荔湾区，广州',
          shotcut: '住客好评 - 广州精选酒店之一',
          lowest: '830起'
        },
        { // 台北寒舍艾美酒店
          hotelId: '35930',
          img: 'http://image.jladmin.cn/real_1542188347902.jpg',
          hotelName: '台北寒舍艾美酒店',
          location: '信义区，台北',
          shotcut: '室内的落地窗可眺望台北101大楼',
          lowest: '1716起'
        },
        { // 澳门喜来登金沙城中心大酒店
          hotelId: '38900',
          img: 'http://image.jladmin.cn/real_1542188323198.jpg',
          hotelName: '澳门喜来登金沙城中心大酒店',
          location: '澳门特别行政区',
          shotcut: '位置超棒：最近住过的客人都说好',
          lowest: '715起'
        },
        { // 重庆丽笙世嘉酒店
          hotelId: '45521',
          img: 'http://image.jladmin.cn/real_1542188267538.jpg',
          hotelName: '重庆丽笙世嘉酒店',
          location: '南岸区，重庆',
          shotcut: '南岸区夜生活非常丰富，咖啡好喝',
          lowest: '570起'
        },
      ]
    }
  },
  components: {
  },
  created(){
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    // 跳转到酒店详情页
    gotoHotelDetailPage(n){
      this.$api.hotelDetail.syncGetHotelInfo({infoIds: n.hotelId}).then(res => {
        if(res.returnCode === 1 && res.dataList.length){
          this.$store.commit(`setCommonState`, {k: 'curHotel', v: res.dataList[0]})
          gotoPage(this.$router, 'hotelDetail', {hotelId: n.hotelId, cityType: n.type || '0'})
        }
      })
    }
  }
}
</script>

<style lang="scss">
.content_wrap {
    margin: 0 0.05rem;

    @at-root .hotel-block-title {
      text-align: center;
      font-size: 0.18rem;
      color: #0A329E;
      line-height: 0.4rem;
    }

    @at-root .hotel-block-item {
      position: relative;
      background: white;
      color: #0A329E;
      margin-bottom: 0.1rem;

      &:after{
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 1px solid rgb(232, 231, 231);
        content: "";
        box-sizing: border-box;
        transform: scale(.5);
        transform-origin: left top;
      }

      &:last-child{
        margin-bottom: 0;
      }

      @at-root .h-b-img-wrap {
        position: relative;
        overflow: hidden;

        img{
          width: 100%;
          float: left;
        }

        @at-root .hotel-block-hname {
          position: absolute;
          top: 0.1rem;
          left: 0.1rem;
          color: white;
          font-weight: bold;
          font-size: 0.2rem;
          text-shadow: 0.01rem 0.01rem 0.01rem rgba(0,0,0,0.6);
        }

        @at-root .hotel-block-location {
          position: absolute;
          top: 0.35rem;
          left: 0.2rem;
          color: white;
          text-shadow: 0.01rem 0.01rem 0.01rem rgba(0,0,0,0.6);
          font-size: 0.12rem;
        }
      }

      @at-root .h-b-price-wrap {
        font-size: 0.12rem;
        text-align: right;
        line-height: 0.36rem;
        position: relative;

        @at-root .h-b-shotcut {
          position: absolute;
          left: 0.05rem;
        }

        @at-root .h-b-price {
          color: orangered;

          span.currency {
            font-size: 0.1rem;
            color: orangered;
          }
        }

        @at-root .h-b-book-btn {
          color: white;
          background: #ff7625;
          padding: 0.05rem 0.1rem;
          border-radius: 0.02rem;
          margin: 0 0.05rem;
        }
      }
    }
}
</style>