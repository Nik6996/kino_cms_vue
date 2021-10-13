import { database } from "../../firebaseConfig";

import { getDatabase, ref, set, onValue } from "firebase/database";


export default {
	state: () => ({
		banners: [{ url: "", text: "" }],
	}),
	getters: {
		banners(state) {
			return state.banners
		}
	},
	actions: {
		// async pushName({ commit }, name) {
		// 	const database = getDatabase();
		// 	set(ref(database, 'cinema'), { name })

		// }
		async saveBanners({ commit }, banners) {
			const database = getDatabase();
			set(ref(database, 'banners'), { banners })

		},
		// async loadBanners() {
		// 	const database = getDatabase();
		// 	const bannersData = ref(db, 'banners');
		// 	onValue(bannersData, (snapshot) => {
		// 		const data = snapshot.val();
		// 		updateStarCount(data);
		// 	});
		// }




	},
	mutations: {

	},

}