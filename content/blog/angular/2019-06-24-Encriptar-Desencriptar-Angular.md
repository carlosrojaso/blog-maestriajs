---
layout: post
title: "Encriptar/Desencriptar con Angular."
keywords: "encriptar, Angular, cli"
date: 2019-06-24
tags: [tools, angular]
categories: angular
author: carlosrojas
repo: https://github.com/ng-classroom/cryptojs-demo
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-06-24-Encriptar-Desencriptar-Angular%2Fcover.png?alt=media&token=e93b0a0d-50ca-405a-918a-569d2858d721"
---

> Existén ocasiones en que los mensajes que transmitimos por la WEB, especialmente, entre el Cliente y el Servidor debe ir encriptado para incrementar la seguridad de nuestros usuarios es en estos momentos que debemos Encriptar/Desencriptar esa información. 

<!--summary-->

<img width="820" height="312" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-06-24-Encriptar-Desencriptar-Angular%2Fcover.png?alt=media&token=e93b0a0d-50ca-405a-918a-569d2858d721">



## ¿ Que es Encriptar / Desencriptar ?

Encriptar consiste en el proceso con el cual ciframos un texto y lo convertimos en algo ininteligible para algún otro sistema/persona.

Desencriptar consiste en el proceso de tomar un texto cifrado y lo convertimos en un texto entendible por algún otro sistema/persona para lograr esto el receptor debe tener en su poder una llave (algo parecido a la clave que usar para entrar a un correo).

## ¿ Que es el algoritmo AES ?

El algoritmo AES (Advanced Encryption Standard) es uno de los más populares para `Encriptar` información debido a que fue diseñado para ser optimo en Hardware y Software, ademas, de soportar bloques de longitudes de 128, 192, y 256 bits lo cual es una forma de hacer que sea más dificil de `Desencriptar` sin tener la llave.

## ¿ Que es CryptoJS ?

CryptoJS es una libreria de algoritmos utilizados en criptografía y escritos en Javascript con buenas practicas y patrones resultando ser rapida y con una interfaz consistente.




## Implementando CryptoJS en Angular

Primero, vamos a crear nuestro nuevo proyecto en Angular con el CLI. 

````
$ng new cryptojsdemo
````

Luego, vamos a instalar las dependencias en nuestro proyecto.

````
$npm install crypto-js --save  
````

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

<img width="1242" height="637" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-06-24-Encriptar-Desencriptar-Angular%2FCaptura%20de%20Pantalla%202019-06-23%20a%20la(s)%2011.48.50%20a.%20m..png?alt=media&token=727786b5-73dc-4689-9603-9719b5600446">