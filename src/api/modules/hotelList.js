import http from '../http'


// 查询某个城市下的所有行政区和商圈
export const syncGetAreaBiz = (args, loading = false) => http.post("/vue/hotel/getZone.do", args, loading)


// 根据关键字查酒店列表
export const syncGetHotels = (args, loading = false) => http.post("/vue/hotel/suggest.do", args, loading)


// 查询酒店列表  /vue/hotel/query.do
export const syncGetHotelList = (args, loading = false) => http.post("/vue/hotel/queryHotelListNew.do", args, loading)

