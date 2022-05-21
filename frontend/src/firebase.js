import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRRABUEvzAlunhcPTs0mb8XhxOVEbKKaQ",
  authDomain: "stackoverflow-2d467.firebaseapp.com",
  projectId: "stackoverflow-2d467",
  storageBucket: "stackoverflow-2d467.appspot.com",
  messagingSenderId: "297418803366",
  appId: "1:297418803366:web:bc9aea1684584a8d52cc67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
// export default db;
