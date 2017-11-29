---
layout: post
title: "Múltiples markers en Google Maps"
date: 2017-06-02
tags: [maps, demos, ionic2]
categories: ionic2
repo: "https://github.com/nicobytes/ionic2-google-maps-markers"
author: mayrititis
cover: "/images/posts/ionic2/2016-10-19-google-maps-markers/cover.jpg"
remember: true
versions:
  - title: 'ionic'
    number: '3.3.0'
  - title: 'ionic-native'
    number: '3.11.0'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.3.0'
---

> Ya hemos visto en los posts anteriores sobre cómo integrar Google Maps con nuestra aplicación en Ionic, bien sea de forma [nativa]({{site.urlblog}}/ionic2/google-maps-native){:target="_blank"} o con [javascript]({{site.urlblog}}//ionic2/google-maps-js-and-ionic){:target="_blank"}. En este post veremos un poco más sobre la integración de **Google Maps con Ionic** y es sobre el tema de los **Markers**.

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2016-10-19-google-maps-markers/cover.jpg"></amp-img>

{% include general/net-promoter-score.html %} 

Los **Markers** nos permiten identificar un lugar en el mapa siempre y cuando tengamos las coordenadas geográficas, por defecto Google Maps trae un icono de color rojo que muchos seguramente conocen, sin embargo podemos personalizarlo, lo cual es sorprendentemente sencillo e increiblemente util. 

## 1. Creación del proyecto

```
ionic start gm-markers blank --cordova
```

## 2. Instalación de los Plugins de Cordova y de las Api keys de Android y iOS 

Si te sientes un poco perdido sobre el tema de las Api keys, te invito a leer el post de [**Google maps native**]({{site.urlblog}}/ionic2/google-maps-native){:target="_blank"} y [**¿Qué es Ionic Native?**]({{site.urlblog}}/ionic2/ionic-native){:target="_blank"}

```
cd gm-markers
```

Instalando geolocalización:

```
ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="The app need the geolocation"
npm install @ionic-native/geolocation --save
```

Instalando google Maps:

```
ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE" --save
npm install @ionic-native/google-maps --save
```

Ahora debemos importar los servicios de Geolocation y GoogleMaps en el array de providers en el archivo `src/app/app.module.ts`, así:

```ts
...
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
...

@NgModule({
  declarations: [...],
  imports: [...],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    ...
    Geolocation,
    GoogleMaps,
    ...
  ]
})
export class AppModule {}
```


## 3. Integración de Google Maps Nativo

Tomando en cuenta el post de [**Google maps native**]({{site.urlblog}}/ionic2/google-maps-native){:target="_blank"}, integramos rapidamente nuestro mapa.

En `home.html`, debemos colocar un div con nuestro id ‘map’, o como queramos llamarlo.

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Google Map
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <div id="map"></div>  
</ion-content>
```

Nuestro archivo `home.scss`:

```css
page-home {
  #map{
    display: block;
    height: 100%;
    width: 100%;
  }
}
```

En nuestro `home.ts`, importamos las librerias para el map, la geolocalización y las referentes al Marker

```ts
...
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps
  ) {}
