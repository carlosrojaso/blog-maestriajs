---
layout: post
title: "Como conectar una API  con Ionic 5"
date: 2020-03-23
repo: "https://github.com/ng-classroom/demo1"
categories: ionic
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-03-24-conectar-api-con-ionic%2FCover%20Blogs.png?alt=media&token=d97eba60-a189-41cb-86bb-46b5846a0d5b"
remember: true
versions:
  - title: '@ionic/angular'
    number: '5.0.0'
---

> Cuando trabajas como `Front-end` una parte fundamental es hacer peticiones hacia `APIs`, es por esto que en esta ocasion vamos a ver como hacer esto usando la última versión de `ionic-angular`.

<img width="1848" height="1039" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-03-24-conectar-api-con-ionic%2FCover%20Blogs.png?alt=media&token=d97eba60-a189-41cb-86bb-46b5846a0d5b">

 

`ionic-angular` al final es una aplicación de Angular que utiliza el `HTTPClient`.

Pueden ver más acerca de `HTTPClient` aquí: [https://angular.io/guide/http](https://angular.io/guide/http){:target="_blank"}

# Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo1
```

y elegiremos `Angular` y el template `blank`.

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo1
```

## Paso 2: Importar **HttpClientModule**

Ahora debemos agregar `HttpClientModule` en nuestro archivo `app.module.ts`, este paso es muy importante si dentro de la aplicación se usa la dependencia `HttpClient`:

```ts
...
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

# Paso 3: Crear un servicio

Vamos a crear un nuevo servicio para manejar de esta manera las peticiones hacia el API, la cual es la manera sugerida por la naturaleza del Servicio.

```
$ionic generate service api
```

ionic creará un archivo para nuestro servicio que estará en `src/app/api.service.ts.ts`.

# Paso 4: Conectarse al API

JSON Placeholder es un **REST API** que nos retorna información de prueba, pueden consultar la docs de esta API [aquí](https://jsonplaceholder.typicode.com/guide.html){:target="_blank"}.

Para conectarse solo debemos hacer una solicitud con el parámetro *id* que será un argumento el cual devolvera información relacionada con ese usuario:

```
https://jsonplaceholder.typicode.com/guide.html
```

La respuesta del API será de esta manera:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

En el servicio que creamos `ApiService` vamos a crear el metodo `getPosts` el cual nos retornara el llamado al `API` en forma de observable. El servicio completo se veria asi:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = `https://jsonplaceholder.typicode.com`;

  constructor(private http: HttpClient) { }

  getPosts(id) {
    return this.http.get(`${this.apiURL}/posts/${id}`);
  }
}
```



# Paso 5: Inyectar el servicio.

Desde el archivo `home.page.ts` vamos a inyectar a `ApiService`, de esta manera:

```ts
import { Component } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string;
  body: string;

  constructor(private apiService: ApiService) {
    this.apiService.getPosts(1).subscribe(
      (res: any) => {
        this.title = res.title;
        this.body = res.body;
      }
    );
  }

}
```

Hemos inyectado el servicio y guardar la respuesta en dos variables `title` y `body`.

# Paso 6: El template

Ahora en el template de `home.page.html` lo único que nos queda es mostrar la información de las variables que hemos actualizado:

```html
{% raw %}

<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
      Blank
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Blank</ion-title>
    </ion-toolbar>
  </ion-header>

  <div id="container">
    <strong>Conectando un API</strong>
    
    <h2>{{title}}</h2>
    <p>{{body}}</p>
  </div>
</ion-content>
{% endraw %}
```

## Resultado:

<img width="1561" height="1023" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-03-24-conectar-api-con-ionic%2FScreen%20Shot%202020-03-23%20at%209.56.43%20AM.png?alt=media&token=0d1e1478-cb17-4886-b629-e601a033dad2">