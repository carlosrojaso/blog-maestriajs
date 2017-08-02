---
layout: post
title: "Pruebas unitarias: Configuración de entorno"
keywords: "unit test, pruebas unitartias, ionic, pruebas unitarias ionic, webpack"
date: 2017-07-31
tags: [testing, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo117"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-31-unit-test-config-ionic%2Fpruebas%20unitarias%20en%20ionic..jpg?alt=media&token=a069bdd7-160b-49fd-a0c6-91a72ffa45d9"
remember: true
versions:
  - title: 'ionic'
    number: '3.6.0'
  - title: 'ionic-native'
    number: '3.12.1'
  - title: 'ionic-app-scripts'
    number: '2.1.3'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.6.0'
---

> Vamos a escribir pruebas unitarias para aplicaciones en Ionic y para lograrlo debemos configurar y preparar un conjunto de herramientas en nuestro proyecto, en este artículo explicaremos como preparar este entorno fácilmente.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-31-unit-test-config-ionic%2Fpruebas%20unitarias%20en%20ionic..jpg?alt=media&token=a069bdd7-160b-49fd-a0c6-91a72ffa45d9"></amp-img>

{% include general/net-promoter-score.html %}

Recuerda nuestro artículo anterior sobre conceptos [Testing en Angular/Ionic](https://www.ion-book.com/blog/tips/testing-with-ionic/){:target="_blank"}.

Necesitaremos el siguiente conjunto de herramientas:

## Karma (Test Runner)

[https://karma-runner.github.io/](https://karma-runner.github.io/){:target="_blank"}

Karma es el encargado de correr todas las pruebas unitarias que escribamos y como resultado nos da un reporte que nos muestra las pruebas que pasaron y las pruebas que fallaron. En la mayoría de veces para ejecutar las pruebas unitarias lanza un navegador para correr las pruebas unitarias.

## Jasmine

[https://jasmine.github.io/](https://jasmine.github.io/){:target="_blank"}

Jasmine es un framework para escribir pruebas unitarias, nos facilita herramientas para poder escribir pruebas de forma controlada y tiene funciones para hacer verificaciones, hablaremos más sobre Jasmine en el proximo artículo.

## Angular Testing

Desde la versión de Angular 2 en adelante Angular provee un conjunto de herramientas para poder preparar las pruebas unitarias y de esta manera podemos escribir pruebas fácilmente para los artefactos de Angular / Ionic, como componentes, directivas, pipes, providers etc.


Cuando iniciamos un proyecto con Angular CLI al momento de crear el proyecto con `ng start nombre-proyecto`, nos entrega un proyecto ya preparado para ejecutar y escribir pruebas unitarias con Karma y Jasmine ya configurados para trabajar, pero en el caso de Ionic no es así, cuando iniciamos un proyecto con Ionic CLI, no tiene por defecto este ambiente configurado, por esta razón los vamos a explicar como configurar nuestro Karma + Jasmine en un proyecto con Ionic.

## Configurando Ionic + Karma + Jasmine

## Paso 1:

Instalar las herramientas necesarias en nuestro proyecto, debemos descargar como dependencias de desarrollo a Karma y Jasmine más un conjunto de utilidades para preparar el ambiente de testing en proyectos en Ionic. Para instalar todo esto solo ejecuta el siguiente comando completo en un terminal:

```
npm install karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter karma-mocha-reporter karma-sourcemap-loader karma-webpack null-loader jasmine ts-loader ts-node angular2-template-loader html-loader @types/jasmine @types/jasminewd2 --save-dev
```

Son bastantes nuevas dependencias que debemos instalar en nuestro proyecto pero la bandera `—save-dev`nos asegura que estas dependencias solo se usan en el momento de desarrollo y no como parte del proyecto en producción.

{% include blog/subscribe.html %}

## Paso 2:

Vamos a crear una carpeta nueva llamada `testing` donde tendremos la configuración de Karma y Webpack con Ionic, tendremos los siguientes tres archivos:

1. [testing/karma-test-shim.js](https://github.com/ion-book/demo117/blob/master/testing/karma-test-shim.js){:target="_blank"}
1. [testing/karma.conf.js](https://github.com/ion-book/demo117/blob/master/testing/karma.conf.js){:target="_blank"}
1. [testing/webpack.test.js](https://github.com/ion-book/demo117/blob/master/testing/webpack.test.js){:target="_blank"}

Como son archivos largos, ponemos el enlace directo a un repositorio para poder copiar y pegar.

## Paso 3:

Ahora vamos a agregar un script para correr las pruebas unitarias con un solo comando en la terminal para esto debemos modificar el archivo `package.json` y agregar un nuestro script llamado `test`.

```json
...
 "scripts": {
    "clean": "ionic-app-scripts clean",
    "build": "ionic-app-scripts build",
    "lint": "ionic-app-scripts lint",
    "ionic:build": "ionic-app-scripts build",
    "ionic:serve": "ionic-app-scripts serve",
    "test": "karma start ./testing/karma.conf.js"
},
...
```

Ahora con esta configuración podemos correr en nuestra terminal el comando:

```
npm test
```

Y nos arroja algo como esto:

<amp-img width="1279" height="532" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-31-unit-test-config-ionic%2FScreen%20Shot%202017-08-01%20at%209.08.10%20PM.png?alt=media&token=54531d68-acac-497e-9891-681778025d68"></amp-img>

Esto significa que todo nuestro ambiente esta bien configurado sin embargo aun no hemos escribo ninguna prueba unitaria, Karma identifica los archivos terminados en `*.spec.ts` para correr pruebas y por ahora no tenemos ningún archivo `*.spec.ts` no identifica ninguna prueba para correr.

Vamos a crear el siguiente archivo:

`src/test.spec.ts`

Con el siguiente contenido:


```ts
describe("test", ()=>{
  it("test for an sum", ()=>{
    expect(5+5).toEqual(10);
  });
});
```

Y si volvemos a ejectar `npm test`, veremos los siguiente:

<amp-img width="1278" height="602" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-31-unit-test-config-ionic%2FScreen%20Shot%202017-08-01%20at%209.14.55%20PM.png?alt=media&token=157204cb-a0d1-42e5-a59a-95131d24f1a1"></amp-img>

¡Genial! esta corriendo nuestra prueba, eso quiere decir que nuestro entorno quedo listo para trabajar.

¿Las sentencias `describe`, `it` y `expect` las viste antes?
estas sentencias hacen parte de Jasmine, del cual hablaremos a más detalle en nuestro proximo artículo.