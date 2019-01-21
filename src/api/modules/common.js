import http from '../http'



// 初始化 JSSDK
export const syncInitJSSDK = (args, loading = false) => http.post("/vue/wx/js/sign.do", args, loading)



// 登录
export const syncLogin = (args, loading = true) => http.post("/vue/login.do", args, loading)




// 授权登录
export const syncAuthLogin = (args, loading = true) => http.post("/vue/autoLoginWx.do", args, loading)




// 查询当前用户登录态
export const syncGetCurUser = (args, loading = false) => http.post("/vue/indexInit.do", args, loading)
