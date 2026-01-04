import DApi from './DApi.vue'
import DApiGird from './DApiGird.vue'
import DApiGroup from './DApiGroup.vue'
import DButton from './DButton.vue'
import DButtonGroup from './DButtonGroup.vue'
import DVersion from './DVersion.vue'
import DVersionPanel from './DVersionPanel.vue'
import DVersionSupport from './DVersionSupport.vue'

export const components = {
	DApi,
	DApiGird,
	DApiGroup,
	DButton,
	DButtonGroup,
	DVersion,
	DVersionPanel,
	DVersionSupport,
}

declare module 'vue' {
	export interface GlobalComponents {
		DApi: typeof DApi
		DApiGird: typeof DApiGird
		DApiGroup: typeof DApiGroup
		DButton: typeof DButton
		DButtonGroup: typeof DButtonGroup
		DVersion: typeof DVersion
		DVersionPanel: typeof DVersionPanel
		DVersionSupport: typeof DVersionSupport
	}
}
