<template>

  <transition :name="transitionName" id="app">
    <keep-alive exclude="orderWrite,orderPay,register,ebBatchModify,qnbBatchModify">
      <router-view/>
    </keep-alive>
  </transition>

</template>

<script>
import { initPageShare, initJSSDK } from '@/assets/util'

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
      // 设置或保存页面的 scrolltop
      this.initPageScrollTop(to, from)

      // 初始化 JSSDK
      let _this = this
      setTimeout(function(){
        initJSSDK(_this)

        // 针对非酒店详情页做统一的自定义分享，酒店详情页有它自己的自定义分享
        if(to.path.toLowerCase() != '/hoteldetail'){
          setTimeout(function(){
            wx.ready(function(){
              initPageShare()
            })
          }, 360)
        }
      }, 360)
    }
  },
  components: {},
  created() {
    // 记录进入 app 时的 url，并存入全局变量
    if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
      window.entryUrl = location.href.split('#')[0]
    }


    let keyBoardShow = false

    // 解决部分 iphone 换页的时候，软键盘导致页面向上顶起而不收回的 bug
    document.body.addEventListener('focusout', () => { //软键盘关闭事件
      setTimeout(function(){
        if(!keyBoardShow)(
          window.scroll(0, 0)
        )
      }, 10)
    })

    document.body.addEventListener('focusin', () => { //软键盘弹出事件
      keyBoardShow = true
      setTimeout(function(){
        keyBoardShow = false
      }, 100)
    })

    // 解决安卓手机下点击输入框时，页面不随之向上滚动，导致弹起的软键盘遮住输入框的问题
    window.addEventListener("resize", function() {
      if(document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") {
        document.activeElement.scrollIntoViewIfNeeded()
      }
    })
  },
  computed: {},
  mounted() {},
  methods: {
    // 设置或保存页面的 scrolltop
    initPageScrollTop(to, from){
      // window.historyObj = {
      //   arr: [{path: 'home'}],
      //   preLen: 1
      // }

      let o = window.historyObj
      let len = o.arr.length      

      // 是否是回退
      let goBack = o.arr.length <= o.preLen

      if(from.path == '/') goBack = false

      // 将这个变量存入全局，后续可根据页面是前进还是后退来做出相关操作
      window.goBack = goBack

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
    },
  }
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
