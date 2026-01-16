import { usePopup } from 'vue-popup-plus'
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

router.beforeEach((to, from, next) => {
	// const popup = usePopup()
	// popup.loading()
	next()
})

export default router
