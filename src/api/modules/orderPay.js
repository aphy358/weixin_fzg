import http from '../http'


// 查询国籍
export const syncPayStart = (args, loading = false) => http.post("/vue/pay/wx/start.do", args, loading);