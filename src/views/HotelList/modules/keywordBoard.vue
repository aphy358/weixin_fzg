<template>
  <div class="page keywordBoard-page">
    <div class="nav-top">
      <div class="KWI_wrap">
        
        <!-- 返回上一页 -->
        <GoBack :onClick="clickGoBack" />
        
        <i class="iconfont icon-search0 searchIcon"></i>
        <i class="iconfont icon-shanchu kw_del" v-if="keywords != ''" @click="clearKeyword"></i>
        <input ref="keywordInput" type="text" class="keyw-input" placeholder="酒店名/地名" v-model="keywords" @keyup="inputKeyword" @input="inputKeyword" />

        <div class="kw-cancel" @click="hideKeywordBoard">取消</div>
      </div>
     
    </div>

    <div class="page-content">

      <div class="result-list-wrap">
        <div v-show="keywords != ''">
          <div style="line-height: 0.4rem;">
            <div class="kw-r-icon">
              <span class="iconfont icon-search0" style="color: #099FDE;"></span>
            </div>
            <div class="kw-r-content">
              <span style="margin-right: 0.1rem;float: left;">搜索</span>
              <span style="float: left;color: #ff7625;width: calc(100% - 0.4rem);" class="ellips search-text">{{ keywords }}</span>
            </div>
          </div>
        </div>

        <div v-show="resultList.length > 0">
          <ul>
            <li v-for="n in resultList" :key="n.i">
              <div class="kw-r-row">
                <div class="kw-r-icon">
                  <span class="iconfont icon-baofang"></span>
                </div>
                <div class="kw-r-content">
                  <span v-html="n.html"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
// 城市选择 顶部关键字输入区域
import GoBack from '@/components/GoBack.vue'
import { debounce } from 'lodash'

export default {
  name: 'keywordBoard',
  data(){
    return {
      keywords: '',
      resultList: [],
    }
  },
  props: ['showBoard'],
  watch: {
    showBoard(){
      if(this.showBoard){
        this.$refs.keywordInput.focus()
      }
    }
  },
  components: {
    GoBack
  },
  created(){
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    inputKeyword: debounce(function(){
      this.keywords = this.keywords.replace(/^\s+|\s+$/g, '')

      if(this.keywords == ''){
        this.resultList = []
      }else{
        let param = {'cityId': this.$store.state.cityId, 'k': this.keywords}
  
        this.$api.hotelList.syncGetHotels(param).then(res => {
          if(res.returnCode === 1){
            this.resultList = res.dataList || []
            let v = this.keywords
  
            this.resultList.forEach(element => {
              element.html = element.n.replace(eval('/' + v + '/g'), '<span class="kw-hlight">' + v + '</span>')
            });
          }
        })
      }
    }, 300),
    hideKeywordBoard(){
      this.keywords = ''
      this.resultList = []
      this.$emit('hideKeywordBoard')
    },
    clearKeyword(){
      this.keywords = ''
      this.resultList = []
    },
    clickGoBack(){
      this.hideKeywordBoard()
    }
  }
}
</script>

<style scoped lang="scss">
.nav-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ff7625;
  color: white;
  z-index: 1000;

  .KWI_wrap {
    margin: 0.1rem 0.20rem 0.10rem 0.40rem;

    .searchIcon{
      position: absolute;
      color: #c1c1c1;
      top: 0.17rem;
      left: 0.47rem;
    }

    .kw_del{
      position: fixed;
      color: #c1c1c1;
      height: 0.34rem;
      line-height: 0.36rem;
      width: 0.30rem;
      top: 0.09rem;
      right: 0.55rem;
      text-align: center;
      padding-top: 0.02rem;
    }

    .keyw-input {
      border: 0;
      border-radius: 0.02rem;
      height: 0.36rem;
      font-size: 0.14rem;
      padding: 0 0.30rem;
      width: calc(100% - 0.95rem);
    }

    .kw-cancel {
      position: fixed;
      font-size: 0.15rem;
      top: 0.1rem;
      right: 0.1rem;
      height: 0.36rem;
      line-height: 0.36rem;
      width: 0.36rem;
      text-align: center;
    }
  }
}

</style>

<style lang="scss">
.result-list-wrap{
  font-size: 0.14rem;
  margin-top: 0.56rem;  

  @at-root .kw-r-row {
    position: relative;
    line-height: 0.4rem;

    &:before {
      content: '';
      position: absolute;
      border-bottom: 0.01rem solid rgba(128, 128, 128, 0.32);
      transform: scaleY(.5);
      transform-origin: 50% 100%;
      width: 100%;
      left: 0;
      top: 0;
    }

    @at-root .kw-r-icon {
      float: left;
      height: 0.4rem;
      width: 0.3rem;
      text-align: right;
      margin-right: 0.1rem;

      .iconfont {
        color: #ff7625;
      }
    }

    @at-root .kw-r-content {
      vertical-align: middle;
      line-height: 0.16rem;
      display: inline-block;
      width: calc(100% - 0.4rem);

      .ellips {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      @at-root .kw-hlight {
        color: #ff7625;
      }
    }
  }
}

</style>
