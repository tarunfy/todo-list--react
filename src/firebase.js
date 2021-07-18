import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAqpvO96Mo-NY_umyftjv92kTg9zguyaUk",
  authDomain: "todo-app-c6b35.firebaseapp.com",
  projectId: "todo-app-c6b35",
  storageBucket: "todo-app-c6b35.appspot.com",
  messagingSenderId: "1019840631137",
  appId: "1:1019840631137:web:216b13d220d96aa7467520",
});

const db = firebaseApp.firestore();

export default db;
