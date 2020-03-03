import React, { Component } from 'react';
import { Container, Avatar, Typography,TextField,  Grid, Button } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined'
const style = {
    paper: {
        marginTop: 8,
        display: "flex", // de que forma se ordenan los elementos en el DIV
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: 8,
        backgroundColor: "@e53935"
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
class RegistrarUsuario extends Component {

    state = {
        usuario:{
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <Container maxWidth="md">
                <div style={style.paper}>
                    <Avatar style={style.avatar}>
                        <LockOutLineIcon/>
                    </Avatar>
                    {/* el tamaño del texto cambia desde h1 hasta h5 */}
                    <Typography component="h1" variant="h5">Registre su cuenta</Typography>
                    {/* cuando el componente se vea en un desktop ocupe la mitad del espacio, pero en un movil ocupe todo el espacio
                    */}
                    <form style={style.form}>
                        <Grid container spacing={2} >
                              {/* desktop ocupa 6 espacios*/}
                              {/* mobile ocupa 12 espacios*/}
                            <Grid item md={6} xs={12}>
                                <TextField name="nombre" fullWidth label="Ingrese su nombre"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="apelido" fullWidth label="Ingrese sus apellidos"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="email" type="email" fullWidth label="Ingrese su email"></TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField name="password" type="password" fullWidth label="Ingrese su contraseña"></TextField>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" >
                        <Grid item md={6} xs={12}>
                            {/*contained: significa que va ser de un color de fondo definido */}
                            <Button type="submit" variant="contained " fullWidth size="large" color="primary" style={style.submit}>Registar</Button>
                        </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default RegistrarUsuario;