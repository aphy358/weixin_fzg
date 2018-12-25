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
      v-model="checkedRoomTypes"
      :options="roomTypes">
    </mt-radio>
    <mt-checklist
      v-else
      align="right"
      v-model="checkedRoomTypes"
      :options="roomTypes">
    </mt-checklist>

  </mt-popup>
</template>

<script>

export default {
  name: 'roomTypePopup',
  data(){
    return {
      roomTypeVisible: false,

      checkedRoomTypes: '',
      roomTypes: [],
    }
  },
  props: ['mtype', 'visible', 'checkedTypes', 'types'],
  components: {},
  watch: {
    roomTypeVisible(){
      if(!this.roomTypeVisible){
        this.hidePopup()
      }else{
        this.checkedRoomTypes = this.checkedTypes
        this.roomTypes = this.types
      }
    },
    mtype(){
      if(this.mtype == 1){
        this.checkedRoomTypes = []
      }else{
        this.checkedRoomTypes = ''
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
      this.$emit('hidePopup')
    },
    selectRoomType(){
      this.hidePopup()
      this.$emit('checked', this.checkedRoomTypes)
    }
  }
}
</script>

<style lang="scss">
</style>