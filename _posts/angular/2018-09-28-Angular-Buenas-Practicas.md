---
layout: post
title: "Buenas prácticas en Angular"
keywords: "guidelines"
date: 2018-09-28
tags: [architecture]
categories: angular
author: tatianaMolina
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2Fcover.png?alt=media&token=ddce5bf1-b0ff-4064-baa8-9a05fc158fbd"
versions:
  - title: 'Angular CLI'
    number: '6.1.1'
---

> Esta es una introducción básica a buenas prácticas en Angular. Hablaré principalmente de la mejor forma de estructurar y organizar tu proyecto. Lo que explicaré a continuación está basado en feedback y tips que he recibido de compañeros de trabajo, artículos y conferencias. No quiere decir que sea una guía absoluta. Cada quien tiene su mejor forma de trabajar 😊

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2Fcover.png?alt=media&token=ddce5bf1-b0ff-4064-baa8-9a05fc158fbd"></amp-img>

{% include general/net-promoter-score.html %}

<!--summary-->

Usualmente la estructura de archivos que tengas en tu proyecto influirá en tus tiempos de desarrollo. ¿Cuanto tiempo te toma encontrar un archivo? Si la respuesta es “mas de 5 segundos”, estamos mal. Existe un principio llamado LIFT:

- Locating our code easy.
- Identify code at a glance.
- Flat structure as long as we can.
- Try to stay dry (don’t repeat yourself).

LIFT nos ayuda a encontrar y entender nuestro código y archivos de forma rápida. Si sientes que te toma mucho tiempo empezar a trabajar una vez abierto tu editor, quizás la forma en la que estructuras tu proyecto no es la indicada. Pero como podemos saber cual es la mejor estructura para nuestros proyectos?

# Estructura de archivos

Angular CLI nos provee una forma de crear un nuevo proyecto con una estructura bastante cómoda y práctica:

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <amp-img width="290" height="585" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F1.png?alt=media&token=b4ae9ff5-5ac2-442a-9dcf-6570569b7328"></amp-img>
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>

Generalmente defino mi estructura de acuerdo a la complejidad del proyecto. Entre más grande sea, mas orden requiere. Este es un ejemplo de un proyecto en el cual separé mis componentes. El folder Auth representa todos los componentes relacionados con el login y registro de un sitio. A la misma altura crearé los demás componentes. Así mismo, tengo un folder Shared, que contiene archivos que usaré de forma global, como lo son mis services, models, helpers, footer, header, y demás componentes que puedas requerir.

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <amp-img width="311" height="570" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F2.png?alt=media&token=bc779374-4160-43dd-bab5-a98b2ab88a76"></amp-img>
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>

El nivel de complejidad de la aplicación va a requerir mejor organización. Tener una estructura bien definida nos ayudará a pensar en escalabilidad.

# Nombres Claros

Uno de los mayores problemas a la hora de entender el código, suele ser el nombre que le damos a nuestros métodos, variables o parámetros.

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <amp-img width="268" height="111" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F3.png?alt=media&token=19ffedfc-89a5-479e-88b0-3607225023f4"></amp-img>
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>

Si nos fijamos en el ejemplo anterior podemos ver lo difícil que es entender el objetivo de este método. En cambio si hacemos algo como lo siguiente, se entenderá claramente la función del código:

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <amp-img width="332" height="101" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F4.png?alt=media&token=bbf54352-a094-44c6-a426-dc5e98ddaaad"></amp-img>
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>

{% include blog/subscribe.html %}

# Regla de los 5 segundos

<amp-img width="590" height="432" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F5.png?alt=media&token=afdbfe3c-96c3-4322-b70e-05701c5d9fde"></amp-img>

Existe una “regla” que dice que si por error cae comida al suelo tienes hasta 5 segundos para levantarla sin que haya contaminación cruzada. No sé que tan científicamente comprobado esté esto, pero podemos aplicar la regla de los 5 segundos a nuestro código. Si nos toma más de 5 segundos entender un bloque de código, es mejor considerar refactorizar.

Lo sé, es muy poco tiempo, estoy hablando figurativamente 😜 La idea es que el código se entienda en el menor tiempo posible. Eso lo puedes lograr creando diferentes funciones pequeñas y haciendo composición en funciones más complejas. En caso de que tu código falle, será mas fácil encontrar el error y corregirlo sin afectar otras funciones.

# Organiza tu código

