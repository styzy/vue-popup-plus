import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, './src/index.ts'),
			name: 'VuePopupPlus',
			// fileName: (format) => `vue-popup-plus.${format}.js`,
			formats: ['es', 'umd'],
		},
		outDir: resolve(__dirname, './dist'),
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
			tsconfigPath: resolve(__dirname, 'tsconfig.types.json'),
			rollupTypes: true,
			outDir: './dist',
			pathsToAliases: true,
			insertTypesEntry: true,
		}),
	],
})

