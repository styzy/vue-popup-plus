import DButton from './DButton.vue'
import DHeader from './DHeader.vue'
import DFooter from './DFooter.vue'

export const components = {
	DButton,
	DHeader,
	DFooter,
}

declare module 'vue' {
	export interface GlobalComponents {
		DButton: typeof DButton
		DHeader: typeof DHeader
		DFooter: typeof DFooter
	}
}
