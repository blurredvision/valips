// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM0D6u6XE9aDV7j3-e-DAO1CS2bncdxLc",
  authDomain: "valips.firebaseapp.com",
  projectId: "valips",
  storageBucket: "valips.appspot.com",
  messagingSenderId: "1036363889607",
  appId: "1:1036363889607:web:55216158e5d467b023b7e2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };