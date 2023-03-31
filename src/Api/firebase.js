import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyBRk5dASmCbSoV236f5q7lXo32rdZrxGrk",
    authDomain: "http404-80bae.firebaseapp.com",
    databaseURL: "https://http404-80bae-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "http404-80bae",
    storageBucket: "http404-80bae.appspot.com",
    messagingSenderId: "202485745101",
    appId: "1:202485745101:web:0a85aaf4d5860c614c7084"
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)