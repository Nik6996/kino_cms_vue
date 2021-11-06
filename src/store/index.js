import { createStore } from 'vuex'

import { bannersMainTop } from './modules/bannersMainTop'
import { backgroundBanner } from './modules/backgroundBanner'


export default createStore({

	modules: {
		bannersMainTop: bannersMainTop,
		backgroundBanner: backgroundBanner,
	}
})