---
layout: post
title: "Ionic Native y buenas prácticas"
tags: [native]  
date: 2017-05-26
categories: ionic2
author: nicobytes
cover: "/images/posts/ionic2/2016-07-05-ionic-native/cover.jpg"
---

> **Ionic-native** es un conjunto de envolturas en ES5/ES6/Typescript para cualquiera de los plugins de **Cordova/Phonegap**, la cual hace que cuando queremos agregar cualquier función nativa a nuestra aplicación sea muy fácil.

<amp-img width="1318" height="764" layout="responsive" src="/images/posts/ionic2/2016-07-05-ionic-native/cover.jpg"></amp-img>

{% include general/net-promoter-score.html %} 

Recordemos que en la versión en ionic1, tuvimos a **ngCordova** que eran servicios que envolvían las funciones de los plugins de **Cordova/Phonegap**. Pero ahora con **ionic native** esto cambio, y los plugins traen una fácil implementación y nos retorna una `Promise` o `Observable` para usar dentro del app.

## Promises and Observables

Cuando hacemos la implementación de **ionic-native** tendremos como respuesta una `Promise` o `Observable`.

## Runtime Diagnostics

A diferencia de la versión 1 donde usabamos ngCordova, **ionic native** nos permite saber si al usar la app nos falta instalar el plugin o saber cual es problema realmente, aunque debemos probarlo directamente en un dispositivo o emulador, ya que en el emulador de la web no funcionará correctamente.

## Pasos para instalar cualquier plugin correctamente

Vamos a dar una serie de pasos para poder instalar un plugin correctamente y no morir en el intento. El ejemplo lo haremos con uno de los plugins más usados el de **Geolocation**.

### Paso 1: Leer la documentación del plugin en Ionic Native

El 65% de los errores se pueden evitar leyendo la documentación, al menos de las funciones que nos interesa consumir del plugin.

La documentacion para **Geolocation** en ionic-native esta [aquí](https://ionicframework.com/docs/native/geolocation/){:target="_blank"}.


### Paso 2: Leer la documentación del plugin.

Como explicamos anteriomente ionic-native en un un conjunto de envolturas para conectarse de forma óptima con Cordova. Por eso si queremos más detalle acerca de alguna de las funciones que necesitamos del plugin debemos revisar la documentación del oficial del plugin.

La documentación del plugin oficial para **Geolocation** [aquí](https://github.com/apache/cordova-plugin-geolocation){:target="_blank"}.

Pero sobre todo en esta documentación debemos revisar la sección de instalacón, ya que algunos plugins para IOS necesitan de variables extra en la instalación. Y en el caso de **Geolocation** es así:

<amp-img width="923" height="283" layout="responsive" src="/images/posts/ionic2/2016-07-05-ionic-native/screen.png"></amp-img>

Como vemos para la instalación del plugin en IOS debemos agregar la variable `GEOLOCATION_USAGE_DESCRIPTION`.

### Paso 3: !Ahora si! Instalar el plugin.

Debemos instalar el plugin y su provider así:

```
ionic cordova plugin add cordova-plugin-geolocation
npm install --save @ionic-native/geolocation
```

Si queremos dar soporte para IOS la instalación debería ser así:

```
ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="The app need the geolocation"
npm install --save @ionic-native/geolocation
```

> Nota: Por eso es vital el paso 1 y 2, ya que de no saber esto en el caso de IOS, apple podria recharzos la compilación. Y estariamos buscando en **stackoverflow** el problema.

### Paso 4: Agregar el provider.

Ahora debemos agregar `Geolocation` como provider en `app.module.ts`.

```ts
...
import { Geolocation } from '@ionic-native/geolocation';
...

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    ...
    Geolocation,
    ...
  ]
})
export class AppModule {}
```

{% include blog/subscribe.html %}

### Paso 5: Disfrutar

Ahora solo nos queda inyectar el `provider` en la página en donde queremos usar el plugin y hacer uso de sus métodos, así:

```ts
...
import { Geolocation,  } from '@ionic-native/geolocation';
...

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation
  ) {}

  getPosition(){
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
    })
    .catch((error) => {
      console.log('Error getting location', error);
    });
  }

  watchPosition(){
    let options = {
      timeout: 50000 
    }
    let watch = this.geolocation.watchPosition(options);
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
  
...
```

En el método `getPosition` manejamos una `Promise` en donde solo recibimos los datos en un momento predeterminado. Pero en el método `watchPosition` usamos un `Observable` para estar pidiendo la geolocalización cada X tiempo.