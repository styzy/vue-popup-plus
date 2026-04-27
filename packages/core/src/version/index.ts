import { version as _version } from '../../package.json'

export type PopupVersion = `${number}.${number}.${number}`

export const version = _version as PopupVersion
