import DButton from './DButton.vue'
import DButtonGroup from './DButtonGroup.vue'

export const components = {
	DButton,
	DButtonGroup,
}

declare module 'vue' {
	export interface GlobalComponents {
		DButton: typeof DButton
		DButtonGroup: typeof DButtonGroup
	}
}
