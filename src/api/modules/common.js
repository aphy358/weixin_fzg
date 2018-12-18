import http from '../http'



// 初始化 JSSDK
export const syncInitJSSDK = (args, loading = false) => http.post("/vue/wx/js/sign.do", args, loading)



// 登录
export const syncLogin = (args, loading = false) => http.post("/vue/login.do", args, loading)



// 退出
// export const syncLogout = (args, loading = true) => http.get("/user/logoutShop.do", args, loading)
