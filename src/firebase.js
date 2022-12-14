// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu_-8cAQo_fVqQPSHO1Ea52-Yj5i64AhE",
  authDomain: "fir-todo-13af6.firebaseapp.com",
  projectId: "fir-todo-13af6",
  storageBucket: "fir-todo-13af6.appspot.com",
  messagingSenderId: "787833944764",
  appId: "1:787833944764:web:62fb975acaaf0f33736eb9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
