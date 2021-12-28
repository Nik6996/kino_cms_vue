
import { database, storage } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
//this.$store.getters[`cinema/getCinemas`]


const CAFE_PAGE_DATABASE_PATH = 'cafe';
const DATABASE_PATH = 'pages';
export const cafePage = {
	namespaced: true,

	state: () => ({
		cafe: null
	}),
	getters: {
	getCafe(state){
    return state.cafe
  }
	},
	actions: {
		async save({commit}, item){
		


			async function saveMainImg(item) {
				if (item.cafeUa.mainImg.imgUrl && item.cafeUa.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ua/mainImg/${item.cafeUa.mainImg.id}`)
					await deleteObject(storageRef)
				}
				if (item.cafeRu.mainImg.imgUrl && item.cafeRu.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ru/mainImg/${item.cafeRu.mainImg.id}`)
					await deleteObject(storageRef)
				}



				if (item.cafeUa.mainImg.img) {
					const img = item.cafeUa.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ua/mainImg/${item.cafeUa.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ua/mainImg/${item.cafeUa.mainImg.id}`))
					item.cafeUa.mainImg.imgUrl = url;
					item.cafeUa.mainImg.img = '';
					item.cafeUa.mainImg.mainLocal = '';
				}
				if (item.cafeRu.mainImg.img) {
					const img = item.cafeRu.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ru/mainImg/${item.cafeRu.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ru/mainImg/${item.cafeRu.mainImg.id}`))
					item.cafeRu.mainImg.imgUrl = url;
					item.cafeRu.mainImg.img = '';
					item.cafeRu.mainImg.mainLocal = '';
				}

			}

			async function saveGallaryImg(item) {
				if (item.cafeUa.idGallaryRemove.length >= 0) {

					const idArray = item.cafeUa.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ua/gallary/${id}`)
						deleteObject(storageRef)
					})
				}
				if (item.cafeRu.idGallaryRemove.length >= 0) {
					const idArray = item.cafeRu.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ru/gallary/${id}`)
						deleteObject(storageRef)
					})
				}



				if (item.cafeUa.gallary.length >= 0) {
					const gallary = item.cafeUa.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}


				if (item.cafeRu.gallary.length >= 0) {
					const gallary = item.cafeRu.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}
			}


			try{
				await  saveMainImg(item)
			  await  saveGallaryImg(item)
        if (item.cafeUa.idGallaryRemove.length >= 0) {
					item.cafeUa.idGallaryRemove = []
				}
				if (item.cafeRu.idGallaryRemove.length >= 0) {
					item.cafeRu.idGallaryRemove = []
				}

        await set(ref(database, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}`),{
          ...item
        })
		commit('setCafeList', item)
			}catch(e){
				console.log(e)
			} finally{}


			
		},

    async load({commit}){
      try {

				const cafeRef = ref(database, `${DATABASE_PATH}/${CAFE_PAGE_DATABASE_PATH}`)
				const cafeRecord = await get(cafeRef)
				if (cafeRecord.exists()) {
          
					const cafeItem = cafeRecord.val()
          if (!cafeItem.cafeUa.gallary) {
            cafeItem.cafeUa.gallary = []
          }
          if (!cafeItem.cafeRu.gallary) {
            cafeItem.cafeRu.gallary = []
          }
          if (!cafeItem.cafeUa.idGallaryRemove) {
            cafeItem.cafeUa.idGallaryRemove = []
          }
          if (!cafeItem.cafeRu.idGallaryRemove) {
            cafeItem.cafeRu.idGallaryRemove = []
          }
					
					commit('setCafeList', cafeItem)
				}

			} catch (e) {
				console.log(e)
			} finally { }
    },

	},
	mutations: {
    setCafeList(state, item){
      state.cafe = item
    }
	}
}




// export const cafePage = {
// 	namespaced: true,

// 	state: () => ({
		
// 	}),
// 	getters: {
	
// 	},
// 	actions: {
		

// 	},
// 	mutations: {
	
// 	}
// }