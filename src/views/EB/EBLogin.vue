<template>
  <div class="page login-page">
    <div class="page-content">

      <div class="logo-wrap">
        <img :src="logo" alt="jl_logo">
        <p class="supplier-note">请使用捷旅供应商账号登录</p>
      </div>
      
      <div class="login-wrap">
        <form id="loginForm" novalidate="novalidate">
          <div class="login-row" id="company-login-row">
            <div class="login-label">
              <span class="iconfont icon-baofang"></span>
            </div>
            <div class="login-item">
              <input type="text" placeholder="供应商编号" v-validate={required:true} v-model="supplierCode" name="供应商编号" :class="{'error': errors.has('供应商编号')}" />
            </div>
          </div>
          
          <div class="login-row">
            <div class="login-label">
              <span class="iconfont icon-user"></span>
            </div>
            <div class="login-item">
              <input type="text" placeholder="用户名" v-validate="'required'" v-model="userName" name="用户名" :class="{'error': errors.has('用户名')}" />
            </div>
          </div>
          
          <div class="login-row">
            <div class="login-label">
              <span class="iconfont icon-key"></span>
            </div>
            <div class="login-item">
              <input type="password" placeholder="密码" v-validate="'required'" v-model="passWord" name="密码" :class="{'error': errors.has('密码')}" />
            </div>
          </div>
        </form>
      </div>

      <div class="login-bline">
        <div class="login-registry" @click="applyForSupplier">供应商申请加入</div>
        <!-- <div class="login-forget">忘记密码？</div> -->
      </div>

      <div class="login-btn-wrap">
        <button class="login-login" @click="ebLogin">登录</button>
      </div>

    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/fzglogo.jpg'
import { Toast } from 'mint-ui';
import { gotoPage, replacePage } from '@/assets/util'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

export default {
  name: 'EBLogin',
  data(){
    return {
      logo: '',
      supplierCode: '',
      userName: '',
      passWord: '',
    }
  },
  props: {
  },
  components: {
  },
  created(){

    //*** 模拟登录，测试 */
    let params = {
      code: '8998',
      distrbCode: 'MZ140111',
      name: 'HJM1',
      password: '1'
    }
    this.$api.eb.syncEBLoginForTest(params).then(res => {
      console.log(res);
    })


    this.logo = logo
    this.configValidation()
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    // 点击 '供应商申请加入'
    applyForSupplier(){
      window.location.href = 'tel://' + "0755-33397777";
    },
    // 点击 '登录'
    ebLogin(){
      let _this = this
      this.$validator.validateAll().then(res => {
        if(!res){
          Toast({
            message: _this.errors.all()[0],
            duration: 1000
          });

          setTimeout(() => {
            _this.$validator.reset()
          }, 1000)
        }else{
          // 通过验证，继续登录
          let param = {
            from: 'wx',
            distrbCode: this.supplierCode,
            name: this.userName,
            password: this.passWord,
          }

          this.$api.eb.syncEBLogin(param).then(res => {
            if(res.returnCode === 1){
              // TO DO 跳转到微信 eb 首页
              replacePage(this.$router, 'ebIndex')
            }
          })
        }
      })
    },
    // 配置验证信息
    configValidation(){
      //错误提示
      const dictionary = {
        en: {
          messages: {
            required: field => '请输入' + field,
          }
        },
      };

      this.$validator.localize(dictionary);
    }
  }
}
</script>

<style lang="scss">
.login-page{
  padding-top: 0.45rem;

  .logo-wrap{

    img{
      display: block;
      width: 1.2rem;
      margin: auto;
    }

    .supplier-note{
      color: red;
      margin: 0.2rem 0;
      text-align: center;
    }
  }

  @at-root .login-wrap{
    margin: 0 0.2rem;

    @at-root .login-row {
      position: relative;
      margin: 0.30rem 0;
      line-height: 0.40rem;

      &:after{
        display: block;
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        border-bottom: 0.01rem solid #EFEEEC;
        transform-origin: 50% 100%;
        transform: scaleY(.5);
      }

      @at-root .login-label {
        text-align: center;
        float: left;
        width: 0.25rem;

        .iconfont {
          color: orange;
          font-size: 0.2rem;
        }
      }

      @at-root .login-item {
        display: inline-block;
        width: calc(100% - 0.25rem);
        vertical-align: middle;

        input {
          font-size: 0.14rem;
          width: calc(100% - 0.1rem);
          border: none;
          padding: 0 0.05rem;
          line-height: 0.2rem;
          height: 0.4rem;

          &.error{
            // background: rgba(249, 36, 36, 0.5);
          }
        }
      }
    }
  }

  @at-root .login-bline{
    height: 0.4rem;
    margin: 0 0.2rem;
    margin-top: -0.15rem;
    font-size: 0.12rem;

    @at-root .login-registry{
      float: left;
      color: #f16725;
      padding: 0.02rem;
      border-radius: 0.02rem;
    }

    @at-root .login-forget{
      float: right;
      padding: 0.02rem;
      border-radius: 0.02rem;
    }
  }

  @at-root .login-btn-wrap{
    margin: 0.1rem 0.2rem;

    @at-root .login-login{
      font-size: 0.16rem;
      background-color: #ff7625;
      width: 100%;
      border: none;
      line-height: 0.4rem;
      text-align: center;
      letter-spacing: 0.1rem;
      padding-left: 0.1rem;
      color: white;
      border-radius: 0.03rem;
    }
  }

}
</style>