<template>
  <div class="page about-page">
    
    <mt-header title="关于捷旅"></mt-header>
    <GoBack _style="top: 0.02rem" />
    
    <div class="page-content" style="background: #efeff4;">
      <div class="content-block">
        <div class="about-title">捷旅简介</div>
        <p>2001年,深圳市捷旅国际旅行社有限公司成立于深圳，地处全国境内游客接待量最大的广东省，毗邻港澳。公司初期以广东省、香港、澳门酒店批发为核心，逐步扩展到全国乃至全球范围。经过十几年发展，深圳捷旅已成为中国地区最先进和最具规模的酒店B2B分销平台。</p>	
        <p>公司现有合作酒店近5万家，分布在国内外300多个城市，曾获得澳门威尼斯人度假村酒店全球销售前五、澳门银河度假酒店年度代理商销量第一、香港百乐酒店集团最佳合作伙伴及珠海海泉湾最佳合作伙伴等荣誉称号；合作的下游分销同行超过1万家。公司近几年业务增长率保持在30%-50%。</p>	
        <p>2011年9月，公司自主研发的“房掌柜”酒店分销系统上线，该系统是行业内首家明确开放内部中央库存的实时预订平台，包含在线支付、财务报表、员工管理等实用功能，极大提升了酒店分销同行的工作效率。</p>	
        <p>2012年，公司自主研发的EBooking酒店管理系统上线，吸引了众多酒店通过该系统维护房价房态，使房掌柜的房价房态更加准确，同时也提高了订单处理效率。</p>	
        <p>2013年，公司在酒店B2B领域率先推出基于微信的移动应用，支持实时查询预订以及微信支付，与PC端房掌柜系统双向同步，为客户提供了更丰富和便捷的预订工具</p>	
        <p>公司现有员工约300余人，下属北京、上海、长沙、台湾等分公司。深圳捷旅未来将着重于API系统对接的合作方式、产品品类的丰富和创新、提升系统的功能和体验，促进产业链的信息化和高效率，从而提高旅游服务品质。</p>	
        <p>公司地址： 深圳市龙岗区坂田街道中兴路105号儒骏大厦3楼</p>
      </div>

      <END />

    </div>
  </div>
</template>

<script>
import END from "@/components/END.vue"
import GoBack from '@/components/GoBack.vue';

export default {
  name: 'about',
  data(){
    return {}
  },
  props: {},
  components: {
    END,
    GoBack
  },
  watch: {},
  created(){},
  computed: {},
  mounted(){},
  methods:{}
}
</script>

<style scoped lang="scss">
.content-block{
  color: #666666;
  padding: 0.2rem 0.1rem;

  .about-title{
    font-size: 0.16rem;
    font-weight: bold;
    text-align: center;
  }

  p{
    text-indent: 0.28rem;
    margin: 0.2rem 0;
  }
}
</style>