---
layout: post
title: "Compodoc - Documentación en Angular Apps."
date: 2018-02-16
tags: [angular]
categories: angular
author: carlosrojas
repo: https://github.com/ion-book/firstAngular
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-10-compodoc-documentacion_angular_apps%2FCompodoc.png?alt=media&token=ac39b0c9-6d5e-49e0-a6c8-1ff818975032"
editname: "ionic2/2018-02-15-compodoc-documentacion_ionic_apps.md"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-native'
    number: '4.5.2'
  - title: 'ionic-app-scripts'
    number: '3.1.7'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.19.0'
---
> Cuando los proyectos en Ionic crecen un poco más de 50 componentes y tenemos varios desarrolladores en el proyecto, es buena idea tener Documentación de codigo para las generaciónes futuras.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-10-compodoc-documentacion_angular_apps%2FCompodoc.png?alt=media&token=ac39b0c9-6d5e-49e0-a6c8-1ff818975032"></amp-img> 

{% include general/net-promoter-score.html %} 

En esta oportunidad voy a dar una continuación de nuestro [post sobre Compodoc](https://blog.ng-classroom.com/blog/angular/compodoc-documentacion_angular_apps/) pero esta vez con Ionic.

## Que es Compodoc ?

Compodoc es un generador de Documentación el cual va a leer los archivos de tu proyecto en Angular y va a generar una Documentación simple y elegante que va contener sus bloques de construcción junto con los comentarios que tengas en los mismos.

Si quieres ver más a fondo las caracteristicas de esta herramienta visita nuestro [post sobre Compodoc](https://blog.ng-classroom.com/blog/angular/compodoc-documentacion_angular_apps/).

## Instalación.

En tu proyecto de Ionic.

````
npm install @compodoc/compodoc
````

Creamos una tarea en nuestro ```package.json``` para que sea mas facil.

````
"scripts": {
  ...
  "compodoc": "./node_modules/.bin/compodoc -d ./docs/ -p ./tsconfig.json"
}
````

y cada vez que queramos actualizar nuestra documentación simplemente usamos:

````
npm run compodoc
````

{% include blog/subscribe.html %}

## Uso.

Ejecuta la tarea.

````
npm run compodoc
````

Puedes correr un servidor local de tu preferencia o el que trae compodoc.

````
$ ./node_modules/.bin/compodoc -s -d ./docs/
````

Bueno espero que sea de ayuda y no te olvides comentar y compartir :)