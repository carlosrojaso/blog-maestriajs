---
layout: post
title: "Como generar Iconos y SplashScreen con Ionic."
keywords: "Tips"
date: 2017-09-28
tags: [tips]
categories: tips
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-28-preparando-iconos-splashscreen%2FEVERYTHING.png?alt=media&token=a3d7c82c-2426-4c03-96c1-8f3595a6784b"
versions:
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.12.0'
---

> Ionic CLI trae una caracteristica super util la cual genera los iconos de tu App y el pantallazo de carga inicial (Splash Screen). En este tutorial vamos a generar los nuestros.

<!--summary-->

<amp-img width="1280" height="720" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-28-preparando-iconos-splashscreen%2FEVERYTHING.png?alt=media&token=a3d7c82c-2426-4c03-96c1-8f3595a6784b"></amp-img>

{% include general/net-promoter-score.html %} 

Si ya has tenido experiencia creando Apps y enviando a dispositivos IOS y Android debes haber observado que generar los iconos es un trabajo tedioso lleno de resoluciones y cortes de tu imagen. Afortunadamente Ionic CLI hace esto por ti.

## Preparando tus imagenes.

En tu proyecto de Ionic vas a ver una carpeta */resources* y adentro podras ver los iconos y splash que por defecto colocan los proyectos de Ionic *icon.png* y *splash.png*. Debes personalizar estos dos archivos con los tuyos en las siguientes resoluciones.


icon.png > 192x192

splash.png > 2208 x 2208


Una vez personalizadas deben reemplazar las anteriores */resources/icon.png* y */resources/splash.png*

## Generando los iconos.

Ya lo mas dificil paso. Ahora simplemente debes escribir el siguiente comando.

````
ionic cordova resources
````

Eso es todo ya tu app deberia tener tu icono e imagen de carga.
