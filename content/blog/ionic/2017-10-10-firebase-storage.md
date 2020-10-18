---
layout: post
title: "Firebase Storage"
keywords: "ionic native"
date: 2017-10-10
tags: [firebase]
categories: ionic2
author: javebratt
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-10-firebase-storage%2FFirebase%20Storage%20y%20Ionic.png?alt=media&token=71f774a1-7096-41f8-ae02-3f81f29d8466"
versions:
  - title: 'ionic'
    number: '3.6.1'
  - title: 'ionic-native'
    number: '4.2.1'
  - title: 'ionic-app-scripts'
    number: '2.1.4'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.10.3'
---

> En esta guia vamos a estar usando una de las mejores caracteristicas de Firebase, este te dejara almacenar datos binarios en tu aplicación en Firebase, Lo que significa que puedes subir archivos 🙂
<!--summary-->

<img width="810" height="450" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-10-firebase-storage%2FFirebase%20Storage%20y%20Ionic.png?alt=media&token=71f774a1-7096-41f8-ae02-3f81f29d8466" alt="Firebase Storage">

 

Para este ejemplo, vamos a dejar los usuarios subir y ver una selfie de sus telefonos, asi que adelante y crea tu app.

````
$ ionic start myApp blank --cordova
$ cd myApp
````

## Instalando el Plugin de la Camara.

Lo primero que debemos hacer es instalar el plugin de la camara, para eso, abre tu terminal y ejecuta estos dos comandos:

````
$ ionic cordova plugin add cordova-plugin-camera
$ npm install --save @ionic-native/camera
````

El primer comando instalara el plugin de cordova, y el segundo instalara el paquete ionic native que interactua con ese plugin.

Ahora debemos ir a ```app.module.ts``` y vamos a dejar saber a nuestra app que estamos utilizando este plugin, asi que adelante e importalo, y agregalo al arreglo ```imports```.

````ts

import { Camera } from '@ionic-native/camera';

@NgModule({
  providers: [
    Camera
  ]
})
export class AppModule { }

````

Una vez esta listo, podemos ir a la siguiente parte, donde nosotros empezaremos a tomar las fotos.

{% include blog/subscribe3.html %}

## Tomando fotos desde Ionic Framework.

Empezaremos la parte de tomar las fotos, para esto debes crear un boton en la pagina HTML que haga un llamado a la función ```takeSelfie()```, entonces, vamos dentro de la clase respectiva y 1) importa todo lo que vas a necesitar, y 2) Crea la función.

````ts
import firebase from 'firebase';
import { Camera } from '@ionic-native/camera';

constructor(public cameraPlugin: Camera) {}

takeSelfie(): void {
  // Here we'll take the picture
}
````

Nota que ahora que hemos inyectado el proveedor ```Camera``` dentro del constructor, ahora vamos a llamarlo para tomar la foto:

````ts
takeSelfie(): void {
  this.cameraPlugin.getPicture({
    quality : 95,
    destinationType : this.cameraPlugin.DestinationType.DATA_URL,
    sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
    allowEdit : true,
    encodingType: this.cameraPlugin.EncodingType.PNG,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true
  }).then(profilePicture => {
    // Send the picture to Firebase Storage
  }, error => {
    // Log an error to the console if something goes wrong.
    console.log("ERROR -> " + JSON.stringify(error));
  });
}
````

Aqui estamos llamando al plugin de la Camara y dandole algunas opciones:

```quality```, la calidad de nuestra imagén de 1-100.

```destinationType``` Este te retorna un tipo, DATA_URL es configurado para retornar una cadena de base64, también puedes retornar la URI de la imagen. 

```sourceType``` Le estamos diciendo que empiece la camara, lo puedes cambiar para que abra la libreria de imagenes si quieres.

```allowEdit``` Permite a los usuarios editar la imagen, principalmente cortarla.

```encodingType``` Hemos seleccionado el codificador a png,jpg.

```targetWidth``` & ```targetHeight```, Te da la altura y anchura de la imagen.

```saveToPhotoAlbum``` Guarda la imagen a la libreria despues de ser tomada.

Ahora, en la siguiente parte de la imagen, enviaremos la imagén a Firebase Storage, lo primero que tendremos que hacer es crear la referencia al storage:

````ts
.then(profilePicture => {
  // Send the picture to Firebase Storage
  const selfieRef = firebase.storage().ref('profilePictures/user1/profilePicture.png');
});
````
Estamos creando una referencia a nuestro Firebase Storage en:

````ts
profilePictures/user1/profilePicture.png
````
Eso es donde almacenaremos nuestra imagén, para almacenarlo usaremos el metodo ```.putString()``` pasando la cadena en ```base64``` que obtuvimos del Plugin:

````ts
.then(profilePicture => {
  // Send the picture to Firebase Storage
  const selfieRef = firebase.storage().ref('profilePictures/user1/profilePicture.png');
  selfieRef.putString(profilePicture, 'base64', {contentType: 'image/png'});
});
````

Despues que la creamos, también podemos guardar su referencia en nuestro Firebase Realtime DB para tener el downloadURL de esa imagen, de esa manera lo podemos acceder en cualquier momento que queramos:

````ts

.then(profilePicture => {
  // Send the picture to Firebase Storage
  const selfieRef = firebase.storage().ref('profilePictures/user1/profilePicture.png');
  selfieRef
    .putString(profilePicture, 'base64', {contentType: 'image/png'})
    .then(savedProfilePicture => {
      firebase
        .database()
        .ref(`users/user1/profilePicture`)
        .set(savedProfilePicture.downloadURL);
    });
});

````

y esto es,  ahora tenemos una app funcional que captura las imagenes con tu camara y la sube al Firebase Storage.

Ver el post en ingles [aquí](https://javebratt.com/firebase-storage-ionic-camera/)