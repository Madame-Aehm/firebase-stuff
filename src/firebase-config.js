import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAMT65f3fZGmknSXeVmow3f9EXb7zmupPQ",
  authDomain: "firestore-experiment-b72f8.firebaseapp.com",
  projectId: "firestore-experiment-b72f8",
  storageBucket: "firestore-experiment-b72f8.appspot.com",
  messagingSenderId: "376012499947",
  appId: "1:376012499947:web:f0719fac99e93d88f607ae",
  measurementId: "G-NY76LXH9HZ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

