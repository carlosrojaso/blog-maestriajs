---
layout: post
title: "Buenas Practicas en Angular"
keywords: "angular, buenas practicas"
date: 2019-02-12
tags: [architecture, angular]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-12-Angular-Buenas-Practicas%2FCover.png?alt=media&token=dcf08d52-a326-4a6a-b263-cdef4aa5bfcd"
---

> Una de las ventajas de utilizar un framework como `Angular` es no tener que lidiar con la actualizacion de estados en el DOM de la vista, esto es conocido en `Angular` como el `renderer`. Probablemente en Angular 8 este nuevo sistema de rendereer llamado por ahora `Angular Ivy` sea liberado pero en este post vamos a tratar de entender un poco sus ventajas.

<!--summary-->

<amp-img width="820" height="312" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-12-Angular-Buenas-Practicas%2FCover.png?alt=media&token=dcf08d52-a326-4a6a-b263-cdef4aa5bfcd"></amp-img>

{% include general/net-promoter-score.html %}

## Utilizar trackBy

Antes

```html
<li *ngFor="let item of items;">{{ item }}</li>
```

Despues

```
{% raw %}
// in the template

<li *ngFor="let item of items; trackBy: trackByFn">{{ item }}</li>

// in the component
trackByFn(index, item) {    
   return item.id; // unique id corresponding to the item
}
{% endraw %}
```

## Suscribirse en el Template

Antes

```
// template
<p>{{ textToDisplay }}</p>

// component
iAmAnObservable
    .pipe(
       map(value => value.item),
       takeUntil(this._destroyed$)
     )
    .subscribe(item => this.textToDisplay = item);
```

Despues

```
// template
<p>{{ textToDisplay$ | async }}</p>
// component
this.textToDisplay$ = iAmAnObservable
    .pipe(
       map(value => value.item)
     );
```

## Limpiar las suscripciones.

Antes

```
iAmAnObservable
    .pipe(
       map(value => value.item)     
     )
    .subscribe(item => this.textToDisplay = item);
```

```
private _destroyed$ = new Subject();
public ngOnInit (): void {
    iAmAnObservable
    .pipe(
       map(value => value.item)
      // We want to listen to iAmAnObservable until the component is destroyed,
       takeUntil(this._destroyed$)
     )
    .subscribe(item => this.textToDisplay = item);
}
public ngOnDestroy (): void {
    this._destroyed$.next();
    this._destroyed$.complete();
}
```

## Usar Lazy Load

Antes

```
// app.routing.ts
{ path: 'not-lazy-loaded', component: NotLazyLoadedComponent }
```

Despues

```
// app.routing.ts
{ 
  path: 'lazy-load',
  loadChildren: 'lazy-load.module#LazyLoadModule' 
}
// lazy-load.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadComponent }   from './lazy-load.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
         { 
             path: '',
             component: LazyLoadComponent 
         }
    ])
  ],
  declarations: [
    LazyLoadComponent
  ]
})
export class LazyModule {}
```

## Evitar suscripciones dentro de suscripciones.

Antes

```
firstObservable$.pipe(
   take(1)
)
.subscribe(firstValue => {
    secondObservable$.pipe(
        take(1)
    )
    .subscribe(secondValue => {
        console.log(`Combined values are: ${firstValue} & ${secondValue}`);
    });
});
```

Despues

```
firstObservable$.pipe(
    withLatestFrom(secondObservable$),
    first()
)
.subscribe(([firstValue, secondValue]) => {
    console.log(`Combined values are: ${firstValue} & ${secondValue}`);
});
```

## Componentes deberian solo preocuparse por la logica de la vista.