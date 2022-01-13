import { database } from "../../firebaseConfig";
import { ref, set, get, } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, deleteUser, updateEmail } from "firebase/auth";


const USER_DATABASE_PATH = 'users'
export const registration = {
	namespaced: true,

	state: () => ({
		users: [],
		currentUserName: ''
	}),
	getters: {
		getUsers(state) {
			return state.users
		},
		getCurrentUserName(state) {
			return state.currentUserName
		}
	},
	actions: {
		async saveUser({ commit, getters }, user) {

			async function emailUpdate(userData) {
				if (userData.email !== user.email) {
					console.log(12345678)
					const auth = getAuth();
					await updateEmail(auth.currentUser, user.email)
				} else {
					console.log('email не поменялся')
				}
				await set(ref(database, `${USER_DATABASE_PATH}/${user.id}`), {
					...user
				})
				commit('editUser', user)
			}

			async function emailSave(user) {
				console.log('новый')
				const auth = getAuth();
				const email = user.email;
				const password = user.password
				await createUserWithEmailAndPassword(auth, email, password)

				commit('setUser', user)
			}




			try {
				if (user.date) {
					user.date = String(user.date)
				}


				const auth = getAuth();
				onAuthStateChanged(auth, (userData) => {
					if (userData) {
						emailUpdate(userData)
					} else {
						emailSave(user)
					}
				})
				//if (auth) {

				// const auth = getAuth();
				// console.log('есть')
				// onAuthStateChanged(auth, (userData) => {
				// 	console.log(userData)

				// })
				// await set(ref(database, `${USER_DATABASE_PATH}/${user.id}`), {
				// 	...user
				// })

				// const users = getters.getUsers;
				// users.forEach(getUser => {
				// 	const auth = getAuth();
				// 	if (getUser.email === auth.email) {
				// 		const auth = getAuth();
				// 		updateEmail(auth.currentUser, user.email)
				// 	}
				// })
				// } else {
				// 	console.log('нету')
				// }

				// await set(ref(database, `${USER_DATABASE_PATH}/${user.id}`), {
				// 	...user
				// })
				// const auth = getAuth();
				// const email = user.email;
				// const password = user.password
				// await createUserWithEmailAndPassword(auth, email, password)
				// 	.then((userCredential) => {
				// 		// Signed in 
				// 		const user = userCredential.user;

				// 	})
				// commit('setUser', user)

			} catch (e) { console.log(e) }
		},
		async load({ commit, getters }) {
			const usersRef = ref(database, `${USER_DATABASE_PATH}`)
			const userRecord = await get(usersRef)
			if (userRecord.exists()) {
				const users = [];
				userRecord.forEach(user => {
					const userItem = user.val();
					if (userItem.date) {
						userItem.date = new Date(userItem.date)
					}
					users.push(userItem)
				})
				commit('setUsers', users)
				const auth = getAuth();
				onAuthStateChanged(auth, (user) => {
					if (user) {

						const uid = user.uid;


						const users = getters.getUsers;
						users.forEach(getUser => {

							if (getUser.email === user.email) {
								commit('setCurrentUser', getUser.name)
							}
						})


					} else {

					}
				});
			}
		},
		async logIn({ commit, getters }, data) {
			try {
				const auth = getAuth();
				const email = data.email;
				const password = data.password;
				signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {

						const user = userCredential.user;

						const users = getters.getUsers;
						users.forEach(getUser => {

							if (getUser.email === user.email) {
								commit('setCurrentUser', getUser.name)
							}
						})
					})


			} catch (e) { console.log(e) }
		},

		async logOff({ commit }) {
			try {
				const auth = getAuth();
				await signOut(auth)
				commit('setCurrentUser', null)
			} catch (e) {
				console.log(e)
			}
		},

		async removeUser({ commit, getters }, id) {
			console.log(id)
			try {
				const auth = getAuth();
				const user = auth.currentUser;
				await deleteUser(user);
				const usersRef = ref(database, `${USER_DATABASE_PATH}`)
				const usersRecord = await get(usersRef)
				if (usersRecord.exists()) {
					await set(ref(database, `${USER_DATABASE_PATH}/${id}`), null)
				}

				const users = getters.getUsers
				users.forEach((user, index) => {
					if (user.id == id) {
						commit('removeUser', index)
					}
				})

			} catch (e) {
				console.log(e)
			}
		}

	},
	mutations: {
		setUser(state, user) {
			state.users.push(user)
		},
		setUsers(state, users) {
			state.users = users
		},
		setCurrentUser(state, name) {
			state.currentUserName = name
		},
		editUser(state, user) {
			state.users.forEach(getUser => {
				if (getUser.id === user.id) {
					getUser = user
				}
			})
		},
		removeUser(state, index) {
			state.users.splice(index, 1)
			state.currentUserName = null
		}
	}
}