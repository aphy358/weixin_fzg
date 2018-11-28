<template>
  <div class="nav-back" @click="gobackPage">
    <i class="iconfont icon-left-thin"></i>
  </div>
</template>

<script>

export default {
  name: '',
  data(){
    return {
    }
  },
  props: {
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
    // 返回上一页
    gobackPage(){
      window.historyObj.arr.pop()
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
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
</style>