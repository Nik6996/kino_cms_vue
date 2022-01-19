import { database, storage } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";



export const logo = {
	namespaced: true,

	state: () => ({
		logo: ''
	}),
	getters: {
		getLogo(state) {
			return state.logo
		}
	},
	actions: {
		async save({ commit }, logo) {

			try {
				if (logo) {
					const img = logo
					const storageRef = refStorage(storage, `logo/img`);
					await uploadBytes(storageRef, img);
					const url = await getDownloadURL(refStorage(storage, `logo/img`));
					set(ref(database, `logo/img`), {
						url
					});
					commit('setLogo', img)
				} else {
					console.log('добавь картинку')
				}
			} catch (e) {
				console.log(e)
			}
		},


		async load({ commit }) {
			try {
				const itemsRef = ref(database, `logo/img`);
				const itemsRecord = await get(itemsRef);


				if (itemsRecord.exists()) {
					const logo = itemsRecord.val()
					commit('setLogo', logo)
				}

			} catch (error) {
				console.log('error')
			}
		}

	},
	mutations: {
		setLogo(state, logo) {
			state.logo = logo
		}
	}
}