import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBTRXeN13mFDgUbRghOAphsJlxEd00KRb0",
  authDomain: "ecorit-ecfe2.firebaseapp.com",
  databaseURL: "https://ecorit-ecfe2-default-rtdb.firebaseio.com",
  projectId: "ecorit-ecfe2",
  storageBucket: "ecorit-ecfe2.appspot.com",
  messagingSenderId: "1004298861566",
  appId: "1:1004298861566:web:97998fc1cb0c9501fb1eaf",
  measurementId: "G-4S7M45CTB2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default{ auth, db };





