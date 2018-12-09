<template>
  <div class="nav-top">
		<div class="KWI_wrap">

      <!-- 返回上一页 -->
      <GoBack />

      <div id="hlist-Fdate">
				<div class="time-condition" @click="gotoCheckinCheckout">
					<p>入<span class="qt-ml5">{{ formatDate(getCheckin) }}</span></p>
					<p>离<span class="qt-ml5">{{ formatDate(getCheckout) }}</span></p>
				</div>
				<i class="iconfont icon-down-thin" style="position: relative;font-size: 0.1rem;margin-left: 0.05rem;top: -0.06rem;color: #aaa;"></i>
			</div>

      <i class="iconfont icon-search0 searchIcon"></i>

      <input type="text" class="keyw-input" placeholder="酒店名/地名" :value="getKeyword" readonly @click="$emit('showKeywordBoard')" />
    </div>

	</div>
</template>

<script>
// 酒店列表 顶部关键字输入区域
import GoBack from '@/components/GoBack.vue'
import { gotoPage, addDays } from "@/assets/util"

export default {
  name: "keywordInput",
  data() {
    return {
    }
  },
  props: {},
  components: {
    GoBack,
  },
  created() {},
  computed: {
    getKeyword(){
      return this.$store.state.keyword
    },
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
  },
  mounted() {},
  methods: {
    // 跳转到入离日期选择页面
    gotoCheckinCheckout(){
      gotoPage(this.$router, 'checkinCheckout')
    },
    // 将日期格式化为 '**-**' 的格式，如 '12-12'
    formatDate(dateStr){
      return addDays(dateStr).substring(5)
    }
  }
};
</script>

<style scoped lang="scss">
.nav-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ff7625;
  color: white;
  z-index: 1000;

  .KWI_wrap {
    margin: 0.1rem 0.20rem 0.10rem 0.40rem;  

    #hlist-Fdate {
      position: absolute;
      width: 0.8rem;
      padding: 0.05rem;
      padding-right: 0;
      top: 0.1rem;
      left: 0.4rem;
      color: #999;

      .time-condition {
        display: inline-block;
        padding-top: 0.03rem;
        height: 100%;

        p{
          margin: 0;
          line-height: 0.11rem;
          font-size: 0.10rem;

          .qt-ml5 {
            margin-left: 0.05rem;
          }
        }
      }
    }

    .searchIcon{
      position: absolute;
      color: #c1c1c1;
      top: 0.17rem;
      left: 1.15rem;
    }

    .keyw-input {
      border: 0;
      border-radius: 0.02rem;
      height: 0.36rem;
      font-size: 0.14rem;
      padding: 0 0.30rem;
      padding-left: 1rem;
      width: calc(100% - 1.3rem);
    }
  }

}
</style>