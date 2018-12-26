import http from '../http'



// 登录
export const syncEBLogin = (args, loading = false) => http.post("/vue/supBind.do", args, loading)


// 解除绑定 eb 用户
export const syncEBUnBind = (args, loading = true) => http.post("/vue/relieveSupBind.do", args, loading)


// 获取供应商权限？
export const syncSupplierInfo = (args, loading = false) => http.post("/vue/ebMenu/supplierInfoSearch.do", args, loading)


// 查询订单列表
export const syncSearchOrderList = (args, loading = false) => http.post("/vue/orderList/searchOrderList.do", args, loading)


// 查询订单信息
export const syncQueryOrderInfo1 = (args, loading = false) => http.post("/vue/showOrderDetailById.do", args, loading)


// 查询订单信息
export const syncQueryOrderInfo2 = (args, loading = false) => http.post("/vue/initOrderDetail.do", args, loading)


// 获取客户姓名
export const syncQueryUser = (args, loading = false) => http.post("/vue/orderUsers.do", args, loading)


// 处理订单，传递参数 status：1：确认订单   2：拒绝订单   3：取消订单   4：拒绝取消订单
export const syncHandleOrder = (args, loading = false) => http.post("/vue/wxSaveSupStatus.do", args, loading)



// 更新供应商 Remark ？
export const syncUpdateOrderSuppRemark = (args, loading = false) => http.post("/vue/updateOrderSuppRemark.do", args, loading)



// 查酒店列表
export const syncEBQueryHotelList = (args, loading = false) => http.post("/vue/ebHotel/hotelQueryseach.do", args, loading)







// 房型列表页

// 查询某一天的房态、房价数据
export const syncEBQueryRoomStatusAndPriceForOneDay = (args, loading = false) => http.post("/vue/ebHotel/supplierQueryHotelRoom.do", args, loading)


// 关房
export const syncEBCutHotelRoom = (args, loading = false) => http.post("/vue/ebHotel/cutHotelRoom.do", args, loading)


// 保存房态
export const syncEBSaveRoomStatus = (args, loading = false) => http.post("/vue/ebHotel/supplierSaveHotelRoom.do", args, loading)


// 保存房价
export const syncEBSaveRoomPrice = (args, loading = false) => http.post("/vue/ebHotel/supplierSaveHotelPrice.do", args, loading)







// 批量修改页

// 查询 '房型' 和 '价格类型'
export const syncEBQueryAlwaysType = (args, loading = false) => http.post("/vue/ebHotel/queryAlwaysType.do", args, loading)


// 批量保存房态
export const syncEBBatchSaveRoomStatus = (args, loading = false) => http.post("/vue/ebHotel/queryShortcut.do", args, loading)


// 批量保存房价
export const syncEBBatchSaveRoomPrice = (args, loading = false) => http.post("/vue/ebHotel/queryPriceShortcut.do", args, loading)






// 这里有个问题，查询订单相关信息怎么用了三个接口？可否整合到一个接口？