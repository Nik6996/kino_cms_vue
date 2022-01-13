import { database, storage } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { ref as refStorage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const mailing = {
	namespaced: true,

	state: () => ({
		mailList: []
	}),
	getters: {
		getMail(state) {
			return state.mailList
		}
	},
	actions: {
		async save({ commit, getters, state }, mail) {

			try {

				const storageRef = refStorage(storage, `mailList/${mail.id}`)
				await uploadBytes(storageRef, mail)
				const url = await getDownloadURL(refStorage(storage, `mailList/${mail.id}`))
				mail.url = url
				mail.name = mail.file.name.split('.')[0]
				mail.file = ''

				const mails = getters.getMail

				if (mails.length >= 5) {


					const itemsRef = ref(database, `mailList`)
					const itemsRecord = await get(itemsRef)
					if (itemsRecord.exists()) {

						await set(ref(database, `mailList/${state.mailList[0].id}`), null);
						const storageRef = refStorage(storage, `mailList/${state.mailList[0].id}`);
						await deleteObject(storageRef);
						await commit('removeFirst')
					}
				}
				await set(ref(database, `mailList/${mail.id}`), {
					...mail
				});

				await commit('setMail', mail)
			} catch (e) {
				console.log(e)
			}
		},
		async load({ commit }) {
			try {
				const itemsRef = ref(database, `mailList`)
				const itemsRecord = await get(itemsRef);
				const items = []
				if (itemsRecord.exists()) {

					itemsRecord.forEach(item => {

						items.push(item.val())
					})

					commit('setMails', items)
				}
			} catch (e) {
				console.log(e)
			}
		},
		async remove({ commit }, id) {

			const itemsRef = ref(database, `mailList`)
			const itemsRecord = await get(itemsRef)
			if (itemsRecord.exists()) {
				await set(ref(database, `mailList/${id}`), null);
				const storageRef = refStorage(storage, `mailList/${id}`);
				await deleteObject(storageRef);
				await commit('removeSample', id)
			}
		}


	},
	mutations: {
		setMail(state, sample) {
			state.mailList.push(sample)
		},
		setMails(state, items) {
			state.mailList = items
		},
		removeSample(state, id) {
			const items = state.mailList
			items.forEach((item, index) => {

				if (item.id === id) {

					state.mailList.splice(index, 1)
				}
			})
		},
		removeFirst(state) {
			state.mailList.splice(0, 1)
		}
	}
}