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
              <input type="text" placeholder="公司编号" id="loginCompanyCode" name="loginCompanyCode">
            </div>
          </div>
          
          <div class="login-row">
            <div class="login-label">
              <span class="iconfont icon-user"></span>
            </div>
            <div class="login-item">
              <input type="text" placeholder="用户名" id="loginUserName" name="loginUserName">
            </div>
          </div>
          
          <div class="login-row">
            <div class="login-label">
              <span class="iconfont icon-key"></span>
            </div>
            <div class="login-item">
              <input type="password" placeholder="密码" id="loginPW" name="loginPW">
            </div>
          </div>
        </form>
      </div>

      <div class="login-bline">
        <div class="login-registry">快速注册</div>
        <div class="login-forget">忘记密码？</div>
      </div>

      <div class="login-btn-wrap">
        <button class="login-login">登录</button>
      </div>

    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/fzglogo.jpg'

export default {
  name: 'Login',
  data(){
    return {
      logo: ''
    }
  },
  props: {
  },
  components: {
  },
  created(){
    this.logo = logo
  },
  computed: {
  },
  mounted(){
  },
  methods:{
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