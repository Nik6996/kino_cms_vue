import { database } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";



export default {
	state: () => ({
		banners: [],
	}),
	getters: {
		banners(state) {
			return state.banners
		}
	},
	actions: {
		async loadBanners(x) {
			console.log(x)
			const bannersRef = ref(database, 'banners');
			onValue(bannersRef, (snapshot) => {
				const data = snapshot.val();
				console.log(data)

			});

		}



	},
	mutations: {
	},


}