---
layout: post
title: "Introducción a React"
date: 2019-08-18
categories: reactjs
author: carlosrojas
tags: [reactjs]
cover: "https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-08-21-intro-react%2F3.png?alt=media&token=20eb2c0e-bb71-4f14-adb5-ec13dd6f59f2"
editname: '2019-08-21-intro-react.md'
repo: 'https://github.com/react-classroom/demo1'
versions:
  - title: 'reactjs'
    number: '16.9.0'
---

> Una parte fundamental de cualquier producto es elegir cuidadosamente su framework el cual es una decisión `arquitectonica` clave. `ReactJS` es uno de los nuevos jugadores en este campo y entra a competir contra `Vue` y `Angular`.

<img width="1024" height="450" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-08-21-intro-react%2F3.png?alt=media&token=20eb2c0e-bb71-4f14-adb5-ec13dd6f59f2">

 

## ¿ Que es ReactJS ?

`ReactJS` es una libreria para construir interfaces graficas. A diferencia de `Angular` no viene por defecto con todas las piezas para construir una `Single Page Application` y lo debemos combinar con otras librerias para llenar esos espacios, esto es bueno por un lado porque nos da mas libertad como desarrolladores, pero por otro lado requiere un mayor conocimiento de las arquitecturas recomendadas disponibles. Una buena opción que existe en el mercado para trabajar con `ReactJS` y lista para usar es [NextJS](https://nextjs.org/).

Entre sus caracteristicas resaltán.

### Declarativo

`React` logra que sea sencillo realizar interfaces interactivas. Diseña vistas simples para cada estado en tu Aplicación y `React` actualizara eficientemente y representara solo los componentes correctos cuando tus datos cambién.

### Basado en Componentes

Construye componentes encapsulados que administrén sus propios estados, entonces, agrupalos para hacer interfaces complejas.

Desde que la logica de tu app es escrita en Javascript en lugar de en las plantillas puedes pasar facilmente datos complejos entre tu App manteniendo el `estado` fuera del `DOM`.

Un ejemplo simple de un componente en `React` es el siguiente:

```js
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('hello-example')
);
```



## ¿ Que es create-react-app ?

Como dijimos anteriormente `React` es solo una libreria que podemos utilizar en nuestras aplicaciones para crear increibles interfaces, pero, si queremos desarrollar una `SPA` tenemos que configurar muchas cosas por aparte, es por esto que se creo `create-react-app` una herramienta `CLI` para ayudarnos a tener listo todo lo necesario para comenzar con `react`.

Para comenzar simplemente ejecutamos.

```
$ npm init react-app my-react-app
```

y nos debe crear un directorio con nuestro proyecto `my-react-app`. Entonces, vamos a el y ejecutamos.

```
$ cd my-react-app
$ npm start
```

Ya tenemos nuestra primera app en react listo para usar.

## Creando un componente.

Ahora vamos a crear un componente que llamaremos `MyComponent` donde haremos una llamada usando `fetch()` y obtendremos la info de un `API`. Algo muy común en nuestra profesión.

Voy a resumir el llamado `fetch()` en que su uso general llamando a la API publica [randomuser](https://randomuser.me/) para nuestro caso es:

```js
  componentDidMount() {
  fetch('https://randomuser.me/api/')
  .then(
    (response)=> {
      return response.json();
    })
  .then(
    (response) => {
      this.setState({
        myProp: response.results[0].email
      });
    });
  }
```

Puedes ver mas info en el uso del `fetch()` [acá](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Adicionalmente, el `componentDidMount()` es una forma de decirle a un componente en react en que momento quiero que me ejecute el codigo que en este caso es cuando ha terminado de cargar correctamente. Puedes ver mas info [acá](https://reactjs.org/docs/state-and-lifecycle.html).

Ahora, vamos a crear un nuevo archivo `MyComponent.js` al mismo nivel del `App.js` y crearemos nuestro componente ahi. 

```js
import React, {Component} from 'react';

class MyComponent extends Component {
  state = {
    myProp: 'Loading email...'
  };

  constructor(props) {
    super();
  }

  componentDidMount() {
  fetch('https://randomuser.me/api/')
  .then(
    (response)=> {
      return response.json();
    })
  .then(
    (response) => {
      this.setState({
        myProp: response.results[0].email
      });
    });
  }

  render() {
    return (
      <div>{this.state.myProp}</div>
    );
  }
}

export default MyComponent;
```

En terminos generales estamos creando una etiqueta que se llama `<MyComponent>` y que llama a un `API` para obtener un email. Este email lo estamos guardando en una propiedad del componente o `prop` y utilizamos `this.state` para actualizar esa propiedad cuando este listo el valor del email. Por ahora no entro mucho en detalle para mantener simple el `tutorial` pero puedes leer mas [acá](https://reactjs.org/docs/components-and-props.html).

y por ultimo vamos a importar este nuevo componente en nuestro `App.js` y usarlo.

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Mycomponent from './MyComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Mycomponent></Mycomponent>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

Por ultimo deberias ver el componente actualizando la info con el email.

<img width="957" height="609" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-08-21-intro-react%2FScreen%20Shot%202019-08-18%20at%2012.19.24%20PM.png?alt=media&token=b5286a0a-2902-4d1f-aaf6-8ea566b4313a">


Espero que este tutorial sea de utilidad. Hasta un proximo post :)