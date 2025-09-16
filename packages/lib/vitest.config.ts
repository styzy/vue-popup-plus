import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfigFactory from './vite.config'

// 获取测试模式下的 vite 配置
const viteConfig = viteConfigFactory({ command: 'serve', mode: 'test' })

// 移除可能导致冲突的配置
delete viteConfig.define

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: 'jsdom',
			exclude: [...configDefaults.exclude, 'e2e/**'],
			root: fileURLToPath(new URL('./', import.meta.url)),
		},
	})
)

