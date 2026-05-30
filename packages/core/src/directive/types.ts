import {
	type DirectiveBinding,
	type DirectiveHook,
	type ObjectDirective,
	type VNode,
} from 'vue'
import type { PopupController } from '../controller'
import type { PopupLog } from '../log'

export type PopupDirectiveTrigger = 'click' | 'hover' | 'contextmenu'
type PopupDirectiveTriggerModifiers = 'stop' | 'prevent'

/**
 * 弹出层指令工具类型
 *
 * - 使用该类型可以快速为弹出层指令创建指令类型
 * - 一般搭配 `createPopupDirective()` 函数使用
 *
 * - 示例：
 * ```ts
 * type PopupTestDirective = PopupDirective<'number', 'custom1' | 'custom2'>
 *
 * const testDirective = createPopupDirective<PopupTestDirective>(({
 * 	el,
 * 	binding,
 * 	vNode,
 * 	prevVNode,
 * 	getController,
 * })=>{
 * 	const controller = getController()
 * 	controller.render(binding.value)
 * })
 *
 * declare module 'vue' {
 * 	export interface GlobalDirectives {
 * 		vPopupTest: PopupTestDirective
 * 	}
 * }
 *
 * // 使用方式
 * v-popup-test="123"
 * // 自定义修饰符
 * v-popup-test.custom1="123"
 * v-popup-test.custom2="123"
 * ```
 */
export type PopupDirective<
	TValue = any,
	TModifiers extends string = '',
> = ObjectDirective<
	HTMLElement,
	TValue,
	TModifiers extends ''
		? PopupDirectiveTrigger | PopupDirectiveTriggerModifiers
		: PopupDirectiveTrigger | PopupDirectiveTriggerModifiers | TModifiers,
	TModifiers
>

type PopupDirectiveHookControllerGetter = (log?: PopupLog) => PopupController

export type PopupDirectiveHook<
	TDirective extends PopupDirective,
	TValue = TDirective extends PopupDirective<infer Value, any>
		? Value
		: never,
	TModifiers extends string = TDirective extends PopupDirective<
		any,
		infer Modifiers
	>
		? Modifiers
		: never,
	TParams = Parameters<DirectiveHook<HTMLElement, null, TValue, TModifiers>>,
	TEl = TParams extends [infer El, ...any[]] ? El : never,
	TBind = TParams extends [any, infer Bind, ...any[]] ? Bind : never,
	TVNode = TParams extends [any, any, infer VNode, ...any[]] ? VNode : never,
	TPrevVNode = TParams extends [any, any, any, infer Prev] ? Prev : never,
> = (args: {
	el: TEl
	binding: TBind
	vNode: TVNode
	prevVNode: TPrevVNode
	getController: PopupDirectiveHookControllerGetter
}) => void

export type PopupDirectiveHookContext = {
	eventStore: PopupDirectiveEventHandlersStore
	renderHook: PopupDirectiveHook<PopupDirective>
	el: HTMLElement
	binding: DirectiveBinding<any, string, any>
	vNode: VNode<any, HTMLElement>
	prevVNode: VNode<any, HTMLElement> | null
}

export type PopupDirectiveEventHandlersStore = Map<
	HTMLElement,
	Array<{
		event: PopupDirectiveTrigger
		handler: (e: Event) => void
	}>
>

export interface PopupDirectiveCreator {
	<TDirective extends PopupDirective>(
		renderHook: PopupDirectiveHook<TDirective>
	): TDirective
}
