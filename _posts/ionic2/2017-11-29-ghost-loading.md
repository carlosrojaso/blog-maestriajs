---
layout: post
title: "Ghost Loading con Angular 5 y Ionic 3+"
keywords: "Ghost Loading, Skeleton, Skeleton Card Component, Indicador de carga"
date: 2017-11-29
tags: [angular 5, demos]
categories: ionic2
author: GiovanniCamana
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-29-ghost-loading%2FThe%20Art%20of%20Building%20Apps%20with%20Javascript..png?alt=media&token=581d9cb1-7e5b-4e08-a5ce-8ee3f5d1c39e"
editname: "ionic2/2017-11-29-ghost-loading.md"
versions:
  - title: 'angular'
    number: '5.0.1'
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-native'
    number: '4.4.0'
  - title: 'ionic-app-scripts'
    number: '.1.2'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.19.0'
---

> Crear un apps que brinde a los usuarios una gran experiencia requiere un trabajo adicional. Evitar cargar pantallas, flashes de pantalla y saltos de página son solo algunas de las cosas que puede hacer para ayudar a mejorar su experiencia..
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-29-ghost-loading%2FThe%20Art%20of%20Building%20Apps%20with%20Javascript..png?alt=media&token=581d9cb1-7e5b-4e08-a5ce-8ee3f5d1c39e" alt="Validaciones en Formularios"></amp-img>

{% include general/net-promoter-score.html %} 
<hr/>

## Iniciando el proyecto

Lo primero que tenemos que hacer es iniciar un proyecto ionic, vamos a  nuestro terminal y ejecutamos.

```
ionic start ghost-loading blank --cordova
```

Una vez terminado, nos ubicamos en la carpeta del proyecto con nuestro editor favorito.

## Generamos Provider Ghost
Luego en el terminal usando ionic CLI generaremos un provider ghost con la siguiente linea:

```
ionic g provider ghots
```
y se creara una carpeta dentro de `src`, con el nombre de `providers` y dentro de ella el `ghost` con el archivo `ghots.ts`

Dentro del archivo `ghots.ts` vamos importar
```ts
...
import { BehaviorSubject } from "rxjs/BehaviorSubject";
```

y completamos con lo siguiente :

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
@Injectable()
export class GhotsProvider {

	private _isLoading = new BehaviorSubject<Object>(false);
	public isLoading = this._isLoading.asObservable();

	public setLoading(isLoading: boolean) {
		this._isLoading.next({
			isLoading: isLoading
		})
	}
}
```

Cuando un observador se suscribe a un BehaviorSubject, comienza emitiendo el elemento emitido más recientemente por la fuente Observable (o un valor semilla / predeterminado si aún no se ha emitido ninguno) y luego continúa emitiendo cualquier otro elemento emitido más tarde por la fuente Observable ( s).

Puede leer más de  [BehaviorSubject](http://reactivex.io/documentation/subject.html){:target="_blank"}

{% include blog/subscribe.html %}

Ahora tenemos que verificar si en `app.module.ts` dentro de los providers esta declarado `GhotsProvider`, Ionic CLI se encarga automaticamente de declararlo, pero no esta demas verificar para luego no tener problemas.


## Ghot Component

Ahora volvemos a generar con ionic CLI un componente de la siguiente forma:
```
ionic g component cs-ghost
```
Ahora en la carpeta Components encontrara `cs-ghots` con 3 archivos, pero solo usaremos  `cs-ghost.ts` , `cs-ghost.scss` y `cs-ghost.html` podemos eliminarlo.

ahora nuestro archivos `cs-ghost.ts` quedara de la siguiente forma:

```ts
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GhotsProvider } from './../../providers/ghots/ghots';

@Component({
	selector: 'cs-ghost',
	host: { '[class.isLoading]': 'isLoading' },
	template: `<ng-content *ngIf="!isLoading"></ng-content>`
})
export class CsGhostComponent {

	public isLoading: boolean = true;
	private isLoadingSubscription: Subscription;
	private data: Object = {};

	constructor(
		private _ghostPrv: GhotsProvider
	) {
		this.isLoadingSubscription = this._ghostPrv.isLoading.subscribe(data => this._updateLoading(data));
	}

	public ngOnDestroy() {
		this.isLoadingSubscription.unsubscribe();
	}

	private _updateLoading(data) {
		if (!data) return
		this._setData(data)._process();
	}

	private _setData(data: Object) {
		this.data = data;
		return this;
	}

	private _process() {
		return this._setLoading();
	}


	private _setLoading() {
		this.isLoading = this.data['isLoading']
	}

}

```
Ahora agregaremos un poco de css, para dar la forma a nuestro skeleton que lo haremos con ionic, para eso abriamos el archivo `cs-ghost.scss`:

```scss
@keyframes pulse {
  0% {
    background-color: rgba(color($colors, dark), .15);
  }
  50% {
    background-color: rgba(color($colors, dark), .1);
  }
  100% {
    background-color: rgba(color($colors, dark), .15);
  }
}

