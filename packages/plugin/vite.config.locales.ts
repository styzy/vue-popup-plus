import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'

const localeEntries = {
	'zh-CN': fileURLToPath(
		new URL('./src/locale/langs/zh-CN', import.meta.url)
	),
	'en-US': fileURLToPath(
		new URL('./src/locale/langs/en-US', import.meta.url)
	),
}

export default defineConfig({
	build: {
		lib: {
			entry: {
				...localeEntries,
			},
			name: 'VuePopupPlusPluginPreset',
			formats: ['es'],
		},
		outDir: fileURLToPath(new URL('./dist/locales', import.meta.url)),
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue', 'vue-popup-plus'],
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
		dts({
			tsconfigPath: fileURLToPath(
				new URL('./tsconfig.types.json', import.meta.url)
			),
			rollupTypes: true,
			outDir: fileURLToPath(new URL('./dist/locales', import.meta.url)),
			pathsToAliases: true,
			insertTypesEntry: true,
			include: ['./src/locale/**/*'],
		}),
	],
})
