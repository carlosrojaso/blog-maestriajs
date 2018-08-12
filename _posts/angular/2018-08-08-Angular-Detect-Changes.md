---
layout: post
title: "Angular: Entendiendo la detección de cambios."
date: 2018-08-13
tags: [angular, servicio]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-08-Angular-Detect-Changes%2FTitulos.png?alt=media&token=edc21349-6520-4d5e-bb59-ac0dd4cc851c"
editname: "angular/2018-08-08-Angular-Detect-Changes.md"
versions:
  - title: 'Angular CLI'
    number: '6.1.1'
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-08-Angular-Detect-Changes%2FTitulos.png?alt=media&token=edc21349-6520-4d5e-bb59-ac0dd4cc851c"></amp-img>

{% include general/net-promoter-score.html %} 

> Cada vez que nuestros usuarios realizan alguna acción a través de nuestros componentes, Angular se encarga de detectar los diferentes cambios para mantener la vista de nuestros usuarios actualizada.

<!--summary-->

## ¿ Que es la detección de cambios en Angular ?

La *detección de cambios* es un mecanismo donde Angular observa el estado interno de las estructuras de datos (Objetos, Array, etc) en un App y lo hace visible en la vista.

En *Angular* una aplicación es un arbol de componentes donde componentes padres contienen componentes hijos y asi sucesivamente.

<amp-img width="776" height="440" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-08-Angular-Detect-Changes%2F1.png?alt=media&token=bf7e9d9a-9434-4fd9-9b07-402d7a38661c"></amp-img>

y cada componente tiene un detector de cambios responsable por el chequeo de los *bindings* definidos en su *template*.

<amp-img width="800" height="609" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-08-Angular-Detect-Changes%2F0_4Y6oSUUSw-DdNq_V.png?alt=media&token=2381da2f-ec37-4ce3-876e-458ae1b66b27"></amp-img>

Los cambios en los estados de una App pueden ser causados por tres cosas: 

*Eventos:* Click, Submit, MouseOver, etc.

*XHR:* Peticiones para buscar info en APIs.

*Timers:* setTimeout(), setInterval().

Todos son asincronos y deben ser detectados para asegurar el correcto funcionamiento de nuestra App.

## ¿ Como se lleva a cabo la detección de Cambios ?

Como dijimos anteriormente todos los componentes tienen un *CD* asociado y funciona como un arbol de padres e hijos.

<amp-img width="825" height="582" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-08-Angular-Detect-Changes%2FCaptura%20de%20pantalla%202018-08-09%20a%20la(s)%206.55.09%20a.%20m..png?alt=media&token=f0ea06c3-3dcf-4118-b04b-c1860c41075d"></amp-img>

Ahora digamos que el usuario hizo un *click* en un componente, esto notifica a Angular que se efectuo una acción del usuario y alerta a todos los *CD* de arriba hacia abajo.

<amp-img width="826" height="585" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-08-Angular-Detect-Changes%2FCaptura%20de%20pantalla%202018-08-09%20a%20la(s)%206.55.22%20a.%20m..png?alt=media&token=338c9d96-3b84-4bb4-b255-2a6e3127b893"></amp-img>

Algo interesante es que al realizar la detección de cambios de arriba hacia abajo nos da predictibilidad en el resultado. Ahora te estaras preguntando Angular tiene que recorrer todo el arbol para notificar de cambios a todos los componentes? La respuesta es que por defecto *Si* pero se puede mejorar utilizando Objetos inmutables y/o Observables.

## Objetos inmutables.

Podemos saltar algunos chequeos si por ejemplo un componente solo depende de un `input()` que no cambia.

```ts
@Component({
  template: `
    <h2>{{vData.name}}</h2>
    <span>{{vData.email}}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class VCardCmp {
  @Input() vData;
}
```

Para decirle a Angular que el componente no cambia le hemos agregado la estrategia de detección `OnPush`. y de esta manera si tenemos un arbol muy grande de componentes podriamos ahorrarnos muchos chequeos.

<amp-img width="829" height="588" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-08-Angular-Detect-Changes%2FCaptura%20de%20pantalla%202018-08-09%20a%20la(s)%206.57.36%20a.%20m..png?alt=media&token=bfb2391e-c82a-48e3-adcb-0f0925ffab65"></amp-img>

## Observables.

Los observables son una manera moderna de interactuar con APIs y eventos y nos permite observar los cambios sobre un flujo de datos. Supongamos el siguiente componente.

```ts
@Component({
  template: '{{counter}}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class CartBadgeCmp {

  @Input() addItemStream:Observable<any>;
  counter = 0;

  ngOnInit() {
    this.addItemStream.subscribe(() => {
      this.counter++; // application state changed
    })
  }
}
```

Pero debido a que hemos seleccionado su estrategia de cambio a `onPush()` un evento no disparara el `CD` del componente. Para ajustar esto debemos utilizar el componente `ChangeDetectorRef` y el metodo `markForCheck()`. el cual le dice a Angular que lo tenga en cuenta en el chequeo de cambios. haciendo los cambios respectivos nuestro componente debe quedar como sigue.

```ts
@Component({
  template: '{{counter}}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class CartBadgeCmp {

  @Input() addItemStream:Observable<any>;
  counter = 0;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.addItemStream.subscribe(() => {
      this.counter++; // application state changed
      this.cd.markForCheck(); // marks path
    })
  }
}
```
y de esta manera obtendriamos algo asi.

<amp-img width="829" height="586" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-08-Angular-Detect-Changes%2FCaptura%20de%20pantalla%202018-08-11%20a%20la(s)%2010.51.54%20p.%20m..png?alt=media&token=f45403a6-e485-4ae6-88c0-42211733c24c"></amp-img>

Bueno esto es todo por el dia de hoy, espero haya sido de utilidad :)

# Referencias.

[ANGULAR CHANGE DETECTION EXPLAINED](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html#whats-change-detection-anyways)

[Change Detection in Angular](https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c)