cs-ghost {
  display: inherit;
  &.isLoading {
    &:after {
      display: inline-block;
      content: '\00a0';
      margin-bottom: 5px;
      width: 100%;
      border-radius: 6px;
      animation: pulse 2s infinite;
      animation-timing-function: ease-in-out;
    }
    &.cs-input {
      &:after {
        width: 90%;
        height: 45px;
      }
    }
    &.paragraph {
      &:after,
      &:before {
        width: 100%;
      }
      &:before {
        display: inline-block;
        content: '\00a0';
        width: 100%;
        border-radius: 6px;
        animation: pulse 2s infinite;
        animation-timing-function: ease-in-out;
        margin-bottom: 5px;
      }
    }
    &.xl {
      &:after {
        width: 100%;
      }
    }
    &.lg {
      &:after {
        width: 90%;
      }
    }
    &.md {
      &:after {
        width: 50%;
      }
    }
    &.sm {
      &:after {
        width: 25%;
      }
    }
    &.xs {
      &:after {
        width: 20px;
        min-width: 20px;
      }
    }
  }
  /* sort hacky with images..*/
  &.img {
    &.isLoading {
      &.square {
        &:after {
          width: 100%;
          height: 25rem;
          border-radius: 0;
        }
      }
      &:after {
        width: 4rem;
        height: 4rem;
        margin: auto;
        display: block;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
}

```

Terminado esto de css hay una cosa muy esencial que tenemos que hacer y es en `components.module.ts` aqui tenemos que importar y declarar en imports `CommonModule` y quedaria algo asi:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CsGhostComponent } from './cs-ghost/cs-ghost';
@NgModule({
	declarations: [
		CsGhostComponent],
	imports: [
		CommonModule
	],
	exports: [
		CsGhostComponent
	]
})
export class ComponentsModule { }


```

Ahora tenemos que verificar que `components.module.ts` este declarado en `app.module.ts` dentro de imports y sino  pues lo hacemos manualmente.

```ts
...
imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
...
```

## Ahora contruiremos un Skeleton Card

Una vez que tengamos listo el componente y proveedor  con angular pasamos hacer la parte visual con los componentes de ionic.
Para esto nos localizaremos en la carpeta `page > home` en la cual escribiremos el siguiente código :

```ts
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GhotsProvider } from '../../providers/ghots/ghots';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	constructor(
		public navCtrl: NavController,
		private _ghotsPrv: GhotsProvider
	) { }

	ngOnInit() {
		this._setLoaded()
		this.reload();
	}
	refresh() {
		this._setLoaded()
		this.reload();
	}
	reload() {
		this._ghotsPrv.setLoading(true)
		this._setLoaded()
	}

	private _setLoaded() {
		setTimeout(() => {
			this._ghotsPrv.setLoading(false)
		}, 1000);
	}
}


```

Ahora en `home.html` agregaremos lo siguiente:

```html
<ion-header>
  <ion-navbar>
    <ion-title>Social Card</ion-title>
    <ion-buttons right>
      <button ion-button icon-only (click)="refresh()">
        <ion-icon name="refresh"></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-card>
    <ion-item>
      <ion-avatar item-start>
        <cs-ghost class="img isLoading">
          <img src="https://unsplash.it/80/80?image=1012">
        </cs-ghost>
      </ion-avatar>
      <cs-ghost class="sm isLoading">
        <h2>Marty McFly</h2>
      </cs-ghost>
      <cs-ghost class="lg isLoading">
        <p>November 5, 1955</p>
      </cs-ghost>
    </ion-item>
    <cs-ghost class="img square isLoading">
      <img src="https://unsplash.it/300/200?image=344">
    </cs-ghost>
    <ion-card-content>
      <cs-ghost class="paragraph isLoading">
        <p>Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?!
          Whoa. This is heavy.</p>
      </cs-ghost>
    </ion-card-content>
    <ion-row>
      <ion-col>
        <cs-ghost class="lg isLoading">
          <button ion-button color="primary" clear small icon-start>
            <ion-icon name='thumbs-up'></ion-icon>
            12 Likes
          </button>
        </cs-ghost>
      </ion-col>
      <ion-col>
        <cs-ghost class="lg isLoading">
          <button ion-button color="primary" clear small icon-start>
            <ion-icon name='text'></ion-icon>
            4 Comments
          </button>
        </cs-ghost>
      </ion-col>
      <ion-col align-self-center text-center>
        <cs-ghost class="lg isLoading">
          <ion-note>
            11h ago
          </ion-note>
        </cs-ghost>
      </ion-col>
    </ion-row>
  </ion-card>
</ion-content>

```

Como último paso deberiamos de ejecutar el poyecto ionic
```
$ ionic serve
```
y en el navegador  de su elección `http://localhost:8100/`.

