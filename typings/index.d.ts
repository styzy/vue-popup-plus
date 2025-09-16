import { App } from 'vue';
import { Component } from 'vue';
import { InjectionKey } from 'vue';
import { version } from '../package.json';

/**
 * 组件注入键类型
 */
declare type ComponentInjectKeys = {
    /**
     * 当前组件所在弹出层的实例ID，可用于销毁当前弹出层
     * @example
     * // 弹出层渲染的所有子代组件中
     * const instanceId = inject(POPUP_COMPONENT_INJECT_KEYS.INSTANCE_ID)
     *
     * // 销毁当前弹出层
     * this.$popup.destroy(instanceId)
     */
    INSTANCE_ID: InjectionKey<InstanceId>;
};

declare type CoreOptions = {
    /**
     * 弹出层 zIndex 基础值，默认为1000，每次生成弹出层时，除非 render() 方法传入 zIndex，否则使用此基础值，每次使用后会自动递增
     */
    zIndex?: number;
    /**
     * 弹出层控制器挂载在 Vue 实例上的属性名，默认为 $popup ，这在使用选项式API时可以在组件内通过this.$popup 访问控制器实例，如需自定义属性名，请参考如下代码：
     *
     * @example
     * // 初始化插件
     * createPopup({
     * 	prototypeName: '$customPopup'
     * })
     *
     * // 在组件内访问
     * this.$customPopup.render({
     * 	component: Demo,
     * })
     * @end
     * @important 注意，如果你使用 TypeScript，则自定义属性名称需要手动同步添加类型扩展，扩展代码可以放在一个 .ts 文件，或是一个影响整个项目的 *.d.ts 文件中。
     * @example
     * // 添加导出，没有该代码将无法有效扩展
     * export {}
     *
     * // 自定义扩展
     * declare module 'vue' {
     * 	interface ComponentCustomProperties {
     * 		$customPopup: VuePopupPlusController
     * 	}
     * }
     */
    prototypeName?: string;
};

/**
 * 创建一个弹出层控制器实例，该实例需要通过 app.use() 安装到Vue实例上才能使用
 * @param options 弹出层核心配置
 * @returns 弹出层控制器实例
 */
export declare function createPopup(options?: CoreOptions): PopupController;

declare class InstanceId implements PopupInstanceId {
    #private;
    get seed(): number;
    get name(): string;
    constructor(seed: number);
}

/**
 * 动画类型集合
 */
export declare const POPUP_ANIMATIONS: Readonly<PopupAnimationCollection>;

/**
 * 弹出层内部组件注入属性，在弹出层内部渲染的所有子代组件中，都可以通过 inject 注入弹出层所提供的相关参数
 */
export declare const POPUP_COMPONENT_INJECT_KEYS: Readonly<ComponentInjectKeys>;

/**
 * 动画类型集合类型
 */
declare interface PopupAnimationCollection {
    /**
     * 无动画
     */
    NONE: symbol;
    /**
     * 淡入淡出
     */
    FADE: symbol;
    /**
     * 缩放放大
     */
    SCALE_ENLARGE: symbol;
    /**
     * 缩放缩小
     */
    SCALE_SHRINK: symbol;
    /**
     * 顶部飞入
     */
    FLY_TOP: symbol;
    /**
     * 左侧飞入
     */
    FLY_LEFT: symbol;
    /**
     * 右侧飞入
     */
    FLY_RIGHT: symbol;
    /**
     * 底部飞入
     */
    FLY_BOTTOM: symbol;
}

declare interface PopupController extends PopupCustomController {
    /**
     * 渲染弹出层，返回弹出层实例id，可调用destroy(id)方法销毁弹出层
     * @param {RenderOptions} options - 渲染参数
     * @returns 弹出层实例id
     */
    render(options: RenderOptions): InstanceId;
    /**
     * 更新弹出层，可更新弹出层参数
     * @param {InstanceId} instanceId - 弹出层实例id
     * @param {UpdateOptions} options - 更新参数
     */
    update(instanceId: InstanceId, options: UpdateOptions): void;
    /**
     * 销毁弹出层
     * @param {InstanceId} instanceId - 弹出层实例id
     * @param {any} payload - 自定义负载参数，会作为参数传递给创建弹出层时的onUnmounted回调函数
     * @returns {Promise<void>}
     */
    destroy(instanceId: InstanceId, payload?: any): void;
    /* Excluded from this release type: install */
}

declare interface PopupCustomController {
}

/**
 * 实例 id 接口
 */
declare interface PopupInstanceId {
    /* Excluded from this release type: seed */
    /**
     * 实例 id 名称
     */
    name: Readonly<string>;
}

declare type RenderComponentOptions = {
    /**
     * 弹出层渲染的组件，想要创建一个弹出层，这个唯一必要的参数。它的值可以是一个同步组件，也可以是一个异步组件的 import() 函数。
     * @example
     * // 同步组件
     * import Demo from 'path/Demo.vue'
     * popup.render({
     * 	component: Demo,
     * })
     *
     * // 异步组件
     * popup.render({
     * 	component: () => import('path/Demo.vue'),
     * })
     */
    component: Component;
    /**
     * 弹出层渲染组件的 props ，会传递给弹出层组件
     */
    componentProps?: Record<string, any>;
    /**
     * 弹出层渲染之后的回调
     */
    onMounted?: () => void;
    /**
     * 弹出层关闭之后的回调，触发时会将destroy() 方法的负载参数 payload 作为参数传入
     */
    onUnmounted?: <T>(payload?: T) => void;
};

