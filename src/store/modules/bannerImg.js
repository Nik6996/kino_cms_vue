import { firebaseApp, storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL, getMetadata } from "firebase/storage";
import { ref as databaseRef, set, get } from "firebase/database";



export default {
	state: () => ({
		storage: storage,
		urlImg: [],
		imgId: '',
		urlImgStore: ''
	}),
	actions: {
		async addImage(context) {                   // загружаю картинку на сервер, именем служит id
			const fileImg = this.getters.getUrl;
			for (let img of fileImg) {
				// console.log(img)
				const storageRef = ref(storage, `banners/${img.imgId}`);
				uploadBytes(storageRef, img);

				const url = await getDownloadURL(ref(storage, `banners/${img.imgId}`))

				context.commit('setImgUrl', url)
				console.log(context.state.urlImgStore)







				// const refStorage = ref(storage, `banners/${img.imgId}`)
				// getMetadata(refStorage)
				// 	.then((metadata) => {
				// 		this.state.nameImg = metadata.name
				// 		console.log(this.state.nameImg)
				// 	})
				// 	.catch((error) => {
				// 	});

			}



		},



	},
	getters: {
		getUrl(state) {
			return state.urlImg
		},
		getImgId(state) {                //добавляю id для картинки
			return state.imgId
		},


		getImgUrl(state) {
			return state.urlImgStore
		}
	},
	mutations: {
		setImgUrl: function (state, payload) {
			state.urlImgStore = payload
		},
		setImg: (state, payload) => {
			state.urlImg.push(payload)
		},
		setImgId: (state, payload) => {    //добавляю id для картинки
			state.imgId = payload
		},


	}
}
