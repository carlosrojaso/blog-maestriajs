---
layout: post
title: "Pruebas unitarias: HttpClient"
keywords: "unit test, pruebas unitartias, ionic, pruebas unitarias ionic, webpack, jasmine, karma"
date: 2017-10-18
tags: [testing, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo117"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-14-uni-test-http-client%2Fhttpclient.jpg?alt=media&token=d7a34901-e56e-4aae-90cb-a36cc7bf2a27"
remember: true
versions:
  - title: 'ionic'
    number: '3.7.1'
  - title: 'ionic-native'
    number: '4.3.1'
  - title: 'ionic-app-scripts'
    number: '3.0.0'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.13.0'
---

> En el último post sobre testing hablamos sobre pruebas a providers en ese artículo para escribir pruebas a providers que usan la dependencia `HttpClient`.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-14-uni-test-http-client%2Fhttpclient.jpg?alt=media&token=d7a34901-e56e-4aae-90cb-a36cc7bf2a27"></amp-img>

{% include general/net-promoter-score.html %}

Recuerda ver nuestros artículos anteriores sobre testing ya que están enlazados uno con otro:

- [Testing en Angular/Ionic](https://www.ion-book.com/blog/tips/testing-with-ionic/){:target="_blank"}
- [Configuración de entorno](https://www.ion-book.com/blog/ionic2/unit-test-config-ionic/){:target="_blank"}
- [Introducción a Jasmine](https://www.ion-book.com/blog/ionic2/intro-jasmine/){:target="_blank"}
- [Providers](https://www.ion-book.com/blog/ionic2/uni-test-provider/){:target="_blank"}

Recordemos que [Ionic 3.7](https://www.ion-book.com/blog/news/ionic-3-7/){:target="_blank"} usa `HttpClient` que es una nuevo Angular y cuenta con estas características:

- Las respuestas viene en JSON por defecto sin necesidad de hacer map
- Usar Interceptors, lo cual facilita el manejo de tokens en la aplicación con los headers.

Pueden ver más acerca de `HTTPClient` aquí: [https://angular.io/guide/http](https://angular.io/guide/http){:target="_blank"}

En este artículo se escribirán pruebas unitarias usando `HttpClient` como dependencia de un provider, ya hemos hecho un artículo donde explicamos cómo conectarse a una REST API, (está actualizado usando `HttpClient`) así que vamos a tomar como base ese servicio.

- [Conectado una API REST con Ionic](https://www.ion-book.com/blog/ionic2/rest-api-with-ionic/){:target="_blank"}

Primero hablaremos de los conceptos claves que debemos tener en cuenta.

## ¿Qué es mocking?

Son objetos simulados (pseudoobjetos, mock object, objetos de pega) a los objetos que imitan el comportamiento de objetos reales de una forma controlada.

## Consideraciones a la hora de probar Http 

Nunca se va a ser una petición real hacia un `endpoint`, ya que se trabaja con un mock de `HttpClient` que emula una petición real a un `endpoint` con esto podemos tener datos de prueba sin gastar solicitudes reales, además que si fuera un solicitud real cada vez que se corran pruebas estaríamos haciendo muchas solicitudes que al final podrían ser tomados como un ataque hacia el servidor.

## El mantra AAA (Arrange, Act, Assert)

Es un patrón que nos sugiere cómo debemos ordenar y escribir las pruebas, cada caso de prueba debería seguir el siguiente formato:

1. `Arrange`: En esta parte de preparan todas precondiciones para el caso de prueba.
1. `Act`: Se ejecuta el método o objeto el cual se quiere probar.
1. `Assert`: Verificar que el resultado obtenido sea el esperado.

Ejemplo:

```ts
describe("Test for Math.pow", () => {

  it('should return 25', () => {
    // Arrange
    const base, exponent = 5, 2;
    // Act
    const response = Math.pow(base, exponent);
    // Assert
    expect(response).toEqual(25); 
  });

});
```

Dejando estos conceptos claros vamos a empezar a escribir pruebas, recordemos que Angular nos ofrece un módulo de mocking para `HttpClient`.

## Paso 1: Importar **HttpClientModule**

Debemos agregar `HttpClientModule` en nuestro archivo `app.module.ts`, este paso es muy importante si dentro de la aplicación se usa la dependencia `HttpClient`:

```ts
...
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [...]
})
export class AppModule {}
```

## Paso 2: Crear provider

Ahora vamos a usar [ionic generator](https://www.ion-book.com/blog/tips/ionic-generator/){:target="_blank"} para crear nuestro nuevo proveedor de datos.

```
ionic g provider user
```

El servicio debe usar `HttpClient`, así:

`src/providers/user/user.ts`:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

}
```

Luego creamos un archivo llamado `user.spec.ts`, debería quedar así:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="624" height="271" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-14-uni-test-http-client%2Fscreen1.png?alt=media&token=15f5338a-d98f-48ca-96df-a3555256fde9"></amp-img>
  </div>
</div>

Ahora como este provider tiene la dependencia `HttpClient`, debemos preparar el contexto necesario para que `Karma` y `Jasmine` entiendan el contexto en el que trabaja `UserProvider
`, de esta manera:

`src/providers/user/user.spec.ts`:

```ts
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserProvider } from './user';

describe('Service: UserProvider', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: UserProvider, useClass: UserProvider },
      ],
    })
  });

  it('should be created', inject([UserProvider], (service: UserProvider) => {
    expect(service).toBeTruthy();
  }));
    

});
```

Como podemos ver debemos dar el contexto necesario para que poder probar a `UserProvider` y como este tiene la dependencia `HttpClient` debemos importar el módulo que provee esta dependencia, pero en esta ocasión no importamos el módulo `HttpClientModule` que normalmente usamos para desarrollar, esta vez vamos a usar un mock que nos provee Angular para `HttpClient` llamado `HttpClientTestingModule`.

{% include blog/subscribe.html %}

## Paso 3: Obtener dependencias

Ahora debemos obtener las dependencias como variables, para poder usar en cada caso de prueba, así:

```ts
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserProvider } from './user';

