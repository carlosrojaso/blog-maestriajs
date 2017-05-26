---
layout: post
title: "Animando items con Ionic, en 5 pasos"
date: 2017-05-23
tags: [animations, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo108"
author: nicobytes
cover: "/images/posts/ionic2/2016-12-11-animating-items-ionic/cover.jpg"
remember: true
versions:
  - title: 'ionic'
    number: '3.3.0'
  - title: 'ionic-native'
    number: '3.10.3'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.2.0'
---

> Angular integra [Web Animations API](https://web-animations.github.io/web-animations-demos/#waves/){:target="_blank"} para ejecutar animaciones en css que aprovechan la GPU del dispositivo y se puedan controlar con JS, sin duda esto provee un mayor control en las animaciones que podemos hacer.

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2016-12-11-animating-items-ionic/cover.jpg" alt="Animando items con Ionic"></amp-img>

# Actualización (21/05/2017)
<hr/>

Hemos actualizado este demo con el último release de **Ionic 3**, si aún estas en alguna de las versiones anteriores puedes seguir estos pasos [de Ionic 2 a Ionic 3](https://www.ion-book.com/blog/tips/ionic-2-to-ionic3/){:target="_blank"}.

Ademas en este demo usamos la función de **lazy loading** y **@IonicPage**. Puedes ver el repositorio [**Demo108**](https://github.com/ion-book/demo108){:target="_blank"}

<hr/>

Para hacer animaciones en Angular/Ionic tenemos varias funciones que son de gran utilidad para controlar y crear las animaciones:

```ts
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
```

Antes de empezar, es necesario entender los conceptos básicos para desarrollar el demo de este artículo.

## State

Un state lo usamos para definir el estado de la animación, podemos tener muchos estados dentro de una animación, los estados se aplicarán al elemento del DOM donde se aplican estilos según cada estado:

```ts
state('inactive', style({
  backgroundColor: '#eee',
  transform: 'scale(1)'
})),
state('active',   style({
  backgroundColor: '#cfd8dc',
  transform: 'scale(1.1)'
})),
```

## Transition

Con Transition podemos definir las reglas de animación al cambiar de un estado a otro:

```ts
transition('inactive => active', animate('100ms ease-in')),
transition('active => inactive', animate('100ms ease-out'))
```

<amp-img width="1448" height="524" layout="responsive" src="https://angular.io/resources/images/devguide/animations/ng_animate_transitions_inactive_active.png" alt="transitions"></amp-img>

En las **transitions** también podemos agregar estilos que solo se aplican durante la animación y que no harán parte de **state**.

En Angular tenemos **dos** estados muy útiles, uno es el comodín (The wildcard state) *, este se refiere a cualquier estado y es muy útil cuando no hay un estado definido.

<amp-img width="1448" height="992" layout="responsive" src="https://angular.io/resources/images/devguide/animations/ng_animate_transitions_inactive_active_wildcards.png" alt="transitions"></amp-img>

Y el segundo estado es **void** que es llamado automáticamente cuando es ejecutada cualquier animación y será muy util para ejecutar las animaciones cuando un item es agregado o un ítem es eliminado.
 
- Enter: `void => *`
- Leave: `* => void `

<amp-img width="389" height="248" layout="responsive" src="https://angular.io/resources/images/devguide/animations/animation_enter_leave.gif" alt="transitions"></amp-img>

## Trigger:

Este será el evento con el cual vamos a ejecutar las animaciones de acuerdo a cada estado.

```ts
animations: [
  trigger('itemState', [
    state('inactive', style({
      backgroundColor: '#eee',
      transform: 'scale(1)'
    })),
    state('active',   style({
      backgroundColor: '#cfd8dc',
      transform: 'scale(1.1)'
    })),
    transition('inactive => active', animate('100ms ease-in')),
    transition('active => inactive', animate('100ms ease-out'))
  ])
]
```

Y para agregar la animación a un elemento del DOM, se agrega el trigger así:

```html
<button ion-button (click)="item.state = 'active'">Active</button>
<button ion-button (click)="item.state = 'inactive'">InActive</button>
<ion-item [@itemState]="item.state">...</ion-item>
```

Con estas bases y conceptos ahora podremos hacer un demo sencillo donde haremos una animación cuando un ítem es agregado y otra animación cuando es eliminado. La documentación oficial sobre animaciones la pueden ver [**aqui**](https://angular.io/docs/ts/latest/guide/animations.html){:target="_blank"}.

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo108 blank
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo108
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="183" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/tree1.png"></amp-img>
  </div>
</div>

{% include blog/subscribe.html %}

## Paso 2: Agregar BrowserAnimationsModule

Ahora debemos instalar el módulo `@angular/animations`, así:

```
npm install @angular/animations --save
```

Luego debemos importar `BrowserAnimationsModule` en el archivo `app.module.ts`, asi:

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

...

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DuetyApp
  ],
  providers: [...]
})
export class AppModule {}
```

## Paso 2.1 (Solo para IOS): Agregar polyfill.

IOS no soporta aún **Web Animations API**, por esto debemos agregaremos un polyfill que agrega  soporte para IOS, descargamos el archivo `web-animations.min.js` desde `https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js` y lo incluimos en `src/index.html`, así:

```html
<body>
  ...
  <script src="build/polyfills.js"></script>
  <script src="assets/js/web-animations.min.js"></script>
  ...
</body>
```

## Paso 3: Creando la animación

Vamos a crear un `trigger` llamado **itemState** que tendrá el estado **in**, este estado representa al item cuando sea agregado a la lista. Luego definimos las animación de entrada con `'void => *'` a la cual le agregamos un estilo por defecto antes que ejecute la animación, luego en la animación de salida con `* => void` y agregamos un estilo a esta. 

```ts
animations: [
  trigger('itemState', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('300ms ease-in')
    ]),
    transition('* => void', animate('300ms ease-out', style({
      opacity: 0,
      transform: 'translateX(100%)'
    }))),
  ])
]
```

Con lo cual lograremos el siguiente efecto:

<amp-img  width="389" height="248" src="https://angular.io/resources/images/devguide/animations/animation_enter_leave.gif" alt="transitions"></amp-img>

`HomePage` finalmente quedará asi:

```ts
import { Component } from '@angular/core';
import { trigger,state, style, transition, animate } from '@angular/animations';

