import http from '../http'



// 登录
export const syncEBLogin = (args, loading = false) => http.post("/vue/supBind.do", args, loading)


// 解除绑定 eb 用户
export const syncEBUnBind = (args, loading = true) => http.post("/vue/relieveSupBind.do", args, loading)


// 获取供应商权限？
export const syncSupplierInfo = (args, loading = false) => http.post("/vue/ebMenu/supplierInfoSearch.do", args, loading)