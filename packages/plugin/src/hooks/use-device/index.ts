import { computed, onScopeDispose, ref, type ComputedRef, type Ref } from 'vue'

const _: {
	subscriberCount: number
	debounceTimer: number | null
	deviceWidth: Ref<number>
	deviceHeight: Ref<number>
} = {
	subscriberCount: 0,
	debounceTimer: null,
	deviceWidth: ref(0),
	deviceHeight: ref(0),
}

export interface IDevice {
	readonly isMobile: ComputedRef<boolean>
}

export function useDevice(): IDevice {
	if (_.subscriberCount === 0) {
		_.deviceWidth.value = window.innerWidth
		_.deviceHeight.value = window.innerHeight
		window.addEventListener('resize', handleSizeChange)
	}

	_.subscriberCount++

	onScopeDispose(() => {
		_.subscriberCount--
		if (_.subscriberCount <= 0) {
			_.subscriberCount = Math.max(0, _.subscriberCount)
			window.removeEventListener('resize', handleSizeChange)
		}
	})

	return {
		isMobile: computed(() => _.deviceWidth.value < 768),
	}
}

function handleSizeChange() {
	if (_.debounceTimer) window.clearTimeout(_.debounceTimer)

	_.debounceTimer = window.setTimeout(() => {
		_.debounceTimer = null
		_.deviceWidth.value = window.innerWidth
		_.deviceHeight.value = window.innerHeight
	}, 100)
}
