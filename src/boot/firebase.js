import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

// Agregar configuración firebase:
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let storage = firebase.storage()

export { db, storage, firebase };
