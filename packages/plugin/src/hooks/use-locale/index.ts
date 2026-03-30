import { inject } from 'vue'
import { P_INJECTS } from '../../CONSTANTS'

export function useLocale() {
	const locale = inject(...P_INJECTS.LOCALE)
	return locale
}
