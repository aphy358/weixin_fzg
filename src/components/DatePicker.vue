<template>
  <mt-datetime-picker
    v-model="datePicked"
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
      datePicked: '',
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
      this.datePicked = this.dateBind
    }
  },
  components: {
  },
  created(){
    this.datePicked = this.dateBind
  },
  computed: {
  },
  mounted(){
    if(this.open){
      this.$refs.picker.open()
    }
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