import { ref, type Ref } from 'vue'

type Tools = {
	isExpand: Ref<boolean>
}

const _: { isExpand?: Tools['isExpand'] } = {}

export function useTools() {
	if (!_.isExpand) {
		_.isExpand = ref(true)
	}

	return {
		isExpand: _.isExpand,
	}
}
