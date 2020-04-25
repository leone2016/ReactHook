import React, { Component } from 'react';
import { Container, Avatar, Typography, TextField, Grid, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined'
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';

const style = {
    paper: {
        marginTop: 8,
        display: "flex", // la forma que se ordenan los elementos en el DIV: flex uno tras otro
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 8,
        backgroundColor: "#e53935"
    },
    form: {
        width: "100%",
        marginTop: 10
    },
    submit: {
        marginTop: 15,
        marginBottom: 20
    }
}
const usuarioInicial = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
}
class RegistrarUsuario extends Component {

    state = {
        firebase: null,
        usuario: usuarioInicial
    }

    /**
     *  el consumerFirebase es el que tiene el objeto FIREBASE
     *  como hacer para que una propiedad que se esta insertando RegistrarUsuario se agruege al state de este? 
     *  
     * explicacion de getDerivedStateFromProps 
     * 
     * 
     * @param {*} nextProps 
     * @param {*} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.firebase === prevState.firebase) {
            return null;
        }

        // aqui se puede cambiar los valores del state 
        return {
            firebase: nextProps.firebase
        }

    }

    onChange = e => {
        //toma el valor de state.usuario y asigna a usuario
        let usuario = Object.assign({}, this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario
        })
    }

    /**
     * primero se authentica firebase.auth y luego 
     * registra pero no guarda la contraseña, guarda un Id firebase.db
     */
    registarUsuario = e => {
        //evita hacer un refresh en la pagina 
        e.preventDefault();
        console.log('imprimir objeto usuario del state', this.state.usuario);
        const { usuario, firebase } = this.state

        firebase.auth
            .createUserWithEmailAndPassword(usuario.email, usuario.password)
            .then(auth => {
                const usuarioDb ={
                    id: auth.user.uid,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido
                }
                // guarda en firebase
                firebase.db
                    .collection("Users")
                    .add(usuarioDb)
                    .then(usuarioAfter => {
                        console.log('Esta inserción fue un exito', usuarioAfter);
                        this.props.history.push("/"); // similar a routerlink
                    })
                    .catch(err => {
                        console.error(err)
                    })
            })
            .catch(error => {
                console.log("error", error);
                // resolve({ status: false, mensaje: error });
              });

    }
    render() {
        return (
            <Container maxWidth="md">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon />
                    </Avatar>
                    {/* el tamaño del texto cambia desde h1 hasta h5 */}
                    <Typography component="h1" variant="h5">Registre su cuenta</Typography>
                    {/* cuando el componente se vea en un desktop ocupe la mitad del espacio, pero en un movil ocupe todo el espacio
                    */}
                    <form style={style.form}>
                        {/* grid divide a la ventana en 12 segmentos  */}
                        <Grid container spacing={2} >
                            {/* desktop ocupa 6 espacios*/}
                            {/* mobile ocupa 12 espacios*/}
                            <Grid item md={6} xs={12}>
                                <TextField name="nombre" onChange={this.onChange} value={this.state.usuario.nombre} fullWidth label="Ingrese su nombre"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="apellido" onChange={this.onChange} value={this.state.usuario.apellido} fullWidth label="Ingrese sus apellidos"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="email" onChange={this.onChange} value={this.state.usuario.email} fullWidth type="email" label="Ingrese su email"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="password" onChange={this.onChange} value={this.state.usuario.password} fullWidth type="password" label="Ingrese su contraseña"></TextField>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" >
                            <Grid item md={6} xs={12}>
                                {/*contained: significa que va ser de un color de fondo definido */}
                                <Button type="submit" onClick={this.registarUsuario} variant="contained" fullWidth size="large" color="primary" style={style.submit}>Registar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default compose(consumerFirebase)(RegistrarUsuario);