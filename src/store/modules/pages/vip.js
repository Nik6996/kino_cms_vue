
import { database, storage } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
//this.$store.getters[`cinema/getCinemas`]


const VIP_PAGE_DATABASE_PATH = 'vip';
const DATABASE_PATH = 'pages';
export const vipPage = {
	namespaced: true,

	state: () => ({
		vip: null
	}),
	getters: {
	getVip(state){
    return state.vip
  }
	},
	actions: {
		async save({commit}, item){
		


			async function saveMainImg(item) {
				if (item.vipUa.mainImg.imgUrl && item.vipUa.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ua/mainImg/${item.vipUa.mainImg.id}`)
					await deleteObject(storageRef)
				}
				if (item.vipRu.mainImg.imgUrl && item.vipRu.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ru/mainImg/${item.vipRu.mainImg.id}`)
					await deleteObject(storageRef)
				}



				if (item.vipUa.mainImg.img) {
					const img = item.vipUa.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ua/mainImg/${item.vipUa.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ua/mainImg/${item.vipUa.mainImg.id}`))
					item.vipUa.mainImg.imgUrl = url;
					item.vipUa.mainImg.img = '';
					item.vipUa.mainImg.mainLocal = '';
				}
				if (item.vipRu.mainImg.img) {
					const img = item.vipRu.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ru/mainImg/${item.vipRu.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ru/mainImg/${item.vipRu.mainImg.id}`))
					item.vipRu.mainImg.imgUrl = url;
					item.vipRu.mainImg.img = '';
					item.vipRu.mainImg.mainLocal = '';
				}

			}

			async function saveGallaryImg(item) {
				if (item.vipUa.idGallaryRemove.length >= 0) {

					const idArray = item.vipUa.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ua/gallary/${id}`)
						deleteObject(storageRef)
					})
				}
				if (item.vipRu.idGallaryRemove.length >= 0) {
					const idArray = item.vipRu.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ru/gallary/${id}`)
						deleteObject(storageRef)
					})
				}



				if (item.vipUa.gallary.length >= 0) {
					const gallary = item.vipUa.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ua/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}


				if (item.vipRu.gallary.length >= 0) {
					const gallary = item.vipRu.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}/ru/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}
			}


			try{
				await  saveMainImg(item)
			  await  saveGallaryImg(item)
        if (item.vipUa.idGallaryRemove.length >= 0) {
					item.vipUa.idGallaryRemove = []
				}
				if (item.vipRu.idGallaryRemove.length >= 0) {
					item.vipRu.idGallaryRemove = []
				}

        await set(ref(database, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}`),{
          ...item
        })
		commit('setVipList', item)
			}catch(e){
				console.log(e)
			} finally{}


			
		},

    async load({commit}){
      try {

				const vipRef = ref(database, `${DATABASE_PATH}/${VIP_PAGE_DATABASE_PATH}`)
				const vipRecord = await get(vipRef)
				if (vipRecord.exists()) {
          
					const vipItem = vipRecord.val()
          if (!vipItem.vipUa.gallary) {
            vipItem.vipUa.gallary = []
          }
          if (!vipItem.vipRu.gallary) {
            vipItem.vipRu.gallary = []
          }
          if (!vipItem.vipUa.idGallaryRemove) {
            vipItem.vipUa.idGallaryRemove = []
          }
          if (!vipItem.vipRu.idGallaryRemove) {
            vipItem.vipRu.idGallaryRemove = []
          }
					
					commit('setVipList', vipItem)
				}

			} catch (e) {
				console.log(e)
			} finally { }
    },

	},
	mutations: {
    setVipList(state, item){
      state.vip = item
    }
	}
}




// export const vipPage = {
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