---
layout: post
title: "App con múltiples idiomas en 6 pasos."
date: 2016-10-04
tags: ionic2 translate
categories: demos
comments: true
repo: "https://ion-book.github.io/demo106/"
author: nicobytes
cover: "https://s17.postimg.org/tneheudov/translate.jpg"
remember: true
---

> Varias aplicaciones tienen usos en diferentes países, por lo cual las aplicaciones deben adaptar sus contenidos a varios idiomas y con [**ng2-translate**](https://github.com/ocombe/ng2-translate){:target="_blank"} podremos hacer esto con ionic. Este demo esta con la versión de [**Ionic RC0**](http://www.ion-book.com/news/ionic-2-release-candidate){:target="_blank"}

<img class="img-responsive" src="https://s17.postimg.org/tneheudov/translate.jpg" alt="firebase-database-and-ionic-2">

# Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2](http://www.ion-book.com/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start demo106 blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo106
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera *app*.

# Paso 2: Instalar ng2-translate

```
npm install ng2-translate --save
```

# Paso 3: Configuración

Ahora debemos importar y agregar a nuestro archivo `app.module.ts` así:

{% highlight ts linenos %}
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({ 
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
{% endhighlight %}

- En la *línea 6* importamos las dependencias que necesitamos de **ng2-translate**
- En la *línea 15* definimos las importaciones necesarias.

**Nota:** En la *línea 20* enviamos la dirección `assets/i18n` esta carpeta debe estar ubicada  en `src`.

# Paso 4: Definir idioma por defecto

Ahora debemos definir en `app.component.ts`, el idioma con el cual la aplicación inicia por defecto. 

{% highlight ts linenos %}
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TranslateService } from 'ng2-translate/ng2-translate'

import { HomePage } from '../pages/home/home';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  rootPage: any;

  constructor(
    private platform: Platform,
    private translateService: TranslateService
  ) {
    this.rootPage = HomePage;
    //Language
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
{% endhighlight %}

- En la *línea 4* importamos a `TranslateService`
- En la *línea 17* inyectamos el servcio a nuestra clase.
- En la *línea 21 y 22* definimos el idioma que seleccionaremos por defecto.

# Paso 5: Crear archivos de idiomas

Ahora dentro de la carpeta  `src/assets/i18n` es donde estarán todos los archivos de los idiomas en formato:

`en.json`:
{% highlight json %}
{
  "HELLO": "Hello",
  "WELCOME": "Welcome",
  "GREETING": "Hi, {{ value }}"
}
{% endhighlight %}

`es.json`:
{% highlight json %}
{
  "HELLO": "Hola",
  "WELCOME": "Bienvenido",
  "GREETING": "Hola, {{ value }}"
}
{% endhighlight %}

`pt.json`:
{% highlight json %}
{
  "HELLO": "Olá",
  "WELCOME": "Bem-vindo",
  "GREETING": "oi, {{ value }}"
}
{% endhighlight %}

# Paso 6: Implementar pipe

Ahora solo nos queda implementar el pipe que provee **ng2-translate** para usarlo en nuestros templates:

{% highlight html %}
{% raw %}
<div padding>
  <h1>{{ 'HELLO' | translate }}</h1>
  <p>{{ 'WELCOME' | translate }}</p>
  <p>{{ 'GREETING' | translate:{value: '@nicobytes'} }}</p>
</div>
{% endraw %}
{% endhighlight %}

Y para hacer el cambio dinámicamente haremos uso de ion-select para escoger el idioma, esto la haremos en el archivo `src/pages/home.ts`, asi:  

{% highlight ts linenos %}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from 'ng2-translate/ng2-translate'

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

{% endhighlight %}

Y nuestro template `home.html`: 

{% highlight html linenos %}
{% raw %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Home</ion-title>
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
{% endhighlight %}

# Resultado:

Ahora podemos ver el resultado ejecutando:

```
ionic serve -l
```
