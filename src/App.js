import React, { useEffect } from "react";
import "./App.css";
import ListaInmuebles from "./componentes/vistas/ListaInmuebles";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import theme from "./theme/theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNavBar from "./componentes/layout/AppNavBar";
import Grid from '@material-ui/core/Grid'
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from "./componentes/seguridad/Login";
import { FirebaseContext } from "./server";



function App(props) {
  let firebase = React.useContext(FirebaseContext);
  // los hooks por naturaleza no tienen un estado,
  // algo asi como state = {}
  // de esta forma se crea un estado, conFirebaseContext un vaor inicial es falso, tambien el estado inicial puede ser
  // un string, entero.
  // setupFirebaseInicial: cambia el estado inicia
  // setupFirebaseInicial(true), de esta manera autenticacionIniciada será verdadero
  // el onjetivo que ahora se lo utiliza es como una bandera, para indicar si ya se puede cargar algo en específico
  // los hooks no tienen un tiempo de vida como las Clases
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);



  useEffect(() => {
    firebase.estaIniciado().then(val => {
      setupFirebaseInicial(val);
    });
  });

  // cuando no esta iniciada no imprime : caso contradio imprime
  return autenticacionIniciada !== false ? (
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppNavBar />
        {/* segmento dinamico */}
        <Grid container>
          <Switch>
            <Route path="/" exact component={ListaInmuebles}></Route>
            <Route path="/auth/register" exact component={RegistrarUsuario}></Route>
            <Route path="/auth/login" exact component={Login} />
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
  ) : null;
}

// class App extends Component {
//   render() {
//     return (
// FORMA CLASICA 
//     );
//   }
// }
export default App;
