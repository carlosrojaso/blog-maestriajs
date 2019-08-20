---
layout: post
title: "Usando AWS Appsync con GraphQL y Angular."
keywords: "AWS Appsync, Angular, GraphQL"
date: 2019-08-21
tags: [tools, angular]
categories: angular
author: carlosrojas
repo: https://github.com/ng-classroom/awsappsync
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-08-240-conectar-angular-aws-appsync-graphql%2F2.png?alt=media&token=e1bec285-1cd3-4510-bd6b-5778968adc63"
editname: "angular/2019-08-240-conectar-angular-aws-appsync-graphql.md"
versions:
  - title: 'angular/core'
    number: '7.0.0'
---

> 

<!--summary-->

<amp-img width="820" height="312" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-08-240-conectar-angular-aws-appsync-graphql%2F2.png?alt=media&token=e1bec285-1cd3-4510-bd6b-5778968adc63"></amp-img>

{% include general/net-promoter-score.html %}

## ¿ Que es GraphQL ?

GraphQL es una tecnologia la cual te permite hacer peticiones a un API y obtener exactamente lo que quieres del sistema. Lo primero es que vamos a entender algunos terminos para poder avanzar en esta implementacion.

- *Resolver* es una función que retorna algun dato.
- *Queries*  es una petición a un servidor por algun campo o datos.
- *Mutation* es un cambio que le hacemos a los datos que estamos recibiendo.
- *Suscription* es un flujo de datos que vamos a escuchar en tiempo real.
- *Types* son una descripción de los datos que estamos recibiendo.

Un ejemplo sencillo de `GraphQL` puede ser enviando el siquiente `Query`:

```js
{
  me {
    name
  }
}
```

Puede producir:

```js
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

## ¿ Que es AWS Appsync ?

`AWS Appsync` es una solución de Amazon que te permite crear APIs facilmente los cuales vienen listos para soportar `GraphQL`.

Este servicio te permite crear una cuenta gratis [acá](https://aws.amazon.com/appsync/).

## ¿ Que es Amplify CLI ?

Es la herramienta de comandos que podemos instalar en nuestros computadores para poder integrar facilmente nuestras Apps Web y Moviles con los AWS Services.

Para instalarlo, Nos vamos a ubicar en la raiz de nuestro proyecto y ejecutar en una terminal:

```
$ npm install -g @aws-amplify/cli
```


{% include blog/subscribe.html %}

## Implementando AWS Appsync en Angular

Primero, vamos a crear nuestro nuevo proyecto en Angular con el CLI. 

````
$npm install -g @angular/cli
$ng new awsappsync
````

Luego, vamos a empezar a conectar appsync.

````
$ amplify init
````

<amp-img width="1160" height="442" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-08-240-conectar-angular-aws-appsync-graphql%2FScreen%20Shot%202019-08-19%20at%204.25.15%20PM.png?alt=media&token=e4f15ab9-6a3e-45dc-8b07-47d064e8c3a4"></amp-img>

````
$npm install bootstrap --save
````

Ahora las agregamos en el `angular.json`

````js
"styles": [
              "src/styles.scss",
              "node_modules/bootstrap/dist/css/bootstrap.min.css"
            ],
            "scripts": [
              "node_modules/crypto-js/crypto-js.js",
              "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
            ]
````

Con esto ya deberiamos tener todo configurado para poder utilizar `CryptoJS`  y  `Bootstrap` para ser utilizados en nuestra app.

Para mantener las cosas simples vamos a importar en `app.module.ts` las cosas necesarias para poder usar formularios en nuestra App.

```ts
...
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
...

@NgModule({
...
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
...
})
export class AppModule { }

```

Luego vamos a nuestra plantilla en `app.component.html` y creamos nuestro formulario para poder agregar un texto, una llave y encriptar/desencriptar nuestro texto.

```html
{% raw %}
<h1 class="text-center">Encriptar/Desencriptar con AES</h1>  
  
<br>  
<div>  
  <div class="row">  
    <div class="col-sm-6">  
      <button type="button" class="btn btn-primary btn-lg btn-block">  
        Encriptar  
      </button>  
      <br>  
      <div class="form-group">  
        <label for="txtTextToConvert">Texto plano</label>  
        <input type="text" class="form-control" placeholder="Ingresa texto a encriptar" [(ngModel)]="plainText">  
      </div>  
  
      <div class="form-group">  
        <label for="txtPassword">Llave</label>  
        <input type="password" class="form-control" placeholder="Ingresa llave de encripción" [(ngModel)]="encPassword">  
      </div>  
      <textarea class="form-control" readonly rows="3">{{conversionEncryptOutput}}</textarea>  
      <br>  
      <button type="button" class="btn btn-success float-right" (click)="convertText('encrypt')">Encriptar</button>  
    </div>  
    <div class="col-sm-6">  
      <button type="button" class="btn btn-dark btn-lg btn-block">  
        Desencriptar  
      </button>  
      <br>  
      <div class="form-group">  
        <label for="txtTextToConvert">Texto encriptado</label>  
        <input type="text" class="form-control" placeholder="Ingrese el texto que quieres desencriptar" [(ngModel)]="encryptText">  
      </div>  
  
      <div class="form-group">  
        <label for="txtPassword">Llave</label>  
        <input type="password" class="form-control" placeholder="Ingrese la llave para desencriptar" [(ngModel)]="decPassword">  
      </div>  
      <textarea class="form-control" readonly rows="3">{{conversionDecryptOutput}}</textarea>  
      <br>  
      <button type="button" class="btn btn-success float-right" (click)="convertText('decrypt')">Desencriptar</button>  
    </div>  
  </div>  
</div> 
{% endraw%}
```

y por ultimo agregamos la logica en nuestro controlador en `app.component.ts`

```ts
import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  title = 'EncryptionDecryptionSample';

  plainText: string;
  encryptText: string;
  encPassword: string;
  decPassword: string;
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;

  constructor() {
  }

  convertText(conversion: string) {
      if (conversion === 'encrypt') {
        this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
      } else {
        this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
      }
  }
}
```

puedes observar que aca usamos los metodos `CryptoJS.AES.encrypt()` y `CryptoJS.AES.decrypt()` para encriptar/desencriptar nuestro texto.

Al final deberiamos tener algo asi.

<amp-img width="1242" height="637" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-06-24-Encriptar-Desencriptar-Angular%2FCaptura%20de%20Pantalla%202019-06-23%20a%20la(s)%2011.48.50%20a.%20m..png?alt=media&token=727786b5-73dc-4689-9603-9719b5600446"></amp-img>