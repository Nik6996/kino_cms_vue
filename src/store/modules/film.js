import { database, storage } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";

import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";





const FILM_DATABASE_PATH = 'film'
export const film = {
	namespaced: true,
	state: () => ({
		films: [],
		isLoading: true,

		// films: [{
		// 	id: 546546464,
		// 	test: 'YES',
		// 	itemUa: {},
		// }]
	}),

	getters: {
		isLoading(state) {
			return state.isLoading;
		},
		getFilms(state) {
			return state.films
		}
		// getFilmById(state) {

		// 	return (id) => {
		// 		console.log('id', id);
		// 		console.log('state.films', state.films);
		// 		const film = state.films.find(film => film.id === id) || null;
		// 		console.log('fond', film);
		// 		return film;
		// 	}
		// }
	},
	actions: {


		async saveFilm({ commit }, item) {
			commit('setIsLoading', true);
			async function saveMainImg(item) {

				if (item.itemUa.mainImg) {
					const imgUa = item.itemUa.mainImg;
					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/main/${item.itemUa.mainImg.imgId}`);
					await uploadBytes(storageRef, imgUa)
					const url = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/main/${item.itemUa.mainImg.imgId}`));
					item.itemUa.mainImgUrl = url
					delete item.itemUa.mainImg

				}
				if (item.itemRu.mainImg) {
					const imgRu = item.itemRu.mainImg;
					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/main/${item.itemRu.mainImg.imgId}`);
					await uploadBytes(storageRef, imgRu)
					const url = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/main/${item.itemRu.mainImg.imgId}`));
					item.itemRu.mainImgUrl = url
					delete item.itemRu.mainImg

				}
				else {
					console.log('error нет картинки ')
				}

			};

			async function gallarySave(item) {

				if (item.itemUa.galleryImg) {
					const images = item.itemUa.galleryImg;

					for (let i = 0; i < images.length; i++) {
						await saveGallaryImgUa(images[i].image, i);
					}

					// const film = {
					// 	id: 'aaa',
					// 	lang: {
					// 		'en': {},
					// 		'ru': {},
					// 		'ua': {},
					// 	}
					// };

					// images.forEach(async (img, index) => {
					// 	await saveGallaryImgUa(img.image, index);
					// })

				} if (item.itemRu.galleryImg) {
					const images = item.itemUa.galleryImg;

					for (let i = 0; i < images.length; i++) {
						await saveGallaryImgRu(images[i].image, i);
					}
				} else {
					console.log('error нет галереи картинок ')
				}

			}

			async function saveGallaryImgUa(img) {

				const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${img.imgId}`);
				await uploadBytes(storageRef, img);
				const url = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${img.imgId}`));

				item.itemUa.galleryImgUrl.push({ url })

			}
			async function saveGallaryImgRu(img) {

				const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/gallary/${img.imgId}`);
				await uploadBytes(storageRef, img);
				const url = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/gallary/${img.imgId}`));

				item.itemRu.galleryImgUrl.push({ url })

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
					const films = [];
					filmRecord.forEach(film => {

						const itemFilm = film.val()
						films.push(itemFilm)
					})
					commit('setFilms', films)
					commit('setIsLoading', false)
				}

			} catch {
				console.log('error')
			}
			finally {
				commit('setIsLoading', false)
			}
		},
		async deleteFilm({ commit, getters }, id) {
			try {
				if (getters.getFilms) {
					const itemsRef = ref(database, `${FILM_DATABASE_PATH}`)
					const itemsRecord = await get(itemsRef);
					if (itemsRecord.exists()) {
						itemsRecord.forEach(itemRecord => {
							const databaseItem = itemRecord.val();

							set(ref(database, `${FILM_DATABASE_PATH}/${id}`), null);
							const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${databaseItem.id}/uaImg`);
							console.log(storageRef)
							// deleteObject(storageRef);
						})
					}
					window.location.reload();
				}
			} catch (e) {
				console.log(e)
			}


		}
	},
	mutations: {

		setFilms(state, films) {
			state.films = films
		},
		setIsLoading(state, isLoading) {
			state.isLoading = isLoading;
		},

	}
}