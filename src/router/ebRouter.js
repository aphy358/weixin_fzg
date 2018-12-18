export default [
	{
		path: '/eblogin',
		name: 'eblogin',
		component: () => import('@/views/EB/EBLogin.vue'),
		meta: {
			wechatAuth: false
		},
	},
	{
		path: '/ebindex',
		name: 'ebindex',
		component: () => import('@/views/EB/EBIndex.vue'),
		meta: {
			wechatAuth: false
		},
	},
]