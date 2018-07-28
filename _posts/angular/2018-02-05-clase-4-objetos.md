---
layout: post
title: "Clase 4 - Objetos."
date: 2018-02-05
tags: [class, angular]
categories: angular
author: carlosrojas
repo: https://github.com/ion-book/firstAngular
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-05-clase-4-objetos%2Fclase4.png?alt=media&token=41339d25-3ffd-4365-aba9-ad3176121672"
versions:
  - title: 'Angular CLI'
    number: '1.6.1'
  - title: 'Angular'
    number: '5.0'
  - title: 'angularfire2'
    number: '5.0.0-rc.4'
---
> Los objetos en programación son una gran forma de abstraer la complejidad de los sistemas a piezas más pequeñas que pueden ser reutilizadas constantemente.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-05-clase-4-objetos%2Fclase4.png?alt=media&token=41339d25-3ffd-4365-aba9-ad3176121672"></amp-img> 

{% include general/net-promoter-score.html %} 

Si has mirado nuestra App hasta este punto y los ```Componentes```, y ```Servicios``` que hemos creado podrias haber visto que se repite todo el tiempo.

````ts
import { Component } from '@angular/core';
````

o

````ts
export class AppComponent
````

Esto es que gracias a ES6, Typescript y su implementación en Angular hemos estado utilizando Objetos y una Programación Orientada a Objetos en nuestra App. En esta ocasión vamos a aprender sobre las Clases y los Objetos mientras finalizamos nuestro Lector de RSS con Angular. Lo primero es que vayas observando todo el codigo en el [repo](https://github.com/ion-book/firstAngular) ya que no lo colocare por completo acá. Dico esto, comencemos...

## Que es un Objeto ?

Un Objeto son datos compuestos. Combina varios tipos de datos (String, Integer,etc) dentro de un solo paquete. Lo que hace un objeto unico es que combina datos con codigo. 

## Que es una Clase ?

Las clases son el tipo de dato de los Objetos. Cada clase define los valores y tipos de datos que va a manejar, ademas de los procedimientos que va a utilizar para manipular esos datos y entregar resultados.

Puedes ver una clase como una plantilla y el objeto como el producto de esa plantilla.

<div class="row wrap">
  <div class="col col-md-10 col-lg-10">
  </div>
  <div class="col col-md-80 col-lg-80">
    <amp-img width="560" height="245" layout="responsive"  src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2Fobject.png?alt=media&token=1b29e488-c458-4e8e-bb87-442a1054b60f" alt=""></amp-img> 
  </div>
  <div class="col col-md-10 col-lg-10">
  </div>
</div>

Vamos a crear un tipo de datos que llamaremos ```feed```y que a su vez va a contener otros dos tipos de datos ```FeedInfo``` y ```FeedEntry```

### model/feed-entry.ts

```ts
export interface FeedEntry {
    title: string,
    link: string,
    guid: string,
    pubDate: Date,
    categories: Array<string>,
    author: string,
    thumbnail: string,
    description: string,
    content: string
}  
```

### model/feed-info.ts

```ts
export interface FeedInfo {
    title: string,
    link: string,
    author: string,
    description: string,
    image: string
  } 
```

y 

### model/feed.ts

```ts
import { FeedInfo } from './feed-info';
import { FeedEntry } from './feed-entry';

export interface Feed {
  status: string,
  feed: FeedInfo,
  items: Array<FeedEntry>
}
```

Esta las utilizaremos para que sea mas facil la manipulacion de la información que vamos obteniendo desde nuestro RSS. 

Los objetos tienen dos caracteristicas más atributos y metodos. Atributos son propiedades que tienen los objetos y los metodos son funciones que pueden revisar los objetos. Tu puedes ver un ejemplo en esta imagén.



<div class="row wrap">
  <div class="col col-md-33 col-lg-33">
  </div>
  <div class="col col-md-34 col-lg-34">
    <amp-img width="245" height="245"  layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2FCPT-OOP-objects_and_classes_-_attmeth.svg.png?alt=media&token=d9774d2b-d8a8-4ffa-b788-9ced6212340d" alt=""></amp-img>
  </div>
  <div class="col col-md-33 col-lg-33">
  </div>
</div>

{% include blog/adAngular.html %}

## Que es un Servicio ?

Un servicio es algo asi como una pieza de codigo con metodos que tu vas a reusar en diferentes partes de tu app.
para crear un Servicio vamos utilziar el comando ````ng generate```` que ya realizara todo por nosotros con el Angular CLI.

```

$ ng generate service feedService

```

y en este debe vamos a crear tres metodos ```getFeedContent()```, ```extractFeeds()```, y ```handleError()``` los cuales van a obtener nuestro Feed y con el servicio ```rss2json``` lo vamos a compartir a JSON para luego procesarlo en nuestra app:

### feed-service.service.ts

```ts
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Feed } from './model/feed'

@Injectable()
export class FeedServiceService {

  protected rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';
  
  constructor(
    private http: Http
  ) { }

  getFeedContent(url: string): Observable<Feed> {
    return this.http.get(this.rssToJsonServiceBaseUrl + url)
            .map(this.extractFeeds)
            .catch(this.handleError);
  }

  protected extractFeeds(res: Response): Feed {
    let feed = res.json();
    return feed || { };
  }

  protected handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

```


## Que es un Pipe ?

Cuando estamos obteniendo información de distintas fuentes como los RSS o API Rest normalmente no viene de una manera amigable para el usuario. Los pipes son una forma de hacer transformaciones de información de los datos que le estamos mostrando a nuestro usuario de una manera sencilla de declarar dentro de nuestra plantilla. 

````
$ ng g pipe pipe/strip-html-tags
````

y tendra lo siguiente:

### pipe/strip-html-tags.pipe.ts

````ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtmlTags'
})
export class StripHtmlTagsPipe implements PipeTransform {

