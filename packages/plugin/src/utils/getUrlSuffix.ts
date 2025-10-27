export function getUrlSuffix(url: string) {
	return url.split('.')[url.split('.').length - 1] || ''
}
