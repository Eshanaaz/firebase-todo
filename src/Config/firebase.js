
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAR_1RBBlf9rWODOXxl7ykV7cGXuFZk0FM",
  authDomain: "fir-todo-ba37f.firebaseapp.com",
  projectId: "fir-todo-ba37f",
  storageBucket: "fir-todo-ba37f.appspot.com",
  messagingSenderId: "988107100766",
  appId: "1:988107100766:web:e05b63c2567d0e9503dacf",
  measurementId: "G-BXEG0VDPT3"
};

const app = initializeApp(firebaseConfig);


const db= getFirestore ()

export {db}