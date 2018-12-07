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

  &:before{
    top: 0;
  }

  &:after{
    bottom: 0;
  }
}
</style>