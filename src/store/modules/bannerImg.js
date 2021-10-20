import { storage } from "../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";




export default {
	state: () => ({
		storage: storage,

	}),
	actions: {
		addImage() {
			const fileImg = document.getElementById("input-img").files[0];
			console.log(fileImg)
			const storageRef = ref(storage, `banners/${fileImg.name}`);
			uploadBytes(storageRef, fileImg);
		},

		uploadImg() {

			getDownloadURL(ref(storage, `banners/Vue.js.png`)).then((url) => {
				console.log(url)



			})
		}

	},
	getters: {

	}
}
