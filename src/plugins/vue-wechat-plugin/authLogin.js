import wechatPlugin from '@/plugins/vue-wechat-plugin'



// 授权登录
export default function (Vue, router, api) {
	
	
	// return;
	// 微信授权插件初始化
	Vue.use(wechatPlugin, {
		router, // 路由实例对象
		appid: 'wx41041c8613e4b4b0', // 测试appid： wxdc97f923fbec8173    趣程appid： wx41041c8613e4b4b0
		responseType: 'code', // 返回类型，请填写code
		scope: 'snsapi_userinfo', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
		// redirectUri: 'http://aphy358.natapp1.cc', //微信回调地址http://aphy358.natapp1.cc
		getCodeCallback(next, code, pageType) {
			// 用户同意授权后回调方法
			// code：用户同意授权后，获得code值
			// code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
			// next： 无论access_token是否获取成功,一定要调用该方法
			// next说明：next方法接收两个参数
			// 参数1(必填，切换到的路由地址，空字符串为当前路由，指定切换对象 next('/') 或者 next({ path: '/' })
			// 参数2为通过code值请求后端获取access_token的结果，true或者false，默认为false
			// code  ---  openid ---  user    // 通过code值换取access_token后端接口地址
			// axios.post('/vue/autoLoginWx.do', { code: code, state: '' }).then(res => {
			api.common.syncAuthLogin({
				code: code,
				state: ''
			}).then(res => {
				if (res.returnCode == 1) {
					let data = res.data
					let openid = data.openid
					let user_wx = data.customerUser
					let user_eb = data.supCustomerUser
					let user_qnb = data.qnbUser

					if (openid)	window.sessionStorage.setItem('openid', JSON.stringify(openid))
					if (user_wx) window.sessionStorage.setItem('user_wx', JSON.stringify(user_wx))
					if (user_eb) window.sessionStorage.setItem('user_eb', JSON.stringify(user_eb))
					if (user_qnb) window.sessionStorage.setItem('user_qnb', JSON.stringify(user_qnb))

					if (pageType == 2) {
						user_eb ? next() : next('/ebLogin')
					} else if (pageType == 3) {
						user_qnb ? next() : next('/qnblogin')
					} else {
						user_wx ? next() : next('/login')
					}
				}
			}).catch((e) => {
				alert('catch' + e)
				next('/login'); // ajax出现错误
			})
		},
	})
}