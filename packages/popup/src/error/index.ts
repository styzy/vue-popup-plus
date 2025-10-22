export class PopupError extends Error {
	constructor(message: string) {
		super(message)
	}
	toString() {
		return `vue-popup-plus error: ${this.message}`
	}
}
