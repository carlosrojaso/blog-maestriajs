---
layout: post
title: "Calendario con FullCalendar.io"
keywords: "calendar"
date: 2017-11-23
tags: [calendar, demos]
categories: ionic2
author: javico2609
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-22-fullcalendar%2FThe%20Art%20of%20Building%20Apps%20with%20Javascript..png?alt=media&token=8d32623c-5b5f-4c95-afa4-3dcb2e87468d"
editname: "ionic2/2017-11-22-fullcalendar.md"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-native'
    number: '4.4.0'
  - title: 'ionic-app-scripts'
    number: '3.1.2'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.19.0'
---

> Como podemos integrar de forma simple una de las librerìas para el manejo de eventos de calendario màs utilizada a nuestra app ionic, [fullcalendar](https://fullcalendar.io){:target="_blank"}.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-22-fullcalendar%2FThe%20Art%20of%20Building%20Apps%20with%20Javascript..png?alt=media&token=8d32623c-5b5f-4c95-afa4-3dcb2e87468d" alt="calendar"></amp-img>

{% include general/net-promoter-score.html %}

## Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo_fullcalendar blank
```

Para usar fullcalendar en Ionic/angular solo debemos instalar como dependencias:

```
npm install fullcalendar --save
```

**Nota: fullcalendar funciona con jquery pero le vamos a implementar un adaptador para `angular 2` para poder usarla de forma natural en el proyecto.**

## Creando el Adaptador del calendar

```ts
import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Options} from "fullcalendar";
import * as $ from 'jquery';

@Component({
  selector: 'ng-fullcalendar',
  template: `<div #containerFullCalendar></div>`
})
export class NgFullCalendarComponent implements AfterViewInit {

  @ViewChild("containerFullCalendar") element: ElementRef;
  @Input() options: Options;
  @Output() initialized: EventEmitter<boolean> = new EventEmitter<boolean>();

  private htmlElement: HTMLElement;

  ngAfterViewInit(): void {
    this.htmlElement = this.element.nativeElement;

    setTimeout(()=>{
      $(this.htmlElement).fullCalendar(this.options);
      this.initialized.emit(true);
    }, 100)
  }

  fullCalendar(...args: any[]) {
    if (!args) {
      return;
    }
    switch (args.length) {
      case 0:
        return;
      case 1:
        return $(this.htmlElement).fullCalendar(args[0]);
      case 2:
        return $(this.htmlElement).fullCalendar(args[0], args[1]);
      case 3:
        return $(this.htmlElement).fullCalendar(args[0], args[1], args[2]);
    }
  }
}
```

**Nota: Debemos incluir el nuevo componente para que angular lo reconozca, hay 2 formas o lo declaramos en el app.module o creamos un modulo `components.module` e incluimos el `ComponentModule` donde lo necesitemos**

## Incluir el css de la librerìa

Pueden remitirse al post  [Incluir librerìas externas en ionic](https://blog.ng-classroom.com/blog/tips/ionic-external-lib/){:target="_blank"}

`myApp\scripts\custom.lib.js`

```json
  "config": {
    "ionic_copy": "./scripts/custom.lib.js"
  },
```

`custom.lib.js`

```js
    module.exports = {
        copyAssets: {
            src: ['{{SRC}}/assets/**/*'],
            dest: '{{WWW}}/assets'
        },
        copyIndexContent: {
            src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
            dest: '{{WWW}}'
        },
        copyFonts: {
            src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
            dest: '{{WWW}}/assets/fonts'
        },
        copyPolyfills: {
            src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
            dest: '{{BUILD}}'
        },
        copySwToolbox: {
            src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
            dest: '{{BUILD}}'
        },
        copyCalendarCss: {
            src: './node_modules/fullcalendar/dist/fullcalendar.min.css',
            dest: '{{BUILD}}'
        }
    }
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  ....

  <link href="./build/fullcalendar.min.css" rel="stylesheet">

  ....
```

{% include blog/subscribe.html %}

## Usando el calendario en mis vistas.

`home.html`

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic Blank
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ng-fullcalendar [options]="calendarOptions" (initialized)="onCalendarInit($event)"></ng-fullcalendar>

  <ion-fab right bottom>
    <button ion-fab mini><ion-icon name="add" (click)="addRandomEvents()"></ion-icon></button>
  </ion-fab>

</ion-content>

```

`home.ts`

```ts
import { NgFullCalendarComponent } from './../../app/components/ng.fullcalendar.component';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(NgFullCalendarComponent) myCalendar: NgFullCalendarComponent;
  @ViewChild(Content) content: Content;

  public calendarOptions: Object = {};
  public colors: string[] = ["#AAC440", "#628B93", "#E76C71", "#805459", "#28D0C3", "#3483D9", "#D1A8D5", "#628B93", "#EE5BB0", "#B5A303", "#1C93CB", "#9EA7FF", "#790549", "#23AE96", "#268292"];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    const self = this;
    this.calendarOptions = {
      fixedWeekCount: false,
      height: () => self.content.contentHeight - 60,
      firstDay: 1,
      handleWindowResize: true,
      allDaySlot: false,
      slotLabelFormat: 'H',
      eventOverlap: false,
      displayEventTime: true,
      events: [
        {
          title: 'All Day Event',
          start: '2017-11-03',
          color: "#AAC440"
        },
        {
          title: 'Long Event',
          start: '2017-11-07',
          end: '2017-11-11'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-11-11T16:00:00',
          color: "#805459"
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2017-11-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2017-11-11',
          color: "#EE5BB0",
          end: '2017-11-13'
        },
        {
          title: 'Meeting',
          start: '2017-11-12T11:30:00',
          color: "#9EA7FF",
          end: '2017-11-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2017-11-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2017-11-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2017-11-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2017-11-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2017-11-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2017-11-28'
        }
      ]
    };
  }

  onCalendarInit(event) {

  }

  addRandomEvents() {
    this.myCalendar.fullCalendar('removeEvents');

    var now = new Date();
        now.setDate(1);

    const data = new Array(45).fill(0).map( (val, index) => {
        return {
          start: now.setDate(now.getDate() + index),
          end: now.setDate(now.getDate() + index + 1),
          id: index,
          color: this.colors[Math.floor(Math.random() * this.colors.length)]
        }
    })

    this.myCalendar.fullCalendar('addEventSource', data);
  }
}
```
<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="416" height="739" layout="responsive" src="/images/posts/ionic2/2017-11-22-fullcalendar/demo.png" alt="demo"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    
  </div>
</div>

**Nota:  en la propiedad `myCalendar.fullCalendar` se pueden mandar a ejecutar todas las funciones de la librerìa fullcalendar tal cual esta en su documentaciòn oficial.**

```ts
// https://fullcalendar.io/docs/event_data/addEventSource/
this.myCalendar.fullCalendar('addEventSource', data);

// https://fullcalendar.io/docs/event_data/removeEvents/
this.myCalendar.fullCalendar('removeEvents');
```
<amp-img width="416" height="739" layout="responsive" src="/images/posts/ionic2/2017-11-22-fullcalendar/demo.png" alt="demo"></amp-img>
