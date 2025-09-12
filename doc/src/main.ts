import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPopup } from '@'

const app = createApp(App)

app.use(router)

app.use(createPopup())

app.mount('#app')

const a = {
	b: 1,
}

