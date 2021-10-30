import { createStore } from 'vuex'

import { bannerModule } from './modules/bannerModule'



export default createStore({

	modules: {
		banners: bannerModule,
	}
})