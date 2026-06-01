import { getCurrentInstance, hasInjectionContext, inject } from 'vue'
import { POPUP_COMPONENT_INJECTS } from '@core/CONSTANTS'
import {
	printLog,
	PopupLog,
	PopupLogType,
	PopupLogGroupItemType,
} from '@core/log'

/**
 * 获取弹出层视图计算样式
 *
 * - 如果当前组件不在弹出层内，则返回 `undefined`
 * - debugMode 为 `true` 时，会打印警告日志
 *
 * @returns 弹出层视图计算样式
 */
export function usePopupComputedStyle() {
	if (!hasInjectionContext()) {
		printLog(
			new PopupLog({
				type: PopupLogType.Error,
				caller: {
					name: 'usePopupComputedStyle()',
					type: 'Function',
					value: usePopupComputedStyle,
				},
				message: `获取弹出层计算样式失败，必须在 setup 函数中调用`,
			})
		)
		return undefined
	}

	const computedStyle = inject(
		POPUP_COMPONENT_INJECTS.COMPUTED_STYLE,
		undefined
	)
	const vm = getCurrentInstance()
	const componentName = vm?.type.name || '未知'

	if (computedStyle) {
		printLog(
			new PopupLog({
				type: PopupLogType.Info,
				caller: {
					name: 'usePopupComputedStyle()',
					type: 'Function',
					value: usePopupComputedStyle,
				},
				message: `获取弹出层计算样式成功，${componentName} 组件`,
				group: [
					{
						type: PopupLogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
					{
						type: PopupLogGroupItemType.Data,
						title: '弹出层计算样式',
						dataType: 'PopupViewComputedStyle',
						dataName: 'computedStyle',
						dataValue: computedStyle,
					},
				],
			})
		)
	} else {
		printLog(
			new PopupLog({
				type: PopupLogType.Warning,
				caller: {
					name: 'usePopupComputedStyle()',
					type: 'Function',
					value: usePopupComputedStyle,
				},
				message: `获取弹出层计算样式失败，${componentName} 组件不在弹出层内`,
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

	return computedStyle
}
