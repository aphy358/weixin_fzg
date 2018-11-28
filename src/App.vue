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
      transitionName: "vux-pop-out"
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

      // 当 o.arr.length == o.preLen 的时候，很有可能是用户点击了系统自带的返回键
      this.transitionName = o.arr.length <= o.preLen ? "vux-pop-out" : "vux-pop-in";

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
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 260ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
  box-shadow: 0 0 10px #ccc;
}

.vux-pop-out-enter {
  transform: translate3d(-50%, 0, 0);
  height: 100vh;
}

.vux-pop-out-enter-active{
  z-index: -1;
}

.vux-pop-out-leave-active {
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  transform: translate3d(100%, 0, 0);
  height: 100vh;
}

.vux-pop-in-leave-active {
  transform: translate3d(-50%, 0, 0);
}


</style>
