---
layout: post
title: "Google Maps Nativo con Ionic"
date: 2017-11-09
tags: [maps, demos, ionic2]
categories: ionic2
author: daniel_lsanchez
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fcover.jpg?alt=media&token=8134c475-9cd1-4819-8f3c-a2b0afb851fc"
remember: true
repo: "https://github.com/ng-classroom/demo111"
editname: "ionic2/2017-11-09-google-maps-native.md"
versions:
  - title: 'ionic'
    number: '3.8.0'
  - title: 'ionic-native'
    number: '4.3.3'
  - title: 'ionic-app-scripts'
    number: '3.0.1'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.16.0'
  - title: 'cordova-plugin-googlemaps'
    number: '2.1.0'
---

> Hola a todos, en esta ocasión les traemos un pequeño ejemplo de cómo poder implementar **Google Maps Nativo** en tu proyecto de **Ionic**, es algo muy sencillo y de seguro que con estas bases podrás dar inicio a una gran idea.

<amp-img width="1200" height="675" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fcover.jpg?alt=media&token=8134c475-9cd1-4819-8f3c-a2b0afb851fc"></amp-img>

{% include general/net-promoter-score.html %} 

# Actualización (08/11/2017)
<hr/>

Hemos actualizado este demo con el último release **Ionic 3.8**.

También funciona con la más reciente versión de cordova-plugin-googlemaps (v2.1.0) que tiene un increíble rendimiento y una excelente integración con ionic native 4.

<a href="https://github.com/ion-book/demo111" target="_blank" class="btn btn-round btn-success">Ver demo</a>

<div class="row">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen8.jpg?alt=media&token=54ac1265-8d4a-437c-997d-8e33d34783a0"></amp-img>
  </div>
</div>

<hr/>

