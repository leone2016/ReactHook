import React, { Component } from 'react';
import { Container, Avatar, Typography, Grid } from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined'
const style = {
    paper: {
        marginTop: 8,
        display: "flex", // de que forma se ordenan los elementos en el DIV
        flexDirection: "column",
        alingnItems: "center"
    },
    avatar: {
        margin: 8,
        backgroundColor: "@e53935"
    }, 
    form: {
        width: "100%",
        marginTop: 10
    }
}
class RegistrarUsuario extends Component {
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
                    <form style="style.form">
                        <Grid container ></Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

export default RegistrarUsuario;