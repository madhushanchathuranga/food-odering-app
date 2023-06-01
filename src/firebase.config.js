import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAI0LDv9Hu4crQyvK_lseqNu-liAuzfmZU",
  authDomain: "hotel-management-system-cf527.firebaseapp.com",
  databaseURL: "https://hotel-management-system-cf527-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotel-management-system-cf527",
  storageBucket: "hotel-management-system-cf527.appspot.com",
  messagingSenderId: "931947047290",
  appId: "1:931947047290:web:5d7e34781cb394af5a0ec3"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
