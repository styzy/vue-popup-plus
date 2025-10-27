type DownloadOptions = {
	allowCrossOrigin?: boolean
	fileName?: string
	headers?: Record<string, string>
	onSuccess?: (fileName: string) => void
}

export function download(
	url: string,
	{
		allowCrossOrigin = false,
		fileName = getFileName(url),
		headers = {},
		onSuccess = () => {}
	}: DownloadOptions = {}
) {
	try {
		if (isSameOrigin(url)) {
			sameOriginDownload()
		} else {
			if (allowCrossOrigin) {
				crossOriginDownload()
			} else {
				window.open(url)
			}
		}
	} catch (error) {
		// eslint-disable-next-line
		console.error('free download error:\n', error)
	}

	// 同源下载
	function sameOriginDownload() {
		const el = document.createElement('a')
		el.setAttribute('download', fileName)
		// el.target = '_blank'
		el.href = url
		el.click()
		onSuccess(fileName)
	}

	// 跨域下载
	function crossOriginDownload() {
		let xhr: XMLHttpRequest
		try {
			xhr = new XMLHttpRequest()
		} catch (error) {
			throw new Error('当前浏览器不支持XMLHttpRequest，无法下载')
		}

		xhr.open('GET', url, true)
		xhr.responseType = 'blob'

		for (const headerName in headers) {
			if (Object.hasOwnProperty.call(headers, headerName)) {
				xhr.setRequestHeader(headerName, headers[headerName])
			}
		}

		xhr.onload = function () {
			if (xhr.status === 200) {
				const url = window.URL.createObjectURL(xhr.response),
					el = document.createElement('a')
				el.href = url
				el.download = fileName
				el.click()
				onSuccess(fileName)
			}
		}

		try {
			xhr.send()
		} catch (error) {
			return
		}
	}
}

function isSameOrigin(url: string) {
	const localUrl = new URL(window.location.href)
	try {
		const targetUrl = new URL(url)
		return localUrl.origin === targetUrl.origin
	} catch (error) {
		throw new Error(`错误的下载地址:${url}`)
	}
}

function getFileName(url: string) {
	return url.split('/')[url.split('/').length - 1] || ''
}
