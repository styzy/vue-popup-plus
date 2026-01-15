import { type Version } from 'vue-popup-plus'
import { version as _version } from '../../package.json'

export const version = _version as Version

export function toLooseVersion(version: Version): Version {
	const versionParts = version.split('.')
	return versionParts.join('.') as Version
}
