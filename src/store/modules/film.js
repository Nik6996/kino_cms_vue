import { database, storage } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";

import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";





const FILM_DATABASE_PATH = 'film'
export const film = {
	namespaced: true,
	state: () => ({
		arrayImage: []
	}),

	getters: {
		getImageGallary(state) {
			return state.arrayImage
		}
	},
	actions: {
		async saveFilm({ commit, getters, }, item) {

			async function saveMainImg(item) {
				if (item.itemUa.mainImg) {
					const img = item.itemUa.mainImg;
					const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/main/${item.itemUa.mainImg.imgId}`);
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/main/${item.itemUa.mainImg.imgId}`));
					item.itemUa.mainImgUrl = url
					delete item.itemUa.mainImg
					console.log(url)
				}
				// if (item.itemRu.mainImg) {
				// 	const img = item.itemRu.mainImg;
				// 	const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/ruImg/main/${item.itemRu.mainImg.imgId}`);
				// 	await uploadBytes(storageRef, img)
				// 	const url = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/main/${item.itemRu.mainImg.imgId}`));
				// 	item.itemRu.mainImgUrl = url
				// 	console.log(url)
				// }
				else {
					console.log('error нет картинки ')
				}
			};

			async function gallarySave(item) {
				if (item.itemUa.galleryImg) {
					const images = item.itemUa.galleryImg
					await images.forEach((img, index) => {
						saveGallaryImgUa(img.image, index);
					})

				} else {
					console.log('error нет галереи картинок UA')
				}
			}

			async function saveGallaryImgUa(img, index) {
				console.log(index)
				const storageRef = refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${img.imgId}`);
				await uploadBytes(storageRef, img);
				const url = await getDownloadURL(refStorage(storage, `${FILM_DATABASE_PATH}/${item.id}/uaImg/gallary/${img.imgId}`));

				await commit("setImageGallary", url)
				//item.itemUa.galleryImgUrl.push({ url })

			}


			try {

				if (item.id) {
					await saveMainImg(item);
					await gallarySave(item)
					delete item.itemUa.galleryImg
					console.log(getters.getImageGallary)
					item.itemUa.galleryImgUrl = getters.getImageGallary;


					console.log(item.itemUa.galleryImgUrl)
					// console.log(item.itemUa.typeFilm)


					set(ref(database, `${FILM_DATABASE_PATH}/item/${item.id}`), {
						...item
					})
				}

			} catch { }

		}
	},
	mutations: {
		setImageGallary(state, url) {
			state.arrayImage.push({ url })
		}
	}
}