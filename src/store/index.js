import { createStore } from 'vuex'

import { bannersMainTop } from './modules/bannersMainTop'
import { backgroundBanner } from './modules/backgroundBanner'
import { mainNewsStock } from './modules/mainNewsStock'
import { film } from './modules/film'
import { filmSoon } from './modules/filmSoon'
import { cinema } from './modules/cinema'
import { news } from './modules/news'
import { stock } from './modules/stock'
import { mainPage } from './modules/pages/main'
import { infoPage } from './modules/pages/info'
import { cafePage } from './modules/pages/cafe'
import { vipPage } from './modules/pages/vip'
import { advertisingPage } from './modules/pages/advertising'
import { childrensPage } from './modules/pages/childrens'
import { contactsPage } from './modules/pages/contacts'
import { customPage } from './modules/pages/custom'
import { registration } from './modules/registration'

export default createStore({

	modules: {
		bannersMainTop: bannersMainTop,
		backgroundBanner: backgroundBanner,
		mainNewsStock: mainNewsStock,
		film: film,
		filmSoon: filmSoon,
		cinema: cinema,
		news: news,
		stock: stock,
		mainPage: mainPage,
		infoPage: infoPage,
		cafePage: cafePage,
		vipPage: vipPage,
		advertisingPage: advertisingPage,
		childrensPage: childrensPage,
		contactsPage: contactsPage,
		customPage: customPage,

		registration:
			registration
	}
})