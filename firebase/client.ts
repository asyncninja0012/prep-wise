// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYyPJX1O7wXFAmbTDLmSyd8jFK8yrGLsg",
  authDomain: "prepwise-d7e74.firebaseapp.com",
  databaseURL: "https://prepwise-d7e74-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "prepwise-d7e74",
  storageBucket: "prepwise-d7e74.firebasestorage.app",
  messagingSenderId: "920864809300",
  appId: "1:920864809300:web:95471c9cb4204ba773e8c1",
  measurementId: "G-28FQKDS84P"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);