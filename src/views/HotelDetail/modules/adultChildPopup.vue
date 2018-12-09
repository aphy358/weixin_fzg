<template>
  <mt-popup
    v-model="getAdultChildPopupVisible"
    position="bottom">
  
    <OperationBtn @clear="clearAdultChild" @confirm="setAdultChild" />

    <div class="adult-child-select-wrap">
      
    </div>


  </mt-popup>
</template>

<script>
import OperationBtn from '@/components/OperationBtn.vue'

export default {
  name: 'adultChildPopup',
  data(){
    return {}
  },
  props: {},
  components: {
    OperationBtn
  },
  watch: {
    // 监视成人小孩弹出框的状态，弹出的时候初始化选择项
    getAdultChildPopupVisible(){
      if(this.getAdultChildPopupVisible){

      }
    }
  },
  created(){},
  computed: {
    getAdultChildPopupVisible: {
      get: function () {
        return this.$store.state.hotelDetail.adultChildPopupVisible
      },
      set: function (newValue) {
        this.$store.commit(`hotelDetail/setCommonState`, {k: 'adultChildPopupVisible', v: newValue})
      }
    },
  },
  mounted(){},
  methods:{
    // 设置成人小孩
    setAdultChild(){
      this.$store.commit(`hotelDetail/setCommonState`, {k: 'adultChildPopupVisible', v: false})
    },
    // 清空成人小孩
    clearAdultChild(){

    }
  }
}
</script>

<style lang="scss">
</style>