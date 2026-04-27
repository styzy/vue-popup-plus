import { version as coreVersion, type PopupVersion } from 'vue-popup-plus'
import { version as _version } from '../../package.json'

export const version = _version as PopupVersion

export const requiredCoreVersion = {
	min: toLowestVersion(coreVersion),
	max: toLooseVersion(coreVersion),
}

function toLowestVersion(version: PopupVersion): PopupVersion {
	const versionParts = version.split('.')
	versionParts.splice(2, 1, '0')
	return versionParts.join('.') as PopupVersion
}

function toLooseVersion(version: PopupVersion): PopupVersion {
	const versionParts = version.split('.')
	versionParts.splice(2, 1, 'x')
	return versionParts.join('.') as PopupVersion
}
