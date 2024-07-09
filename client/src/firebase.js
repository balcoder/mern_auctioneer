// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-autioneer.firebaseapp.com",
  projectId: "mern-autioneer",
  storageBucket: "mern-autioneer.appspot.com",
  messagingSenderId: "453796680301",
  appId: "1:453796680301:web:0032f126c871a1e99ba564"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);