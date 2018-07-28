---
layout: post
title: "Clase 4 - Objetos."
date: 2017-07-18
tags: [class, ionic2]
categories: ionic2
author: carlosrojas
repo: https://github.com/ion-book/myFirstApp
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fclase4%2Fphoto.png?alt=media&token=fa8b622a-ae10-4e33-a34a-238ab162de8a"
versions:
  - title: 'ionic'
    number: '3.3.0'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.0'
  - title: 'ionic-cli'
    number: '3.4.0'
---
> Hola Ioners!!! y bienvenido a la Clase 4. Hooray!!!

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fclase4%2Fphoto.png?alt=media&token=fa8b622a-ae10-4e33-a34a-238ab162de8a"></amp-img> 

{% include general/net-promoter-score.html %} 

Hasta el momento has aprendido lo siguiente.

* [Como conectar una App con Ionic Cloud.](/blog/ionic2/clase-3-user-auth/){:target="_blank"}
* [Algunos fundamento de Ionic y las tecnologias que lo componen.](/blog/ionic2/clase-2-feed/){:target="_blank"}

Ahora, vamos a aprender sobre las Clases y los Objetos y vamos a crear nuestra vista de Noticias.

## Que es un Objeto ?

Un Objeto son datos compuestos. Combina varios tipos de datos dentro de un solo paquete. Lo que hace un objeto unico es que combina datos con codigo. 

## Que es una Clase ?

Las clases son el tipo de dato de los Objetos. Cada clase define los valores y tipos de datos que va a manejar, ademas de los procedimientos que va a utilizar para manipular esos datos y entregar resultados.

Puedes ver una clase como una plantilla y el objeto como el producto de esa plantilla.

<amp-img width="560" height="245" layout="fixed"  src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2Fobject.png?alt=media&token=1b29e488-c458-4e8e-bb87-442a1054b60f" alt=""></amp-img> 

Los objetos tienen dos caracteristicas más atributos y metodos. Atributos son propiedades que tienen los objetos y los metodos son funciones que pueden revisar los objetos. Tu puedes ver un ejemplo en esta imagén.

<amp-img width="245" height="245"  layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2FCPT-OOP-objects_and_classes_-_attmeth.svg.png?alt=media&token=d9774d2b-d8a8-4ffa-b788-9ced6212340d" alt=""></amp-img>

Si pones un ojo en tu App nosotros podemos encontrar este elemento en nuestro Proyecto.

{% include blog/subscribe.html %}

### login.ts

```ts
{% raw %}
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class LoginPage {
   myForm: FormGroup;
}
{% endraw %}
```

Si ves esta pieza de codigo, tu puedes ver las palabras ````ìmport```` y ````export````. 

````import```` es la palabra que le dice a Ionic que vas a
crear objetos de las clases que estas importando. De la misma manera la palabra ````export```` le dice a Ionic que esa clase que estas creando  podra ser 
importada en el futuro.

## Que es un Servicio ?

Para esta clase vamos a usar un servicio. Un servicio es algo asi como una pieza de codigo con metodos que tu vas a reusar en diferentes partes de tu app.
para crear un provider vamos utilziar el comando ````generate````.

```

$ ionic g provider feed

```

y ahora necesitamos decirle a Ionic que vamos a utilizar este servicio.

### app.module.ts

```ts
{% raw %}
...
import { FeedProvider } from './../providers/feed/feed';
...
@NgModule({
  declarations: [
    MyApp,
...
...
  providers: [FeedProvider]
})
export class AppModule {}
{% endraw %}
```

