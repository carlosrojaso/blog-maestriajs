---
layout: post
title: "El HttpClient y el in-memory-web-api"
keywords: "angular, routing"
date: 2018-11-02
tags: [testing, demos]
categories: angular
repo: "https://github.com/ng-classroom/demo134"
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-02-%20Angular-HttpClient%2Fcover.png?alt=media&token=84f5e937-13ea-415f-8c57-9fa1d62f47e9"
remember: true
versions:
  - title: 'Angular CLI'
    number: '7.0.3'
---

> Cuando realizas una App con Angular en la mayoria de las oportunidades vas a tener que interactuar con servicios `Api rest` para esto Angular nos ha proveido con el HttpClient el cual nos va a permitir realizar estas tareas de una manera comoda.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-02-%20Angular-HttpClient%2Fcover.png?alt=media&token=84f5e937-13ea-415f-8c57-9fa1d62f47e9"></amp-img>

{% include general/net-promoter-score.html %}

## ¿ Que es el HttpClient ?

El `HttpClient` es una interfaz para realizar peticiones HTTP como por ejemplo `GET`, `UPDATE`, `POST` y `DELETE` entre sus ventajas estan tener la facilidad de testeo, peticiones con tipos y respuestas con objetos, Observable api y manejo de errores.

## ¿ Como configurar el HttpClient ?

Antes de empezar a usarlo debes agregarlo en tu `app.module.ts`.

```ts
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,  
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

y luego lo puedes inyectar en los servicios que vas a utilizar para interactuar con el `API`.

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyService {
  constructor(private http: HttpClient) { }
}
```

## ¿ Que es el in-memory-web-api ?

El `in-memory-web-api` es una libreria para Angular que te permite emular las operaciones CRUD sobre REST y API. Esta libreria intercepta peticiones `Http` y `HttpClient` que vayan a un servidor remoto y las redirije a un `in-memory` conjunto de datos que tu controlas.

## ¿ Como configurar el in-memory-web-api ?

Primero debes instalar la libreria.

```
$npm i angular-in-memory-web-api -D
```

Ahora vamos a crear nuestra data en un archivo que vamos a llamar `in-memory-data.service.ts`

```ts
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 0, name: 'Zero' },
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return { heroes };
  }
}
```

como ves estamos utilizando `InMemoryDbService` para que funcione correctamente con el `in-memory-web-api`.

ahora vamos a agregarlo en nuestro `app.module.ts`.

```ts
import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service.ts';

@NgModule({
  imports: [
    BrowserModule,  
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```
Si quieres usar las variables de entorno para que en produccion obtenga la data real puedes hacer.

```ts
@NgModule({
  imports: [
    BrowserModule,  
    HttpClientModule,
    environment.production ?
    [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

```

Ahora por ultimo vamos a probarlo dentro de un servicio. Creamos nuestro servicio `myServicio.service.ts`

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MyServicioService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient) {
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
        .toPromise()
        .then(response => response.json().data)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
```

Utilizar esta estrategia puede ayudarnos a avanzar con mas velocidad en escenarios donde tengamos una dependencia de `api` que debemos esperar o si no tenemos conectividad en nuestos entorno local (Ejemplo durante un vuelo).

Si quieres aprender mas sobre el `httpClient` puedes ir [aca](https://alligator.io/angular/httpclient-intro/) y del `in-memory-web-api` [aca](https://github.com/angular/in-memory-web-api).

Hasta un proximo Post :) No se olviden compartir.