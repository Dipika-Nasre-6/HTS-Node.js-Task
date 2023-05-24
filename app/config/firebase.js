const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
require("firebase/compat/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCkKi-3HY2HuG54h4QSRRDfJuIuhJzxyyI",
    authDomain: "hts-nodejs.firebaseapp.com",
    projectId: "hts-nodejs",
    storageBucket: "hts-nodejs.appspot.com",
    messagingSenderId: "819518263073",
    appId: "1:819518263073:web:2a9c55d6fd18fca8ae3860",
    measurementId: "G-8R9YQVL4QH"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;