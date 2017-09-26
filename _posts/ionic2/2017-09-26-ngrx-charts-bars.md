---
layout: post
title: "Gráficos con Ngx-charts"
keywords: "ionic push notifications, OneSignal, push notifications, notifications, notifications en ionic 2, OneSignal y ionic"
date: 2017-09-26
tags: [charts, demos]
categories: ionic2
author: nicobytes
repo: "https://github.com/ion-book/demo121"
laucher: "https://ionic-charts.firebaseapp.com/#/bar-horizontal"
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ngrx-charts-bars%2Fcover.jpg?alt=media&token=885b3c21-db64-4e52-8ffe-81516061bd85"
versions:
  - title: 'ionic'
    number: '3.6.1'
  - title: 'ionic-native'
    number: '4.2.1'
  - title: 'ionic-app-scripts'
    number: '2.1.4'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.10.3'
---

> La visualización de datos es una de las habilidades que ahora es relevantes debido a la gran cantidad de información que se tiene en el momento, estas gráficas ayudan a ver métricas que facilitan la toma decisiones y en Angular existe [ngrx-charts](https://swimlane.github.io/ngx-charts/){:target="_blank"} una grandiosa librería que nos ayuda con esta labor.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ngrx-charts-bars%2Fcover.jpg?alt=media&token=885b3c21-db64-4e52-8ffe-81516061bd85" alt="charts"></amp-img>

{% include general/net-promoter-score.html %}

En el artículo vamos a implementar la librería de ngrx-charts en Ionic/Angular, la cual es una librería para mostrar gráficas usando Angular y D3JS. Pero lo que hace diferente a esta librería, es que no es wrapper de D3JS, ngrx-charts usa SVG manipulado por Angular y D3JS para funciones matemáticas, escalas, ejes etc. Y esto hace que los gráficos generados por ngrx-charts pueda usar ventajas de Angular como AOT, Angular Universal, Angular Animations etc.

Aquí pueden ver la motivación de los creadores de esta librería y el [porqué renderizar con Angular Vs crear un wrapper de D3JS](https://swimlane.gitbooks.io/ngx-charts/content/intro/motivation.html){:target="_blank"}.

Dentro de sus características nos ofrecen varios componentes que tienen los siguientes tipos de gráficas:

- Horizontal & Vertical Bar Charts (Standard, Grouped, Stacked, Normalized)
- Line
- Area (Standard, Stacked, Normalized)
- Pie (Explodable, Grid, Custom legends)
- Donut
- Gauge
- Force Directed Graph
- Heatmap
- Treemap
- Number Cards
- Bubble/Scatter

Sin embargo si contamos con conocimientos de SVG, D3JS y animaciones podemos extender la librería y crear componentes personalizados. Pueden ver mas de sus caracteristicas en [https://swimlane.gitbooks.io/ngx-charts/content/intro/features.html](https://swimlane.gitbooks.io/ngx-charts/content/intro/features.html){:target="_blank"}.

En ion-book hemos creado un proyecto donde irémos agregando cada uno de los tipos de gráficos con cada artículo y  funcionará como App Web, PWA y para Android y IOS, La pueden ver en:

<a href="https://ionic-charts.firebaseapp.com/#/bar-horizontal" target="_blank" class="btn btn-round btn-success">Ver demo</a>

Y el código en: [https://github.com/ion-book/demo121](https://github.com/ion-book/demo121){:target="_blank"}.

## Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo121 blank
```

Para usar ngrx-charts en Ionic/angular solo debemos instalar como dependencias a @angular/animations, ngrx-charts y d3js, así:

```
npm install @angular/animations@4.1.3
npm install @swimlane/ngx-charts --save
npm install d3 --save
```

**Nota: ngx-charts 5.0.0 funciona solo con versiones de Angular 4.x.  Para usar ngx-charts con Angular 2.x, se puede usar ngx-charts 4.x.**

Y ya eso es todo! ahora vamos a trabajar dentro de Ionic con Lazy Loading, recuerda que esto reduce tiempos de carga en la aplicación, puedes ver más sobre Lazy Loading en: [Reduce el tiempo de carga de tu app](https://www.ion-book.com/blog/tips/ionic-page-and-lazy-loading/){:target="_blank"}.


Como vamos a trabajar con Lazy Loading, en cada `module` que queramos usar las gráficas de ngx-charts debemos importar el módulo de ngx-charts, así:

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarHorizontalPage } from './bar-horizontal';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    BarHorizontalPage,
  ],
  imports: [
    NgxChartsModule,
    IonicPageModule.forChild(BarHorizontalPage),
  ],
})
export class BarHorizontalPageModule {}
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
    ...
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

Con esto ya podemos empezar a trabajar, ngx-charts es declarativo, así que solo hace falta empezar a usar sus componentes dentro de nuestro template con los datos necesarios.

## Bar charts

En este primer artículo implementaremos los gráficos de barras de nos ofrece `ngx-charts` y luego en siguientes artículos veremos los demás gráficos, hasta llegar a crear componentes personalizados.

Una gráfico de barras simple se veria, así (sin hacer mayor trabajo en las opciones que tiene):

<amp-img width="589" height="318" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ngrx-charts-bars%2Fscreen1.png?alt=media&token=3fbd796b-befc-490a-b970-d6eb8e12c782" alt="charts"></amp-img>

Para mostrar el gráfico anterior solo se necesita declarar en el template, el siguiente componente:

```html
<ngx-charts-bar-vertical
  [view]="view"
  [results]="data"
  xAxis="true"
  yAxis="true"
  legend="true"
  legendTitle="Countries"
  showXAxisLabel="true"
  showYAxisLabel="true"
  xAxisLabel="Country"
  yAxisLabel="GDP Per Capita">
</ngx-charts-bar-vertical>
```

Donde los parámetros más importantes son `view` y `results`, `view` son las dimensiones que tendrá la gráfica y `results` los datos que va a graficar. Por ejemplo para el gráfico anterior corresponden los siguientes datos:

```ts
[
  {
    'name': 'Germany',
    'value': 31229
  },
  {
    'name': 'United States',
    'value': 19869
  },
  {
    'name': 'France',
    'value': 21359
  },
  {
    'name': 'United Kingdom',
    'value': 20598
  },
  {
    'name': 'Spain',
    'value': 56009
  },
  {
    'name': 'Italy',
    'value': 24090
  }
];
```

Otra buena opción cuando contamos con una serie de datos del mismo grupo, puede ser mostrar gráficos de barras en grupos, así:

<amp-img width="589" height="316" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ngrx-charts-bars%2Fscreen2.png?alt=media&token=10b63e60-89d1-4370-a699-faf0835dc737" alt="charts"></amp-img>

Para mostrar el gráfico anterior solo se necesita declarar en el template, el siguiente componente:

```html
<ngx-charts-bar-vertical-2d
  [view]="view"
  [results]="data"
  xAxis="true"
  yAxis="true"
  legend="showLegend"
  legendTitle="Countries"
  barPadding="2"
  showXAxisLabel="true"
  showYAxisLabel="true"
  xAxisLabel="GDP Per Capita"
  yAxisLabel="Country">
</ngx-charts-bar-vertical-2d>
```

Donde esta vez los datos deben ir organizados así:

```ts
[
  {
    'name': 'Germany',
    series: [
      {
        name: '1990',
        value: 32961
      },
      {
        name: '2000',
        value: 10723
      },
      {
        name: '2010',
        value: 54488
      }
    ]
  },
  ...
];
```

{% include blog/subscribe.html %}

Otro tipo de gráfica que en mi opinión es muy interesante es el tipo `Stacked Bar` donde cada barra está dividida por el peso de cada número y la peso total de la barra es la suma total de ellos:

<amp-img width="590" height="329" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ngrx-charts-bars%2Fscreen3.png?alt=media&token=421ef491-b00d-4ba5-9ddd-c74b31923121" alt="charts"></amp-img>

Para mostrar el gráfico anterior solo se necesita declarar en el template, el siguiente componente:

```html
<ngx-charts-bar-vertical-stacked
  [view]="view"
  [results]="data"
  xAxis="true"
  yAxis="true"
  legend="true"
  legendTitle="Countries"
  showXAxisLabel="true"
  showYAxisLabel="true"
  xAxisLabel="GDP Per Capita"
  yAxisLabel="Country">
</ngx-charts-bar-vertical-stacked>
```

Y los datos también van agrupados en series, así:

```ts
[
  {
    'name': 'Germany',
    series: [
      {
        name: '1990',
        value: 32961
      },
      {
        name: '2000',
        value: 10723
      },
      {
        name: '2010',
        value: 54488
      }
    ]
  },
  ...
];
```

Con frecuencia un `Stacked Bar` se usa para notar que el peso total de la barra está relacionada con otros valores. Ejemplos:

<div class="row wrap">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="834" height="726" layout="responsive" src="http://datavizproject.com/wp-content/uploads/2015/10/Sk%C3%A6rmbillede-2016-01-25-kl.-13.38.17.png"></amp-img>
    <small>Source: http://www.thevisualagency.com/portfolio/grafici-interattivi-comunicazione-finanziaria/</small>
  </div>
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="881" height="726" layout="responsive" src="http://datavizproject.com/wp-content/uploads/2015/10/Sk%C3%A6rmbillede-2017-08-31-kl.-17.26.13.png"></amp-img>
    <small>Source: https://www.behance.net/gallery/21631653/Merck-Infographic</small>
  </div>
  <div class="col col-100">
    <amp-img width="884" height="376" layout="responsive" src="http://datavizproject.com/wp-content/uploads/2015/10/Sk%C3%A6rmbillede-2016-01-29-kl.-14.38.40.png"></amp-img>
    <small>Source: https://www.flickr.com/photos/densitydesign/8089722832/in/album-72157631774207511/</small>
  </div>
</div>
<br>

Ahora al compilar para Android veremos el resultado:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ngrx-charts-bars%2Fphone1.jpg?alt=media&token=26a39c33-64ae-4207-a913-e66b6c4a3625"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280"  layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ngrx-charts-bars%2Fphone2.jpg?alt=media&token=8e8cafee-00f0-468d-960f-1b79934c30a5"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ngrx-charts-bars%2Fphone3.jpg?alt=media&token=68f774dd-1aab-489a-8ea7-803137dd2fa0"></amp-img>
  </div>
</div>
<br>