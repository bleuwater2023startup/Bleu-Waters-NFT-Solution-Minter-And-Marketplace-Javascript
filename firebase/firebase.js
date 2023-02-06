// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBJfyMXNz1qBU4C1P3gs6872PUFMrdwls",
  authDomain: "bleuwater-b535f.firebaseapp.com",
  projectId: "bleuwater-b535f",
  storageBucket: "bleuwater-b535f.appspot.com",
  messagingSenderId: "612325301415",
  appId: "1:612325301415:web:12bd739b5266a3fa82cf82",
  measurementId: "G-KVYNJ5XLL0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
