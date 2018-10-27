---
layout: post
title: "Ionic 4: Primer acercamiento"
date: 2018-08-27
tags: [ionic]
categories: ionic2
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-07-28-ionic-4-beta%2Fionic-4-beta.png?alt=media&token=9974bfa5-93b6-4ad8-a5ed-ec7eedd606ef"
editname: "ionic2/2018-08-27-ionic-4-gettingStarted.md"
repo: "https://github.com/ng-classroom/demo128"
versions:
  - title: 'ionic'
    number: '4.0.0-beta.0'
  - title: 'ionic-cli'
    number: '4.1.0'
---

> Ionic 4 fue anunciado hace unas semanas y trajo consigo varias [cosas nuevas](https://blog.ng-classroom.com/blog/news/ionic-4-beta/), pero ¿ Que tanto cambio ? 

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-07-28-ionic-4-beta%2Fionic-4-beta.png?alt=media&token=9974bfa5-93b6-4ad8-a5ed-ec7eedd606ef"></amp-img>

{% include general/net-promoter-score.html %} 

En este post vamos a realizar una App sencilla con Ionic 4 y ver que tanto cambio con respecto a Ionic 3, ¿ Voy a tener que volver a aprender todo?

# Comenzando.

Lo primero es saber que vamos a hacer. Para este tutorial vamos a realizar una App sencilla que obtenga imagenes de [Giphy](https://developers.giphy.com/) y los muestre en un componente de Ionic.

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <amp-img width="227" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-27-ionic-4-gettingStarted%2FMockup.png?alt=media&token=9cb252f7-d023-4052-8675-7cc2ebb35e94"></amp-img>
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>

y nos guiaremos por la nueva documentación del equipo de [Ionic](https://beta.ionicframework.com/docs).

# Instalando.

Lo primero es actualizar nuestro Ionic CLI para que llegue a su ultima version.

````
$ npm install -g ionic
````

Luego debemos comenzar una nueva App y OJO con la nueva opción.

````
$ionic start demo128 blank --type=angular
````

y podemos iniciar nuestro servidor con

````
$ionic serve
````

# Creando nuestro servicio.

Ahora tenemos que crear un pequeño servicio y obtener un ApiKey de Giphy. Según la documentacion ahora la manera de crear un servicio es:

````
$ionic generate service api/giphy
````

No olvidar agregarlo al `ngModule`.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GiphyService } from './api/giphy.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    GiphyService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Esto nos genera los archivos necesarios para trabajar en nuestro Servicio.

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  protected giphyUrl = 'https://api.giphy.com/v1/gifs/search';
  protected giphyApiKey = 'xxxxx';

  constructor(private http: HttpClient) { }

  getImage(query): Observable<any> {
    const requestURL = `${this.giphyUrl}?api_key=${this.giphyApiKey}&q=${query}`;
    return this.http.get(requestURL);
  }
}
```

Le agregamos nuestro metodo `getImage()` el cual va a hacer la petición a Giphy.

# Creando nuestra vista.

Por defecto el proyecto `blank` de Ionic viene con el componente `home` el cual vamos a modificar para integrar nuestro servicio.

```html
{% raw %}
<ion-header>
  <ion-toolbar>
    <ion-title>
      demo128
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content padding>
  <ion-card>
    <ion-img *ngIf="item?.image" src="{{ item?.image }}"></ion-img>
  
    <ion-card-content>
      <p text-center><ion-button (click)="shuffle()" shape="round" color="primary" fill="outline">Shuffle</ion-button></p>
    </ion-card-content>
  </ion-card>
</ion-content>
{% endraw %}
```

```ts
import { Component } from '@angular/core';

import { GiphyService } from '../api/giphy.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected item: any = {image: ''};

  constructor(
    protected giphyService: GiphyService
  ) {
    this.initialize();
  }

  initialize() {
  this.getImage();
  }

  getImage(): void {
    const emotions = ['happy', 'sad', 'depressed', 'healthy'];
    const randomNumber: number = Math.floor(Math.random() * 4) + 1; 
    this.giphyService.getImage(emotions[randomNumber - 1]).subscribe(
          (image) => {
            this.item.image = image.data[0].images.downsized_medium.url;
          }
    );
  }

  shuffle() {
    this.getImage();
  }

}
```

y listo ya con esto tenemos nuestra nueva app.

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <amp-img width="227" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-27-ionic-4-gettingStarted%2FCaptura%20de%20pantalla%202018-08-26%20a%20la(s)%206.04.24%20p.%20m..png?alt=media&token=8ded656f-bd95-424a-8a65-b51abace8da7"></amp-img>
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>

Mira todo el codigo [aquí](https://github.com/ng-classroom/demo128).

# Conclusiones

- Han cambiado algunos comandos.

- Si lo configuras con Angular no cambia mucho mas que usar los comandos del Angular CLI.