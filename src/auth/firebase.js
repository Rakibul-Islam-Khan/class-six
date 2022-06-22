// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD834G9DGM5uV9LpKK6tUubU1RnoaIpwPw",
  authDomain: "note-app-2b035.firebaseapp.com",
  projectId: "note-app-2b035",
  storageBucket: "note-app-2b035.appspot.com",
  messagingSenderId: "780722324281",
  appId: "1:780722324281:web:099cd7ac31578c1fbf9ee8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;