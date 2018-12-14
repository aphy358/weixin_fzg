import http from '../http'


// 查询酒店价格，(实查)
export const syncGetHotelPriceList = (args, loading = false) => http.post("/vue/hotel/price.do", args, loading)


// 根据 hotelId 查询酒店信息
export const syncGetHotelInfo = (args, loading = false) => http.get("/vue/hotel/info.do", args, loading)



// // 查询酒店信息，可以查多个
// export const syncGetHotelsInfo = (args, loading = true) => http.post("/hotel/getHotelInfo.do", args, loading)


// // 查询酒店价格，(缓存价格)
// export const syncGetHotelPriceListInStock = (args, loading = true) => http.post("/hotel/getHotelPriceListInStock.do", args, loading)


