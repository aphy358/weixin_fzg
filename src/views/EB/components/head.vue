<template>
  <div class="eb-roomList-head">
    <div class="eb-roomList-head-inner">
      <span :class="{'active': formulaType == 1}" @click="switchFormulaType(1)">合约配额</span>
      <span :class="{'active': formulaType == 2}" @click="switchFormulaType(2)">outside</span>
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