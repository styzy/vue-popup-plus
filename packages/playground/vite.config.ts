import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'vue-popup-plus': fileURLToPath(
				new URL('../core/src', import.meta.url)
			),
			'vue-popup-plus-plugin-preset': fileURLToPath(
				new URL('../plugin/src', import.meta.url)
			),
		},
	},
	plugins: [vue(), vueDevTools()],
})
