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
      // 设置或保存页面的 scrolltop
      this.initPageScrollTop(to, from)
      
      // 初始化页面分享
      if(to.path.toLowerCase() != '/hoteldetail'){
        this.initPageShare()
      }
    }
  },
  components: {},
  created() {
    // 初始化 JSSDK
    this.initJSSDK()

    // 解决部分 iphone 换页的时候，软键盘导致页面向上顶起而不收回的 bug
    document.body.addEventListener('focusout', () => { //软键盘关闭事件
      setTimeout(function(){
        window.scroll(0, 0)
      }, 10)
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
    // 初始化页面分享事件
    initPageShare(){
      wx.updateAppMessageShareData({
        title: '房掌柜',  // 分享标题
        desc: '房掌柜',   // 分享描述
        link: location.href.split('#')[0],    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1540195277203.png',   // 分享图标
        success: function () {},
        fail: function (res) {}
      });

      wx.updateTimelineShareData({
        title: '房掌柜',  // 分享标题
        link: location.href.split('#')[0],    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://qnb.oss-cn-shenzhen.aliyuncs.com/real_1540195277203.png',   // 分享图标
        success: function () {},
        fail: function (res) {}
      });
    },
    // 初始化 JSSDK
    initJSSDK(){
      this.$api.common.syncInitJSSDK({url: encodeURIComponent(location.href.split('#')[0])}).then(res => {
        if(res.returnCode == 1){
          let data = res.data

          wx.config({
            debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId : data.appId, // 必填，公众号的唯一标识
            timestamp : data.timestamp, // 必填，生成签名的时间戳
            nonceStr : data.nonceStr, // 必填，生成签名的随机串
            signature : data.signature,// 必填，签名，见附录1
            jsApiList : [
              'updateAppMessageShareData', 
              'updateTimelineShareData', 
              'openLocation', 
              'getLocation',
              'chooseWXPay'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      })

      let _this = this
      wx.ready(function(){
        _this.$store.commit('setCommonState', {k: 'wx_ready', v: true})
      });
    }
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
