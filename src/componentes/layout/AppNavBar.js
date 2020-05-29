import React, { Component } from 'react';
import AppBar from "@material-ui/core/AppBar"
import BarSession from "./bar/BarSession";
import {withStyles} from '@material-ui/styles';
import {compose} from 'recompose';
import {consumerFirebase} from '../../server';
import {StateContext} from '../../sesion/store'

   
const styles = theme => ({
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
   
  });
  /*
    esta barra de navegacion hereda los estilos que ya se definieron
    * la session del usuario esta el context Provider Global (session/store)
    */
class AppNavBar extends Component {
    static contextType = StateContext;
    state = {
      firebase: null
    };
    /**
     * maneja la sesion en la barra de navegacion
     * @param {*} nextProps 
     * @param {*} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        let nuevosObjetos = {};
        // cuando la propiedad firebase exista  se compara con prevstate que cambio
        if (nextProps.firebase !== prevState.firebase) {
          nuevosObjetos.firebase = nextProps.firebase;
        }
        return nuevosObjetos;
      }
      /**
       * Es necesario cargar toda la logica, luego que el componente
       * se haya cargado (se ejecuta una sola vez)
       */
      componentDidMount() {
        debugger;
        const { firebase } = this.state; //local state
        const [{ sesion }, dispatch] = this.context; //global state
        
        if (firebase.auth.currentUser !== null && !sesion) {
          firebase.db
            .collection("Users")
            .doc(firebase.auth.currentUser.uid)
            .get()
            .then(doc => {
              const usuarioDB = doc.data();
              console.log(usuarioDB);
              // esa data que se tiene, se actualize o se envie al contextProvider  
              // REDUX
              dispatch({
                type: "INICIAR_SESION",
                sesion: usuarioDB,
                autenticado: true
              });
            });
        }
      }
    
      render() {

        const [{sesion}, dispatch] = this.context;
    // si la sesion no existe, NO imprime la barra
    // solamente los usuarios loqueados ven la barra
        return sesion ? (sesion.autenticado ? (
            <div>
              <AppBar position="static">
                <BarSession />
              </AppBar>
            </div>
          )
          :null
          ) 
        :null;
      }
}

export default compose(
    withStyles(styles),
    consumerFirebase
    )(AppNavBar);
