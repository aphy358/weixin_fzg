<template>

  <transition :name="transitionName" id="app">
    <keep-alive :max="5">
      <router-view/>
    </keep-alive>
  </transition>

</template>

<script>

export default {
  name: "",
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  props: {},
  watch: {
    $route(to, from) {
      // window.historyObj = {
      //   arr: [{path: 'home'}],
      //   preLen: 1
      // }

      let o = window.historyObj
      let len = o.arr.length      

      // 是否是回退
      let goBack = o.arr.length <= o.preLen

      if(from.path == '/') goBack = false

      // 当 o.arr.length == o.preLen 的时候，很有可能是用户点击了系统自带的返回键 && o.preLen > 1
      // this.transitionName = o.arr.length <= o.preLen ? "slide-right" : "slide-left";
      this.transitionName = goBack ? "slide-right" : "slide-left";

      if(goBack){ // 返回页面操作，后退取出 
        if(o.arr.length){  // 有时候是无限制的后退导致对象为空，所以这里要判断一下不为空 

          if(o.arr.length == o.preLen && o.arr.length > 1){ // 如果是点击了系统自带的回退按钮
            o.arr.pop()
            len = o.arr.length
          }

          let scrollTop = o.arr[len - 1].scrollTop

          setTimeout(() => {
            let len = document.querySelectorAll('.page-content').length
            document.querySelectorAll('.page-content')[len - 1].scrollTop = scrollTop
          }, 10)
        }
      }else{  // 前进页面操作，前进保存 scrollTop
        if(len > 1){
          let scrollTop = document.querySelectorAll('.page-content')[0].scrollTop
          o.arr[len - 2].scrollTop = scrollTop
        }else{  // 有可能直接由其他页面的链接进入项目，那么其实路由列表不止一个，但是 window.historyObj.arr 对象却只有一个，这时候什么都不做
        }
      }

      window.historyObj.preLen = window.historyObj.arr.length
    }
  },
  components: {},
  created() {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 260ms;
  height: 1000%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
  box-shadow: 0 0 10px #ccc;
}

.slide-right-enter {
  transform: translate3d(-35%, 0, 0);
  opacity: 0.9;
}

.slide-right-leave-active {
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  transform: translate3d(100%, 0, 0);
  height: 100vh;
}

.slide-left-leave-active {
  transform: translate3d(-35%, 0, 0);
  opacity: 0.9;
}

.slide-right-enter-active{
  z-index: -1;
}

.slide-left-enter-active,
.slide-right-leave-active{
  z-index: 2000;
}

</style>
