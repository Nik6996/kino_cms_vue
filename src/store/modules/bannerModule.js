
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
			set(bannersRef, {
				banners,

			})

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
		},

	},
}








