// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRhPhVksCakvJp8CGqYGGFkuQpYF93zeI",
  authDomain: "todo-b7b0d.firebaseapp.com",
  projectId: "todo-b7b0d",
  storageBucket: "todo-b7b0d.appspot.com",
  messagingSenderId: "737478614241",
  appId: "1:737478614241:web:f259ab02984df570e8aba0",
  measurementId: "G-4H6FHWT5PT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const authenticated = getAuth(app);
export const db = getFirestore(app);
export const imageDb = getStorage(app);

