<template lang="pug">
.p-media-album(@dblclick="handlePureExit()")
	.media(@wheel="handleImageMouseScale($event)")
		template(v-for="(media, mediaIndex) in mediaList")
			template(v-if="mediaIndex === currentIndex")
				img(
					:key="`media-${mediaIndex}-${media.url}`"
					:src="media.url"
					:style="imageStyleObject"
					@mousedown="handleImageDragStart($event)"
					dragable="false"
					v-if="media.type === FileTypes.IMAGE")
				video(
					:poster="media.poster"
					:src="media.url"
					controls
					controlslist="nodownload noremoteplayback noplaybackrate"
					disablePictureInPicture
					disableRemotePlayback
					v-if="media.type === FileTypes.VIDEO")
	.tools.top(v-if="!pureMode")
		.info.count(v-if="!countDisabled")
			span.current {{ `${currentIndex + 1} ` }}
			| / {{ mediaList.length }}
		.emyty(v-else)
		.control.name(@click="handleNameCopy()" v-if="!nameDisabled") {{ currentMedia.name }}
		.control.close(@click="handleClose()")
			i.iconfont-popup-plugin-preset.album-close
	.tools.left(v-if="!pureMode")
		.control.back(@click="handleBack()" v-if="backEnable")
			i.iconfont-popup-plugin-preset.album-prev
	.tools.right(v-if="!pureMode")
		.control.next(@click="handleNext()" v-if="nextEnable")
			i.iconfont-popup-plugin-preset.album-next
	.tools.bottom(v-if="!pureMode")
		.control(@click="handlePureEnter()" v-if="!pureDisabled")
			i.iconfont-popup-plugin-preset.album-pure
		.emyty(v-else)
		.center
			.control(
				@click="handleScale(true, buttonScaleLevel)"
				v-if="!scaleDisabled && scaleEnable")
				i.iconfont-popup-plugin-preset.album-enlarge
			.control(
				@click="handleScale(false, buttonScaleLevel)"
				v-if="!scaleDisabled && scaleEnable")
				i.iconfont-popup-plugin-preset.album-narrow
		.control.download(@click="handleDownload()" v-if="!downloadDisabled")
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
import { File } from '../../../class'
import { download, setClipboard } from '../../../utils'

const popup = usePopup()

defineOptions({
	name: 'PAlbum',
})

const instanceId = inject(POPUP_COMPONENT_INJECTS.INSTANCE_ID)!

type Props = {
	sources: Array<string>
	defaultIndex: number
	countDisabled: boolean
	nameDisabled: boolean
	downloadDisabled: boolean
	pureDisabled: boolean
	scaleDisabled: boolean
	dragDisabled: boolean
}

const {
	sources,
	defaultIndex,
	countDisabled,
	nameDisabled,
	downloadDisabled,
	pureDisabled,
	scaleDisabled,
	dragDisabled,
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
const pureMode = ref(false)

const FileTypes = computed(() => File.FILE_TYPES)

const mediaList = computed(() =>
	sources
		.map((source) => new File(source))
		.filter((file) =>
			[FileTypes.value.IMAGE, FileTypes.value.VIDEO].includes(file.type)
		)
)
const currentMedia = computed(() => mediaList.value[currentIndex.value])
const imageStyleObject = computed(() => ({
	transform: `translate(${dragOffsetX.value}px, ${dragOffsetY.value}px) scale(${currentScale.value})`,
	transitionDuration: isDrag.value ? '0s' : undefined,
}))
const backEnable = computed(() => currentIndex.value !== 0)
const nextEnable = computed(
	() =>
		currentIndex.value !== mediaList.value.length - 1 &&
		mediaList.value.length
)
const scaleEnable = computed(
	() =>
		currentMedia.value && currentMedia.value.type === FileTypes.value.IMAGE
)

watch(currentIndex, () => {
	resetScale()
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
	currentIndex.value--
}

function handleNext() {
	currentIndex.value++
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

function handleImageMouseScale(event: any) {
	if (scaleDisabled) return

	const isUp = event.wheelDelta > 0

	handleScale(isUp, mouseScaleLevel.value)
}

function handleImageDragStart(event: MouseEvent) {
	if (dragDisabled) return

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
	if (downloadDisabled) return

	download(currentMedia.value.url, {
		allowCrossOrigin: true,
	})
}

function handleClose() {
	popup.destroy(instanceId)
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/stylus/inject.styl'

$tools-safe-padding = 40px

.p-media-album
	position relative
	width 100%
	height 100%
	background-color rgba(0, 0, 0, 0.75)
	user-select none
	.media
		display flex
		// flex-direction: row
		justify-content center
		align-items center
		height @height
		img,
		video
			baseTrans()

			margin auto
			max-width calc(100% - 300px)
			max-height calc(100% - 300px)
		img
			border none
			cursor move
	.tools
		display flex
		align-items center
		position absolute
		z-index 2
		&.top
			top $tools-safe-padding
			left $tools-safe-padding
			right $tools-safe-padding
			flex-direction row
			justify-content space-between
		&.left
			top $tools-safe-padding + 40px
			left $tools-safe-padding
			bottom $tools-safe-padding + 40px
			flex-direction column
			justify-content center
		&.right
			top $tools-safe-padding + 40px
			right $tools-safe-padding
			bottom $tools-safe-padding + 40px
			flex-direction column
			justify-content center
		&.bottom
			bottom $tools-safe-padding
			left $tools-safe-padding
			right $tools-safe-padding
			flex-direction row
			justify-content space-between
			.center
				display flex
				align-items center
				justify-content center
				gap 20px
		.info,
		.control
			display flex
			align-items center
			justify-content center
			border-radius 3px
			color #FFFFFF
			width 40px
			height 40px
			background-color rgba(0, 0, 0, 0.5)
			font-size $font-size-text-main
		.control
			baseTrans()

			cursor pointer
			&:hover
				color $color-primary
			i
				font-size 26px
		.empty
			width 40px
			height 40px
		.count
			padding 0 20px
			.current
				font-weight 700
		.name
			baseEllipsis()
			display flex
			align-items center
			justify-content center
			width auto
			max-width 50%
			padding 0 20px
		.back,
		.next
			width 60px
			height 100px
			transform translateY(-50%)
			i
				font-size 40px
		.download
			justify-self flex-end
		.close
			&:hover
				color $color-danger
</style>
