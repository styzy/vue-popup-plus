import { version as coreVersion, type Version } from 'vue-popup-plus'
import { version as _version } from '../../package.json'

export const version = _version as Version

export const requiredCoreVersion = {
	min: toLowestVersion(coreVersion),
	max: toLooseVersion(coreVersion),
}

function toLowestVersion(version: Version): Version {
	const versionParts = version.split('.')
	versionParts.splice(2, 1, '0')
	return versionParts.join('.') as Version
}

function toLooseVersion(version: Version): Version {
	const versionParts = version.split('.')
	versionParts.splice(2, 1, 'x')
	return versionParts.join('.') as Version
}
