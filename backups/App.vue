<template>
  <div class="pages">

    <transition :name="transitionName" id="app" 
      @enter="enter"
      @after-enter="afterEnter"

      @leave="leave"
      @after-leave="afterLeave"
      >
      <keep-alive :max="5">
        <router-view/>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
import Velocity from 'velocity-animate'

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
  methods: {
    // --------
    // 进入中
    // --------

    // beforeEnter: function (el) {
    // },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
      if( el.classList.contains('slide-left-enter') ){
        el.style.left = '100%'
        Velocity(el, {left: '0%'}, {duration: 300, complete: done})
      }else{
        el.style.left = '-50%'
        Velocity(el, {left: '0%'}, {duration: 300, complete: done})
      }
    },
    afterEnter: function (el) {
      el.removeAttribute('style')
    },

    // --------
    // 离开时
    // --------

    // beforeLeave: function (el) {
    // },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function (el, done) {
      if( el.classList.contains('slide-left-leave') ){
        el.style.left = '0%'
        Velocity(el, {left: '-50%'}, {duration: 300, complete: done})
      }else{
        el.style.left = '0%'
        Velocity(el, {left: '100%'}, {duration: 300, complete: done})
      }
    },
    afterLeave: function (el) {
      el.removeAttribute('style')
    },
  }
};
</script>

<style lang="scss">

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 1000%;
  top: 0;
  position: absolute;
  /* perspective: 1000; 这个属性会导致页面切换时，顶部 fixed 的元素无法固定在预想位置 */
  backface-visibility: hidden;
  box-shadow: 0 0 10px #ccc;
}

.slide-right-leave-active{
  /* position: fixed; */
}

/* 这里是为了去除 transform 样式，使页面切换时，不会影响 fixed 元素的正常固定 */
// .page.velocity-animating{
//   transform: none!important;

//   .nav-top{
//     left: auto!important;
//   }
// }



.slide-left-enter-active,
.slide-right-leave-active{
  z-index: 2000;
}

</style>
