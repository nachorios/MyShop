import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBG22YOSv8qDMy3OqJ4x8nmal5a6aU9IMQ",
  authDomain: "my-shop-35578.firebaseapp.com",
  projectId: "my-shop-35578",
  storageBucket: "my-shop-35578.appspot.com",
  messagingSenderId: "645002611311",
  appId: "1:645002611311:web:d0556eeebbef7147ad1b9a",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
