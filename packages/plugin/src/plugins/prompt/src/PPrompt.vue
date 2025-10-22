<template lang="pug">
.p-prompt
	PScaffold
		template(#header)
			PHeader(:closeEnabled="false" :title="title" iconClass="popup-prompt")
		PBody
			.message(v-if="isRenderMessage") {{ message }}
			.input
				template(v-if="type === TYPES.INPUT")
					ElInput(
						:maxlength="maxLength"
						:placeholder="placeholder"
						clearable
						show-word-limit
						type="text"
						v-model="value"
					)
				template(v-if="type === TYPES.TEXTAREA")
					ElInput(
						:maxlength="maxLength"
						:placeholder="placeholder"
						clearable
						resize="none"
						show-word-limit
						type="textarea"
						v-model="value"
					)
		template(#footer)
			PFooter
				VButtonGroup(align="right")
					VButton(@click="handleCancel()" plain) {{ cancelText }}
					VButton(@click="handleConfirm()") {{ confirmText }}
</template>

<script>
const TYPES = {
	INPUT: 'input',
	TEXTAREA: 'textarea'
}

export default {
	name: 'PPrompt',
	props: {
		title: {
			type: String,
			default: '提示输入'
		},
		message: {
			type: [String, Boolean],
			default: ''
		},
		type: {
			type: String,
			default: TYPES.INPUT,
			validator: type => Object.values(TYPES).includes(type)
		},
		defaultValue: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '请输入'
		},
		maxLength: {
			type: Number,
			default: null
		},
		confirmText: {
			type: String,
			default: '确定'
		},
		cancelText: {
			type: String,
			default: '取消'
		}
	},
	data() {
		return {
			TYPES,
			value: ''
		}
	},
	computed: {
		isRenderMessage() {
			return this.message !== false
		}
	},
	created() {
		this.value = this.defaultValue
	},
	methods: {
		handleConfirm() {
			this.$emit('close', this.value)
		},
		handleCancel() {
			this.$emit('close', null)
		}
	}
}
</script>

<style lang="stylus" scoped>
$header-height = 40px

.p-prompt
	overflow hidden
	max-width 80vw
	max-height 80vh
	width 360px
	.message
		overflow-y auto
		box-sizing border-box
		padding-bottom 20px
		max-height calc(100vh - 122px)
		word-break break-all
		line-height 24px
</style>
