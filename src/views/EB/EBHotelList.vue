<template>
  <div class="page">

    <!-- 头部 -->
    <mt-header title="选择酒店"></mt-header>

    <!-- 返回上一页 -->
    <GoBack _style="top: 0.02rem" />

    <div class="eb-hotel-list-keyword-wrap">
      <i class="iconfont icon-search0 searchIcon"></i>
      <input placeholder="请输入酒店名称" class="eb-hotel-list-keyword-input" v-model="keyWord" @keyup="queryHotelList" @input="queryHotelList" />
      <i class="iconfont icon-shanchu eb-hotelList-keyword-del" v-show="keyWord" @click="clearKeyWord"></i>
    </div>

    <div class="page-content" style="background-color: #efeff4;">
      
      <ul class="eb-hotel-list" v-if="hotelList.length > 0">
				<li class="eb-hotel-item line-after" v-for="(n, i) in hotelList" :key="i" @click="gotoRoomListPage(n)">
					<p class="eb-hotel-item-hname">{{ (i + 1) + '、' + n.infoName }}</p>
					<p class="eb-hotel-item-addr">
            <i class="iconfont icon-weizhi"></i>
						<span>{{ n.address }}</span>
					</p>
          <i class="iconfont icon-right-thin"></i>
				</li>
			</ul>

      <Loading v-if="loading" />

      <div style="text-align: center;color: red;margin: 0.2rem 0;" v-if="!loading && hotelList.length < 1">无相关酒店</div>

    </div>

    <ToTop />
    
  </div>
</template>

<script>
import GoBack from '@/components/GoBack.vue'
import ToTop from '@/components/ToTop.vue'
import Loading from '@/components/Loading.vue'
import { gotoPage, queryString } from '@/assets/util'
import { Toast } from 'mint-ui'
import { debounce } from 'lodash'


export default {
  name: 'EBHotelList',
  data(){
    return {
      keyWord: '',
      hotelList: [],
      loading: false,
    }
  },
  props: {},
  components: {
    GoBack,
    ToTop,
    Loading
  },
  watch: {},
  created(){},
  activated(){
    if(!window.goBack){
      this.queryHotelListFunc()
    }
  },
  computed: {},
  mounted(){},
  methods:{
    // 清除关键字
    clearKeyWord(){
      this.keyWord = ''
      this.queryHotelList()
    },
    // 查询酒店列表
    queryHotelList: debounce(function(){
      this.queryHotelListFunc()
    }, 290),
    queryHotelListFunc: debounce(function(){
      if(this.loading)  return
      this.loading = true
      this.hotelList = []

      this.$api.eb.syncEBQueryHotelList({currPage: 1, key: this.keyWord}).then(res => {
        this.loading = false

        if(res.returnCode === 1){
          this.hotelList = res.dataList
        }
      })
    }, 10),
    // 跳转到房型列表页
    gotoRoomListPage(hotel){
      gotoPage(this.$router, 'ebRoomList', {hotelId: hotel.infoId, hname: encodeURIComponent(hotel.infoName), mtype: queryString('mtype')})
    },
  }
}
</script>

<style lang="scss">

.eb-hotel-list-keyword-wrap{
	position: relative;
  margin: 0.1rem 0.15rem;
  border-radius: 0.16rem;
  background: #E5ECF8;
  overflow: hidden;
}

.searchIcon{
    position: absolute;
    color: #ccc;
    top: 0.05rem;
    left: 0.08rem;
}

.eb-hotel-list-keyword-input{
	  border: none;
    height: 0.32rem;
    background: transparent;
    width: calc(100% - 0.6rem);
    margin-left: 0.3rem;
}

.eb-hotelList-keyword-del{
    color: #ccc;
    width: 0.3rem;
    line-height: 0.32rem;
    position: absolute;
    text-align: center;
    top: 0;
    right: 0;
}

.eb-hotel-list{
    margin: 0.1rem 0;
    background: white;
    margin-bottom: 1.5rem;
}

.eb-hotel-item{
  position: relative;
  padding: 0.1rem 0;
  overflow: hidden;

  .icon-right-thin{
    position: absolute;
    font-size: 0.12rem;
    right: 0.1rem;
    top: 0.24rem;
    color: #ccc;
  }
}

.eb-hotel-item-hname{
    padding: 0 0.15rem;
    font-size: 0.16rem;
}

.eb-hotel-item-addr{
  padding: 0 0.15rem 0 0.38rem;
  color: #999;
  height: 0.2rem;
  line-height: 0.2rem;
  font-size: 0.12rem;
  overflow: hidden;

  .iconfont{
    font-size: 0.14rem;
    color: #759fec;
  }
}


</style>