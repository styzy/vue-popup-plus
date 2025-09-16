import { createApp, markRaw, type App } from 'vue'
import { createPinia, defineStore, type Pinia } from 'pinia'
import type {
	RenderComponentOptions,
	RenderExtraOptions,
	RenderStyleOptions,
} from '@/Controller'
import { InstanceId } from './id'
import {
	COMPONENT_INJECT_KEYS,
	INSIDE_COMPONENT_INJECT_KEYS,
} from '@/CONSTANTS'
import { wait } from '#'

import InstanceComponent from '@/Components/Popup.vue'

export type InstanceOptions = Required<
	RenderComponentOptions & RenderStyleOptions & RenderExtraOptions
>

export type InstanceStore = InstanceOptions & {
	isBeforeUnmount: boolean
}

export interface IInstance {
	id: InstanceId
	mount(): InstanceId
	unmount(payload?: any): Promise<void>
	updateStore(options: Partial<InstanceStore>): void
}

function createStore(
	id: InstanceId,
	{ component, ...options }: InstanceOptions
) {
	return defineStore(id.name as string, {
		state: (): InstanceStore => ({
			...options,
			component: markRaw(component),
			isBeforeUnmount: false,
		}),
	})()
}

export class Instance implements IInstance {
	static #pinia: Pinia
	#id: InstanceId
	#app: App
	#store
	get id() {
		return this.#id
	}
	constructor(seed: number, options: InstanceOptions) {
		this.#id = new InstanceId(seed)

		this.#app = createApp(InstanceComponent)
		this.#app.provide(COMPONENT_INJECT_KEYS.INSTANCE_ID, this.id)

		Instance.#pinia = Instance.#pinia || createPinia()
		this.#app.use(Instance.#pinia)
		this.#store = createStore(this.#id, options)
		this.#app.provide(
			INSIDE_COMPONENT_INJECT_KEYS.INSTANCE_STORE,
			this.#store
		)
	}
	mount(): InstanceId {
		this.#app.mount(this.#store.el)

		this.#store.onMounted()

		return this.id
	}
	async unmount(payload?: any) {
		this.#store.isBeforeUnmount = true

		await wait(this.#store.animationDuration)

		this.#app.unmount()
		this.#store.onUnmounted(payload)
	}
	updateStore(options: Partial<InstanceStore>): void {
		this.#store.$patch((state) => {
			Object.assign(state, options)
		})
	}
}

