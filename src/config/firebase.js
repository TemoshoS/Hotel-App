// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDfQ3w2ka4p4CaPC6ya_J271XiU0HJoYzY",
  authDomain: "tmz-hotel.firebaseapp.com",
  projectId: "tmz-hotel",
  storageBucket: "tmz-hotel.appspot.com",
  messagingSenderId: "331143715420",
  appId: "1:331143715420:web:015a05a5425359eb642499",
  measurementId: "G-NJHMH2JSSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
export {auth}