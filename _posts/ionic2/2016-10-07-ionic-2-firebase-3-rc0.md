---
layout: post
title: "Conectando Ionic 2 con Firebase 3 en RC0"
tags: ionic2, firebase3
date: 2016-10-12
categories: ionic2
comments: true
author: javebratt
cover: "http://i.imgur.com/5mTwi1e.jpg"
draft: false
---

<img src="http://i.imgur.com/5mTwi1e.jpg" class="img-responsive" />

Post en [Ingles](https://javebratt.com/ionic2rc0-firebase-js-sdk/)

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

{% highlight json  %}

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


{% endhighlight %} 

Dependiendo cuando lo leas, estos paquetes pueden variar (Especialmente los numeros de versión) entonces mantén eso en mente,
también puedes escribirme a j@javebratt.com si tienes alguna pregunta/problema/acontecimiento con esto.

## Instalar los paquetes que necesitas.

Para que este proyecto trabaje debes instalar unos paquetes adicionales.

Especialmente Firebase y AngularFire 2 (hey, eso es de lo que se trata el post :) )

Abre tu terminal ( Deberias ya estar en el directorio de tu proyecto ) e instala los paquetes en este ordén:

<code>
npm install firebase angularfire2 --save
</code>

**Nota en RC0:** Usualmente el ecosistema de Types es fuerte y todo lo que tu necesitas es hacer <pre>npm install @types/package_name</pre>
para tener este trabajando, pero Firebase no ha actualizado su definición de type para 3.x y ellos aún estan utilizando 2.4.x esa es para consolas antiguas.

Asi que todo lo que tu necesitas hacer es un pequeño hack para lograr tener este trabajando, espero remover esta sección pronto.

## Configurando Rollup

En su ultima actualización, Ionic 2 dejo de lado Webpack para empezar a trabajar con Rollup, como ellos dicén en su [Sitio](http://j.mp/2dn0P1f): Rollup es la 
proxima generación de Javascript module Bundle

y yo tengo que decir, Nosotros migramos una app a producción y esta trabajando realmente bién, el tiempo de arranque fue reducido considerablemente.

Necesitamos cambiar el archivo de configuración Rollup de Ionic, para agregar algunas cosas y tener Firebase trabajando.

En lugar de cambiar el script, vamos a crear nuestro propio archivo y decirle a Ionic que lo use, esto puede sonar complicado pero creeme no lo es.

A proposito, tu podrias solo editar el archivo original, pero en cada actualización de Ionic hara que el archivo rollup se restablezca y tendras que hacerlo de nuevo.

## Crear los nuevos archivos.

Lo primero que deberas hacer es ir a la raiz de tu archivo y crear un archivo llamado **scripts**.

Dentro de la carpeta voy a necesitar crear un archivo llamado **rollup.config.js**

Ahora debes ir a **node_modules/@ionic/app-scripts/config/rollup.config.js** este deberia verse un poco como esto:


{% highlight json  %}

var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var json = require('rollup-plugin-json');


// https://github.com/rollup/rollup/wiki/JavaScript-API

var rollupConfig = {
  /**
   * entry: The bundle's starting point. This file will
   * be included, along with the minimum necessary code
   * from its dependencies
   */
  entry: 'src/app/main.dev.ts',

  /**
   * sourceMap: If true, a separate sourcemap file will
   * be created.
   */
  sourceMap: true,

  /**
   * format: The format of the generated bundle
   */
  format: 'iife',

  /**
   * dest: the output filename for the bundle in the buildDir
   */
  dest: 'main.js',

  /**
   * plugins: Array of plugin objects, or a single plugin object.
   * See https://github.com/rollup/rollup/wiki/Plugins for more info.
   */
  plugins: [
    builtins(),
    commonjs(),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    }),
    globals(),
    json()
  ]

};


if (process.env.IONIC_ENV == 'prod') {
  // production mode
  rollupConfig.entry = '{{TMP}}/app/main.prod.ts';
  rollupConfig.sourceMap = false;
}


module.exports = rollupConfig;

{% endhighlight %}

Ahora tu debes copiar el contenido entero de ese archivo y pegar este en el nuevo archivo que tu acabas de crear en  **scripts/rollup.config.js**

## Dile a Ionic que lo use.

Ahora nosotros necesitamos decirle a Ionic que use nuestra nueva configuración rollup en lugar de la que viene por defecto.

Para eso tu tendras que ir a **package.json** y tu tendras que crear una nueva entrada en el nodo principal llamado **config** y apuntar la dirección
a el nuevo **rollup.config.js.**

De esta manera, abre el **package.json** y agrega:


{% highlight json  %}

"config": {
  "ionic_rollup": "./scripts/rollup.config.js"
}

{% endhighlight %}

Esto hara que tu nueva app use el nuevo **scripts/rollup.config.js** para Rollup.

Vamos a probar para ver si esta trabajando, abre **scripts/rollup.config.js** y sobre la primera linea agregamos **console.log** para ver si esta
se muestra en la terminal. Este puede ser cualquier cosa que tu quieras, Nosotros solo necesitamos ver si se esta leyendo el archivo.

Asi que este se vera de esta forma.


{% highlight json  %}
console.log("I'm the Hulk");
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var json = require('rollup-plugin-json');


// https://github.com/rollup/rollup/wiki/JavaScript-API

