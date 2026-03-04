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
			path: '/plugin',
			component: () => import('@/views/Plugin.vue'),
		},
		{
			path: '/directive',
			component: () => import('@/views/Directive.vue'),
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
