<template lang="pug">
.p-dialog(:class="{ 'no-header': !header }")
	PScaffold
		template(#header v-if="header")
			PHeader(
				:hideClose="hideHeaderClose"
				:title="title"
				@close="$emit('close')"
			)
				template(#buttons)
					DPopupCard(:width="450" title="Popup Dialog 弹出层" v-if="$isDev")
						template(#default="{ fix, isFixed }")
							PHeaderButton(:active="isFixed" @click="fix()" iconClass="dev")
						template(#content)
							DDataGroup(:maxHeight="300" title="基础参数")
								DDataItem(:value="id" copyEnable label="id")
								DDataItem(
									:value="title"
									@change="handleTitleChange($event)"
									copyEnable
									editEnable
									label="标题"
									multiLine
								)
								DDataItem(
									:value="customComponentConfig?.name"
									copyEnable
									label="渲染组件"
									multiLine
								)
								DDataItem(
									:value="customComponentConfig?.__file"
									copyEnable
									label="渲染组件路径"
									multiLine
								)
							DDataGroup(
								:defaultExpand="false"
								:maxHeight="300"
								title="渲染组件属性 (props)"
							)
								DDataItem(
									:key="`props-${key}`"
									:label="key"
									:value="customComponentProps[key]"
									@change="handleComponentPropsChange($event, key)"
									copyEnable
									editEnable
									useJson
									v-for="(key, index) in Object.keys(customComponentProps)"
								)
					ElTooltip(
						content="刷新弹框，仅在开发模式下可用"
						placement="top"
						transition
						v-if="$isDev"
					)
						PHeaderButton(@click="handleReload" iconClass="reset" theme="success")
		PBody(:withPadding="false")
			component(
				:is="customComponentConfig"
				:key="customComponentKey"
				@close="handleComponentClose"
				@reload="handleComponentReload"
				@resize="handleComponentResize"
				v-bind="customComponentProps"
			)
</template>

<script>
export default {
	name: 'PDialog',
	props: {
		id: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		customComponent: {
			required: true
		},
		customComponentProps: {
			type: Object,
			required: true
		},
		header: {
			type: Boolean,
			required: true
		},
		updateProps: {
			type: Function,
			required: true
		},
		hideHeaderClose: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			customComponentConfig: null,
			customComponentKeySeed: 1
		}
	},
	computed: {
		customComponentKey() {
			return `${this.id}-${this.customComponentKeySeed}`
		}
	},
	mounted() {
		// HACK STY 修复ELementUI在弹框缩放动画过程中计算组件尺寸异常的bug
		window.setTimeout(this.renderComponent, 100)
	},
	methods: {
		async renderComponent() {
			let config = this.customComponent

			if (!config) {
				// eslint-disable-next-line
				console.warn(`dialog component不存在`)
				return
			}

			if (typeof config === 'function') {
				config = (await config()).default
			}

			this.customComponentConfig = config
		},
		handleComponentClose(...args) {
			this.$emit('close', ...args)
		},
		handleComponentReload() {
			this.handleReload()
		},
		handleComponentResize(...args) {
			this.$emit('resize', ...args)
		},
		handleReload() {
			this.customComponentKeySeed++
		},
		handleTitleChange(title) {
			this.updateProps({ title })
		},
		handleComponentPropsChange(value, key) {
			this.updateProps({
				customComponentProps: Object.assign(
					{},
					this.customComponentProps,
					{ [key]: value }
				)
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
$header-height = 40px

.p-dialog
	width 100%
	height 100%
</style>
