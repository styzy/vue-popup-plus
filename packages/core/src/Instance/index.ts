import {
	createApp,
	createVNode,
	reactive,
	ref,
	render,
	toRefs,
	type App,
	type ToRef,
	type VNode,
} from 'vue'
import type { Core } from '../core'
import type {
	RenderComponentOptions,
	RenderConfigOptions,
	RenderStyleOptions,
	UpdateOption,
} from '../controller'
import { wait } from 'utils'

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
	update(options: UpdateOption): void
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
		maskClickClose,
		disableScroll,
		...options
	}
) => {
	return {
		id,
		parentElement: getParentElement(appendTo),
		appendTo,
		mask,
		maskClickClose,
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
		return `vue-popup-plus-instance-${this.seed}`
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
	#core: Core
	private _id: InstanceId
	private _store: InstanceStore
	readonly renderType: RenderType
	#app?: App
	#vNode?: VNode
	#el?: Element
	get id() {
		return this._id
	}
	get store() {
		return this._store
	}
	constructor(core: Core, options: InstanceOptions) {
		this.#core = core
		this._id = new InstanceId(core.seed)
		this._store = createStore(this._id, options)
		this.renderType = core.isRootComponentRegistered
			? RenderType.ROOT_COMPONENT
			: core.config.debugMode
				? RenderType.APP
				: RenderType.VNODE
	}
	mount(): InstanceId {
		if (this.renderType === RenderType.APP) {
			this.#el = document.createElement('div')

			this.#app = createApp(PopupInstance, { store: this._store })
			this.#app._context.components = this.#core.app!._context.components
			this.#app._context.provides = this.#core.app!._context.provides
			this.#app._context.config = this.#core.app!._context.config
			this.#app._context.directives = this.#core.app!._context.directives
			this.#app._context.mixins = this.#core.app!._context.mixins

			this.#app!.mount(this.#el)

			this._store.parentElement.appendChild(this.#el)
		} else if (this.renderType === RenderType.VNODE) {
			this.#el = document.createElement('div')

			this.#vNode = createVNode(PopupInstance, {
				store: this._store,
			})
			this.#vNode.appContext = this.#core.app!._context
			this.#vNode.appContext.components.Popup = PopupInstance

			render(this.#vNode!, this.#el)

			this._store.parentElement.appendChild(this.#el)
		} else {
			// 托管到根组件渲染，无需手动渲染
		}

		this.#core.addInstance(this)

		this._store.onMounted()

		return this.id
	}
	async unmount(payload?: any) {
		this._store.isBeforeUnmount.value = true

		await wait(this._store.animationDuration.value)

		if (this.renderType === RenderType.APP) {
			this.#app!.unmount()

			this._store.parentElement.removeChild(this.#el!)
		} else if (this.renderType === RenderType.VNODE) {
			render(null, this.#el!)

			this._store.parentElement.removeChild(this.#el!)
		} else {
			// 托管到根组件渲染，无需手动渲染
		}

		this.#core.removeInstance(this)

		this._store.onUnmounted(payload)
	}
	update(options: UpdateOption): void {
		for (const _key in options) {
			const key = _key as keyof UpdateOption
			const value =
				options[key] === undefined
					? this._store[key].value
					: options[key]
			this._store[key].value = value
		}
	}
}
