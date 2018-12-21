<template>
  <div class="eb-roomList-head">
    <div class="eb-roomList-head-inner">
      <span :class="{'active': titleType == 1}" @click="switchTitleType(1)">合约配额</span>
      <span :class="{'active': titleType == 2}" @click="switchTitleType(2)">outside</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'roomListHead',
  data(){
    return {
      titleType: 1,
    }
  },
  props: {},
  components: {},
  watch: {},
  created(){},
  activated(){},
  computed: {},
  mounted(){},
  methods:{
    // 切换配额类型
    switchTitleType(type){
      this.titleType = type
      this.$emit('switchType', type)
    }
  }
}
</script>

<style lang="scss">
.eb-roomList-head{
  padding: 0.1rem;
  background: white;

  .eb-roomList-head-inner{
    margin: auto;
    border-radius: 0.02rem;
    width: 1.6rem;
    overflow: hidden;

    span{
      float: left;
      width: 50%;
      text-align: center;
      line-height: 0.32rem;
      border: 0.01rem solid orange;
      color: orange;
      background: white;
      box-sizing: border-box;

      &.active{
        color: white;
        background: orange;
      }
    }
  }
}
</style>