export default [{
		path: '/qnblogin',
		name: 'qnblogin',
		component: () => import('@/views/QNB/QNBLogin.vue'),
		meta: {
			wechatAuth: false
		},
	},
	{
		path: '/qnbindex',
		name: 'qnbindex',
		component: () => import('@/views/QNB/QNBIndex.vue'),
		meta: {
			wechatAuth: false
		},
	},
	{
		path: '/qnbMyConcernList',
		name: 'qnbMyConcernList',
		component: () => import('@/views/QNB/QNBMyConcernList.vue'),
		meta: {
			wechatAuth: false
		},
	},
	{
		path: '/qnbSupplierList',
		name: 'qnbSupplierList',
		component: () => import('@/views/QNB/QNBSupplierList.vue'),
		meta: {
			wechatAuth: false
		},
	},
	// {
	// 	path: '/ebhotellist',
	// 	name: 'ebhotellist',
	// 	component: () => import('@/views/QNB/EBHotelList.vue'),
	// 	meta: {
	// 		wechatAuth: false
	// 	},
	// },
	// {
	// 	path: '/ebroomlist',
	// 	name: 'ebroomlist',
	// 	component: () => import('@/views/QNB/EBRoomList/index.vue'),
	// 	meta: {
	// 		wechatAuth: false
	// 	},
	// },
	// {
	// 	path: '/ebbatchmodify',
	// 	name: 'ebbatchmodify',
	// 	component: () => import('@/views/QNB/EBBatchModify/index.vue'),
	// 	meta: {
	// 		wechatAuth: false
	// 	},
	// },
]