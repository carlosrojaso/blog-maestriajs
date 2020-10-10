---
layout: post
title: "Creando librerias para tus proyectos."
keywords: "Angular"
date: 2017-08-23
tags: [tips]
categories: tips
author: carlosrojas
repo: https://github.com/ion-book/demo119
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-22-creando-modulos-npm%2Fdmitrij-paskevic-44124.jpg?alt=media&token=12bb6fa6-17f6-49ea-a91f-a6a0f3b7bff7"
versions:
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.3.0'
---

> A medida que vas trabajando en proyectos con Ionic te encuentras con que puedes reutilizar varias piezas de tu codigo por ejemplo componentes, servicios o directivas. Pero no estaria muy bien si lo pudiera utilizar con npm como hago con Ionic?

<!--summary-->

<img width="1280" height="720" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-22-creando-modulos-npm%2Fdmitrij-paskevic-44124.jpg?alt=media&token=12bb6fa6-17f6-49ea-a91f-a6a0f3b7bff7">

 

En este post voy a construir una libreria en Angular que como saben es la tecnologia sobre la cual esta construido Ionic, entonces, deberian ser compatibles asi como con otras librerias tal como [AngularFire2](https://github.com/angular/angularfire2)

## ¿ Qué es un modulo en Javascript ?

No importando el tipo de libreria que vayas a hacer, modularidad es fundamental. Si eres desarrollador Front-end y recuerdas cuando utilizabas tus primeras librerias como Jquery, descargabas la libreria y la agregabas a tu codigo con:

````html
<script src=”path/to/jquery.js”></script>
````
y el CSS

````html
<link rel=”stylesheet” type=”text/css” href=”path/to/theme.css”>
````

esto suena sencillo si solo agregas una libreria, pero cuando agregabas mas de una libreria obtenias problema de compatibilidad y multiples llamado a la misma libreria. Estos son algunos de los problemas.

**Dependencia de Orden.** El momento en el que insertas la libreria es importante. Recuerdas cuando ponias Jquery debajo del Plugin?

**Colisión de Nombres.** Todas las variables son declarados en un ambito global lo que puede terminar en resultados extraños debido a que se puede dar el caso de que las variables se declaren con el mismo nombre en dos librerias.

**Mantenibilidad y Reusabilidad** Es dificil saber si tu codigo se quiebre por el cambio de dependencias.

La modularidad te puede ayudar con eso.

## Creando nuestra libreria.

Ok. primero que todo debemos aislar nuestro componente y realizar todo el proceso sobre esta carpeta.

````
git clone https://github.com/ion-book/demo119.git
````

he creado un componente de  ejemplo en este repo.

````
git checkout step1
````

ok, ahora debemos crear un modulo con nuestro componente para que npm entienda que como debe agregar nuestra caracteristica a los proyectos.

````ts
import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule]
})
export class CompoPlaceModule {}
````

Importante en este paso no importar el ```BrowserModule``` por que este debe estar en el proyecto principal.

Dentro de nuestro modulo debemos declarar, y exportar los componentes publicos.

````ts
import { NgModule }     from '@angular/core';
import { CompoPlaceComponent }  from './compo-place.component';

@NgModule({
  declarations: [
    CompoPlaceComponent
      ],
    exports: [CompoPlaceComponent]
})
export class CompoPlaceModule{}
````

Puedes llegar a este paso con el repo utilizando.

````
git checkout step2
````

## Generando el API Publica.

Cuando importas un modulo en un proyecto de Ionic observas que puedes importar algunas cosas, ese es el API Publica. Para crear esto necesitamos crear un ````index.ts````

````ts
export { CompoPlaceModule }  from './compo-place.module';
export { CompoPlaceComponent }  from './compo-place.component';
````
Puedes llegar a este paso con el repo utilizando.

````
git checkout step3
````

## Construyendo el modulo.

