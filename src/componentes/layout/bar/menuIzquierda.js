import React from 'react'; // importante importar esto, REact must be in scope the using JSX
import { List, ListItemText, Divider, ListItem } from "@material-ui/core";
import { Link } from 'react-router-dom';

export const MenuIzquierda = ({ classes }) => (
    <div className={classes.list}>
        <List>
            {/* se crea un objeto de tipo redirect, esto significa que que este submenu va permitirte redireccionar 
            a otro componente de tu aplicacion */}
            <ListItem component={Link} button to="/auth/perfil" > 
                <i className="material-icons">account_box</i>
                {/* las clases creadas */}
                <ListItemText classes={{ primary: classes.listItemText }} primary="Perfil"></ListItemText>
            </ListItem>
        </List>
        <Divider />
        <ListItem component={Link} button to="">
            <i className="material-icons">add_box</i>
            <ListItemText className={{ primary: classes.listItemText }} primary="Nuevo Inmueble "></ListItemText>
        </ListItem>
        <ListItem component={Link} button to="">
            <i className="material-icons">business</i>
            <ListItemText className={{ primary: classes.listItemText }} primary="Inmueble "></ListItemText>
        </ListItem>
        <ListItem component={Link} button to="">
            <i className="material-icons">mail_outline</i>
            <ListItemText className={{ primary: classes.listItemText }} primary="Mensajes"></ListItemText>
        </ListItem>
    </div>
)