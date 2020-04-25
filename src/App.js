import React, { Component } from "react";
import "./App.css";
import ListaInmuebles from "./componentes/vistas/ListaInmuebles";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import theme from "./theme/theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNavBar from "./componentes/layout/AppNavBar";
import Grid from '@material-ui/core/Grid'
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from "./componentes/seguridad/Login";
class App extends Component {
  render() {
    return (
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
    );
  }
}
export default App;
