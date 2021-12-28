
import { database, storage } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
//this.$store.getters[`cinema/getCinemas`]


const CHILDRENS_PAGE_DATABASE_PATH = 'childrens';
const DATABASE_PATH = 'pages';
export const childrensPage = {
	namespaced: true,
	
	state: () => ({
		childrens: null
	}),
	getters: {
	getChildrens(state){
    return state.childrens
  }
	},
	actions: {
		async save({commit}, item){
		


			async function saveMainImg(item) {
				if (item.childrensUa.mainImg.imgUrl && item.childrensUa.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ua/mainImg/${item.childrensUa.mainImg.id}`)
					await deleteObject(storageRef)
				}
				if (item.childrensRu.mainImg.imgUrl && item.childrensRu.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ru/mainImg/${item.childrensRu.mainImg.id}`)
					await deleteObject(storageRef)
				}



				if (item.childrensUa.mainImg.img) {
					const img = item.childrensUa.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ua/mainImg/${item.childrensUa.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ua/mainImg/${item.childrensUa.mainImg.id}`))
					item.childrensUa.mainImg.imgUrl = url;
					item.childrensUa.mainImg.img = '';
					item.childrensUa.mainImg.mainLocal = '';
				}
				if (item.childrensRu.mainImg.img) {
					const img = item.childrensRu.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ru/mainImg/${item.childrensRu.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ru/mainImg/${item.childrensRu.mainImg.id}`))
					item.childrensRu.mainImg.imgUrl = url;
					item.childrensRu.mainImg.img = '';
					item.childrensRu.mainImg.mainLocal = '';
				}

			}

			async function saveGallaryImg(item) {
				if (item.childrensUa.idGallaryRemove.length >= 0) {

					const idArray = item.childrensUa.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ua/gallary/${id}`)
						deleteObject(storageRef)
					})
				}
				if (item.childrensRu.idGallaryRemove.length >= 0) {
					const idArray = item.childrensRu.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ru/gallary/${id}`)
						deleteObject(storageRef)
					})
				}



				if (item.childrensUa.gallary.length >= 0) {
					const gallary = item.childrensUa.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}


				if (item.childrensRu.gallary.length >= 0) {
					const gallary = item.childrensRu.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}
			}


			try{
				await  saveMainImg(item)
			  await  saveGallaryImg(item)
        if (item.childrensUa.idGallaryRemove.length >= 0) {
					item.childrensUa.idGallaryRemove = []
				}
				if (item.childrensRu.idGallaryRemove.length >= 0) {
					item.childrensRu.idGallaryRemove = []
				}

        await set(ref(database, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}`),{
          ...item
        })
		commit('setChildrensList', item)
			}catch(e){
				console.log(e)
			} finally{}


			
		},

    async load({commit}){
      try {

				const childrensRef = ref(database, `${DATABASE_PATH}/${CHILDRENS_PAGE_DATABASE_PATH}`)
				const childrensRecord = await get(childrensRef)
				if (childrensRecord.exists()) {
          
					const childrensItem = childrensRecord.val()
          if (!childrensItem.childrensUa.gallary) {
            childrensItem.childrensUa.gallary = []
          }
          if (!childrensItem.childrensRu.gallary) {
            childrensItem.childrensRu.gallary = []
          }
          if (!childrensItem.childrensUa.idGallaryRemove) {
            childrensItem.childrensUa.idGallaryRemove = []
          }
          if (!childrensItem.childrensRu.idGallaryRemove) {
            childrensItem.childrensRu.idGallaryRemove = []
          }
					
					commit('setChildrensList', childrensItem)
				}

			} catch (e) {
				console.log(e)
			} finally { }
    },

	},
	mutations: {
    setChildrensList(state, item){
      state.childrens = item
    }
	}
}




// export const childrensPage = {
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