import { getCurrentInstance, hasInjectionContext, inject } from 'vue'
import {
	defaultPrintLog,
	printLog,
	Log,
	LogType,
	LogGroupItemType,
} from '../log'
import { Controller, type IController } from '../controller'
import { getCore } from '../core'
import { PopupError } from '../error'
import { type InstanceId } from '../instance'

/**
 * 获取弹出层控制器实例
 *
 * - 必须先调用 {@link createPopup} 创建弹出层插件，才能使用该函数
 * ，否则会抛出异常
 *
 * @returns 弹出层控制器实例
 */
export function usePopup(): IController {
	const core = getCore()

	if (!core) {
		const log = new Log({
			type: LogType.Error,
			caller: 'usePopup()',
			message: `调用 usePopup() 前请先调用 createPopup() 创建弹出层控制器实例`,
		})
		defaultPrintLog(log)
		throw new PopupError(log)
	}
	const vm = getCurrentInstance()
	console.log('vm: ', vm)

	const controller = new Controller(core, vm || undefined)

	printLog(
		new Log({
			type: LogType.Success,
			caller: 'usePopup()',
			message: `创建弹出层控制器实例 ${controller.id} 成功`,
			group: [
				{
					type: LogGroupItemType.Default,
					message: `上下文组件名称：${vm?.type.name}`,
				},
				{
					type: LogGroupItemType.Default,
					message: `上下文组件路径：\n${vm?.type.__file}`,
				},
			],
		})
	)

	return controller
}

// export function usePopupInstanceId(): InstanceId {}
