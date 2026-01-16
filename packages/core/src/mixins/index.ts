import { type ComponentInternalInstance, type ComponentOptions } from 'vue'
import { Controller } from '../controller'
import { type ICore } from '../core'
import { Log, LogType, LogGroupItemType, printLog } from '../log'
import { POPUP_COMPONENT_INJECTS } from '../CONSTANTS'

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

			let controller: Controller

			Object.defineProperty(this, core.config.prototypeName, {
				enumerable: true,
				configurable: false,
				get() {
					if (core.isRootComponentRegistered) {
						if (!core.noStateController) {
							core.noStateController = new Controller(core)
						}
						return core.noStateController
					}

					if (controller) return controller

					controller = new Controller(core, vm)

					const componentName = vm.type.name

					printLog(
						new Log({
							type: LogType.Success,
							caller: {
								name: `this.${core.config.prototypeName}`,
								type: 'Component',
								value: vm,
							},
							message: `创建控制器 ${controller.id} 成功，包含 ${componentName} 组件上下文`,
							group: [
								{
									type: LogGroupItemType.Component,
									title: '调用组件',
									instance: vm,
								},
								{
									type: LogGroupItemType.Data,
									title: '控制器',
									dataName: controller.id,
									dataType: 'IController',
									dataValue: controller,
								},
							],
						})
					)
					return controller
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
