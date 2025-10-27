import { album } from './album'
import { alert } from './alert'
import { confirm } from './confirm'
import { dialog } from './dialog'
import { loading } from './loading'
import { prompt } from './prompt'
import { toast } from './toast'

export type { IAlbum } from './album'
export type { IAlert } from './alert'
export type { IConfirm } from './confirm'
export type { IDialog } from './dialog'
export type { ILoading } from './loading'
export type { IPrompt } from './prompt'
export type { IToast } from './toast'

export const plugins = [album, alert, confirm, dialog, loading, prompt, toast]