Esta es simpre la parte mas compleja, por que nos toca utilizar herramientas que no estamos acostumbrados, que normalmente Ionic CLI hace el trabajo por nosotros. Pero para esto vamos a necesitar lo siguiente:

- Typescript via el Compilador de Angular (ngc), para transpilar.
- rollupjs para empaquetar.
- uglify-js para minificar.

````
npm install @angular/compiler @angular/compiler-cli typescript rollup uglify-js --save-dev
````

Despues de leer un poco la documentacion y algunos blogs. Genero esto. Podras utilizarlo en tus librerias con pocas modificaciones. Este archivo se debe llamar ````tsconfig.json````

````
{
  "compilerOptions": {
    "baseUrl": ".",
    "declaration": true,
    "stripInternal": true,
    "experimentalDecorators": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "module": "es2015",
    "moduleResolution": "node",
    "paths": {
      "@angular/core": ["node_modules/@angular/core"]
    },
    "rootDir": ".",
    "outDir": "dist",
    "sourceMap": true,
    "inlineSources": true,
    "target": "es5",
    "skipLibCheck": true,
    "lib": [
      "es2015", 
      "dom"
    ]
  },
  "files": [
    "index.ts"
  ],
  "angularCompilerOptions": {
    "strictMetadataEmit": true
  }
}
````

Puedes llegar a este paso con el repo utilizando.

````
git checkout step4
````

Ahora pasamos a crear la configuracion de rollup. El archivo se debe llamar ````rollup.config.js````

Los modulos en Angular son entregados utilizando el formato UMD, el archivo despues de un poco de trabajo queda asi:

````
export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/compoplace.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.compoplace',
  globals: {
    '@angular/core': 'ng.core'
  }
}
````

Puedes llegar a este paso con el repo utilizando.

````
git checkout step5
````

 

## Construyendo el modulo.

Ya tenemos todo lo basico para poder crear nuestro paquete. para esto voy a crear las instrucciones dentro del package.json de manera que solo sea correr ````npm run````y el comando

````
{
  "scripts": {
    "transpile": "ngc",
    "package": "rollup -c",
    "minify": "uglifyjs dist/bundles/compoplace.umd.js --screw-ie8 --compress --mangle --comments --output dist/bundles/compoplace.umd.min.js",
    "build": "npm run transpile && npm run package && npm run minify"
  }
}

````

Puedes llegar a este paso con el repo utilizando.

````
git checkout step6
````

ahora ejecutamos 

````
$npm run build
````

posiblemente puedes tener unos problemas de dependencias con ````npm install```` puedes solucionar esto. 

## Publicando a NPM.

Una vez ejecutemos ````buid```` este comando nos va a generar una carpeta /dist donde debemos crear un archivo package.json con la informacion del paquete. En mi caso.

````
{
    "name": "angular-compoplace",
    "version": "1.0.5",
    "description": "An amazing module for Angular.",
    "main": "bundles/compoplace.umd.js",
    "module": "index.js",
    "typings": "index.d.ts",
    "keywords": [
      "angular",
      "angular2",
      "angular 2",
      "angular4"
    ],
    "author": "Carlos Rojas",
    "license": "MIT",
    "repository": {
      "type": "git",
      "url": "https://github.com/ion-book/demo119"
    },
    "homepage": "https://www.ion-book.com",
    "bugs": {
      "url": "https://github.com/ion-book/demo119/issues"
    },
    "peerDependencies": {
      "@angular/core": "^2.4.0 || ^4.0.0"
    }
  }
````

Listo parece estar todo correcto. Entonces, simplemente me ubico dentro de la carpeta /dist y ejecuto.

````
npm publish
````

Puedes llegar a este paso con el repo utilizando.

````
git checkout step9
````

Si no tienes una cuenta deberas crearla y ejecutar de nuevo el comando. Una vez este listo lo podras ver desde el directorio.

En mi caso este es el link a este componente. 

[https://www.npmjs.com/package/angular-compoplace](https://www.npmjs.com/package/angular-compoplace)


