import {
	createApp,
	createVNode,
	Fragment,
	getCurrentInstance,
	markRaw,
	reactive,
	ref,
	render,
	toRefs,
	type App,
	type Component,
	type Raw,
	type ToRef,
	type VNode,
} from 'vue'
import { createPinia, defineStore, type Pinia, type Store } from 'pinia'
import type { Core } from '../core'
import type {
	RenderComponentOptions,
	RenderConfigOptions,
	RenderStyleOptions,
	UpdateOptions,
} from '../controller'
import {
	POPUP_COMPONENT_INJECTS,
	POPUP_INSIDE_COMPONENT_INJECTS,
} from '../CONSTANTS'
import { wait } from '../utils'

import InstanceComponent from '../components/Popup.vue'

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
	 * @internal
	 */
	seed: Readonly<number>
	/**
	 * 实例 id 名称
	 */
	name: Readonly<string>
}

interface IInstance {
	id: InstanceId
	mount(): InstanceId
	unmount(payload?: any): Promise<void>
	update(options: UpdateOptions): void
}

type InstanceOptions = Required<
	RenderConfigOptions & RenderComponentOptions & RenderStyleOptions
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
		maskClickCloseEnabled,
		disableScroll,
		...options
	}
) => {
	return {
		id,
		parentElement: getParentElement(appendTo),
		appendTo,
		mask,
		maskClickCloseEnabled,
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
	#seed: number
	get seed() {
		return this.#seed
	}
	get name() {
		return `vue-popup-plus-instance-${this.seed}`
	}
	constructor(seed: number) {
		this.#seed = seed
	}
}

const enum RenderType {
	APP = 'app',
	VNODE = 'vnode',
}

export class Instance implements IInstance {
	#core: Core
	#id: InstanceId
	#store: InstanceStore
	#app?: App
	#vNode?: VNode
	#el?: Element
	get id() {
		return this.#id
	}
	get renderType() {
		return this.#core.config.debugMode ? RenderType.APP : RenderType.VNODE
	}
	constructor(core: Core, options: InstanceOptions) {
		this.#core = core
		this.#id = new InstanceId(core.seed)
		this.#store = createStore(this.#id, options)

		if (this.renderType === RenderType.APP) {
			this.#app = createApp(InstanceComponent, { store: this.#store })
			this.#app._context.components = this.#core.app!._context.components
			this.#app._context.provides = this.#core.app!._context.provides
			this.#app._context.config = this.#core.app!._context.config
			this.#app._context.directives = this.#core.app!._context.directives
			this.#app._context.mixins = this.#core.app!._context.mixins
		} else {
			this.#vNode = createVNode(InstanceComponent, { store: this.#store })
			this.#vNode.appContext = this.#core.app!._context
			this.#vNode.appContext.components.Popup = InstanceComponent
		}
	}
	mount(): InstanceId {
		this.#el = document.createElement('div')

		if (this.renderType === RenderType.APP) {
			this.#app!.mount(this.#el)
		} else {
			render(this.#vNode!, this.#el)
		}

		this.#store.parentElement.appendChild(this.#el)

		this.#store.onMounted()

		return this.id
	}
	async unmount(payload?: any) {
		this.#store.isBeforeUnmount.value = true

		await wait(this.#store.animationDuration.value)

		if (this.renderType === RenderType.APP) {
			this.#app!.unmount()
		} else {
			render(null, this.#el!)
			this.#store.parentElement.removeChild(this.#el!)
		}

		this.#store.onUnmounted(payload)
	}
	update(options: UpdateOptions): void {
		for (const _key in options) {
			const key = _key as keyof UpdateOptions
			const value =
				options[key] === undefined
					? this.#store[key].value
					: options[key]
			this.#store[key].value = value
		}
	}
}

