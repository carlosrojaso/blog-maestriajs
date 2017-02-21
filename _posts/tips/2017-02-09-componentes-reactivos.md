---
layout: post
title: "Componentes Reactivos"
tags: [angular2]
date: 2017-02-09
categories: tips
author: jorgecano
cover: "https://cdn-images-1.medium.com/max/800/1*0VVxvtVPgHFR8Cm_tQKaOA.png"
---
> Hablemos un poco de los componentes reactivos, que son para que sirven y como utilizarlos…

<amp-img width="750" height="422" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*0VVxvtVPgHFR8Cm_tQKaOA.png"></amp-img>

Y para no perder la costumbre los ejemplos van a ser con Angular 2 y Firebase

<amp-img width="400" height="400" src="https://cdn-images-1.medium.com/max/800/1*m13nL_ZByB4L131aNhOysA.png"></amp-img>

<blockquote>La programación reactiva es un paradigma de programación orientada alrededor de flujos de datos y programación al cambio.</blockquote>

Haciendo un poco de historia… cuando arranque a programar, la programación era totalmente sync.

Como trabajamos, programábamos en alguna tecnología que corría en un servidor y cada vez que llamábamos a esa “URL” se ejecuta toda una lógica, llamadas a la base de datos, etc… y generábamos una pagina estática la cual se entregaba al navegador para que se dibuje y muestre la información necesaria.

El problema de esto, que cualquier cambio por ejemplo en los datos que se mostraban, o si validábamos algo del formulario se hacia en el servidor, por lo tanto se necesitaba “recargar” la pagina o redirigirlo para que pueda interactuar con lo nuevo.

Luego llego la async de la mano de AJAX, en este caso, estábamos teniendo mas manejo y mas cosas en la parte del frontend y necesitábamos actualizar las cosas de distinta manera, por ejemplo validar un formulario, o dependiendo la selección de un combo llenar otro y todo esto lo lográbamos bajo llamadas a “URLs” que contenían código solo que nos devolvía cosas para inyectar en nuestro DOM.

Ya con esto estábamos bastante contento, después llego JQuery y nos mejoro todo, pero el problema es que siempre necesitamos mas.

Teníamos cierto manejo de cosas sobre las llamadas async pero teníamos algunos problemas de por medio…

Y en todo esto aparecer Promise, promise apareció mucho después pero nos dio esa libertad de poder hacer un poco mas en nuestras webapps.

“La interfaz Promise representa un proxy para un valor no necesariamente conocido cuando se crea la promesa. Permite asociar “manejadores” a un eventual éxito o fracaso de acciones asíncronas. Esto permite que los métodos asíncronos devuelvan valores como métodos sincrónicos: en lugar del valor final, el método asíncrono devuelve una promesa de tener un valor en algún momento en el futuro.”

Ya con promise teníamos la forma de tener distintos estados sobre las peticiones asincrónicas que hacíamos.

Pero el mundo sigue a pasos agigantados en la programación y nos encontramos con un nuevo paradigma, los “observables” o el paradigma de componentes Reactivos.

Como bien mencione mas arriba es un paradigma de programación y esta pensado para la programación con cambios constante de datos.

…

Si todo muy bonito, pero que significa esto?? cual es la gracia, si yo ya tenia la forma de poder actualizar y ademas obtener el estado de ese cambio.

El primer ejemplo antes de meterme un poco mas en todo esto es el siguiente

### NO REACTIVO
<script src="https://gist.github.com/jorgeucano/1259ed1e95e32a167558e3fe23cdf488.js"></script>

### REACTIVO
<script src="https://gist.github.com/jorgeucano/22a49ec08a902a156167736317b454d6.js"></script>

Claro, el código es el mismo, ahora uno es false (que parece mas lógico) y el otro es true…

Cual seria la diferencia, pensemos que estamos mirando constantemente a y todos sus cambios/funciones/operaciones…

Al principio vale 5, hasta ahi no tenemos ninguna duda…

