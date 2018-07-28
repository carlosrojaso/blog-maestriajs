---
layout: post
title: "Micro Frontends."
keywords: "Tips"
date: 2018-07-03
tags: [tips, architecture]
categories: tips
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-07-02-micro-frontends%2Fmicrofrontends.png?alt=media&token=98e2937a-a65c-4ee4-87ed-9d43a8bb0cab"
---

> Cuando estas trabajando en Apps de escala mediana a larga con un equipo grande y especializado, existe el problema de que un Frontend Monolitico termina siendo un problema para el desempeño y administración del producto final, es en este caso que buscamos algo como la arquitectura de "Micro Frontends".

<!--summary-->

<amp-img width="1280" height="720" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-07-02-micro-frontends%2Fmicrofrontends.png?alt=media&token=98e2937a-a65c-4ee4-87ed-9d43a8bb0cab"></amp-img>

{% include general/net-promoter-score.html %} 

## Intro.	

En la mayoria de los casos en los proyectos de mediana escala se suele utilizar una arquitectura especializada donde tenemos un equipo de Frontend, uno de Backend y en algunos casos un equipo de Devops, todos los cuales se han convertido en areas bien amplias y por lo tanto necesitan mas personas especializadas.

<amp-img width="960" height="540" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-07-02-micro-frontends%2Foverall.png?alt=media&token=5ea0d679-db41-4280-8acc-d9b4ce264882"></amp-img>

Fuente:[http://j.mp/2Njfnla](http://j.mp/2Njfnla)

Esto causa que en un proyecto obtengasmos algo asi como las figuras que vamos viendo arriba, al inicio todos empezamos desarrollando como "Fullstack" pero luego vamos logrando arquitecturas mas adecuadas como es la de "Microservicios", en esta el Backend divide los servicios por responsabilidad y se logra una gran modularidad y hace que el avance del desarrollo funcione con tiempos independientes. 

Este mismo concepto se ha visto como una gran opción para el Frontend, donde cuando la App crece bastante tenemos el problema de no poder manejar tiempos de desarrollo y despliegues independientes, lo que ocasiona que el equipo de Frontend encuentre varios "Cuellos de botella" en su dia a dia. Es por esto que se habla de "Micro Frontends" donde se utiliza el mismo principio de separar el Frontend por responsabilidades como los Microservicios y podriamos tener proyectos separados en el Frontend. Siendo algo parecido a la imagén de abajo.

<amp-img width="960" height="540" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-07-02-micro-frontends%2Farchitecture.png?alt=media&token=d666c59a-e5d1-4466-aefd-8827d0f379ba"></amp-img>

Fuente:[http://j.mp/2Njfnla](http://j.mp/2Njfnla)

Y aún mejor podriamos permitir que cada proyecto manejara su propio framework, lo cual haria que nuestro equipo pudiese trabajar con el que le parezca más comodo para lograr la mejor calidad.

<amp-img width="960" height="540" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-07-02-micro-frontends%2FatGlance.png?alt=media&token=3fba769d-09f7-43d5-a343-246ed0501e7d"></amp-img>

Fuente:[http://j.mp/2tP5ymJ](http://j.mp/2tP5ymJ)

## Apps grandes necesitan granularidad.

Pensemos ahora en una App grande. Desde Angular normalmente utilizamos un patrón modular donde cada modulo termina siendo una caracteristica representada en el router. 

`MyApp.com/`

`MyApp.com/settings`

`MyApp.com/manager`

`MyApp.com/dashboard`

Ahora pensemos que pasaria si `MyApp.com/settings` fuera una App en `AngularJs`, `MyApp.com/manager` fuera una App en `Angular`y `MyApp.com/dashboard` fuera una App trabajada con `Vanilla Javascript` para el usuario seria transparente sobre las tecnologias que estamos utilizando por debajo y cada persona en el Frontend podria tomar  una responsabilidad en nuestra App logrando asi unir una arquitectura por responsabilidades desde los `Microservicios` hacia los `Micro Frontends`.

## Los elementos.

- Código compartido. Aunque cada modulo o responsabilidad de nuestra App se maneja independientemente tenemos cosas compartidas para el correcto funcionamiento como es el tema del `routing` global o la autenticación.

- Pequeñas Apps como Módulos. Como dijimos anteriormente cada uno de los modulos de nuestra App sera una App ya sea `AngularJS`, `Angular`, etc.

- Un sistema de bundling que una todo. Como cada una de las pequeñas Apps tiene su propio mecanismo para trabajar buscaremos integrar una forma de orquestrar el producto final de cada uno de estos frameworks desde su producto final despues del build (Html, Css y JS) y a traves de algo como Webpack unirlo y usar caracteristicas como Lazy Loading.

## ¿ Quienes lo usan ?

Aunque pense que esta arquitectura era relativamente nueva, muchas Apps grandes ya la usan hace un buen tiempo. Entre las empresas que se encuentran estan `Spotify`, `Upwork` y `Hellofresh`.

## Tecnicas.

Aunque existén muchas maneras de integrar esta arquitectura voy a nombrar las que me gustaron mas.

- Single-SPA “meta framework” . Esta tecnica es una de las mas sencillas de utilizar basicamente se crea un solo proyecto conteniendo cada `pequeña App` dentro del mismo repositorio y con el `builder` generamos los `build` para producción de cada `modulo` y los unimos.

- IFrames using libraries and Window.postMessage APIs. Esta tecnica es excelente si ya tienes un proyecto iniciado y buscas unir varias pequeñas Apps en unidades independientes. Basicamente la idea es insertar cada `pequeña App` o `modulo` en un `iframe` y comunicar cosas como el `routing` o la `autenticación`a través del API de PostMessages.

- Web Components as the integration layer. Esta tecnica me gusta mucho ya que usa `Web Components` para modularizar todo, basicamente funciona muy parecido a la tecnica de `iframes` pero en lugar de usar un iframe para independizar la responsabilidad se utiliza un Web component es decir cada `pequeña App` debera ser convertida a un Web Component, es decir podriamos tener `<app-settings></app-setting>`, `<app-dashboard></app-dashboard>` y asi.


Espero este post sea de utilidad y mucha suerte :)








