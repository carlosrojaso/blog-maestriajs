---
layout: post
title: "El estado del arte de las Apps."
tags: [tips]
date: 2017-03-03
categories: tips
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-03-estado-de-las-apps-hibridas%2F1-Pq2S2TRqVpSnurkKnhKbZw-squashed.png?alt=media&token=903f513a-3e48-4494-ad88-ca745cb048ab"
---
> Si eres nuevo en el mundo de Javascript o es la primera vez que vas a realizar una App usando Javascript,esta información te puede ayudar a entender cual es el camino más adecuado.

Lo primero es entender un poco las gamas de esta tecnologias actuales. En este grafico he colocado tres clasificaciones y algunas tecnologias que me parecen van a dar mucho de que hablar en cada plataforma.

<img width="750" height="422" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-03-estado-de-las-apps-hibridas%2F1-Pq2S2TRqVpSnurkKnhKbZw-squashed.png?alt=media&token=903f513a-3e48-4494-ad88-ca745cb048ab">

 

## Hybrid Apps

Las Apps hibridas se construyen sobre Apache Cordova y basicamente, te permiten realizar una app utilizando HTML + CSS + JS y la envuelve en un Webview (especificado en el SDK de Android e IOS), te da acceso a las características nativas del dispositivo y te permite extender la funcionalidad a traves de plugins (Pequeñas piezas de código Java o Swift — Objetive-C ). En esta clasificación a mi pensar el más completo es [Ionic Framework](http://ionicframework.com/) y es por eso que hablamos tanto sobre el en este blog ;)



## JS Runtime

Las Apps resultantes de estas tecnologias tienen componentes nativos (No estan insertadas en un Webview). Su característica principal es que son escritas con Javascript y usan una maquina virtual para convertirlas a componentes Nativos. El que considero más importante en esta tecnologia es [NativeScript](https://www.nativescript.org/).

## Native Apps

Son construidos utilizando el lenguaje de programación soportado por el SDK oficial del dispositivo. Debes desarrollar un proyecto independiente para cada plataforma y sus SDKs son muy completos. Los Lenguajes a utilizar son Objetive-C o Swift para IOS y Java para Android.

Bueno, basicamente este es un resumen del mundo del desarrollo móvil elegir entre una opción o la otra no es facil, pero puedes utilizar criterios como tiempo disponible para el desarrollo y presupuesto.

