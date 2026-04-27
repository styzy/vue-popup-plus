import {
	PopupLog,
	PopupLogGroupItemType,
	type PopupLogOption,
} from 'vue-popup-plus'
import { version } from '../version'

export class PluginLog extends PopupLog {
	namespace = 'VuePopupPlusPluginPreset'
	constructor({ group = [], ...options }: PopupLogOption) {
		group.unshift({
			type: PopupLogGroupItemType.Info,
			title: '预置插件版本号',
			content: version,
			important: true,
		})

		super({ group, ...options })
	}
}