  private tagBody: string = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
  private tagOrComment: RegExp = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + this.tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + this.tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + this.tagBody
    + ')>',
    'gi');

  transform(value: string): string {
    let oldHtml;
    do {
      oldHtml = value;
      value = value.replace(this.tagOrComment, '');
    } while (value !== oldHtml);
    return value.replace(/</g, '&lt;');
  }

}
````

Crearemos el componente ```feed-card``` el cual va a ser la forma de mostrar cada noticia

````
$ ng g component feed-card
````

y escribiremos:

```html
{% raw %} 
<p-panel >
    <p-header><a href='{{ feed.link }}'>{{feed.title}}</a> - {{feed.pubDate | date:'dd-MM-yyyy'}}   </p-header>
    {{feed.description | stripHtmlTags | slice:0:500 }}...
    <p-footer>
    <a href='{{ feed.link }}'>Leer Mas...</a>
    </p-footer>
</p-panel>
{% endraw %}
```
y

```ts
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {

  @Input() feed: any;

  constructor() { }

  ngOnInit() {
  }

  openLinkInBrowser() {
    window.open(this.feed.link);
  }

}

```


Si eres observador podras ver ```stripHtmlTags``` el cual es el pipe que hemos creado con anterioridad y ```slice``` el cual es un pipe que otorga Angular para dividir la info que se muestra.

y por ultimo vamos a completar nuestro componente home.

````
$ ng g component home
````

```html
<div>
  <h1 class="center">Ng-Classroom</h1>
  <span class="pointer-cursor"><button pButton type="button" label="Actualizar" (click)="refreshFeed()"></button> | <button pButton type="button" label="Salir" (click)="logout()"></button></span>
</div>
<br>
<app-feed-card *ngFor="let feed of feeds" [feed]="feed" ></app-feed-card>
```

y

```ts
import { Component, OnInit } from '@angular/core';
import { FeedServiceService } from '../feed-service.service';
import { UserService } from "../user.service";
import { Router } from "@angular/router";

import '../rxjs-operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  protected feedUrl: string = 'https%3A%2F%2Ffeeds.feedburner.com%2FIon-book';
  protected feeds: any;

  constructor (
    protected feedService: FeedServiceService,
    protected userService: UserService,
    protected router: Router
  ) {}

  ngOnInit() {
    this.refreshFeed();
  }

  private refreshFeed() {
    this.feedService.getFeedContent(this.feedUrl)
        .subscribe(
            feed => this.feeds = feed.items,
            error => console.log(error));
  }

  protected logout(){
    this.userService.logout;
    this.router.navigate(['login']);
  }

}

```

Listo. ya uniendo todas estas piezas debemos tener nuestra primera App, funcionando :)

Si no has entendido todo, no te preocupes, lo importante es que entiendas los conceptos y todo el proceso de crear un App. Ahora que ya lo entiendes puedes probar otro de nuestros [tutoriales](https://blog.ng-classroom.com/blog/) y poco a poco volverte un experto en Angular.

