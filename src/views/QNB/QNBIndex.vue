<template>
  <div class="page qnb-index-page">

    <!-- 头部 -->
    <mt-header title="qnb 小工具菜单页">
      <mt-button class="iconfont icon-user" slot="right" style="font-size: 0.22rem;" @click="unBind"></mt-button>
    </mt-header>
    
    <div class="page-content" style="background-color: #efeff4;">

      <div style="line-height: 0.4rem;background: white;padding: 0 0.15rem;">
        <span>当前用户：</span>
        <span>{{ user.usercd + '(' + user.realname + ')' }}</span>
      </div>

      <ul class="eb-index-menu-list">

        <li class="eb-index-menu-item" @click="gotoQNBMyConcernList">
          <div class="img-wrap">
            <img src="http://image.jladmin.cn/real_1525936333292.png" />
          </div>
          <span>我的关注</span>
          <i class="iconfont icon-right-thin"></i>
        </li>

        <li class="eb-index-menu-item" @click="gotoSupplierListPage(1)">
          <div class="img-wrap">
            <img src="http://image.jladmin.cn/real_1525936409017.png" />
          </div>
          <span>房态管理</span>
          <i class="iconfont icon-right-thin"></i>
        </li>

        <!-- <li class="eb-index-menu-item" @click="gotoSupplierListPage(2)">
          <div class="img-wrap">
            <img src="http://image.jladmin.cn/real_1525936297423.png" />
          </div>
          <span>房价管理</span>
          <i class="iconfont icon-right-thin"></i>
        </li> -->
      </ul>
      
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import { gotoPage, replacePage } from '@/assets/util'

export default {
  name: 'QNBIndex',
  data(){
    return {
      user: {},
    }
  },
  props: {},
  components: {},
  watch: {},
  created(){
    this.getCurUser()
  },
  computed: {},
  mounted(){},
  methods:{
    // 解除绑定
    unBind(){
      MessageBox.confirm('是否解绑当前账号？').then(action => {
        this.$api.qnb.syncQNBUnBind({}).then(res => {
          if(res.returnCode === 1){
            // 跳转到微信 qnb 登录页
            replacePage(this.$router, 'qnblogin')
          }
        })
      });
    },
    // 获取当前用户
    getCurUser(){
      this.$api.qnb.syncQNBGetCurUser({}).then(res => {
        if(res.returnCode === 1){
          this.user = res.data
        }
      })
    },
    // 跳转到 qnb 订单列表页
    gotoQNBMyConcernList(){
      gotoPage(this.$router, 'qnbMyConcernList')
    },
    // 跳转到 qnb 供应商列表页，flag： 1：房态管理   2：房价管理
    gotoSupplierListPage(flag){
      gotoPage(this.$router, 'qnbSupplierList', {pageType: 2, mtype: 1})
    }
  }
}
</script>

<style lang="scss">
.eb-index-menu-list{

  @at-root .eb-index-menu-item{
    margin: 0.2rem 0;
    background: white;
    font-size: 0.16rem;
    padding: 0 0.15rem;
    line-height: 0.5rem;
    overflow: hidden;

    .img-wrap{
      float: left;
      width: 0.4rem;

      img{
        height: 0.2rem;
        margin-top: 0.15rem;
      }
    }

    .iconfont{
      float: right;
      color: #ccc;
      font-size: 0.12rem;
    }

  }

}

</style>