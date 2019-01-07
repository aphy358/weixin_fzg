<template>
  <div class="page eb-index-page">

    <!-- 头部 -->
    <mt-header title="eb菜单页">
      <mt-button class="iconfont icon-user" slot="right" style="font-size: 0.22rem;" @click="unBind"></mt-button>
    </mt-header>
    
    <div class="page-content" style="background-color: #efeff4;">

      <ul class="eb-index-menu-list">

        <li class="eb-index-menu-item" v-if="permissionOrderList" @click="gotoEBOrderList">
          <div class="img-wrap">
            <img src="http://image.jladmin.cn/real_1525936333292.png" />
          </div>
          <span>订单管理</span>
          <i class="iconfont icon-right-thin"></i>
        </li>

        <li class="eb-index-menu-item" v-if="permissionRoomStatus" @click="goEBHotelList(1)">
          <div class="img-wrap">
            <img src="http://image.jladmin.cn/real_1525936409017.png" />
          </div>
          <span>房态管理</span>
          <i class="iconfont icon-right-thin"></i>
        </li>

        <li class="eb-index-menu-item" v-if="permissionRoomPrice" @click="goEBHotelList(2)">
          <div class="img-wrap">
            <img src="http://image.jladmin.cn/real_1525936297423.png" />
          </div>
          <span>房价管理</span>
          <i class="iconfont icon-right-thin"></i>
        </li>
      </ul>


      <section class="ebRoomStatusManagement-index-bottom">
				<a href="tel:0755-33397777">
          <div class="inner">
            <img src="http://image.jladmin.cn/real_1525924584362.png" style="width: 0.22rem;" />
            <span style="color: #999999;margin: 0 5px;">客服电话:</span>
            <span style="color: #999999;">0755-33397777</span>
          </div>
        </a>
			</section>
      
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import { gotoPage, replacePage } from '@/assets/util'

export default {
  name: 'eb-index',
  data(){
    return {
      permissionOrderList: false,
      permissionRoomStatus: false,
      permissionRoomPrice: false,
    }
  },
  props: {},
  components: {},
  watch: {},
  created(){},
  activated(){
    if(!window.goBack){
      this.initCurrency()
    }
  },
  computed: {},
  mounted(){},
  methods:{
    // 解除绑定
    unBind(){
      MessageBox.confirm('是否解绑当前账号？').then(action => {
        this.$api.eb.syncEBUnBind({}).then(res => {
          if(res.returnCode === 1){
            // 跳转到微信 eb 登录页
            replacePage(this.$router, 'ebLogin')
          }
        })
      });
    },
    // 初始化币种、获取供应商权限
    initCurrency(){
      this.$api.eb.syncSupplierInfo({}).then(res => {
        console.log(res);
        
        if(res.returnCode === 1){

          // 设置供应商币种
          if(res.data){
            if(res.data.supplierAccount){
              this.$store.commit(`eb/setCommonState`, {k: 'supplierCurrency', v: res.data.supplierAccount.currency})
            }

            if(res.data.supplier){
              // 1: 订单管理、2: 财务管理、3: 关房（房态管理）、4.5: 房价管理、6、批量管理、7: 我的工作台
              var permission = res.data.supplier.supplierPermission;

              if(permission.indexOf('1') != -1){ this.permissionOrderList = true }
              if(permission.indexOf('3') != -1){ this.permissionRoomStatus = true }
              if(permission.indexOf('4') != -1){ this.permissionRoomPrice = true }
            }
          }
        }
      })
    },
    // 跳转到 eb 订单列表页
    gotoEBOrderList(){
      gotoPage(this.$router, 'ebOrderList')
    },
    // 跳转到 eb 酒店列表页，flag： 1：房态管理   2：房价管理
    goEBHotelList(flag){
      gotoPage(this.$router, 'ebHotelList', {mtype: flag})
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


.ebRoomStatusManagement-index-bottom{
  position: fixed;
  bottom: 0;
  width: 100%;
	height: 0.44rem;
	line-height: 0.44rem;
	font-size: 0.16rem;
	text-align: center;
}

.ebRoomStatusManagement-index-bottom:before{
	content: '';
  transform-origin: 50% 100%;
  border-bottom: 0.01rem solid rgba(200, 199, 204, 0.65);
  width: 100%;
  height: 0;
  transform: scaleY(0.5);
  position: absolute;
  left: 0;
  top: 0;
}

.ebRoomStatusManagement-index-bottom .inner{
  width: 2.25rem;
  overflow: hidden;
  margin: auto;
}

.ebRoomStatusManagement-index-bottom .inner img{
  margin-top: 0.11rem;
}

.ebRoomStatusManagement-index-bottom .inner > *{
	float: left;
}


.eoli-mycenter {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 0.08rem;
  text-align: center;
  z-index: 4000;
  height: 0.44rem;
  line-height: 0.45rem;
}
</style>