Algunas formas de tener un archivo de código mas organizado y legible son:

- Lo más importante debe ir arriba.
- Primero propiedades, después métodos.
- Un Item para un archivo: cada archivo debería contener solamente un componente, al igual que los servicios.
- Solo una responsabilidad: Cada clase o modulo debería tener solamente una responsabilidad.
- El nombre correcto: las propiedades y métodos deberían usar el sistema de camel case (ej: getUserByName), al contrario, las clases - (componentes, servicios, etc) deben usar upper camel case (ej: UserComponent).
- Los componentes y servicios deben tener su respectivo sufijo: UserComponent, UserService.
- Imports: los archivos externos van primero.

# Provee claridad

Cuando estés escribiendo, piensa que probablemente alguien más tendrá que leer tu código en algún momento. Todos hemos sufrido a la hora de leer código ajeno. Es por eso que lo ideal cuando escribimos es pensar en la persona que lo leerá, o incluso en ti mismo. No has llegado a algún trozo de código que tu mismo escribiste pero ni a palos entiendes?

<amp-img width="720" height="306" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F6.gif?alt=media&token=4e19df4c-0530-4d3d-995a-a759f4425d0e"></amp-img>

Código auto-descriptivo:

- Explica en tu mismo código, no en comentarios.
- Tus comentarios deben ser claros y entendibles.
- Evita comentar si: 
  1. tratas de explicar que hace tu código, deja que este sea tan claro que se explique solo. 
  2. tienes funciones y métodos bien nombrados. No te llenes de obviedades.
- Comenta cuando: 
  1. trates de explicar por qué hiciste lo que hiciste. 
  2. trates de explicar consecuencias de lo que escribiste. 
  3. en API docs.

# Componentes

En Angular, lo más importante debe ir al inicio. En nuestros componentes generalmente escribimos nuestras propiedades primero y después nuestros métodos. Así mismo, a veces agrupamos nuestras propiedades o funciones alfabéticamente y otras veces por funcionalidad. Lo importante aquí es mantener una consistencia durante todo el proyecto. Además:

Es importante tratar de escribir código lo mas compacto posible. Cada quien tiene una forma distinta de escribir y estructurar sus funciones. A mi gusto, un método no debería tener más de 20 lineas de código, entre más código junto tengas más difícil será entenderlo. Es por esto que utilizamos funciones que nos permitan hacer composición.

Queremos que nuestros componentes sean lo más simples posibles. En este contexto, delega la mayor parte de tu lógica a tus servicios.

Se consistente con tus funciones, y por favor no escribas cosas fuera de lugar!!! Nombrar tu función como “quieroPanConPalta” y cometer faltas ortográficas es una falta de respeto.

<amp-img width="480" height="270" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F7.gif?alt=media&token=5477063c-7f7d-414b-819c-a899bf147603"></amp-img>

# Servicios

Algunas de las mejores prácticas a la hora de crear servicios son:

- Crea tus servicios como Injectables
- Utiliza tus servicios para recolectar tu data: es total responsabilidad de tus servicios recolectar la data necesaria, ya sea desde una API, localstorage o alguna estructura que hayamos creado nosotros mismos para poder desarrollar. Tus componentes nunca deben encargarse de pensar como traer data, estos solo deberían encargarse de llamar al servicio que contiene todo lo necesario. Así que por favor, no llames tus API’s en tus componentes!!

Para mejorar el funcionamiento de tus aplicaciones te recomiendo seguir guías de mejores prácticas que se ajusten a tu metodología de trabajo, utilizar compilación AoT (Ahead of Time), agregar lazy loading a tu proyecto, fijarte en el tamaño de tus boundle y de ser posible hacer mejoras utilizando Audits y Lightouse. Pensar con buenas prácticas en el presente te ahorrarán tiempo y dolores de cabeza en el futuro.

---

Algunos artículos y vídeos que quizás te ayuden:

[Ready for Readable Code?](https://www.youtube.com/watch?v=56mETnrByBM) — John Papa

[6 Best Practices & Pro Tips when using Angular CLI](https://medium.com/@tomastrajan/6-best-practices-pro-tips-for-angular-cli-better-developer-experience-7b328bc9db81) — Tomas Trajan

[Lazy Loading Modules](https://angular.io/guide/lazy-loading-ngmodules)

[The Ahead of Time Compiler](https://angular.io/guide/aot-compiler)
