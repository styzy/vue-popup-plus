import DButton from './DButton.vue'
import DButtonGroup from './DButtonGroup.vue'
import DVersion from './DVersion.vue'
import DVersionPanel from './DVersionPanel.vue'
import DVersionSupport from './DVersionSupport.vue'

export const components = {
	DButton,
	DButtonGroup,
	DVersion,
	DVersionPanel,
	DVersionSupport,
}

declare module 'vue' {
	export interface GlobalComponents {
		DButton: typeof DButton
		DButtonGroup: typeof DButtonGroup
		DVersion: typeof DVersion
		DVersionPanel: typeof DVersionPanel
		DVersionSupport: typeof DVersionSupport
	}
}
