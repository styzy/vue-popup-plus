<template lang="pug">
.popup-media-album(:class="`is-skin-${skin}`" @dblclick="handlePureExit()")
	.media(@wheel="handleImageMouseScale($event)")
		template(v-for="(media, mediaIndex) in mediaList")
			template(v-if="mediaIndex === currentIndex")
				img(
					:class="{ 'is-draggable': !disableDrag }"
					:key="`media-${mediaIndex}-${media.url}`"
					:src="media.url"
					:style="imageStyleObject"
					@mousedown="handleImageDragStart($event)"
					dragable="false"
					v-if="getMediaType(media) === FileTypes.IMAGE")
				video(
					:poster="media.poster"
					:src="media.url"
					controls
					controlslist="nodownload noremoteplayback noplaybackrate"
					disablePictureInPicture
					disableRemotePlayback
					v-if="getMediaType(media) === FileTypes.VIDEO")
	.tools.top(v-if="!pureMode")
		.info.count(v-if="!disableCounter")
			span.number.current {{ `${currentIndex + 1} ` }}
			span.connect /
			span.number {{ mediaList.length }}
		.emyty(v-else)
		.control.name(@click="handleNameCopy()" v-if="!disableName")
			span.name-text {{ currentMedia.name }}
		.control.close(@click="handleClose()")
			i.iconfont-popup-plugin-preset.album-close
	.tools.left(v-if="!pureMode")
		.control.back(@click="handleBack()" v-if="backEnable")
			i.iconfont-popup-plugin-preset.album-prev
	.tools.right(v-if="!pureMode")
		.control.next(@click="handleNext()" v-if="nextEnable")
			i.iconfont-popup-plugin-preset.album-next
	.tools.bottom(v-if="!pureMode")
		.control(@click="handlePureEnter()" v-if="!disablePure")
			i.iconfont-popup-plugin-preset.album-pure
		.emyty(v-else)
		.center
			.control(
				@click="handleScale(true, buttonScaleLevel)"
				v-if="!disableScale && scaleEnable")
				i.iconfont-popup-plugin-preset.album-enlarge
			.control(
				@click="handleScale(false, buttonScaleLevel)"
				v-if="!disableScale && scaleEnable")
				i.iconfont-popup-plugin-preset.album-narrow
			.control(@click="handleRotate(false)" v-if="rotateEnable")
				i.iconfont-popup-plugin-preset.album-rotate-left
			.control(@click="handleRotate(true)" v-if="rotateEnable")
				i.iconfont-popup-plugin-preset.album-rotate-right
		.control.download(@click="handleDownload()" v-if="!disableDownload")
			i.iconfont-popup-plugin-preset.download
		.emyty(v-else)
</template>

<script lang="ts" setup>
import {
	computed,
	inject,
	onBeforeMount,
	onBeforeUnmount,
	onMounted,
	ref,
	watch,
} from 'vue'
import { usePopup, POPUP_COMPONENT_INJECTS } from 'vue-popup-plus'
import { download, setClipboard } from 'utils'
import { File, type FileType } from '../../../class'
import { type Skin } from '../../../skin'
import { type AlbumMediaSource } from '../index'

type Media = File & {
	manualType?: 'image' | 'video'
}

const popup = usePopup()
const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

defineOptions({
	name: 'PAlbum',
})

type Props = {
	skin: Skin
	sources: Array<string | AlbumMediaSource>
	defaultIndex: number
	disableCounter: boolean
	disableName: boolean
	disableDownload: boolean
	disablePure: boolean
	disableScale: boolean
	disableDrag: boolean
	disableLoop: boolean
	disableRotate: boolean
}

const {
	skin,
	sources,
	defaultIndex,
	disableCounter,
	disableName,
	disableDownload,
	disablePure,
	disableScale,
	disableDrag,
	disableLoop,
	disableRotate,
} = defineProps<Props>()

