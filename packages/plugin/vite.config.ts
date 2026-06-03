import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	build: {
		lib: {
			entry: fileURLToPath(new URL('./src/index', import.meta.url)),
			formats: ['es'],
		},
		outDir: fileURLToPath(new URL('./es', import.meta.url)),
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue', 'vue-popup-plus'],
			output: {
				// 每个源文件单独输出、不合并chunk
				preserveModules: true,
				// 剔除dist/es下多余src目录
				preserveModulesRoot: 'src',
				entryFileNames: '[name].mjs',
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
			'@plugin': fileURLToPath(new URL('./src', import.meta.url)),
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
			rollupTypes: false,
			outDir: fileURLToPath(new URL('./es', import.meta.url)),
			entryRoot: fileURLToPath(new URL('./src', import.meta.url)),
			pathsToAliases: true,
		}),
	],
})
