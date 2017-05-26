---
layout: post
title: "Ionic generator y buenas prácticas"
tags: [news, tools, cli]
date: 2017-05-04
categories: tips
author: nicobytes
cover: "/images/posts/tips/2016-06-20-ionic-generator/cover.png"
repo: https://github.com/ion-book/demo112
versions:
  - title: 'ionic'
    number: '3.1.0'
  - title: 'ionic-native'
    number: '3.6.1'
  - title: 'ionic-app-scripts'
    number: '1.3.6'
  - title: 'ionic-cli'
    number: '2.2.3'
  - title: 'cordova-cli'
    number: '6.5.0'
---

> **Ionic generator** es una función del CLI de **ionic** para crear automáticamente piezas clave de nuestra aplicación, lo cual nos ahorra mucho tiempo y aumenta nuestra rapidez para desarrollar un proyecto.

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/tips/2016-06-20-ionic-generator/cover.png"></amp-img>

# Actualización (03/05/2017)
<hr/>

Hemos actualizado este demo con el último release de **Ionic 3**, si aún estás en alguna de las versiones anteriores puedes seguir estos pasos [de Ionic 2 a Ionic 3](https://www.ion-book.com/blog/tips/ionic-2-to-ionic3/){:target="_blank"}.

Además en este demo usamos la función de [**lazy loading** y **@IonicPage**](https://www.ion-book.com/blog/tips/ionic-page-and-lazy-loading/){:target="_blank"}. Puedes ver el repositorio [**Demo101**](https://github.com/ion-book/demo101){:target="_blank"}

<hr/>

Lo que podemos crear automáticamente usando **ionic generator** será lo siguiente:

1. components
1. directives
1. pages
1. providers

## ionic g page [PageName]

Empezaremos creando una nueva **page**, es lo que más vamos a usar en proyectos con ionic, solo tenemos que ir a nuestra terminal y dentro del proyecto ejecutar el siguiente comando:

```
ionic g page login

# Results:
√ Create src/pages/login/login.html
√ Create src/pages/login/login.module.ts
√ Create src/pages/login/login.scss
√ Create src/pages/login/login.ts
```

Cuando creamos una **page**, ionic crea la página dentro la carpeta *pages* y creará cuatro archivos por cada página (*.html*, *.scss* y *.ts*). 
El archivo `login.html` será nuestro template, el archivo `login.scss` será donde definimos los estilos de la página, `login.module.ts` será donde se define el modúlo de la página y finalmente el archivo `login.ts` donde estará toda la lógica:

`login.ts`:

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public nav: NavController) {}
}
```

y su template `login.html`: 

```html
<ion-header>
  <ion-navbar>
    <ion-title>login</ion-title>
  </ion-navbar>
</ion-header>
<ion-content padding>
</ion-content>
```


Nota: Si usas ionic 2 para continuar sin problemas debemos borrar este el archivo `login.module.ts` y quitar el decorador de **@IonicPage** que crea en la página `login.ts` y luego agregar `LoginPage` en el array de `entryComponents` y `declarations` en el archivo `app.modules.ts`.

# ionic g component [ComponentName]

Un **component** es una pieza de código que podremos usar en cualquier parte de nuestra aplicación y para un crear un **component** vamos a nuestra terminal ejecutando el siguiente comando:

```
ionic g component myComponent

# Results:
√ Create src/components/my-component/my-component.html
√ Create src/components/my-component/my-component.module.ts
√ Create src/components/my-component/my-component.scss
√ Create src/components/my-component/my-component.ts
```

**Automáticamente** ionic crea cuatro arhivos, casi como si fuera una página, pero no lo es, ya que no tendrá el decorador **@IonicPage**.

`my-component.ts`:

```ts
import { Component } from '@angular/core';
@Component({
  selector: 'my-component',
  templateUrl: 'my-component.html'
})
export class MyComponent {
  text: string = "";
  constructor() {
    this.text = 'Hello World';
  }
}
```

Nota: Si usas ionic 2 para continuar sin problemas debemos borrar este el archivo `my-component.module.ts` y luego agregar `MyComponent` en el array de `entryComponents` en el archivo `app.modules.ts`.

# ionic g directive [DirectiveName]

Una **directive** es un modificador de atributos que podemos usar en cualquier elemento de nuestra aplicación, para crearla vamos a nuestra terminal ejecutando el siguiente comando:

```
ionic g directive myDirective

# Results:
√ Create src/components/my-directive/my-directive.ts
```

ionic nos dejará nuestra nueva **directive** igualmente dentro de la carpeta **components**.

`my-directive.ts`:

```ts
import {Directive} from '@angular/core';
@Directive({
  selector: '[my-directive]' // Attribute selector
})
export class MyDirective {
  constructor() {
    console.log('Hello World');
  }
}
```

Nota: Si usas ionic 2 debemos agregar `MyDirective` en el array de `entryComponents` en el archivo `app.modules.ts`.

# ionic g provider [ProviderName]

Ahora crearemos un nuevo servicio (**provider**), los providers son los encargados de **manipular los datos** como: conexiones con REST Api, Localstorage, SQLite etc. Para crear un provider vamos a nuestra terminal ejecutando el siguiente comando:

```
ionic g provider userService

