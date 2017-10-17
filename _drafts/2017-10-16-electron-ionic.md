---
layout: post
title: "Construyendo Apps de Escritorio con Ionic."
keywords: "electron,ionic"
date: 2017-10-16
tags: [electron,ionic]
categories: ionic2
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-16-electron-ionic%2FCreando%20Apps%20de%20Escritorio%20con%20Ionic.png?alt=media&token=1bc1512f-dc7a-4fd2-9eea-0780250b8ea0"
editname: "ionic2/2017-10-16-electron-ionic.md"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-native'
    number: '4.2.1'
  - title: 'ionic-app-scripts'
    number: '2.1.4'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.9.2'
---
> Una de las principales de utilizar componentes como los que trae Ionic y ademas utilizar tecnologias estandar como HTML/CSS/JS es que puedes utilizar el mismo proyecto para distribuir de diferentes maneras como en este caso App de escritorio.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-16-electron-ionic%2FCreando%20Apps%20de%20Escritorio%20con%20Ionic.png?alt=media&token=1bc1512f-dc7a-4fd2-9eea-0780250b8ea0" alt="charts"></amp-img>

{% include general/net-promoter-score.html %}

En esta oportunidad vamos a entender que es electron y como lo podemos combinar con Ionic para poder distribuir nuestras Apps en las tiendas de APPs para escritorio como la Mac App Store o la Windows Store.

## ¿ Que es electron ?

Electron es una tecnologia que convierte tu proyecto Web HTML + CSS + JS para ser instalada en sistema operativos de escritorio ( Windows, OS X, etc ), puedes entenderlo como Cordova (Que hace posible que podamos instalar en Android e IOS ) pero para el escritorio.

El sitio oficial dice que es...

<blockquote>
Electron es un framework para crear aplicaciones nativas con tecnologias Web como HTML, CSS y Javascript. El se encarga de las partes dificiles mientras tu te enfocas en el nucleo  de tu aplicación.
</blockquote>

## Conectando Ionic y Electron.

Para poder avanzar con nuestro proyecto debemos tener nuestras dos tecnologias conectadas para eso vamos a utilizar Node y Webpack que ya estan en Ionic y agregaremos Electron para que desarrollar sea facil.

1) Crear un Proyecto de Ionic.

````

$ionic start myapp
$ionic serve

````

2) Instalar las dependencias de electron en nuestro proyecto.

````
npm install electron electron-builder foreman --save-dev
````


