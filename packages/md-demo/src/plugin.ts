import type Markdown from 'markdown-it'
import container from 'markdown-it-container'

type Options = {
	/**
	 * 容器名称
	 * - 默认值：`demo`
	 */
	spoiler?: string
	/**
	 * 组件名称
	 * - 默认值：`MarkdownDemo`
	 */
	resolveTag?: string
}

export const plugin = (
	md: Markdown,
	{ spoiler = 'demo', resolveTag = 'MarkdownDemo' }: Options = {}
) => {
	container(md, spoiler, {
		validate(params) {
			// 支持两种格式：
			// 1) "demo"
			// 2) "demo <任意数量的参数，空格分隔>"
			return !!params
				.trim()
				.match(new RegExp(`^${spoiler}(?:\\s+(.*))?$`))
		},
		render(tokens, idx) {
			const params = tokens[idx].info
				.trim()
				.match(new RegExp(`^${spoiler}(?:\\s+(.*))?$`))

			if (tokens[idx].nesting === 1) {
				const description = params?.[1] || ''

				let contentStr = ''

				for (let index = idx + 1; index < 999999; index++) {
					const _token = tokens[index]
					if (_token.nesting === -1) {
						break
					}

					let { content, info = '' } = tokens[index]

					info = info.toLowerCase()

					if (!['html', 'pug'].includes(info)) {
						continue
					}

					contentStr += content
				}

				return `<${resolveTag} description="${description}"><template #demo>${contentStr}</template><template #code>`
			} else {
				return `</template></${resolveTag}>\n`
			}
		},
	})
}
