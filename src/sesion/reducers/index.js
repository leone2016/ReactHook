import sesionReducer from './sesionReducer';
import openSnackbarReducer from './openSnackbarReducer';

/**
 * ESTE MAIN UNE DOS REDUCERS 
 * recive sesion, openSnackbar
 * action va ser dinamico
 * 
 * cambia el estado inicial (initialState) dependiendo el action
 * y esos cambios se veran reflejados en el context Provider
 * @param {*} param0 
 * @param {*} action 
 */
export const mainReducer = ({sesion, openSnackbar}, action) => {
    return {
        sesion : sesionReducer(sesion, action),
        openSnackbar : openSnackbarReducer(openSnackbar, action)
    }
}