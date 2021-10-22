import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL, getMetadata } from "firebase/storage";




export default {
	state: () => ({
		storage: storage,
		urlImg: [],
		imgId: '',
		urlStorage: '',
		nameImg: ''
	}),
	actions: {
		addImage() {                   // загружаю картинку на сервер, именем служит id
			const fileImg = this.getters.getUrl;
			for (let img of fileImg) {
				console.log(img)
				const storageRef = ref(storage, `banners/${img.imgId}`);
				uploadBytes(storageRef, img);
			}

		},

		uploadImg() {        //   получаю ссылку на картинку

			getDownloadURL(ref(storage, `banners/${this.getters.getImgId}`)).then((url) => {
				console.log(url)

				this.state.urlStorage = url
			})

		},
		saveImg() {
			const refStorage = ref(storage, `banners/${this.getters.getImgId}`)
			getMetadata(refStorage)
				.then((metadata) => {

					this.state.nameImg = metadata.name
					console.log(this.state.nameImg)
				})
				.catch((error) => {
				});
		}

	},
	getters: {
		getUrl(state) {
			return state.urlImg
		},
		getImgId(state) {                //добавляю id для картинки
			return state.imgId
		},
		urlStorage(state) {
			return state.urlStorage
		},
		nameImg(state) {
			return state.nameImg
		}
	},
	mutations: {
		setImg: (state, payload) => {
			state.urlImg.push(payload)
		},
		setImgId: (state, payload) => {    //добавляю id для картинки
			state.imgId = payload
		},



	}
}
