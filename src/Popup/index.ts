import { createApp, type App, type Component } from 'vue'
import { createPinia, defineStore, type Pinia } from 'pinia'
import PopupComponent from '@/Components/Popup.vue'
import { wait } from '#'

export interface PopupOptions {
	component: Component
	componentProps: Record<string, any>
	onMounted: () => void
	onUnmounted: <T>(payload?: T) => void
	mask: boolean
	maskClickCloseEnabled: boolean
	width: string | number
	maxWidth: string | number
	minWidth: string | number
	height: string | number
	maxHeight: string | number
	minHeight: string | number
	animationDuration: number
	maskAnimations: string[]
	viewAnimations: string[]
	zIndex: number
}

export interface PopupStore extends PopupOptions {
	isBeforeUnmount: boolean
}

function createStore(id: string, options: PopupOptions): PopupStore {
	return defineStore(`${id}-store`, {
		state: () => ({
			...options,
			isBeforeUnmount: false,
		}),
	})()
}

export class Popup {
	static #pinia: Pinia
	#id: string
	#app: App
	#store: PopupStore
	get id() {
		return this.#id
	}
	constructor(seed: number, options: PopupOptions) {
		this.#id = `vue-popup-plus-${seed}`

		this.#app = createApp(PopupComponent)
		this.#app.provide('popupId', this.id)

		Popup.#pinia = Popup.#pinia || createPinia()
		this.#app.use(Popup.#pinia)
		this.#store = createStore(this.#id, options)
		this.#app.provide('popupStore', this.#store)
	}
	mount(el?: HTMLElement | string): string {
		this.#app.mount(
			el || document.body.appendChild(document.createElement('div'))
		)

		this.#store.onMounted()

		return this.id
	}
	async unmount(payload?: any) {
		this.#store.isBeforeUnmount = true

		await wait(this.#store.animationDuration)

		this.#app.unmount()
		this.#store.onUnmounted(payload)
	}
}
