import DButton from './DButton.vue'
import DButtonGroup from './DButtonGroup.vue'
import DDemo from './DDemo.vue'

export const components = {
	DButton,
	DButtonGroup,
	DDemo,
}

declare module 'vue' {
	export interface GlobalComponents {
		DButton: typeof DButton
		DButtonGroup: typeof DButtonGroup
		DDemo: typeof DDemo
	}
}
