import {
	type AllowedComponentProps,
	type AsyncComponentLoader,
	type Component,
	type ComputedRef,
	type VNodeProps,
} from 'vue'

type WithDefaultProps<T> =
	T extends Record<string, any> ? T : Record<string, any>

/**
 * 提取组件的 props 所允许的所有类型
 *
 * - 相较于 `ExtractComponentPropTypes` 返回的类型，还提供了底层对 `VNodeProps`
 *  和 `AllowedComponentProps` 类型属性的支持
 * - 支持同步组件和异步组件
 * - 对于异步组件，除了支持 `defineAsyncComponent` 方法定义组件，还支持直接传入
 *   ()=>import() 函数。
 */
export type ExtractComponentAllPropTypes<
	TComponent extends Component = Component,
> = WithDefaultProps<
	TComponent extends new () => {
		$props: infer TProps
	}
		? TProps
		: TComponent extends AsyncComponentLoader
			? InstanceType<Awaited<ReturnType<TComponent>>['default']>['$props']
			: Record<string, any>
>

/**
 * 提取组件的 props 类型
 *
 * - 包含组件自定义的属性类型以及通过 `ComponentCustomProps` 接口定义的全局属性类型
 * - 支持同步组件和异步组件
 * - 对于异步组件，除了支持 `defineAsyncComponent` 方法定义组件，还支持直接传入
 *   ()=>import() 函数。
 */
export type ExtractComponentPropTypes<
	TComponent extends Component = Component,
> = Omit<
	ExtractComponentAllPropTypes<TComponent>,
	keyof (VNodeProps & AllowedComponentProps)
>

export type ComputedStyle = ComputedRef<{
	/**
	 * 弹出层的宽度
	 */
	width: number
	/**
	 * 弹出层的高度
	 */
	height: number
	/**
	 * 弹出层的 z-index
	 */
	zIndex: number
	/**
	 * 弹出层的 translateX
	 */
	translateX: number
	/**
	 * 弹出层的 translateY
	 */
	translateY: number
}>