declare type RenderElement = HTMLElement | string;

declare type RenderExtraOptions = {
    /**
     * 弹出层挂载的元素，不指定时，默认挂载到 body 元素下
     */
    el?: RenderElement;
    /**
     * 弹出层是否显示遮罩层，默认值为 true
     */
    mask?: boolean;
    /**
     * 点击遮罩层是否关闭弹出层，默认值为 false ，仅在 mask 为 true 时有效
     */
    maskClickCloseEnabled?: boolean;
    /**
     * 弹出层是否自动隐藏窗口滚动条，默认值为 true
     */
    autoHideWindowScroll?: boolean;
};

declare type RenderOptions = RenderComponentOptions & RenderStyleOptions & RenderExtraOptions;

declare type RenderStyleOptions = {
    /**
     * 弹出层宽度，默认为 auto，即自适应，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
     * @example
     * // px
     * width: '300px',
     * // rem
     * width: '30rem',
     * // vw
     * width: '30vw',
     * // 百分比
     * width: '30%',
     * // css 动态计算
     * width: 'calc(50% + 20px)',
     * // css 变量
     * width: 'var(--width)',
     * // number 类型，方便计算，单位为 px
     * width: 300,
     */
    width?: string | number;
    /**
     * 弹出层最大宽度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
     * @example
     * // px
     * maxWidth: '300px',
     * // rem
     * maxWidth: '30rem',
     * // vw
     * maxWidth: '30vw',
     * // 百分比
     * maxWidth: '30%',
     * // css 动态计算
     * maxWidth: 'calc(50% + 20px)',
     * // css 变量
     * maxWidth: 'var(--width)',
     * // number 类型，方便计算，单位为 px
     * maxWidth: 300,
     */
    maxWidth?: string | number;
    /**
     * 弹出层最小宽度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
     * @example
     * // px
     * minWidth: '300px',
     * // rem
     * minWidth: '30rem',
     * // vw
     * minWidth: '30vw',
     * // 百分比
     * minWidth: '30%',
     * // css 动态计算
     * minWidth: 'calc(50% + 20px)',
     * // css 变量
     * minWidth: 'var(--width)',
     * // number 类型，方便计算，单位为 px
     * minWidth: 300,
     */
    minWidth?: string | number;
    /**
     * 弹出层高度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
     * @example
     * // px
     * height: '300px',
     * // rem
     * height: '30rem',
     * // vh
     * height: '30vh',
     * // 百分比
     * height: '30%',
     * // css 动态计算
     * height: 'calc(50% + 20px)',
     * // css 变量
     * height: 'var(--height)',
     * // number 类型，方便计算，单位为 px
     * height: 300,
     */
    height?: string | number;
    /**
     * 弹出层最大高度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
     * @example
     * // px
     * maxHeight: '300px',
     * // rem
     * maxHeight: '30rem',
     * // vh
     * maxHeight: '30vh',
     * // 百分比
     * maxHeight: '30%',
     * // css 动态计算
     * maxHeight: 'calc(50% + 20px)',
     * // css 变量
     * maxHeight: 'var(--height)',
     * // number 类型，方便计算，单位为 px
     * maxHeight: 300,
     */
    maxHeight?: string | number;
    /**
     * 弹出层最小高度，默认为 auto，支持 string 和 number 类型，string 类型更为灵活，number 类型方便计算
     * @example
     * // px
     * minHeight: '300px',
     * // rem
     * minHeight: '30rem',
     * // vh
     * minHeight: '30vh',
     * // 百分比
     * minHeight: '30%',
     * // css 动态计算
     * minHeight: 'calc(50% + 20px)',
     * // css 变量
     * minHeight: 'var(--height)',
     * // number 类型，方便计算，单位为 px
     * minHeight: 300,
     */
    minHeight?: string | number;
    /**
     * 弹出层动画时长，默认为 100 ，单位为 毫秒
     */
    animationDuration?: number;
    /**
     * 遮罩层动画类型，默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出，更多动画类型请查看 {@link PopupAnimationCollection}
     */
    maskAnimation?: symbol;
    /**
     * 视图层动画类型，默认为 POPUP_ANIMATIONS.FADE ，即淡入淡出，更多动画类型请查看 {@link PopupAnimationCollection}
     */
    viewAnimation?: symbol;
    /**
     * 弹出层 zIndex ，若不设置，则使用全局递增的 zIndex 值
     */
    zIndex?: number;
};

declare type UpdateOptions = Partial<Omit<RenderOptions, 'component' | 'el' | 'autoHideWindowScroll'>>;

/**
 * 获取弹出层控制器实例
 * @returns 弹出层控制器实例
 */
export declare function usePopup(): PopupController;

export { version }

export { }


declare module 'vue' {
    interface ComponentCustomProperties {
        $popup: PopupController;
    }
}
