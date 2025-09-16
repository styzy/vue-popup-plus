import { createRouter, createWebHashHistory, type Router } from 'vue-router'

const router: Router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@/views/Index.vue'),
		},
	],
})

export default router

