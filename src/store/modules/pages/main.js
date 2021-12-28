
import { database, storage } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";

//this.$store.getters[`cinema/getCinemas`]


const MAIN_PAGE_DATABASE_PATH = 'main';
const DATABASE_PATH = 'pages';
export const mainPage = {
	namespaced: true,

	state: () => ({
		main: null
	}),
	getters: {
		getMain(state) {
			return state.main
		}
	},
	actions: {
		async saveMainPage({ commit }, item) {
			try {
				await set(ref(database, `${DATABASE_PATH}/${MAIN_PAGE_DATABASE_PATH}`), {
					...item
				})
				commit('setMain', item)
			} catch (e) {
				console.log(e)
			} finally {

			}
		},
		async loadMainPage({ commit }) {
			const mainRef = ref(database, `${DATABASE_PATH}/${MAIN_PAGE_DATABASE_PATH}`);
			const mainRecord = await get(mainRef)
			if (mainRecord.exists()) {
				const main = mainRecord.val()
				commit('setMain', main)
			}
		}

	},
	mutations: {
		setMain(state, item) {
			state.main = item
		}
	}
}