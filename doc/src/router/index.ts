import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory, type Router } from 'vue-router'

const router: Router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@doc/views/index.vue'),
		},
	],
})

export default router

