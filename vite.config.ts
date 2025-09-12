import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

// 文档模式配置
const docConfig: UserConfig = {
	base: './',
	build: {
		// rollupOptions: {
		// 	input: {
		// 		main: 'doc/main.ts',
		// 	},
		// },
		outDir: 'dist',
	},
	plugins: [vue(), vueDevTools()],
}

// 库模式配置
const libConfig: UserConfig = {
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'VuePopupPlus',
			// fileName: (format) => `vue-popup-plus.${format}.js`,
			formats: ['es', 'umd'],
		},
		outDir: 'lib',
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
		dts({
			tsconfigPath: resolve(__dirname, 'tsconfig.types.json'),
			rollupTypes: true,
			outDir: 'typings',
			pathsToAliases: true,
			insertTypesEntry: true,
		}),
	],
}

export default defineConfig(({ command, mode }) => ({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'#': fileURLToPath(new URL('./src/utils', import.meta.url)),
			'@doc': fileURLToPath(new URL('./doc', import.meta.url)),
		},
	},
	// 根据构建模式确定配置
	...(mode === 'lib' ? libConfig : docConfig),
}))

