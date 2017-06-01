---
layout: post
title: "Aprende a migrar tu proyecto de Ionic 2 a Ionic 3"
keywords: "migrar de ionic 2 a ionic 3, de ionic 2 a ionic 3, ionic 2 a ionic 3, ionic 3"
date: 2017-04-15
tags: [tips, news]
categories: tips
author: nicobytes
cover: "/images/posts/tips/2017-04-15-ionic-2-to-ionic3/cover.jpg"
versions:
  - title: 'ionic'
    number: '3.3.0'
  - title: 'ionic-native'
    number: '3.7.0'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.0'
  - title: 'ionic-cli'
    number: '3.3.0'
---

> Hace poco Ionic lanzó su más reciente versión [**(Ionic v3)**]({{site.urlblog}}/news/ionic-v-3){:target="_blank"} y mencionamos acerca de sus principales novedades, ahora en este artículo vamos a ver cómo actulizar un proyecto desde la versión 2 a la versión 3 y como resolver los problemas más comunes.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/tips/2017-04-15-ionic-2-to-ionic3/cover.jpg"></amp-img>

## Paso 1: Borrar node_modules

Debemos borrar la carpeta `node_modules`, para luego instalar las nuevas dependencias del proyecto. Se puede borrar desde la terminal de la siguiente manera:

Mac / Linux
```
rm -rf node_modules
```

Windows
```
rd /s node_modules 
```

# Paso 2: Actualizar package.json

Ahora debemos actualizar las versiones de las dependencias de nuestro proyecto y las que de ionic 3 necesita para trabajar correctamente, las versiones deben quedar de la siguiente manera:

```json
"dependencies": {
  "@angular/common": "4.1.2",
  "@angular/compiler": "4.1.2",
  "@angular/compiler-cli": "4.1.2",
  "@angular/core": "4.1.2",
  "@angular/forms": "4.1.2",
  "@angular/http": "4.1.2",
  "@angular/platform-browser": "4.1.2",
  "@angular/platform-browser-dynamic": "4.1.2",
  "@ionic-native/core": "3.10.3",
  "@ionic-native/splash-screen": "3.10.3",
  "@ionic-native/status-bar": "3.10.3",
  "@ionic/storage": "2.0.1",
  "ionic-angular": "3.3.0",
  "ionicons": "3.0.0",
  "rxjs": "5.1.1",
  "sw-toolbox": "3.6.0",
  "zone.js": "0.8.11"
},
"devDependencies": {
  "@ionic/app-scripts": "1.3.7",
  "@ionic/cli-plugin-cordova": "1.3.0",
  "@ionic/cli-plugin-ionic-angular": "1.3.0",
  "typescript": "2.3.3"
}
```

Si existen otras dependencias aparte de las que maneja Ionic, se debe revisar la documentación de estas dependencias y si es necesario actualizarlas, lo más importante es que sean compatibles con la versión de angular 4.

## Paso 3: Instalar nuevas dependencias 

Ahora solo debemos instalar las nuevas dependencias en el proyecto y para esto ejecutamos el comando `npm install` desde la terminal.

## Paso 4: Importar **BrowserModule**

Ahora debemos agregar `BrowserModule` en nuestro archivo `app.module.ts`, así:

```ts
import { BrowserModule } from '@angular/platform-browser';

...

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DuetyApp
  ],
  providers: [
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: RavenErrorHandler },
  ]
})
export class AppModule {}
```

## Paso 4: Importar **HttpModule**

Ahora debemos agregar `HttpModule` en nuestro archivo `app.module.ts`, este paso es muy importante si dentro de la aplicación se usa la dependencia `Http`:

```ts
import { HttpModule } from '@angular/http';

...

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: RavenErrorHandler },
  ]
})
export class AppModule {}
```

**!Y ya eso es todo!** Se ve algo fácil, pero ahora explicaré algunos de los problemas más comunes y como solucionarlos:

## Tip 1: Ionic Native 3

Hace poco tuvimos la más reciente actualización de Ionic Native, ahora cada uno de los plugins debe ser inyectado como dependencia en los controladores o `pages`, esto hace más fácil hacer pruebas unitarias o soportar estos plugins en las web. Por supuesto si quieres actualizar a ionic 3 también debes actualizar tu versión de ionic native.

