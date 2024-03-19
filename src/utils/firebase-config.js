
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDyO2WWaUzClGOMahJPzxr67hKFo6EPt5E",
  authDomain: "react-netflix-clone-d6605.firebaseapp.com",
  projectId: "react-netflix-clone-d6605",
  storageBucket: "react-netflix-clone-d6605.appspot.com",
  messagingSenderId: "498835893577",
  appId: "1:498835893577:web:88a4c3d2d179f451b13e98",
  measurementId: "G-1GRFJ7FTWM"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);