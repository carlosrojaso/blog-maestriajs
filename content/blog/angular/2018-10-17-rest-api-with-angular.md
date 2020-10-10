---
layout: post
title: "Conectando una API REST con Angular"
date: 2018-10-18
repo: "https://stackblitz.com/github/ng-classroom/demo131"
categories: angular
author: carlosrojas
tags: [angular, architecture]
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-17-rest-api-with-angular%2Fcover.png?alt=media&token=dda5c986-aace-418d-8061-d553c1eb9d95"
remember: true
versions:
  - title: 'Angular CLI'
    number: '6.1.1'
---

> Una parte fundamental de cualquier aplicación es conectarse con servicios Api Rest, en este caso vamos a conectarnos con una **API REST**. Vamos a crear una aplicación que se contecte con [http://randomuser.me/](http://randomuser.me/){:target="_blank"} un API con información de usuarios aleatorios.

<img width="1848" height="1039" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-17-rest-api-with-angular%2Fcover.png?alt=media&token=dda5c986-aace-418d-8061-d553c1eb9d95">

 

# Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con Angular, vamos a nuestra terminal y ejecutamos:

```
$ng new demo131
```

Angular CLI crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo131
```

## Paso 2: Importar **HttpClientModule**

Ahora debemos agregar `HttpClientModule` en nuestro archivo `app.module.ts`, este paso es muy importante si dentro de la aplicación se usa la dependencia `HttpClient`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Paso 3: Crear un Servicio

Vamos a usar el Angular CLI para crear nuestro nuevo servicio.

```
$ng generate service user
```

Angular creará un archivo para nuestro servicio que estará en `src/app/user.service.ts`:

Recuerda que debes agregar este servicio dentro del array `providers` en `app/app.module.ts`, así:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { UserService } from './user.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Paso 4: Conectarse a Random User API

Random User es un **REST API** que nos retorna usuarios aleatoriamente, pueden consultar la docs de esta API [aquí](https://randomuser.me/documentation){:target="_blank"}.

Para conectarse solo debemos hacer una solicitud con el parámetro *results* que será la cantidad de usuarios que necesitemos así:

```
https://randomuser.me/api/?results=25
```

La respuesta de random user API será de esta manera:

```json
{
  "results": [
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "samuel",
        "last": "ross"
      },
      "location": {
        "street": "5592 pockrus page rd",
        "city": "santa ana",
        "state": "oregon",
        "postcode": 69974
      },
      "email": "samuel.ross@example.com",
      "login": {
        "username": "silverwolf434",
        "password": "blackjac",
        "salt": "d14iEZQT",
        "md5": "261a57061d35918f5c3ef7f90f4f2a80",
        "sha1": "c330ad8c974ab9982622d5d5506cfed4886a79ab",
        "sha256": "8ca4a1ca48975a69bd829de61298cd6a950dede740d4c0e755d07ee4cfc06fa5"
      },
      "registered": 1155461743,
      "dob": 1078494582,
      "phone": "(179)-102-8139",
      "cell": "(107)-396-0688",
      "id": {
        "name": "SSN",
        "value": "476-30-9095"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/80.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/80.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/80.jpg"
      },
      "nat": "US"
    }
  ],
  "info": {
    "seed": "705567e86a824a27",
    "results": 1,
    "page": 1,
    "version": "1.0"
  }
}
```

Nos retorna toda la información necesaria respecto a usuario, ahora dentro del `UserService`, vamos a crear el método `getUsers` que se encargará de obtener los datos de la API.

```ts
getUsers() {
  return this.http.get('https://randomuser.me/api/?results=25');
}
```

La clase completa quedaría así:

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  getUsers() {
    return this.http.get('https://randomuser.me/api/?results=25');
  }
}
```



# Paso 5: Inyectar el servicio.

Desde el archivo `app.component.ts` vamos a inyectar a `UserService`, de esta manera:

```ts
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo131';
  users: any[] = [];

  constructor(
    protected userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(
      (data) => { // Success
        this.users = data['results'];
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
```

Importamos el servicio `UserService` desde su ubicación, luego definiremos `users` como un array vacío, luego en el constructor inyectamos como una dependencia a `UsersService` y finalmente dentro del hook `ngOnInit` llamamos al método `getUsers` que hará la solicitud y finalmente la respuesta la asigna a `this.users`.

# Paso 6: El template

Ahora en el template de `app.component.html` lo único que nos queda es mostrar los usuarios, básicamente iteramos array de users y luego solo mostramos las atributos de cada usuario.:

```html
{% raw %}
<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
<div *ngFor='let user of users'>
    <img [src]="user.picture.medium">
    <h2>{{ user.name.first | uppercase }}</h2>
    <p>{{ user.email }}</p>
</div>


{% endraw %}
```

## Resultado:

<div class="row">
  <div class="col col-100">
    <img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-17-rest-api-with-angular%2FCaptura%20de%20pantalla%202018-10-18%20a%20la(s)%208.00.23%20a.%20m..png?alt=media&token=30cb8a06-9879-4df6-a896-21b5d9eb5874">
  </div>
</div>
<br/>

Bueno espero sea de ayuda y hasta un proximo post :)