...
```

Dentro de la clase declaramos dos variables

```ts
map: GoogleMap;
myPosition: any = {};
```

Y agregaremos el array `markers` como prueba de varios markers, así:

```ts
markers: any[] = [
  {
    position:{
      latitude: -17.3666745,
      longitude: -66.2387878,
    },
    title:'Point 1'
  },
  {
    position:{
      latitude: -17.3706884,
      longitude: -66.2397749,
    },
    title:'Point 2'
  },
  {
    position:{
      latitude: -17.391398,
      longitude: -66.2407904,
    },
    title:'Point 3'
  },
  {
    position:{
      latitude: -17.3878887,
      longitude: -66.223664,
    },
    title:'Point 4'
  },
];
```

En la función `ionViewDidLoad` llamamos a la función `getCurrentPosition()` para obtener la position del usuario.

```ts
ionViewDidLoad(){
  this.getCurrentPosition();
}
```

Luego escribimos la función para obtener la localización:

```ts
getCurrentPosition(){
  this.geolocation.getCurrentPosition()
  .then(position => {
    this.myPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    this.loadMap();
  })
  .catch(error=>{
    console.log(error);
  })
}
```

Así mismo escribimos la función para cargar el mapa, la cual he decido llamar `loadMap()`

```ts
loadMap(){
  // create a new map by passing HTMLElement
  let element: HTMLElement = document.getElementById('map');

  this.map = this.googleMaps.create(element);

  // create CameraPosition
  let position: CameraPosition = {
    target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
    zoom: 12,
    tilt: 30
  };

  this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
    console.log('Map is ready!');

    // move the map's camera to position
    this.map.moveCamera(position);
  });
}
```

Ahora ejecuta:

```
ionic cordova run android ó ionic cordova run ios 
```

para corroborar que funcione bien el mapa.

## 4. Colocando múltiples markers

Una vez concluido el paso anterior colocaremos justo debajo de `console.log(‘Map is ready’)` la llamada a la función que mostrará varios **markers** la cual recibe el nombre de `addMarker()`

Esta función contendrá lo siguiente

```ts
addMarker(options){
  let markerOptions: MarkerOptions = {
    position: new LatLng(options.position.latitude, options.position.longitude),
    title: options.title
  };
  this.map.addMarker(markerOptions);
}
```

Es decir la clase ahora la función `loadMap` quedaría así:

```ts
loadMap(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // create CameraPosition
    let position: CameraPosition = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 12,
      tilt: 30
    };

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Hello"
      };

      this.addMarker(markerOptions);

      this.markers.forEach(marker=>{
        this.addMarker(marker);
      });
      
    });
  }
```

## 5 .Colocando nuestro marker personalizado

Para colocarle una imagen personalizada nuestro marker, basta con almacenar la imagen en la carpeta de `assets/imgs` ubicada en el directorio `src`, luego guardamos la dirección desde la raíz de nuestro proyecto, por ejemplo `www/assets/custom-marker.png`.

Ahora agregamos `icon` como propiedad de los markers, finalmente la clase completa quedará así:

```ts
import { Component} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  myPosition: any = {};
  markers: any[] = [
    {
      position:{
        latitude: -17.3666745,
        longitude: -66.2387878,
      },
      title:'Point 1',
      icon: 'www/assets/imgs/marker-green.png'
    },
    {
      position:{
        latitude: -17.3706884,
        longitude: -66.2397749,
      },
      title:'Point 2',
      icon: 'www/assets/imgs/marker-blue.png'
    },
    {
      position:{
        latitude: -17.391398,
        longitude: -66.2407904,
      },
      title:'Point 3',
      icon: 'www/assets/imgs/marker-green.png'
    },
    {
      position:{
        latitude: -17.3878887,
        longitude: -66.223664,
      },
      title:'Point 4',
      icon: 'www/assets/imgs/marker-blue.png'
    },
  ];
 
  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps
  ) {}

  ionViewDidLoad(){
    this.getCurrentPosition();
  }

  getCurrentPosition(){
    this.geolocation.getCurrentPosition()
    .then(position => {
      this.myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      this.loadMap();
    })
    .catch(error=>{
      console.log(error);
    })
  }

  loadMap(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // create CameraPosition
    let position: CameraPosition = {
      target: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
      zoom: 12,
      tilt: 30
    };

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);

      let markerOptions: MarkerOptions = {
        position: this.myPosition,
        title: "Hello",
        icon: 'www/assets/imgs/marker-pink.png'
      };

      this.addMarker(markerOptions);

      this.markers.forEach(marker=>{
        this.addMarker(marker);
      });
      
    });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon
    };
    this.map.addMarker(markerOptions);
  }
}
```

Ahora ejecuta:

```
ionic cordova run android ó ionic cordova run ios 
```

**y voila!** 

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-10-19-google-maps-markers/result1.jpg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-10-19-google-maps-markers/result2.jpg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-10-19-google-maps-markers/result3.jpg"></amp-img>
  </div>
</div>

### Enlaces de Referencia

- [https://developers.google.com/maps/documentation/javascript/markers](https://developers.google.com/maps/documentation/javascript/markers){:target="_blank"}
- [http://ionicframework.com/docs/native/googlemap](http://ionicframework.com/docs/native/googlemap){:target="_blank"}