// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3_B_2YGBJijL__jjBRIyH4JxfiwqWqTw",
  authDomain: "fir-test-af9cc.firebaseapp.com",
  projectId: "fir-test-af9cc",
  storageBucket: "fir-test-af9cc.appspot.com",
  messagingSenderId: "295372262630",
  appId: "1:295372262630:web:4ae113d099858e134bbf27",
  measurementId: "G-HTS0EWPLZV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// email and password login authentication
export const auth = getAuth(app);
// authentication using google 
export const googleProvider = new GoogleAuthProvider()

// accessing the fireStore database 
export const db = getFirestore(app);

// accessing the firebase storage service
export const storage = getStorage(app);
