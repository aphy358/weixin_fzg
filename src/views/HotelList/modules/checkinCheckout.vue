<template>
  <mt-popup
    v-model="getPopupVisible"
    >
    ...
  </mt-popup>
</template>

<script>

export default {
  name: 'checkinCheckout',
  data(){
    return {
    }
  },
  props: [],
  components: {
  },
  created(){
  },
  watch: {
  },
  computed: {
    getPopupVisible: {
      get: function () {
        return this.$store.state.hotelList.checkincheckoutPopupVisible
      },
      set: function (newValue) {
        this.$store.commit(`hotelList/setCommonState`, {k: 'checkincheckoutPopupVisible', v: newValue})
      }
    },
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style lang="scss">
</style>