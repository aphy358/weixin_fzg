<template>
  <div class="qnb-roomList-head">
    <div class="qnb-roomList-head-inner">
      <span :class="{'active': formulaType == 1}" @click="switchFormulaType(1)">合约配额</span>
      <span :class="{'active': formulaType == 2}" @click="switchFormulaType(2)" style="margin: 0 -0.01rem;">outside</span>
      <span :class="{'active': formulaType == 0}" @click="switchFormulaType(0)">包房</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'roomListHead',
  data(){
    return {
    }
  },
  props: ['formulaType'],
  components: {},
  watch: {},
  created(){},
  activated(){},
  computed: {},
  mounted(){},
  methods:{
    // 切换配额类型
    switchFormulaType(type){
      this.$emit('switchFormulaType', type)
    }
  }
}
</script>

<style lang="scss">
.qnb-roomList-head{
  padding: 0.1rem;
  background: white;

  @at-root .qnb-roomList-head-inner{
    margin: auto;
    border-radius: 0.02rem;
    width: 2rem;
    overflow: hidden;

    span{
      float: left;
      width: 33.33%;
      text-align: center;
      line-height: 0.32rem;
      border: 0.01rem solid rgba(255, 118, 37, 0.8);;
      color: rgba(255, 118, 37, 0.8);;
      background: white;
      box-sizing: border-box;

      &.active{
        color: white;
        background: rgba(255, 118, 37, 0.8);;
      }
    }
  }
}
</style>