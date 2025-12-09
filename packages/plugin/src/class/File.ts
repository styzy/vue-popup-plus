import { getUrlSuffix, typeOf } from 'utils'

export const enum FileType {
	/**
	 * 图片
	 */
	IMAGE = 'image',
	/**
	 * 视频
	 */
	VIDEO = 'video',
	/**
	 * pdf
	 */
	PDF = 'pdf',
	/**
	 * word
	 */
	WORD = 'word',
	/**
	 * excel
	 */
	EXCEL = 'excel',
	/**
	 * ppt
	 */
	PPT = 'ppt',
	/**
	 * 压缩包
	 */
	ZIP = 'zip',
	/**
	 * 文本
	 */
	TXT = 'txt',
	/**
	 * 可执行文件
	 */
	EXE = 'exe',
	/**
	 * 未知类型
	 */
	UNKNOWN = 'unknown',
}

const FILE_TYPES: Record<string, FileType> = {
	IMAGE: FileType.IMAGE,
	VIDEO: FileType.VIDEO,
	PDF: FileType.PDF,
	WORD: FileType.WORD,
	EXCEL: FileType.EXCEL,
	PPT: FileType.PPT,
	ZIP: FileType.ZIP,
	TXT: FileType.TXT,
	EXE: FileType.EXE,
	UNKNOWN: FileType.UNKNOWN,
}

type FileTypeSuffixMapType = Map<FileType, string[]>

const FILE_TYPE_SUFFIX_MAP: FileTypeSuffixMapType = new Map([
	[FILE_TYPES.IMAGE, [`jpg`, `jpeg`, `png`, `gif`]],
	[
		FILE_TYPES.VIDEO,
		[`mp4`, `flv`, `rmvb`, `wmv`, `mov`, `avi`, `mpeg`, `3gp`],
	],
	[FILE_TYPES.PDF, [`pdf`]],
	[FILE_TYPES.WORD, [`doc`, `docx`]],
	[FILE_TYPES.EXCEL, [`xls`, `xlsx`]],
	[FILE_TYPES.PPT, [`ppt`, `pptx`]],
	[
		FILE_TYPES.ZIP,
		[`zip`, `rar`, `tar`, `7z`, `gz`, `tgz`, `bz`, `bz2`, `tbz`],
	],
	[FILE_TYPES.TXT, [`txt`]],
	[FILE_TYPES.EXE, [`exe`]],
])

export interface IFile {
	/**
	 * 文件id
	 */
	id: string
	/**
	 * 文件地址
	 */
	url: string
	/**
	 * 文件名
	 */
	name: string
	/**
	 * 文件大小，单位：字节
	 */
	size: string
	/**
	 * 视频封面，仅视频文件该属性有值
	 */
	poster: string
	/**
	 * 创建时间
	 */
	createTime: string
	/**
	 * 文件后缀
	 */
	suffix: Readonly<string>
	/**
	 * 文件类型
	 */
	type: FileType
}

type FileRawObject = {
	mediaFormat?: number
	id: string
	url: string
	name?: string
	size: string
	poster: string
	createTime: string
}

type PhoneEventMedia = FileRawObject & {
	mediaFormat: number
	imgUrl: string
	videoUrl: string
}

export type FileSource = IFile | string | FileRawObject

export class File implements IFile {
	// 文件类型
	static FILE_TYPES = FILE_TYPES
	// 文件类型后缀映射
	static FILE_TYPE_SUFFIX_MAP = FILE_TYPE_SUFFIX_MAP
	// 文件id
	id = ''
	// 文件地址
	url = ''
	// 文件名
	name = ''
	// 文件大小
	size = ''
	// 视频封面，仅视频文件该属性有值
	poster = ''
	// 创建时间
	createTime = ''
	// 后缀
	get suffix() {
		return getUrlSuffix(this.url).toLowerCase()
	}
	// 类型
	get type() {
		for (const [type, suffixList] of FILE_TYPE_SUFFIX_MAP) {
			if (suffixList.some((_suffix) => _suffix === this.suffix)) {
				return type
			}
		}

		return FILE_TYPES.UNKNOWN
	}
	constructor(file: FileSource) {
		if (file instanceof File) return file

		switch (typeOf(file)) {
			case 'String':
				this.createdByUrl(file as string)
				break
			case 'Object':
				this.createdByObject(file as FileRawObject)
				break
			default:
				throw new Error(
					'[File]类实例化参数错误，仅支持String和Object类型。'
				)
		}
	}
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			url: this.url,
			size: this.size,
			poster: this.poster,
			createTime: this.createTime,
		}
	}
	private createdByUrl(url: string) {
		this.url = url
		this.name = this.getNameByUrl()
	}
	private createdByObject(file: FileRawObject) {
		if (file.mediaFormat) {
			this.createByPhoneEventMedia(file as PhoneEventMedia)
			return
		}

		this.id = file.id
		this.url = file.url
		this.name = file.name || this.getNameByUrl()
		this.size = file.size
		this.poster = file.poster
		this.createTime = file.createTime
	}
	private createByPhoneEventMedia(file: PhoneEventMedia) {
		switch (file.mediaFormat) {
			case 1:
				this.url = file.imgUrl
				this.name = this.getNameByUrl()
				break
			case 2:
				this.url = file.videoUrl
				this.name = this.getNameByUrl()
				this.poster = file.imgUrl
				break
			default:
				break
		}
	}
	private getNameByUrl() {
		return this.url.split('/')[this.url.split('/').length - 1] || ''
	}
}