const currentIndex = ref(defaultIndex)
const defaultScale = ref(1)
const maxScale = ref(30)
const minScale = ref(0.01)
const buttonScaleLevel = ref(3)
const mouseScaleLevel = ref(1.5)
const currentScale = ref(defaultScale.value)
const isDrag = ref(false)
const dragMouseOriginX = ref(0)
const dragMouseOriginY = ref(0)
const dragOriginX = ref(0)
const dragOriginY = ref(0)
const dragOffsetX = ref(0)
const dragOffsetY = ref(0)
const currentRotate = ref(0)
const pureMode = ref(false)

const FileTypes = computed(() => File.FILE_TYPES)

const getMediaType = (file: Media) => (file.manualType as FileType) || file.type

const mediaList = computed(() =>
	sources
		.map((source) => {
			if (typeof source === 'string') {
				return new File(source)
			} else {
				const file: Media = new File(source.url)
				file.manualType = source.type
				return file
			}
		})
		.filter((file) =>
			[FileTypes.value.IMAGE, FileTypes.value.VIDEO].includes(
				getMediaType(file)
			)
		)
)
const currentMedia = computed(() => mediaList.value[currentIndex.value])
const imageStyleObject = computed(() => ({
	transform: `translate(${dragOffsetX.value}px, ${dragOffsetY.value}px) scale(${currentScale.value}) rotate(${currentRotate.value}deg)`,
	transitionDuration: isDrag.value ? '0s' : undefined,
}))
const backEnable = computed(
	() =>
		mediaList.value.length > 1 &&
		(disableLoop ? currentIndex.value > 0 : true)
)
const nextEnable = computed(
	() =>
		mediaList.value.length > 1 &&
		(disableLoop ? currentIndex.value < mediaList.value.length - 1 : true)
)
const scaleEnable = computed(
	() =>
		currentMedia.value &&
		getMediaType(currentMedia.value) === FileTypes.value.IMAGE
)
const rotateEnable = computed(
	() =>
		!disableRotate &&
		currentMedia.value &&
		getMediaType(currentMedia.value) === FileTypes.value.IMAGE
)

watch(currentIndex, () => {
	resetScale()
	resetDrag()
	resetRotate()
})

onBeforeMount(() => {
	if (defaultIndex >= 0 && defaultIndex < mediaList.value.length) {
		currentIndex.value = defaultIndex
	}
})

onMounted(() => {
	window.addEventListener('mousemove', handleImageDrag)
	window.addEventListener('mouseup', handleImageDragEnd)
})

onBeforeUnmount(() => {
	window.removeEventListener('mousemove', handleImageDrag)
	window.removeEventListener('mouseup', handleImageDragEnd)
})

function handleBack() {
	if (!backEnable.value) return
	if (currentIndex.value === 0) {
		if (!disableLoop) {
			currentIndex.value = mediaList.value.length - 1
		}
	} else {
		currentIndex.value--
	}
}

function handleNext() {
	if (!nextEnable.value) return
	if (currentIndex.value === mediaList.value.length - 1) {
		if (!disableLoop) {
			currentIndex.value = 0
		}
	} else {
		currentIndex.value++
	}
}

function handleScale(isAdd: boolean, scaleLevel = buttonScaleLevel.value) {
	if (!scaleEnable.value) return

	if (isAdd) {
		currentScale.value = Math.min(
			currentScale.value * scaleLevel,
			maxScale.value
		)
	} else {
		currentScale.value = Math.max(
			currentScale.value / scaleLevel,
			minScale.value
		)
	}
}

function resetScale() {
	currentScale.value = defaultScale.value
}

function resetDrag() {
	dragOffsetX.value = 0
	dragOffsetY.value = 0
}

function resetRotate() {
	currentRotate.value = 0
}

function handleImageMouseScale(event: any) {
	if (disableScale) return

	const isUp = event.wheelDelta > 0

	handleScale(isUp, mouseScaleLevel.value)
}

function handleRotate(isClockwise: boolean) {
	if (!rotateEnable.value) return

	if (isClockwise) {
		currentRotate.value += 90
	} else {
		currentRotate.value -= 90
	}
}

