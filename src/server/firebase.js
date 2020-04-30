import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyA1UKZC0V5KU92YId2Wfc9nI0GUu70xyCA",
    authDomain: "inmobiliariapp-593.firebaseapp.com",
    databaseURL: "https://inmobiliariapp-593.firebaseio.com",
    projectId: "inmobiliariapp-593",
    storageBucket: "inmobiliariapp-593.appspot.com",
    messagingSenderId: "1040240383291",
    appId: "1:1040240383291:web:8ed532473bee3a8778931e"
  };

class FirebaseServer{
    constructor(){
        app.initializeApp(firebaseConfig);
        this.db = app.firestore();
        this.auth = app.auth(); // this.auth puede tener cualquier nombre no es obligatorio este 
      
    }
    estaIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    } 
}

export default  FirebaseServer;