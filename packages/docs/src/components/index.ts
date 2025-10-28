import DButton from './DButton.vue'
import DButtonGroup from './DButtonGroup.vue'
import DHeader from './DHeader.vue'
import DFooter from './DFooter.vue'

export const components = {
	DButton,
	DButtonGroup,
	DHeader,
	DFooter,
}

declare module 'vue' {
	export interface GlobalComponents {
		DButton: typeof DButton
		DButtonGroup: typeof DButtonGroup
		DHeader: typeof DHeader
		DFooter: typeof DFooter
	}
}
