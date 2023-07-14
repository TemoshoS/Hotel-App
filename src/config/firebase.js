
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB2BjrlSICTdqYcvdOak07Sp4tUCnR5Wbk",
  authDomain: "hotel-app-c2471.firebaseapp.com",
  projectId: "hotel-app-c2471",
  storageBucket: "hotel-app-c2471.appspot.com",
  messagingSenderId: "481421676071",
  appId: "1:481421676071:web:314fcf1168b260f9c58802",
  measurementId: "G-0B5KZ6MXCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}