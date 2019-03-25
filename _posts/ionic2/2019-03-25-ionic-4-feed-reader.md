---
layout: post
title: "Creando un Feed Reader en Ionic 4"
date: 2019-03-25
tags: [ionic]
categories: ionic2
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-03-25-ionic-4-feed-reader%2FionicCover.png?alt=media&token=7e8f3d08-1b0d-40a5-972d-c61cf0753958"
editname: "ionic2/2019-03-25-ionic-4-feed-reader.md"
repo: "https://github.com/ng-classroom/feedApp"
remember: true
video: true
versions:
  - title: 'ionic'
    number: '4.0.0'
  - title: 'ionic-cli'
    number: '4.10.3'
---

> En esta ocasión vamos a aprender a hacer un pequeño `feedReader` y aprender un poco sobre como se hacen las cosas en `ionic 4`.

<amp-img width="1440" height="800" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-03-25-ionic-4-feed-reader%2FionicCover.png?alt=media&token=7e8f3d08-1b0d-40a5-972d-c61cf0753958"></amp-img>

{% include general/net-promoter-score.html %} 

Lo primero que tenemos que hacer es actualizar nuestro `CLI` si no lo has hecho aun tendras que ejecutar:

```
$npm install -g ionic
```

## Crear un nuevo proyecto con Ionic 4.

Ahora que tienes  la última versión del `CLI` debes crear una App nueva con el template `blank`.

````
$ionic start myApp blank
````

## Creando un Servicio.

Ya que tenemos nuestra App funcionando debemos crear un `servicio` para compartir los datos que tenemos en nuestra Feed con todas nuestras vistas.

````
$ionic generate service feed
````

y vamos a usar el servicio `rss2json` para obtener la data como un `json`.

```ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feed } from './model/feed';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private rssToJsonServiceBaseUrl: String = 'https://rss2json.com/api.json?rss_url=';

  constructor(
    private http: HttpClient
  ) { }

  getFeedContent(): Observable<any> {
    const fixedRSS = 'https://rss2json.com/api.json?rss_url=https://feeds.feedburner.com/Ion-book';
    return this.http.get(fixedRSS, { responseType: 'json' });
  }
}
```

{% include blog/subscribe.html %}


ya que tenemos la data a través de nuestro metodo `getFeedContent()` vamos a dibujarla en nuestro componente por defecto.

## Adaptando el home

en el `home.page.html`.

```html
{% raw %}
<ion-header>
  <ion-toolbar>
    <ion-title>
      Feed App
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>

  <ion-card *ngFor="let item of (results)">
    <ion-card-header>
      <ion-card-title>{{item.title}}</ion-card-title>
      <a href="{{item.link}}">Ver más...</a>
    </ion-card-header>
  
    <ion-card-content>
      <div [innerHTML]='item.description | slice:0:250'></div>
    </ion-card-content>
  </ion-card>

</ion-content>
{% endraw %}
```

y en el `home.page.ts`

```ts
import { Component } from '@angular/core';
import { FeedService } from '../feed.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private results: any;
  constructor(
    private feedService: FeedService
  ) {
    this.feedService.getFeedContent().subscribe(
      (response) => {
        this.results = response.items;
        console.log('data>>>', response.items);
      }
    );
  }
}
```

Si quieres ver el `streaming` de este ejercicio puedes verlo.

<amp-youtube width="560" 
            height="315"
            layout="responsive"
            data-videoid="1FWR9YAruqg"></amp-youtube>

Bueno espero que sea de utilidad y sigán programando :)