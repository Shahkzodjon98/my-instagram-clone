import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDeoQximL4xMmTS9V0gm3QRY1hOXNAGTpw",
  authDomain: "instagram-bcd7d.firebaseapp.com",
  projectId: "instagram-bcd7d",
  storageBucket: "instagram-bcd7d.appspot.com",
  messagingSenderId: "193696635560",
  appId: "1:193696635560:web:5e3352da6184d3e251c09d",
  measurementId: "G-6P27C9CMZ9"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
export { firestore, auth, storage, analytics };
