
import Vue from "vue"
import axios from "axios"
import qs from 'qs'

// https://github.com/rstacruz/nprogress
import { Indicator } from 'mint-ui'

const printErrorInfo = info => {
  alert(info)
};

// https://github.com/mzabriskie/axios
const http = axios.create({
  timeout: 1000 * 20,
  headers: { "X-Requested-With": "XMLHttpRequest"}
  // headers: { "Content-type": "application/x-www-form-urlencoded"}
});

function _h(verb) {
  return function (restPath, params, loading, last) {
    // error 如果不为空(null) 表示网络出错 data表示服务端返回的数据
    let result = {
      error: null,
      data: {}
    };

    let _restPath = restPath;
    let _params = params || {};
    let _loginurl = '/'
    let token = localStorage.user ? window.JSON.parse(localStorage.user).token : ''


    //*** 验证用户登录态... 
    http.defaults.headers['X-Authorization'] = "user_token-" + token
  
    if (verb === 'get'){
      _params = {
        params : params
      }
    }else{
      // 用 qs 插件将参数由 json 格式转为字符串参数格式，如 'type=2&key=深圳'
      _params = qs.stringify(params)
    }
    
    // setting loading
    if (loading !== false) {
      loading = Indicator
      loading.open();
    }

    return http[verb](_restPath, _params)
      .then(response => {
        // close loading
        loading && loading.close();

        // api拦截
        if (response.data && (
          response.data.returnCode == -400013 || response.data.returnCode == -400014
        )) {
          localStorage.removeItem('user')

          if (Vue.$router && Vue.$router.push) {
            Vue.$router.push(_loginurl)
          } else {
            window.location.href = _loginurl
          }
        }

        // api拦截 登录超时
        if (restPath != "/login" && response.data && (response.data.errorCode == 'INVALID_USER' || response.data.errorCode == 'Expired_Token')) {
          if (Vue.$router && Vue.$router.push) {
            Vue.$router.push(_loginurl)
          } else {
            window.location.href = _loginurl
          }
          return Promise.reject({
            code: 401,
            message: "登录超时,请重新登录!"
          })
        }

        // 服务器正常响应
        return Promise.resolve(response.data);
      })
      .catch(error => {
        // close loading
        loading && loading.close();

        result.error = error || new Error("请求出错,请检查网络!");
        result.data = {};

        // 网络问题
        if (error && ~error.message.indexOf("Network Error")) {
          // 没有网络 离线
          printErrorInfo("请求出错,请检查网络连接!");
          return Promise.resolve(result);
        }

        // 终止请求 请求超时
        if (error && error.code == "ECONNABORTED") {
          if (~error.message.indexOf("timeout")) {
            printErrorInfo("请求超时,请稍后再试!");
            return Promise.resolve(result);
          } else {
            // 其他原因
            printErrorInfo("请求出错,请稍后再试!");
            return Promise.resolve(result);
          }
        }

        // 服务器返回状态码超过2xx
        if (error && error.response) {
          // 打印出错信息
          printErrorInfo(
            error.response.status + ": " + error.response.statusText ||
            "请求出错,请稍后再试!"
          );
          return Promise.resolve(result);
        }

        // 用户验证失败
        if (error && error.code == 401) {
          // 打印出错信息
          printErrorInfo("401: " + error.message);
          return Promise.resolve(result);
        }

        // 其他错误
        printErrorInfo("请求出错,请稍后再试!!");
        return Promise.resolve(result);
      });
  };
}

export default {
  get: _h("get"),
  post: _h("post")
};
