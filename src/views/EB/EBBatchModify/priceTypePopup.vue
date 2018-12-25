<template>
  <!-- 价格类型选择 popup -->
  <mt-popup
    class="rsp-popup-wrap"
    v-model="priceTypeVisible"
    position="bottom">

    <div class="rsp-toolbar">
      <button @click="hidePopup">取消</button>
      <button class="submit" @click="selectPriceType">确定</button>
    </div>

    <mt-radio
      v-if="mtype != 1"
      align="right"
      v-model="checkedPriceTypes"
      :options="priceTypes">
    </mt-radio>
    <mt-checklist
      v-else
      align="right"
      v-model="checkedPriceTypes"
      :options="priceTypes">
    </mt-checklist>

  </mt-popup>
</template>

<script>

export default {
  name: 'priceTypePopup',
  data(){
    return {
      priceTypeVisible: false,

      checkedPriceTypes: '',
      priceTypes: [],
    }
  },
  props: ['mtype', 'visible', 'checkedTypes', 'types'],
  components: {},
  watch: {
    priceTypeVisible(){
      if(!this.priceTypeVisible){
        this.hidePopup()
      }else{
        this.checkedPriceTypes = this.checkedTypes
        this.priceTypes = this.types
      }
    },
    mtype(){
      if(this.mtype == 1){
        this.checkedPriceTypes = []
      }else{
        this.checkedPriceTypes = ''
      }
    },
    visible(){
      this.priceTypeVisible = this.visible
    },
  },
  created(){
  },
  activated(){
  },
  computed: {},
  mounted(){},
  methods:{
    hidePopup(){
      this.$emit('hidePopup')
    },
    selectPriceType(){
      this.hidePopup()
      this.$emit('checked', this.checkedPriceTypes)
    }
  }
}
</script>

<style lang="scss">
</style>