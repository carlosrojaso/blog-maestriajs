---
layout: post
title: "Buenas prácticas en Angular"
keywords: "guidelines"
date: 2018-09-28
tags: [architecture]
categories: angular
author: tatianaMolina
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2Fcover.png?alt=media&token=ddce5bf1-b0ff-4064-baa8-9a05fc158fbd"
remember: true
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

<amp-img width="290" height="585" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F1.png?alt=media&token=b4ae9ff5-5ac2-442a-9dcf-6570569b7328"></amp-img>

Generalmente defino mi estructura de acuerdo a la complejidad del proyecto. Entre más grande sea, mas orden requiere. Este es un ejemplo de un proyecto en el cual separé mis componentes. El folder Auth representa todos los componentes relacionados con el login y registro de un sitio. A la misma altura crearé los demás componentes. Así mismo, tengo un folder Shared, que contiene archivos que usaré de forma global, como lo son mis services, models, helpers, footer, header, y demás componentes que puedas requerir.

<amp-img width="311" height="570" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F2.png?alt=media&token=bc779374-4160-43dd-bab5-a98b2ab88a76"></amp-img>

El nivel de complejidad de la aplicación va a requerir mejor organización. Tener una estructura bien definida nos ayudará a pensar en escalabilidad.

<amp-img width="268" height="111" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F3.png?alt=media&token=19ffedfc-89a5-479e-88b0-3607225023f4"></amp-img>

<amp-img width="332" height="101" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F4.png?alt=media&token=bbf54352-a094-44c6-a426-dc5e98ddaaad"></amp-img>

{% include blog/subscribe.html %}



<amp-img width="590" height="432" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F5.png?alt=media&token=afdbfe3c-96c3-4322-b70e-05701c5d9fde5"></amp-img>

<amp-img width="720" height="306" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F6.gif?alt=media&token=4e19df4c-0530-4d3d-995a-a759f4425d0e"></amp-img>

<amp-img width="480" height="270" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-28-Angular-Buenas-Practicas%2F7.gif?alt=media&token=5477063c-7f7d-414b-819c-a899bf147603"></amp-img>