Para integrar Google Maps en tu aplicación es necesario que te registres en la cuenta de Google para desarrolladores y generes el API KEY de la aplicación ya sea para android o ios, esta te permitirá trabajar con Google Maps. Aquí dejo el link para ingresar a generar la key [**Link**](https://developers.google.com/maps/?hl=es-419.){:target="_blank"}

<amp-img width="1200" height="800" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen1.jpg?alt=media&token=8f2d303d-33ef-4b52-82b1-d81589800af0"></amp-img>

Una vez nos encontramos en la plataforma de google, es necesario que selecciones la tecnología con la cual se integrará Google Maps, para este ejemplo lo trabajaremos para la plataforma Android.

Al seleccionar la plataforma nos aparecerá una serie de textos los cuales nos explican sobre Google Maps (esto lo puedes leer para que te enteres de todo lo que google tiene para nosotros trabajar con mapas), en este paso vamos a dar click en la parte superior de la ventana sobre costado derecho en el botón **“Obtener una clave”**.

<amp-img width="1200" height="800" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen2.jpg?alt=media&token=4158e6b4-754a-4902-9ea8-514f138be779"></amp-img>
<amp-img width="1200" height="800" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen3.jpg?alt=media&token=4430cca2-ebee-466f-b3a6-d82707ad6dc5"></amp-img>

En la ventana que se nos abre, nos dirigimos a seleccionar la opción **“Crear proyecto”** y continuar.

<div class="row">
  <div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="521" height="374" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen4.jpg?alt=media&token=03b31eb8-49f7-458d-9979-55d04832ba28"></amp-img>
  </div>
</div>

Continuamos digitando el nombre de nuestra aplicación para con este reconocer la clave generada por Google Maps. Yo he nombrado la app con el nombre **“MapasNativo”** y este será el nombre de nuestra aplicación.

<amp-img width="915" height="580" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen5.jpg?alt=media&token=16f7c010-47f6-48a5-9660-e63222c400fb"></amp-img>

Apenas tengas lista la información, puedes pulsar el botón de **“Crear”** para que google te genere el id de tu producto.

<div class="row">
  <div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="609" height="335" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen6.jpg?alt=media&token=4ff22316-ca77-48ee-9f19-708cf80d31c9"></amp-img>
  </div>
</div>

Copia esta clave API ya que con esta realizaremos la integración con Google Maps.

El siguiente paso es crear nuestra aplicación Ionic, en este caso usare la plantilla blank que trae ionic.

```
ionic start demo111 blank --cordova
```

Una vez se crea el proyecto, nos dirigimos a la carpeta que ionic crea con su estructura para comenzar a integrar Google Maps en nuestra aplicación.

```
cd demo111
```

Luego instalamos las plataformas para las cuales queremos desarrollar:

```
ionic cordova plataform add android
ionic cordova plataform add ios
```

Para integrar **Google Maps Nativo** de ionic, necesitaremos hacer uso del plugin de `Google Maps`.

Google Maps:

```
ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE" --save
npm install @ionic-native/google-maps --save
```

Ahora debemos importar el servicio de GoogleMaps en el array de providers en el archivo `src/app/app.module.ts`, así:

```ts
...
import { GoogleMaps } from '@ionic-native/google-maps';
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
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```
 
Ahora ya tenemos lo necesario para integrar mapas en nuestra aplicación, vamos a realizar la importación de las librerías referentes a los plugin que instalamos. Para esto nos dirigimos a la carpeta del proyecto creado por ionic `app/page` y abrimos el archivo `home.ts` e importamos las librerías.

```ts
...

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
  ) {

...
```

Las libreriía de GoogleMaps hace parte de [**Ionic Native**]({{site.urlbloglog}}/ionic2/ionic-native){:target="_blank"}:

Para este ejemplo vamos a declarar dos métodos en nuestro archivo `home.ts` estos se llamarán:

`loadMap()`: Este método va a crear la instancia del mapa.

```ts
loadMap(){

  let mapOptions: GoogleMapOptions = {
    camera: {
      target: {
        lat: 43.0741904, // default location
        lng: -89.3809802 // default location
      },
      zoom: 18,
      tilt: 30
    }
  };

  this.map = this.googleMaps.create('map_canvas', mapOptions);

  // Wait the MAP_READY before using any methods.
  this.map.one(GoogleMapsEvent.MAP_READY)
  .then(() => {
    // Now you can use all methods safely.
    this.getPosition();
  })
  .catch(error =>{
    console.log(error);
  });

}
```

`obtenerPosicion()`: Este método nos devolverá la posición actual del dispositivo en coordenadas de latitud y longitud. Para esto debe de estar activo el servicio de GPS del dispositivo. En este método usa la misma instancia del mapa para recuperar la posición actual del dispositivo. Luego dibuja un marker.

```ts
getPosition(): void{
  this.map.getMyLocation()
  .then(response => {
    this.map.moveCamera({
      target: response.latLng
    });
    this.map.addMarker({
      title: 'My Position',
      icon: 'blue',
      animation: 'DROP',
      position: response.latLng
    });
  })
  .catch(error =>{
    console.log(error);
  });
}
```

{% include blog/adIonic.html %}

Finalmente toda la clase `HomePage` queda así:

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;

  constructor(
    private navCtrl: NavController,
    private googleMaps: GoogleMaps
  ) {}

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });

  }

  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }

}
```

Ahora vamos a abrir el archivo `home.html` y vamos a incluir un div con un `id=”map_canvas”`.

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Demo 111
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <div id="map_canvas"></div>
</ion-content>
```

Ahora vamos a nuestro archivo `home.scss` e incluiremos el siguiente código.

```css
page-home {
  #map_canvas{
    display: block;
    height: 100%;
    width: 100%;
  }
}
```

Ya con esto debería de quedar todo listo. Ahora vamos a compilar nuestro proyecto y realizaremos una prueba.

```
ionic cordova run  android --prod
```

NOTA: Recuerda activar el acceso a mapas de la aplicación por la configuración del celular en aplicaciones.

# Resultados de la aplicación: 

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen7.jpg?alt=media&token=530498cc-73dc-4335-9c84-2968b59c3129"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen9.jpg?alt=media&token=5dae3c92-8c3b-446d-95f4-5bbfa388019e"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fgoogle-maps-native%2Fscreen8.jpg?alt=media&token=54ac1265-8d4a-437c-997d-8e33d34783a0"></amp-img>
  </div>
</div>