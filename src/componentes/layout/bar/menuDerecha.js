import React from "react";
import { List, Link, ListItemText, ListItem, Avatar } from "@material-ui/core";

export const MenuDerecha = ({
  classes,
  usuario,
  textoUsuario,
  fotoUsuario,
  salirSesion
}) => (
  <div className={classes.list}>
    <List>
       {/*  existen dos redirencionamientos 
       1ro  component={Link} : Material Desing 
       2do  to="/auth/registrarUsuario", RealRouterDom, es el que permite hacer redireccionamiento entre paginas  */}
      <ListItem button component={Link} to="/auth/registrarUsuario">
        <Avatar 
        src={fotoUsuario} 
        />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={textoUsuario}
        />
      </ListItem>
      <ListItem button onClick={salirSesion}>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Salir"
        />
      </ListItem>
    </List>
  </div>
);
