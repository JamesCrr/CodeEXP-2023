// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref as createDatabaseRef, set, push } from "firebase/database";
import { getStorage, ref as createStorageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpLEaypKRTTzDJyvNVBFTW65qJtSgIdo8",
  authDomain: "code-exp-borrowbuddy.firebaseapp.com",
  databaseURL: "https://code-exp-borrowbuddy-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "code-exp-borrowbuddy",
  storageBucket: "code-exp-borrowbuddy.appspot.com",
  messagingSenderId: "952131407797",
  appId: "1:952131407797:web:a52fd81aed2aa49ef2d3fc",
  measurementId: "G-BHTXRF3ND9",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
// Initialize Authentication and get a reference to the service
export const auth = getAuth(app);

export const firestore = getFirestore(app);
