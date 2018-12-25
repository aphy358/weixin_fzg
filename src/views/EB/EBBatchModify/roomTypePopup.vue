<template>
  <!-- 房型选择 popup -->
  <mt-popup
    class="rsp-popup-wrap"
    v-model="roomTypeVisible"
    position="bottom">

    <div class="rsp-toolbar">
      <button @click="hidePopup">取消</button>
      <button class="submit" @click="selectRoomType">确定</button>
    </div>

    <mt-radio
      v-if="mtype != 1"
      align="right"
      v-model="checkedRoomTypesArr"
      :options="roomTypesArr">
    </mt-radio>
    <mt-checklist
      v-else
      align="right"
      v-model="checkedRoomTypesArr"
      :options="roomTypesArr">
    </mt-checklist>

  </mt-popup>
</template>

<script>

export default {
  name: 'roomTypePopup',
  data(){
    return {
      roomTypeVisible: false,

      checkedRoomTypesArr: '',
      roomTypesArr: [],
    }
  },
  props: ['mtype', 'visible', 'checkedRoomTypes', 'roomTypes'],
  components: {},
  watch: {
    roomTypeVisible(){
      if(!this.roomTypeVisible){
        this.hidePopup()
      }else{
        this.checkedRoomTypesArr = this.checkedRoomTypes
        this.roomTypesArr = this.roomTypes
      }
    },
    mtype(){
      if(this.mtype == 1){
        this.checkedRoomTypesArr = []
      }else{
        this.checkedRoomTypesArr = ''
      }
    },
    visible(){
      this.roomTypeVisible = this.visible
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
      this.$emit('hideRoomTypePopup')
    },
    selectRoomType(){
      this.hidePopup()
      this.$emit('checked', this.checkedRoomTypesArr)
    }
  }
}
</script>

<style lang="scss">
</style>