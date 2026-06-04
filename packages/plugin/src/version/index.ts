import { version as coreVersion, type PopupVersion } from 'vue-popup-plus'
import { version as _version } from '../../package.json'

type VersionMeta = {
	primary: number
	minor: number
	patch: number
	tag?: string
	tagNumber?: number
	toString(): PopupVersion
}

export const version = _version as PopupVersion

export const requiredCoreVersion = {
	min: toLowestVersion(coreVersion),
	max: toLooseVersion(coreVersion),
}

function toLowestVersion(version: PopupVersion): PopupVersion {
	const meta = createVersionMeta(version)
	if (meta.tag) {
		meta.tagNumber = 1
	} else {
		meta.patch = 0
	}
	return meta.toString()
}

function toLooseVersion(version: PopupVersion): PopupVersion {
	const meta = createVersionMeta(version)
	if (meta.tag) {
		meta.tagNumber = Infinity
	} else {
		meta.patch = Infinity
	}
	return meta.toString()
}

function createVersionMeta(version: PopupVersion): VersionMeta {
	const parts = version.split('-')
	const versionString = parts[0]

	const versionParts = versionString.split('.')
	const primary = parseInt(versionParts[0])
	const minor = parseInt(versionParts[1])
	const patch = parseInt(versionParts[2])

	const tagString = parts[1]
	const tagParts = tagString ? tagString.split('.') : []
	const tag = tagString ? tagParts[0] : undefined
	const tagNumber = tagString ? parseInt(tagParts[1]) : undefined
	return {
		primary,
		minor,
		patch,
		tag,
		tagNumber,
		toString() {
			if (this.tag && this.tagNumber) {
				return `${this.primary}.${this.minor}.${this.patch}-${this.tag}.${this.tagNumber}`
			}
			return `${this.primary}.${this.minor}.${this.patch}`
		},
	}
}
