import http from '../http'



// 登录
export const syncInitJSSDK = (args, loading = false) => http.post("/vue/wx/js/sign.do", args, loading)



// 登录
// export const syncLogin = (args, loading = true) => http.post("/user/loginShop.do", args, loading)



// 退出
// export const syncLogout = (args, loading = true) => http.get("/user/logoutShop.do", args, loading)
