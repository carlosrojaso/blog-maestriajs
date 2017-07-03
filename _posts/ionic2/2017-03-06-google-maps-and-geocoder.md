---
layout: post
title: "Google Maps + Geocoder"
keywords: "ionic push notifications, OneSignal, push notifications, notifications, notifications en ionic 2, OneSignal y ionic"
date: 2017-03-07
tags: [maps, native]
categories: ionic2
author: levanocarlos
repo: 'https://github.com/calevano/geocoder-ionic2'
cover: "/images/posts/ionic2/2017-03-06-google-maps-and-geocoder/cover.jpg"
remember: true
versions:
  - title: 'ionic'
    number: '3.5.0'
  - title: 'ionic-native'
    number: '3.12.1'
  - title: 'ionic-app-scripts'
    number: '1.3.12'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.4.0'
---

Tengan ustedes un excelente día, en esta ocasión les traigo un nuevo artículo, pero esta vez un artículo con respecto a **GEOCODER**, existen dos formas:

- **Geocodificación:** Es el proceso de convertir direcciones en coordenadas geográficas que puedes usarlas para disponer marcadores en un mapa o posicionar el mapa. 
- **Geocodificación Inversa:** Es el proceso de convertir coordenadas geográficas en direcciones en lenguaje natural.

La anterior información se sacó de la web de [**google-maps**](https://developers.google.com/maps/documentation/geocoding/intro?hl=es-419){:target="_blank"}.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="{{site.baseurl}}/images/posts/ionic2/2017-03-06-google-maps-and-geocoder/cover.jpg" alt="Ionic Push Notifications"></amp-img>

Antes de iniciar recomiendo haber leído estos artículos de nuestros compañeros.

Aquí enseña cómo obtener el ApiKey: [**Google Maps Native**]({{site.urlblog}}/ionic2/google-maps-native/){:target="_blank"}

Aquí enseña a como colocar un marcador en nuestro mapa: [**Google Maps Markers**]({{site.urlblog}}/ionic2/google-maps-markers/){:target="_blank"}

Entonces ya teniendo el concepto claro y de haber leído los artículos anteriores, vamos a proceder a realizar nuestro proyecto de ejemplo.

## Pasos

1.- Abrimos nuestra terminal y ejecutamos esto (para crear un nuevo proyecto)

```
ionic start geocoder blank
```

2.- Una vez que ya nos creó el proyecto, ingresamos haciendo esto:

```
cd geocoder 
```

3.- Añadimos la plataforma que vamos a usar, en este caso es android y colocamos esto en la terminal:

```
ionic cordova platform add android
```

4.- Ahora que hemos agregado la plataforma podemos hacer uso de [**Ionic Native**](https://www.ion-book.com/blog/ionic2/ionic-native/){:target="_blank"}, para incluir a `Geolocation`, `GoogleMaps`, y `Toast` sólo tenemos que hacer esto:

`Geolocation`

```
ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="The app need the geolocation"
npm install @ionic-native/geolocation --save
```

`Google Maps Nativo`

```
ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE" --save
npm install @ionic-native/google-maps --save
```

**Nota:** Tenemos que colocar en **YOUR_ANDROID_API_KEY_IS_HERE** nuestro ApiKey que habíamos generado

`Toast`

```
ionic cordova plugin add cordova-plugin-x-toast
npm install @ionic-native/toast --save
```

5.- Ahora debemos importar los servicios de Geolocation, GoogleMaps, Geocoder y Toast en el array de providers en el archivo `src/app/app.module.ts`, así:

```ts
...
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';
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
    Geocoder,
    Toast
    ...
  ]
})
export class AppModule {}
```


6.- Ahora tenemos que abrir el proyecto con un editor, para ionic, uso Visual Studio Code, en la terminal si usas visualStudioCode simplemente haz esto: 

```
code .
```

6 .- Copiamos el script que realizó [**Mayra Rodriguez**]({{site.urlblog}}/authors/mayrititis/){:target="_blank"} en su post anterior sobre [**Google Maps Markers**]({{site.urlblog}}/ionic2/google-maps-markers/){:target="_blank"}, ya lo tienes copiado verdad?.

Ok, quiero creer que es así, entonces tenemos que modificar las importaciones de ionic-native.

Teníamos esto:

```ts
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions
} from '@ionic-native/google-maps';
```

Y cambiemoslo a esto:

```ts
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Geocoder, 
  GeocoderRequest, 
  GeocoderResult,
} from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';
```

En una parte de nuestro código tenemos esto:

```ts
addMarker(options){
  let markerOptions: MarkerOptions = {
    position: new LatLng(options.position.latitude, options.position.longitude),
    title: options.title,
    icon: options.icon
  };
  this.map.addMarker(markerOptions);
}
```

Y cambiemoslo a esto:

```ts

addMarker(options){
  let markerOptions: MarkerOptions = {
    position: new LatLng(options.position.latitude, options.position.longitude),
    title: options.title,
    icon: options.icon
  };
  this.map.addMarker(markerOptions)
  .then(marker =>{
    this.doGeocode(marker);
  })
}
```

La función `doGeocode`, que es la que se encarga de convertir coordenadas geográficas en direcciones, será así:

```ts
doGeocode(marker){
  let request: GeocoderRequest = {
    position: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
  };
  this.geocoder.geocode(request)
  .then((results: GeocoderResult) => {
    let address = [
      (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
      results[0].locality
    ].join(", ");
    console.log("data_: ", address);
    marker.setTitle(address);
    marker.showInfoWindow();
  });
}
```

8.- La clase completa finalmente quedará así:

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
  MarkerOptions,
  Geocoder, 
  GeocoderRequest, 
  GeocoderResult,
} from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  myPosition: any = {};
 
  constructor(
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private googleMaps: GoogleMaps,
    private geocoder: Geocoder,
    private toast: Toast
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
      console.log(error–);
      //this.toast.show("No se ha podido obtener su ubicación", '5000', 'center')
      //.subscribe(toast => console.log(toast) );
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
        title: "Hello"
      };

      this.addMarker(markerOptions);
    });
  }

  addMarker(options){
    let markerOptions: MarkerOptions = {
      position: new LatLng(options.position.latitude, options.position.longitude),
      title: options.title,
      icon: options.icon
    };
    this.map.addMarker(markerOptions)
    .then(marker =>{
      this.doGeocode(marker);
    })
  }

  doGeocode(marker){
    let request: GeocoderRequest = {
      position: new LatLng(this.myPosition.latitude, this.myPosition.longitude),
    };
    this.geocoder.geocode(request)
    .then((results: GeocoderResult) => {
      let address = [
        (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
        results[0].locality
      ].join(", ");
      console.log("data_: ", address);
      marker.setTitle(address);
      marker.showInfoWindow();
    });
  }
}

```

9.- Ya tenemos todo listo, ahora tenemos que construir el App e instalarlo en nuestro celular. Hacemos esto:

```
ionic cordova build android --prod
ionic cordova run android --prod
```

## Resultado:

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="1080" height="1920" layout="responsive" src="{{site.baseurl}}/images/posts/ionic2/2017-03-06-google-maps-and-geocoder/result.png"></amp-img>
  </div>
</div>
<br/>