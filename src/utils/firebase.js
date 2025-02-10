// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth} from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPK4XhuMwrUOxj-xo3M6Z8tWcB_KFr4Fw",
  authDomain: "netflixgpt-fd087.firebaseapp.com",
  projectId: "netflixgpt-fd087",
  storageBucket: "netflixgpt-fd087.firebasestorage.app",
  messagingSenderId: "869556484498",
  appId: "1:869556484498:web:faca84e8e4e1aa52c1e94b",
  measurementId: "G-2HX4ENKX2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();