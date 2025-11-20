import DButton from './DButton.vue'
import DButtonGroup from './DButtonGroup.vue'
import DVersion from './DVersion.vue'

export const components = {
	DButton,
	DButtonGroup,
	DVersion,
}

declare module 'vue' {
	export interface GlobalComponents {
		DButton: typeof DButton
		DButtonGroup: typeof DButtonGroup
		DVersion: typeof DVersion
	}
}
