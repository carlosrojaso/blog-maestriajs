---
layout: post
title: "Clase 1 - Creando una app en Nativescript"
keywords: "nativescript"
date: 2017-11-20
tags: [nativescript]
categories: nativescript
author: jorgecano
editname: "nativescript/2017-11-20-clase1-nativescript.md"
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-20-clase1-nativescript%2FCopia%20de%20E2E%20Testing%20con%20IONIC.png?alt=media&token=98b7e252-afec-4974-97c7-bf2cd20ecd48"
versions:
  - title: 'tns'
    number: '3.3.0'
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-20-clase1-nativescript%2FCopia%20de%20E2E%20Testing%20con%20IONIC.png?alt=media&token=98b7e252-afec-4974-97c7-bf2cd20ecd48"></amp-img>

{% include general/net-promoter-score.html %} 

!Hola! y bienvenido a esta serie de lecciones que te enseñaran como hacer una app en Nativescript.

Primero que todo quiero hacer una distincion entre Ionic y Nativescript.

Si conoces Ionic sabes que utilizando Angular puedes realizar Apps que puedes enviar Google Play Store y el App Store; y cuando tus usuarios las descargan se asemejan mucho a las Apps Nativas que podrias hacer con una tecnologia como Android o Swift. Esto se logra gracias a algo que se llama cordova, el cual toma esa Webapp (Html, CSS, JS) que realizas con Ionic y la incrustra en un pequeño modulo de los SDK's que se llama Webview, de esta manera puedes generar un archivo que puedes enviar a las Tiendas.

Nativescript por otro lado utiliza los [Javascript VM](https://en.wikipedia.org/wiki/JavaScript_engine) para poder acceder al SDK's nativo de Android y IOS y no solo el Webview y por lo tanto tu App va a tener mayores capacidades sobre todo en el tema de rendimiento.

Ok. Habiendo dicho esto vamos a enfocar esta serie en Nativescript.

## Instalando Nativescript

### Instalando Node

El CLI de Nativescript esta instalado sobre Node , Asi que vas a necesitar [ Descargar e instalar una versión reciente de Node desde acá ](https://nodejs.org/).

Una vez tienes Node.js instalado, tu podrás ser capaz de acceder al administrador de paquetes de node o npm a traves del comando.

```
npm install -g nativescript
```

*Quizas puedas necesitar `sudo` para instalar globalmente*

Una vez que seguimos las instrucciones (no las pongo acá porque depende del sistema operativo ), podemos utilizar esta herramienta que te ayudara a tener todo listo para desplegar a Android e IOS:

````
tns doctor
````


### Creando tu primera App en Nativescript.

Ok, ahora necesitamos escribir este comando:

```
tns create HelloWorld --template nativescript-template-ng-tutorial
```

Ok, ahora si todo sale bien, tu puedes ver en la ubicacion de tu directorio una nueva carpeta llamada *"HelloWorld"* y en tu terminal CLI. Algo como esto:

```

Adding 'es6' lib to tsconfig.json...
Adding 'dom' lib to tsconfig.json...
Adding 'es2015.iterable' lib to tsconfig.json...
Adding tns-core-modules path mappings lib to tsconfig.json...
Project already targets TypeScript ~2.4.2
added 15 packages in 6.044s
Project HelloWorld was successfully created.

```

Ahora nos vamos a ubicar en la carpeta del proyecto.

```
cd HelloWorld
```

Desde ahora, siempre que ejecutemos algo en el CLI va a ser desde esta ubicación.

Ahora, vamos a ejecutar nuestra nueva App. Ejecute en la terminal.

```
tns run android
```

vas a ver algo como esto en tu emulador o dispositivo Android:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-20-clase1-nativescript%2FCaptura%20de%20pantalla%202017-11-20%20a%20la(s)%2011.30.56%20a.m..png?alt=media&token=8c17b1bb-f4e0-4095-b425-96113d7626e2"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    
  </div>
</div>

Si ves algo asi en tu pantalla estas muy bien :)

{% include blog/subscribe.html %}

!Perfecto! ahora, nosotros estamos casi listo.

Adicionalmente, vas a necesitar de un editor. Tu puede encontrar [buenas opciones aquí](https://angular.io/resources).

Yo estoy usando Visual Studio Code.

Cool, ¿Qué sigue?

Vamos a crear una app que va a tener estas características:

* Vas a leer noticias desde un Feed (RSS).
* Puedes registrar usuarios.
* Puedes autenticar usuarios.
* Puedes resetear la constraseña.

Listo eso es todo por ahora. pero mientras tanto puedes leer los siguientes enlaces :)

* [What are RSS feeds?](https://www.lifewire.com/rss-101-3482781)

Hasta la proxima clase :)