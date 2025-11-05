import Markdown from 'markdown-it'
import container from 'markdown-it-container'

export const mdDemoPlugin = (md: Markdown) => {
	container(md, 'demo', {
		validate(params) {
			// 支持两种格式：
			// 1) "demo"
			// 2) "demo <任意数量的参数，空格分隔>"
			return !!params.trim().match(/^demo(?:\s+(.*))?$/)
		},
		render(tokens, idx) {
			const params = tokens[idx].info.trim().match(/^demo(?:\s+(.*))?$/)

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

				console.log('contentStr: ', contentStr)
				return `<DDemo description="${description}"><template #demo>${contentStr}</template><template #code>`
			} else {
				return '</template></DDemo>\n'
			}
		},
	})
}
