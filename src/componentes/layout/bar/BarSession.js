import React, {Component} from 'react';
import {Toolbar, Typography, Button, IconButton} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    sectionDesktop: {
        display: "none",
        // theme.breakpoints.up("md") tamaño mediano
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
    // global
    grow: {
        flexGrow: 1
    }
});

class BarSession extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Toolbar>
                    <IconButton color={'inherit'}>
                        <i className="material-icons">menu</i>
                    </IconButton>

                    <Typography variant="h6">
                        Leonardo Medina
                    </Typography>
                    <div className={classes.grow}></div>
                    <div className={classes.sectionDesktop}>
                    {/* inherit: heredado toma los colores del template */}
                        <Button color="inherit">Login</Button>
                    </div>
                    <div className={classes.sectionMobile}>
                       <IconButton color={'inherit'}>
                       {/* more_vert: es el nombre del icono, pero hay que importar en el index.html */}
                           <i className="material-icons">more_vert</i>
                       </IconButton>
                    </div>
                </Toolbar>
            </div>
        );
    }
}

export default withStyles(styles)(BarSession);
