import { inject, type InjectionKey } from 'vue'

export type Skin = 'classic' | 'modern'

export const injectSkin = Symbol('skin') as InjectionKey<Skin>

export function useSkin() {
	return inject(injectSkin, 'modern')
}
