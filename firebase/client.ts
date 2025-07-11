import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABPjvDmaG1Rg6XOHlY1MR0iV2lBfZc7cc",
  authDomain: "interview-iq-cea10.firebaseapp.com",
  projectId: "interview-iq-cea10",
  storageBucket: "interview-iq-cea10.firebasestorage.app",
  messagingSenderId: "221044643627",
  appId: "1:221044643627:web:1fc7da023981b21577576e",
  measurementId: "G-LF90C3L9LT",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
