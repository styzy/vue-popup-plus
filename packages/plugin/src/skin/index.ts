import { inject, ref, type InjectionKey, type Ref } from 'vue'

export type PopupSkin = 'classic' | 'modern'

export const injectSkin = Symbol('skin') as InjectionKey<Ref<PopupSkin>>

export function useSkin() {
	return inject(injectSkin, ref('modern'))
}
