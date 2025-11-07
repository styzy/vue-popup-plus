import DButton from './DButton.vue'
import DButtonGroup from './DButtonGroup.vue'
import HelloWorld from '../../../src/guide/HelloWorld.vue'

export const components = {
	DButton,
	DButtonGroup,
	HelloWorld,
}

declare module 'vue' {
	export interface GlobalComponents {
		DButton: typeof DButton
		DButtonGroup: typeof DButtonGroup
		HelloWorld: typeof HelloWorld
	}
}
