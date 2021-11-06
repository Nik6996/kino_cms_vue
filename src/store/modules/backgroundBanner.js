import { database, storage } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


const BANNERS_DATABASE_PATH = 'backgroundBanner';

export const backgroundBanner = {
	namespaced: true,

	state: () => ({
		item: {}
	}),

	getters: {
		getFile(state) {
			return state.item.url
		},
		getRadio(state) {
			return state.item.radioBtn
		}
	},
	actions: {
		async save({ commit }, { file, radioBtn }) {
			try {
				if (file) {
					const storageRef = refStorage(storage, `${BANNERS_DATABASE_PATH}/image`);
					await uploadBytes(storageRef, file);
					const url = await getDownloadURL(refStorage(storage, `${BANNERS_DATABASE_PATH}/image`));
					set(ref(database, `${BANNERS_DATABASE_PATH}/item`), {
						radioBtn,
						url
					});
				} else {
					console.log('добавь картинку')
				}
			} catch {
				console.log('error')
			}
		},

		async remove() {
			const itemsRef = ref(database, `${BANNERS_DATABASE_PATH}/item`)
			const itemsRecord = await get(itemsRef);
			if (itemsRecord.exists()) {
				set(ref(database, `${BANNERS_DATABASE_PATH}/item`), null);
				const storageRef = refStorage(storage, `${BANNERS_DATABASE_PATH}/image`);
				deleteObject(storageRef);
			}
		},
		async load({ commit }) {
			try {
				const itemsRef = ref(database, `${BANNERS_DATABASE_PATH}/item`);
				const itemsRecord = await get(itemsRef);


				if (itemsRecord.exists()) {
					const item = itemsRecord.val()
					commit('setItem', item)
				}

			} catch (error) {
				console.log('error')
			}
		}
	},
	mutations: {
		setItem(state, item) {
			state.item = item
		}
	}
}