import { database, storage } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";

import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


const STOCK_DATABASE_PATH = 'stock'
export const stock = {
	namespaced: true,
	state: () => ({
		stock: [],
		isLoading: false
	}),
	getters: {
		getStock(state) {
			return state.stock
		},
		getIsLoading(state) {
			return state.isLoading
		}
	},
	actions: {
		async saveStock({ commit, getters }, item) {
			commit('setIsLoading', true)

			async function saveMainImg(item) {
				if (item.stockUa.mainImg.imgUrl && item.stockUa.mainImg.img) {
					const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ua/mainImg/${item.stockUa.mainImg.id}`)
					await deleteObject(storageRef)
				}
				if (item.stockRu.mainImg.imgUrl && item.stockRu.mainImg.img) {
					const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ru/mainImg/${item.stockRu.mainImg.id}`)
					await deleteObject(storageRef)
				}



				if (item.stockUa.mainImg.img) {
					const img = item.stockUa.mainImg.img
					const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ua/mainImg/${item.stockUa.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ua/mainImg/${item.stockUa.mainImg.id}`))
					item.stockUa.mainImg.imgUrl = url;
					item.stockUa.mainImg.img = '';
					item.stockUa.mainImg.mainLocal = '';
				}
				if (item.stockRu.mainImg.img) {
					const img = item.stockRu.mainImg.img
					const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ru/mainImg/${item.stockRu.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ru/mainImg/${item.stockRu.mainImg.id}`))
					item.stockRu.mainImg.imgUrl = url;
					item.stockRu.mainImg.img = '';
					item.stockRu.mainImg.mainLocal = '';
				}

			}


			async function saveGallaryImg(item) {
				if (item.stockUa.idGallaryRemove.length >= 0) {

					const idArray = item.stockUa.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ua/gallary/${id}`)
						deleteObject(storageRef)

					})
				}
				if (item.stockRu.idGallaryRemove.length >= 0) {
					const idArray = item.stockRu.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ru/gallary/${id}`)
						deleteObject(storageRef)
					})
				}



				if (item.stockUa.gallary.length >= 0) {
					const gallary = item.stockUa.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ua/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ua/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ua/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}


				if (item.stockRu.gallary.length >= 0) {
					const gallary = item.stockRu.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ru/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ru/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ru/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}
			}

			try {

				if (item.stockUa.date) {
					item.stockUa.date = String(item.stockUa.date)
				}
				if (item.stockRu.date) {
					item.stockRu.date = String(item.stockRu.date)
				}

				await saveMainImg(item)
				await saveGallaryImg(item)
				if (item.stockUa.idGallaryRemove.length >= 0) {
					item.stockUa.idGallaryRemove = []
				}
				if (item.stockRu.idGallaryRemove.length >= 0) {
					item.stockRu.idGallaryRemove = []
				}

				await set(ref(database, `${STOCK_DATABASE_PATH}/${item.id}`), {
					...item
				})
				if (item.stockUa.date) {
					item.stockUa.date = new Date(item.stockUa.date)
				}
				const stockList = getters.getStock
				let check = true
				await stockList.forEach((stock) => {
					if (item.id == stock.id) {
						commit('editStock', item)
						check = false
					}
				})
				if (check == true) {
					commit('setStock', item)
				}


			} catch (e) {
				console.log(e)
			} finally {
				commit('setIsLoading', false)
			}

		},

		async loadStock({ commit }) {
			try {

				const stockRef = ref(database, `${STOCK_DATABASE_PATH}`)
				const stockRecord = await get(stockRef)
				if (stockRecord.exists()) {
					const stockList = [];
					stockRecord.forEach(stock => {
						const item = stock.val();
						if (item.stockUa.date) {
							item.stockUa.date = new Date(item.stockUa.date)
						}
						if (!item.stockUa.gallary) {
							item.stockUa.gallary = []
						}
						if (!item.stockRu.gallary) {
							item.stockRu.gallary = []
						}
						if (!item.stockUa.idGallaryRemove) {
							item.stockUa.idGallaryRemove = []
						}
						if (!item.stockRu.idGallaryRemove) {
							item.stockRu.idGallaryRemove = []
						}

						stockList.push(item)
					})
					commit('setStockList', stockList)
				}

			} catch (e) {
				console.log(e)
			} finally { }
		},

		async removeStock({ commit, getters }, item) {
			if (getters.getStock) {
				const stockRef = ref(database, `${STOCK_DATABASE_PATH}`)
				const stockRecord = await get(stockRef)
				if (stockRecord.exists()) {
					set(ref(database, `${STOCK_DATABASE_PATH}/${item.id}`), null);
					if (item.stockUa.mainImg.imgUrl) {
						const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ua/mainImg/${item.stockUa.mainImg.id}`);
						await deleteObject(storageRef)
					}
					if (item.stockRu.mainImg.imgUrl) {
						const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ru/mainImg/${item.stockRu.mainImg.id}`);
						await deleteObject(storageRef)
					}
					if (item.stockUa.gallary) {
						const gallaryImg = item.stockUa.gallary;
						for (let i = 0; i < gallaryImg.length; i++) {
							const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ua/gallary/${gallaryImg[i].id}`)
							await deleteObject(storageRef)
						}
					}
					if (item.stockRu.gallary) {
						const gallaryImg = item.stockRu.gallary;
						for (let i = 0; i < gallaryImg.length; i++) {
							const storageRef = refStorage(storage, `${STOCK_DATABASE_PATH}/${item.id}/ru/gallary/${gallaryImg[i].id}`)
							await deleteObject(storageRef)
						}
					}
				}
			}
			const stockList = getters.getStock

			stockList.forEach((stock, index) => {
				if (stock.id == item.id) {
					commit('deleteStock', index)
				}
			})
		}
	},
	mutations: {
		deleteStock(state, index) {
			state.stock.splice(index, 1)
		},
		setStock(state, item) {
			state.stock.push(item)
		},
		setStockList(state, item) {
			state.stock = item
		},
		editStock(state, data) {
			state.stock.forEach(stock => {
				if (stock.id == data.id) {
					stock = data
				}
			})
		},
		setIsLoading(state, data) {
			state.isLoading = data
		}
	}
}