Ok, ahora estamos listos para continuar con nuestra App. Hasta ahora tenemos el sistema de registro de nuestra App, pero quiero que cuando las personas se registren e ingresen a mi App puedan ver una lista de noticias que se va a traer desde un [RSS](https://es.wikipedia.org/wiki/RSS). Para esto me voy a basar en el trabajo de dos grandes tutoriales que ya hacen esto.

[Ionic 2 First Drive: Making an RSS Reader](https://dzone.com/articles/time-for-ionic-2)
[Building Your Own Simple RSS Reader with Ionic](https://devdactic.com/rss-reader-ionic2/)

## Agregando Paginas nuevas.

```
$ ionic g page feedList
```

Esta pagina me mostrara una lista de todo las ultimas noticias de ese RSS, pero la informacion se va a abrir en un navegador gracias al plugin inAppBrowser.

## Agregando Plugins.

```
ionic cordova plugin add cordova-plugin-inappbrowser
ionic cordova plugin add cordova-sqlite-storage
```

aca también vamos a llamar al IonicStorage el cual nos va a permitir almacenar nuestras URLs.

Ok vamos primero que todo a crear el proveedor ```src/providers/feed/feed.ts```

```ts
{% raw %}
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FeedProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

  /*
  Based in: https://devdactic.com/rss-reader-ionic2/
  */
  export class FeedItem {
  description: string;
  link: string;
  title: string;
 
  constructor(description: string, link: string, title: string) {
    this.description = description;
    this.link = link;
    this.title = title;
  }
}
 
export class Feed {
  title: string;
  url: string;
 
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

@Injectable()
export class FeedProvider {

  constructor(private http: Http, public storage: Storage) {}
 
  public getSavedFeeds() {
    return this.storage.get('savedFeeds').then(data => {
      let objFromString = JSON.parse(data);
      if (data !== null && data !== undefined) {
        return JSON.parse(data);
      } else {
        return [];
      }
    });
  }
 
  public addFeed(newFeed: Feed) {
    return this.getSavedFeeds().then(arrayOfFeeds => {
      arrayOfFeeds.push(newFeed)
      let jsonString = JSON.stringify(arrayOfFeeds);
      return this.storage.set('savedFeeds', jsonString);
    });
  }
 
  public getArticlesForUrl(feedUrl: string) {
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%20from%20rss%20where%20url%3D%22'+encodeURIComponent(feedUrl)+'%22&format=json';
    let articles = [];
    return this.http.get(url)
    .map(data => data.json()['query']['results'])
    .map((res) => {
      if (res == null) {
        return articles;
      }
      let objects = res['item'];
      var length = 20;
 
      for (let i = 0; i < objects.length; i++) {
        let item = objects[i];
        var trimmedDescription = item.description.length > length ?
        item.description.substring(0, 80) + "..." :
        item.description;
        let newFeedItem = new FeedItem(trimmedDescription, item.link, item.title);
        articles.push(newFeedItem);
      }
      return articles
    })
  }

}
{% endraw %}
```

Ok, basicamente lo que hacemos aca es procesar el archivo XML que nos entrega el RSS y almacenarlo en articles. No te preocupes si no lo entiendes al cien por ciento, mas adelante cuando tengas mas experiencia puedes volver aca y analizarlo. 

Adicionalmente, puedes ver que hemos creado dos objetos ````Feed```` y ````FeedItem```` esto para que sea mas simple manipular la información.

Ahora ya teniendo el Servicio listo, vamos modificar la plantilla ````src/pages/home/home.html````

```html
{% raw %}
<!--
  Generated template for the HomePage page.

  See http://ionicframework.com/docs/components/#navigation for more info on
  Ionic pages and navigation.
-->
<ion-menu [content]="content">
  <ion-header>
    <ion-toolbar secondary>
      <ion-title>Recientes</ion-title>
    </ion-toolbar>
  </ion-header>
 
  <ion-content>
    <ion-list>
    <a ion-button block clear (click)="logOut()">
      Salir
    </a>
    </ion-list>
    <ion-list>
      <button menuClose ion-item *ngFor="let feed of feeds" (click)="openFeed(feed)">
        {{feed.title}}
      </button>
    </ion-list>
    <button ion-button full (click)="addFeed()" action secondary>
      <ion-icon name="add"></ion-icon> Agregar
    </button>
  </ion-content>
 
</ion-menu>
 
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
{% endraw %}
```

En la plantilla hemos creado un menu lateral el cual luego vamos a utilizar para agregar nuevas URLs, adicionalmente hemos colocado una funcion que nos va a cerrar la sesión y nos va a devolver al ````loginPage````

Toda la implementacion la veremos en la logica del componente ````src/pages/home/home.ts````

```ts
{% raw %}
import { Component, ViewChild } from '@angular/core';
import { IonicPage, AlertController, NavController, Nav, NavParams } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../../pages/login/login';
import { FeedProvider, Feed } from '../../providers/feed/feed';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
 
  rootPage = 'FeedListPage';
  feeds: Feed[];

  constructor(private navController: NavController, public auth: Auth, private feedProvider: FeedProvider, public alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logOut(){
    this.auth.logout();
    this.navController.setRoot(LoginPage);
  }

  public addFeed() {
    let prompt = this.alertCtrl.create({
      title: 'Agregar RSS URL',
      inputs: [
        {
          name: 'name',
          placeholder: 'El mejor sitio'
        },
        {
          name: 'url',
          placeholder: 'https://www.ion-book.com/feed.xml'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let newFeed = new Feed(data.name, data.url);
            this.feedProvider.addFeed(newFeed).then(
              res => {
                this.loadFeeds();
              }
            );
          }
        }
      ]
    });
    prompt.present();
  }
 
  private loadFeeds() {
    this.feedProvider.getSavedFeeds().then(
      allFeeds => {
        this.feeds = allFeeds;
      });
  }
 
  public openFeed(feed: Feed) {
    this.nav.setRoot('FeedListPage', { 'selectedFeed': feed });
  }
 
  public ionViewWillEnter() {
    this.loadFeeds();
  }

}
{% endraw %}
```

Ahora enfoquemonos en el ````FeedListPage```` me gusta empezar por explicar la plantilla ya que hace que entendamos un poco los atributos que estamos utilizando ````src/pages/feed-list/feed-list.html````

```html
{% raw %}
<ion-header>
  <ion-navbar secondary>
    <ion-buttons start>
      <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
    </ion-buttons>
    <ion-title *ngIf="!selectedFeed">Articulos</ion-title>
    <ion-title>{{selectedFeed?.title}}</ion-title>
  </ion-navbar>
</ion-header>
 
<ion-content class="feed-list" padding>
  <ion-spinner *ngIf="loading" id="feed-spinner"></ion-spinner>
  <ion-list *ngIf="selectedFeed" class="spinner">
    <ion-item *ngFor="let item of articles" (click)="openArticle(item.link)" class="feed-article">
      <div class="article-title">{{item.title}}</div><br>
      <p [innerHtml]="item.description"></p>
    </ion-item>
  </ion-list>
  <ion-row *ngIf="!selectedFeed">
    <ion-col text-center>
      Seleccione una lista.
    </ion-col>
  </ion-row>
</ion-content>
{% endraw %}
```

Ah grandes rasgos lo que estamos haciendo es traer todos los articles con la directiva ````*ngFor```` y colocarlos en componentes ````ion-item```` te invito a subir de nivel buscando los componentes y las directivas en la documentación y ver como funcionan.

Gracias a nuestro Servicio ahora nuestro componente queda mucho mas claro de leer ````src/pages/feed-list/feed-list.ts````

```ts
{% raw %}
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FeedProvider, FeedItem, Feed } from '../../providers/feed/feed';
 
@IonicPage({
  name: 'FeedListPage'
})
@Component({
  selector: 'page-feed-list',
  templateUrl: 'feed-list.html'
})
export class FeedListPage {
  articles: FeedItem[];
  selectedFeed: Feed;
  loading: Boolean;
 
  constructor(private nav: NavController, private iab: InAppBrowser, private feedProvider: FeedProvider, private navParams: NavParams) {
    this.selectedFeed = navParams.get('selectedFeed');
  }
 
  public openArticle(url: string) {
    this.iab.create(url, '_blank');
    // window.open(url, '_blank');
  }
 
  loadArticles() {
    this.loading = true;
    this.feedProvider.getArticlesForUrl(this.selectedFeed.url).subscribe(res => {
      this.articles = res;
      this.loading = false;
    });
  }
 
  public ionViewWillEnter() {
    if (this.selectedFeed !== undefined && this.selectedFeed !== null ) {
      this.loadArticles()
    } else {
      this.feedProvider.getSavedFeeds().then(
        feeds => {
          if (feeds.length > 0) {
            let item = feeds[0];
            this.selectedFeed = new Feed(item.title, item.url);
            this.loadArticles();
          }
        }
      );
    }
  }
}
{% endraw %}
```

y por ultimo vamos a agregar los estilos de la pagina a traves de SaSS en el ````src/pages/feed-list/feed-list.scs````

```scss
{% raw %}
page-feed-list {
  .feed-list {
    background: #005AA9;
    .feed-article {
      height: 80px;
      background: #ffffff;
      border-radius: 10px;
      margin-bottom: 10px;
      border-top: 0px;
      color: #666;
    }
    ion-list > .item:first-child, ion-list > .item-wrapper:first-child .item {
      border-top: 0px;
    }
    ion-list .item .item-inner {
      border-bottom: 0px;
    }
    .article-title {
      font-weight: bold;
    }
  }
 
  #feed-spinner {
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    height: 100px;
  }
}
{% endraw %}
```

Listo. ya uniendo todas estas piezas debemos tener nuestra primera App, funcionando y la puedes enviar a tu dispositivo y ver como se siente crear una App :)

Si no has entendido todo, no te preocupes, lo importante es que entiendas todo el proceso de crear un App. Ahora que ya lo entiendes puedes probar alguno de nuestros [tutoriales](https://www.ion-book.com/blog/ionic2/) y poco a poco volverte un experto en Ionic.

