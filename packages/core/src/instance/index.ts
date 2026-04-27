import {
	createApp,
	createVNode,
	reactive,
	ref,
	render,
	shallowRef,
	toRefs,
	type App,
	type ComponentInternalInstance,
	type Ref,
	type ToRef,
	type VNode,
} from 'vue'
import { wait } from 'utils'
import { type PopupCore } from '../core'
import type { PopupRenderOption, PopupUpdateOption } from '../controller'
import type { PopupViewComputedStyle } from '../typings'

import PopupInstance from '../components/PopupInstance.vue'

/**
 * 将对象的属性转换为 ref 类型
 */
type PropertiseToRef<T extends Record<string, any>> = {
	[K in keyof T]: ToRef<T[K]>
}

/**
 * 实例 id
 */
export interface PopupInstanceId {
	/**
	 * 生成该实例 id 的种子
	 *
	 * @internal
	 */
	readonly seed: number
	/**
	 * 实例 id 名称
	 */
	readonly name: string
}

export interface PopupInstance {
	readonly id: PopupInstanceId
	readonly renderType: InstanceRenderType
	readonly store: InstanceStore
	mount(): PopupInstanceId
	unmount(payload?: any): Promise<void>
}

type InstanceOption = Required<PopupRenderOption>

type InstanceInternalStore = {
	id: PopupInstanceId
	parentElement: Element
	computedStyle: PopupViewComputedStyle | null
	isBeforeUnmount: Ref<boolean>
}

export type InstanceStore = InstanceInternalStore &
	PropertiseToRef<Required<PopupUpdateOption>> &
	Required<Omit<PopupRenderOption, keyof PopupUpdateOption>>

interface InstanceStoreCreator {
	(id: PopupInstanceId, options: InstanceOption): InstanceStore
}

const createStore: InstanceStoreCreator = (
	id,
	{ component, anchor, componentProps, viewport, disableScroll, ...options }
) => {
	return {
		id,
		parentElement: getParentElement(options.appendTo),
		computedStyle: null,
		isBeforeUnmount: ref(false),
		component,
		disableScroll,
		componentProps: shallowRef(componentProps),
		anchor: shallowRef(anchor),
		viewport: shallowRef(viewport),
		...toRefs(reactive(options)),
	}
}

function getParentElement(appendTo: Element | string) {
	if (typeof appendTo === 'string') {
		appendTo = document.querySelector(appendTo) || document.body
	}
	return appendTo
}

class InstanceId implements PopupInstanceId {
	#seed: number
	get seed() {
		return this.#seed
	}
	get name() {
		return `popup-instance-${this.#seed}`
	}
	constructor(seed: number) {
		this.#seed = seed
	}
}

export const enum InstanceRenderType {
	ROOT_COMPONENT = 'RootComponent',
	APP = 'App',
	VNODE = 'VNode',
}

export class Instance implements PopupInstance {
	#core: PopupCore
	private _id: PopupInstanceId
	private _store: InstanceStore
	#vm?: ComponentInternalInstance
	#app?: App
	#vNode?: VNode
	#el?: Element
	get id() {
		return this._id
	}
	get renderType() {
		return this.#core.isRootComponentRegistered
			? InstanceRenderType.ROOT_COMPONENT
			: this.#core.config.debugMode
				? InstanceRenderType.APP
				: InstanceRenderType.VNODE
	}
	get store() {
		return this._store
	}
	constructor(
		core: PopupCore,
		options: InstanceOption,
		vm?: ComponentInternalInstance
	) {
		this._id = new InstanceId(core.instanceSeed)
		this.#core = core
		this.#vm = vm
		this._store = createStore(this._id, options)
	}
	mount(): PopupInstanceId {
		switch (this.renderType) {
			case InstanceRenderType.ROOT_COMPONENT:
				this.#mountByRootComponent()
				break
			case InstanceRenderType.APP:
				this.#mountByApp()
				break
			case InstanceRenderType.VNODE:
			default:
				this.#mountByVNode()
				break
		}

		this.#core.addInstance(this)

		return this.id
	}
	async unmount() {
		this._store.isBeforeUnmount.value = true

		await wait(this._store.animationDuration.value)

		switch (this.renderType) {
			case InstanceRenderType.ROOT_COMPONENT:
				this.#unmountByRootComponent()
				break
			case InstanceRenderType.APP:
				this.#unmountByApp()
				break
			case InstanceRenderType.VNODE:
			default:
				this.#unmountByVNode()
				break
		}

		this.#core.removeInstance(this)
	}
	#mountByRootComponent() {
		// 托管到根组件渲染，无需手动渲染
	}
	#mountByApp() {
		this.#el = document.createElement('div')

		this.#app = createApp(PopupInstance, { instance: this })

		const appContext = this.#getAppContext()

		this.#app._context.components = Object.create(appContext.components)
		this.#app._context.provides = Object.create(appContext.provides)
		this.#app._context.config = Object.create(appContext.config)
		this.#app._context.directives = Object.create(appContext.directives)
		this.#app._context.mixins = Object.create(appContext.mixins)

		this.#app!.mount(this.#el)

		this._store.parentElement.appendChild(this.#el)
	}
	#mountByVNode() {
		this.#el = document.createElement('div')

		this.#vNode = createVNode(PopupInstance, {
			instance: this,
		})

		const appContext = this.#getAppContext()

		this.#vNode.appContext = appContext

		render(this.#vNode!, this.#el)

		this._store.parentElement.appendChild(this.#el)
	}
	#getAppContext() {
		const appContext = this.#vm?.appContext || this.#core.app!._context

		if (this.#vm) {
			appContext.provides = (this.#vm as any).provides
		}

		return appContext
	}
	#unmountByRootComponent() {
		// 托管到根组件渲染，无需手动渲染
	}
	#unmountByApp() {
		this.#app!.unmount()

		this._store.parentElement.removeChild(this.#el!)
	}
	#unmountByVNode() {
		render(null, this.#el!)

		this._store.parentElement.removeChild(this.#el!)
	}
}
