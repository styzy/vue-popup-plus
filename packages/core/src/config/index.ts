import {
	defaultPrintLog,
	type PopupLogHandler,
	type LogFilter,
} from '@core/log'
import type { IConfig, PopupConfigOption, PopupZIndexGetter } from './types'

export * from './types'

export class Config implements IConfig {
	zIndex: number | PopupZIndexGetter
	autoDisableScroll: boolean
	prototypeName: string
	logHandler: PopupLogHandler
	logFilter?: LogFilter
	debugMode: boolean
	directives = {}
	#zIndexOffset = 0
	constructor({
		zIndex = 1000,
		prototypeName = '$popup',
		autoDisableScroll = true,
		logHandler = defaultPrintLog,
		logFilter,
		debugMode = false,
	}: PopupConfigOption = {}) {
		this.zIndex = zIndex
		this.autoDisableScroll = autoDisableScroll
		this.prototypeName = prototypeName
		this.logHandler = logHandler
		this.logFilter = logFilter
		this.debugMode = debugMode
	}
	nextZIndex(): number {
		if (typeof this.zIndex === 'function') {
			return this.zIndex()
		}
		return this.zIndex + this.#zIndexOffset++
	}
}
