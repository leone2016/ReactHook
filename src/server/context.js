import React, { Component } from 'react';

/**
 * Este es un context de la aplicacion que va estar especializado en almacenar el objeto FireBase 
 */
 const FirebaseContext = React.createContext();
/**
 * este consumer va esperar un parametro componente, quire decir que fue creado para ser 
 * consumido por cualquier componente, luego de ser consumido retorna un consumer llamado firebase
 * 
 * { firebase => <Component {...props} firebase={firebase} />}
 * retorna todo el componente con todas las propiedades {...props}
 * 
 * Cuando Cualquier componente quiera usar el consumer(acceder al contexto) lo que hace este consumer 
 * es envolverlo en el contexto de <firebaseContext.Consumer/> y le agrega la propiedad y objeto firebase={}
  * Usage:
         *
         * ```ts
         *
         * class MiComponentePrueba {
         *   render () {
         *     return <>Hola mundo!</>;
         *   }
         * }
         * 
         * // antes del consumer
         * // <MiComponentePrueba/>
         * 
         * // despues del consumer,convierte a 
         * <FirebaseContext.Consumer>
         *          <MiComponentePrueba firebase={MiObetoFirebase}/>
         * </FirebaseContext.Consumer>
         * ```
 * @param {*} Component 
 */

export const consumerFirebase = Component => props => (
    <FirebaseContext.Consumer>
        { firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export default FirebaseContext;