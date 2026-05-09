import {
	POPUP_BEM_CONFIG,
	POPUP_COMPONENT_NAMES,
	POPUP_INSIDE_COMPONENT_NAMES,
} from '../../CONSTANTS'

export interface INamespace {
	/**
	 * 创建包含命名空间的组件类名
	 *
	 * 使用示例：
	 * ```ts
	 * import { useNamespace } from '@hooks'
	 *
	 * const ns = useNamespace(POPUP_COMPONENT_NAMES.HEADER)
	 *
	 * ns.block() // 'popup-header'
	 * ```
	 */
	block(): string
	/**
	 * 创建包含命名空间的元素类名
	 *
	 * 使用示例：
	 * ```ts
	 * import { useNamespace } from '@hooks'
	 *
	 * const ns = useNamespace(POPUP_COMPONENT_NAMES.HEADER)
	 *
	 * ns.element('background') // 'popup-header__background'
	 * ```
	 */
	element(element: string): string
	/**
	 * 创建包含命名空间的元素修饰类名
	 *
	 * 使用示例：
	 * ```ts
	 * import { useNamespace } from '@hooks'
	 *
	 * const ns = useNamespace(POPUP_COMPONENT_NAMES.HEADER)
	 *
	 * ns.modifier('primary') // 'popup-header--primary'
	 * ```
	 */
	modifier(modifier: string): string
	/**
	 * 创建包含命名空间的子元素的修饰类名
	 *
	 * 使用示例：
	 * ```ts
	 * import { useNamespace } from '@hooks'
	 *
	 * const ns = useNamespace(POPUP_COMPONENT_NAMES.HEADER)
	 *
	 * ns.elementModifier('icon', 'primary') // 'popup-header__icon--primary'
	 * ```
	 */
	elementModifier(element: string, modifier: string): string
	/**
	 * 创建符合 BEM 规范的状态类名
	 *
	 * - 需要注意，状态类名不包括命名空间
	 *
	 * 使用示例：
	 * ```ts
	 * import { useNamespace } from '@hooks'
	 *
	 * const ns = useNamespace(POPUP_COMPONENT_NAMES.HEADER)
	 *
	 * ns.is('disabled') // 'is-disabled'
	 * ns.is('disabled', true) // 'is-disabled'
	 * ns.is('disabled', false) // ''
	 * ```
	 */
	is(state: string, isActive?: boolean): string
}

type ComponentName =
	| (typeof POPUP_COMPONENT_NAMES)[keyof typeof POPUP_COMPONENT_NAMES]
	| (typeof POPUP_INSIDE_COMPONENT_NAMES)[keyof typeof POPUP_INSIDE_COMPONENT_NAMES]

export function useNamespace(componentName: ComponentName): INamespace {
	const block = componentName
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
		.toLowerCase()

	return {
		block(): string {
			return block
		},
		element(element: string): string {
			return `${block}${POPUP_BEM_CONFIG.ELEMENT_SPERATOR}${element}`
		},
		modifier(modifier: string): string {
			return `${block}${POPUP_BEM_CONFIG.MODIFY_SPERATOR}${modifier}`
		},
		elementModifier(element: string, modifier: string): string {
			return `${block}${POPUP_BEM_CONFIG.ELEMENT_SPERATOR}${element}${POPUP_BEM_CONFIG.MODIFY_SPERATOR}${modifier}`
		},
		is(state: string, isActive = true): string {
			return isActive ? `${POPUP_BEM_CONFIG.STATE_SPERATOR}${state}` : ''
		},
	}
}
