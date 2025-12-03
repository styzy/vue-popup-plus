type ErrorOption = {
	module?: string
}

export class PopupError extends Error {
	#module: string
	constructor(message: string, { module = 'core' }: ErrorOption = {}) {
		super(message)
		this.#module = module
	}
	toString() {
		return `[vue-popup-plus] [${this.#module}] error: ${this.message}`
	}
}
