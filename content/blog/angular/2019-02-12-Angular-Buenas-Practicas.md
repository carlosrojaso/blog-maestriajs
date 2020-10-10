---
layout: post
title: "Buenas Practicas en Angular"
keywords: "angular, buenas practicas"
date: 2019-02-14
tags: [architecture, angular]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-12-Angular-Buenas-Practicas%2FCover.png?alt=media&token=dcf08d52-a326-4a6a-b263-cdef4aa5bfcd"
---

> Cuando vas trabajando en tus Apps con `Angular` vas observando que algunas veces debes realizar verificaciones de rendimiento debido a que el usuario siente que algunas caracteristicas estan mas lentas que otras, algunas de estos problemas de rendimiento se pueden evitar aplicando `buenas practicas` del uso de las caracteristicas de `Angular` aca te colocamos algunas.

<!--summary-->

<img width="820" height="312" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-12-Angular-Buenas-Practicas%2FCover.png?alt=media&token=dcf08d52-a326-4a6a-b263-cdef4aa5bfcd">



## Utilizar trackBy

Cuando un Array cambia `Angular` vuelve a crear todo el arbol del `DOM`, pero si utilizas `trackBy` se conocera especificamente cual elemento cambio y `Angular` solo realizara los cambios para ese elemento en particular.

Antes

```html
<li *ngFor="let item of items;">{{ item }}</li>
```

Despues

```html
{% raw %}
// Template
<li *ngFor="let item of items; trackBy: trackByFn">{{ item }}</li>

// Componente
trackByFn(index, item) {    
   return item.id; // unique id corresponding to the item
}
{% endraw %}
```



## Suscribirse en el Template

Utilizando el pipe `asyc` realiza las tareas de suscripción/desuscripción por ti evitando caer en fugas de memoria al olvidarte de desuscribirte manualmente de un Observable cuando no se este utilizando.

Antes

```html
{% raw %}
// Template
<p> {{ textToDisplay }} </p>

// Componente
iAmAnObservable
    .pipe(
       map(value => value.item),
       takeUntil(this._destroyed$)
     )
    .subscribe(item => this.textToDisplay = item);
{% endraw %}
```

Despues

```html
{% raw %}
// template
<p>{{ textToDisplayo | async }}</p>
// component
this.textToDisplayo = iAmAnObservable
    .pipe(
       map(value => value.item)
     );
{% endraw %}
```

## Limpiar las suscripciones.

Cuando tu componente se suscriba y no sea utilizado mas, debes agregar un protocolo de desuscripción probablemente en el `ngOnDestroy()`.

Antes

```ts
iAmAnObservable
    .pipe(
       map(value => value.item)     
     )
    .subscribe(item => this.textToDisplay = item);
```

```ts
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

Si estas utilizando Modulos en tu app con Angular usando `lazy Load` va a reducir bastante el tamaño de la aplicación al ser cargada y mejorara la velocidad de arranque de tu app.

Antes

```ts
// app.routing.ts
{ path: 'not-lazy-loaded', component: NotLazyLoadedComponent }
```

Despues

```ts
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

Algunas veces necesitas valores cambiantes que suceden adentro de una suscripción esto intuitivamente podrias entender que puede tomar mucho del rendimiento de la App. en estos casos te puedes ayudar de operadores como `withLatestFrom` y `combineLatest`.

Antes

```ts
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

```ts
firstObservable$.pipe(
    withLatestFrom(secondObservable$),
    first()
)
.subscribe(([firstValue, secondValue]) => {
    console.log(`Combined values are: ${firstValue} & ${secondValue}`);
});
```

Bueno espero que estas sugerencias sean de ayuda. Hasta un proximo Post :)