<template>
  <mt-popup
    v-model="popupVisible"
    >
    ...
  </mt-popup>
</template>

<script>

export default {
  name: 'checkinCheckout',
  data(){
    return {
      popupVisible: true
    }
  },
  props: [],
  components: {
  },
  created(){
  },
  watch: {
    popupVisible(){
      if(!this.popupVisible){
        this.$emit('closePopup')
      }
    }
  },
  computed: {
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style lang="scss">
</style>