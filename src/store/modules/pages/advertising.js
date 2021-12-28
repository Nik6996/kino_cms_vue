
import { database, storage } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
//this.$store.getters[`cinema/getCinemas`]


const ADVERSTISING_PAGE_DATABASE_PATH = 'advertising';
const DATABASE_PATH = 'pages';
export const advertisingPage = {
	namespaced: true,

	state: () => ({
		advertising: null
	}),
	getters: {
	getAdvertising(state){
    return state.advertising
  }
	},
	actions: {
		async save({commit}, item){
		


			async function saveMainImg(item) {
				if (item.advertisingUa.mainImg.imgUrl && item.advertisingUa.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ua/mainImg/${item.advertisingUa.mainImg.id}`)
					await deleteObject(storageRef)
				}
				if (item.advertisingRu.mainImg.imgUrl && item.advertisingRu.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ru/mainImg/${item.advertisingRu.mainImg.id}`)
					await deleteObject(storageRef)
				}



				if (item.advertisingUa.mainImg.img) {
					const img = item.advertisingUa.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ua/mainImg/${item.advertisingUa.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ua/mainImg/${item.advertisingUa.mainImg.id}`))
					item.advertisingUa.mainImg.imgUrl = url;
					item.advertisingUa.mainImg.img = '';
					item.advertisingUa.mainImg.mainLocal = '';
				}
				if (item.advertisingRu.mainImg.img) {
					const img = item.advertisingRu.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ru/mainImg/${item.advertisingRu.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ru/mainImg/${item.advertisingRu.mainImg.id}`))
					item.advertisingRu.mainImg.imgUrl = url;
					item.advertisingRu.mainImg.img = '';
					item.advertisingRu.mainImg.mainLocal = '';
				}

			}

			async function saveGallaryImg(item) {
				if (item.advertisingUa.idGallaryRemove.length >= 0) {

					const idArray = item.advertisingUa.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ua/gallary/${id}`)
						deleteObject(storageRef)
					})
				}
				if (item.advertisingRu.idGallaryRemove.length >= 0) {
					const idArray = item.advertisingRu.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ru/gallary/${id}`)
						deleteObject(storageRef)
					})
				}



				if (item.advertisingUa.gallary.length >= 0) {
					const gallary = item.advertisingUa.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}


				if (item.advertisingRu.gallary.length >= 0) {
					const gallary = item.advertisingRu.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}
			}


			try{
				await  saveMainImg(item)
			  await  saveGallaryImg(item)
        if (item.advertisingUa.idGallaryRemove.length >= 0) {
					item.advertisingUa.idGallaryRemove = []
				}
				if (item.advertisingRu.idGallaryRemove.length >= 0) {
					item.advertisingRu.idGallaryRemove = []
				}

        await set(ref(database, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}`),{
          ...item
        })
		commit('setAdvertisingList', item)
			}catch(e){
				console.log(e)
			} finally{}


			
		},

    async load({commit}){
      try {

				const advertisingRef = ref(database, `${DATABASE_PATH}/${ADVERSTISING_PAGE_DATABASE_PATH}`)
				const advertisingRecord = await get(advertisingRef)
				if (advertisingRecord.exists()) {
          
					const advertisingItem = advertisingRecord.val()
          if (!advertisingItem.advertisingUa.gallary) {
            advertisingItem.advertisingUa.gallary = []
          }
          if (!advertisingItem.advertisingRu.gallary) {
            advertisingItem.advertisingRu.gallary = []
          }
          if (!advertisingItem.advertisingUa.idGallaryRemove) {
            advertisingItem.advertisingUa.idGallaryRemove = []
          }
          if (!advertisingItem.advertisingRu.idGallaryRemove) {
            advertisingItem.advertisingRu.idGallaryRemove = []
          }
					
					commit('setAdvertisingList', advertisingItem)
				}

			} catch (e) {
				console.log(e)
			} finally { }
    },

	},
	mutations: {
    setAdvertisingList(state, item){
      state.advertising = item
    }
	}
}




// export const advertisingPage = {
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