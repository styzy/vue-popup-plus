import { type InjectionKey } from 'vue'
import { zhCN, type PLocale } from '../locales'

// 组件名称
export const P_COMPONENT_NAMES = {
	BUBBLE: 'PopupBubble',
	TOOLTIP: 'PopupTooltip',
} as const

// 内部组件名称
export const P_INSIDE_COMPONENT_NAMES = {
	ALBUM: 'PopupAlbum',
	ALERT: 'PopupAlert',
	ANCHOR_TRIGGER: 'PopupAnchorTrigger',
	ARROW_CONTAINER: 'PopupArrowContainer',
	BODY: 'PopupBody',
	BUTTON: 'PopupButton',
	BUTTON_GROUP: 'PopupButtonGroup',
	CONFIRM: 'PopupConfirm',
	DIALOG: 'PopupDialog',
	DRAWER: 'PopupDrawer',
	FOOTER: 'PopupFooter',
	HEADER: 'PopupHeader',
	HEADER_BUTTON: 'PopupHeaderButton',
	LAYOUT: 'PopupLayout',
	LOADING: 'PopupLoading',
	LOADING_ICON: 'PopupLoadingIcon',
	MESSAGE: 'PopupMessage',
	MESSAGE_GROUP: 'PopupMessageGroup',
	PROMPT: 'PopupPrompt',
	SKIN: 'PopupSkin',
	TOAST: 'PopupToast',
	WINDOW_RESIZE: 'PopupWindowResize',
} as const

// BEM 命名规范
export const P_BEM_CONFIG = {
	COMMON_SPERATOR: '-',
	ELEMENT_SPERATOR: '__',
	MODIFY_SPERATOR: '--',
	STATE_SPERATOR: 'is-',
}

// 注入键
const P_INJECT_KEYS = {
	NAMESPACE: Symbol('popup-namespace') as InjectionKey<string>,
	LOCALE: Symbol('popup-locale') as InjectionKey<PLocale>,
}

// 注入默认值
const P_INJECT_DEFAULT_VALUES = {
	NAMESPACE: 'popup',
	LOCALE: zhCN,
}

export const P_INJECTS = {
	NAMESPACE: [
		P_INJECT_KEYS.NAMESPACE,
		P_INJECT_DEFAULT_VALUES.NAMESPACE,
	] as const,
	LOCALE: [P_INJECT_KEYS.LOCALE, P_INJECT_DEFAULT_VALUES.LOCALE] as const,
}
