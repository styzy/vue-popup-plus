<template lang="pug">
PSkin(:class="ns.block()" :skin="skin" @dblclick="handlePureExit()")
	div(:class="ns.element('media')" @wheel="handleImageMouseScale($event)")
		template(v-for="(media, mediaIndex) in mediaList")
			template(v-if="mediaIndex === currentIndex")
				img(
					:class="{ [ns.is('draggable')]: !disableDrag }"
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
	div(
		:class="[ns.element('tools'), ns.elementModifier('tools', 'top')]"
		v-if="!pureMode")
		div(
			:class="[ns.element('info'), ns.elementModifier('info', 'count')]"
			v-if="!disableCounter")
			span(:class="ns.element('info-number-current')") {{ `${currentIndex + 1} ` }}
			span /
			span {{ mediaList.length }}
		div(:class="ns.element('empty')" v-else)
		div(
			:class="[ns.element('control'), ns.elementModifier('control', 'name')]"
			@click="handleNameCopy()"
			v-if="!disableName")
			span(:class="ns.element('name-text')") {{ currentMedia.name }}
		div(
			:class="[ns.element('control'), ns.elementModifier('control', 'close')]"
			@click="handleClose()")
			i.iconfont-popup-plugin-preset.album-close
	div(
		:class="[ns.element('tools'), ns.elementModifier('tools', 'left')]"
		v-if="!pureMode")
		div(
			:class="[ns.element('control'), ns.elementModifier('control', 'back')]"
			@click="handleBack()"
			v-if="backEnable")
			i.iconfont-popup-plugin-preset.album-prev
	div(
		:class="[ns.element('tools'), ns.elementModifier('tools', 'right')]"
		v-if="!pureMode")
		div(
			:class="[ns.element('control'), ns.elementModifier('control', 'next')]"
			@click="handleNext()"
			v-if="nextEnable")
			i.iconfont-popup-plugin-preset.album-next
	div(
		:class="[ns.element('tools'), ns.elementModifier('tools', 'bottom')]"
		v-if="!pureMode")
		div(
			:class="[ns.element('control')]"
			@click="handlePureEnter()"
			v-if="!disablePure")
			i.iconfont-popup-plugin-preset.album-pure
		div(:class="ns.element('empty')" v-else)
		div(:class="ns.element('tools-center-wrapper')")
			div(
				:class="[ns.element('control')]"
				@click="handleScale(true, buttonScaleLevel)"
				v-if="!disableScale && scaleEnable")
				i.iconfont-popup-plugin-preset.album-enlarge
			div(
				:class="[ns.element('control')]"
				@click="handleScale(false, buttonScaleLevel)"
				v-if="!disableScale && scaleEnable")
				i.iconfont-popup-plugin-preset.album-narrow
			div(
				:class="[ns.element('control')]"
				@click="handleRotate(false)"
				v-if="rotateEnable")
				i.iconfont-popup-plugin-preset.album-rotate-left
			div(
				:class="[ns.element('control')]"
				@click="handleRotate(true)"
				v-if="rotateEnable")
				i.iconfont-popup-plugin-preset.album-rotate-right
		div(
			:class="[ns.element('control'), ns.elementModifier('control', 'download')]"
			@click="handleDownload()"
			v-if="!disableDownload")
			i.iconfont-popup-plugin-preset.download
		div(:class="ns.element('empty')" v-else)
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
import { type AlbumMediaSource } from '../index'
import { File, type FileType } from '../../../class'
import { type Skin } from '../../../skin'
import { useNamespace } from '../../../hooks'
import { P_INSIDE_COMPONENT_NAMES } from '../../../CONSTANTS'

type Media = File & {
	manualType?: 'image' | 'video'
}

defineOptions({
	name: P_INSIDE_COMPONENT_NAMES.ALBUM,
})

const ns = useNamespace(P_INSIDE_COMPONENT_NAMES.ALBUM)
const popup = usePopup()

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

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

<style lang="scss">
@use '../../../assets/styles/inject.scss' as *;

$tools-safe-padding: 40px;

@include ns-block('album') {
	position: relative;
	width: 100%;
	height: 100%;
	user-select: none;
	overflow: hidden;
	@include ns-element('media') {
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
	@include ns-element('tools') {
		display: flex;
		align-items: center;
		position: absolute;
		z-index: 2;
		@include ns-modifier('top') {
			top: $tools-safe-padding;
			left: $tools-safe-padding;
			right: $tools-safe-padding;
			flex-direction: row;
			justify-content: space-between;
		}
		@include ns-modifier('left') {
			top: $tools-safe-padding + 40px;
			left: $tools-safe-padding;
			bottom: $tools-safe-padding + 40px;
			flex-direction: column;
			justify-content: center;
		}
		@include ns-modifier('right') {
			top: $tools-safe-padding + 40px;
			right: $tools-safe-padding;
			bottom: $tools-safe-padding + 40px;
			flex-direction: column;
			justify-content: center;
		}
		@include ns-modifier('bottom') {
			bottom: $tools-safe-padding;
			left: $tools-safe-padding;
			right: $tools-safe-padding;
			flex-direction: row;
			justify-content: space-between;
		}
	}
	@include ns-element('tools-center-wrapper') {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}
	@include ns-element('control') {
		@include base-transition();
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: use-radius();
		box-sizing: content-box;
		color: #ffffff;
		background-color: rgba(0, 0, 0, 0.2);
		font-size: use-font-size(text);
		cursor: pointer;
		&:hover {
			background-color: rgba(0, 0, 0, 0.7);
		}
		i {
			font-size: 24px;
		}
		@include use-dark() {
			background-color: rgba(255, 255, 255, 0.2);
			&:hover {
				color: use-color(primary);
				background-color: rgba(255, 255, 255, 0.6);
			}
		}
		@include ns-element('name-text') {
			@include base-ellipsis();
			width: 100%;
		}

		@include ns-modifier('name') {
			display: flex;
			align-items: center;
			justify-content: center;
			width: auto;
			max-width: 50%;
			padding: 0 use-spacing();
		}
		@include ns-modifier('back') {
			width: 60px;
			height: 100px;
			transform: translateY(-50%);
			i {
				font-size: 40px;
			}
		}
		@include ns-modifier('next') {
			width: 60px;
			height: 100px;
			transform: translateY(-50%);
			i {
				font-size: 40px;
			}
		}
		@include ns-modifier('download') {
			justify-self: flex-end;
		}
		@include ns-modifier('close') {
			&:hover {
				background-color: use-color(danger);
			}
			@include use-dark() {
				&:hover {
					color: #ffffff;
					background-color: use-color(danger);
				}
			}
		}
	}
	@include ns-element('info') {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: use-radius();
		box-sizing: content-box;
		color: #ffffff;
		background-color: rgba(0, 0, 0, 0.2);
		font-size: use-font-size(text);
		@include ns-modifier('count') {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			padding: 0 use-spacing();
		}
		@include use-dark() {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
	@include ns-element('info-number-current') {
		font-weight: 700;
	}
	@include ns-element('empty') {
		width: 40px;
		height: 40px;
	}
}
</style>
