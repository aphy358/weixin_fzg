import http from './http'


// 查询城市
export const syncGetCities = (args, loading = true) => http.post("/sys/city/json.do", args, loading)