describe('Service: UserProvider', () => {

  let service: UserProvider;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: UserProvider, useClass: UserProvider },
      ],
    });
    service = TestBed.get(UserProvider);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
```

Notamos con `TestBed`obtenemos la dependencia del servicio que está probar probar  con`TestBed.get(UserProvider)` y un mock de httpClient con `TestBed.get(HttpTestingController)`.

## Paso 4: Escribiendo pruebas para getAllUsers

Debemos planear qué tareas esperamos que cumpla ese método, lo resumimos así:

- Debe hacer una solicitud al endpoint `https://randomuser.me/api/?results=25`.
- La solicitud debe ser por medio del método `GET`.
- La respuesta que retorne debe ser igual a los `mocks` de datos que esperados.
- Si estamos probando un caso de prueba en donde obtenemos una respuesta satisfactoria no debería haber ningún error retornado.

Teniendo en cuenta las funcionalidad que debe cumplir este método escribiremos el caso de prueba, así:

```ts
it('should return users', () => {
  // Arrange
  const mockResponse = {
    results: [
      {
        "gender": "male",
        "name": {
          "title": "mr",
          "first": "samuel",
          "last": "ross"
        },
        "email": "samuel.ross@example.com",
      }
    ]
  };
  let dataError, dataResponse;
  // Act
  service.getAllUsers()
  .subscribe((response) => {
    dataResponse = response['results'];
  }, (error) => {
    dataError = error;
  });
  const req = httpMock.expectOne(`https://randomuser.me/api/?results=25`);
  req.flush(mockResponse);
  // Assert
  expect(dataResponse.length).toEqual(1);
  expect(req.request.url).toEqual(`https://randomuser.me/api/?results=25`);
  expect(req.request.method).toEqual('GET');
  expect(dataError).toBeUndefined();
});
```

En la primera parte de la prueba el `Arrange` (parte de preparación), preparamos un mock de datos para la respuesta del endpoint, es decir esta sería la respuesta que normalmente esperamos que nos retorne ese endpoint al hacer esa petición.

Luego tenemos dos variables `dataResponse` y `dataError` cada una va guardar la respuesta de la solicitud y el error si este se llegara a producir.

```ts
// Arrange
const mockResponse = [{
  results: [
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "samuel",
        "last": "ross"
      },
      "email": "samuel.ross@example.com",
    }
  ]
}];
let dataError, dataResponse: any[];
```

Ahora en parte de `Act` (actuar), vamos a ejecutar el método donde recibiremos la respuesta de la solicitud.

La parte  importe que le dice al mock de `httpMock` que cuando ejecute un endpoint dado inyecte como respuesta nuestro mocks de datos.

```ts
// Act
service.getAllUsers()
.subscribe((response) => {
  dataResponse = response['results'];
}, (error) => {
  dataError = error;
});
const req = httpMock.expectOne('https://randomuser.me/api/?results=25');
req.flush(mockResponse);
```

Finalmente en el `Assert` tendremos las verificaciones para comprobar que este método cumple con lo que esperamos:

```ts
// Assert
expect(dataResponse.length).toEqual(1);
expect(req.request.url).toEqual('https://randomuser.me/api/?results=25');
expect(req.request.method).toEqual('GET');
expect(dataError).toBeUndefined();
```

Ahora si corremos este caso de prueba con `npm test`, nos dará un error ya que estamos siguiendo TDD, es decir primero escribir la pruebas y luego el código que cumpla con esta pruebas, así que crearemos el método `getAllUsers`, así:

`src/providers/user/user.ts`:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {}

  getAllUsers() {
    return this.http.get('https://randomuser.me/api/?results=25');
  }

}
```

¡Ahora si! con seguridad corremos las pruebas con `npm test` y vemos cómo este método cumple con las funcionales que esperamos:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="502" height="106" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-14-uni-test-http-client%2Fscreen2.png?alt=media&token=eb7d7423-7df0-4db5-985f-5f7b505d74a4"></amp-img>
  </div>
</div>

Así como probamos el caso donde tenemos un respuesta satisfactoria debemos probar que pasa cuando ocurre un error. Ahora haremos el caso de prueba donde probaremos cómo deberíamos reaccionar frente a un error del método `getAllUsers`, así sería vería el caso de prueba:

```ts
it('should return an error', () => {
  // Arrange
  let dataError, dataResponse: any[];
  // Act
  service.getAllUsers()
  .subscribe((response) => {
    dataResponse = response['results'];
  }, (error) => {
    dataError = error;
  });
  httpMock.expectOne('https://randomuser.me/api/?results=25')
  .error(new ErrorEvent('error'));
  // Assert
  expect(dataResponse).toBeUndefined();
  expect(dataError).toBeDefined();
});
```

Ahora si corremos de nuevo las pruebas con `npm run test` nos muestra que todas las pruebas de cumplieron como lo esperábamos. 

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="549" height="179" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-14-uni-test-http-client%2Fscreen3.png?alt=media&token=fdcd8b0b-e4df-4a02-939f-fd6c91cfbad1"></amp-img>
  </div>
</div>

Ya con esto sabemos correr pruebas unitarias servicios que usen `HttpClient`.