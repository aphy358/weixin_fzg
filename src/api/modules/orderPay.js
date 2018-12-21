import http from '../http'


// 查询国籍
export const syncPayStart = (args, loading = false) => http.post("/pay/wx/start.do", args, loading);