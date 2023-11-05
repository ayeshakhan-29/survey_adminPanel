/* eslint-disable */
/// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC504F3NJ5upUdeQHfUFyhILW8CHLUMtfU",
  authDomain: "survey-app-ac363.firebaseapp.com",
  projectId: "survey-app-ac363",
  storageBucket: "survey-app-ac363.appspot.com",
  messagingSenderId: "751068862716",
  appId: "1:751068862716:web:54ffc6914207dfab741f79",
  measurementId: "G-X9NDN4WL0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Now that the app is initialized, you can set up other Firebase services
const auth = getAuth(app);

// Enable session persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Session persistence successfully enabled
  })
  .catch((error) => {
    // Handle any errors here
    console.error('Error enabling session persistence:', error);
  });

const db = getFirestore(app);

export { auth, db };
