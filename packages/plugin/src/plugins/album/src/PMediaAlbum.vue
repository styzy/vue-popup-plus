<template lang="pug">
.p-media-album
	.media(@wheel="handleImageMouseScale")
		transition(mode="out-in" name="media")
			template(v-for="(media, mediaIndex) in formattedMediaList")
				template(v-if="mediaIndex === currentIndex")
					template(v-if="media.type === FILE_TYPES.IMAGE")
						img(
							:key="`media-${mediaIndex}-${media.url}`"
							:src="media.url"
							:style="imageStyleObject"
							@mousedown="handleImageDragStart"
							dragable="false"
						)
					template(v-if="media.type === FILE_TYPES.VIDEO")
						video(
							:poster="media.poster"
							:src="media.url"
							controls
							controlslist="nodownload noremoteplayback noplaybackrate"
							disablePictureInPicture
							disableRemotePlayback
						)
	.control.close(@click="close()")
		i.iconfont-ark.album-close
	.control.back(@click="back()" v-if="backEnable")
		i.iconfont-ark.album-back
	.control.next(@click="next()" v-if="nextEnable")
		i.iconfont-ark.album-next
	.control.large(@click="scale(true, buttonScaleLevel)" v-if="scaleEnable")
		i.iconfont-ark.album-enlarge
	.control.small(@click="scale(false, buttonScaleLevel)" v-if="scaleEnable")
		i.iconfont-ark.album-narrow
	.control.download(@click="download()" v-if="downloadEnable")
		i.iconfont-ark.download
</template>

<script>
import { download } from '#'
import { File } from '@/class'

export default {
	name: 'PMediaAlbum',
	props: {
		mediaList: {
			type: Array,
			required: true
		},
		defaultIndex: {
			type: Number,
			required: true
		},
		downloadEnable: {
			type: Boolean,
			required: true
		},
		mouseWheelScaleEnable: {
			type: Boolean,
			required: true
		},
		mouseDragEnable: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			FILE_TYPES: File.FILE_TYPES,
			currentIndex: 0,
			defaultScale: 1,
			maxScale: 30,
			minScale: 0.01,
			buttonScaleLevel: 3,
			mouseScaleLevel: 1.5,
			currentScale: 1,
			isDrag: false,
			dragMouseOriginX: null,
			dragMouseOriginY: null,
			dragOriginX: 0,
			dragOriginY: 0,
			dragOffsetX: 0,
			dragOffsetY: 0
		}
	},
	computed: {
		formattedMediaList() {
			return this.mediaList
				.map(media => new File(media))
				.filter(file =>
					[File.FILE_TYPES.IMAGE, File.FILE_TYPES.VIDEO].includes(
						file.type
					)
				)
		},
		currentMedia() {
			return this.formattedMediaList[this.currentIndex]
		},
		imageStyleObject() {
			const styleObject = {
				transform: `translate(${this.dragOffsetX}px, ${this.dragOffsetY}px) scale(${this.currentScale})`
			}

			if (this.isDrag) {
				styleObject.transitionDuration = '0s'
			}

			return styleObject
		},
		backEnable() {
			return this.currentIndex !== 0
		},
		nextEnable() {
			return (
				this.currentIndex !== this.formattedMediaList.length - 1 &&
				this.formattedMediaList.length
			)
		},
		scaleEnable() {
			return (
				this.currentMedia &&
				this.currentMedia.type === File.FILE_TYPES.IMAGE
			)
		}
	},
	watch: {
		currentIndex() {
			this.resetScale()
		}
	},
	created() {
		if (
			this.defaultIndex >= 0 &&
			this.defaultIndex < this.formattedMediaList.length
		) {
			this.currentIndex = this.defaultIndex
		}
	},
	mounted() {
		window.addEventListener('mousemove', this.handleImageDrag)
		window.addEventListener('mouseup', this.handleImageDragEnd)
	},
	beforeDestroy() {
		window.removeEventListener('mousemove', this.handleImageDrag)
		window.removeEventListener('mouseup', this.handleImageDragEnd)
	},
	methods: {
		close() {
			this.$emit('close')
		},
		back() {
			this.currentIndex = this.currentIndex - 1
		},
		next() {
			this.currentIndex = this.currentIndex + 1
		},
		scale(isAdd, scaleLevel = this.buttonScaleLevel) {
			if (!this.scaleEnable) return

			if (isAdd) {
				this.currentScale = Math.min(
					this.currentScale * scaleLevel,
					this.maxScale
				)
			} else {
				this.currentScale = Math.max(
					this.currentScale / scaleLevel,
					this.minScale
				)
			}
		},
		resetScale() {
			this.currentScale = this.defaultScale
		},
		handleImageMouseScale(event = window.event) {
			if (!this.mouseWheelScaleEnable) return

			const isUp = event.wheelDelta > 0

			this.scale(isUp, this.mouseScaleLevel)
		},
		handleImageDragStart(event = window.event) {
			if (!this.mouseDragEnable) return

			this.dragMouseOriginX = event.clientX
			this.dragMouseOriginY = event.clientY

			this.isDrag = true

			event.stopPropagation()
			event.preventDefault()
		},
		handleImageDrag(event = window.event) {
			if (!this.isDrag) return
			this.dragOffsetX =
				this.dragOriginX + event.clientX - this.dragMouseOriginX
			this.dragOffsetY =
				this.dragOriginY + event.clientY - this.dragMouseOriginY
		},
		handleImageDragEnd() {
			this.dragMouseOriginX = null
			this.dragMouseOriginY = null
			this.dragOriginX = this.dragOffsetX
			this.dragOriginY = this.dragOffsetY
			this.isDrag = false
		},
		download() {
			download(this.currentMedia.url, {
				allowCrossOrigin: true
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
$control-padding-size = 40px

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
	.control
		baseTrans()

		position absolute
		z-index 2
		width 40px
		height 40px
		border-radius 3px
		background-color rgba(0, 0, 0, 0.2)
		color #CCCCCC
		text-align center
		line-height @height
		cursor pointer
		&:hover
			background-color rgba(0, 0, 0, 0.3)
			color #FFFFFF
		i
			font-size 26px
		&.close
			top $control-padding-size
			right $control-padding-size
		&.back,
		&.next
			top 50%
			width 60px
			height 100px
			line-height @height
			transform translateY(-50%)
			i
				font-size 40px
		&.back
			left $control-padding-size
		&.next
			right $control-padding-size
		&.large
			bottom $control-padding-size
			left calc(50% - 50px)
		&.small
			bottom $control-padding-size
			left calc(50% + 10px)
		&.download
			right $control-padding-size
			bottom $control-padding-size
.media-enter-active
	animation fadeIn 0.3s
.media-leave-active
	animation fadeIn 0.3s reverse
@keyframes fadeIn
	from
		opacity 0
	to
		opacity 1
</style>
