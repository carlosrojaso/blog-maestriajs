---
layout: post
title: "Nativo en la Web y en Movíl con Angular."
keywords: "nativescript, architecture"
date: 2018-11-26
tags: [nativescript, architecture]
categories: nativescript
author: carlosrojas
editname: "nativescript/2018-11-25-nativescript-angular.md"
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-25-nativescript-angular%2Fcover.png?alt=media&token=0150b34a-a4dd-45f3-86d8-dec030acbca3"
versions:
  - title: 'Angular CLI'
    number: '7.0.3'
  - title: 'tns'
    number: '5.0.1'
---

> En los proyectos actuales es muy comun tener que soportar una Web responsiva y tener que estar presente en IOS y en Android. Que tal si te dijera que con Angular puedes lograr esto con el mismo proyecto ?

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-25-nativescript-angular%2Fcover.png?alt=media&token=0150b34a-a4dd-45f3-86d8-dec030acbca3" alt="Nativescript"></amp-img>

{% include general/net-promoter-score.html %}

A partir de `Angular 6` la plataforma ha abierto un mundo de posibilidades con `Schematics` y es gracias a esto que ahora nuestros proyectos de Angular van a poder integrar `Nativescript` sin necesidad de que tengamos que hacer muchas cosas manualmente para integrarlos en el mismo proyecto. Lo que buscamos es lo siguiente:

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-25-nativescript-angular%2F1.png?alt=media&token=bf58aebe-7544-491d-9aa9-8df747a41d5c" alt="Architecture"></amp-img>

Para los que no sepan que es `Nativescript` te lo puedo resumir en:

> Nativescript es un Framework de codigo abierto el cual desde su comienzo siempre ha tenido buena integración con `Angular` y a diferencia de `Ionic` te permite acceder al SDK Nativo de IOS y Android y no solo al `WebView`.

## Podemos tener un proyecto que funcione compartido al 100% en Nativescript y Angular ?

Respuesta corta. No.

Esto se debe a la naturaleza de Nativescript el cual maneja las vistas como `XML` debido a que estas son traducidas a vistas nativas de `IOS` o `Android`. Por lo tanto no podremos reutilizar el 100% debido a que los componentes en Angular son generados utilizando  `Html`.

## Que cosas podemos reutilizar ?

Principalmente:
- `Routes` para la navegación.
- `Services` para la logica común del negocio.
- `Defición de la clase para el componente` para el comportamiento común de cada componente.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-25-nativescript-angular%2F2.png?alt=media&token=4aa04519-5f02-4076-a383-abb32f2061bd" alt=""></amp-img>

{% include blog/subscribe.html %}

## Como comenzamos? 

Lo primero es instalar `Nativescript` y asegurarnos que este funcionando correctamente.

````
$npm install -g nativescript
````

Luego nos aseguramos que `Xcode` y el `Android SDK` esten funcionando.

````
$tns doctor.
````

Ya despues de que el `doctor` nos diga que todo nuestro entorno esta bien, viene la integración.

Ahora tendremos que instalar los `schematics` a nivel global en nuestra maquina.

````
$npm install --global @nativescript/schematics
````

y luego 

````
$ng new --collection=@nativescript/schematics --name=demo135 --shared
````

Con esto ya tendremos nuestro proyecto con las cosas necesarias incluidas. Ahora debemos entender un par de cosas más para empezar a crear nuestras Apps.

## El Build.

Cuando necesitas probar o distribuir tu codigo realizas un proceso el cual convierte todos tus archivos en archivos que reconoce el navegador, esto en Angular pasa cuando `Webpack` convierte nuestros archivos y nos genera un `build` en terminos generales ahora necesitamos hacer algo como esto.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-25-nativescript-angular%2F3.png?alt=media&token=a0123bed-ceea-4b79-88e7-6c36980ff60a" alt=""></amp-img>

Ahora para trabajar los builds ejecutarems.

**Web**

````
$ng build
````

**Mobile**

````
$tns run ios --bundle
````

o

````
$tns run android --bundle
````

## Organización del codigo.

Ahora que vamos a tener dos tipos de proyectos mezclados debemos realizar una organización de codigo para que nuestro sistema de `build` lo identifique correctamente. Para esto simplemente vamos a utilizar `.tns` para señalar que esa pieza de codigo es de Nativescript, algo asi.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-25-nativescript-angular%2F3.png?alt=media&token=a0123bed-ceea-4b79-88e7-6c36980ff60a" alt=""></amp-img>

Los archivos de Nativescript son manejados por Webpack entonces los componentes pueden permanecer como siempre. Adicionalmente si quieres separar las vistas moviles simplemente cambia `.tns` por `.ios` y `.android`.

Lo mismo debes tener en cuenta para los `Modulos` por que en algunas ocasiones cosas que se hacen en la Web se hacen distinto en el Movil y debemos cargar modulos distintos.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-25-nativescript-angular%2F5.png?alt=media&token=8e8e5f7a-5020-4db8-b83d-42b8b1f84c17" alt=""></amp-img>

Si quieres ver un poco de esto en acción puedes darle una vistazo al proyecto que el equipo de Nativescript a preparado como [Ejemplo](https://github.com/sebawita/pet-bros-lite).

Esto es todo. Hasta un proximo Post :)