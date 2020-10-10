---
layout: post
title: "Angular Testing Framework + Como probar las rutas"
keywords: "unit test, pruebas unitartias, angular, pruebas unitarias, webpack, jasmine, karma"
date: 2018-11-05
tags: [testing, demos]
categories: angular
repo: "https://github.com/ng-classroom/demo133"
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-30-%20Angular-Pruebas-Unitarias-Routing%2Fcover.png?alt=media&token=8794fd84-b083-4934-9fb6-0991f8f84dff"
remember: true
versions:
  - title: 'Angular CLI'
    number: '7.0.3'
  - title: 'karma'
    number: '1.7.1'
  - title: 'karma-jasmine'
    number: '1.1.2'
---

> Escribir pruebas unitarias nos ayudará a reducir de forma significativa los errores que puedan llegar a producción, en este articulo vamos a ver como realizarlas en las rutas de nuestra App.

<!--summary-->

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-30-%20Angular-Pruebas-Unitarias-Routing%2Fcover.png?alt=media&token=8794fd84-b083-4934-9fb6-0991f8f84dff">



Si recuerdas en uno de mis [Posts anteriores](https://blog.ng-classroom.com/blog/angular/Angular-Routing/) empezamos a utilizar el `Routing` de Angular para cambiar entre vistas en nuestra App.

Creamos un par de rutas

```ts
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view/:id',      component: View1Component },
];
```

y ahora queremos probar que al navegar hacia `dashboard` cargue `/dashboard` en la URL y asi. Es una prueba sencilla pero nos ayudara a entender varios conceptos que nos seran utiles cuando tratemos de hacer pruebas mas avanzadas en el `routing` 

## ¿ Que es el RouterTestingModule ? 

Bueno como todos los Testing Module este prepara el router para ser Testeado. Bueno como todos los Testing Module este prepara el router para ser Testeado. Su sintaxis es algo asi:

```ts
beforeEach(() => {
  TestBed.configureTestModule({
    imports: [
      RouterTestingModule.withRoutes(
        [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}]
      )
    ]
  });
});
``` 

## ¿ Que es el fakeAsync ?

`fakeAsync` es un helper el cual nos permite controlar llamados asincronos como si fueran sincronos cuando usamos `tick()`.

## Probando nuestras rutas.

Lo primero es preparar nuestro lugar de pruebas con lo necesario. Para esto importamos lo necesario.

```ts
import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";

import {DashboardComponent} from './dashboard/dashboard.component';
import {View1Component} from './view1/view1.component';
import {AppComponent} from './app.component';
```

Luego preparamos nuestro `Testbed` con todo lo necesario.

```ts
beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [    RouterTestingModule.withRoutes(routes)],
      declarations: [
        DashboardComponent,
        View1Component,
        AppComponent
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });
```



y creamos nuestras pruebas.

```ts
it('navigate to "dashboard" redirects you to /dashboard', fakeAsync(() => {
    router.navigate(['/dashboard']);
    tick(50);
    expect(location.path()).toBe('/dashboard');
  }));

  it('navigate to "view/1" redirects you to /view/1', fakeAsync(() => {
    router.navigate(['/view/1']);
    tick(50);
    expect(location.path()).toBe('/view/1');
  }));
```

Nuestro codigo completo se veria asi `app.component.spec.ts`.

```ts
import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";

import {DashboardComponent} from './dashboard/dashboard.component';
import {View1Component} from './view1/view1.component';
import {AppComponent} from './app.component';

describe('Router:app', () => {
  let location: Location;
  let router: Router;
  let fixture;

  const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'view/:id',      component: View1Component },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [    RouterTestingModule.withRoutes(routes)],
      declarations: [
        DashboardComponent,
        View1Component,
        AppComponent
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navigate to "dashboard" redirects you to /dashboard', fakeAsync(() => {
    router.navigate(['/dashboard']);
    tick(50);
    expect(location.path()).toBe('/dashboard');
  }));

  it('navigate to "view/1" redirects you to /view/1', fakeAsync(() => {
    router.navigate(['/view/1']);
    tick(50);
    expect(location.path()).toBe('/view/1');
  }));
});
```

y podemos probarlo en con el Angular CLI. Usando el comando.

```
$ng test
```

<img width="1199" height="728" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-30-%20Angular-Pruebas-Unitarias-Routing%2FCaptura%20de%20pantalla%202018-11-05%20a%20la(s)%2012.19.58%20p.%20m..png?alt=media&token=d420fb52-a62f-485b-954a-9aebdfcd90d9">

Esto es todo por ahora espero que sea de utilidad para tus proximas pruebas y hasta un proximo post :)