import http from '../http'


// 查询订单列表
export const syncOrderList = (args, loading = false) => http.post("/vue/order/list.do", args, loading);

// 取消订单
export const syncCancelOrder = (args, loading = false) => http.post("/vue/order/cancel.do", args, loading);

// 取消订单并退款
export const syncRefundOrder = (args, loading = false) => http.post("/vue/payrefund/wx/payrefund.do", args, loading);