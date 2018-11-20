<template>
  <div class="end-div">
    <div class="end-div-i"></div>
    <span class="end-span">END</span>
    <div class="end-div-i"></div>
  </div>
</template>

<script>
export default {
  name: 'end'
}
</script>

<style lang="scss">
/* 页面底部 END 标识的样式 */
.end-span{margin: 0 0.1rem;color: #999;}
.end-div{text-align: center;font-size: 0.14rem;padding: 0.10rem;background: #efeff4;}
.end-div-i{width: calc(50% - 0.30rem);display: inline-block;position: relative;top: -0.04rem;}
.end-div-i::after{
  display: block;
  content: '';
  width: 100%; 
  border-bottom: 1px solid #c8c7cc;
  transform: scaleY(.5);
  transform-origin: 50% 100%;
}
</style>