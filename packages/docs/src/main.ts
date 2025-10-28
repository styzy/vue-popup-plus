import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import popup from './popup'
import { components } from './components'

// import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/styles/atom-one-light.css'
import 'github-markdown-css/github-markdown-light.css'
import './assets/stylus/markdown.styl'

const app = createApp(App)

app.use(router)
app.use(popup)

Object.entries(components).forEach(([name, component]) => {
	app.component(name, component)
})

app.mount('#app')

