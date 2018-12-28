<template>
  <div>

    <!-- 房型、价格类型 -->
    <div class="rsp-popup-title">房型、价格类型</div>
    <div class="rsp-popup-block items-float line-after" @click="showPopup(1)">
      <div class="rsp-popup-label">房型</div>
      <input type="text" placeholder="请选择房型" :value="getRPTText(1)" readonly>
      <i class="iconfont icon-right-thin"></i>
    </div>
    <div class="rsp-popup-block items-float" @click="showPopup(2)">
      <div class="rsp-popup-label">价格类型</div>
      <input type="text" placeholder="请选择价格类型" :value="getRPTText(2)" readonly>
      <i class="iconfont icon-right-thin"></i>
    </div>

  </div>
</template>

<script>

export default {
  name: 'roomPriceType',
  data(){
    return {
    }
  },
  props: ['mtype', 'roomTypes', 'priceTypes', 'checkedRoomTypes', 'checkedPriceTypes'],
  components: {
  },
  watch: {},
  created(){},
  activated(){},
  computed: {},
  mounted(){},
  methods:{
    getRPTText(flag){
      if(this.mtype == 1){
        return flag == 1
          ? this.roomTypes.filter(n => this.checkedRoomTypes.includes(n.value)).map(n => n.label).join('，')
          : this.priceTypes.filter(n => this.checkedPriceTypes.includes(n.value)).map(n => n.label).join('，')
      }else{
        return flag == 1
          ? this.roomTypes.filter(n => this.checkedRoomTypes == n.value).map(n => n.label)
          : this.priceTypes.filter(n => this.checkedPriceTypes == n.value).map(n => n.label)
      }
    },
    // 显示 popup，1：房型   2：价格类型
    showPopup(flag){
      this.$emit('showPopup', flag)
    }
  }
}
</script>

<style lang="scss">
</style>