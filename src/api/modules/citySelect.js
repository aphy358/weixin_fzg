import http from '../http'


// 查询城市
export const syncGetCities = (args, loading = false) => http.post("/vue/hotel/geoSuggest.do", args, loading)

