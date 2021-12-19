import { createStore } from 'vuex'

import { bannersMainTop } from './modules/bannersMainTop'
import { backgroundBanner } from './modules/backgroundBanner'
import { mainNewsStock } from './modules/mainNewsStock'
import { film } from './modules/film'
import { filmSoon } from './modules/filmSoon'

import { cinema } from './modules/cinema'
import { news } from './modules/news'
import { stock } from './modules/stock'

export default createStore({

	modules: {
		bannersMainTop: bannersMainTop,
		backgroundBanner: backgroundBanner,
		mainNewsStock: mainNewsStock,
		film: film,
		filmSoon: filmSoon,
		cinema: cinema,
		news: news,
		stock: stock
	}
})