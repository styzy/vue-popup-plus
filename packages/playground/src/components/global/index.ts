import {
	PButton,
	PButtonGroup,
} from '../../../../plugin/src/components/internal'

import GComponent from './GComponent.vue'
import GContainer from './GContainer.vue'
import GTitle from './GTitle.vue'
import GTools from './GTools.vue'
import GViewport from './GViewport.vue'

export const components = {
	GComponent,
	GContainer,
	GTitle,
	GTools,
	GViewport,
	PButtonGroup,
	PButton,
}

declare module 'vue' {
	export interface GlobalComponents {
		GComponent: typeof GComponent
		GContainer: typeof GContainer
		GTitle: typeof GTitle
		GTools: typeof GTools
		GViewport: typeof GViewport
		PButtonGroup: typeof PButtonGroup
		PButton: typeof PButton
	}
}
