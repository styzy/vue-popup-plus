import { getCurrentInstance, hasInjectionContext, inject } from 'vue'
import {
	printLog,
	PopupLog,
	PopupLogType,
	PopupLogGroupItemType,
} from '../../log'
import { POPUP_COMPONENT_INJECTS } from '../../CONSTANTS'

/**
 * 获取弹出层实例 ID
 *
 * - 如果当前组件不在弹出层内，则返回 `undefined`
 * - debugMode 为 `true` 时，会打印警告日志
 *
 * @returns 弹出层实例 ID
 */
export function usePopupInstanceId() {
	if (!hasInjectionContext()) {
		printLog(
			new PopupLog({
				type: PopupLogType.Error,
				caller: {
					name: 'usePopupInstanceId()',
					type: 'Function',
					value: usePopupInstanceId,
				},
				message: `获取弹出层实例ID失败，必须在 setup 函数中调用`,
			})
		)
		return undefined
	}

	const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID, undefined)
	const vm = getCurrentInstance()
	const componentName = vm?.type.name || '未知'

	if (instanceId) {
		printLog(
			new PopupLog({
				type: PopupLogType.Info,
				caller: {
					name: 'usePopupInstanceId()',
					type: 'Function',
					value: usePopupInstanceId,
				},
				message: `获取弹出层实例ID ${instanceId.name} 成功，${componentName} 组件`,
				group: [
					{
						type: PopupLogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
					{
						type: PopupLogGroupItemType.Data,
						title: '弹出层实例ID',
						dataType: 'PopupInstanceId',
						dataName: instanceId.name,
						dataValue: instanceId,
					},
				],
			})
		)
	} else {
		printLog(
			new PopupLog({
				type: PopupLogType.Warning,
				caller: {
					name: 'usePopupInstanceId()',
					type: 'Function',
					value: usePopupInstanceId,
				},
				message: `获取弹出层实例ID失败，${componentName} 组件不在弹出层内`,
				group: [
					{
						type: PopupLogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
				],
			})
		)
	}

	return instanceId
}
