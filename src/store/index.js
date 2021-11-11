import { createStore } from 'vuex'

import { bannersMainTop } from './modules/bannersMainTop'
import { backgroundBanner } from './modules/backgroundBanner'
import { mainNewsStock } from './modules/mainNewsStock'
import { film } from './modules/film'

export default createStore({

	modules: {
		bannersMainTop: bannersMainTop,
		backgroundBanner: backgroundBanner,
		mainNewsStock: mainNewsStock,
		film: film
	}
})