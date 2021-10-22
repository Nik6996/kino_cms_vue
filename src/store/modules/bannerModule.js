
import { database } from "../../firebaseConfig";
import { ref, set, get } from "firebase/database";


export default {
	state: () => ({
		banners: [],
		isLoading: false,
		error: null,
	}),

	getters: {
		banners(state) {
			return state.banners;
		},
		isLoading(state) {
			return state.isLoading;
		},
		error(state) {
			return state.error;
		}
	},

	actions: {
		async saveBanners({ commit }, banners) {
			const bannersRef = ref(database, 'banners');
			set(bannersRef, { banners })
		},

		async loadBanners({ commit }) {
			commit('setError', null);
			commit('setIsLoading', true);

			try {
				const bannersRef = ref(database, 'banners');
				const bannersRecord = await get(bannersRef);

				if (bannersRecord.exists()) {
					const banners = bannersRecord.val().banners;
					commit('setBanners', banners);
				} else {
					console.log("No data available");
				}
			} catch (error) {
				console.error(error);
				commit('setError', error);
			} finally {
				commit('setIsLoading', false);
			}

		},
		//-------------------------------
		// addImageStorage() {
		// 	const fileImg = document.getElementById("img-banner").files[0];
		// 	console.log(fileImg)
		// 	const storageRef = ref(storage, `banners/${fileImg.name}`);
		// 	uploadBytes(storageRef, fileImg);
		// },
	},

	mutations: {
		setBanners(state, banners) {
			state.banners = banners;
		},
		setIsLoading(state, isLoading) {
			state.isLoading = isLoading;
		},
		setError(state, error) {
			state.error = error;
		}
	},
}



























// import { database } from "../../firebaseConfig";

// import { getDatabase, ref, set, child, get } from "firebase/database";


// export default {
// 	state: () => ({
// 		banners: [{ url: "", text: "" }],
// 	}),
// 	getters: {
// 		banners(state) {
// 			return state.banners
// 		}
// 	},
// 	mutations: {
// 		loadBanner(state, payload) {
// 			state.banners = payload
// 		},
// 		// loadBanner(state, payload) {
// 		// 	state.banners = payload
// 		// }

// 	},
// 	actions: {

// 		async saveBanners({ commit }, banners) {
// 			const database = getDatabase();
// 			set(ref(database, 'banners'), { banners })

// 		},
// 		async loadBanners() {
// 			const database = ref(getDatabase());
// 			get(child(database, 'banners')).then((banner) => {
// 				if (banner.exists()) {
// 					let bannerVal = banner.val().banners
// 					const bannersArray = [];
// 					Object.keys(bannerVal).forEach(key => {
// 						const bannerPush = bannerVal[key];
// 						bannersArray.push(bannerPush)
// 					});
// 					commit('loadBanner', bannersArray);
// 					// commit('loadBanner', bannerVal);
// 					console.log(bannersArray);
// 					console.log(banner.val());
// 				} else {
// 					console.log("No data available");
// 				}
// 			}).catch((error) => {
// 				console.error(error);
// 			});
// 		}

// 	},


// }