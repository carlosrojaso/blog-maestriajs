---
layout: post
title: "Angular Universal + Firebase"
date: 2018-06-21
tags: [angular, universal, express]
categories: tips
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-13-Angular-universal_Firebase%2FAngularFirebase.png?alt=media&token=f49c5c91-caa0-4ba2-9c3c-15ef7bd4ff9d"
editname: "angular/2018-06-20-Angular-universal_Firebase.md"
repo: "https://github.com/ion-book/universalApp"
versions:
  - title: 'Angular CLI'
    number: '6.0.x'
  - title: 'Angular'
    number: '6.x'
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-13-Angular-universal_Firebase%2FAngularFirebase.png?alt=media&token=f49c5c91-caa0-4ba2-9c3c-15ef7bd4ff9d"></amp-img>

{% include general/net-promoter-score.html %} 

> Angular Universal es la tecnologia de SSR de la plataforma Angular. Vamos a ver como combinarla con Firebase.

<!--summary-->

## ¿ Por que necesitamos Firebase ?

Como vimos anteriormente el SSR corre en el lado de un servidor, entonces, utilizando Firebase Functions y Firebase Hosting vamos a habilitar nuestro SSR en los servidores de Google sin necesidad de preocuparnos del mantenimiento de un Servidor.

## ¿ Que es Firebase Functions ?

Firebase Functions es el servicio para realizar computing directamente en Firebase. Es decir si tienes que realizar una tarea que comunmente la hacia el backend como actualizar un numero de registros cada que ocurra una acción ahora lo puedes hacer utilizando Firebase y Javascript.

## ¿ Que es Firebase Hosting ?

Firebase Hosting es el servicio que nos permite publicar nuestras paginas en HTML, CSS y JS en Internet.

## ¿ Cuales son los pasos ?

Bueno lo primero es crear un proyecto en Firebase, lo puedes hacer [aquí](http://firebase.google.com/).

<amp-img width="600" height="648" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-20-Angular-universal_Firebase%2FCaptura%20de%20pantalla%202018-06-20%20a%20la(s)%206.38.44%20a.%20m..png?alt=media&token=1a2f1af9-567f-4bd5-a96d-eb37b189071e"></amp-img>

Lo segundo es que he creado un repo con un proyecto en Angular y con [Universal Ready](https://github.com/ion-book/universalApp) siguiendo la documentación [oficial](https://angular.io/guide/universal) y desplegando todo en la carpeta `/functions` para facilidad.

- Entonces, una vez clonado nuestro repositorio debemos instalar las dependencias con:

````
$npm install
````

y generar los archivos que va a utilizar el `ssr`.

````
$ng build --prod
````
````
$ng run universalApp:server
````

Esto genera algunas carpetas `browser` y `server` en nuestro directorio `functions`

Estos archivos son los que vamos a enviar a Firebase.

- Ahora vamos a conector nuestro proyecto con Firebase desde nuestra terminal.

````
$firebase login
````

- Inicializamos ahora un nuevo proyecto desde la terminal.

````
$firebase init
````

Empezaremos el asistente de firebase.

<amp-img width="900" height="354" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-20-Angular-universal_Firebase%2FCaptura%20de%20pantalla%202018-06-20%20a%20la(s)%206.42.00%20a.%20m..png?alt=media&token=e37f731a-49e2-4ac5-bb79-4ff8fd97b552"></amp-img>

Debemos elegir `hosting`y `functions`que son las que vamos a utilizar.

<amp-img width="900" height="331" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-20-Angular-universal_Firebase%2FCaptura%20de%20pantalla%202018-06-20%20a%20la(s)%206.42.18%20a.%20m..png?alt=media&token=69d28a2b-4edf-4107-ac6d-57a4807ddb5e"></amp-img>

Asociamos el proyecto con el que creamos previamente en Firebase.

<amp-img width="900" height="216" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-20-Angular-universal_Firebase%2FCaptura%20de%20pantalla%202018-06-20%20a%20la(s)%206.42.58%20a.%20m..png?alt=media&token=fdd277d6-eb6c-4910-b2ae-8fe6cd243b7b"></amp-img>

Seleccionamos `Javascript` en este paso.

<amp-img width="900" height="248" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-20-Angular-universal_Firebase%2FCaptura%20de%20pantalla%202018-06-20%20a%20la(s)%206.43.29%20a.%20m..png?alt=media&token=967b51ae-520b-4c7f-8cd4-66fa393c4bb6"></amp-img>

y terminamos la configuracion de `Functions`, luego nos preguntara por `Hosting` y podemos utilizar esta configuración.

{% include blog/subscribe3.html %}

<amp-img width="900" height="309" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-20-Angular-universal_Firebase%2FCaptura%20de%20pantalla%202018-06-20%20a%20la(s)%206.43.59%20a.%20m..png?alt=media&token=7e2c0764-6fa9-4876-a389-16f0fd35f527"></amp-img>

- Una vez configurado todos debemos agregar las dependencias que vamos a utilizar en el archivo `functions/package.json`

```json
{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "serve": "firebase serve --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "dependencies": {
    "@angular/animations": "6.0.2",
    "@angular/common": "6.0.2",
    "@angular/compiler": "6.0.2",
    "@angular/core": "6.0.2",
    "@angular/forms": "6.0.2",
    "@angular/http": "6.0.2",
    "@angular/platform-browser": "6.0.2",
    "@angular/platform-browser-dynamic": "6.0.2",
    "@angular/platform-server": "6.0.2",
    "express": "~4.16.3",
    "firebase-admin": "~5.12.1",
    "firebase-functions": "~1.0.2",
    "rxjs": "~6.1.0",
    "zone.js": "~0.8.26"
  },
  "private": true
}
```

y debemos instalar los paquetes en nuestra maquina con:

````
$npm --prefix functions install
````
y vamos a agregar un archivo `index.js` que va a ejecutar nuestras cosas en el servidor.

```ts
require('zone.js/dist/zone-node');

const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const { enableProdMode } = require('@angular/core');
const { renderModuleFactory } = require('@angular/platform-server');

const { AppServerModuleNgFactory } = require('./dist/server/main');

enableProdMode();

const index = require('fs')
  .readFileSync(path.resolve(__dirname, './dist/browser/index.html'), 'utf8')
  .toString();

let app = express();

app.get('**', function(req, res) {
  renderModuleFactory(AppServerModuleNgFactory, {
    url: req.path,
    document: index
  }).then(html => res.status(200).send(html));
});

exports.ssr = functions.https.onRequest(app);
```

- Ahora vamos a modificar un poco el archivo `firebase.json`

```json
"public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source" : "**/*.@(css|js)",
        "destination": "/index2.html"
      },
      {
        "source": "**",
        "function": "ssr"
      }
    ]
```

Algo interesante aquí es que usamos el archivo `index2.html`, esto se debe a que firebase no ejecuta Functions si detecta el `index.html`.

Ahora ejecutamos estos ultimos comandos para dejar todo listo en la carpeta `public` y enviamos a Firebase.

````
$cp -a functions/dist/browser/. public/
````

````
$mv public/index.html public/index2.html
````

````
$firebase deploy
````

Esto es todo, puedes ver el resultado [aquí](https://universalapp-dcdf0.firebaseapp.com/index2.html)

Bueno esto es todo por el dia de hoy, espero haya sido de utilidad :)



