npm install @material-ui/icons

## firebase configuration

npm i firebase

npm i -g firebase-tools

firebase login

## What is react context 

* React context nos permite definir data stores y acceder a estos donde sean necesarios.
* vamos a definir un "application global store" con acceso desde cualquier componente de la aplicacion

### como usar REACT context?
1. crea un obeto *Context Provider* y define la data que deseas guardar en el *global Store*

2. Usa un *Context Consumer* para acceder a la data del *global store*, desde cualquier react component. 

### Recompose
* es una librería que permite encapsular una funcionalidad específica que desea utilizar
* En la práctica, un *Recompose* puede crear un componentes de orden superior o componentes de funcionalidades individiales
* En otras palabras para nuestro caso, usamos Recompose solo para exteder una funcionalidad al React Component, es decir usamos Recompose para implementar el Consumer que nos devolvera el objeto Firebase.

$ npm install recompose