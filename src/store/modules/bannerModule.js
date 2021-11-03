
import { database, storage } from "../../firebaseConfig";
import { ref, push, set, get, query, orderByChild } from "firebase/database";

// import { firebaseApp,  } from "../../firebaseConfig";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


const default_interval = 5;
const BANNERS_DATABASE_PATH = 'banners';

export const bannerModule = {
	namespaced: true,

	state: () => ({
		items: [],
		interval: default_interval,
		error: null,
		isLoading: true,

	}),
	getters: {
		items(state) {
			return state.items;
		},
		interval(state) {
			return state.interval;
		},
		isLoading(state) {
			return state.isLoading;
		},
		error(state) {
			return state.error;
		},

	},

	actions: {
		async save({ commit, state }, { items, interval }) {
			commit('setError', null);
			commit('setIsLoading', true);

			try {
				const itemsRef = ref(database, `${BANNERS_DATABASE_PATH}/items`)
				const itemsRecord = await get(itemsRef)
				if (itemsRecord.exists()) {
					itemsRecord.forEach(itemRecord => {

						const databaseItem = itemRecord.val();
						const matchingItem = items.find(item => databaseItem.id === item.id);
						if (!matchingItem) {
							set(ref(database, `${BANNERS_DATABASE_PATH}/items/${databaseItem.id}`), null);
							const storageRef = refStorage(storage, `banners/${databaseItem.id}`);
							deleteObject(storageRef);
						}
					})
					items.forEach((item, index) => {

						if (item.id) {

							set(ref(database, `${BANNERS_DATABASE_PATH}/items/${item.id}`), {
								...item,
								order: index,

							})
						} else {

							if (item.file) {

								//delete item.file;
							}
							// set(newItemRef, {
							// 	...item,

							// 	order: index
							// });
						}
					});
				} else {
					items.forEach((item, index) => {


						if (item.file) {
							// TODO: update file

							async function updateImg() {
								const img = item.file

								const storageRef = refStorage(storage, `banners/${item.file.imgId}`);
								await uploadBytes(storageRef, img);
								const url = await getDownloadURL(refStorage(storage, `banners/${item.file.imgId}`))

								set(ref(database, `${BANNERS_DATABASE_PATH}/items/${item.id}`), {
									...item,
									order: index,
									image: url
								})

							}
							updateImg()


						} else {
							set(ref(database, `${BANNERS_DATABASE_PATH}/items/${item.id}`), {
								...item,
								order: index,
							})
						}

					});
				}

				const intervalRef = ref(database, `${BANNERS_DATABASE_PATH}/interval`);
				set(intervalRef, interval);

				commit('setItems', items);
				commit('setInterval', interval);

			} catch (error) {
				commit('setError', null);

			} finally {
				commit('setIsLoading', false)
			}
		},

		async load({ commit }) {
			commit('setError', null);
			commit('setIsLoading', true);

			try {
				const itemsRef = ref(database, `${BANNERS_DATABASE_PATH}/items`);
				const itemsQuery = query(itemsRef, orderByChild("order"));
				const itemsRecord = await get(itemsQuery);

				if (itemsRecord.exists()) {
					const items = [];
					itemsRecord.forEach(itemRecord => {
						items.push(itemRecord.val())
					});
					commit('setItems', items)
				}
				const intervalRef = ref(database, `${BANNERS_DATABASE_PATH}/interval`);
				const intervalRecord = await get(intervalRef);

				if (intervalRecord.exists()) {
					commit('setInterval', intervalRecord.val())
				}

			} catch (error) {
				commit('setError', error);
			}
			finally {
				commit('setIsLoading', false);
			}
		}
	},

	mutations: {

		setInterval(state, interval) {
			state.interval = interval;
		},
		setItems(state, items) {
			state.items = items
		},
		setError(state, error) {
			state.error = error;
		},
		setIsLoading(state, isLoading) {
			state.isLoading = isLoading;
		},
	}


}