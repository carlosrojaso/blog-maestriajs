---
layout: post
title: "Arquitectura de Apps escalables en Angular"
date: 2018-04-30
tags: [angular, architecture]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F600_448893342.jpeg?alt=media&token=0f8cc5aa-4670-4e0e-8323-21d6617abc7a"
editname: "angular/2018-04-30-arquitectura-apps-escalables.md"
---
> A medida que tu aplicacion va creciendo y vas creando más y más componentes cada vez es mas dificil saber quien cambia el estado de los datos. En esta ocasión quiero mostrar una arquitectura mantenible para Apps que superen los 100 componentes.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F600_448893342.jpeg?alt=media&token=0f8cc5aa-4670-4e0e-8323-21d6617abc7a"></amp-img> 

{% include general/net-promoter-score.html %} 

Para ilustrar este escenario consideremos lo siguiente:

<amp-img width="660" height="330" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F1.png?alt=media&token=a0860f28-94a0-48a2-90e5-f342f7829f7d"></amp-img> 

Tenemos una taberna la cual sirve a sus clientes basado en su `inventario`, esta taberna tiene también `personal` el cual se encarga de atender a los comensales cada dia.

<amp-img width="695" height="389" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F2.png?alt=media&token=c9649c35-723f-4409-8a94-cd786be0208e"></amp-img> 

Para mantener el ejemplo simple vamos a enfocarnos en una simple parte del sistema la cual es la interacción entre el `personal` y el `inventario` y a partir de esto diseñar algo que pueda ser aplicado al resto del sistema.

## Personal

Empecemos por analizar el personal. El personal que atiende la taberna esta divido en 2 roles principales:

Un `administrador` el cual es quien esta pendiente del `inventario`y se lo comunica al resto del `staff` igualmente si se esta agotando lo comunica a los `proveedores`.

<amp-img width="642" height="281" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F3.png?alt=media&token=44c4502e-1fd6-4fb0-ba61-cf2a11e68674"></amp-img> 

Adicionalmente, en nuestro personal tenemos otros roles los cuales son los `meseros` y el resto del `staff` que no interactuan directamente con el `inventario` sino que lo hacen a través del `administrador`.

<amp-img width="652" height="330" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F4.png?alt=media&token=9cdd975b-d07c-4ca9-a5fb-4bdb26e38e1e"></amp-img>

y en perspectiva podriamos ver algo asi.

<amp-img width="585" height="285" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F5.png?alt=media&token=8fb1bb08-8400-4a1c-b4f5-02ab21bd97c0"></amp-img>

{% include blog/subscribe.html %}

## Inventario

En cuanto al `inventario` podemos identificar varios procesos los cuales debemos tener en cuenta:

- Administrador inicia un pedido.
- Alerta a los proveedores del pedido.
- Proveedores confirman recibido.
- Proveedores llenan la orden de existencia.
- Proveedores envían nueva existencia.
- El administrador es notificado cuando llega el pedido.

y en perspectiva tendriamos algo como esto.

<amp-img width="554" height="347" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F6.png?alt=media&token=ac0438d3-8c35-44f8-ac07-245c03656107"></amp-img>

## Escalabilidad

Nuestro sistema debe estar diseñado para escalar, es decir ahora basicamente es un solo restaurante.

<amp-img width="541" height="279" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F7.png?alt=media&token=f01de515-0bec-43df-ac27-c2bb4f2b72b2"></amp-img>

Pero se ha obtenido una inversión y se va a aumentar el numero de restaurantes dentro de la ciudad y posiblemente en el pais.

<amp-img width="517" height="253" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F8.png?alt=media&token=b05676d4-5955-47b3-810c-d2d7b531bf05"></amp-img>

Por eso debemos tener en mente.

- Modelo escalable con pasos claros.
- No sorpresas. Sin problemas en el proceso.
- Separación de responsabilidades es clave.
- Mantenible, Eficiente, Predictivo.
- Crecimiento sea fácil.
- Un proceso fácil de revision.

Ahora miremos algunos conceptos de Angular y como vamos a cambiar una pequeña parte de su arquitectura para darle paso a un State Management mas escalable REDUX.

<amp-img width="652" height="365" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F9.png?alt=media&token=7dbfe2ab-2dad-4837-8fac-79d04a5eea88"></amp-img>

Aca podemos observar 3 grandes bloques en la Arquitectura de Apps construidas con Angular. Los `modulos` que es la manera en que agrupamos caracteristicas de nuestras aplicaciones (Dashboard, Usuarios, Reportes, etc). Los `componentes` que son los ladrillos que combinamos en nuestra App. y  un tercero que normalmente no tenemos en cuenta por que Angular se encarga de esto por nosotros, el `state management`. Lo importante en notar aca es que en los `componentes` estamos manejando dos clases `presentational` y `container` los cuales nos van a ayudar a mantener una fuente global de todo.

y con esto en mente podemos decir que podemos convertir...

<amp-img width="646" height="323" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F10.png?alt=media&token=7fcafd8d-0674-4f38-a1aa-5aca57f26c8c"></amp-img>

en esto.

<amp-img width="642" height="352" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-30-arquitectura-apps-escalables%2F11.png?alt=media&token=b62a8b1c-d3fd-4fc2-a7de-521ec7a24f40"></amp-img>

Recuerda que si quieres aprender más sobre esto debes empezar a aprender sobre [NgRX](https://github.com/ngrx/)

Espero este Post sea de utilidad :)