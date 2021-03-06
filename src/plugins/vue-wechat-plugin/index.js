import wechatAuth from './wechatAuth';
import api from "@/api"
import { Indicator } from 'mint-ui'
import { replacePage, queryString } from '@/assets/util'

export default {
    install(Vue, options) {
        let router = options.router
        let wechatPlugin = new wechatAuth(options)
        window.wechatPlugin = wechatPlugin      // 保存到全局变量，后续调用
        
        if (!router) return false

        //绑定到路由上
        router.beforeEach((to, from, next) => {
            if (to.matched.some(record => record.meta.wechatAuth)) { // 判断是否需要授权
                // pageType：1：普通页面   2：eb 相关的页面   3：内部系统小工具相关的页面
                let pageType =
                    to.matched[0].meta.pageType == 'eb'  ? 2 : 
                    to.matched[0].meta.pageType == 'qnb' ? 3 : 1
                
                let user = 
                    pageType == 1 ? window.sessionStorage.getItem('user_wx') :
                    pageType == 2 ? window.sessionStorage.getItem('user_eb') : window.sessionStorage.getItem('user_qnb')

                let openid = window.sessionStorage.getItem('openid')
                    
                if (user || openid) { // 判断是否已经有登录
                    next()
                } else if (to.query.code) { // 判断是否是微信的回调地址
                    wechatPlugin.getCodeCallback(next, to.query.code, pageType)

                    api.common.syncGetCurUser({}).then(res => {
                        if(res.returnCode == 1){
                            let user_wx = res.data.customerUser
                            let user_eb = res.data.supCustomerUser
                            let user_qnb = res.data.qnbUser

                            if (user_wx) window.sessionStorage.setItem('user_wx', JSON.stringify(user_wx))
                            if (user_eb) window.sessionStorage.setItem('user_eb', JSON.stringify(user_eb))
                            if (user_qnb) window.sessionStorage.setItem('user_qnb', JSON.stringify(user_qnb))

                            if((pageType == 2 && user_eb) || (pageType == 3 && user_qnb)){
                                Indicator.close()
                                next()
                            }

                            if(pageType == 1 && user_wx){
                                // 获取用户类型，ut=corp 则表示是企业用户
                                (queryString('ut') == 'corp' && user_wx.distrbId == 34354)
                                    ? replacePage(router, 'login')
                                    : next()

                                Indicator.close()
                            }
                        }
                    })

                } else { // 去获取code
                    wechatPlugin.getCode()
                }
            } else {
                next()
            }
        })
    }
}