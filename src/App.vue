<template>
  <div class="pages">

    <transition :name="transitionName" id="app">
      <keep-alive :max="5">
        <router-view/>
      </keep-alive>
    </transition>

  </div>
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

<style lang="scss">

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 2600ms;
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


.slide-left-enter-active,
.slide-right-leave-active{
  z-index: 2000;
}

</style>
