---
layout: post
title: "¿ Que es Ionic Cloud Services ?"
date: 2017-02-04
tags: [class, ionic2]
categories: ionic2
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fcloudservices%2Fcloud-welcome-illustration.png?alt=media&token=96d7e1a3-e269-4440-9b55-bf1f00793338"
---
> Ionic Cloud es el servicio del equipo detras del excelente framework Ionic 2 para proveer de un Mobile Backend orientado a *Apps Hibridas*.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fcloudservices%2Fcloud-welcome-illustration.png?alt=media&token=96d7e1a3-e269-4440-9b55-bf1f00793338"></amp-img> 

Esta solución llega en un momento perfecto donde existen otras soluciones como [Firebase](firebase.google.com){:target="_blank"} o [Parse](https://parseplatform.github.io/){:target="_blank"} que siempre han tratado a las Apps Hibridas (Basadas en Cordova) como un ciudadano 
de Segunda Clase, y es aqui donde llega Ionic Cloud a solucionar los mismos problemas que estas tres solucionan pero tomando en cuenta su buen funcionamiento en nuestras Apps Hibridas, y eso significa no perder tiempo en tratar de hacer hacks para que todo funcione. Suena bien no?

Bueno ahora hablemos sobre los servicios.

## Auth

Todas las apps necesitan una forma de autenticación al menos un formulario de registro de Email/Password. Con este servicio tendras todo estos elementos listos para usar en tu proxima App sin necesidad de preocuparte por Servidores, Tokens, Apis, etc.

## IonicDB

De este servicio ya hablamos ampliamente en este [Post](/blog/news/IonicDB/){:target="_blank"}. Pero basicamente, otorga a nuestra App la capacidad de almacenar información y ademas actualizarla en Tiempo Real.

{% include blog/subscribe.html %}

## Deploy

Este servicio te permite actualizar tus archivos en cualquier momento sin tener que pasar por el demorado proceso de las tiendas como App Store, Mientras no tengas que realizar cambios en el Binary (Agregar/Remover un Plugin por ejemplo).

## Push

De este servicio ya hablamos ampliamente en este [Post](/blog/ionic2/ionic-push-notifications/){:target="_blank"}. Basicamente, puedes enviar Push Notifications en IOS e Android sin tener que preocuparte por intensas configuraciones de Servidor y obteniendo las analiticas de tus campañas.

## Package

No tienes un Mac para crear el ejecutable de IOS ? No te compila bien en Android ? No te preocupes puedes enviar tu proyecto a Ionic Cloud Package y ellos se encargaran de todo eso por ti. Este servicio te devuelve un IPA (IOS Ejecutable) o un APK (Android Ejecutable). Ahorrandote tiempo y dolores de cabeza.

Si quieres saber mas de sus servicios, Ingresa [acá](http://docs.ionic.io/){:target="_blank"}

