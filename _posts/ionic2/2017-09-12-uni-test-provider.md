---
layout: post
title: "Pruebas unitarias en Ionic: Providers"
keywords: "unit test, pruebas unitartias, ionic, pruebas unitarias ionic, webpack, jasmine, karma"
date: 2017-09-12
tags: [testing, demos]
categories: ionic2
repo: "https://github.com/ng-classroom/demo117"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-12-uni-test-provider%2Fcover.jpg?alt=media&token=1c49a982-16a7-416c-babd-36efc209f37c"
remember: true
versions:
  - title: 'ionic'
    number: '3.6.1'
  - title: 'ionic-native'
    number: '3.12.1'
  - title: 'ionic-app-scripts'
    number: '2.1.4'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.9.2'
---

> En las secciones pasadas ya preparamos el entorno para pruebas con [Karma](https://www.ion-book.com/blog/ionic2/unit-test-config-ionic/){:target="_blank"} y también aprendimos las bases de [Jasmine](https://www.ion-book.com/blog/ionic2/intro-jasmine/){:target="_blank"} para hacer pruebas, ahora vamos a hacer pruebas a un elemento clave de angular los providers.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-12-uni-test-provider%2Fcover.jpg?alt=media&token=1c49a982-16a7-416c-babd-36efc209f37c"></amp-img>

{% include general/net-promoter-score.html %}

Vamos a escribir pruebas a el provider `LoggerProvider`, este provider cumplirá con la función de registrar los errores de un array de forma organizada, puede ser muy útil para que desde este provider se envien los registros de errores a sistemas especiales como por ejemplo [Sentry](https://sentry.io/welcome/){:target="_blank"}.

Para iniciar este provider no va a tener ninguna dependencia, así podemos probar el provider sin tener que hacer inyección de dependencias, en el próximo artículo haremos pruebas a un provider con la dependencia de `http`.

Aplicaremos TDD, es decir primero se escriben las pruebas y luego el código, pero debemos entender que los providers hacen parte de las bases de Angular, así como los components, directives y pipes, por eso Angular dentro del framework nos ofrece herramientas para poder crear un ambiente de una aplicación y poder correr pruebas sobre ella.

Lo primero que haremos será crear el provider `LoggerProvider` con [ionic generator](https://www.ion-book.com/blog/tips/ionic-generator/){:target="_blank"}:

```
ionic g provider logger
```

Luego vamos a crear el archivo de pruebas llamado `logger.spec.ts`, debería quedar así:

<amp-img width="852" height="141" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-12-uni-test-provider%2Fscreen1.png?alt=media&token=06b0a09b-2587-4c3e-b59b-60de55176cf4"></amp-img>

Debemos quitar las dependencias que tiene `LoggerProvider`, así:

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerProvider {

  constructor() {
    console.log('Hello LoggerProvider Provider');
  }

}
```

Para que Karma y Jasmine entiendan el entorno de Angular debemos hacer uso de las herramientas de Angular y preparar el contexto de este provider en `logger.spec.ts`:

```ts
import { TestBed, inject } from '@angular/core/testing';
import { LoggerProvider } from './logger';

describe('Service: LoggerService', () => {

  //Arrange
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LoggerProvider, useClass: LoggerProvider },
      ]
    })
  });

});
```

Si notamos usamos `TestBed` para crear un módulo de testing, es decir `TestBed` nos crea todo un ambiente para las artefactos de Angular (providers, components, directives y pipes) y asi correr pruebas. En este caso solo vamos a hacer pruebas al provider `LoggerProvider` por lo cual será el único provider que tendrá el módulo de pruebas.

Ahora podemos escribir la primer prueba y será una simple prueba que verifique si el servicio puede ser inyectado sin problemas, así:

```ts
it('should be created', inject([LoggerProvider], (service: LoggerProvider) => {
  expect(service).toBeTruthy();
}));
```

Como vemos aquí usamos `inject` que es otra utilidad de Angular, su función es que podemos inyectar dentro de cada `it` (caso de prueba) las dependencias.

Ahora si se corren las pruebas el resultado deberá ser:

```
npm test
```

<amp-img width="862" height="415" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-12-uni-test-provider%2Fscreen2.png?alt=media&token=f9bc25a7-6135-41bb-9e12-e46dfcd67992"></amp-img>

Vemos que es resultado de la primer prueba fue exitoso!

Ahora vamos a empezar a planear las funcionalidades de `LoggerProvider`

1. Debe contar con un registro de todos los logs.
1. Debe tener un método que registre un error y guarde este error en el registro de logs.
1. Debe tener un método que registre warning y guarde este warning en el registro de logs.

### Escribir pruebas a logError

Debemos planear cómo esperamos que responsa este método luego de ejecutar la función, para esto vamos a tener tres condiciones para saber si este método cumplio con su trabajo.

1. Debe recibir dos parámetros: el error y un mensaje.
1. Debe registrar el error en un array de errores.
1. Debe concatenar la palabra ‘ERROR: ’ al mensaje de error.

Asi quedaría la prueba para este método:

```ts
describe("Test for logError", ()=>{
    
  it('should return "ERROR: error message"', inject([LoggerProvider], (service: LoggerProvider) => {
    
    service.logError(new Error("error error"), "error message");
    expect(service.logs[0]).toEqual("ERROR: error message");
  }));

});
```

Si corremos las pruebas va a fallar ya que no hemos creado el código que cumpla la prueba que hemos escrito, ahora se escribirá el código que cumpla con esta prueba, así:

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerProvider {

  logs: string[] = [];

  constructor() {
    console.log('Hello LoggerProvider Provider');
  }

  logError(error: Error, msg: string): void{
    let logMsg = {
      level: 'error',
      extra:{
        title: `ERROR: ${msg}`
      }
    };
    console.error(logMsg.extra.title, error);
    this.log(error, logMsg);
  }

  private log(error: Error, logMsg): void{
    this.logs.push(logMsg.extra.title);
    //send error to SENTRY;
  }

}
```

