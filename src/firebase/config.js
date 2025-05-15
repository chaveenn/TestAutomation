// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNZ49gKowIVOSlBUep2P9-LlYtY48tcOI",
  authDomain: "autocyptest.firebaseapp.com",
  databaseURL: "https://autocyptest-default-rtdb.firebaseio.com",
  projectId: "autocyptest",
  storageBucket: "autocyptest.firebasestorage.app",
  messagingSenderId: "25000715666",
  appId: "1:25000715666:web:c79aee778be1c96f670d4b",
  measurementId: "G-K901WPX862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;