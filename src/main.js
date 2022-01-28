import { createApp } from 'vue'
import App from '@/App'
import router from '@/router/router'
import store from './store'

import { i18n } from './plugins/i18n'




const app = createApp(App)

app
	.use(store)
	.use(router)
	.use(i18n)

	.mount('#app')

