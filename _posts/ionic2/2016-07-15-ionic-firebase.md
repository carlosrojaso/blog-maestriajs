---
layout: post
title: "Conectando Ionic con Firebase"
tags: [firebase]
date: 2017-06-09
categories: ionic2
author: carlosrojas
cover: "/images/posts/ionic2/2016-07-15-ionic-firebase/cover.jpg"
versions:
  - title: 'ionic'
    number: '3.3.0'
---

<amp-img width="1280" height="720" layout="responsive" src="/images/posts/ionic2/2016-07-15-ionic-firebase/cover.jpg"></amp-img>

{% include general/net-promoter-score.html %} 

Firebase hace un tiempo evoluciono su plataforma para ofrecer una nueva serie de servicios entre los que resalta la autenticación, database, notificaciones, hosting entre otras.

Pero esto ha ocasionado que mucha información este desactualizada y por lo tanto sea difícil realizar esta integración con Ionic, es por esto que colocare a grandes rasgos el procedimiento sin usar AngularFire.

## 1. Crear un proyecto en Firebase.

[Firebase](https://console.firebase.google.com)

## 2. Crear tu proyecto en Ionic.

```
ionic start myapp blank --cordova
```

## 3. Instalar dependencia de Firebase en tu proyecto.

```
npm install firebase --save
```

{% include blog/subscribe.html %}

## 4. Importar en los archivos donde vayas a utilizar la Firebase.

```ts
import * as firebase from 'firebase';
```

## 5. Modificar app.component.ts con información de firebase.

En esta info debes colocar los parametros de inicialización en una variable.

```ts
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyAvYzM1bqFjoVi-VGMHeDbN0XwFsYDtLQ0",
  authDomain: "demo104-60efc.firebaseapp.com",
  databaseURL: "https://demo104-60efc.firebaseio.com",
  projectId: "demo104-60efc",
  storageBucket: "demo104-60efc.appspot.com",
  messagingSenderId: "903778168776"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      firebase.initializeApp(firebaseConfig);
    });
  }
}
```

Con estos pasos basicos estaras listo para poder empezar a utilizar Firebase. No dudes en escribir en los comentarios si tienes preguntas :)