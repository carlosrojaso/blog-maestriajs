---
layout: post
title: "Crunchbase - La base de datos de Empresas."
date: 2018-04-06
categories: hechoen
tags: [build]
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-06-crunchbase%2FHechoEnAngular.png?alt=media&token=43192945-4362-4ea6-b32e-ba4caf82f31e"
---
> En esta oportunidad traemos a [Las Más Leídas](https://lasmasleidas.com/home) una plataforma de noticias donde puedes estar actualizado sobre el acontecer Mundial y en Argentina.

<amp-img width="1024" height="376" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-06-crunchbase%2FHechoEnAngular.png?alt=media&token=43192945-4362-4ea6-b32e-ba4caf82f31e"></amp-img>


## ¿Qué es Las Más Leídas?

Es una WebApp, un portal de noticias que reúne las más leídas por países, provincias y localidades en distintas categorías. Inicialmente centrado en Argentina y sus 23 provincias.


## Como es la App ?

Es una WebApp desarrollada en Ionic:

- El usuario puede ingresar como visitante o a través de Facebook.

- Puede indicar su provincia a través del uso del GPS o seleccionandola manualmente.

- Puede configurar la cantidad de notificaciones que desea recibir por día, los horarios en los que no desea recibir ninguna, u optar por deshabilitarlo completamente.

- En el inicio verá las más leídas de su provincia, país, internacionales y otras categorías. Además de contar con un widget del clima, criptodivisas, etc.

- A través de las pestañas puede ir viendo las últimas noticias por categorías.

- Puede guardar un artículo para leerlo más tarde, dejar un comentario y emitir su opinión a través de reacciones: Me gusta, Me divierte, Me entristece y Me enoja.

En cuanto al backend, está desarrollado en Laravel, que se encarga de recoger las noticias más leídas por categorías, enviar notificaciones a través de OneSignal, publicarlas en las distintas páginas de Facebook y manejar los comentarios y reacciones de cada artículo en tiempo real a través de socket.io.

{% include blog/subscribe.html %}

## UI

<amp-img width="603" height="341" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-03-09-lasmasleidas%2FCaptura%20de%20pantalla%202018-03-09%20a%20la(s)%206.36.47%20a.%20m..png?alt=media&token=cf7adef7-db5d-498c-b57c-043a410e033a"></amp-img>

### Componentes personalizados:

Refresher: Para darle un aspecto similar al que uno acostumbra a ver en Android:

<div class="row wrap">
  <div class="col col-md-33 col-lg-33">
  </div>
  <div class="col col-md-34 col-lg-34">
    <amp-img width="364" height="529"  layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-03-09-lasmasleidas%2FCaptura%20de%20pantalla%202018-03-09%20a%20la(s)%206.40.57%20a.%20m..png?alt=media&token=80c9854e-cc1f-4ac7-901e-06123142c567" alt=""></amp-img>
  </div>
  <div class="col col-md-33 col-lg-33">
  </div>
</div>

Sticky: A través de una directiva es posible fijar elementos al hacer scroll para que queden siempre visible. Por ejemplo, la barra lateral derecha en pantallas grandes.

Hiddeable: A través de una directiva es posible mostrar/ocultar elementos al hacer scroll. Por ejemplo, en pantallas chicas, la barra superior se oculta cuando se realiza scroll hacia abajo y se muestra al hacer scroll hacia arriba. También se muestra cuando se ha llegado al final de la página.

Ghost Loading: Basado en el post de [Giovanni Camana](https://blog.ng-classroom.com/blog/ionic2/ghost-loading/) ¡Gracias!, aunque en forma de componente, no de directiva.

{% include blog/subscribe.html %}

Sistema de layout: En vez de utilizar el sistema de layout por defecto, se utilizó uno basado en el de [Covalent](https://teradata.github.io/covalent/) el cual a su vez está inspirado en el de [AngularJS Material](https://material.angularjs.org/latest/layout/introduction). Aunque pronto será actualizado a [flex-layout](https://github.com/angular/flex-layout), el cual provee una sintaxis similar aunque con una mejora en performance y una gran comunidad por detrás.

En cuanto al manejo de los diferentes componentes dependiendo del tamaño de la pantalla del dispositivo en el cual se está visualizando, se utilizó un servicio “MediaService” basado en el de Covalent, el cual implementa observables que son activados al cambiar el tamaño de la pantalla.

## Usuarios.

Actualmente en Play Store cuenta con unos 50 usuarios, al igual que en App Store, habiendo sido publicada el 16 de febrero. Aunque entendemos que nuestro mayor nicho será en el navegador web, donde contamos con 200 visitas diarias. Además contamos con diferentes páginas de Facebook, una para cada provincia de Argentina: Salta, Jujuy y Tucumán, y una general, reuniendo entre todas más de 2500 me gusta.

Bueno, ya tienes una nueva razón para preferir Ionic en tu proximo proyecto. ¿Qué tal te ha parecido esta Web App? No olvides comentar.



