<template lang="pug">
GContainer
	GTitle Prompt 提示输入
	GTitle(second) 基础
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupPrompt()" type="fill") 默认
		PButton(@click="handlePopupPromptDefaultValue()") 默认值
		PButton(@click="handlePopupPromptCustomType()") 自定义类型
		PButton(@click="handlePopupPromptCustomTitle()") 自定义标题
		PButton(@click="handlePopupPromptHeaderClose()") 禁用标题栏关闭
		PButton(@click="handlePopupPromptCustomMaxLength()") 自定义最大长度
		PButton(@click="handlePopupPromptCustomPlaceholder()") 自定义占位符
		PButton(@click="handlePopupPromptCustomConfirmButtonText()") 自定义确认按钮文本
		PButton(@click="handlePopupPromptCustomCancelButtonText()") 自定义取消按钮文本
		PButton(@click="handlePopupPromptDraggable()") 可拖拽
		PButton(@click="handlePopupPromptDraggableOverflow()") 可拖拽溢出屏幕
		PButton(@click="handlePopupPromptWithMaskBlur()") 启用遮罩模糊
	GTitle(second) 输入框校验
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupPromptInputValidate()") 校验
		PButton(@click="handlePopupPromptInputValidateInput()") input 触发校验
		PButton(@click="handlePopupPromptInputValidateChange()") change 触发校验
		PButton(@click="handlePopupPromptInputValidateBlur()") blur 触发校验
	GTitle(second) 文本域校验
	PButtonGroup(theme="primary" tight type="plain")
		PButton(@click="handlePopupPromptTextareaValidate()") 校验
		PButton(@click="handlePopupPromptTextareaValidateInput()") input 触发校验
		PButton(@click="handlePopupPromptTextareaValidateChange()") change 触发校验
		PButton(@click="handlePopupPromptTextareaValidateBlur()") blur 触发校验
</template>

<script lang="ts" setup>
import { usePopup } from 'vue-popup-plus'

const popup = usePopup()

async function handlePopupPrompt() {
	const result = await popup.prompt('这是一条提示输入框消息')
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptDefaultValue() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		defaultValue: '123',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomType() {
	const result = await popup.prompt('这是一条提示输入框消息，类型为文本域', {
		type: 'textarea',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomTitle() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		title: '自定义标题',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptHeaderClose() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		headerClose: false,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomPlaceholder() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		placeholder: '自定义占位符',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomMaxLength() {
	const result = await popup.prompt(
		'这是一条提示输入框消息，最大长度为10个字符',
		{
			maxLength: 10,
		}
	)
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomConfirmButtonText() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		confirmText: '自定义确认按钮文本',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptCustomCancelButtonText() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		cancelText: '自定义取消按钮文本',
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptDraggable() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		draggable: true,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptDraggableOverflow() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		draggable: true,
		dragOverflow: true,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptWithMaskBlur() {
	const result = await popup.prompt('这是一条提示输入框消息', {
		maskBlur: true,
	})
	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptInputValidate() {
	const result = await popup.prompt('校验规则：长度不能小于3个字符', {
		validator(value) {
			if (value.length < 3) {
				throw new Error('长度不能小于3个字符')
			}
		},
	})

	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}
async function handlePopupPromptInputValidateInput() {
	const result = await popup.prompt(
		'校验规则：长度不能小于3个字符（输入时校验）',
		{
			validateType: 'input',
			validator(value) {
				if (value.length < 3) {
					throw new Error('长度不能小于3个字符')
				}
			},
		}
	)

	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptInputValidateChange() {
	const result = await popup.prompt(
		'校验规则：长度不能小于3个字符（改变时校验）',
		{
			validateType: 'change',
			validator(value) {
				if (value.length < 3) {
					throw new Error('长度不能小于3个字符')
				}
			},
		}
	)

	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptInputValidateBlur() {
	const result = await popup.prompt(
		'校验规则：长度不能小于3个字符（失去焦点时校验）',
		{
			validateType: 'blur',
			validator(value) {
				if (value.length < 3) {
					throw new Error('长度不能小于3个字符')
				}
			},
		}
	)

	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptTextareaValidate() {
	const result = await popup.prompt('校验规则：长度不能小于3个字符', {
		type: 'textarea',
		validator(value) {
			if (value.length < 3) {
				throw new Error('长度不能小于3个字符')
			}
		},
	})

	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptTextareaValidateInput() {
	const result = await popup.prompt(
		'校验规则：长度不能小于3个字符（输入时校验）',
		{
			type: 'textarea',
			validateType: 'input',
			validator(value) {
				if (value.length < 3) {
					throw new Error('长度不能小于3个字符')
				}
			},
		}
	)

	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptTextareaValidateChange() {
	const result = await popup.prompt(
		'校验规则：长度不能小于3个字符（改变时校验）',
		{
			type: 'textarea',
			validateType: 'change',
			validator(value) {
				if (value.length < 3) {
					throw new Error('长度不能小于3个字符')
				}
			},
		}
	)

	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}

async function handlePopupPromptTextareaValidateBlur() {
	const result = await popup.prompt(
		'校验规则：长度不能小于3个字符（失去焦点时校验）',
		{
			type: 'textarea',
			validateType: 'blur',
			validator(value) {
				if (value.length < 3) {
					throw new Error('长度不能小于3个字符')
				}
			},
		}
	)

	if (result === undefined) {
		popup.toast('取消输入')
	} else {
		popup.toast(`您输入的内容是：${result}`)
	}
}
</script>
