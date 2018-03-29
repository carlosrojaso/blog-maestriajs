---
layout: post
title: "Dominando Lazy Loading en Angular"
date: 2018-03-30
tags: [angular]
categories: angular
author: andysantana
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-03-29-dominando_lazy_loading_en_angular%2FAngular2.jpg?alt=media&token=345a3726-2f92-4ac3-807b-62d904bfad5d"
repo: https://github.com/andyfrontend/angular-lazyloading
editname: "angular/2018-03-29-dominando_lazy_loading_en_angular.md"
versions:
  - title: 'Angular CLI'
    number: '1.7.3'
  - title: 'Angular'
    number: '5.2'
---
> A la hora de crear una aplicación es muy importante tomar en cuenta el rendimiento y velocidad de esta. Por eso en este artículo te enseño a manejar Lazy Loading en Angular que nos ayudará a mejorar el rendimiento de nuestra aplicación y el usuario final estará más feliz.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-03-29-dominando_lazy_loading_en_angular%2FAngular2.jpg?alt=media&token=345a3726-2f92-4ac3-807b-62d904bfad5d"></amp-img>
{% include general/net-promoter-score.html %}

## ¿Qué pasa cuando una aplicación de Angular inicia?

Angular carga todos los componentes que están importados en nuestro módulo principal `app.module.ts` y puede ser que tarde unos segundos en cargar nuestra aplicación, dependiendo cuantos componentes haya. Para resolver ese problema llegó a nosotros lo que es Lazy Loading.


## ¿Qué es Lazy Loading?

Es una técnica usada en Angular que nos permite cargar sólo, el o los componentes que necesitemos al inicio de nuestra aplicación, estos componentes no cargan cada vez que entres, sino que solo cargan una sola vez.

Cuando usamos Lazy Loading hacemos llamado de un módulo mediante el sistema de rutas de Angular y este módulo a su vez tiene rutas hijas que se encargan de cargar el componente solicitado por el usuario, más adelante entenderemos esto mejor.


## Vamos al código

Para empezar vamos a crear un nuevo proyecto con Angular CLI
```
ng new tienda01 --routing
```

`--routing`: Para que nos genere un módulo de ruta listo para funcionar

Ya con nuestro proyecto creado el siguiente paso que vamos hacer es generar 3 componentes llamados **inicio**, **tienda**, **carrito** y un módulo llamado **páginas** que se encargará de gestionar nuestras rutas hijas.

`ng generate module paginas/paginas --flat`  
`ng generate component paginas/inicio --spec=false -is -it`  
`ng generate component paginas/carrito --spec=false -is -it`  
`ng generate component paginas/tienda --spec=false -is -it`

`--flat`: Para que no genere una carpeta sino solo el archivo .ts  
`--spec=false`: Para evitar el archivo de testing  
`-is`: Abreviación de inline-style, el css estará dentro del archivo .ts  
`-it`: Abreviación de inline-template, el html estará dentro del archivo .ts

Ahora tenemos una carpeta llamada páginas con su módulo y componentes.

## Estructura de nuestro proyecto:

app/  
-----paginas/  
----------carrito/  
---------------carrito.component.ts  
----------inicio/  
---------------inicio.component.ts  
----------tienda/  
---------------tienda.component.ts  
----------paginas.module.ts  
-----app-routing.module.ts  
-----app.module.ts  
-----app.component.ts  
-----app.component.html

Ahora vamos a trabajar sobre el módulo **paginas.module.ts**, dentro de este archivo creamos las rutas hijas

`paginas.module.ts`

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { TiendaComponent } from './tienda/tienda.component';

const routes: Routes = [
  { path: '', component: TiendaComponent },
  { path: 'carrito', component: CarritoComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [CarritoComponent, TiendaComponent]
})
export class PaginasModule {}

```

Primero importamos los componentes que van a depender de ese módulo, creamos las rutas y luego dentro de **imports** hacemos uso de **forChild** para especificar que ese módulo va a servir rutas hijas.

Ahora vamos a nuestro módulo de rutas principales **app-routing.module.ts**

`app-routing.module.ts`

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'tienda', loadChildren: './paginas/paginas.module#PaginasModule' },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

Importamos los componentes que vamos a usar al inicio de nuestra aplicación, en este caso solo tenemos el componente de Inicio.

Dentro de nuestra variable **routes** vamos almacenar todas las rutas principales de nuestra aplicación.

1. Ruta **inicio**, aquí le decimos a Angular, cuando la ruta sea igual a inicio carga el componente **InicioComponent**
2. Ruta tienda, aquí le decimos a Angular, cuando la ruta sea igual a tienda carga este módulo.  
loadChildren: `rutaDelModulo#nombreDelModulo`  
Lo primero que tenemos que poner es la ruta (donde se encuentra) del módulo seguido del signo **#** (hashtag) y el nombre del módulo.  
Nuestro caso:   
Ruta del módulo: `./paginas/paginas.module`  
Nombre del módulo: `#PaginasModule`
3. La última ruta le dice a Angular, cuando no especifique una url, llévame a la ruta **inicio**

El último paso es ir a nuestro módulo principal `app.module.ts` e importamos todos los componentes que vamos a utilizar al inicio de nuestra aplicación, los mismos que pusimos en `app-routing.module.ts`. En nuestro caso solo vamos a importar el componente **inicio**.

`app.module.ts`

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, InicioComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Ahora vamos a probar nuestro código para eso vamos a `app.component.html` y creamos un enlace para ir a la tienda.

`app.component.html`

```html
<div style="text-align:center">
  <h1>
    Shopping app
  </h1>
  <a routerLink="/tienda">Tienda</a>
</div>

<router-outlet></router-outlet>
```

> Para notar el cambio abrimos la consola del navegador y vamos a la pestaña Network (es necesario reiniciar la página para poder capturar los archivos en esta pestaña).

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="184" height="224" layout="responsive" src="https://image.ibb.co/itPuvS/code5.png"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    
  </div>
</div>

Ahora vamos hacer click a nuestro enlace para ir a la tienda

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="835" height="589" layout="responsive" src="https://preview.ibb.co/iXW4C7/code6.gif"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    
  </div>
</div>

Luego de hacer click podemos ver que ahora tenemos un nuevo archivo llamado `paginas.module.chunk.js` aqui estaran los componentes que importamos en nuestro archivo `paginas.module.ts`. Ya nuestro lazy loading está funcionando.

## Conclusión

Esta es una muy buena técnica para mejorar el rendimiento en tu aplicación por lo tanto recomiendo siempre usar lazy loading.

Si te gustó comparte o comenta. Hasta la proxima :)