---
layout: post
title: "Compilar y subir una PWA hecha con Ionic a Firebase hosting"
date: 2018-01-17
tags: [pwa, firebase, ionic, hosting]
categories: ionic2
author: williambastidas
cover: "https://cdn-images-1.medium.com/max/800/1*V6jcSQfm3ZYgeV5Ys8qRmA.png"
remember: true
editname: "ionic2/2018--08-01-pwa-ionic-firebase-hosting.md"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.19.0'
---

> En este artículo veremos cómo alojar una **PWA** hecha con Ionic usando Firebase Hosting. **No** vamos a desarrollar una PWA en sí, solo seguiremos los pasos genéricos suponiendo que ya tenemos una PWA lista para cargar. 

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*V6jcSQfm3ZYgeV5Ys8qRmA.png" alt="Ionic PWA firebse hosting"></amp-img>

{% include general/net-promoter-score.html %} 

### 1.Compilar el proyecto para producción

Tal como existen las plataformas **“ios”** y **“android”** a través de cordova para compilar el proyecto usando la línea de comando, tenemos también una plataforma **“browser”** que quizá muchos hemos utilizado o estemos utilizando actualmente, sin embargo, no es una práctica recomendada por [Justin Willis](https://github.com/jgw96) del equipo Ionic, ya que la plataforma browser fue contruida originalmente como un experimento y causa todo tipo de problemas al tratar de usarla como una plataforma de producción. [Ver más](https://github.com/jgw96).

El comando que realmente necesitamos para compilar una PWA para producción es el siguiente:

```
npm run ionic:build --prod
```
Donde `-- prod` es opcional si aún estamos probando la aplicación en desarrollo.

Esto hará el build de nuestra aplicación en la carpeta `www`, ( lo mismo sucede cuando utilizamos ionic serve).

Ahora todo lo que tenemos que hacer es alojar los contenidos de ese directorio `www` en algún lugar de Internet.

### 2.Alojamiento de Firebase

En este ejemplo, vamos a usar el Hosting de Firebase. No es necesario hacer un complicado proceso de implementación, con un solo comando podemos cargar la última versión de la aplicación y el plan gratis ofrece 1 GB de almacenamiento y 10 GB de transferencia. Incluso obtenemos un certificado SSL gratuito y podemos registrar un nombre de dominio personalizado.
Es importante tener en cuenta que no necesitamos usar otros servicios de Firebase para usar Firebase Hosting.

### 3.Crear un proyecto en Firebase Hosting

Si no tenemos una cuenta en Firebase podemos crearla [aquí](https://firebase.google.com/pricing/).

Si ya estamos registrados, nos dirigirmos directamente a 
[console.firebase.google.com](console.firebase.google.com).

Desde aquí, crearemos un proyecto o usaremos un proyecto existente:

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*nJhfOiDHExKKxX0nnEF8Fg.png"></amp-img>

Una vez hecho esto, entramos al panel de control de Firebase, donde podremos acceder a todo lo relacionado con el proyecto (Analytics, Authentication, Database, Storage, Hostin, etc).

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*ixt7Ox988rDWz93WsUQvcg.png"></amp-img>

En este caso solo necesitamos el hosting, por lo que debemos hacer clic en el botón comenzar de la tarjeta **Hosting** y deberíamos ver una pantalla como esta:

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*Z5WaYjl5K9NbkuuXS45G5Q.png"></amp-img>

Hacemos clic en **Comenzar** y nos indicará cómo configurar el proyecto.

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*nX5TOWUE4Bz9SDMeSbLDtw.png"></amp-img>


### 4.Ir a la consola

Si aún no lo hemos hecho, debemos instalar el paquetefirebase-tools globalmente:

```
npm install -g firebase-tools
```

La bandera `-g` significa que se instalará globalmente en tu computadora y no solo en el proyecto actual. Esto lo hacemos solo una vez y no necesitamos volver a instalarlo para futuros proyectos.

Debemos iniciar sesión en las herramientas de Firebase:

```
firebase login
```

y luego desde la raíz del proyecto Ionic (la carpeta www), ejecutar el siguiente comando:

```
firebase init
```
A continuación, la consola nos mostrara lo siguiente:

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*RYS8F4gjznCjX1wmE33aQw.png"></amp-img>

Con la flecha hacia abajo navegamos a la opción **Hosting** , luego con la barra espaciadora la seleccionamos y finalmente presionar **ENTER** .

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*aVm_N6BSKjuYG8A-n2zg4A.png"></amp-img>

Esto nos mostrará una lista de proyectos de firebase con los que podemos asociar nuestro proyecto: seleccionamos el que recién creamos y luego presionamos **ENTER**.

Ahora necesitamos configurar el proyecto. Como la carpeta **www** contiene el código creado, esta es la carpeta que queremos configurar como directorio público (es decir, la carpeta que queremos cargar en el servidor de Firebase). El resto de nuestras respuestas debería verse así:

```
? What do you want to use as your public directory? www
```

```
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
```

```
? File www/index.html already exists. Overwrite? No
```

Una vez hecho esto, encontraremos dos archivos nuevos en nuestro proyecto: `firebase.json` y `.firebaserc`.

EL archivo `firebase.json` debería verse así:

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*ay4soZUJy5BiyzdawP8x6w.png"></amp-img>

y el archivo `.firebasesrc` solo define el proyecto al que está asociada esta aplicación. Ahora todo lo que necesitamos es ejecutar:

```
npm run ionic:build --prod
```

**IMPORTANTE**: debemos asegurarnos de ejecutar siempre este comando antes de implementar firebase hosting.

Finalmente:

```
firebase deploy
```

Una vez que ejecutemos el comando, obtendremos la **URL** que debemos usar para acceder a la **PWA** alojada en **Firebase**.

Hasta la proxima :)