interface IPopupError {
	namespace: string
	message: string
}

export class PopupError extends Error implements IPopupError {
	namespace = 'VuePopupPlus'
	constructor(caller: string, message: string) {
		super()
		this.message = `[${this.namespace} error] ${caller}: ${message}`
	}
}

