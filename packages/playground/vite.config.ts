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
			'vue-popup-plus': fileURLToPath(
				new URL('../core/src', import.meta.url)
			),
			'vue-popup-plus-plugin-preset/locales': fileURLToPath(
				new URL('../plugin/src/locale/langs', import.meta.url)
			),
			'vue-popup-plus-plugin-preset': fileURLToPath(
				new URL('../plugin/src', import.meta.url)
			),
			'@core': fileURLToPath(new URL('../core/src', import.meta.url)),
			'@plugin': fileURLToPath(new URL('../plugin/src', import.meta.url)),
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	plugins: [vue(), vueDevTools()],
})
