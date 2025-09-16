import { createRouter, createWebHashHistory, type Router } from 'vue-router'

const router: Router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/Index.vue'),
		},
		{
			path: '/guide',
			name: 'guide',
			component: () => import('@/views/Guide.vue'),
		},
		{
			path: '/api',
			name: 'api',
			component: () => import('@/views/Api.vue'),
		},
		{
			path: '/examples',
			name: 'examples',
			component: () => import('@/views/Examples.vue'),
		},
	],
})

export default router

