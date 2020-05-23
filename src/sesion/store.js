import React, { createContext, useContext, useReducer } from 'react';

// se crea un container
// los real context nececitan un provider y un consumer
// provider: se usa para definir los valores inicales ó las variables que se van almacenar de manera global
// en la nueva versio de react no es necesario utilizar un consumer, 
// consumer: es el que accede al valor de la variable global, se  utiliza un useContext() 
export const StateContext = createContext();
/**
 * recibe tres parametros
 * children: recibe todos los componentes
 * initialState: es el valor global inicial que definimos
 * reducer: es la funcion que puede cambiar esos valores iniciales
 * el contecto StateContext.Provider genera un provider
 * 
 * El objetivo es almacenar variables globales en la aplicación la cual va ir cambiando con el tiempo
 * Usage:
 * @param {*} param0 
 */
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

/**
 * useStateValue extrae el contenido del statecontext que 
 * esta guardando en la aplicacion.
 * 
 * En otras palabras dentro del useStateValue  ya se encuentra el estado incial de sesionReducer y ActionREeducer
 */
export const useStateValue = () => useContext(StateContext);