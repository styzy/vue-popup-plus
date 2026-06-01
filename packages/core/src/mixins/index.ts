import { type ComponentInternalInstance, type ComponentOptions } from 'vue'
import { POPUP_COMPONENT_INJECTS } from '@core/CONSTANTS'
import { createController, type PopupController } from '@core/controller'
import { type PopupCore } from '@core/core'
import { type PopupInstanceId } from '@core/instance'
import {
	PopupLog,
	PopupLogType,
	PopupLogGroupItemType,
	printLog,
} from '@core/log'
import { type PopupViewComputedStyle } from '@core/typings'

declare module 'vue' {
	interface ComponentCustomProperties {
		/**
		 * 当前组件的弹出层控制器
		 *
		 * - 该控制器包含当前组件的上下文
		 */
		$popup: PopupController
		/**
		 * 当前组件所在弹出层的实例 ID
		 *
		 * - 如果当前组件不在弹出层内，则返回 `undefined`
		 */
		$popupInstanceId: PopupInstanceId | undefined
		/**
		 * 当前组件所在弹出层的视图计算样式
		 *
		 * - 如果当前组件不在弹出层内，则返回 `undefined`
		 */
		$popupComputedStyle: PopupViewComputedStyle | undefined
	}
}

export function createMixins(core: PopupCore): ComponentOptions {
	return {
		inject: {
			$popupInstanceId: {
				from: POPUP_COMPONENT_INJECTS.INSTANCE_ID,
				default: undefined,
			},
			$popupComputedStyle: {
				from: POPUP_COMPONENT_INJECTS.COMPUTED_STYLE,
				default: undefined,
			},
		},
		created() {
			const vm: ComponentInternalInstance = this.$

			Object.defineProperty(this, core.config.prototypeName, {
				enumerable: true,
				configurable: false,
				get() {
					const log = new PopupLog({
						type: PopupLogType.Success,
						caller: {
							name: `this.${core.config.prototypeName}`,
							type: 'Component',
							value: vm,
						},
					})

					return createController(core, vm, log)
				},
				set() {
					printLog(
						new PopupLog({
							type: PopupLogType.Warning,
							caller: {
								name: `this.${core.config.prototypeName}`,
								type: 'Component',
								value: vm,
							},
							message: `${core.config.prototypeName} 是只读属性，无法赋值`,
							group: [
								{
									type: PopupLogGroupItemType.Component,
									title: '调用组件',
									instance: vm,
								},
							],
						})
					)
				},
			})
		},
	}
}
