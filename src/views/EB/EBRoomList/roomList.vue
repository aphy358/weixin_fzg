<template>
  <div class="eb-room-list-wrap">

    <ul class="eb-room-list">
      <li class="eb-room-item" v-for="(n, i) in roomList" :key="i">
        
      </li>
    </ul>
    
  </div>
</template>

<script>

export default {
  name: 'roomList',
  data(){
    return {}
  },
  props: ['roomList'],
  components: {},
  watch: {},
  created(){},
  activated(){},
  computed: {},
  mounted(){},
  methods:{}
}
</script>

<style lang="scss">
.eb-room-list-wrap{

  .eb-room-list{

    .eb-room-item{

    }
  }
}
</style>