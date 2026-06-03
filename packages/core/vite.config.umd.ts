import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	build: {
		lib: {
			entry: fileURLToPath(new URL('./src/index', import.meta.url)),
			name: 'VuePopupPlus',
			formats: ['umd'],
		},
		outDir: fileURLToPath(new URL('./dist', import.meta.url)),
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue', 'vue-popup-plus'],
			output: {
				entryFileNames: 'index.umd.js',
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
					'vue-popup-plus': 'VuePopupPlus',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@core': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	plugins: [vue(), vueDevTools(), cssInjectedByJsPlugin()],
})
