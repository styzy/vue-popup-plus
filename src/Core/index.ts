import { Popup } from '@/Popup'
import { Controller } from '@/Controller'

export interface CoreOptions {
	el?: HTMLElement | string
	zIndex?: number
}

export class Core {
	#seed: number = 1
	#popups: { [key: string]: Popup } = {}
	#controller: Controller
	#el?: HTMLElement | string
	#zIndex: number
	get seed() {
		return this.#seed++
	}
	get controller() {
		return this.#controller
	}
	get el() {
		return this.#el
	}
	get zIndex() {
		return this.#zIndex++
	}
	constructor({ zIndex = 1000, el }: CoreOptions = {}) {
		this.#el = el
		this.#zIndex = zIndex
		this.#controller = new Controller(this)
	}
	addPopup(popup: Popup) {
		this.#popups[popup.id] = popup
	}
	getPopup(id: string): Popup | undefined {
		return this.#popups[id]
	}
	removePopup(popup: Popup) {
		delete this.#popups[popup.id]
	}
}
