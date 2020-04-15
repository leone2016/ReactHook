import React, { Component } from 'react';

/**
 * Este es un context de la aplicacion que va estar especializado en almacenar el objeto FireBase 
 */
export default const firebaseContext = React.createContext();
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
         * <firebaseContext.Consumer>
         *          <MiComponentePrueba firebase={MiObetoFirebase}/>
         * </firebaseContext.Consumer>
         * ```
 * @param {*} Component 
 */
export const consumerFirebase = Component => props => (
    <firebaseContext.Consumer>
        { firebase => <Component {...props} firebase={firebase} />}
    </firebaseContext.Consumer>
)