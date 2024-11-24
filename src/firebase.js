// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIu-l6g43Vc8Q3nW3hXpOn0ug-qXzayVQ",
  authDomain: "khamoo-app.firebaseapp.com",
  projectId: "khamoo-app",
  storageBucket: "khamoo-app.firebasestorage.app",
  messagingSenderId: "439930289772",
  appId: "1:439930289772:web:ab81759eba2574186a2249",
  measurementId: "G-68TG0XLGWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth, analytics };
