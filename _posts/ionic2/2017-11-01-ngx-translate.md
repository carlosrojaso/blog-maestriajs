---
layout: post
title: "Múltiples idiomas en una App con Ionic"
date: 2017-11-01
tags: [libs, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo106"
laucher: "https://ion-book.github.io/demo106/"
author: nicobytes
editname: "ionic2/2017-11-01-ngx-translate.md"
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-11-01-ngx-translate%2Fcover.png?alt=media&token=0367d9f5-0ca8-4b50-baa5-b61e18fdbcca"
remember: true
versions:
  - title: 'ionic'
    number: '3.8.0'
  - title: 'ionic-native'
    number: '4.3.2'
  - title: 'ionic-app-scripts'
    number: '3.0.1'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.16.0'
---

> Varias aplicaciones tienen usos en diferentes países, por lo cual las aplicaciones deben adaptar sus contenidos a varios idiomas y con [**ngx-translate**](http://www.ngx-translate.com/){:target="_blank"} podremos hacer esto con ionic.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-11-01-ngx-translate%2Fcover.png?alt=media&token=0367d9f5-0ca8-4b50-baa5-b61e18fdbcca"></amp-img>

{% include general/net-promoter-score.html %} 

# Actualización (30/10/2017)
<hr/>

Hemos actualizado este demo con el último release **Ionic 3.8**.

Ionic ahora soporta la más reciente actualización de angular 4.4.4 la cual trae el nuevo `HTTPClient` que usa `ngx-translate`, lo cual dos principales nuevas características las cuales son:

- Las respuestas viene en JSON por defecto sin necesidad de hacer map
- Usar Interceptors, lo cual facilita el manejo de tokens en la aplicación con los headers.

Pueden ver más acerca de `HTTPClient` aquí: [https://angular.io/guide/http](https://angular.io/guide/http){:target="_blank"}

<a href="https://ion-book.github.io/demo106/" target="_blank" class="btn btn-round btn-success">Ver demo</a>
<hr/>

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo106 blank --cordova
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo106
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="183" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-27-camera-and-ionic%2Ftree1.png?alt=media&token=aba780c6-5554-4ee9-b912-511564e883e3"></amp-img>
  </div>
</div>

## Paso 2: Instalar ngx-translate

Vamos a usar `ngx-translate` que es una de las librerías más estables para nuestro objetivo.

```
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
```

## Paso 3: Configuración

Ahora en el arhivo `app.module.ts` debemos crear una función que desde  `src/assets/i18n` obtengan los archivos de las traducciones de la aplicación, así:

```ts
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
```

Luego importamos las dependencias necesarias para usar `ngx-translate`, así:

```ts
...

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [...]
})
export class AppModule {}
```

{% include blog/subscribe.html %}

## Paso 4: Crear archivos de idiomas

Ahora dentro de la carpeta  `src/assets/i18n` creáremos los archivos de los idiomas en este formato:

`en.json`:

```json
{% raw %}
{
  "HELLO": "Hello",
  "WELCOME": "Welcome",
  "GREETING": "Hi, {{ value }}"
}
{% endraw %}
```

`es.json`:

```json
{% raw %}
{
  "HELLO": "Hola",
  "WELCOME": "Bienvenido",
  "GREETING": "Hola, {{ value }}"
}
{% endraw %}
```

`pt.json`:

```json
{% raw %}
{
  "HELLO": "Olá",
  "WELCOME": "Bem-vindo",
  "GREETING": "oi, {{ value }}"
}
{% endraw %}
```

## Paso 5: Agregar TranslateModule

Desde Ionic 3 podemos hacer modulos por cada pagína, lo cual hace necesario que en modúlo del Home debamos importar `TranslateModule` como parte del modúlo de la pagína `home.module.ts`, así:

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core'
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
```

## Paso 6: Definir un idioma por defecto

Ahora debemos definir en `app.component.ts`, el idioma con el cual la aplicación inicia por defecto y para esto debemos usar el provider `TranslateService` e inyectarlo en nuestro constructor. 

```ts
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = 'HomePage';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private translateService: TranslateService
  ) {
    this.platform.ready().then(() => {
      //Language
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
```

## Paso 7: Implementar pipe

Ahora solo nos queda implementar el pipe que provee `ngx-translate` para usarlo en nuestros templates:

```html
{% raw %}
<div padding>
  <h1>{{ 'HELLO' | translate }}</h1>
  <p>{{ 'WELCOME' | translate }}</p>
  <p>{{ 'GREETING' | translate:{value: '@nicobytes'} }}</p>
</div>
{% endraw %}
```

Y para hacer el cambio dinámicamente haremos uso de ion-select para escoger el idioma, esto la haremos en el archivo `src/pages/home.ts`, asi:  

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  idioms: any[] = [];

  constructor(
    private navCtrl: NavController,
    private translateService: TranslateService
  ) {
    this.idioms = [
      {
        value: 'es',
        label: 'Español'
      },
      {
        value: 'en',
        label: 'Ingles'
      },
      {
        value: 'pt',
        label: 'Portugués'
      }
    ];
  }

  choose(lang) {
    this.translateService.use(lang);
  }
}

```

Y nuestro template `home.html`: 

```html
{% raw %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Demo 106</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item>
      <ion-label>Escoge el  idioma</ion-label>
      <ion-select (ionChange)="choose($event)">
        <ion-option *ngFor="let item of idioms" [value]="item.value">
          {{ item.label }}
        </ion-option>
      </ion-select>
    </ion-item>
  </ion-list>
  <div padding>
    <h1>{{ 'HELLO' | translate }}</h1>
    <p>{{ 'WELCOME' | translate }}</p>
    <p>{{ 'GREETING' | translate:{value: '@nicobytes'} }}</p>
  </div>
</ion-content>
{% endraw %}
```

## Resultado:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-11-01-ngx-translate%2Fscreen.jpg?alt=media&token=328730cb-291b-4ff7-bfee-fd499c9a842a"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-11-01-ngx-translate%2Fscreen1.jpg?alt=media&token=1f842bcc-0f9e-476b-bcd1-7e77ea058554"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-11-01-ngx-translate%2Fscreen2.jpg?alt=media&token=345a3c03-d039-4f94-baf4-2d3f053816d2"></amp-img>
  </div>
</div>
<br>