import { createApp } from 'vue'
import App from '@/App'
import router from '@/router/router'
import store from './store'

// import VueI18n from 'vue-i18n'




const app = createApp(App)

app
	.use(store)
	.use(router)
	.mount('#app')
	// .use(VueI18n)