Luego la usamos en “c” para sumarla a b …. por lo tanto es una operación, ahora cuando le asignamos el valor 10 ….

Los componentes reactivos que están siendo observados, realizan “cambios” en todos los lugares donde impacta el mismo… en este caso… en la suma de “a + b” por lo tanto, cuando preguntamos si “c==20” es verdad… ya que la operación se hizo de nuevo.

<amp-img width="750" height="422" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*DjKh74Tddsh8vFbKBwCXsg.jpeg"></amp-img>

Vamos a ser un poco mas técnicos…

{% include blog/subscribe.html %}

## Programación orientada a objetos reactivos

<blockquote>Los métodos y campos instanciados, reaccionan automáticamente y rehacen todas las evaluaciones cuando uno de los objetos este sujeto a un observable.</blockquote>

En todo esto aparece ReactiveX con RxJS para ayudarnos a dominar a este monstruo.

<amp-img width="750" height="422" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*CFg7962LWKsujzvKunIKYw.jpeg"></amp-img>

RxJS es un conjunto de bibliotecas para hacer programación asincrónica, basada en eventos usando “observables collections”.

*Observable:* representa la idea de una colección de valores o eventos futuros.

*Observer:* es un conjunto de devoluciones de llamadas que sabe “escuchar a los observables”

*Subscriptions:* representa la ejecución de un observable, es principalmente util para la cancelación de las ejecuciones.

*Operators:* son funciones puras que permiten un estilo de programación funcional, para tratar collections con operaciones como mapa, filtro, concat, flatmap, etc.

*Subjects:* es el equivalente a un “eventEmiter” y la única manera de una “multiple-fusion” de un valor o evento a varios observables

*Schedulers:* son despachadores centralizados de control de concurrencia, lo que nos permite coordinar cuando sucede algún “computo”, por ejemplo setTimeout, requestAnimationFrame u otros.

## Se entendió?

<amp-img width="400" height="400" src="https://cdn-images-1.medium.com/max/800/1*dqeIZ_6g6OXJpwIcp2zikw.gif"></amp-img>

Ahora, cuando podríamos usar esto es la pregunta…

Hace poco tiempo con ng-baires ( la mejor meetup de universo(?) ) hicimos un bootcamp de Angular 2 y Firebase… Firebase tiene una librería especifica para Angular2 la cual esta armada con observables.

<script src="https://gist.github.com/jorgeucano/4a9494a72d239cae021b5343486cf5de.js"></script>

Analizando un poco todo , importamos muchas cosas con RX no ?

Arranquemos con los imports

<blockquote>import { Observable } from ‘rxjs/Observable’;

import { RouteParams } from ‘@ngrx/router’;

import ‘rxjs/add/operator/pluck’;</blockquote>

Las tres son de la librería Rx, unas directo de RxJS (de la que venimos hablando) y el router es de ngrx que es la implementación de RxJS para Angular2.

En el import de la librería de firebase, vemos que llamamos a “AngularFire, FirebaseListObservable” el segundo import ya lo dice en su nombre Observable.

Tanto el router como el post que trae firebase son observables… que quiere decir esto.

Bueno como Angular2 es SPA, en este caso este router, verifica el cambio de la url, y también podemos observar que no tan solo el cambio, si no que también lee si tiene algún tipo de parámetro.

Ahora firebase hace lo mismo, vos llamas a “algo” en especial, en este caso es 1 solo post, y nos devuelve una lista observable, que ganamos con esto, que si cambia en algún lugar el filtro que pusimos sobre la lista de firebase, las variables/operaciones/etc se van a modificar automáticamente.

Por lo tanto, lo que hace el código, es observar la URL y chequear si cambia el parámetro ID (lo esta observando), al cambiarse ejecuta un cambio y ese cambio lo pasa como variable a el observable de firebase, el cual regenera todas sus operaciones y traer un nuevo json con el “post” en este caso que contiene ese id especifico.

Si quieres saber sobre Angular te invito a ver mi <a href="https://leanpub.com/entendiendoangular" target="_blank">libro.</a> totalmente en español ;)

