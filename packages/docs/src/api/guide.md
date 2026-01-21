---
pageClass: api-guide
sidebar: false
aside: false
outline: false
prev: false
next: false
---

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { data as coreApi } from './api.data.ts'
import { data as pluginApi } from './plugin-preset/api.data.ts'

const filter = ref({
	keyword: '',
	showVersion: false,
})

const apiModules = ref({
	core: coreApi,
	plugin: pluginApi,
})

onMounted(() => {
	filter.value.showVersion = window.localStorage.getItem('apiShowVersion') === null ? true : !!window.localStorage.getItem('apiShowVersion')
})

watch(() => filter.value.showVersion, (newVal) => {
	if(newVal) {
		window.localStorage.setItem('apiShowVersion', '1')
	} else {
		window.localStorage.setItem('apiShowVersion', '')
	}
})

</script>

# API 总览

<DApiFilter v-model:filter="filter" v-model:apis="apiModules" />

<DApi :api="apiModules.core" :filter="filter" />

<DApi :api="apiModules.plugin" :filter="filter" />
