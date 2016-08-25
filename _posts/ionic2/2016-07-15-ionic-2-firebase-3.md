---
layout: post
title: "Conectando Ionic 2 con Firebase 3"
tags: ionic2, firebase3
date: 2016-07-15
categories: ionic2
comments: true
author: carlosrojas
cover: "http://i.imgur.com/5mTwi1e.jpg"
url: "http://www.ion-book.com/ionic2/ionic-2-firebase-3"
---

<img src="http://i.imgur.com/5mTwi1e.jpg" class="img-responsive" />

Firebase hace un tiempo evoluciono su plataforma para ofrecer una nueva serie de servicios entre los que resalta la autenticación,
database, notificaciones, hosting entre otras.

Pero esto ha ocasionado que mucha información este desactualizada y por lo tanto sea dificil realizar esta integración con Ionic 2, es por esto
que colocare a grandes rasgos el procedimiento.

## 1. Crear un proyecto en Firebase.

[Firebase](https://console.firebase.google.com)

## 2. Crear tu proyecto en Ionic 2.

`
$ionic start myapp --v2
`

## 3. Modificar app.ts con información de firebase.

En esta info debes colocar los parametros de inicialización en una variable.

{% highlight javascript linenos %}
var config = {
    apiKey: "aasdasdadmasdjasxxxx",
    authDomain: "yourapp.firebaseapp.com",
    databaseURL: "https://yourapp.firebaseio.com",
    storageBucket: "yourapp.appspot.com",
  };
  firebase.initializeApp(config);
{% endhighlight %}

## 4. Instalar dependencia de Firebase en tu proyecto.

```
$ npm install firebase --save 
```

## 5. Instalar dependencia de Firebase en tu proyecto.

```
$ typings install --save firebase
```

## 6. Importar en los archivos donde vayas a utilizar la Firebase.

```
import * as firebase from 'firebase';
```

Con estos pasos basicos estaras listo para poder empezar a utilizar Firebase. No dudes en escribir en los comentarios si tienes preguntas :)