import { getCurrentInstance } from 'vue'
import { defaultPrintLog, PopupLog, PopupLogType } from '../../log'
import { createController, type PopupController } from '../../controller'
import { getCore } from '../../core'
import { PopupError } from '../../error'

/**
 * 获取弹出层控制器
 *
 * - 必须先调用 `createPopupPlus()` 创建弹出层插件，才能使用该函数
 * ，否则会抛出异常
 *
 * @returns 弹出层控制器实例
 */
export function usePopup(): PopupController {
	const log = new PopupLog({
		type: PopupLogType.Success,
		caller: {
			name: 'usePopup()',
			type: 'Function',
			value: usePopup,
		},
	})

	const core = getCore()

	if (!core) {
		log.type = PopupLogType.Error
		log.message = `调用 usePopup() 前请先调用 createPopupPlus() 创建弹出层插件实例`

		defaultPrintLog(log)

		throw new PopupError(log)
	}

	const vm = getCurrentInstance()

	return createController(core, vm, log)
}
