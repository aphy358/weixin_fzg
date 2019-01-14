import * as common from './modules/common'
import * as hotelList from './modules/hotelList'
import * as hotelDetail from './modules/hotelDetail'
import * as citySelect from './modules/citySelect'
import * as orderWrite from './modules/orderWrite'
import * as myCenter from './modules/myCenter'
import * as eb from './modules/eb'
import * as qnb from './modules/qnb'
import * as register from './modules/register'

const api = {
  common,
  hotelList,
  hotelDetail,
  citySelect,
  orderWrite,
  myCenter,
  eb,
  qnb,
  register
}

// define install for vue.use()
Object.defineProperty(api, "install", {
  configurable: false,
  enumberable: false,
  writable: false,
  value: function (Vue, options) {
    Vue.$api = api
    Vue.prototype.$api = api
  }
})

export default api
