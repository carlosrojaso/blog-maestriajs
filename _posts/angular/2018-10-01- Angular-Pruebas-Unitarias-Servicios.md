---
layout: post
title: "Angular Testing Framework + Como probar un Servicio"
keywords: "unit test, pruebas unitartias, angular, pruebas unitarias, webpack, jasmine, karma"
date: 2018-10-02
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

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-01-%20Angular-Pruebas-Unitarias-Servicios%2FComoCrearUnServicio.png?alt=media&token=f16ce078-339b-4fd5-92da-ba5cf41c0d07"></amp-img>

{% include general/net-promoter-score.html %}

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

{% include blog/subscribe.html %}

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


Esto es todo, hasta un proximo post :)