export const iniciarSesion = (dispatch, firebase, email, password) => {
    return new Promise((resolve, eject) => {
        firebase.auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {

                //auth.user.id
                // retorna los valores de firebase
                firebase.db
                    .collection("Users")
                    .doc(auth.user.uid)
                    .get()
                    .then(doc => {
                        debugger;
                        const usuarioDB = doc.data();
                        // esto se utiliza en el context provider sesion
                        // esto es lo que se retorna al reducer
                        //   { "INICIAR_SESION"
                        //     ...state,
                        //     nnn: action.sesion,
                        //     nnn: action.autenticado
                        //   };
                        console.log(usuarioDB);
                        dispatch({
                            type: "INICIAR_SESION",
                            sesion: usuarioDB,
                            autenticado: true
                        });

                        // es imporante agregar esto para decir que la promesa ya se creo
                        resolve({ status: true });
                    });
            })
            .catch(error => {
                console.log("error no pudo iniciar sesión", error);
                resolve({ status: false, mensaje: error });
            });
    });
};

export const crearUsuario = (dispatch, firebase, usuario) => {
    return new Promise((resolve, eject) => {
        firebase.auth
            .createUserWithEmailAndPassword(usuario.email, usuario.password)
            .then(auth => {
                firebase.db
                    .collection("Users")
                    .doc(auth.user.uid)
                    .set(
                        {
                            id: auth.user.uid,
                            email: usuario.email,
                            nombre: usuario.nombre,
                            apellido: usuario.apellido
                        },
                        { merge: true }
                    )
                    .then(doc => {
                        usuario.id = auth.user.uid;
                        // automaticamente despues de crear el usuari, inicia sesión
                        // acct
                        dispatch({
                            type: "INICIAR_SESION",
                            sesion: usuario,
                            autenticado: true
                        });
                        // importante agregar resolve, sino la promesa NO termina
                        resolve({ status: true });
                    });
            })
            .catch(error => {
                console.log("error", error);
                resolve({ status: false, mensaje: error });
            });
    });
};

export const salirSesion = (dispatch, firebase) => {
    return new Promise((resolve, eject) => {
        firebase.auth.signOut().then(salir => {
            dispatch({
                type: "SALIR_SESION",
                nuevoUsuario: {
                    nombre: "",
                    apellido: "",
                    email: "",
                    foto: "",
                    id: "",
                    telefono: ""
                },
                autenticado: false
            });
            resolve();
        });
    });
};
