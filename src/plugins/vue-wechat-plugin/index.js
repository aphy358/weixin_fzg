import wechatAuth from './wechatAuth';

export default {
    install(Vue, options) {
        let router = options.router
        let wechatPlugin = new wechatAuth(options)
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
                    wechatPlugin.getCodeCallback(next, to.query.code, pageType, to)
                } else { // 去获取code
                    wechatPlugin.getCode()
                }
            } else {
                next()
            }
        })
    }
}