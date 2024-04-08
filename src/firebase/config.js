
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import 'firebase/auth'
import { getStorage } from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhWjcD5W6_ywT09zMjlae_XSvcLCuNwsc",
    authDomain: "fir-a6387.firebaseapp.com",
    projectId: "fir-a6387",
    storageBucket: "fir-a6387.appspot.com",
    messagingSenderId: "266245223866",
    appId: "1:266245223866:web:b5c5a65f5aff54673bd983",
    measurementId: "G-H0TJFRTQCH"
};

export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
export const storage = getStorage(app, `gs://fir-a6387.appspot.com`)