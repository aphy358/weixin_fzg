import http from '../http'


// 查询国籍
export const syncOrderList = (args, loading = false) => http.post("/order/list.do", args, loading);