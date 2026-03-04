import GComponent from './GComponent.vue'
import GContainer from './GContainer.vue'
import GTitle from './GTitle.vue'
import GTools from './GTools.vue'
import PButtonGroup from '../../../../plugin/src/components/PButtonGroup.vue'
import PButton from '../../../../plugin/src/components/PButton.vue'

export const components = {
	GComponent,
	GContainer,
	GTitle,
	GTools,
	PButtonGroup,
	PButton,
}

declare module 'vue' {
	export interface GlobalComponents {
		GComponent: typeof GComponent
		GContainer: typeof GContainer
		GTitle: typeof GTitle
		GTools: typeof GTools
		PButtonGroup: typeof PButtonGroup
		PButton: typeof PButton
	}
}
