---
layout: post
title: "Múltiples idiomas en una App con Ionic"
date: 2017-05-17
tags: [libs, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo106"
author: nicobytes
cover: "/images/posts/ionic2/2016-10-04-ngx-translate/cover.png"
remember: true
versions:
  - title: 'ionic'
    number: '3.2.1'
  - title: 'ionic-native'
    number: '3.9.2'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.1.2'
---

> Varias aplicaciones tienen usos en diferentes países, por lo cual las aplicaciones deben adaptar sus contenidos a varios idiomas y con [**ngx-translate**](http://www.ngx-translate.com/){:target="_blank"} podremos hacer esto con ionic.

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2016-10-04-ngx-translate/cover.png"></amp-img>

## Actualización (17/05/2017)
<hr/>

Hemos actualizado este demo con el último release de **Ionic 3**, si aún estas en alguna de las versiones anteriores puedes seguir estos pasos [de Ionic 2 a Ionic 3](https://www.ion-book.com/blog/tips/ionic-2-to-ionic3/){:target="_blank"}.

Ademas en este demo usamos la función de [**lazy loading** y **@IonicPage**](https://www.ion-book.com/blog/tips/ionic-page-and-lazy-loading/){:target="_blank"}. Puedes ver el repositorio [**Demo106**](https://github.com/ion-book/demo106){:target="_blank"}

<hr/>

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo106 blank
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo106
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="183" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/tree1.png"></amp-img>
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
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
```

Luego importamos las dependencias necesarias para usar `ngx-translate`, así:

```ts
...

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
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
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-10-04-ngx-translate/screen.jpg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-10-04-ngx-translate/screen1.jpg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-10-04-ngx-translate/screen2.jpg"></amp-img>
  </div>
</div>
<br>