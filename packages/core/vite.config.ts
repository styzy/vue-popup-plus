import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		lib: {
			entry: fileURLToPath(new URL('./src/index', import.meta.url)),
			name: 'VuePopupPlus',
			formats: ['es', 'umd'],
		},
		outDir: fileURLToPath(new URL('./dist', import.meta.url)),
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	plugins: [
		vue(),
		vueDevTools(),
		cssInjectedByJsPlugin(),
		dts({
			tsconfigPath: fileURLToPath(
				new URL('./tsconfig.types.json', import.meta.url)
			),
			rollupTypes: true,
			outDir: fileURLToPath(new URL('./dist', import.meta.url)),
			pathsToAliases: true,
			insertTypesEntry: true,
		}),
	],
})

