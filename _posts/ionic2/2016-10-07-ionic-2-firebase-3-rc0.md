---
layout: post
title: "Conectando Ionic 2 con Firebase 3"
tags: ionic2, firebase3
date: 2016-10-07
categories: ionic2
comments: true
author: javebratt
cover: "http://i.imgur.com/5mTwi1e.jpg"
draft: true
---

<img src="http://i.imgur.com/5mTwi1e.jpg" class="img-responsive" />

## Esta tu entorno de desarrollo actualizado?

Antes de escribir cualquier codigo, vamos a tomarnos unos minutos para instalar todo lo que necesitas para ser capaz de 
construir esta app, de esa manera no tendras que cambiar de contexto entre hacer codigo e instalar cosas.

Lo primero que haras sera instalar (node.js)[https://nodejs.org/en/] estar seguro que tienes la version 6.x  aún hasta la versión 4
trabaja bien para la mayoria de los usuarios. Encontre que si no instalas la versión correcta de algunos paquetes quiebra algunas cosas
en mis apps.

La segunda cosa que debes hacer es estar seguro que tienes Ionic, Cordova y Typescript instalado, podras hacer esto abriendo tu terminal
y escribiendo.

<pre>
$ npm install -g ionic cordova typescript
</pre>

Dependiendo de tu sistema operativo (Mayormente si corres Linux o Mac) debes tener que agregar **sudo** antes del comando
**npm install**

Una cosa buena que puedes notar es que el Ionic CLI esta fuera de beta. Si tu no eres nuevo en Ionic recordaras que nosotros
usabas para instalar **ionic@beta**

También desde que Ionic libero RC0 tu no tendras que instalar typings tampoco, ellos usán **npm @types** ahora.

## Crea tu app

Ahora que estas seguro que todo esta instalado y actualizado, tu crearas una nueva app en Ionic 2.

Para esto solo necesitaras (Mientras aún estas en la terminal) navegar al folder que tu quieras crear este.

Para mi es mi directorio de desarrollo en mi <pre>~/</pre>:

<pre>
$ cd Development
$ ionic start debtTracker blank --v2
$ cd debtTracker
</pre>

Lo que hace estas lineas es lo siguiente:

1. Primero, tu navegaras al directorio de Desarrollo.
2. Another item
3. Segundo, tu crearas el nuevo Ionic 2 app: 

**ionic start** crea el app.
**debtTracker** es el nombre que le otorgamos.
**blank** le dice al CLI que quieres comenzar con la plantilla en blanco.
**--v2** le dice al ionic CLI que tu quieres crear un proyecto ionic 2 en lugar de un proyecto en ionic 1.

4. Navegaremos dentro del directorio de nuestro proyecto.

Desde ahora todo lo que vamos a escribir va a ser en este directorio a menos que diga otra cosa.

## Los paquetes npm que vienen con el proyecto.

Cuando usas el ionic CLI para crear un nuevo proyecto, este va a hacer varias cosas por ti, una de estas cosas es asegurarte
que tu proyecto tiene los paquetes/modulos **npm** necesarios.

Eso significa, el comando **start** va a instalar todos los requerimientos de **ionic-angular** , **angularjs** y más. Asi es
como el archivo **package.json** deberia ser:

````json
{
  "name": "ionic-hello-world",
  "author": "Ionic Framework",
  "homepage": "http://ionicframework.com/",
  "private": true,
  "scripts": {
    "build": "ionic-app-scripts build",
    "watch": "ionic-app-scripts watch",
    "serve:before": "watch",
    "emulate:before": "build",
    "deploy:before": "build",
    "build:before": "build",
    "run:before": "build"
  },
  "dependencies": {
    "@ionic/storage": "^1.0.3",
    "ionic-angular": "^2.0.0-rc.0",
    "ionic-native": "^2.0.3",
    "ionicons": "^3.0.0"
  },
  "devDependencies": {
    "@ionic/app-scripts": "latest",
    "typescript": "^2.0.3"
  },
  "description": "rcUpdate: An Ionic project",
  "cordovaPlugins": [
    "cordova-plugin-device",
    "cordova-plugin-console",
    "cordova-plugin-whitelist",
    "cordova-plugin-splashscreen",
    "cordova-plugin-statusbar",
    "ionic-plugin-keyboard"
  ],
  "cordovaPlatforms": [],
}
```` 

Dependiendo cuando lo leas, estos paquetes pueden variar (Especialmente los numeros de versión) entonces mantén eso en mente,
también puedes escribirme a j@javebratt.com si tienes alguna pregunta/problema/acontecimiento con esto.

## Instalar los paquetes que necesitas.

Para que este proyecto trabaje debes instalar unos paquetes adicionales.

Especialmente Firebase y AngularFire 2 (hey, eso es de lo que se trata el post :) )

Abre tu terminal ( Deberias ya estar en el directorio de tu proyecto ) e instala los paquetes en este ordén:

<pre>
npm install firebase angularfire2 --save
</pre>

**Nota en RC0:** Usualmente el ecosistema de Types es fuerte y todo lo que tu necesitas es hacer <pre>npm install @types/package_name</pre>
para tener este trabajando, pero Firebase no ha actualizado su definición de type para 3.x y ellos aún estan utilizando 2.4.x esa es para consolas antiguas.

Asi que todo lo que tu necesitas hacer es un pequeño hack para lograr tener este trabajando, espero remover esta sección pronto.

## Configurando Rollup

En su ultima actualización, Ionic 2 dejo de lado Webpack para empezar a trabajar con Rollup, como ellos dicén en su (Sitio)[http://j.mp/2dn0P1f]: Rollup es la 
proxima generación de Javascript module Bundle

y yo tengo que decir, Nosotros migramos una app a producción y esta trabajando realmente bién, el tiempo de arranque fue reducido considerablemente.
