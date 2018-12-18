export default [
	{
		path: '/eblogin',
		name: 'eblogin',
		component: () => import('@/views/EB/EBLogin.vue'),
		meta: {
			wechatAuth: false
		},
	}, 
]