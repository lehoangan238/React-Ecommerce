import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD_Eh2HWDzv4XQ3UDaKna18g_EbYfl0Lj0",
  authDomain: "yoloshop-60644.firebaseapp.com",
  projectId: "yoloshop-60644",
  storageBucket: "yoloshop-60644.appspot.com",
  messagingSenderId: "718139588083",
  appId: "1:718139588083:web:6a5b9318ceab17086a2686",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
