import http from '../http'


// 查询订单列表
export const syncOrderList = (args, loading = false) => http.post("/vue/order/list.do", args, loading);
export const syncSearchOrderList = (args, loading = false) => http.post("/vue/order/searchHotelOrderList.do", args, loading);

// 取消订单
export const syncCancelOrder = (args, loading = false) => http.post("/vue/order/cancel.do", args, loading);

// 取消订单并退款
export const syncRefundOrder = (args, loading = false) => http.post("/vue/payrefund/wx/payrefund.do", args, loading);

// 个人信息
export const syncPersonalInfo = (args, loading = false) => http.post("/vue/userInfo/getFzgAllUserInfo.do", args, loading);

// 模拟全能宝登录
export const syncLogin = (args, loading = false) => http.post("/analogLogin/qnbLogin.do", args, loading);

// 退出登录
export const syncLogout = (args, loading = true) => http.post("/vue/logout.do", args, loading);

// 订单详情
export const syncOrderDetail = (args, loading = false) => http.post("/vue/order/detail.do", args, loading);

//退款
export const syncCancelHotelOrder = (args, loading = false) => http.post("/vue/myinfo/cancelHotelOrder.do", args, loading);

//查预订员列表
export const syncGetUserList = (args, loading = false) => http.post("/vue/userInfo/getMyCustomerUser.do", args, loading);