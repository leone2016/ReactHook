importScripts("https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.2/firebase-messaging.js");

const config = {
    apiKey: "AIzaSyDeZSUEgf7anW2XMgUMOgiHLC0-T6Coszc",
    authDomain: "home-b0086.firebaseapp.com",
    databaseURL: "https://home-b0086.firebaseio.com",
    projectId: "home-b0086",
    storageBucket: "home-b0086.appspot.com",
    messagingSenderId: "636398865715",
    appId: "1:636398865715:web:7839c1607e02af2a710246",
    measurementId: "G-0LEKDYRN86"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();