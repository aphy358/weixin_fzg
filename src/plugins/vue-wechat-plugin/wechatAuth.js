class wechatAuth {

    constructor(config) {
        let defaultConfig = {
            appid: 'wx8ec829bf21d69731',    // 这是线上appid
            responseType: 'code',
            redirect_uri: 'http://weixin.jlfzg.com',
            error_uri: '',
            scope: 'snsapi_base ',
            getCodeCallback: () => {},
        }
        this.config = Object.assign(defaultConfig, config)
    }

    // 调取微信获取code接口
    getCode() {
        let authPageBaseUri = 'https://open.weixin.qq.com/connect/oauth2/authorize'
        let authParams = `?appid=${this.config.appid}&redirect_uri=${encodeURIComponent(window.location.href.split('#')[0])}&response_type=${this.config.responseType}&scope=${this.config.scope}#wechat_redirect`
        window.location.href = authPageBaseUri + authParams;
    }

    next(next) {
        return (to) => {
            to ? next(to) : next()
        }
    }

    getCodeCallback(next, code, pageType) {
        return this.config.getCodeCallback(this.next(next), code, pageType)
    }

}

export default wechatAuth