import { inject, ref, type InjectionKey, type Ref } from 'vue'

export type Skin = 'classic' | 'modern'

export const injectSkin = Symbol('skin') as InjectionKey<Ref<Skin>>

export function useSkin() {
	return inject(injectSkin, ref('modern'))
}
