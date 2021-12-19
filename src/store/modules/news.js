import { database, storage } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";

import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";


const NEWS_DATABASE_PATH = 'news'
export const news = {
	namespaced: true,
	state: () => ({
		news: [],
		isLoading: false
	}),
	getters: {
		getNews(state) {
			return state.news
		},
		getIsLoading(state) {
			return state.isLoading
		}
	},
	actions: {
		async saveNews({ commit, getters }, item) {
			commit('setIsLoading', true)

			async function saveMainImg(item) {
				if (item.newsUa.mainImg.imgUrl && item.newsUa.mainImg.img) {
					const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ua/mainImg/${item.newsUa.mainImg.id}`)
					await deleteObject(storageRef)
				}
				if (item.newsRu.mainImg.imgUrl && item.newsRu.mainImg.img) {
					const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ru/mainImg/${item.newsRu.mainImg.id}`)
					await deleteObject(storageRef)
				}



				if (item.newsUa.mainImg.img) {
					const img = item.newsUa.mainImg.img
					const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ua/mainImg/${item.newsUa.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ua/mainImg/${item.newsUa.mainImg.id}`))
					item.newsUa.mainImg.imgUrl = url;
					item.newsUa.mainImg.img = '';
					item.newsUa.mainImg.mainLocal = '';
				}
				if (item.newsRu.mainImg.img) {
					const img = item.newsRu.mainImg.img
					const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ru/mainImg/${item.newsRu.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ru/mainImg/${item.newsRu.mainImg.id}`))
					item.newsRu.mainImg.imgUrl = url;
					item.newsRu.mainImg.img = '';
					item.newsRu.mainImg.mainLocal = '';
				}

			}


			async function saveGallaryImg(item) {
				if (item.newsUa.idGallaryRemove.length >= 0) {

					const idArray = item.newsUa.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ua/gallary/${id}`)
						deleteObject(storageRef)

					})
				}
				if (item.newsRu.idGallaryRemove.length >= 0) {
					const idArray = item.newsRu.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ru/gallary/${id}`)
						deleteObject(storageRef)
					})
				}



				if (item.newsUa.gallary.length >= 0) {
					const gallary = item.newsUa.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ua/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ua/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ua/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}


				if (item.newsRu.gallary.length >= 0) {
					const gallary = item.newsRu.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ru/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ru/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ru/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}
			}

			try {

				if (item.newsUa.date) {
					item.newsUa.date = String(item.newsUa.date)
				}
				if (item.newsRu.date) {
					item.newsRu.date = String(item.newsRu.date)
				}

				await saveMainImg(item)
				await saveGallaryImg(item)
				if (item.newsUa.idGallaryRemove.length >= 0) {
					item.newsUa.idGallaryRemove = []
				}
				if (item.newsRu.idGallaryRemove.length >= 0) {
					item.newsRu.idGallaryRemove = []
				}

				await set(ref(database, `${NEWS_DATABASE_PATH}/${item.id}`), {
					...item
				})
				if (item.newsUa.date) {
					item.newsUa.date = new Date(item.newsUa.date)
				}
				const newsList = getters.getNews
				let check = true
				await newsList.forEach((news) => {
					if (item.id == news.id) {
						commit('editNews', item)
						check = false
					}
				})
				if (check == true) {
					commit('setNews', item)
				}


			} catch (e) {
				console.log(e)
			} finally {
				commit('setIsLoading', false)
			}

		},

		async loadNews({ commit }) {
			try {

				const newsRef = ref(database, `${NEWS_DATABASE_PATH}`)
				const newsRecord = await get(newsRef)
				if (newsRecord.exists()) {
					const newsList = [];
					newsRecord.forEach(news => {
						const item = news.val();
						if (item.newsUa.date) {
							item.newsUa.date = new Date(item.newsUa.date)
						}
						if (!item.newsUa.gallary) {
							item.newsUa.gallary = []
						}
						if (!item.newsRu.gallary) {
							item.newsRu.gallary = []
						}
						if (!item.newsUa.idGallaryRemove) {
							item.newsUa.idGallaryRemove = []
						}
						if (!item.newsRu.idGallaryRemove) {
							item.newsRu.idGallaryRemove = []
						}

						newsList.push(item)
					})
					commit('setNewsList', newsList)
				}

			} catch (e) {
				console.log(e)
			} finally { }
		},

		async removeNews({ commit, getters }, item) {
			if (getters.getNews) {
				const newsRef = ref(database, `${NEWS_DATABASE_PATH}`)
				const newsRecord = await get(newsRef)
				if (newsRecord.exists()) {
					set(ref(database, `${NEWS_DATABASE_PATH}/${item.id}`), null);
					if (item.newsUa.mainImg.imgUrl) {
						const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ua/mainImg/${item.newsUa.mainImg.id}`);
						await deleteObject(storageRef)
					}
					if (item.newsRu.mainImg.imgUrl) {
						const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ru/mainImg/${item.newsRu.mainImg.id}`);
						await deleteObject(storageRef)
					}
					if (item.newsUa.gallary) {
						const gallaryImg = item.newsUa.gallary;
						for (let i = 0; i < gallaryImg.length; i++) {
							const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ua/gallary/${gallaryImg[i].id}`)
							await deleteObject(storageRef)
						}
					}
					if (item.newsRu.gallary) {
						const gallaryImg = item.newsRu.gallary;
						for (let i = 0; i < gallaryImg.length; i++) {
							const storageRef = refStorage(storage, `${NEWS_DATABASE_PATH}/${item.id}/ru/gallary/${gallaryImg[i].id}`)
							await deleteObject(storageRef)
						}
					}
				}
			}
			const newsList = getters.getNews

			newsList.forEach((news, index) => {
				if (news.id == item.id) {
					commit('deleteNews', index)
				}
			})
		}
	},
	mutations: {
		deleteNews(state, index) {
			state.news.splice(index, 1)
		},
		setNews(state, item) {
			state.news.push(item)
		},
		setNewsList(state, item) {
			state.news = item
		},
		editNews(state, data) {
			state.news.forEach(news => {
				if (news.id == data.id) {
					news = data
				}
			})
		},
		setIsLoading(state, data) {
			state.isLoading = data
		}
	}
}