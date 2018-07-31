---
layout: post
title: "Angular: Como crear un Servicio."
date: 2018-07-31
tags: [angular, servicio]
categories: tips
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-07-30-Angular-Crear-Servicio%2FCrearUnServicio.png?alt=media&token=19e8ad21-593b-4966-b6c5-df7c18803ac9"
editname: "angular/2018-07-30-Angular-Crear-Servicio.md"
repo: "https://github.com/ion-book/demo127"
versions:
  - title: 'Angular CLI'
    number: '6.1.1'
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-07-30-Angular-Crear-Servicio%2FCrearUnServicio.png?alt=media&token=19e8ad21-593b-4966-b6c5-df7c18803ac9"></amp-img>

{% include general/net-promoter-score.html %} 

> Cuando estamos creando nuestros componentes ocurre que muchas veces debemos compartir información entre ellas y los `@input` e `@output` no resulta ser practico ni mantenible, este es el caso del uso de los `Servicios`.

<!--summary-->

## ¿ Que es un Servicio en Angular ?

Un Servicio en Angular es el mecanismo para compartir funcionalidad entre componentes, pero si has leido mi articulo sobre [compartir información entre componentes](https://blog.ng-classroom.com/blog/angular/compartiendo-info-componentes/) debes saber que usar un servicio es una buena practica y es la recomendación debido a su mantenibilidad.

Pero antes de entrar en el contexto de Angular, miremos un poco el patrón de diseño que siguen los servicios y es el `Singleton`, en Javascript, Un Singleton sirve como un recurso compartido el cual aisla la implementación de un contexto global, es decir, puedo referenciarlo en varios lugares y llamar sus funciones. Una implementación sencilla seria:

```ts
var mySingleton = (function () {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
 
    // Singleton
 
    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }
 
    var privateVariable = "Im also private";
 
    var privateRandomNumber = Math.random();
 
    return {
 
      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
 
      publicProperty: "I am also public",
 
      getRandomNumber: function() {
        return privateRandomNumber;
      }
 
    };
 
  };
 
  return {
 
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();
 
var myBadSingleton = (function () {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
 
    // Singleton
 
    var privateRandomNumber = Math.random();
 
    return {
 
      getRandomNumber: function() {
        return privateRandomNumber;
      }
 
    };
 
  };
 
  return {
 
    // Always create a new Singleton instance
    getInstance: function () {
 
      instance = init();
 
      return instance;
    }
 
  };
 
})();
 
 
// Usage:
 
var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true
 
var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log( badSingleA.getRandomNumber() !== badSingleB.getRandomNumber() ); // true
 
// Note: as we are working with random numbers, there is a
// mathematical possibility both numbers will be the same,
// however unlikely. The above example should otherwise still
// be valid.
```
[Source](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

Algo parecido veremos en Angular utilizando el decorador `@Injectable()`.

## ¿ Como creamos un Servicio ?

Crear un Servicio es muy facil solo debemos utilizar Angular CLI y ejecutar el siguiente comando.

````
$ ng generate service myservice
````
## ¿ Como usar un Servicio ?

Angular funciona a través de inyección de dependencias lo cual significa que puedes pasar una referencia a una instancia en diferentes componentes y te permitira utilizarla en diferentes partes de tu App.

## Un ejemplo

Para este ejemplo vamos a realizar el mismo caso que utilizamos en este [Post](https://blog.ng-classroom.com/blog/angular/compartiendo-info-componentes/)

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="296" height="156" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-01-29-compartiendo-info-componentes%2Fq6kWR.png?alt=media&token=84ead24c-1bb3-4378-87cc-65853d599f9f"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
  </div>
</div>

Vamos a compartir la info entre dos componentes hermanos.

Creamos una nueva App.

````
$ ng new demo127
````

Generamos un Servicio.

````
$ ng generate service myservice
````

Generamos los componentes.

````
$ng generate component padre
$ng generate component hijo1
$ng generate component hijo2
````

Registramos el Servicio como `provider`en el ngModule archivo `src/app/app.module.ts`

```ts
...
import { MyserviceService } from './myservice.service';
...

  providers: [
    MyserviceService
  ],

```

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
<app-hijo1 [atributo]="estado"></app-hijo1>
<h2>Hijo 2</h2>
<app-hijo2 [atributo]="estado"></app-hijo2>
<button (click)="change()">Cambiar Estado</button>
```

y voy a utilizar un `@input()` en cada uno de los hijos para avisarles de un cambio de una manera sencilla.

Ahora en  mi servicio voy a crear un metodo sencillo que tome un valor booleano y lo cambie.

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor() { }

  changeStatus(status: Boolean): Boolean{
    return !status;
  }
}
```

y por ultimo voy a inyectar el servicio en el padre y los hijos.

```ts
import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.css']
})
export class PadreComponent {
  protected estado: Boolean = false;
  constructor(
    protected myService: MyserviceService
  ) { }

  change() {
    this.estado = this.myService.changeStatus(this.estado);
    console.log('Padre>estado', this.estado);
  }

}
```

```ts
import { Component, OnChanges, Input } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-hijo1',
  templateUrl: './hijo1.component.html',
  styleUrls: ['./hijo1.component.css']
})
export class Hijo1Component implements OnChanges {
  @Input() atributo: Boolean;
  protected estado1: Boolean = false;

  constructor(
    protected myService: MyserviceService
  ) { }

  ngOnChanges() {
    this.estado1 = this.myService.changeStatus(this.estado1);
    console.log('Hijo1>estado1', this.estado1);
  }

}
```

```ts
import { Component, OnChanges, Input } from '@angular/core';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-hijo2',
  templateUrl: './hijo2.component.html',
  styleUrls: ['./hijo2.component.css']
})
export class Hijo2Component implements OnChanges {
  @Input() atributo: Boolean;
  protected estado2: Boolean = false;

  constructor(
    protected myService: MyserviceService
  ) { }

  ngOnChanges() {
    this.estado2 = this.myService.changeStatus(this.estado2);
    console.log('Hijo2>estado2', this.estado2);
  }

}
```

Con esto capturaremos la acción del usuario sobre el boton y vamos a cambiar los estados en todos los componentes.

Para ver toda la implementacion ve a este [repo](https://github.com/ion-book/demo127)

Por ultimo debemos ejecutar el app.

````
$ ng serve -o
````

y listo lo puedes ver funcionando y desde la consola de chrome puedes ver los cambios.

Bueno esto es todo por el dia de hoy, espero haya sido de utilidad :)



