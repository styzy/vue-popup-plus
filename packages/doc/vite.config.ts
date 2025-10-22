import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Markdown from 'unplugin-vue-markdown/vite'
import hljs from 'highlight.js'

export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	plugins: [
		vue({
			include: [/\.vue$/, /\.md$/],
		}),
		Markdown({
			markdownItOptions: {
				html: true,
				linkify: true,
				typographer: true,
				highlight: function (str, lang) {
					if (lang && hljs.getLanguage(lang)) {
						try {
							return (
								'<pre><code class="hljs">' +
								hljs.highlight(str, {
									language: lang,
									ignoreIllegals: true,
								}).value +
								'</code></pre>'
							)
						} catch (__) {}
					}

					return '<pre><code class="hljs">' + str + '</code></pre>'
				},
			},
		}),
		vueDevTools(),
	],
	css: {
		preprocessorOptions: {
			stylus: {
				additionalData: `@import "${fileURLToPath(new URL('./src/assets/stylus/inject.styl', import.meta.url))}";`,
			},
		},
	},
})

