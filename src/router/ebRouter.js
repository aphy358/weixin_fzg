export default [{
		path: '/ebLogin',
		name: 'ebLogin',
		component: () => import('@/views/EB/EBLogin.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'eb',
			keepAlive: true
		},
	},
	{
		path: '/ebIndex',
		name: 'ebIndex',
		component: () => import('@/views/EB/EBIndex.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'eb',
			keepAlive: true
		},
	},
	{
		path: '/ebOrderList',
		name: 'ebOrderList',
		component: () => import('@/views/EB/EBOrderList/index.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'eb',
			keepAlive: true
		},
	},
	{
		path: '/ebOrderToBeConfirm',
		name: 'ebOrderToBeConfirm',
		component: () => import('@/views/EB/EbOrderToBeConfirm.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'eb',
			keepAlive: true
		},
	},
	{
		path: '/ebHotelList',
		name: 'ebHotelList',
		component: () => import('@/views/EB/EBHotelList.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'eb',
			keepAlive: true
		},
	},
	{
		path: '/ebRoomList',
		name: 'ebRoomList',
		component: () => import('@/views/EB/EBRoomList/index.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'eb',
			keepAlive: true
		},
	},
	{
		path: '/ebBatchModify',
		name: 'ebBatchModify',
		component: () => import('@/views/EB/EBBatchModify/index.vue'),
		meta: {
			wechatAuth: true,
			pageType: 'eb',
			keepAlive: true
		},
	},
]