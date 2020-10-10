---
layout: post
title: "Angular Ivy"
keywords: "angular, rendering, ivy"
date: 2019-02-04
tags: [architecture, angular]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-04-Angular-ivy%2Fcover.png?alt=media&token=82e56e6f-c228-4b85-abc9-5379c62ac333"
---

> Una de las ventajas de utilizar un framework como `Angular` es no tener que lidiar con la actualizacion de estados en el DOM de la vista, esto es conocido en `Angular` como el `renderer`. Probablemente en Angular 8 este nuevo sistema de rendereer llamado por ahora `Angular Ivy` sea liberado pero en este post vamos a tratar de entender un poco sus ventajas.

<!--summary-->

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-04-Angular-ivy%2Fcover.png?alt=media&token=82e56e6f-c228-4b85-abc9-5379c62ac333">



# ¿ Que es Angular Ivy ?

Angular Ivy es el nuevo rendeer de Angular el cual ha sido socializado en eventos y en Post por el equipo de `Angular` puedes ver su avance [aqui](https://is-angular-ivy-ready.firebaseapp.com/#/status).

# ¿ Que novedad trae Angular Ivy ?

Angular Ivy viene con un concepto para actualizar el DOM que se llama `incremental DOM` el cual difiere de su alternativa principal `Virtual DOM` en un bajo `memory footprint` y logra el `Tree shakable`.

# ¿ Como trabaja el Virtual DOM ?

Cada componente crea un nuevo *Virtual DOM tree* cada vez que este es renderizado. El javascript que lo utiliza compara el nuevo arbol con el viejo y aplica una nueva serie de transformaciones a el DOM del navegador para asemejarse al nuevo *Virtual DOM tree*.

<img width="526" height="198" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-04-Angular-ivy%2F1_48mwTh2nPA-_owlgwFK6Ew.png?alt=media&token=9d0bf820-4c40-47c1-a141-81fc24afb2ad">

La principal ventaja de este acercamiento es que podemos realizar la funcionalidad de render con Javascript.

# ¿ Como trabaja el Incremental DOM ?

Cada componente es compilado en una serie de instrucciones. Estas instrucciones crean árboles DOM y los actualizan in situ cuando cambian los datos.

Este acercamiento logra principalmente dos cosas: un bundle size mas pequeño y una huella de memoria mas pequeña.

# ¿ Como logra incremental DOM el Tree shakable?

Cuando se usa incremental DOM, el framework no interpreta el componente. en su lugar, el componente referencia instrucciones. Este no referencia una instruccion particular, esta nunca sera usada. y si agregamos que esto se hace en tiempo de compilacion, podemos omitir instrucciones sin usar del bundle.

<img width="554" height="372" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-04-Angular-ivy%2F2.png?alt=media&token=c4e7b67b-d0e6-4c09-bb26-66d027be699f">

# ¿ Por que Incremental DOM tiene una huella de memoria baja ?

Virtual DOM crea un arbol completo desde el comienzo cada vez que tu renderizas de nuevo.

<img width="704" height="230" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-04-Angular-ivy%2F3.png?alt=media&token=b268b826-8798-4c2b-a45e-3f9ce7420bdd">



Incremental DOM por otro lado, no necesita mas memoria para renderizar de nuevo la vista si este no cambia el DOM. Solo tenemos que asignar la memoria cuando los nodos del DOM son agregados o removidos. Y el tamaño de la asignacion es proporcional al tamaño del cambio en el DOM.

<img width="710" height="196" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-04-Angular-ivy%2F5.png?alt=media&token=f0b3d2a9-8990-4521-bd4f-648c3185c32e">

Desde que la mayoria de los llamados de render/template no cambia nada (o cambia muy poco), esto puede resultar en un gran ahorro de memoria.

Bueno esto es un poco lo que se viene para la nueva versión de Angular, si queres leer mas puedes leer el post que sirvio de base [aqui](https://blog.nrwl.io/understanding-angular-ivy-incremental-dom-and-virtual-dom-243be844bf36). Espero sea de utilidad y hasta un proximo Post :)
