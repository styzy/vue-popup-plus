import type { ComponentInternalInstance } from 'vue'
import { createController } from '../controller'
import { getCore } from '../core'
import { PopupError } from '../error'
import { defaultPrintLog, PopupLog, PopupLogType } from '../log'
import type {
	PopupDirective,
	PopupDirectiveCreator,
	PopupDirectiveEventHandlersStore,
	PopupDirectiveHook,
	PopupDirectiveHookContext,
	PopupDirectiveTrigger,
} from './types'

/**
 * 创建弹出层指令
 *
 * - 通过传入一个渲染弹出层的钩子函数，创建一个弹出层指令。
 * - 内置了弹出层触发的方式以及事件的绑定与解绑。
 * - 传入的钩子函数会在用户指定的时机被执行，因此只需要在
 *   钩子函数中处理弹出层的渲染逻辑即可。
 * - 需要传入泛型参数 `TDirective`，用于指定弹出层指令的类型，
 *   该类型可通过 `PopupDirective` 工具类型创建。
 * - 创建的指令需要在创建插件实例是进行注册。
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
 * // 注册指令
 * const PopupPlus = createPopupPlus({
 * 	directives: {
 * 		test: testDirective,
 * 	},
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
 *
 * @param {PopupDirectiveHook<TDirective>}render - 渲染弹出层的钩子函数
 * @returns - 弹出层指令
 */
export const createPopupDirective: PopupDirectiveCreator = <
	TDirective extends PopupDirective,
>(
	render: PopupDirectiveHook<TDirective>
) => {
	const eventHandlerStore: PopupDirectiveEventHandlersStore = new Map()

	const directive = {
		mounted(...args) {
			const context = createContext(eventHandlerStore, render, ...args)
			bindEventHandlers(context)
		},
		beforeUpdate(...args) {
			const context = createContext(eventHandlerStore, render, ...args)
			unbindEventHandlers(context)
		},
		updated(...args) {
			const context = createContext(eventHandlerStore, render, ...args)
			bindEventHandlers(context)
		},
		beforeUnmount(...args) {
			const context = createContext(eventHandlerStore, render, ...args)
			unbindEventHandlers(context)
		},
	} as TDirective

	return directive
}

function createContext(
	eventStore: PopupDirectiveHookContext['eventStore'],
	renderHook: PopupDirectiveHookContext['renderHook'],
	el: PopupDirectiveHookContext['el'],
	binding: PopupDirectiveHookContext['binding'],
	vNode: PopupDirectiveHookContext['vNode'],
	prevVNode: PopupDirectiveHookContext['prevVNode']
): PopupDirectiveHookContext {
	return {
		eventStore,
		renderHook,
		el,
		binding,
		vNode,
		prevVNode,
	}
}

function bindEventHandlers(context: PopupDirectiveHookContext) {
	const eventHandlers = createEventHandlers(context)
	context.eventStore.set(context.el, eventHandlers)

	eventHandlers.forEach(({ event, handler }) =>
		context.el.addEventListener(
			event === 'hover' ? 'mouseover' : event,
			handler
		)
	)
}

function unbindEventHandlers(context: PopupDirectiveHookContext) {
	const eventHandlers = context.eventStore.get(context.el)

	if (eventHandlers) {
		eventHandlers.forEach(({ event, handler }) =>
			context.el.removeEventListener(
				event === 'hover' ? 'mouseover' : event,
				handler
			)
		)
		context.eventStore.delete(context.el)
	}
}

function createEventHandlers(context: PopupDirectiveHookContext) {
	const eventHandlers = Object.entries(context.binding.modifiers)
		.filter(([_, value]) => value)
		.filter(([key]) => ['click', 'hover', 'contextmenu'].includes(key))
		.map(([key]) => ({
			event: key as PopupDirectiveTrigger,
			handler: createEventHandler(context),
		}))

	if (eventHandlers.length === 0) {
		eventHandlers.push({
			event: 'click',
			handler: createEventHandler(context),
		})
	}

	return eventHandlers
}

function createEventHandler(context: PopupDirectiveHookContext) {
	return (e: Event) => {
		const { eventStore, renderHook, ...hookParams } = context

		context.renderHook({
			el: context.el,
			binding: context.binding,
			vNode: context.vNode,
			prevVNode: context.prevVNode as null,
			getController: (log?: PopupLog) => getController(context, log),
		})

		if (context.binding.modifiers.prevent) {
			e.preventDefault()
		}
		if (context.binding.modifiers.stop) {
			e.stopPropagation()
		}
	}
}

function getController(
	context: PopupDirectiveHookContext,
	log: PopupLog = new PopupLog({
		type: PopupLogType.Success,
		caller: '未知指令',
	})
) {
	const core = getCore()

	if (!core) {
		log.type = PopupLogType.Error
		log.message = `调用 ${log.caller} 指令前请先调用 createPopupPlus() 创建弹出层插件实例`

		defaultPrintLog(log)

		throw new PopupError(log)
	}

	const vm: ComponentInternalInstance = context.binding.instance?.$

	return createController(core, vm, log)
}
