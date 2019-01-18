import http from '../http'


// 支付
export const syncPayInfo = (args, loading = false) => http.post("/vue/pay/wx/info.do", args, loading);

// 支付
export const syncPayStart = (args, loading = false) => http.post("/vue/pay/wx/start.do", args, loading);