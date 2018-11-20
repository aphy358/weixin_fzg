<template>
  <mt-datetime-picker
    v-model="pickerVisible"
    type="date"
    ref="picker"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    @confirm="handleConfirm"
    :startDate="startDate"
    :endDate="endDate"
  >
  </mt-datetime-picker>
</template>

<script>
// 日期选择组件

export default {
  name: 'datePicker',
  data(){
    return {
      pickerVisible: '',
      dateTime: '',
    }
  },
  props: ['open', 'dateBind', 'startDate', 'endDate'],
  watch: {
    open(){
      if(this.open){
        this.$refs.picker.open()
      }
    },
    dateBind(){
      this.pickerVisible = this.dateBind
    }
  },
  components: {
  },
  created(){
    this.pickerVisible = this.dateBind
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    handleConfirm (data) {
      this.$emit('confirm', data)
    }
  }
}
</script>

<style lang="scss">
</style>