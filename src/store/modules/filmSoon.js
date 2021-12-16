import { database, storage } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";

import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject, } from "firebase/storage";





const FILM_DATABASE_PATH = 'filmSoon'
export const filmSoon = {
	namespaced: true,
	state: () => ({
		filmsSoon: [],
		isLoading: false,


	}),

	getters: {
		isLoading(state) {
			return state.isLoading;
		},
		getFilms(state) {
			return state.filmsSoon
		}

	},
	actions: {


		async saveFilm({ commit }, item) {
			commit('setIsLoading', true);

			async function saveMainImg(item) {


				if (item.itemUa.mainImgUrl.url && item.itemUa.mainImg) {
					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/main/${item.itemUa.mainImgUrl.idImg}`);
					await deleteObject(storageRef);
				}
				if (item.itemRu.mainImgUrl.url && item.itemRu.mainImg) {
					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/main/${item.itemRu.mainImgUrl.idImg}`);
					await deleteObject(storageRef);
				}


				if (item.itemUa.mainImg) {
					const imgUa = item.itemUa.mainImg;
					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/main/${item.itemUa.mainImg.imgId}`);
					await uploadBytes(storageRef, imgUa)
					const url = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/main/${item.itemUa.mainImg.imgId}`));
					item.itemUa.mainImgUrl.url = url
					item.itemUa.mainImgUrl.idImg = item.itemUa.mainImg.imgId
					delete item.itemUa.mainImg

				}
				if (item.itemRu.mainImg) {
					const imgRu = item.itemRu.mainImg;
					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/main/${item.itemRu.mainImg.imgId}`);
					await uploadBytes(storageRef, imgRu)
					const url = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/main/${item.itemRu.mainImg.imgId}`));
					item.itemRu.mainImgUrl.url = url
					item.itemRu.mainImgUrl.idImg = item.itemRu.mainImg.imgId
					delete item.itemRu.mainImg


				}
				else {
					console.log('error нет картинки ')
				}

			};

			async function delGallaryImgUa(dataImg) {

				if (dataImg.image) {

					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${dataImg.id}`);
					await deleteObject(storageRef);
					const newImg = dataImg.image

					await uploadBytes(storageRef, newImg);
					const imageStorage = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${newImg.imgId}`));
					const id = newImg.imgId

					await item.itemUa.galleryImgUrl.forEach(gallary => {
						if (gallary.id == dataImg.id) {
							gallary.imageStorage = imageStorage
							gallary.id = id
							delete gallary.image
						}
					})

				}
			}

			async function delGallaryImgRu(dataImg) {

				if (dataImg.image) {

					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/gallary/${dataImg.id}`);
					await deleteObject(storageRef);
					const newImg = dataImg.image

					await uploadBytes(storageRef, newImg);
					const imageStorage = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/gallary/${newImg.imgId}`));
					const id = newImg.imgId

					await item.itemRu.galleryImgUrl.forEach(gallary => {
						if (gallary.id == dataImg.id) {
							gallary.imageStorage = imageStorage
							gallary.id = id
							delete gallary.image
						}
					})

				}
			}

			async function gallarySave(item) {

				if (item.itemUa.idImgRemove) {
					item.itemUa.idImgRemove.forEach(idRemove => {

						const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${idRemove.id}`);
						deleteObject(storageRef);
					})
					delete item.itemUa.idImgRemove
				}

				if (item.itemRu.idImgRemove) {
					item.itemRu.idImgRemove.forEach(idRemove => {

						const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/gallary/${idRemove.id}`);
						deleteObject(storageRef);
					})
					delete item.itemRu.idImgRemove
				}

				if (item.itemUa.galleryImgUrl) {
					const itemUrl = item.itemUa.galleryImgUrl
					for (let i = 0; i < itemUrl.length; i++) {
						await delGallaryImgUa(itemUrl[i], i);
					}

				}
				if (item.itemRu.galleryImgUrl) {
					const itemUrl = item.itemRu.galleryImgUrl
					for (let i = 0; i < itemUrl.length; i++) {
						await delGallaryImgRu(itemUrl[i], i);
					}

				}

				if (item.itemUa.galleryImg) {
					const images = item.itemUa.galleryImg;
					for (let i = 0; i < images.length; i++) {
						await saveGallaryImgUa(images[i].image, i);
					}

				} if (item.itemRu.galleryImg) {
					const images = item.itemRu.galleryImg;
					for (let i = 0; i < images.length; i++) {
						await saveGallaryImgRu(images[i].image, i);
					}
				} else {
					console.log('error нет галереи картинок ')
				}

			}

			async function saveGallaryImgUa(img) {
				if (img) {
					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${img.imgId}`);
					await uploadBytes(storageRef, img);
					const imageStorage = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${img.imgId}`));
					const id = img.imgId
					item.itemUa.galleryImgUrl.push({ imageStorage, id })

				}

			}
			async function saveGallaryImgRu(img) {
				if (img) {
					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/gallary/${img.imgId}`);
					await uploadBytes(storageRef, img);
					const imageStorage = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/gallary/${img.imgId}`));
					const id = img.imgId
					item.itemRu.galleryImgUrl.push({ imageStorage, id })
				}
			}

			try {

				if (item.id) {

					await saveMainImg(item);
					await gallarySave(item);

					delete item.itemUa.galleryImg
					delete item.itemUa.fileLocal
					delete item.itemRu.galleryImg
					delete item.itemRu.fileLocal



					await set(ref(database, `${FILM_DATABASE_PATH}/${item.id}`), {
						...item,
					})
					//  commit('setFilm', item)
				}


			} catch (error) {
				console.log('error', error)
			} finally {
				commit('setIsLoading', false)
			}

		},
		async loadFims({ commit }) {

			try {
				const filmsRef = ref(database, `${FILM_DATABASE_PATH}`);
				const filmRecord = await get(filmsRef)


				if (filmRecord.exists()) {
					const filmsSoon = [];
					filmRecord.forEach(film => {

						const itemFilm = film.val()
						itemFilm.itemUa.galleryImg = []
						itemFilm.itemRu.galleryImg = []
						if (!itemFilm.itemUa.galleryImgUrl) {
							itemFilm.itemUa.galleryImgUrl = []
						}
						if (!itemFilm.itemRu.galleryImgUrl) {
							itemFilm.itemRu.galleryImgUrl = []
						}
						if (!itemFilm.itemUa.idImgRemove) {
							itemFilm.itemUa.idImgRemove = []
						}
						if (!itemFilm.itemRu.idImgRemove) {
							itemFilm.itemRu.idImgRemove = []
						}

						filmsSoon.push(itemFilm)
					})
					commit('setFilms', filmsSoon)
					commit('setIsLoading', false)
				}

			} catch (e) {
				console.log(e)
			}
			finally {
				commit('setIsLoading', false)
			}
		},


		async deleteFilm({ commit, getters }, item) {
			try {
				if (getters.getFilms) {
					const itemsRef = ref(database, `${FILM_DATABASE_PATH}`)
					const itemsRecord = await get(itemsRef);
					if (itemsRecord.exists()) {
						set(ref(database, `${FILM_DATABASE_PATH}/${item.id}`), null);
						if (item.itemUa.mainImgUrl.idImg) {
							const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/main/${item.itemUa.mainImgUrl.idImg}`);
							deleteObject(storageRef);
						}
						if (item.itemRu.mainImgUrl.idImg) {
							const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/main/${item.itemRu.mainImgUrl.idImg}`);
							deleteObject(storageRef);
						}

						if (item.itemUa.galleryImgUrl) {
							item.itemUa.galleryImgUrl.forEach(imgUa => {

								const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${imgUa.id}`);
								deleteObject(storageRef);
							})
						}
						if (item.itemRu.galleryImgUrl) {
							item.itemRu.galleryImgUrl.forEach(imgRu => {

								const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/gallary/${imgRu.id}`);
								deleteObject(storageRef);
							})
						}
					}
					window.location.reload();
				}
			} catch (e) {
				console.log(e)
			}


		}
	},
	mutations: {

		setFilms(state, filmsSoon) {
			state.filmsSoon = filmsSoon
		},
		setIsLoading(state, isLoading) {
			state.isLoading = isLoading;
		},

	}
}