import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	server: {
		port: 9527,
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@core': fileURLToPath(new URL('../core/src', import.meta.url)),
			'@plugin': fileURLToPath(new URL('../plugin/src', import.meta.url)),
		},
	},
	plugins: [vue(), vueDevTools()],
})
