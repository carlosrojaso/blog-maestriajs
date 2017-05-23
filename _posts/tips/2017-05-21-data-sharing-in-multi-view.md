---
layout: post
title: "Angular Y Observables: Como compartir información entre diferentes componentes de la aplicación de forma eficiente ?"
keywords: "angular2, angular ,observable, performance en angular, como mejorar el rendimiento en angular, performance, change detection strategy"
date: 2017-05-16
tags: [tips, angular2, observable, rxjs, reactive programming, ChangeDetectionStrategy, ChangeDetectionStrategy.OnPush, performance]
categories: tips
author: javico2609
cover: "https://d2slcw3kip6qmk.cloudfront.net/marketing/techblog/observables-angular2/data-flow.png"
---

> Una práctica común en las aplicaciones de `angular` para almacenar los datos para después ser utilizados en los diferentes componentes es guardarlo en sus `services` pues estos son inyectados como `singlenton`, hasta aquí vamos bien pues de cierta forma los datos no se repiten y tenemos un punto común de acceso a los datos desde todos los componentes. ¿Dónde nos llegan los dolores de cabeza? Es a la hora de propagar el cambio de estos datos a través de todos los componentes, normalmente lo hacemos utilizando los `events` pero conlleva a un esfuerzo bastante grande y de cierta forma la aplicación queda muy acoplada y frágil ante los cambios futuros ya sea por bugs o nuevos requerimientos. En este articulo intentaremos darle solución a esta problemática utilizando la [**reactive programming**](http://reactivex.io/rxjs/){:target="_blank"} en particular la especificación para javascript `ngrx`.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://d2slcw3kip6qmk.cloudfront.net/marketing/techblog/observables-angular2/data-flow.png"></amp-img>

## Paso 1: Iniciando el proyecto e incluir semantic-ui

```
ng new angular-observable
cd angular-observable
```

en el `index.html` incluir las dependencias de semantic-ui para darle algún  estilo al componente.

```html
        <!doctype html>
        <html lang="en">

        <head>
          <meta charset="utf-8">
          <title>ServicesObservable</title>
          <base href="/">

          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" type="image/x-icon" href="favicon.ico">

          <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.js"></script>

        </head>

        <body>
          <app-root>Loading...</app-root>
        </body>

        </html>
```

## Paso 2: Crear un componente y el Servicio que se utilizará como contenedor de los datos

```
ng generate component user-list
ng generate service user
```

## Paso 3: Componente UserList

`user-list-component.html`
```html
   {% raw %}
     <table class="ui compact celled definition table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Registration Date</th>
            <th>E-mail address</th>
            <th>Premium Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td class="collapsing">
              <div class="ui fitted slider checkbox">
                <input type="checkbox" [checked]="user.isPremium"> <label></label>
              </div>
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.registration }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.isPremium }}</td>
          </tr>
        </tbody>
        <tfoot class="full-width">
          <tr>
            <th></th>
            <th colspan="4">
              <div class="ui right floated small primary labeled icon button" (click)="createUser($event)">
                <i class="user icon" ></i> Add User
              </div>
              <div class="ui small button" (click)="approveAll($event)">
                Approve All
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
   {% endraw %}
```

El componente tiene como entrada la lista de los `users` y tiene dos eventos de salida uno para crear un nuevo usuario y otro para aprobar que todos los usuarios tengan una cuenta Premium.

`user-list-component.ts`
```ts
     import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

     @Component({
       selector: 'user-list',
       templateUrl: './user-list.component.html',
       styleUrls: ['./user-list.component.css'],
       changeDetection: ChangeDetectionStrategy.OnPush
     })
     export class UserListComponent implements OnInit {
       @Input() users;
       @Output() onCreateUser: EventEmitter<any> = new EventEmitter();
       @Output() onApproveAll: EventEmitter<any> = new EventEmitter();

       constructor() { }

       ngOnInit() {
       }

       createUser() {
         this.onCreateUser.emit({
           name: 'Prueba',
           email: 'prueba@gmail.com',
           registration: 'May 11, 2016',
           isPremium: false
         });
       }

       approveAll() {
         this.onApproveAll.emit();
       }
     }
```

## Paso 4: User Service

En el servicio utilizaremos BehaviorSubject que representara el mecanismo mediante el cual se va a mantener sincronizado los datos.

```ts
    import { BehaviorSubject, Observable } from 'rxjs/Rx';
    import { Injectable } from '@angular/core';

    interface IUser {
      name: string;
      registration: string;
      email: string;
      isPremium: boolean;
    }

    export const DUMMY_DATA = [
      {
        name: 'John Lilki',
        registration: 'September 14, 2013',
        email: 'jhlilk22@yahoo.com',
        isPremium: true
      },
      {
        name: 'Jamie Harington',
        registration: 'January 11, 2014',
        email: 'jamieharingonton@yahoo.com',
        isPremium: true
      },
      {
        name: 'Jill Lewis',
        registration: 'May 11, 2014',
        email: 'jilsewris22@yahoo.com',
        isPremium: true
      }
    ];

    @Injectable()
    export class UserService {
      private usersSubject = new BehaviorSubject([]);
      private users: IUser[];

      constructor() { }

      getUsers(): Observable<IUser[]> {
        return this.usersSubject.asObservable();
      }

      private refresh() {
        // Emitir los nuevos valores para que todos los que dependan se actualicen.
        this.usersSubject.next(this.users);
      }

      createNewUser(user: IUser) {
        this.users.push(user);
        this.refresh();
      }

      loadDummyData() {
        this.users = DUMMY_DATA;
        this.refresh();
      }

      approveAll() {
        this.users.forEach(user => user.isPremium = true);
        this.refresh();
      }
    }
```

## Paso 4: App Component

`app.component.html`
```html
   {% raw %}
    <div class="ui container" style="margin-top: 5%">
      <user-list [users]="users$ | async" (onCreateUser)="createUser($event)" (onApproveAll)="approveAll($event)"></user-list>
    </div>
   {% endraw %}
```

`app.component.ts`

```ts
    import { Observable } from 'rxjs/Rx';
    import { UserService } from './providers/user.service';
    import { Component, ChangeDetectionStrategy } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css'],
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    export class AppComponent {
      private users$: Observable<any[]>;

      constructor(private userService: UserService) { }

      ngOnInit() {
        this.users$ = this.userService.getUsers();
        this.userService.loadDummyData();
      }

      createUser(user) {
        this.userService.createNewUser(user);
      }

      approveAll() {
        this.userService.approveAll();
      }
    }
```

<br />

De esta forma no solo creamos un mecanismo que nos ayuda a mantener los datos de la aplicación de forma consistente, también desacoplamos la dependencia de los componentes y aumentamos el performace de la aplicación pues podemos desactivar el ` ChangeDetectionStrategy`  Cambiándolo a `OnPush`.

## Resultado

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/tips/2017-05-21-data-sharing-in-multi-view/data-sharing-in-multi-view.gif"></amp-img>