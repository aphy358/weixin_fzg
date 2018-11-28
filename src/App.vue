<template>
  <transition :name="transitionName" id="app">
    <keep-alive>
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
      //   arr: ['/'],
      //   preLen: 1
      // }

      let o = window.historyObj
      
      // 当 o.arr.length == o.preLen 的时候，很有可能是用户点击了系统自带的返回键 && o.preLen > 1
      this.transitionName = o.arr.length <= o.preLen ? "slide-right" : "slide-left";

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

<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 260ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
  box-shadow: 0 0 10px #ccc;
}

.slide-right-enter {
  transform: translate3d(-50%, 0, 0);
  height: 100vh;
}

.slide-right-enter-active{
  z-index: -1;
}

.slide-right-leave-active {
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  transform: translate3d(100%, 0, 0);
  height: 100vh;
}

.slide-left-leave-active {
  transform: translate3d(-50%, 0, 0);
}


</style>
