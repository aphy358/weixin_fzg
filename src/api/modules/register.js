import http from '../http'


// 查询所有国家
export const syncCountry = (args, loading = false) => http.post("/vue/hotel/countryAllList.do", args, loading);

// 查询某国家下的所有省份
export const syncProvince = (args, loading = false) => http.post("/vue/hotel/stateListByCountryId.do", args, loading);

// 查询某省份下的所有城市
export const syncCity = (args, loading = false) => http.post("/vue/hotel/cityListByStateId.do", args, loading);

// 注册
export const syncRegister = (args, loading = false) => http.post("/vue/regist/save.do", args, loading);

// 重复校验
export const syncCheck = (args, loading = false) => http.post("/vue/regist/check.do", args, loading);