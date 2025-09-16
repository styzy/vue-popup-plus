import { createApp, markRaw, type App, type Component } from 'vue'
import { createPinia, defineStore, type Pinia } from 'pinia'
import type {
	RenderComponentOptions,
	RenderExtraOptions,
	RenderStyleOptions,
} from '@/Controller'
import {
	COMPONENT_INJECT_KEYS,
	INSIDE_COMPONENT_INJECT_KEYS,
} from '@/CONSTANTS'
import { wait } from '#'

import PopupComponent from '@/Components/Popup.vue'

export type PopupId = symbol

export type PopupOptions = Required<
	RenderComponentOptions & RenderStyleOptions & RenderExtraOptions
>

export type PopupStore = PopupOptions & {
	isBeforeUnmount: boolean
}

export interface IPopup {
	id: PopupId
	mount(): PopupId
	unmount(payload?: any): Promise<void>
	updateStore(options: Partial<PopupStore>): void
}

function createStore(id: PopupId, { component, ...options }: PopupOptions) {
	return defineStore(id.description as string, {
		state: (): PopupStore => ({
			...options,
			component: markRaw(component),
			isBeforeUnmount: false,
		}),
	})()
}

export class Popup implements IPopup {
	static #pinia: Pinia
	#id: PopupId
	#app: App
	#store
	get id() {
		return this.#id
	}
	constructor(seed: number, options: PopupOptions) {
		this.#id = Symbol(`vue-popup-plus-${seed}`)

		this.#app = createApp(PopupComponent)
		this.#app.provide(COMPONENT_INJECT_KEYS.POPUP_ID, this.id)

		Popup.#pinia = Popup.#pinia || createPinia()
		this.#app.use(Popup.#pinia)
		this.#store = createStore(this.#id, options)
		this.#app.provide(INSIDE_COMPONENT_INJECT_KEYS.POPUP_STORE, this.#store)
	}
	mount(): PopupId {
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
	updateStore(options: Partial<PopupStore>): void {
		this.#store.$patch((state) => {
			Object.assign(state, options)
		})
	}
}
