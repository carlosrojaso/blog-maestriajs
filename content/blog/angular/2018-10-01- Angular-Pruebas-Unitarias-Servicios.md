---
layout: post
title: "Angular Testing Framework + Como probar un Servicio"
keywords: "unit test, pruebas unitartias, angular, pruebas unitarias, webpack, jasmine, karma"
date: 2018-10-11
tags: [testing, demos]
categories: angular
repo: "https://github.com/ng-classroom/demo130"
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-01-%20Angular-Pruebas-Unitarias-Servicios%2FComoCrearUnServicio.png?alt=media&token=f16ce078-339b-4fd5-92da-ba5cf41c0d07"
remember: true
versions:
  - title: 'Angular CLI'
    number: '6.1.1'
  - title: 'karma'
    number: '1.7.1'
  - title: 'karma-jasmine'
    number: '1.1.2'
---

> Escribir pruebas unitarias nos ayudará a reducir de forma significativa los errores que puedan llegar a producción, en este articulo vamos a ver como realizarlas en un Servicio.

<!--summary-->

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-01-%20Angular-Pruebas-Unitarias-Servicios%2FComoCrearUnServicio.png?alt=media&token=f16ce078-339b-4fd5-92da-ba5cf41c0d07">



## Consideraciones para el HTTP.

- Las peticiones HTTP son un poco lentas y a medida que vamos agregando más Pruebas vamos a ver como va tomar mucho más tiempo a medida que crece nuestro Test Suite.

- Si estamos sin conexión o el *Servidor* es innacesible nuestras pruebas van a romperse debido al Timeout. Nuestras pruebas pueden estar bien pero nos generara un error.

## ¿ Que es un Stub ?

*Stubs* son objetos que creamos en el momento de la prueba para obtener un comportamiento para las dependencias que estamos utilizando en nuestras pruebas.

## ¿ Que es un Mock ?

Un *Mock* son objetos que representan parte de una dependencia en nuestra prueba. Normalmente, los Mocks van a ser utilizados por mas de una Prueba a través de todo el Conjunto de Pruebas. 

## ¿ Cual es la diferencia entre un Mock y un Stub ?

La gran diferencia entre Mock y Stub es que los Mocks nos permiten probar el comportamiento de algo, mientras el Stub nos permite probar el estado de algo.

Aunque ambos nos permiten conocer el resultado de algo, con un Mock también estamos interesados en como se logro ese resultado.



## Preparando nuestro Servicio.

Vamos a crear un Servicio sencillo que va a hacer peticiones a [SWAPI](https://swapi.co/) y nos devolvera un personaje que enviaremos.

Primero vamos a crear una App nueva con el Angular CLI.

````
$ng new demo130
````

Luego vamos a generar un nuevo servicio ubicados desde la carpeta del proyecto.

````
$ng generate myService
````

y agregaremos el servicio al ngModule `app.module.ts`.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MyServiceService } from './my-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [MyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Ahora vamos a nuestros Servicio `my-service.service.ts`.

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  protected swapiUrl = 'https://swapi.co/api/people/';

  constructor(private http: HttpClient) { }

  getCharacter(): Observable<any> {
    const characterNumber = 9;
    return this.http.get(this.swapiUrl + characterNumber + '/');
  }
}
```

y lo agregaremos en el componente root, para observar lo que nos devuelve `app.component.ts`.

```ts
import { Component, OnInit } from '@angular/core';
import { MyServiceService } from './my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo130';
  character: any;

  constructor(private myServiceService: MyServiceService) {}

  ngOnInit() {
    this.myServiceService.getCharacter().subscribe(
      (response) => {
        this.character = response;
      }
    );
  }
}
```

y lo vamos a mostrar en la plantilla `app.component.html`.

```html
{ raw }
<div style="text-align:center">
{{character | json}}
</div>
{ endraw }
```

## Testeando nuestro Servicio.

Cuando creamos un Servicio utilizando el Angular CLI, Se crea un archivo `my-service.service.ts` y un `my-service.service.spec.ts` en el ultimo archivo es que vamos a trabajar para crear pruebas adicionales.

```ts
import { TestBed, inject, async } from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { MyServiceService } from './my-service.service';

describe('MyServiceService', () => {

  const mockResponse = {
    'name': 'Biggs Darklighter',
    'height': '183',
    'mass': '84',
    'hair_color': 'black',
    'skin_color': 'light',
    'eye_color': 'brown',
    'birth_year': '24BBY',
    'gender': 'male',
    'homeworld': 'https://swapi.co/api/planets/1/',
    'films': [
        'https://swapi.co/api/films/1/'
    ],
    'species': [
        'https://swapi.co/api/species/1/'
    ],
    'vehicles': [],
    'starships': [
        'https://swapi.co/api/starships/12/'
    ],
    'created': '2014-12-10T15:59:50.509000Z',
    'edited': '2014-12-20T21:17:50.323000Z',
    'url': 'https://swapi.co/api/people/9/'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyServiceService]
    });
  });

  describe('get data', () => {
    it('should get results',
    inject([HttpTestingController, MyServiceService], (httpMock: HttpTestingController, myServiceTested: MyServiceService) => {
      const swapiUrl = 'https://swapi.co/api/people/9/';
      myServiceTested.getCharacter()
      .subscribe(
        (res) => {
          expect(res).toEqual(mockResponse);
        }
      );
      const req = httpMock.expectOne(swapiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    })
  );
  });
});
```

Cada vez que escribimos pruebas con dependencias debemos preguntar al Injector de Angular que nos provea con las instancias de estas clases.

```ts
inject([Class1, /* ..., */ ClassN], (instance1, /* ..., */ instanceN) => {
  // ... testing code ...
})
```

Aca puedes observar varias cosas. Lo primero es que hemos importado las dependencias necesarias para realizar el `httpMock` y realizar la simulación de nuestra llamada HTTP. Lo segundo que hemos creado un `mockResponse` en el cual hemos simulado la respuesta de nuestro servicio y por ultimo nos hemos asegurado de que el metodo de nuestro Servicio responda exitosamente. 

Esto es todo, hasta un proximo post :)