import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('itemState', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      //Enter
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('300ms ease-in')
      ]),
      //Leave
      transition('* => void', animate('300ms ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))),
    ])
  ]
})
export class HomePage {
  ...
}
```

{% include blog/subscribe.html %}

## Paso 4: Agregando y eliminando items.

Ahora vamos a agregar el metodo `add` qué agregará un item a la lista y `remove` que elimina un item de la lista, así:

```ts
import { Component } from '@angular/core';
import { trigger,state, style, transition, animate } from '@angular/animations';

import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [...]
})
export class HomePage {

  items: any[] = [];

  constructor(public navCtrl: NavController) {}

  add(){
    this.items.push({
      title: 'item',
      state: 'in'
    });
  }

  remove(){
    this.items.splice(0,1);
  }

}
```

## Paso 5: El template.

En el template crearemos dos botones, un botón para agregar un item y el segundo botón para eliminar un item . Luego itereamos la lista y agregamos el **trigger** de animacion que depende del estado del item.

```html
{% raw %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Demo 108
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <button ion-button (click)="add()">Add Item</button>
  <button ion-button (click)="remove()">Remove Item</button>
  <ion-list>
    <ion-list-header>
      Items
    </ion-list-header>
    <ion-item [@itemState]="item.state" *ngFor="let item of items">
      {{ item.title }}
    </ion-item>
  </ion-list>
</ion-content>
{% endraw %}
```

En proximos demos trabajaremos en animaciones más complejas =).