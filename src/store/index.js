import { createStore } from 'vuex'

import { bannersMainTop } from './modules/bannersMainTop'
import { backgroundBanner } from './modules/backgroundBanner'
import { mainNewsStock } from './modules/mainNewsStock'

export default createStore({

	modules: {
		bannersMainTop: bannersMainTop,
		backgroundBanner: backgroundBanner,
		mainNewsStock: mainNewsStock
	}
})