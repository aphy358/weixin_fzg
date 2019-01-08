export default [{
		path: '/qnblogin',
		name: 'qnblogin',
		component: () => import('@/views/QNB/QNBLogin.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'qnb',
		},
	},
	{
		path: '/qnbindex',
		name: 'qnbindex',
		component: () => import('@/views/QNB/QNBIndex.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'qnb',
		},
	},
	{
		path: '/qnbMyConcernList',
		name: 'qnbMyConcernList',
		component: () => import('@/views/QNB/QNBMyConcernList.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'qnb',
		},
	},
	{
		path: '/qnbSupplierList',
		name: 'qnbSupplierList',
		component: () => import('@/views/QNB/QNBSupplierList.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'qnb',
		},
	},
	{
		path: '/qnbRoomList',
		name: 'qnbRoomList',
		component: () => import('@/views/QNB/QNBRoomList/index.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'qnb',
		},
	},
	{
		path: '/qnbBatchModify',
		name: 'qnbBatchModify',
		component: () => import('@/views/QNB/QNBBatchModify/index.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'qnb',
		},
	},
]