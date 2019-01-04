import http from '../http'



// 登录
export const syncQNBLogin = (args, loading = false) => http.post("/vue/qnbBind.do", args, loading)

// 模拟登录
export const syncQNBLoginForTest = (args, loading = false) => http.post("/vue/analogLogin/qnbLogin.do", args, loading)


// 获取当前用户
export const syncQNBGetCurUser = (args, loading = false) => http.post("/vue/qnbPersonalCenter/getQnbUserInfo.do", args, loading)


// 解除绑定用户
export const syncQNBUnBind = (args, loading = false) => http.post("/vue/relieveQnbBind.do", args, loading)


// 查询我关注的酒店列表
export const syncQNBQueryMyConcernList = (args, loading = false) => http.post("/vue/qnbPersonalCenter/queryMyattention.do", args, loading)


// 判断用户对某供应商有无操作权限
export const syncQNBHasAuthority = (args, loading = false) => http.post("/vue/qnbHotelStatusManager/isHasAuthority.do", args, loading)


// 取消对某酒店供应商的关注
export const syncQNBCancleConcern = (args, loading = false) => http.post("/vue/qnbPersonalCenter/cancleAttention.do", args, loading)


// 增加对某酒店供应商的关注
export const syncQNBAddConcern = (args, loading = false) => http.post("/vue/qnbPersonalCenter/addAttenton.do", args, loading)


// 查询某个酒店下的所有供应商
export const syncQNBQuerySuppliers = (args, loading = true) => http.post("/vue/qnbPersonalCenter/hotelItemList.do", args, loading)


// 根据关键字查酒店列表
export const syncQNBQueryHotels = (args, loading = false) => http.post("/vue/qnbPersonalCenter/suggestHotel.do", args, loading)





// 房型列表页

// 查询某一天的房态、房价数据
export const syncQNBQueryRoomStatusAndPriceForOneDay = (args, loading = false) => http.post("/vue/qnbHotelStatusManager/supplierQueryHotelRoom.do", args, loading)


// 关房
export const syncQNBCutHotelRoom = (args, loading = true) => http.post("/vue/qnbHotelStatusManager/cutHotelRoom.do", args, loading)


// 保存房态
export const syncQNBSaveRoomStatus = (args, loading = true) => http.post("/vue/qnbHotelStatusManager/supplierSaveHotelRoom.do", args, loading)


// 保存房价
export const syncQNBSaveRoomPrice = (args, loading = true) => http.post("/vue/qnbHotelStatusManager/supplierSaveHotelPrice.do", args, loading)






// 批量修改页

// 查询 '房型' 和 '价格类型'
export const syncQNBQueryAlwaysType = (args, loading = false) => http.post("/vue/qnbHotelStatusManager/queryAlwaysType.do", args, loading)


// 批量保存房态
export const syncQNBBatchSaveRoomStatus = (args, loading = true) => http.post("/vue/qnbHotelStatusManager/queryShortcut.do", args, loading)


// 批量保存房价
export const syncQNBBatchSaveRoomPrice = (args, loading = true) => http.post("/vue/qnbHotelStatusManager/queryPriceShortcut.do", args, loading)