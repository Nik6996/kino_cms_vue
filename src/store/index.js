import { createStore } from 'vuex'

import bannerModule from './modules/bannerModule'
import bannerImg from './modules/bannerImg'


export default createStore({

	modules: {
		banners: bannerModule,
		bannerImg,

	}
})