Si se corren las pruebas de nuevo ahora mostrará que pasaron sin problema, así:

<amp-img width="758" height="198" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-12-uni-test-provider%2Fscreen3.png?alt=media&token=f9bc25a7-6135-41bb-9e12-e46dfcd67992"></amp-img>


{% include blog/subscribe.html %}

### Escribir pruebas a logWarning

Debemos planear cómo esperamos que responsa este método luego de ejecutar la función, para esto vamos a tener tres condiciones para saber si este metodo cumplio con su trabajo (parecido a logError).

1. Debe recibir dos parámetros el error y un mensaje.
1. Debe registrar el error en un array de errores.
1. Debe concatenar la palabra WARNING: ’ al mensaje de error.

Asi quedaría la prueba para este método:

```ts
describe("Test for logWarning", ()=>{

  it('should return "WARNING: warning message"', inject([LoggerProvider], (service: LoggerProvider) => {
    
    service.logWarning(new Error("warning error"), "warning message");
    expect(service.logs[0]).toEqual("WARNING: warning message");
  }));

});
```

Si corremos las pruebas va a fallar ya que no hemos creado el código que cumpla la prueba que hemos escrito, ahora se escribirá el código que cumpla con esta prueba, así:

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerProvider {

  logs: string[] = [];

  constructor() {
    console.log('Hello LoggerProvider Provider');
  }

  logError(error: Error, msg: string): void{
    let logMsg = {
      level: 'error',
      extra:{
        title: `ERROR: ${msg}`
      }
    };
    console.error(logMsg.extra.title, error);
    this.log(error, logMsg);
  }

  logWarning(error: Error, msg: string): void{
    let logMsg = {
      level: 'warning',
      extra:{
        title: `WARNING: ${msg}`
      }
    };
    console.warn(logMsg.extra.title, error);
    this.log(error, logMsg);
  }

  private log(error: Error, logMsg): void{
    this.logs.push(logMsg.extra.title);
    //send error to SENTRY;
  }

}
```

Si se corren las pruebas de nuevo ahora mostrará que pasaron sin problema, así:

<amp-img width="767" height="340" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-12-uni-test-provider%2Fscreen4.png?alt=media&token=f9bc25a7-6135-41bb-9e12-e46dfcd67992"></amp-img>

Bien ya tenemos las pruebas para los dos métodos de `LoggerProvider` pero también es bueno hacer un prueba individual al registro de logs y lo haremos así:

```ts
describe("Test for log register", ()=>{
    
  it('should register four logs', inject([LoggerProvider], (service: LoggerProvider) => {

    service.logError(new Error("error error"), "error message");
    service.logWarning(new Error("warning error"), 'warning message');
    service.logError(new Error("error error"), "error message");
    service.logWarning(new Error("warning error"), 'warning message');
    expect(service.logs[0]).toEqual("ERROR: error message");
    expect(service.logs[1]).toEqual("WARNING: warning message");
    expect(service.logs[2]).toEqual("ERROR: error message");
    expect(service.logs[3]).toEqual("WARNING: warning message");
  }));

});
```

Esta prueba verifica que el registro de logs funcione al enviar varios de logs por medio de los métodos.

Ahora se corremos las pruebas vemos que todas las pruebas han corrido exitosamente!

<amp-img width="840" height="629" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-12-uni-test-provider%2Fscreen5.png?alt=media&token=94f57e1d-c8a2-4957-930b-3a8602e58659"></amp-img>

Finalmente nuestro arhivo `logger.spec.ts`, queda así:

```ts
import { TestBed, inject } from '@angular/core/testing';
import { LoggerProvider } from './logger';

describe('Service: LoggerService', () => {

  //Arrange
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LoggerProvider, useClass: LoggerProvider },
      ]
    })
  });

  it('should be created', inject([LoggerProvider], (service: LoggerProvider) => {
    expect(service).toBeTruthy();
  }));

  describe("Test for logError", ()=>{
    
    it('should return "ERROR: error message"', inject([LoggerProvider], (service: LoggerProvider) => {
      
      service.logError(new Error("error error"), "error message");
      expect(service.logs[0]).toEqual("ERROR: error message");
    }));

  });

  describe("Test for logWarning", ()=>{
    
    it('should return "WARNING: warning message"', inject([LoggerProvider], (service: LoggerProvider) => {
      
      service.logWarning(new Error("warning error"), "warning message");
      expect(service.logs[0]).toEqual("WARNING: warning message");
    }));
  
  });

  describe("Test for log register", ()=>{
    
    it('should register three logs', inject([LoggerProvider], (service: LoggerProvider) => {

      service.logError(new Error("error error"), "error message");
      service.logWarning(new Error("warning error"), 'warning message');
      service.logError(new Error("error error"), "error message");
      service.logWarning(new Error("warning error"), 'warning message');
      expect(service.logs[0]).toEqual("ERROR: error message");
      expect(service.logs[1]).toEqual("WARNING: warning message");
      expect(service.logs[2]).toEqual("ERROR: error message");
      expect(service.logs[3]).toEqual("WARNING: warning message");
    }));

  });
    

});
```

Y con esto podemos terminar las pruebas para `LoggerProvider`, recordemos que la función clave de este servicio es centralizar el manejo de errores para luego enviarlos a un sistema de errores como [Sentry](https://sentry.io/welcome/){:target="_blank"}, eso lo veremos después.
