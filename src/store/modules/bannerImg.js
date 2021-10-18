import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, put } from "firebase/storage";




export default {
	state: () => ({
		storage: storage,


	}),
	actions: {
		addImage() {
			const fileImg = document.getElementById('input-img').files[0];
			const storageRef = ref(storage, 'image');
			uploadBytes(storageRef, fileImg).then((snapshot) => {

				const puts = put(fileImg);
				console.log(puts);
			});

		}

	}
}
