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
      v-model="checkedPriceTypesArr"
      :options="priceTypesArr">
    </mt-radio>
    <mt-checklist
      v-else
      align="right"
      v-model="checkedPriceTypesArr"
      :options="priceTypesArr">
    </mt-checklist>

  </mt-popup>
</template>

<script>

export default {
  name: 'priceTypePopup',
  data(){
    return {
      priceTypeVisible: false,

      checkedPriceTypesArr: '',
      priceTypesArr: [],
    }
  },
  props: ['mtype', 'visible', 'checkedPriceTypes', 'priceTypes'],
  components: {},
  watch: {
    priceTypeVisible(){
      if(!this.priceTypeVisible){
        this.hidePopup()
      }else{
        this.checkedPriceTypesArr = this.checkedPriceTypes
        this.priceTypesArr = this.priceTypes
      }
    },
    mtype(){
      if(this.mtype == 1){
        this.checkedPriceTypesArr = []
      }else{
        this.checkedPriceTypesArr = ''
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
      this.$emit('hidePriceTypePopup')
    },
    selectPriceType(){
      this.hidePopup()
      this.$emit('checked', this.checkedPriceTypesArr)
    }
  }
}
</script>

<style lang="scss">
</style>