import { getCurrentInstance, hasInjectionContext, inject } from 'vue'
import { printLog, Log, LogType, LogGroupItemType } from '../../log'
import { POPUP_COMPONENT_INJECTS } from '../../CONSTANTS'

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
			new Log({
				type: LogType.Error,
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
			new Log({
				type: LogType.Info,
				caller: {
					name: 'usePopupComputedStyle()',
					type: 'Function',
					value: usePopupComputedStyle,
				},
				message: `获取弹出层计算样式成功，${componentName} 组件`,
				group: [
					{
						type: LogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
					{
						type: LogGroupItemType.Data,
						title: '弹出层计算样式',
						dataType: 'ComputedStyle',
						dataName: 'computedStyle',
						dataValue: computedStyle,
					},
				],
			})
		)
	} else {
		printLog(
			new Log({
				type: LogType.Warning,
				caller: {
					name: 'usePopupComputedStyle()',
					type: 'Function',
					value: usePopupComputedStyle,
				},
				message: `获取弹出层计算样式失败，${componentName} 组件不在弹出层内`,
				group: [
					{
						type: LogGroupItemType.Component,
						title: '调用组件',
						instance: vm,
					},
				],
			})
		)
	}

	return computedStyle
}
