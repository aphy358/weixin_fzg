<template>
  <div class="index-gap"></div>
</template>

<script>
// 页面分隔栏

export default {
  name: 'end'
}
</script>

<style lang="scss">
.index-gap {
  position: relative;
  height: 0.05rem;
  background-color: #efeff4;

  &:before,
  &:after {
    display: block;
    content: '';
    position: absolute;
    transform: scaleY(.5);
    border-bottom: 1px solid rgba(200, 199, 204, 0.2);
    transform-origin: 0 0;
    width: 100%;
    left: 0;
  }

  &:before{
    top: 0;
  }

  &:after{
    bottom: 0;
  }
}
</style>