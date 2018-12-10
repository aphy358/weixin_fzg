<template>
  <div class="">
    <Loading />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'

export default {
  name: 'hotelPriceList',
  data(){
    return {}
  },
  props: {},
  components: {
    Loading,
  },
  watch: {},
  created(){
    this.queryHotelPrice()
  },
  computed: {},
  mounted(){},
  methods:{
    queryHotelPrice(){
      
    }
  }
}
</script>

<style lang="scss">
</style>