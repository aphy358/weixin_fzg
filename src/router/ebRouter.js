export default [{
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
	{
		path: '/eborderlist',
		name: 'eborderlist',
		component: () => import('@/views/EB/EBOrderList/index.vue'),
		meta: {
			wechatAuth: false
		},
	},
	{
		path: '/ebordertobeconfirm',
		name: 'ebordertobeconfirm',
		component: () => import('@/views/EB/EbOrderToBeConfirm.vue'),
		meta: {
			wechatAuth: false
		},
	},
	{
		path: '/ebhotellist',
		name: 'ebhotellist',
		component: () => import('@/views/EB/EBHotelList.vue'),
		meta: {
			wechatAuth: false
		},
	},
]