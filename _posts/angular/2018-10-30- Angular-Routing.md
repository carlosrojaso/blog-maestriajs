---
layout: post
title: "Usando el Routing de Angular"
keywords: "angular, routing"
date: 2018-10-29
tags: [testing, demos]
categories: angular
repo: "https://github.com/ng-classroom/demo132"
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-30-%20Angular-Routing%2Fcover.png?alt=media&token=fa1e7f20-cd8a-42f9-be48-39b3a6943043"
remember: true
versions:
  - title: 'Angular CLI'
    number: '7.0.3'
  - title: 'karma'
    number: '1.7.1'
  - title: 'karma-jasmine'
    number: '1.1.2'
---

> Cuando realizas una App con Angular en la mayoria de los casos te vas a encontrar con la necesidad de tener que cambiar entre diferentes vistas para estos casos Angular tiene un sistema de navegación gestionado por el `Angular Router`.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-30-%20Angular-Routing%2Fcover.png?alt=media&token=fa1e7f20-cd8a-42f9-be48-39b3a6943043"></amp-img>

{% include general/net-promoter-score.html %}

## ¿ Que es el Angular Router ?

El `Router` en Angular permite habilitar el sistema de navegación en nuestra App. Consideremos un escenario común que es cuando tenemos un sistema de autenticación, cuando queremos ingresar a la App debemos ingresar nuestro `usuario` y `contraseña` y despues podemos ingresar a nuestra App. Aca podemos observar varias cosas lo primero es que posiblemente nuestra App tenga las `urls` como `http://myapp.com/login` y una vez ingresamos correctamente `http://myapp.com/dashboard`. Este es el trabajo del `Router` permitir que podamos mostrar ciertos componentes dependiendo de la `url` que estamos utilizando. Adicionalmente, podremos enviar informacion a través de la `url` y también podremos evitar que un usuario no autenticado acceda directamente a `http://myapp.com/dashboard`.

## ¿ Como utilizo el sistema de navegación en una App ?

Bueno para mostrar la implementación del `router` vamos a crear una nueva App utilizando el `Angular CLI`.

```
$ng new demo132
```

Si te das cuenta el `CLI` te pregunta si quieres implementar el `routing` en tu proyecto. Le vamos a decir `Si`.

<amp-img width="892" height="553" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-30-%20Angular-Routing%2F1.png?alt=media&token=9b386102-a54e-4b27-a8e3-80580d05a941"></amp-img>

Esto va a crear un nuevo modulo el cual es llamado `app-routing.module.ts`  que se ve de la siguiente manera:

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

y ya esta agregado en nuestro `app.module.ts`.

Ahora vamos a crear dos componentes adicionales para poder movernos entre ellos.

````
$ng g c dashboard
````

y

````
$ng g c view1
````

y vamos a modificar nuestro archivo `app-routing.module.ts`. para agregarles las rutas nuevas.

```ts
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view/:id',      component: View1Component },
];
```

con esto le estoy diciendo al `router` que cuando la url tenga `/dashboard/` va a cargar el componente `DashboardComponent` y cuando la url tenga `/view/2` va a cargar el componente `View1Component` y va a enviar un parametro `id`.

Ahora vamos a modificar nuestro archivo `app.component.html` Para soportar estos nuevos cambios, lo primero es que debes observar que en este archivo ahora aparece el `routerOutlet` esta es una directiva la cual le marca a Angular donde debe dibujar los otros componentes.

```html
{% raw %}
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
<h2>Here are some links to help you start: </h2>
<ul>
  <li>
    <h2><a routerLink="/dashboard">Dashboard</a></h2>
  </li>
  <li>
    <h2><a routerLink="/view/1">View 1</a></h2>
  </li>
</ul>

<router-outlet></router-outlet>
{% endraw %}
```

También puedes observar que en nuestras modificaciones estamos usando ahora el `routerLink` el cual le da el contro al `router` para los enlaces y sobre estos colocamos los path que necesitamos.

Por ultimo vamos a trabajar en el `View1Component` para darle la capacidad de que capture el parametro `id` que le dijimos al router que va a recibir.

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.scss']
})
export class View1Component implements OnInit {
  protected id: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => this.id = params.id );
  }

}
```

Aca hemos importado el `ActivatedRoute` para poder obtener los  `params` que esta recibiendo el `router` y debido a que esto es un `Observable` nos podemos suscribir y ver que esta obteniendo en el parametro `id`.

Listo ya con esto tenemos nuestra pequeña App con nuestro sistema de Navegación funcionando.

<amp-img width="640" height="332" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-30-%20Angular-Routing%2Frouting.gif?alt=media&token=75b11595-df51-459e-8d70-bb7dd9d9af3c"></amp-img>

Bueno esto es todo :) no te olvides compartir.
