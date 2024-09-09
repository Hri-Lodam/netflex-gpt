// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDmKJjjsK0ItCp5nvEDAEb-PdApR_fGMY",
  authDomain: "netflixgpt-fd0e0.firebaseapp.com",
  projectId: "netflixgpt-fd0e0",
  storageBucket: "netflixgpt-fd0e0.appspot.com",
  messagingSenderId: "332591091457",
  appId: "1:332591091457:web:a31f2225f4a2c733545500",
  measurementId: "G-RE98GTFE4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();