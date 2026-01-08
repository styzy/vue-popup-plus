import {
	createApp,
	createVNode,
	reactive,
	ref,
	render,
	toRefs,
	type App,
	type ComponentInternalInstance,
	type ToRef,
	type VNode,
} from 'vue'
import { wait } from 'utils'
import { type ICore } from '../core'
import type {
	RenderComponentOptions,
	RenderConfigOptions,
	RenderStyleOptions,
} from '../controller'

import PopupInstance from '../components/PopupInstance.vue'

/**
 * 将对象的属性转换为 ref 类型
 */
type PropertiseToRef<T extends Record<string, any>> = {
	[K in keyof T]: ToRef<T[K]>
}

/**
 * 实例 id 接口
 */
interface IInstanceId {
	/**
	 * 生成该实例 id 的种子
	 *
	 * @internal
	 */
	seed: Readonly<number>
	/**
	 * 实例 id 名称
	 */
	name: Readonly<string>
}

interface IInstance {
	readonly id: InstanceId
	readonly renderType: RenderType
	mount(): InstanceId
	unmount(payload?: any): Promise<void>
}

type InstanceOptions = Required<
	RenderComponentOptions & RenderConfigOptions & RenderStyleOptions
>

type InstanceState = {
	isBeforeUnmount: boolean
}

export type InstanceStore = PropertiseToRef<
	Required<RenderStyleOptions & InstanceState>
> &
	Required<RenderConfigOptions & RenderComponentOptions> & {
		id: InstanceId
		parentElement: Element
	}

interface ICreateStore {
	(id: InstanceId, options: InstanceOptions): InstanceStore
}

const createStore: ICreateStore = (
	id,
	{
		component,
		componentProps,
		onMounted,
		onUnmounted,
		appendTo,
		mask,
		maskDestroy,
		disableScroll,
		...options
	}
) => {
	return {
		id,
		parentElement: getParentElement(appendTo),
		appendTo,
		mask,
		maskDestroy,
		disableScroll,
		component,
		componentProps,
		onMounted,
		onUnmounted,
		isBeforeUnmount: ref(false),
		...toRefs(reactive(options)),
	}
}

function getParentElement(appendTo: Element | string) {
	if (typeof appendTo === 'string') {
		appendTo = document.querySelector(appendTo) || document.body
	}
	return appendTo
}

export class InstanceId implements IInstanceId {
	private _seed: number
	get seed() {
		return this._seed
	}
	get name() {
		return `popup-instance-${this.seed}`
	}
	constructor(seed: number) {
		this._seed = seed
	}
}

export const enum RenderType {
	ROOT_COMPONENT = 'RootComponent',
	APP = 'App',
	VNODE = 'VNode',
}

export class Instance implements IInstance {
	#core: ICore
	private _id: InstanceId
	private _store: InstanceStore
	readonly renderType: RenderType
	#vm?: ComponentInternalInstance
	#app?: App
	#vNode?: VNode
	#el?: Element
	get id() {
		return this._id
	}
	get store() {
		return this._store
	}
	constructor(
		core: ICore,
		options: InstanceOptions,
		vm?: ComponentInternalInstance
	) {
		this._id = new InstanceId(core.seed)
		this._store = createStore(this._id, options)
		this.#core = core
		this.#vm = vm
		this.renderType = core.isRootComponentRegistered
			? RenderType.ROOT_COMPONENT
			: core.config.debugMode
				? RenderType.APP
				: RenderType.VNODE
	}
	mount(): InstanceId {
		switch (this.renderType) {
			case RenderType.ROOT_COMPONENT:
				this.#mountByRootComponent()
				break
			case RenderType.APP:
				this.#mountByApp()
				break
			case RenderType.VNODE:
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
			case RenderType.ROOT_COMPONENT:
				this.#unmountByRootComponent()
				break
			case RenderType.APP:
				this.#unmountByApp()
				break
			case RenderType.VNODE:
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

		this.#app = createApp(PopupInstance, { store: this._store })

		const appContext = this.#getAppContext()

		this.#app._context.components = appContext.components
		this.#app._context.provides = appContext.provides
		this.#app._context.config = appContext.config
		this.#app._context.directives = appContext.directives
		this.#app._context.mixins = appContext.mixins

		this.#app!.mount(this.#el)

		this._store.parentElement.appendChild(this.#el)
	}
	#mountByVNode() {
		this.#el = document.createElement('div')

		this.#vNode = createVNode(PopupInstance, {
			store: this._store,
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
