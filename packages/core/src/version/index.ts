import { version as _version } from '../../package.json'

type ReleaseVersion = `${number}.${number}.${number}`

type PreReleaseTag = 'alpha' | 'beta' | 'rc' | 'next'

type PreReleaseVersion = `${ReleaseVersion}-${PreReleaseTag}.${number}`

export type PopupVersion = ReleaseVersion | PreReleaseVersion

export const version = _version as PopupVersion
