/**
 * 等待
 * @param duration 等待时间，单位毫秒
 */
export function wait(duration = 0): Promise<void> {
	return new Promise((resolve) => {
		window.setTimeout(resolve, duration)
	})
}
