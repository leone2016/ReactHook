import React, { Component } from 'react'
import { Container, Avatar, Typography, TextField, Button, Grid, Link } from '@material-ui/core';
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import { compose } from 'recompose';
import { consumerFirebase } from '../../server';
import { iniciarSesion } from '../../sesion/actions/sessionAction';
import { StateContext } from '../../sesion/store';
import { openMensajePantalla } from '../../sesion/actions/snackbarAction';

const style = {
    paper: {
        marginTop: 9,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 5,
        backgroundColor: "red"
    },
    form: {
        width: "100%",
        marginTop: 8
    },
    submit: {
        marginTop: 10,
        marginBottom: 20
    }

}
class Login extends Component {
    static contextType = StateContext;
    state = {
        firebase: null,
        usuario: {
            email: '',
            password: ''
        }
    }
    /**
     * verifica si el estado y la propiedad  son diferentes a  firebase, quiere decir que se esta realizando 
     * el ingreso al componente, en ese caso se guarda en el state la propiedad de firebase
     * @param {*} nextProps 
     * @param {*} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.firebase === prevState.firebase) {
            return null;
        }

        return {
            firebase: nextProps.firebase
        }
    }

    /**
     * captura el valor actual del state del usuario
     */
    onChange = e => {
        let usuario = Object.assign({}, this.state.usuario);
        usuario[e.target.name] = e.target.value;
        this.setState({
            usuario: usuario
        })
    }
    /**
     * en server/firebase.js importar 'firebase/auth' 
     */
    // login = async e =>{
    //     e.preventDefault(); // previene que se envie los datos del formulario por la url
    //     const  [{sesion}, dispatch] = this.context;
    //     const {firebase, usuario} = this.state; 
    //     const {email, password} = usuario;

    //     let callback = await iniciarSesion(dispatch, firebase,email, password);
    //     console.log(callback);
    //     if(callback.status){
    //         this.props.history.push("/");
    //     }else{
    //         openMensajePantalla(dispatch, {
    //             open : true,
    //             mensaje: callback.mensaje.message
    //         })
    //     }

    // }

    /**
     * Despues de crear el sesion reducer
     */
    login = async e => {
        e.preventDefault();
        // clase 44
        const [{ sesion }, dispatch] = this.context;
        const { firebase, usuario } = this.state;
        const { email, password } = usuario;

        let callback = await iniciarSesion(dispatch, firebase, email, password);
        console.log(callback);
        if (callback.status) {
            this.props.history.push("/");
        } else {
            // clase 45
            openMensajePantalla(dispatch, {
                open: true,
                mensaje: callback.mensaje.message
            })
        }

    }

    /**
     * 
     */
    render() {
        return (
            <Container maxWidth="xs">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Ingrese Usuario
                 </Typography>
                    <form style={style.form}>
                        <TextField
                            variant="outlined"
                            label="EMail"
                            name="email"
                            fullWidth
                            margin="normal"
                            onChange={this.onChange}
                            value={this.state.usuario.email || ''}
                        />
                        <TextField
                            variant="outlined"
                            label="Password"
                            type="password"
                            name="password"
                            fullWidth
                            margin="normal"
                            onChange={this.onChange}
                            value={this.state.usuario.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.login}
                            style={style.submit}
                        >
                            Iniciar
                      </Button>

                        {/* <Grid container>
                         <Grid item xs>
                             <Link href="#" variant="body2" onClick={this.resetearPassword}>
                                 {"Olvido su contrasena?"}
                             </Link>
                         </Grid>

                         <Grid item>
                             <Link href="/auth/registrarUsuario" variant="body2">
                                 {"No tienes cuenta? Registrate"}
                             </Link>
                         </Grid>

                     </Grid> */}
                    </form>

                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        style={style.submit}
                        href="/auth/loginTelefono"
                    >
                        Ingrese con su telefono
                 </Button>

                </div>
            </Container>
        )
    }
}
export default compose(consumerFirebase)(Login);