Desde ahora cada plugin se debe instalar con su dependencia de ionic native, por ejemplo se debe instalar el plugin correspondiente junto con su provider, por ejemplo con el plugin de la cámara sería de la siguiente manera:

```
ionic plugin add cordova-plugin-camera -save
npm install @ionic-native/camera --save
```

Luego de instalar el plugin y el provider debemos agregar este provider en el array de `providers` en el archivo `app.module.ts` , asi:

```ts
import { Camera } from '@ionic-native/camera';

...

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DuetyApp,
    HomePage
  ],
  providers: [
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    Camera
  ]
})
export class AppModule {}
```

Y por último, se debe inyectar el provider como dependencia en la clase que se quiera hacer uso de este plugin, así:

```ts
import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  constructor(
    public camera: Camera,
  ) {}

  ...
}
```

## Tip 2: Grid

Con la versión 3 de Ionic el sistema de grillas de ionic v2 ya no es soportado, ahora para brindar soporte a aplicaciones de escritorio y tablets, se usa un nuevo sistema de grillas, mucho más amplio y versátil, por consecuencia si usábamos el anterior sistema debemos actualizarlo, este es un pequeño ejemplo del nuevo sistema de grillas:

### Antes (v2)

```html
<ion-grid>
  <ion-row center>
    <ion-col width-20>...</ion-col>
    <ion-col width-80>...</ion-col>
  </ion-row>
</ion-grid>
```

### Ahora (v3)

```html
<ion-grid>
  <ion-row align-items-center>
    <ion-col col-4>...</ion-col>
    <ion-col col-8>...</ion-col>
  </ion-row>
</ion-grid>
```

Pueden ver la documentación completa en [**Ionic Grids Docs**](https://ionicframework.com/docs/theming/responsive-grid/){:target="_blank"}.

# Tip 3: Typography

También han removido selectores de color en textos, esto quiere decir que si usábamos la propiedad color en los textos para cambiar el color, con ionic v3 ya no funcionará, ahora se debe agregar la propiedad `ion-text` para que esta funcione:

### Antes (v2)

```html
<p color="danger">...</p>
<strong color="secondary">...</strong>
<span color="dark">...</span>
```

### Ahora (v3)

```html
<p ion-text color="danger">...</p>
<strong ion-text color="secondary">...</strong>
<span ion-text color="dark">...</span>
```

# Tip 4: Animations

La API de animaciones de **Angular** ha cambiado en la versión 4 y sí estabamos haciendo uso de esta API ahora debemos instalar el módulo `@angular/animations`, así:

```
npm install @angular/animations --save
```

Luego debemos importar `BrowserAnimationsModule` en el archivo `app.module.ts`, asi:

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

...

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DuetyApp,
    HomePage
  ],
  providers: [
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: RavenErrorHandler },
  ]
})
export class AppModule {}
```

Y ahora en las páginas que estemos usando el API de animaciones, ya no importamos las utilidades desde `@angular/core` sino desde `angular/animations`, así:

### Antes (v2)

```ts
import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  animations: [
    ...
  ]
})
export class HomePage {
  ...
```

### Ahora (v3)

```ts
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  animations: [
    ...
  ]
})
export class HomePage {
  ...
```

## Tip 5: Ionic generator

Si te fijas últimamente cuando creamos una página con el generador de ionic, así:

```
ionic g page login
```

Nos crea un archivo más `login.module.ts`:

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="484" height="183" layout="responsive" src="/images/posts/tips/2017-04-15-ionic-2-to-ionic3/tree.png"></amp-img>
  </div>
</div>

Y esto es debido a que ahora ionic en la versión 3 soporta **lazy loading**, lo cual es maravilloso, pero hablaremos de cómo usar esta característica en el siguiente artículo. Por ahora si quieres continuar sin problemas debemos borrar este archivo y quitar el decorador de **@IonicPage** que crea en la página `login.ts` y luego agregar `LoginPage` en el array de `entryComponents` y `declarations` en el archivo `app.modules.ts` (como siempre lo hemos hecho).

> Este último tip es para no tener problemas con la migración de ionic 2 a **ionic 3**, ya que usar el nuevo decorador **@IonicPage** y **lazy loading** es opcional. 

En el próximo artículo haremos la implementación exitosa en un proyecto usando @IonicPage y lazy loading.

> **Spoiler:** Usar @IonicPage y lazy loading, baja el peso de la app y reduce el tiempo de carga.





