<template>
  <div class="nav-back" :style="_style" @click="gobackPage">
    <i class="iconfont icon-left-thin"></i>
  </div>
</template>

<script>
import { goBackPage } from '@/assets/util'

export default {
  name: '',
  data(){
    return {
    }
  },
  props: ['_style', 'onClick'],
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
      if(this.onClick){
        this.onClick()
      }else{
        goBackPage(this.$router)
      }
    }
  }
}
</script>

<style lang="scss">
.nav-back {
  position: absolute;
  width: 0.40rem;
  height: 0.36rem;
  left: 0;
  top: 0.10rem;
  text-align: center;
  font-size: 0.23rem;
  font-weight: bold;
  color: white;
  z-index: 1001;
  transform: translate3d(0, 0, 0) scale(1);
}
</style>