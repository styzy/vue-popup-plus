import { Log, LogGroupItemType, type LogOption } from 'vue-popup-plus'
import { version } from '../version'

export class PluginLog extends Log {
	constructor({ group = [], ...options }: LogOption) {
		group.unshift({
			type: LogGroupItemType.Default,
			message: `预置插件版本号: ${version}`,
		})

		super({ group, ...options })
	}
}
