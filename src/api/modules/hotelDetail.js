import http from '../http'


// 查询酒店价格，(实查)
export const syncGetHotelPriceList = (args, loading = false) => http.post("/vue/hotel/getHotelPriceList.do", args, loading)


// 查询酒店价格，(缓存价格)
export const syncGetHotelPriceListInStock = (args, loading = false) => http.post("/vue/hotel/getHotelPriceListInStock.do", args, loading)


// 根据 hotelId 查询酒店信息
// export const syncGetHotelInfo = (args, loading = false) => http.get("/vue/hotel/info.do", args, loading)
export const syncGetHotelInfo = (args, loading = true) => http.get("/vue/hotel/getHotelInfoList.do", args, loading)

