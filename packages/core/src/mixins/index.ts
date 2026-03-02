import { type ComponentInternalInstance, type ComponentOptions } from 'vue'
import { createController, type IController } from '../controller'
import { type ICore } from '../core'
import { type InstanceId } from '../instance'
import { Log, LogType, LogGroupItemType, printLog } from '../log'
import { type ComputedStyle } from '../typings'
import { POPUP_COMPONENT_INJECTS } from '../CONSTANTS'

declare module 'vue' {
	interface ComponentCustomProperties {
		/**
		 * 当前组件的弹出层控制器
		 *
		 * - 该控制器包含当前组件的上下文
		 */
		$popup: IController
		/**
		 * 当前组件所在弹出层的实例 ID
		 *
		 * - 如果当前组件不在弹出层内，则返回 `undefined`
		 */
		$popupInstanceId: InstanceId | undefined
		/**
		 * 当前组件所在弹出层的视图计算样式
		 *
		 * - 如果当前组件不在弹出层内，则返回 `undefined`
		 */
		$popupComputedStyle: ComputedStyle | undefined
	}
}

export function createMixins(core: ICore): ComponentOptions {
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
					const log = new Log({
						type: LogType.Success,
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
						new Log({
							type: LogType.Warning,
							caller: {
								name: `this.${core.config.prototypeName}`,
								type: 'Component',
								value: vm,
							},
							message: `${core.config.prototypeName} 是只读属性，无法赋值`,
							group: [
								{
									type: LogGroupItemType.Component,
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
