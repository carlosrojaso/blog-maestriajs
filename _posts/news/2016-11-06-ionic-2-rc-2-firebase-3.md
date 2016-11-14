---
layout: post
title: "Firebase 3  + Ionic 2 RC 2 en 4 pasos"
date: 2016-11-14
categories: news
tags: firebase ionic2
comments: true
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-2-rc2-firebase-3%2FFirebase%203%20%2B%20Ionic%202.png?alt=media"
draf: true
---

> Incluir **Firebase** en un proyecto de ionic puede ser algo complejo pero en este último release de [**Ionic el RC2**](http://www.ion-book.com/news/ionic-2-rc-2){:target="_blank"}, es mucho más fácil hacer la implementación ya que no toca entrar a archivos de configuración etc etc.

<img class="img-responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-2-rc2-firebase-3%2FFirebase%203%20%2B%20Ionic%202.png?alt=media" alt="upgrade">

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2](http://www.ion-book.com/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start test blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd test
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera `src`:

<img class="img-responsive center-block" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo102%2FScreenshot%20from%202016-11-06%2012-46-16.png?alt=media" alt="folders">

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

{% highlight ts %}
export const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxxxxxx"
};
{% endhighlight %}


Estas las otorga firebase, creado un proyecto en [firebase.google.com](https://firebase.google.com){:target="_blank"}

## Paso 4: Incluir keys en NgModule

{% highlight ts %}
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
{% endhighlight %}


El archivo `app.module.ts` finalmente quedara así:

{% highlight ts %}
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
{% endhighlight %}

Y listo ya con la anterior configuración conectamos Ionic con Firebase, también hemos actualizado nuestros recursos relacionados con Firebase, con este último release.

<div class="row">
  <div class="col-xs-12 col-sm-6">
    <article class="article-home">
      <div class="cover-crop">
        <a href="http://www.ion-book.com/demos/firebase-database-and-ionic-2" target="_blank">
          <img src="http://i.cubeupload.com/T62oZF.jpg" class="img-responsive" alt="demo"/>
        </a>
      </div>
      <h1>
        <a href="http://www.ion-book.com/demos/firebase-database-and-ionic-2" target="_blank">Firebase Database + Ionic 2.</a>
      </h1>
      <div class="more">
        <a class="btn btn-primary" href="http://www.ion-book.com/demos/firebase-database-and-ionic-2" target="_blank">Leer más...</a>
      </div>
    </article>
  </div>
  <div class="col-xs-12 col-sm-6">
    <article class="article-home">
      <div class="cover-crop">
        <a href="http://www.ion-book.com/ionic2/firebase-3 Ionic" target="_blank">
          <img src="http://i.imgur.com/5mTwi1e.jpg" class="img-responsive" alt="demo"/>
        </a>
      </div>
      <h1>
        <a href="http://www.ion-book.com/ionic2/firebase-3" target="_blank">Firebase 3 + Ionic</a>
      </h1>
      <div class="more">
        <a class="btn btn-primary" href="http://www.ion-book.com/ionic2/firebase-3" target="_blank">Leer más...</a>
      </div>
    </article>
  </div>
</div>