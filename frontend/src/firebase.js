import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIxk4u2D_Emp3TXu5-A90HjCPrTYWBxCI",
  authDomain: "askme-9e82b.firebaseapp.com",
  projectId: "askme-9e82b",
  storageBucket: "askme-9e82b.appspot.com",
  messagingSenderId: "323208094318",
  appId: "1:323208094318:web:c71a0296e00075d120bc7f"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };