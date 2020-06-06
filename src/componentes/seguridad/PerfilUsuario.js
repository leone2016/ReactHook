import React, { useState, useEffect } from "react";
import { useStateValue } from "../../sesion/store";
import { Container, Typography, Grid, TextField, Avatar, Button } from "@material-ui/core";
import reactFoto from "../../logo.svg";
import {consumerFirebase} from '../../server';
import { openMensajePantalla } from "../../sesion/actions/snackbarAction";
import ImageUploader from 'react-images-upload';
import uuid from 'uuid';


const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",// alineacion vertical
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: 20
  },
  submit: {
    marginTop: 15,
    marginBottom: 20
  }, 
  avatar : {
    margin: 10,
    width : 100,
    height: 100

  }
};
/**
 * clase 64
 * Componente sin estado
 * Esta pagina va mostrar los datos del usuario despues del logeo
 * 
 * 
 * Variable de estado local: esto funciona para los datos que cambie el usuario dentro de perfil
 * useState es la funcion que me ayuda a cambiar el estado de la variable ESTADO 
 * let [ESTADO, cambiarEstado] = useState({ valoresIniciales: "" })
 * * existe una manera de poner mantener el estado de las variables dentro de un componente react sin estado,
 * como es una funcion plana JavaScript y la forma es usando el UseSTATE
 * @param {*} props 
 */
const PerfilUsuario = props => {
  const [{ sesion }, dispatch] = useStateValue();
  const firebase = props.firebase;/*  esto gracias a que al final de este archivo se usa consumerFirebase */

  /* estado representa al json {nombre:"", apellido:""} */
  let [estado, cambiarEstado] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    id: "",
    foto: ""
  });

  const cambiarDato = e => {
      const {name, value} = e.target;

     /*  cambiarEstado estado local se lo define en el useState */
      cambiarEstado(prev => ({
          ...prev, // mantiene el estado anterior 
          [name] : value // solo modifica los cambios que hayan cambiado
      }))
  }

  const guardarCambios = e => {
    e.preventDefault();

    firebase.db
    .collection("Users")
    .doc(firebase.auth.currentUser.uid)
    .set(estado, {merge: true}) // valores que se encuentre en el estado local (variable estado)
    .then(success => {

        dispatch({
            type: "INICIAR_SESION",
            sesion: estado,
            autenticado : true
        })

        openMensajePantalla(dispatch, {
            open: true,
            mensaje: "Se guardaron los cambios"
        })
        
    })
    .catch(error=>{
        openMensajePantalla(dispatch, {
            open: true,
            mensaje: "Errores guardando en la base de datos:" + error
        })
    })
  }
  
 const validarEstadoFormulario = sesion =>{
  if(sesion){
    cambiarEstado(sesion.usuario);
  }
 }

  /**
   * se lo utiliza para imprimir los valores del state global 
   * en cajas de texto
   */
  useEffect(()=>{
    if(estado.id === ""){
      validarEstadoFormulario(sesion);
    }
  });


/**
 * fotos es un array;
 * cuando se captura la foto se la renombra con uuid
 * @param {*} fotos 
 */
  const subirFoto = fotos => {
    //1. Capturar la imagen
    const foto = fotos[0];
    //2. Renombrar la imagen
    const claveUnicaFoto = uuid.v4();
    //3. Obtener el nombre de la foto 
    const nombreFoto = foto.name;
    //4. Obtener la extension de la imagen
    const extensionFoto = nombreFoto.split('.').pop();
    //5. Crear el nuevo nombre de la foto - alias, busca todos los espacios en blanco y los remplaza con guiòn bajo
    const alias = (nombreFoto.split('.')[0] + "_" + claveUnicaFoto + "." + extensionFoto).replace(/\s/g,"_").toLowerCase();
    // V a xI.jpg  --->  v_a_xi_423454354423324423.jpg

    firebase.guardarDocumento(alias, foto).then(metadata =>{
        firebase.devolverDocumento(alias).then(urlFoto=>{
          estado.foto = urlFoto;

          firebase.db
            .collection("Users")
            .doc(firebase.auth.currentUser.uid)
            .set(
              {
                foto : urlFoto
              },
              {merge: true}
            )
            .then(userDB =>{
              dispatch({
                type: "INICIAR_SESION",
                sesion: estado,
                autenticado: true
              })
            })

        })

    })

  }

  let fotoKey = uuid.v4();
  /* valida que la sesion exista */
  return sesion ? (
    <Container component="main" maxWidth="md" justify="center"> 
      <div style={style.paper}>
        <Avatar style={style.avatar} src={estado.foto || reactFoto} />
        <Typography component="h1" variant="h5">
          Perfil de Cuenta
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
          {/* xs : celular md: desktop */}
            <Grid item xs={12} md={6}>
              <TextField
                name="nombre"
                variant="outlined" // redonreado
                fullWidth
                label="Nombre"
                value={estado.nombre || ''}
                onChange={cambiarDato}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="apellido"
                variant="outlined"
                fullWidth
                label="Apellidos"
                value={estado.apellido || ''}
                onChange={cambiarDato}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                variant="outlined"
                fullWidth
                label="E-Mail"
                value={estado.email || ''}
                onChange={cambiarDato}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="telefono"
                variant="outlined"
                fullWidth
                label="Telefono"
                value={estado.telefono  || ''}
                onChange={cambiarDato}
              />
            </Grid>
{
            <Grid item xs={12} md={12}>
                <ImageUploader 
                  withIcon={false}
                  key={fotoKey}
                  singleImage={true}
                  buttonText="Seleccione su imagen de perfil"
                  onChange={subirFoto}
                  imgExtension={[".jpg",".gif",".png", ".jpeg"]}
                  maxFileSize={5242880} // tamaño max 5mb
                />

            </Grid>}


          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained" // va tener un colo de fondo
                size="large"
                color="primary"
                style={style.submit}
                onClick={guardarCambios}
              >
                  Guardar Cambios
            </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  ) : null;
};

export default consumerFirebase(PerfilUsuario);