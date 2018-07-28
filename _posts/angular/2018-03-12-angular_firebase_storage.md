---
layout: post
title: "Firebase Storage en Angular."
date: 2018-03-12
tags: [angular]
categories: angular
author: carlosrojas
repo: https://github.com/ion-book/demo126
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-03-12-angular_firebase_storage%2FTitulos.png?alt=media&token=de194e12-488e-40f9-9bf6-a655ec33062e"
editname: "angular/2018-03-12-angular_firebase_storage.md"
versions:
  - title: 'Angular CLI'
    number: '1.7.0'
  - title: 'Angularfire2'
    number: '5.0.0-rc.6'
---
> Firebase Cloud Storage esta diseñado para ayudarte a almacenar archivos generados por el usuario (Fotos, Videos) facil y rapidamente.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-03-12-angular_firebase_storage%2FTitulos.png?alt=media&token=de194e12-488e-40f9-9bf6-a655ec33062e"></amp-img> 

{% include general/net-promoter-score.html %} 

## Que es Firebase Cloud Storage ?

Cloud Storage para Firebase es un servicio de almacenamiento de objetos potente, simple y rentable construido para la escala de Google. 

Los SDK de Firebase para Cloud Storage agregan la seguridad de Google a las operaciones de carga y descarga de archivos para tus apps de Firebase, sin importar la calidad de la red. 

AngularFire2 es la libreria oficial para Firebase y Angular.

## Caracteristicas

* Basado en Observables. Usa el poder de RxJS, Angular y Firebase.

* Binding en tiempo real. Mantén tus datos sincronizados en cualquier momento.

* ngrx Friendly. Integralo con ngrx usando acciones en AngularFire basada en APIs.

## Conectando con AngularFire2 y Storage.

Instalar el Angular CLI (Si no lo tienes con anterioridad).

````
$ npm install -g @angular/cli
````

o

````
$ yarn global add @angular/cli
````

{% include blog/adAngular.html %}

Luego creamos un proyecto nuevo.

````
$ ng new demo126
````

y nos ubicamos sobre el proyecto.

Luego creamos un proyecto nuevo.

````
$ cd demo126
````

Luego de crear la cuenta en [Firebase](https://firebase.google.com/), debemos crear un proyecto en [Firebase](https://firebase.google.com/docs/web/setup) y agregar las reglas de [escritura/lectura](https://firebase.google.com/docs/storage/security/start) publica para nuestro Storage. Luego volvemos a la terminal y ejecutamos en nuestro proyecto: 

```
npm install angularfire2 firebase promise-polyfill --save
```

Ahora Debes crear el objeto `firebase` para tu app. Esto lo debemos hacer en el archivo `/src/environments/environment.ts` y reemplazar la información de la app con la que obtienes de tu proyecto en Firebase.

Define los objetos:

```ts

export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};

```

también necesitamos agregar los modulos de AngularFire2 dentro de `NgModule` `/src/app/app.module.ts`.

```ts

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

```

Ok, hasta aqui deberiamos tener todo conectado.

Ahora lo inyectamos en nuestro archivo `app.component.ts`

```ts

import { Component } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-component',
  template: ``
})
export class AppComponent {
  constructor(private storage: AngularFireStorage) { }
}

```

Nuestro archivo completo se veria asi.

```ts
import { Component } from '@angular/core';

import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  title = 'app';
  constructor(private storage: AngularFireStorage) { }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'demo126';
    const task = this.storage.upload(filePath, file);
    
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURL = task.downloadURL();
  }
}
```

y modificamos nuestra plantilla para que utilice lo que acabamos de agregar en nuestro componente.`app.component.html`

```html
{% raw %}
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
<input type="file" (change)="uploadFile($event)">
<div>{{ uploadPercent | async }}</div>
<a [href]="downloadURL | async">{{ downloadURL | async }}</a>
{% endraw %}
```
Puedes ver el resultado final en [Stackblitz](https://stackblitz.com/github/ion-book/demo126)

Bueno espero que sea de ayuda y no te olvides comentar y compartir :)