import { Log, LogType } from '../log'
import { type RenderOption } from '../controller'
import { createPopupDirective, type PopupDirective } from './directive'

type DefaultDirective = PopupDirective<RenderOption | RenderOption['component']>

declare module 'vue' {
	export interface GlobalDirectives {
		/**
		 * 快速渲染弹出层指令
		 *
		 * - 传入弹出层的渲染组件或渲染选项可快速渲染弹出层，
		 *   渲染选项具体参考 {@link RenderOption}
		 * - 默认触发方式为 `click` ，即点击元素触发渲染弹出层
		 * - 可通过 Modifier 修饰符来指定触发方式，可选值为
		 *   `click` | `hover` | `contextmenu`
		 * - 当有多个 Modifier 修饰符时，每一个 Modifier 修饰符都将生效
		 *
		 * - 示例：
		 * ```html
		 * // 点击元素触发渲染弹出层
		 * <div v-popup="Demo" >点击触发</div>
		 * <div v-popup="{ component: Demo }" >点击触发</div>
		 * <div v-popup="{ component: () => import('./Demo.vue') }" >点击触发</div>
		 *
		 * // 悬浮元素触发渲染弹出层
		 * <div v-popup.hover="Demo" >悬浮触发</div>
		 *
		 * // 右键点击元素触发渲染弹出层
		 * <div v-popup.contextmenu="Demo" >右键点击触发</div>
		 *
		 * // 点击和悬浮元素触发渲染弹出层
		 * <div v-popup.click.hover="Demo" >点击和悬浮触发</div>
		 *
		 * // 传递弹出层视图组件props
		 * <div v-popup="{ component: Demo, componentProps: { test: '123' } }" >点击触发</div>
		 * ```
		 */
		vPopup: DefaultDirective
	}
}

export const defaultDirective = createPopupDirective<DefaultDirective>(
	({ binding, getController }) => {
		const log = new Log({
			type: LogType.Success,
			caller: {
				name: 'v-popup',
				type: 'Directive',
				value: defaultDirective,
			},
		})

		let renderOption: RenderOption = binding.value as RenderOption

		if ((binding.value as RenderOption).component) {
			renderOption = binding.value as RenderOption
		} else {
			renderOption = {
				component: binding.value as RenderOption['component'],
			}
		}

		getController(log).render(renderOption)
	}
)
