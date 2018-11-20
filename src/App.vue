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
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "vux-pop-out" : "vux-pop-in";
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
  transition: all 250ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
