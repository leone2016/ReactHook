import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import FirebaseServer, {FirebaseContext} from './server';
/*
<App /> representa a la aplicacion en react

* <firebaseContext.Provider>
    <App />
 :: esto quiere decir que el provider esta sobre toda la aplicacion que se construye
 
 * <firebaseContext.Provider value={new FirebaseServer()}>
    de esta forma se vincula con el value, todos los componentes  de <App/> pueden acceder, al provider FirebaseContext
*/
// const firebaseContext = React.createContext(); se crea en server/context.js
ReactDOM.render(
<FirebaseContext.Provider value={new FirebaseServer()}>
    <App />
</FirebaseContext.Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
