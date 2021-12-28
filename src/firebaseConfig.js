import { initializeApp } from "firebase/app";

// import 'firebase/auth'
//import 'firebase/database'
//import 'firebase/storage'
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBFYqRK_023vbbZ8z_NzZrYCiB1XPApNAI",
	authDomain: "kino-cms-43b9e.firebaseapp.com",
	projectId: "kino-cms-43b9e",
	storageBucket: "gs://kino-cms-43b9e.appspot.com",
	messagingSenderId: "635748189470",
	appId: "1:635748189470:web:c0f9fdc320e89dbb78f50f",
	measurementId: "G-V2KZYEPMCW"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
// export const auth = getAuth(firebaseApp);
// export const createUser = createUserWithEmailAndPassword(firebaseApp);

