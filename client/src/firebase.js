// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "property-pro-75317.firebaseapp.com",
  projectId: "property-pro-75317",
  storageBucket: "property-pro-75317.appspot.com",
  messagingSenderId: "961925966523",
  appId: "1:961925966523:web:b2f4b924137e1d455d979e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
