---
layout: post
title: "Observables en Angular"
tags: [tips]  
date: 2016-07-07
categories: ionic2
author: carlosrojas
cover: "http://i.imgur.com/zo6SD90.jpg"
---

 

Los Observables son una de las grandes decisiones que creo hace que Angular sea una de las herramientas mas poderosas para realizar clientes web y moviles en la actualidad.

Basicamente, Se han utilizado las Promesas para realizar peticiones asincronas y esperar por alguna respuesta en algun momento de la ejecución de nuestro codigo. Los Observables siguen la misma logica de las promesas
pero no solo tratara de encontrar la información una sola vez sino que creara una especie de canal por donde podremos encontrar la información mas actualizada en cualquier momento y no solo una vez como las Promesas. 

Para utilizar Observables en nuestra App deberas tener al menos la libreria importada en tu codigo.

```ts
import {Observable} from 'rxjs/Observable';
```

y utilizar el metodo subscribe que indicara que vas a suscribirte a la info.

```ts
MiObservable.subscribe((resultado) => {
  console.log(resultado);
});
```

entonces, ahora cuando veas en el codigo de Ionic 2 este metodo ya sabes para que se esta utilizando :)

Si quieres entender un poco más a fondo la programacion reactiva puedes ver [aquí](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

