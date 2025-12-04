import { version as _version } from '../../package.json'

export type Version = `${number}.${number}.${number}`

export const version = _version as Version
