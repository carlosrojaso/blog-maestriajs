---
layout: post
title: "Background Geolocation"
keywords: "directions, google maps, ionic"
date: 2017-12-09
tags: [maps, demos]
categories: ionic2
repo: "https://github.com/ng-classroom/demo123"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fbackground-geolocation%2Fcover.jpg?alt=media&token=2f117f25-2bbc-4728-b20c-9cfe7149637c"
remember: true
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-native'
    number: '4.5.0'
  - title: 'ionic-app-scripts'
    number: '3.1.5'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.19.0'
---

> En este artículo veremos como usar el plugin de **background geolocation** y mostrar como funciona.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fbackground-geolocation%2Fcover.jpg?alt=media&token=2f117f25-2bbc-4728-b20c-9cfe7149637c"></amp-img>

{% include general/net-promoter-score.html %}

Usar `background geolocation` es una de las tareas más habituales que podemos tener en una app que se basa en llevar un seguimiento de un objeto en espacio geografico y es muy común ver este tipo de apps en empresas de envio de paquetes que monitorean en tiempo real donde están ubicados sus vehículos, empresas de carga o de transporte tales como Uber.

En aplicaciones híbridas podemos usar el plugin de `background geolocation` quien lanza una tarea para reportar la posición del dispositivo dado x tiempo en x radio, una de las características es que una vez ejecutada la tarea esta queda en segundo plano, es decir no necesitamos que el usuario tenga la aplicación abierta. Vamos a crear una app en ionic que nos permita llevar el monitoreo del dispositivo.

# Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo123 blank --cordova
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo123
```

Agregamos la plataforma para la que vamos a desarrollar:

```
ionic cordova platform add android@6.4.0
```

# Paso 2: Instalando el plugin.

Lo siguiente que haremos es agregar el plugin de la `background geolocation` en nuestro proyecto con:

```
ionic cordova plugin add cordova-plugin-mauron85-background-geolocation
npm install --save @ionic-native/background-geolocation
```

Debemos recordar añadir el provider `BackgroundGeolocation` en el archivo `app.module.ts`, así:

```ts
...
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    ...
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    ...
    BackgroundGeolocation,
    ...
  ]
})
export class AppModule {}
```

# Paso 3: Implementando BackgroundGeolocation

Para hacer uso del plugin debemos inyectar al constructor de `HomePage` el provider de la `BackgroundGeolocation`, y la declararemos la variable `logs` de tipo `string[]` que guardará los registros que nos retorne el plugin, así:

```ts
...
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  logs: string[] = [];

  constructor(
    private backgroundGeolocation: BackgroundGeolocation
  ) {}

  ...
}
```

Ahora vamos a crear el método `start` que se encargará de iniciar la tarea `background geolocation` y envía una serie de opciones, las cuales vamos a explicar una a una, primero el código:

```ts
start(){

  const config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 1,
    distanceFilter: 1,
    debug: true,
    stopOnTerminate: false,
    // Android only section
    locationProvider: 1,
    startForeground: true,
    interval: 6000,
    fastestInterval: 5000,
    activitiesInterval: 10000,
  };

  console.log('start');

  this.backgroundGeolocation
  .configure(config)
  .subscribe((location: BackgroundGeolocationResponse) => {
    console.log(location);
    this.logs.push(`${location.latitude},${location.longitude}`);
  });

  // start recording location
  this.backgroundGeolocation.start();

}
```

Vamos a explicar las opciones más importantes que usamos en el código de arriba:

- **desiredAccuracy:** Es valor posible de `[0, 10, 100, 1000]` entre más bajo la precisión en metros obtenida por el plugin será mejor.
- **stationaryRadius:** Es un valor en un radio en metros donde el plugin se activará o enviara una respuesta.
- **distanceFilter:** Es un valor en la distancia (horizontales) en metros donde el plugin se activará o enviara una respuesta.
- **debug:** Esta opción permite tener más información acerca de la respuesta y agrega un sonido cada vez que detecta un nuevo registro.
- **stopOnTerminate:** Si está en true la tarea de `background-geolocation` se detendrá si la aplicación es cerrada o sacada de segundo plano. Recordemos que el plugin funciona en modo `background` y `foreground`.
- **locationProvider:**  Es la técnica usada para detectar los cambios de posición la técnica que usaremos será `ACTIVITY_PROVIDER = 1`, puedes ver qué provider escoger aquí: [PROVIDERS](https://github.com/mauron85/cordova-plugin-background-geolocation/blob/master/PROVIDERS.md{:target="_blank"})



- **startForeground:** Habilita la detección de cambio de posición cuando la app está en segundo plano.
- **interval:** Será el mínimo de tiempo que el plugin estará solicitando la posición al dispositivo. Debemos tener en cuenta que los valores de tiempo van condicionados con los de distancia. Es decir si el dispositivo no detecta el movimiento x metros en x tiempo no solicitá la posición.

Todas las opciones y documentación las puedes encontrar aquí: [API]
(https://github.com/mauron85/cordova-plugin-background-geolocation#api)

Ahora vamos a crear un evento que evalúe si la detección posición está habilitada en el dispositivo y si  lo está no abre automaticamente la opcion nativa para habilitarla:

```ts
startBackgroundGeolocation(){
  this.backgroundGeolocation.isLocationEnabled()
  .then((rta) =>{
    if(rta){
      this.start();
    }else {
      this.backgroundGeolocation.showLocationSettings();
    }
  })
}
``` 

Finalmente vamos tener un método para detener la tarea de `background-geolocation`:

```ts
stopBackgroundGeolocation(){
  this.backgroundGeolocation.stop();
}
```

Finalmente toda nuestra clase `HomePage`, quedará así:

```ts
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  logs: string[] = [];

  constructor(
    private backgroundGeolocation: BackgroundGeolocation
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  startBackgroundGeolocation(){
    this.backgroundGeolocation.isLocationEnabled()
    .then((rta) =>{
      if(rta){
        this.start();
      }else {
        this.backgroundGeolocation.showLocationSettings();
      }
    })
  }

  start(){

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true,
      stopOnTerminate: false,
      // Android only section
      locationProvider: 1,
      startForeground: true,
      interval: 6000,
      fastestInterval: 5000,
      activitiesInterval: 10000
    };

    console.log('start');

    this.backgroundGeolocation
    .configure(config)
    .subscribe((location: BackgroundGeolocationResponse) => {
      console.log(location);
      this.logs.push(`${location.latitude},${location.longitude}`);
    });

    // start recording location
    this.backgroundGeolocation.start();

  }

  stopBackgroundGeolocation(){
    this.backgroundGeolocation.stop();
  }

}
```

# Paso 4: Template

Ahora solo tendremos que trabajar en el template que tendrá una opción para iniciar la tarea y otro para detenerla, además que mostrar los registros haya capturado el plugin.

`src/home/home.html:`

```html
{% raw %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>home</ion-title>
    <ion-buttons end>
      <button ion-button icon-only (click)="startBackgroundGeolocation()">
        <ion-icon name="play"></ion-icon>
      </button>
      <button ion-button icon-only (click)="stopBackgroundGeolocation()">
        <ion-icon name="pause"></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-list>
    <ion-item *ngFor="let log of logs">
      {{ log }}
    </ion-item>
  </ion-list>
</ion-content>
{% endraw %}
```

# Paso 5: Compilando

Ahora para compilar el código solo tendremos que ejecutar en nuestra terminal (Si tienen el entorno configurado):

```
ionic cordova run android --prod
```

## Resultado:

<div class="row">
  <div class="col col-100 col-md-33 offset-md-33 col-lg-33 offset-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fbackground-geolocation%2Fphoto4999414865839892413.jpg?alt=media&token=c312669c-2adf-4aa4-93a1-d6dfae8aba04"></amp-img>
  </div>
</div>
<br/>

