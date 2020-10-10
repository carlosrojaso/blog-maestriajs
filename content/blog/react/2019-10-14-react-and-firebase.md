---
layout: post
title: "Conectando React con Firebase"
date: 2019-10-14
categories: reactjs
author: carlosrojas
tags: [reactjs]
cover: "https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-10-14-react-and-firebase%2Fcover.png?alt=media&token=1813e03c-ad87-45ce-8d71-83e38c21d5c8"
editname: '2019-10-14-react-and-firebase.md'
repo: 'https://github.com/react-classroom/firebase-react-app'
versions:
  - title: 'reactjs'
    number: '16.10.2'
  - title: 'react-firebaseui'
    number: '4.0.0'
  - title: 'firebase'
    number: '7.2.0'
---

> Cuando estes desarrollando tu App con `ReactJS` te vas a dar cuenta que necesitaras tareas comunes como `Autenticar Usuarios`, `Almacenar info` y `Almacenar imagenes` para estas tareas tenemos Firebase el cual es un PaaS que es muy facil de integrar.

<img width="810" height="450" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-10-14-react-and-firebase%2Fcover.png?alt=media&token=1813e03c-ad87-45ce-8d71-83e38c21d5c8">

 

## ¿ Que es Firebase ?

`Firebase` es una plataforma de soluciones en la Web que viene a reemplazar el desarrollo de servicios en el Servidor. Entre las cosas que podremos hacer en Firebase están: Autenticar usuarios, Almacenar información de nuestra App en una base de datos en Tiempo Real, Almacenar imagenes y videos de nuestros Usuarios, Realizar operaciones de computing entre nuestros Servicios, entre otras.

## ¿ Que es Firebase UI ?

`Firebase UI` es una libreria de codigo abierto para la Web que que provee componentes UI que funcionan sobre el Firebase SDK y utilizan las mejores practicas.

## Creando nuestra App

`create-react-app` es una herramienta `CLI` para ayudarnos a tener listo todo lo necesario para comenzar con `react`.

Para comenzar simplemente ejecutamos.

```
$ npm init react-app firebase-react-app
```

y nos debe crear un directorio con nuestro proyecto `firebase-react-app`. Entonces, vamos a el y ejecutamos.

```
$ cd firebase-react-app
$ npm start
```

Ya tenemos nuestra app en react listo para usar.

## Agregando Firebase y Firebase UI.

Ahora que tenemos nuestra App base vamos a agregarle `firebase` para poder utilizar los servicios y `react-firebaseui` que nos permitira utilizar los componentes de firebaseui en nuestra App en React.

```
$ npm install --save firebase react-firebaseui
```

También tenemos que crear una App en la [consola Web de Firebase](https://firebase.google.com/docs/web/setup) y obtener nuestra configuración en `Project > Settings`. 

<img width="1050" height="181" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-10-14-react-and-firebase%2FScreen%20Shot%202019-10-12%20at%205.43.14%20PM.png?alt=media&token=366acdf8-ed54-40be-9a6b-946a039b4a64">


Ahora creamos un archivo `firebase.js` donde vamos a colocar nuestra configuración.


```js
const firebaseConfig = {
  apiKey: 'AIzaSyAeue-AsYu76MMQlTOM-KlbYBlusW9c1FM',
  authDomain: 'myproject-1234.firebaseapp.com',
  // ...
};

export default firebaseConfig;
```

y tenemos que importar este objeto en nuestra App para que podamos conectar el objeto de una manera limpia.

```js
...

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import firebaseConfig from './firebase';

firebase.initializeApp(firebaseConfig);

....
```




Por último agregamos el componente de autenticación en nuestro codigo y quedara asi:

```js

import React from 'react';
import logo from './logo.svg';
import './App.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import firebaseConfig from './firebase';

firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
      </header>
    </div>
  );
}

export default App;

```

Con esto ya deberemos ver los medios de acceso que elegimos `Google` y `Facebook` en nuestra App.

<img width="1050" height="852" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-10-14-react-and-firebase%2FScreen%20Shot%202019-10-12%20at%205.37.49%20PM.png?alt=media&token=7af4cc0c-c5a4-4aa2-a08c-b64fdb6abac5">

Pero tenemos que realizar una configuración adicional y es decirle a `Firebase` cual es nuestra App en esa plataforma para que pueda realizar todo el flujo. Creare una App en Facebook y el proceso es similar para cada una de los otros metodos de acceso que quieras agregar.

Ingresaremos a [Developers Facebook](https://developers.facebook.com/) y crearemos una App de manera habitual.

<img width="1050" height="647" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-10-14-react-and-firebase%2FScreen%20Shot%202019-10-12%20at%205.19.10%20PM.png?alt=media&token=09edfb94-c153-43e8-9af4-6fd932257490">

y la parte importante es ingresar a `Facebook Login > Advanced ` y agregar el OAuth Redirect que podremos encontrar en `Firebase Auth`

<img width="1050" height="588" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-10-14-react-and-firebase%2FScreen%20Shot%202019-10-12%20at%205.19.50%20PM.png?alt=media&token=89b7e7c4-ee0f-4096-b49a-3adbbac40f3c">

Una vez realicemos el proceso simplemente agregamos el `App ID` y el `App Secret` y lo habilitamos.

<img width="1050" height="542" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/reactclassroom-829a9.appspot.com/o/posts%2F2019-10-14-react-and-firebase%2FScreen%20Shot%202019-10-12%20at%205.33.32%20PM.png?alt=media&token=69c7a616-5aaf-461c-a2ef-b8a99d7cbf69">

Y ya deberia permitir obtener el acceso. Recuerda que debes realizar esto con cada metodo y agregar la logica para capturar un acceso exitoso.

Si este contenido te parece útil y me quieres ayudar a hacer mas considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)