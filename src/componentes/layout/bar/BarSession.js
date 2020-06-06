import React, { Component } from 'react';
import {
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    Avatar
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from 'recompose';
import { consumerFirebase } from '../../../server';
import { StateContext } from "../../../sesion/store";
import { salirSesion } from "../../../sesion/actions/sessionAction";
import { MenuDerecha } from './menuDerecha';
import fotoUsuarioTemp from "../../../logo.svg";
import { withRouter, Link } from 'react-router-dom';
import { MenuIzquierda } from './menuIzquierda';
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
    },
    avatarSize: {
        width: 40,
        height: 40
    },
    listItemText: {
        fontSize: "14px",
        fontWeight: 600,
        paddingLeft: "15px",
        color: "#212121"
    },
    list: {
        width: 250
    }
});


class BarSession extends Component {
    static contextType = StateContext; //contextProvider
    state = {
        firebase: null,
        right: false,
        left: false
    };
    /**
     * 
     */
    salirSesionApp = () => {
        const { firebase } = this.state;
        const [{ sesion }, dispatch] = this.context;
        salirSesion(dispatch, firebase).then(success => {
            this.props.history.push("/auth/login"); // es importante importar el router
        });
    };
    /**
     * 
     */
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });
    };
    /**
     * 
     * @param {*} nextProps 
     * @param {*} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        let nuevosObjetos = {};

        if (nextProps.firebase !== prevState.firebase) {
            nuevosObjetos.firebase = nextProps.firebase;
        }

        return nuevosObjetos;
    }
    render() {
        const { classes } = this.props;
        const [{ sesion }, dispatch] = this.context;
        const { usuario } = sesion;
        let textoUsuario = usuario.nombre + " " + usuario.apellido;

        return (
            <div>

                {/* barra latera derecha */}
                <Drawer
                    open={this.state.right}
                    onClose={this.toggleDrawer("right", false)}
                    anchor="right"
                >
                    <div
                        role="button"
                        onClick={this.toggleDrawer("right", false)}
                        onKeyDown={this.toggleDrawer("right", false)}
                    >
                        {/* usuario viene desde contextProvider */}
                        <MenuDerecha
                            classes={classes}
                            usuario={usuario}
                            textoUsuario={textoUsuario}
                            fotoUsuario={usuario.foto || fotoUsuarioTemp}
                            salirSesion={this.salirSesionApp}
                        />
                    </div>
                </Drawer>
                {/* fin barra latera derecha */}
                {/*  barra latera Izquierda */}
                <Drawer
                    open={this.state.left}
                    onClose={this.toggleDrawer("left", false)}
                    anchor="left"
                >
                    <div
                        role="button"
                        onClick={this.toggleDrawer("left", false)}
                        onKeyDown={this.toggleDrawer("left", false)}
                    >
                        {/* usuario viene desde contextProvider */}
                        <MenuIzquierda
                            classes={classes}
                        />
                    </div>
                </Drawer>
                {/* fin barra latera Izquierda */}

                <Toolbar>
                    <IconButton color={'inherit'} onClick={this.toggleDrawer('left', true)}>
                        <i className="material-icons">menu</i>
                    </IconButton>

                    <Typography variant="h6">
                        Leo Home
                    </Typography>
                    <div className={classes.grow}></div>
                    <div className={classes.sectionDesktop}>
                        {/* clase 62 */}
                        {/* inherit: heredado toma los colores del template */}
                        <IconButton color="inherit" component={Link} to="">
                            <i className="material-icons">mail_outline</i>
                        </IconButton>
                        <Button color="inherit" onClick={this.salirSesionApp}>Salir</Button>
                        <Button color="inherit">{textoUsuario}</Button>
                        <Avatar
                            src={fotoUsuarioTemp}
                        />
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            color="inherit"
                            onClick={this.toggleDrawer("right", true)}
                        >
                            <i className="material-icons">more_vert</i>
                        </IconButton>
                    </div>
                </Toolbar>
            </div>
        );
    }
}

export default compose(
    withRouter,
    consumerFirebase,
    withStyles(styles)
)(BarSession);
