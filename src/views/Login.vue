<template>
  <div class="page login-page">
    <div class="page-content">

      <div class="logo-wrap">
        <img :src="logo" alt="jl_logo">
      </div>
      
      <div class="login-wrap">
        <form id="loginForm" novalidate="novalidate">
          <div class="login-row" id="company-login-row">
            <div class="login-label">
              <span class="iconfont icon-baofang"></span>
            </div>
            <div class="login-item">
              <input type="text" placeholder="公司编号" v-validate={required:true} v-model="companyCode" name="公司编号" :class="{'error': errors.has('公司编号')}" />
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
        <div class="login-registry" @click="goRegister">快速注册</div>
        <!-- <div class="login-forget">忘记密码？</div> -->
      </div>

      <div class="login-btn-wrap">
        <button class="login-login" @click="login">登录</button>
      </div>

    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/fzglogo.jpg'
import { Toast } from 'mint-ui';
import { gotoPage, goBackPage } from '@/assets/util'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

export default {
  name: 'Login',
  data(){
    return {
      logo: '',
      companyCode: '',
      userName: '',
      passWord: '',
    }
  },
  props: {
  },
  components: {
  },
  created(){
    this.logo = logo
    this.configValidation()
  },
  computed: {
  },
  mounted(){
  },
  methods:{
    // 点击 '登录'
    login(){
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
            distrbCode: this.companyCode,
            name: this.userName,
            password: this.passWord,
          }

          this.$api.common.syncLogin(param).then(res => {
            if(res.returnCode === 1){
              Toast('登录成功！')
              window.sessionStorage.setItem('user_wx', JSON.stringify(res.data.customerUser))
              goBackPage(this.$router)
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
    },
    goRegister(){
      gotoPage(this.$router, 'register');
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