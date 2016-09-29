---
layout: post
title: "Ionic 2 Release Candidate!"
date: 2016-09-29
tags: ionic2 news
categories: news
comments: true
author: nicobytes
cover: "http://blog.ionic.io/wp-content/uploads/2016/09/ionicrc0-1024x304.png"
---

> Ayer tuvimos una gran noticia, **Ionic 2 release candidate** ya está aquí y hay cambios muy fuertes en la estructura del proyecto, pero trae grandes beneficios que serán de los que hablaremos hoy!

<img class="img-responsive" src="http://blog.ionic.io/wp-content/uploads/2016/09/ionicrc0-1024x304.png" alt="google maps">

# Estructura de la App.

Ahora que angular ya está finalizado, ya hay una guia de como debería ser la estructura de aplicación de la forma más óptima, además algo muy bueno es que al momento de compilar la aplicación no lleva lo archivos de desarrollo dentro de la aplicación, solo lleva los archivos dentro del la carpeta `www` y ingora la carpeta `src` donde está todo nuestro código.

<img class="img-responsive" src="http://i.cubeupload.com/ZBUnv9.png" alt="app">

# Ahead of Time Compiling

Este es un gran cambio pero mejora el performance de nuestras aplicaciones y en vez de compilar los templates en tiempo de ejecución, ahora los templates pueden ser pre-compilados y esto mejora el tiempo de arranque en la aplicación. El código compilado que crea se crea por AOT es código que funciona mucho más rápido y está altamente optimizado. Descubre más sobre [**Ahead of Time Compiling (AOT)**](https://en.wikipedia.org/wiki/Ahead-of-time_compilation){:target="_blank"}

<img src="http://blog.ionic.io/wp-content/uploads/2016/09/beta11-vs-beta12.gif" class="img-responsive" alt="aot">

# Angular 2 Final (NgModule)

En este release está usando el release final de angular 2 y varios de los cambios que veremos ahora en ionic 2 es a favor del uso de **@NgModule** que permite declarar todas las dependencias en un solo lugar y no tener que hacerlo varias veces dentro de la aplicación.

Ahora todos las dependencias internas se declaran en el archivo `src/app/app.module.ts` en el array de `declarations`, aquí declaramos todas las pages, providers, componentes y pipes. Y no tenemos que incluir en las páginas los arrays de providers, directives o pipes, cada que que queramos usarlos.

# Proceso de construcción.

Ahora ya no usan gulp como apoyo para correr tareas, han creado sus scripts propios con scripts basados en npm, lo cual minimiza el número de dependencias que trae ionic y hace más optimo el proceso de construcción de la aplicación.

## Los puntos más importantes son:

* Ionic 2 API finalized for `2.0.0` release
* Angular `2.0.0` final!
* `ionViewCanEnter` / `ionViewCanLeave` lifecycle events
* Floating Action Button (FAB) lists
* Ahead of Time (AoT) compiler ready
* Components can now individually set a mode, which means an app can mix and match iOS / Material Design / Windows Platform modes if that’s desired
* Typescript 2.0
* `@types` support for third-party libraries
* Move away from `gulp` ([ionic-gulp-tasks](https://github.com/driftyco/ionic-gulp-tasks)) to `npm scripts` ([ionic-app-scripts](https://github.com/driftyco/ionic-app-scripts))
* Use [Rollup](http://rollupjs.org) for bundling instead of `browserify` or `webpack`

## Pasos para actulizar [aquí](#steps-to-upgrade-to-rc0){:target="_blank"}

**Nota:** *Hay muchas cosas que cambian pero con este release candidate el equipo de ionic nos promete que ya no habrá más cambios tan robustos al fin de acabo ya es la versión casi lista para producción, así que acogeremos estos cambios pronto y actualizaremos nuestros [demos](http://www.ion-book.com/demos/){:target="_blank"} en las próximas semanas.*
