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

> los context son CONTENEDORES que almacena variables.

### Recompose
* es una librería que permite encapsular una funcionalidad específica que desea utilizar
* En la práctica, un *Recompose* puede crear un componentes de orden superior o componentes de funcionalidades individiales
* En otras palabras para nuestro caso, usamos Recompose solo para exteder una funcionalidad al React Component, es decir usamos Recompose para implementar el Consumer que nos devolvera el objeto Firebase.

$ npm install recompose


## Hooks 

React nos da otra forma de crear componentes, como aanteriormente se estaba trabajando son funciones JavaScript planas sin estado.

Los Hooks se implementan desde la versión 16.8.0, esto no afecta a las versiones anteriores y lo dice la misma documentación oficial de React.

Un Hook es la representación de un componente React mediante una función JavaScript plana sin estado.`

````Js

// forma clasica 

class App extends Component {
    render() {
    return (
        <div>Hello world !!</div>
    )
    }
}

// Hooks
function App(props){
  return (
       <div>Hello world !!</div>
  )
}

````

en este curso se va usar los hooks con el realContext para manejar la sesión del usuario despues de hacer login.

## Estructura del proyecto 

![Estructura del proyecto](https://raw.githubusercontent.com/leone2016/ReactHook/master/Screenshot_1.png)

## Documentación

[Drower - lateral Menú ](https://material-ui.com/es/components/drawers/)s