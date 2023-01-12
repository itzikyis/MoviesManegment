//import firebase from 'firebase'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

require('firebase/auth')

var firebaseConfig = {
  apiKey: "AIzaSyDmDRrhDaEyFOgRU7Ymlt8ZARX8u-85QcY",
  authDomain: "movies---subscriptions.firebaseapp.com",
  databaseURL: "https://movies---subscriptions-default-rtdb.firebaseio.com",
  projectId: "movies---subscriptions",
  storageBucket: "movies---subscriptions.appspot.com",
  messagingSenderId: "906850542797",
  appId: "1:906850542797:web:4ae90e957f5f09856ff584",
  measurementId: "G-5GCDX1HL83"
};
// Initialize Firebase
var app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;