var rollupConfig = {
  /**
   * entry: The bundle's starting point. This file will
   * be included, along with the minimum necessary code
   * from its dependencies
   */
  entry: 'src/app/main.dev.ts',

  /**
   * sourceMap: If true, a separate sourcemap file will
   * be created.
   */
  sourceMap: true,

  /**
   * format: The format of the generated bundle
   */
  format: 'iife',

  /**
   * dest: the output filename for the bundle in the buildDir
   */
  dest: 'main.js',

  /**
   * plugins: Array of plugin objects, or a single plugin object.
   * See https://github.com/rollup/rollup/wiki/Plugins for more info.
   */
  plugins: [
    builtins(),
    commonjs(),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    }),
    globals(),
    json()
  ]

};


if (process.env.IONIC_ENV == 'prod') {
  // production mode
  rollupConfig.entry = '{{TMP}}/app/main.prod.ts';
  rollupConfig.sourceMap = false;
}


module.exports = rollupConfig;
{% endhighlight %}

Entonces, abre tu terminal y ejecuta <code>$ npm run build</code>

<img class="img-responsive" src="https://i1.wp.com/javebratt.com/wp-content/uploads/2016/10/hulk.png?resize=1024%2C576&ssl=1"/>

Ahora que sabemos que estamos en el archivo correcto (**scripts/rollup.config.js**) vamos a agregar 2 cosas.

Primero, Nosotros agregaremos **useStrict: false,** a el archivo principal de node en la variable **rollupConfig** , esto evitara
errores de **eval** cuando realices tu build.

Ahora debemos decir a nuestro nuevo archivo de configuración que use nuestros modulos commonjs (En este caso solo Firebase)


{% highlight json  %}
commonjs({
  include: [
    'node_modules/rxjs/**', // firebase needs rxjs to avoid build errors
    'node_modules/firebase/**', // here we're calling firebase.
  ],
  namedExports: {
    'node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
  }
}),
{% endhighlight %}

En el final del archivo **scripts/rollup.config.js** deberia estar como:


{% highlight json  %}
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var json = require('rollup-plugin-json');


// https://github.com/rollup/rollup/wiki/JavaScript-API

var rollupConfig = {
  /**
   * entry: The bundle's starting point. This file will
   * be included, along with the minimum necessary code
   * from its dependencies
   */
  entry: 'src/app/main.dev.ts',

  /**
   * sourceMap: If true, a separate sourcemap file will
   * be created.
   */
  sourceMap: true,

  /**
   * format: The format of the generated bundle
   */
  format: 'iife',

  /**
   * dest: the output filename for the bundle in the buildDir
   */
  dest: 'main.js',

  // Add this to avoid eval errors
  useStrict: false,

  /**
   * plugins: Array of plugin objects, or a single plugin object.
   * See https://github.com/rollup/rollup/wiki/Plugins for more info.
   */
  plugins: [
    builtins(),
    commonjs({
      include: [
        'node_modules/rxjs/**', // firebase needs rxjs to avoid build errors
        'node_modules/firebase/**', // here we're calling firebase.
      ],
      namedExports: {
        'node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
      }
    }),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    }),
    globals(),
    json()
  ]

};


if (process.env.IONIC_ENV == 'prod') {
  // production mode
  rollupConfig.entry = '{{TMP}}/app/main.prod.ts';
  rollupConfig.sourceMap = false;
}


module.exports = rollupConfig;
{% endhighlight %}

Ahora necesitamos hacer una ultima cosa para tener a Firebase trabajando, necesitamos agregarlas a nuestro archivo <code>tsconfig.js</code>, asi que 
vamos y agreguemos una opción a  **Types** que sera **firebase**


{% highlight json  %}
"types": [
    "firebase"
],
{% endhighlight %}

Al final el archivo deberia verse algo asi:


{% highlight json  %}
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [
      "dom",
      "es2015"
    ],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es5"
  },
  "types": [
    "firebase"
  ],
  "exclude": [
    "node_modules"
  ],
  "compileOnSave": false,
  "atom": {
    "rewriteTsconfig": false
  }
}
{% endhighlight %}

Ahora puedes inicializar firebase yendo a **src/app/app.component.js** e importando todo lo que tu necesitas de Firebase:


{% highlight ts linenos %}
import firebase from 'firebase'; // Big change from '* as firebase'.

// Get your info from your firebase console.
const firebaseconfig = { 
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: ''
};
{% endhighlight %}

Y entonces inicializalo dentro del constructor:


{% highlight ts linenos %}
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    firebase.initializeApp(firebaseconfig); // Here we initialize Firebase.

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
{% endhighlight %}

En el final del archivo deberia verse algo asi.


{% highlight ts linenos %}
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import firebase from 'firebase'; // Big change from '* as firebase'.

// Get your info from your firebase console.
const firebaseconfig = { 
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: ''
};

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    firebase.initializeApp(firebaseconfig); // init Firebase

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
{% endhighlight %}

Esto dara acceso a **firebase** en tu app, todo loq ue debes hacer es:


{% highlight javascript linenos %}
import firebase from 'firebase'; // Instead of '* as firebase'.
{% endhighlight %}

Puedes encontrar tus datos de  **firebaseConfig** en la [Consola](https://console.firebase.google.com/)

Solo debes ir a tu consola, click en tu app (O crea una nueva) y ahi va a darte algunas opciones.

## Proximos pasos.

Ya lo tienes trabajando? Estas teniendo algun problema? Dejame Saberlo.

Hey, yo escribi un libro llamado "Build your first Firebase powered Ionic2 app using AngularFire2" este te llevara por todo el 
proceso para crear una App con Ionic 2 y AngularFire 2. Esta en ingles te dejo el boton [aqui](https://gumroad.com/a/981415027).
