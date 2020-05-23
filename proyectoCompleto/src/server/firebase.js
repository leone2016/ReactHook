import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/messaging';

const config = {
    
};





class Firebase{
    
    constructor(){
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();
        this.authorization = app.auth;

        this.messagingValidation = app.messaging;
        if(this.messagingValidation.isSupported()){
            this.messaging = app.messaging();
            this.messaging.usePublicVapidKey("BN_QnCjVBQipYXHz5tR6DW3SCO6ZtpXkkZb7hhy_sMVfBiH9fhp4GkATSwKG3mLBhVr1QMtvpQG27R5-CYVIcaM");
        }

        this.storage.ref().constructor.prototype.guardarDocumentos = function(documentos){
            var ref=this;
            return Promise.all(documentos.map(function(file){
                return ref.child(file.alias).put(file).then(snapshot =>{
                    return ref.child(file.alias).getDownloadURL();
                })
            }))
        }

    }

    estaIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    } 

    guardarDocumento = (nombreDocumento, documento) => this.storage.ref().child(nombreDocumento).put(documento);

    devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL();

    guardarDocumentos = (documentos) => this.storage.ref().guardarDocumentos(documentos);

    eliminarDocumento = documento => this.storage.ref().child(documento).delete();

}

export default Firebase;