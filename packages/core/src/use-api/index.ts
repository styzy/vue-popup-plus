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

let _noContextController: IController

/**
 * 获取弹出层控制器
 *
 * - 必须先调用 `createPopupPlus()` 创建弹出层插件，才能使用该函数
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
			message: `调用 usePopup() 前请先调用 createPopupPlus() 创建弹出层插件实例`,
		})
		defaultPrintLog(log)
		throw new PopupError(log)
	}

	const vm = getCurrentInstance()

	let controller: IController

	if (vm) {
		controller = new Controller(core, vm || undefined)

		printLog(
			new Log({
				type: LogType.Info,
				caller: 'usePopup()',
				message: `创建弹出层控制器 ${controller.id} 成功，包含 ${vm?.type.name} 组件上下文`,
				group: [
					{
						type: LogGroupItemType.Info,
						title: '上下文组件',
						content: `${vm?.type.name}.vue`,
					},
					{
						type: LogGroupItemType.Info,
						title: '组件路径',
						content: vm?.type.__file,
					},
					{
						type: LogGroupItemType.Info,
						title: '组件实例',
						data: vm,
					},
				],
			})
		)
	} else {
		if (_noContextController) {
			controller = _noContextController
			printLog(
				new Log({
					type: LogType.Info,
					caller: 'usePopup()',
					message: `获取缓存弹出层控制器 ${controller.id} 成功，当前不在组件上下文中`,
				})
			)
		} else {
			controller = _noContextController = new Controller(core)
			printLog(
				new Log({
					type: LogType.Info,
					caller: 'usePopup()',
					message: `创建弹出层控制器 ${controller.id} 成功，不包含组件上下文`,
				})
			)
		}
	}

	return controller
}

// export function usePopupInstanceId(): InstanceId {}
