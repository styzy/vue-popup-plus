import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import popup from './popup'

const app = createApp(App)

app.use(router)
app.use(popup)

app.mount('#app')

