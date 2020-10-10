---
layout: post
title: "Compartiendo info entre componentes en Angular"
date: 2018-01-29
tags: [class, angular]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-01-29-compartiendo-info-componentes%2Fcompartiendoinfo.png?alt=media&token=5070ea7b-4a75-402b-b2da-8157645d8880"
repo: https://github.com/ion-book/demo124
editname: "angular/2018-01-29-compartiendo-info-componentes.md"
versions:
  - title: 'Angular CLI'
    number: '1.6.1'
  - title: 'Angular'
    number: '5.0'
---
>> Existén ocasiones en que te encuentras con tener que enviar el estado de una variable entre 2 componentes hermanos y posiblemente no quieras hacer un Servicio solamente para compartir una sola variable, es en estas ocasiones que nos ayudamos de ```@output``` y ```@ViewChild```.

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-01-29-compartiendo-info-componentes%2Fcompartiendoinfo.png?alt=media&token=5070ea7b-4a75-402b-b2da-8157645d8880">



Pensemos por un momento en el siguiente escenario, tengo un componente padre el cual contiene dos componentes hijos y necesito enviar una variable de un componente hijo al otro.

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <img width="296" height="156" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-01-29-compartiendo-info-componentes%2Fq6kWR.png?alt=media&token=84ead24c-1bb3-4378-87cc-65853d599f9f">
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
  </div>
</div>

Lo recomendado siempre es usar Servicios para manejar variables y funciones globales, pero algunas veces probablemente no tenga sentido crear un Servicio para pasar un pequeño estado, en estos casos debemos utilizar un mecanismo de comunicacion entre componentes que son ```@input```y ```@output```. Su utilizacion es sencillo, solo debemos recordar que:

```@input:``` Es el mecanismo para enviar actualizaciones desde un padre hacia un hijo.

```@output:``` Es el mecanismo para enviar actualizaciones desde un hijo hacia un padre.

<div class="row wrap">
  <div class="col col-md-10 col-lg-10">
  </div>
  <div class="col col-md-80 col-lg-80">
    <img width="616" height="232" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-01-29-compartiendo-info-componentes%2Foutput_input_2.png?alt=media&token=a93a78d9-f3a3-4d65-a5f2-ae18043c9343">
  </div>
  <div class="col col-md-10 col-lg-10">
  </div>
</div>

Adicionalmente, como tengo mi componente padre que va ser el puente de comunicación puedo utilizar el Decorador ```@ViewChild``` para obtener una referencia de cada uno de los hijos.



Ok, para lograr esto vamos a crear una App nueva con ```Angular CLI```

````
$ng new demo124
````

y vamos a crear 3 componentes. 

````
$ng generate component padre
$ng generate component hijo1
$ng generate component hijo2
````

y vamos a modificar ```src/app/app.component.html``` para cargar el componente padre.

```html
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>

<app-padre></app-padre>
```

Luego en el componente padre vamos a cargar los hijos ```src/app/padre/padre.component.html``` en la plantilla.

```html
<p>
  padre works!
</p>
<h2>Hijo 1</h2>
<app-hijo1 #child1></app-hijo1>
<h2>Hijo 2</h2>
<app-hijo2 #child2></app-hijo2>
<button (click)="change()">Cambiar Estado</button>
```

Adicionalmente en su componente vamos a crear 2 referencias a los componentes hijos para ```src/app/padre/padre.component.ts```.

```ts
import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Hijo1Component } from "../hijo1/hijo1.component";
import { Hijo2Component } from "../hijo2/hijo2.component";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.css']
})
export class PadreComponent implements OnInit {
  @ViewChild('child1') childOne:Hijo1Component;
  @ViewChild('child2') childTwo:Hijo2Component;

  constructor() { }

  ngOnInit() {
    this.childOne.emitEvent
    .subscribe(
      res =>
      {
      console.log("Atributo:" + res);
      this.childTwo.dataShared = res;
      }
    );
  }

  change():void{
    this.childOne.function1();
  }

}
```
También me voy a suscribir a la variable que quiero comunicar para saber sus cambios en todo momento y comunicarselo al otro hijo.

Ahora en el hijo 1 ```src/app/hijo1/hijo1.component.ts``` debo emitir los cambios en el estado para comunicarselo al padre.

```ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hijo1',
  templateUrl: './hijo1.component.html',
  styleUrls: ['./hijo1.component.css']
})
export class Hijo1Component implements OnInit {
  @Output() emitEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  estado:boolean = false;

  constructor() { 
  }

  ngOnInit() {
    this.function1();
  }

  public function1(): boolean{
    let fResponse = !this.estado;
    this.estado = fResponse;
    this.emitEvent.emit(fResponse);
    return fResponse;
  }

}
```

y por último en el hijo 2 ```src/app/hijo1/hijo2.component.ts``` tengo un variable que sera modificada desde el padre.

```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hijo2',
  templateUrl: './hijo2.component.html',
  styleUrls: ['./hijo2.component.css']
})
export class Hijo2Component implements OnInit {
  @Input() dataShared:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
```

Ok, de esta manera ya tenemos nuestra información sincronizada entre los componentes hermanos.

Espero sea de utilidad y no te olvides comentar :)