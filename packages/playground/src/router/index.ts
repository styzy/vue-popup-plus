import { usePopup } from 'vue-popup-plus'
import { createRouter, createWebHashHistory, type Router } from 'vue-router'

const router: Router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@/views/Index.vue'),
		},
		{
			path: '/core',
			component: () => import('@/views/Core.vue'),
		},
		{
			path: '/viewport',
			component: () => import('@/views/Viewport.vue'),
		},
		{
			path: '/anchor',
			component: () => import('@/views/Anchor.vue'),
		},
		{
			path: '/anchor-trigger',
			component: () => import('@/views/AnchorTrigger.vue'),
		},
		{
			path: '/directive',
			component: () => import('@/views/Directive.vue'),
		},
		{
			path: '/plugin',
			component: () => import('@/views/Plugin.vue'),
			redirect: '/plugin/toast',
			children: [
				{
					path: 'toast',
					component: () => import('@/views/plugin/Toast.vue'),
				},
				{
					path: 'message',
					component: () => import('@/views/plugin/Message.vue'),
				},
				{
					path: 'alert',
					component: () => import('@/views/plugin/Alert.vue'),
				},
				{
					path: 'confirm',
					component: () => import('@/views/plugin/Confirm.vue'),
				},
				{
					path: 'prompt',
					component: () => import('@/views/plugin/Prompt.vue'),
				},
				{
					path: 'dialog',
					component: () => import('@/views/plugin/Dialog.vue'),
				},
				{
					path: 'drawer',
					component: () => import('@/views/plugin/Drawer.vue'),
				},
				{
					path: 'loading',
					component: () => import('@/views/plugin/Loading.vue'),
				},
				{
					path: 'album',
					component: () => import('@/views/plugin/Album.vue'),
				},
			],
		},
		{
			path: '/button',
			component: () => import('@/views/Button.vue'),
		},
	],
})

router.beforeEach((to, from, next) => {
	// const popup = usePopup()
	// popup.loading()
	next()
})

export default router
