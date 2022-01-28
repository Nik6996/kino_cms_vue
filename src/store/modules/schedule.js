import { database } from "@/firebaseConfig";
import { ref, set, get, } from "firebase/database";




export const schedule = {
	namespaced: true,

	state: () => ({
		seanceList: []
	}),
	getters: {
		getSeanceList(state) {
			return state.seanceList
		}
	},
	actions: {
		async save({ commit, getters }, item) {
			try {
				await set(ref(database, `schedule/${item.id}`), {
					...item
				})

				const items = getters.getSeanceList
				let check = "true"
				await items.forEach(seance => {
					if (seance.id === item.id) {
						check = "false"
					}
				})
				if (check === "true") {
					commit('setSeance', item)
				}

			} catch (e) {
				console.log(e)
			}
		},

		async saveTickets({ }, item) {

			try {
				await set(ref(database, `schedule/${item.id}/tickets`), {
					...item
				})
			} catch (e) { console.log(e) }
		},



		async load({ commit }) {
			try {
				const schedueRef = ref(database, `schedule`);
				const shedueRecords = await get(schedueRef)

				if (shedueRecords.exists()) {
					const items = []
					shedueRecords.forEach(item => {
						items.push(item.val())
					})
					commit('setSeanceList', items)
				}

			} catch (e) {
				console.log(e)
			} finally { }
		},
		async remove({ commit, getters }, item) {
			const seanceList = getters.getSeanceList;

			await set(ref(database, `schedule/${item.id}`), null)

			seanceList.forEach((seance, index) => {
				if (item.id === seance.id) {
					commit('removeSeance', index)
				}
			})
		}
	},

	mutations: {
		setSeance(state, item) {
			state.seanceList.push(item)
		},
		setSeanceList(state, item) {
			state.seanceList = item
		},
		removeSeance(state, index) {
			state.seanceList.splice(index, 1)
		}
	}
}