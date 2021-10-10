import { createApp } from 'vue'
import App from '@/App'
import router from '@/router/router'
import store from './store'
//-------------------------------------------------------------------------------------------------------
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'



const firebaseConfig = {
	apiKey: "AIzaSyBFYqRK_023vbbZ8z_NzZrYCiB1XPApNAI",
	authDomain: "kino-cms-43b9e.firebaseapp.com",
	projectId: "kino-cms-43b9e",
	storageBucket: "kino-cms-43b9e.appspot.com",
	messagingSenderId: "635748189470",
	appId: "1:635748189470:web:c0f9fdc320e89dbb78f50f",
	measurementId: "G-V2KZYEPMCW"
};

initializeApp(firebaseConfig);
//--------------------------------------------------------------------------------------------------------
const app = createApp(App)

app
	.use(store)
	.use(router)
	.mount('#app')