# Results:
√ Create src/providers/user-service/user-service.ts
```

el código del servicio será el siguiente:

`user-service.ts`:

```ts
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(public http: Http) {}
}
```

Nota: Recuerda que los servicios deben ser agregados al array de `providers` en `app.module.ts` y si usas el Http, deberas importar `HttpModule` así:

```ts
import { HttpModule } from '@angular/http';
import { UserService } from '../providers/user-service';

...

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DuetyApp,
    HomePage
  ],
  providers: [
    ...
    UserService,
    ...
  ]
})
export class AppModule {}
```

ionic nos dejará todos los providers dentro de una carpeta llamada *providers*.

# ionic g pipe [PipeName]

Los **pipes** son transformaciones que podemos hacer a cualquier dato desde nuestros templates, por ejemplo mostrar un texto en mayúscula, mostrar valores de moneda, formatos de fecha etc. Para crearla vamos a nuestra terminal ejecutando el siguiente comando:

```
ionic g pipe myPipe

# Results:
√ Create src/pipes/myPipe.ts
```

el código de nuestro pipe es el siguiente:

`myPipe.ts`:

```ts
import {Injectable, Pipe} from '@angular/core';

@Pipe({
  name: 'my-pipe'
})
export class MyPipe {
  transform(value: string, ...args) {
    value = value + ''; // make sure it's a string
    return value.toLowerCase();
  }
}
```

Nota: Si usas ionic 2 debemos agregar `MyPipe` en el array de `entryComponents` en el archivo `app.modules.ts`.

{% include blog/subscribe.html %}

## Buenas practicas trabajando con Ionic 3

### Tip 1: Trabajando con componentes, pipes y directives.

Ahora como cada página es un módulo deberás importar tus components, pipes y directives en cada una de las páginas, de lo contrario no funcionarán, para este paso seguiremos la guía de estilo de Angular. 

**Angular** tiene toda una sección de buenas prácticas para desarrollar una aplicación escalable y mantenible, puedes ver toda la guía [aqui](https://angular.io/docs/ts/latest/guide/style-guide.html){:target="_blank"}. Vamos seguir la regla [STYLE 04-10](https://angular.io/docs/ts/latest/guide/style-guide.html#!#04-10){:target="_blank"}, que nos dice como crear un módulo compartido que será implementando en otros módulos. Ha este módulo lo nombraremos **SharedModule**.

Ionic crear una carpeta de componentes y pipes pero nosotros lo organizaremos nuestros components, directives y pipes en base a la buena práctica de Angular de esta manera:

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="574" height="307" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree2.png"></amp-img>
  </div>
</div>

Nota: en el módulo compartido solo van components, pipes y directives NO providers estos si deben ser incluidos solo una vez en la aplicación, y siguen estando declarados en `app.module.ts` en el array de providers.

Nuestro archivo shared.module.ts, quedará de esta manera:

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemUserComponent } from './components/item-user/item-user';
import { HighlightDirective } from './directives/highlight/highlight';
import { ReversePipe } from './pipes/reverse';

@NgModule({
  declarations: [
    ItemUserComponent,
    HighlightDirective,
    ReversePipe,
  ],
  imports: [],
  exports: [
    ItemUserComponent,
    HighlightDirective,
    ReversePipe,
  ]
})
export class SharedModule {}
```

Y ahora donde queramos usar cualquiera de estos componentes en una de nuestras páginas, debemos importar el módulo `SharedModule` en el módulo de la página así:

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { UsersPage } from './users';

@NgModule({
  declarations: [
    UsersPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersPage),
    SharedModule
  ],
  exports: [
    UsersPage
  ]
})
export class UsersModule {}
```

### Tip 2: Usando el SDK ionic dentro de componentes propios

Si dentro de nuestros propios componentes queremos usar alguna funcionalidad de ionic, como usar ion-list, ion-item, alerts, modals etc, debemos agregar `IonicModule` dentro del módulo SharedModule, asi:

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { ItemUserComponent } from './components/item-user/item-user';
import { HighlightDirective } from './directives/highlight/highlight';
import { ReversePipe } from './pipes/reverse';

@NgModule({
  declarations: [
    ItemUserComponent,
    HighlightDirective,
    ReversePipe,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ItemUserComponent,
    HighlightDirective,
    ReversePipe,
  ]
})
export class SharedModule {}
```

### Tip 3: Importar **HttpModule**

Ahora debemos agregar `HttpModule` en nuestro archivo `app.module.ts`, este paso es muy importante si dentro de la aplicación se usa la dependencia `Http`:

```ts
import { HttpModule } from '@angular/http';
...

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: RavenErrorHandler },
  ]
})
export class AppModule {}
```
 
Nuestro proyecto quedará de una forma más ordenada y con un mayor control, todo esto lo podemos hacer manualmente pero sin duda con **ionic generator** podemos ahorrar tiempo valioso en la creación de cada uno de estos.

Como parte final hemos hecho un repositorio de ejemplo con esta arquitectura y cómo usar correctamente **@IonicPage**. El proyecto está organizado así:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="346" height="173" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree3.png"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <amp-img width="270" height="72" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree5.png"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <amp-img width="370" height="300" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree6.png"></amp-img>
  </div>
</div>  

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="460" height="626" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree4.png"></amp-img>
  </div>
</div>