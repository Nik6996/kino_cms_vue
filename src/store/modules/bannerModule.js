import { database } from "../../firebaseConfig";

import { getDatabase, ref, set, child, get } from "firebase/database";


export default {
	state: () => ({
		banners: [{ url: "", text: "" }],
	}),
	getters: {
		banners(state) {
			return state.banners
		}
	},
	mutations: {
		loadBanner(state, payload) {
			state.banners = payload
		}
		// loadBanner(state, payload) {
		// 	state.banners = payload
		// }

	},
	actions: {

		async saveBanners({ commit }, banners) {
			const database = getDatabase();
			set(ref(database, 'banners'), { banners })

		},
		async loadBanners() {
			const database = ref(getDatabase());
			get(child(database, 'banners')).then((banner) => {
				if (banner.exists()) {
					let bannerVal = banner.val().banners
					const bannersArray = [];
					Object.keys(bannerVal).forEach(key => {
						const bannerPush = bannerVal[key];
						bannersArray.push(bannerPush.url, bannerPush.text)
					});
					commit('loadBanner', bannersArray);
					// commit('loadBanner', bannerVal);
					console.log(bannersArray);
					console.log(banner.val());
				} else {
					console.log("No data available");
				}
			}).catch((error) => {
				console.error(error);
			});
		}

	},


}