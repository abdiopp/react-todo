// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAF118158MPtmDKNGWarX1rzNyaovRQjQ4",
    authDomain: "todoappreact-73fca.firebaseapp.com",
    projectId: "todoappreact-73fca",
    storageBucket: "todoappreact-73fca.appspot.com",
    messagingSenderId: "996493663256",
    appId: "1:996493663256:web:f7ee788c7e778ca529776d",
    measurementId: "G-WSTR50NZZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, analytics, firestore, storage, auth }