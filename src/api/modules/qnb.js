import http from '../http'



// 登录
export const syncQNBLogin = (args, loading = false) => http.post("/vue/qnbBind.do", args, loading)


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

