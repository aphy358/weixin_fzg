<template>
  <!-- banner 区域 -->
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="n in bannerSwiper" :key="n.hotelId" @click.native="gotoHotelDetailPage(n)">
      <img :src="n.img" width="100%">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { gotoPage } from '@/assets/util'

export default {
  name: 'banner',
  data(){
    return {
      bannerSwiper: [
        { // <!--澳门喜来登金沙城中心大酒店 38900   -->
          hotelId: '38900',
          img: 'http://image.jladmin.cn/real_1561452871132.jpg'
        },
        { // <!--迪士尼好莱坞酒店20190108 44153   -->
          hotelId: '44153',
          img: 'http://image.jladmin.cn/real_1555899025016.jpg'
        },
        { // <!--济州神话世界度假酒店--蓝鼎 193847   -->
          hotelId: '193847',
          img: 'http://image.jladmin.cn/real_1537842489044.jpg'
        },
        // { // <!--广州长隆香江酒店 254542   -->
        //   hotelId: '254542',
        //   img: 'http://image.jladmin.cn/real_1539249111131.jpg'
        // },
        // { // <!--广州长隆酒店 43846   -->
        //   hotelId: '43846',
        //   img: 'http://image.jladmin.cn/real_1526027431776.jpg'
        // },
        // { // <!--广州长隆熊猫酒店 200595   -->
        //   hotelId: '200595',
        //   img: 'http://image.jladmin.cn/real_1526027469157.jpg'
        // },
        // { // <!--珠海长隆横琴湾酒店 43798   -->
        //   hotelId: '43798',
        //   img: 'http://image.jladmin.cn/real_1535941858376.jpg'
        // },
        // { // <!--珠海长隆马戏酒店 43813-->
        //   hotelId: '43813',
        //   img: 'http://image.jladmin.cn/real_1535941914859.jpg'
        // },
        // { // <!--珠海长隆企鹅酒店 -->
        //   hotelId: '38441',
        //   img: 'http://image.jladmin.cn/real_1535941952124.jpg'
        // },
        // { // <!--珠海长隆迎海酒店公寓 -->
        //   hotelId: '43823',
        //   img: 'http://image.jladmin.cn/real_1535941993949.jpg'
        // },
        // { // <!--澳门金沙度假区-威尼斯人 -->
        //   hotelId: '37976',
        //   img: 'http://image.jladmin.cn/real_1539248861577.jpg'
        // },
        // { // <!--澳门喜来登酒店 -->
        //   hotelId: '38900',
        //   img: 'http://image.jladmin.cn/real_1539248810488.jpg'
        // },
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
.home-page{

  .mint-swipe{
    height: auto;
  }

  .mint-swipe-items-wrap{
    height: 2.5rem;
  }
}
</style>