function handleImageDragStart(event: MouseEvent) {
	if (disableDrag) return

	dragMouseOriginX.value = event.clientX
	dragMouseOriginY.value = event.clientY

	isDrag.value = true

	event.stopPropagation()
	event.preventDefault()
}

function handleImageDrag(event: MouseEvent) {
	if (!isDrag.value) return
	dragOffsetX.value =
		dragOriginX.value + event.clientX - dragMouseOriginX.value
	dragOffsetY.value =
		dragOriginY.value + event.clientY - dragMouseOriginY.value
}

function handleImageDragEnd() {
	dragMouseOriginX.value = 0
	dragMouseOriginY.value = 0
	dragOriginX.value = dragOffsetX.value
	dragOriginY.value = dragOffsetY.value
	isDrag.value = false
}

function handleNameCopy() {
	setClipboard(currentMedia.value.name)
	popup.toast('复制成功')
}

function handlePureEnter() {
	pureMode.value = true
	popup.toast('开启纯净模式，双击即可退出')
}

function handlePureExit() {
	if (!pureMode.value) return

	pureMode.value = false
	popup.toast('退出纯净模式')
}

function handleDownload() {
	if (disableDownload) return

	download(currentMedia.value.url, {
		allowCrossOrigin: true,
	})
}

function handleClose() {
	popup.destroy(instanceId)
}
</script>

<style lang="scss" scoped>
@use '../../../assets/styles/inject.scss' as *;

$tools-safe-padding: 40px;

.popup-media-album {
	position: relative;
	width: 100%;
	height: 100%;
	user-select: none;
	overflow: hidden;
	.media {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		img,
		video {
			@include base-transition();
			margin: auto;
			max-width: calc(100% - 300px);
			max-height: calc(100% - 300px);
		}
		img {
			border: none;
			&.is-draggable {
				cursor: move;
			}
		}
	}
	.tools {
		display: flex;
		align-items: center;
		position: absolute;
		z-index: 2;
		&.top {
			top: $tools-safe-padding;
			left: $tools-safe-padding;
			right: $tools-safe-padding;
			flex-direction: row;
			justify-content: space-between;
		}
		&.left {
			top: $tools-safe-padding + 40px;
			left: $tools-safe-padding;
			bottom: $tools-safe-padding + 40px;
			flex-direction: column;
			justify-content: center;
		}
		&.right {
			top: $tools-safe-padding + 40px;
			right: $tools-safe-padding;
			bottom: $tools-safe-padding + 40px;
			flex-direction: column;
			justify-content: center;
		}
		&.bottom {
			bottom: $tools-safe-padding;
			left: $tools-safe-padding;
			right: $tools-safe-padding;
			flex-direction: row;
			justify-content: space-between;
		}
		.center {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 20px;
		}
		.info,
		.control {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			border-radius: use-var('border-radius');
			box-sizing: content-box;
			color: #ffffff;
			background-color: rgba(0, 0, 0, 0.2);
			font-size: use-font-size('text-main');
		}
		.control {
			@include base-transition();
			cursor: pointer;
			&:hover {
				color: use-color('primary');
				background-color: rgba(0, 0, 0, 0.3);
			}
			i {
				font-size: 24px;
			}
		}
		.empty {
			width: 40px;
			height: 40px;
		}
		.count {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			padding: 0 use-var('spacing');
			.current {
				font-weight: 700;
			}
		}
		.name {
			display: flex;
			align-items: center;
			justify-content: center;
			width: auto;
			max-width: 50%;
			padding: 0 use-var('spacing');

			.name-text {
				@include base-ellipsis();
				width: 100%;
			}
		}
		.back,
		.next {
			width: 60px;
			height: 100px;
			transform: translateY(-50%);
			i {
				font-size: 40px;
			}
		}
		.download {
			justify-self: flex-end;
		}
		.close {
			&:hover {
				color: use-color('danger');
			}
		}
	}
}
</style>
