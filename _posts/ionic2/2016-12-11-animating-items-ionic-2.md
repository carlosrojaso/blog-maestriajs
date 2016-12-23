---
layout: post
title: "Animando items con Ionic 2"
date: 2016-12-11
tags: [animations, demos, ionic2]
categories: ionic2
comments: true
laucher: "/launcher/demo108"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo108%2Fitems.jpg?alt=media"
remember: true
draft: true
---

> Angular 2 integra [Web Animations API](https://web-animations.github.io/web-animations-demos/#waves/){:target="_blank"} para ejecutar animaciones en css que aprovechan la GPU del dispositivo y se puedan controlar con JS, sin duda esto provee un mayor control en las animaciones que podemos hacer.

<img class="img-responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo108%2Fitems.jpg?alt=media" alt="SQLite + Ionic 2 en 5 pasos">

Para hacer animaciones en Angular 2 / Ionic 2 tenemos varias funciones que son de gran utilidad para controlar y crear las animaciones:

{% highlight ts %}
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
{% endhighlight %}

Antes de empezar, es necesario entender los conceptos básicos para desarrollar el demo de este artículo.

## State

Un state lo usamos para definir el estado de la animación, podemos tener muchos estados dentro de una animación, los estados se aplicarán al elemento del DOM donde se aplican estilos según cada estado:

{% highlight ts %}
state('inactive', style({
  backgroundColor: '#eee',
  transform: 'scale(1)'
})),
state('active',   style({
  backgroundColor: '#cfd8dc',
  transform: 'scale(1.1)'
})),
{% endhighlight %}

## Transition

Con Transition podemos definir las reglas de animación al cambiar de un estado a otro:

{% highlight ts %}
transition('inactive => active', animate('100ms ease-in')),
transition('active => inactive', animate('100ms ease-out'))
{% endhighlight %}

<img class="img-responsive" src="https://angular.io/resources/images/devguide/animations/ng_animate_transitions_inactive_active.png" alt="transitions">

En las **transitions** también podemos agregar estilos que solo se aplican durante la animación y que no harán parte de **state**.

En angular 2 tenemos **dos** estados muy útiles, uno es el comodín (The wildcard state) *, este se refiere a cualquier estado y es muy útil cuando no hay un estado definido.

<img class="img-responsive" src="https://angular.io/resources/images/devguide/animations/ng_animate_transitions_inactive_active_wildcards.png" alt="transitions">

Y el segundo estado es **void** que es llamado automáticamente cuando es ejecutada cualquier animación y será muy util para ejecutar las animaciones cuando un item es agregado o un ítem es eliminado.
 
- Enter: `void => *`
- Leave: `* => void `

<img class="img-responsive center-block" src="https://angular.io/resources/images/devguide/animations/animation_enter_leave.gif" alt="transitions">

## Trigger:

Este será el evento con el cual vamos a ejecutar las animaciones de acuerdo a cada estado.

{% highlight ts %}
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
{% endhighlight %}

Y para agregar la animación a un elemento del DOM, se agrega el trigger así:

{% highlight html %}
<button ion-button (click)="item.state = 'active'">Active</button>
<button ion-button (click)="item.state = 'inactive'">InActive</button>
<ion-item [@itemState]="item.state">...</ion-item>
{% endhighlight %}

Con estas bases y conceptos ahora podremos hacer un demo sencillo donde haremos una animación cuando un ítem es agregado y otra animación cuando es eliminado. La documentación oficial sobre animaciones la pueden ver [**aqui**](https://angular.io/docs/ts/latest/guide/animations.html){:target="_blank"}.

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2](http://www.ion-book.com/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start demo108 blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo108
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera *app*.

## Paso 2: Creando la animación

{% highlight ts linenos %}
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
{% endhighlight %}

Vamos a crear un `trigger` llamado **itemState** que tendrá el estado **in** (línea 3) este estado representa al item cuando sea agregado a la lista. Luego definimos las animación de entrada (línea 4) a la cual le agregamos un estilo por defecto antes que ejecute la animación, luego en la animación de salida (línea 11) colocaremos la animación agregando un estilo a esta. Con lo cual lograremos el siguiente efecto:

<img class="img-responsive center-block" src="https://angular.io/resources/images/devguide/animations/animation_enter_leave.gif" alt="transitions">

El código finalmente quedará asi:

{% highlight ts %}
import { Component, trigger,state, style, transition, animate } from '@angular/core';
import { NavController } from 'ionic-angular';

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
{% endhighlight %}

## Paso 3: Agregando y eliminando items.

Ahora vamos a agregar el metodo `add` en línea 16 qué agregará un item a la lista y `remove` en línea 23 que elimina un item de la lista.

{% highlight ts linenos %}
import { Component, trigger,state, style, transition, animate } from '@angular/core';

import { NavController } from 'ionic-angular';

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
{% endhighlight %}

## Paso 4: El template.

En el template crearemos dos botones, un botón para agregar un item en la línea 10 y el segundo botón para eliminar un item en la línea 11. Luego en línea 16 itereamos la lista y agregamos el **trigger** de animacion que depende del estado del item.

{% highlight html linenos %}
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
{% endhighlight %}

En proximos demos trabajaremos en animaciones más complejas =).