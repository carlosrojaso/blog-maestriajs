---
layout: post
title: "Firebase 3  + Ionic 2 RC 2 en 4 pasos"
date: 2016-11-14
categories: ionic2
tags: [firebase, ionic2]
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-2-rc2-firebase-3%2FFirebase%203%20%2B%20Ionic%202.png?alt=media"
versions:
  - title: 'ionic'
    number: '2.0.0-rc2'
---

> Incluir **Firebase** en un proyecto de ionic puede ser algo complejo pero en este último release de [**Ionic 2 RC2**]({{site.urlblog}}/news/ionic-2-rc-2){:target="_blank"}, es mucho más fácil hacer la implementación ya que no toca entrar a archivos de configuración etc etc.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-2-rc2-firebase-3%2FFirebase%203%20%2B%20Ionic%202.png?alt=media"></amp-img>

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2]({{site.urlblog}}/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start test blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd test
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera `src`:

<amp-img width="500" height="493" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo102%2FScreenshot%20from%202016-11-06%2012-46-16.png?alt=media" alt="folders"></amp-img>

Agregamos la plataforma para la que vamos a desarrollar, puede android o IOS:

```
ionic platform add android
```

## Paso 2: Instalar Firebase y angularfire 2

```
npm install @types/request@0.0.30 --save-dev --save-exact
npm install firebase angularfire2 --save
```

## Paso 3: Crear variables de configuración

```ts
export const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxxxxxx"
};
```

Estas las otorga firebase, creado un proyecto en [firebase.google.com](https://firebase.google.com){:target="_blank"}

## Paso 4: Incluir keys en NgModule

```ts
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AuthService
  ]
})
export class AppModule {}
```


El archivo `app.module.ts` finalmente quedara así:

```ts
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxxxxxx"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: []
})
export class AppModule {}
```

Y listo ya con la anterior configuración conectamos Ionic con Firebase, también hemos actualizado nuestros recursos relacionados con Firebase, con este último release.