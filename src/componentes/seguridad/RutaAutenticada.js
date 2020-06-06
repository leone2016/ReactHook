import {Route, Redirect} from 'react-router-dom';
import React from 'react';
import { useStateValue } from '../../sesion/store'; //captura la variable global sesion

/**
 * para validar que solo los usuarios logueados puedan ingresar
 * recibe un componente, y si esta autenticado (autenticadoFirebase variable global de firebase) ... (cualquier valor que se envie))
 * @param {*} param0 
 */
function RutaAutenticada({component: Component, autenticadoFirebase, ...rest}) {

    const [{autenticado}, dispatch] = useStateValue(); 

    return (
        /* route es el que se encarga de hacer la redireccion dentro de una app de React */
        <Route
            {...rest} //mantiene sus propiedades originales
            render={(props) => (autenticado===true || autenticadoFirebase !==null) 
            ? <Component {...props} {...rest} /> // imprime el componente que el quiera(props) y tambien con las propiedades que el quiera
            :<Redirect to="/auth/login" /> // caso contrario se redirecciona al login
            }
        />
    )
}

export default RutaAutenticada; // esto se usa el el app.js