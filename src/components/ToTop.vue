<template>
  <transition name="totop">
    <div v-show="ifShow" class="totop-div" @click="goToTop">
      <i class="iconfont icon-up-thin"></i>
    </div>
  </transition>
</template>

<script>
// 回到顶部组件
export default {
  name: 'ToTop',
  data(){
    return {
      ifShow: false,
      scrollWrap: null,
    }
  },
  props: ['pageContent'],
  components: {},
  watch: {
    scrollWrap(){
      if(this.scrollWrap){
        // 注册事件
        this.scrollWrap.addEventListener('scroll', this.addEvent, false)
      }
    }
  },
  created(){
  },
  beforeDestroy(){
    if(this.scrollWrap){
      // 卸载事件
      this.scrollWrap.removeEventListener('scroll', this.addEvent, false)
    }
  },
  activated(){},
  computed: {},
  mounted(){
    let _this = this

    setTimeout(function(){
      if(_this.pageContent){
        _this.scrollWrap = document.querySelector(_this.pageContent)
      }else{
        let arr = document.querySelectorAll('.page-content')
        _this.scrollWrap = arr[arr.length - 1]
      }
    }, 100)
  },
  methods: {
    goToTop(){
      this.scrollWrap.scrollTop = 0
      this.ifShow = false
    },
    addEvent(e){
      this.ifShow = e.srcElement.scrollTop > 200
    },
  }
}
</script>

<style lang="scss">
.totop-enter-active,
.totop-leave-active {
  will-change: transform;
  transition: all 260ms;
}

.totop-enter,
.totop-leave-to {
  opacity: 0;
}


.totop-div{
  position: fixed;
  bottom: 0.1rem;
  left: 50%;
  width: 0.3rem;
  height: 0.3rem;
  text-align: center;
  margin-left: -0.15rem;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.5);
  line-height: 0.3rem;
  color: white;
  z-index: 9999;
}
</style>