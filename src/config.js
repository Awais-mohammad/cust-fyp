// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe1rPtp4ziWdWrwXVcZ8VOh1tzD5VHY1c",
  authDomain: "piertop-ffb96.firebaseapp.com",
  projectId: "piertop-ffb96",
  storageBucket: "piertop-ffb96.appspot.com",
  messagingSenderId: "215696457194",
  appId: "1:215696457194:web:c6fb5505c9f87ab3e90693",
  measurementId: "G-4C2J3EYSF2"
};

// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

export const db = getFirestore(firebaseApp);
