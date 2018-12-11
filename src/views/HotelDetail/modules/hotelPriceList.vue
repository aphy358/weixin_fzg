<template>
  <div class="">
    <Loading />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import { queryString } from '@/assets/util'

export default {
  name: 'hotelPriceList',
  data(){
    return {
      hotelId: null,
    }
  },
  props: {},
  components: {
    Loading,
  },
  watch: {},
  created(){
    this.initQueryString()
    this.queryHotelPrice()
  },
  computed: {
    getCheckin(){
      return this.$store.state.checkin
    },
    getCheckout(){
      return this.$store.state.checkout
    },
  },
  mounted(){},
  methods:{
    // 处理 queryString 带过来的参数
    initQueryString(){
      this.hotelId = queryString('hotelId')
      let cityType = queryString('cityType')

      if(cityType != this.$store.state.cityType){ // 如果 queryString 上传过来的 cityType 和 store 里存的 cityType 不相等，则说明这种情况不是从酒店列表页点击进的酒店详情页
        this.$store.commit(`setCityType`, cityType)
      }
    },
    queryHotelPrice(){
      let param = {
        startDate: this.getCheckin,
        endDate: this.getCheckout,
        hotelId: this.hotelId,
        roomNum: 1,
        adultNum: 2,
        childrenNum: 0,
        childrenAgesStr: ''
      }

console.log(param);

      this.$api.hotelDetail.syncGetHotelPriceList(param).then(res => {
        if(res.returnCode === 1){
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>