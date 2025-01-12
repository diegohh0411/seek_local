// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRT6pDyMXUBWZkFQLI6_Da-zstak5TYn4",
  authDomain: "seek-local-monterrey.firebaseapp.com",
  projectId: "seek-local-monterrey",
  storageBucket: "seek-local-monterrey.firebasestorage.app",
  messagingSenderId: "140567826800",
  appId: "1:140567826800:web:e81c8a1937ef8235e37fb5"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const auth = getAuth(firebase_app);
auth.languageCode = 'es';

const ga_provider = new GoogleAuthProvider();

export default firebase_app;
export { auth, ga_provider };
