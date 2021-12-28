
import { database, storage } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
//this.$store.getters[`cinema/getCinemas`]



const DATABASE_PATH = 'pages';
export const customPage = {
	namespaced: true,

	state: () => ({
		customPages: []
	}),
	getters: {
	getCustom(state){
    return state.customPages
  }
	},
	actions: {
		async save({commit, getters}, item){
		


			async function saveMainImg(item) {
				if (item.customUa.mainImg.imgUrl && item.customUa.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ua/mainImg/${item.customUa.mainImg.id}`)
					await deleteObject(storageRef)
				}
				if (item.customRu.mainImg.imgUrl && item.customRu.mainImg.img) {
					const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ru/mainImg/${item.customRu.mainImg.id}`)
					await deleteObject(storageRef)
				}



				if (item.customUa.mainImg.img) {
					const img = item.customUa.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ua/mainImg/${item.customUa.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ua/mainImg/${item.customUa.mainImg.id}`))
					item.customUa.mainImg.imgUrl = url;
					item.customUa.mainImg.img = '';
					item.customUa.mainImg.mainLocal = '';
				}
				if (item.customRu.mainImg.img) {
					const img = item.customRu.mainImg.img
					const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ru/mainImg/${item.customRu.mainImg.id}`)
					await uploadBytes(storageRef, img)
					const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ru/mainImg/${item.customRu.mainImg.id}`))
					item.customRu.mainImg.imgUrl = url;
					item.customRu.mainImg.img = '';
					item.customRu.mainImg.mainLocal = '';
				}

			}

			async function saveGallaryImg(item) {
				if (item.customUa.idGallaryRemove.length >= 0) {

					const idArray = item.customUa.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ua/gallary/${id}`)
						deleteObject(storageRef)
					})
				}
				if (item.customRu.idGallaryRemove.length >= 0) {
					const idArray = item.customRu.idGallaryRemove;
					await idArray.forEach(id => {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ru/gallary/${id}`)
						deleteObject(storageRef)
					})
				}



				if (item.customUa.gallary.length >= 0) {
					const gallary = item.customUa.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ua/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ua/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ua/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}


				if (item.customRu.gallary.length >= 0) {
					const gallary = item.customRu.gallary;
					for (let i = 0; i < gallary.length; i++) {
						if (gallary[i].image && gallary[i].url) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ru/gallary/${gallary[i].id}`)
							await deleteObject(storageRef)
						}
						if (gallary[i].image) {
							const img = gallary[i].image;
							const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ru/gallary/${gallary[i].id}`)
							await uploadBytes(storageRef, img)
							const url = await getDownloadURL(refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ru/gallary/${gallary[i].id}`))
							gallary[i].url = url;
							gallary[i].image = ''
						}
					}
				}
			}


			try{
				await  saveMainImg(item)
			    await  saveGallaryImg(item)
        if (item.customUa.idGallaryRemove.length >= 0) {
					item.customUa.idGallaryRemove = []
				}
				if (item.customRu.idGallaryRemove.length >= 0) {
					item.customRu.idGallaryRemove = []
				}

        await set(ref(database, `${DATABASE_PATH}/customPages/${item.id}`),{
          ...item
        })

		const getItems = getters.getCustom
		let check = true
		await getItems.forEach((custom)=>{
			if(custom.id == item.id ){
				commit('editCustom', item);
				check = false
			}
		})
		if(check == true){
			commit('setCustomList', item)
     
		}
    console.log(getters.getCustom)


		
			}catch(e){
				console.log(e)
			} finally{}


			
		},

    async load({commit}){
      try {

				const customRef = ref(database, `${DATABASE_PATH}/customPages`)
				const customRecord = await get(customRef)
				if (customRecord.exists()) {
          
					const customItems = []
              customRecord.forEach(item=>{
              const customItem = item.val()
            

          if (!customItem.customUa.gallary) {
            customItem.customUa.gallary = []
          }
          if (!customItem.customRu.gallary) {
            customItem.customRu.gallary = []
          }
          if (!customItem.customUa.idGallaryRemove) {
            customItem.customUa.idGallaryRemove = []
          }
          if (!customItem.customRu.idGallaryRemove) {
            customItem.customRu.idGallaryRemove = []
          }
          customItems.push(customItem)
					})
					commit('setCustomListDatabase', customItems)
				}

			} catch (e) {
				console.log(e)
			} finally { }
    },


    async remove({ commit, getters }, item) {
			if (getters.getCustom) {
				const customRef = ref(database, `${DATABASE_PATH}/customPages`)
				const customRecord = await get(customRef)
				if (customRecord.exists()) {
					set(ref(database, `${DATABASE_PATH}/customPages/${item.id}`), null);
					if (item.customUa.mainImg.imgUrl) {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ua/mainImg/${item.customUa.mainImg.id}`);
						await deleteObject(storageRef)
					}
					if (item.customRu.mainImg.imgUrl) {
						const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ru/mainImg/${item.customRu.mainImg.id}`);
						await deleteObject(storageRef)
					}
					if (item.customUa.gallary) {
						const gallaryImg = item.customUa.gallary;
						for (let i = 0; i < gallaryImg.length; i++) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ua/gallary/${gallaryImg[i].id}`)
							await deleteObject(storageRef)
						}
					}
					if (item.customRu.gallary) {
						const gallaryImg = item.customRu.gallary;
						for (let i = 0; i < gallaryImg.length; i++) {
							const storageRef = refStorage(storage, `${DATABASE_PATH}/customPages/${item.id}/ru/gallary/${gallaryImg[i].id}`)
							await deleteObject(storageRef)
						}
					}
				}
			}
			const customList = getters.getCustom

			customList.forEach((custom, index) => {
				if (custom.id == item.id) {
					commit('deleteCustom', index)
				}
			})
		}

	},
	mutations: {
		setCustomList(state, item){
      state.customPages.push(item) 
    },
    editCustom(state, item){
      state.customPages.forEach(customPage=>{
        if(customPage.id == item.id){
          customPage = item
        }
      })
    },
    setCustomListDatabase(state, items){
      state.customPages = items
    },
    deleteCustom(state, index) {
			state.customPages.splice(index, 1)
		},
	}
}




// export const customPage = {
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