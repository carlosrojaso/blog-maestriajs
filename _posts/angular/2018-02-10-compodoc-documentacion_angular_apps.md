---
layout: post
title: "Compodoc - Documentación en Angular Apps."
date: 2018-02-12
tags: [angular]
categories: angular
author: carlosrojas
repo: https://github.com/ion-book/firstAngular
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-10-compodoc-documentacion_angular_apps%2FCompodoc.png?alt=media&token=ac39b0c9-6d5e-49e0-a6c8-1ff818975032"
versions:
  - title: 'Angular CLI'
    number: '1.6.1'
  - title: 'Angular'
    number: '5.0'
  - title: 'angularfire2'
    number: '5.0.0-rc.4'
---
> Cuando los proyectos en Angular crecen un poco más de 50 componentes y se supone va a durar en producción varios años, es buena idea tener Documentación de codigo para las generaciónes futuras.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-10-compodoc-documentacion_angular_apps%2FCompodoc.png?alt=media&token=ac39b0c9-6d5e-49e0-a6c8-1ff818975032"></amp-img> 

{% include general/net-promoter-score.html %} 

La documentación es una de las operaciones más aburridoras en la historia de desarrollar una App mantenible y escalable. Por nuestra naturaleza de programadores posiblemente la mejor solución es tener un programa que la haga por nosotros, es por esto que tenemos a Compodoc.

## Que es Compodoc ?

Compodoc es un generador de Documentación el cual va a leer los archivos de tu proyecto en Angular y va a generar una Documentación simple y elegante que va contener sus bloques de construcción junto con los comentarios que tengas en los mismos.

## Caracteristicas.

### Diseño simple y limpio.

La documentación queda organizada de una forma clara y simple.

### Busqueda.

Tienes un buscador listo para utilizar y evitar tener que navegar en esos proyectos grandes.

### Tabla de Contenido automatizada.

Todo tu contenido queda indexado de una manera facil y automatica.

### Soporte de JSDoc.

Los comentarios que expliquén tu codigo van a quedar agregados a tu documentación.

Tiene algunas otras cosas interesantes pero estos me parecieron los principales.

## Instalación.

````
npm install -g @compodoc/compodoc
````

Creamos una tarea en nuestro ```package.json``` para que sea mas facil.

````
"scripts": {
  ...
  "compodoc": "./node_modules/.bin/compodoc -p src/tsconfig.app.json"
}
````

y cada vez que queramos actualizar nuestra documentación simplemente usamos:

````
npm run compodoc
````

{% include blog/adAngular.html %}

## Uso.

He agregado esta herramienta a nuestra App ```firstAngular``` para que puedas ver su uso rapidamente solo clonala e instalala.

````
npm install
````

Ejecuta la tarea.

````
npm run compodoc
````

<div class="row wrap">
  <div class="col col-md-10 col-lg-10">
  </div>
  <div class="col col-md-80 col-lg-80">
    <amp-img width="800" height="554" layout="responsive"  src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-10-compodoc-documentacion_angular_apps%2F1_gixClrkIx1IEylbTJbyZxQ.png?alt=media&token=aca189ce-c59e-4ce1-8dd3-107e9b344eb3" alt=""></amp-img> 
  </div>
  <div class="col col-md-10 col-lg-10">
  </div>
</div>

Tu proyecto debe tener ahora la carpeta ```documentation```

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <amp-img width="259" height="332" layout="responsive"  src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-10-compodoc-documentacion_angular_apps%2F1_Ytej7cvomQLzflT2WE99KQ.png?alt=media&token=47a35ce5-1be3-44a8-9b0f-869f2c73e713" alt=""></amp-img> 
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>

Ahora solo debes ingresar a esa carpeta y ejecutarla con un servidor local, yo recomiendo [NWS](https://www.npmjs.com/package/nws).

y solamente ingresar a localhost.

<div class="row wrap">
  <div class="col col-md-10 col-lg-10">
  </div>
  <div class="col col-md-80 col-lg-80">
    <amp-img width="1268" height="739" layout="responsive"  src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-10-compodoc-documentacion_angular_apps%2FCaptura%20de%20pantalla%202018-02-11%20a%20la(s)%2012.56.49%20p.%20m..png?alt=media&token=714c7121-cf9b-4232-92f7-488ac37d27ac" alt=""></amp-img> 
  </div>
  <div class="col col-md-10 col-lg-10">
  </div>
</div>

Bueno espero que sea de ayuda y no te olvides comentar y compartir :)