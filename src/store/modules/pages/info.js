
import { database, storage } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
//this.$store.getters[`cinema/getCinemas`]


const INFO_PAGE_DATABASE_PATH = 'info';
const DATABASE_PATH = 'pages';
export const infoPage = {
	namespaced: true,

	state: () => ({
		info: null
	}),
	getters: {
	getInfo(state){
    return state.info
  }
	},
	actions: {
		async save({commit}, item){
		


			async function saveMainImg(item) {
				if (item.infoUa.mainImg.imgUrl && item.infoUa.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ua/mainImg/${item.infoUa.mainImg.id}`)
					await deleteObject(storageRef)
				}
				if (item.infoRu.mainImg.imgUrl && item.infoRu.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ru/mainImg/${item.infoRu.mainImg.id}`)
					await deleteObject(storageRef)
				}



				if (item.infoUa.mainImg.img) {
					const img = item.infoUa.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ua/mainImg/${item.infoUa.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ua/mainImg/${item.infoUa.mainImg.id}`))
					item.infoUa.mainImg.imgUrl = url;
					item.infoUa.mainImg.img = '';
					item.infoUa.mainImg.mainLocal = '';
				}
				if (item.infoRu.mainImg.img) {
					const img = item.infoRu.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ru/mainImg/${item.infoRu.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ru/mainImg/${item.infoRu.mainImg.id}`))
					item.infoRu.mainImg.imgUrl = url;
					item.infoRu.mainImg.img = '';
					item.infoRu.mainImg.mainLocal = '';
				}

			}

			async function saveGallaryImg(item) {
				if (item.infoUa.idGallaryRemove.length >= 0) {

					const idArray = item.infoUa.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ua/gallary/${id}`)
						deleteObject(storageRef)
					})
				}
				if (item.infoRu.idGallaryRemove.length >= 0) {
					const idArray = item.infoRu.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ru/gallary/${id}`)
						deleteObject(storageRef)
					})
				}



				if (item.infoUa.gallary.length >= 0) {
					const gallary = item.infoUa.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}


				if (item.infoRu.gallary.length >= 0) {
					const gallary = item.infoRu.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}
			}


			try{
				await  saveMainImg(item)
			  await  saveGallaryImg(item)
        if (item.infoUa.idGallaryRemove.length >= 0) {
					item.infoUa.idGallaryRemove = []
				}
				if (item.infoRu.idGallaryRemove.length >= 0) {
					item.infoRu.idGallaryRemove = []
				}

        await set(ref(database, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}`),{
          ...item
        })
		commit('setInfoList', item)
			}catch(e){
				console.log(e)
			} finally{}


			
		},

    async load({commit}){
      try {

				const infoRef = ref(database, `${DATABASE_PATH}/${INFO_PAGE_DATABASE_PATH}`)
				const infoRecord = await get(infoRef)
				if (infoRecord.exists()) {
          
					const infoItem = infoRecord.val()
          if (!infoItem.infoUa.gallary) {
            infoItem.infoUa.gallary = []
          }
          if (!infoItem.infoRu.gallary) {
            infoItem.infoRu.gallary = []
          }
          if (!infoItem.infoUa.idGallaryRemove) {
            infoItem.infoUa.idGallaryRemove = []
          }
          if (!infoItem.infoRu.idGallaryRemove) {
            infoItem.infoRu.idGallaryRemove = []
          }
					
					commit('setInfoList', infoItem)
				}

			} catch (e) {
				console.log(e)
			} finally { }
    },

	},
	mutations: {
    setInfoList(state, item){
      state.info = item
    }
	}
}




// export const infoPage = {
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