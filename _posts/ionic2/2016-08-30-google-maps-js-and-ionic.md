---
layout: post
title: "Google Maps JS + Ionic en 5 pasos"
date: 2017-05-16
tags: [maps, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo105"
author: nicobytes
cover: "/images/posts/ionic2/2016-08-30-google-maps-js-and-ionic/cover.png"
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

> La interacción con mapas en aplicaciones móviles es muy común y en este artículo explicaremos cómo integrar **Google Maps** usando el SDk de JS con **Ionic**.

<amp-img width="1200" height="630" layout="responsive" src="/images/posts/ionic2/2016-08-30-google-maps-js-and-ionic/cover.png"></amp-img>

## Actualización (14/05/2017)
<hr/>

Hemos actualizado este demo con el último release de **Ionic 3**, si aún estas en alguna de las versiones anteriores puedes seguir estos pasos [de Ionic 2 a Ionic 3](https://www.ion-book.com/blog/tips/ionic-2-to-ionic3/){:target="_blank"}.

Ademas en este demo usamos la función de [**lazy loading** y **@IonicPage**](https://www.ion-book.com/blog/tips/ionic-page-and-lazy-loading/){:target="_blank"}. Puedes ver el repositorio [**Demo105**](https://github.com/ion-book/demo105){:target="_blank"}

<hr/>

Hay dos maneras de implementar google maps en nuestras aplicaciones, una es manejando el **SDK de JS** y la otra manera es integrar el **SDK nativo** al proyecto, en este artículo veremos cómo hacerlo con el SDK de JS.

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo105 blank
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo105
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="183" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/tree1.png"></amp-img>
  </div>
</div>

## Paso 2: Instalando Geolocation

Para conocer la ubicación del usuario vamos a instalar el plugin de **Geolocalización**:

```
ionic cordova plugin add cordova-plugin-geolocation --save
npm install @ionic-native/geolocation --save
```

Ahora debemos importar el servicio de Geolocation en el array de providers en el archivo `src/app/app.module.ts`, así:

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
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

## Paso 3: Incluir el SDk

Ahora iremos al archivo `index.html` que se encuentra la carpeta `src` y luego de llamar a `build/polyfills.js` incluimos el SDK, ademas tienes que agregar el **API KEY** que te ofrece google para usar el SDK, lo puedes generar desde está [URL](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=es){:target="_blank"}.

```html
<body>

  <!-- Ionic's root component and where the app will load -->
  <ion-app></ion-app>

  <!-- The polyfills js is generated during the build process -->
  <script src="build/polyfills.js"></script>

  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
  <!-- The bundle js is generated during the build process -->
  <script src="build/main.js"></script>

</body>
```

{% include blog/subscribe.html %}

## Paso 4: Crear mapa.

Ahora ya tenemos lo necesario para integrar mapas en nuestra aplicación, vamos a realizar la importación de las librerías referente al plugin que instalamos. Para esto nos dirigimos a la carpeta del proyecto creado por ionic `app/page` y abrimos el archivo `home.ts` e importamos las librerías y por último vamos a declarar una variable global para google `declare var google;`.

```ts
...

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation
  ) {

...
```

Las librería Geolocation hace parte de [**Ionic Native**]({{site.urlblog}}/ionic2/ionic-native){:target="_blank"}

Para este ejemplo vamos a declarar dos métodos en nuestro archivo `home.ts` estos se llamarán:

`getPosition()`: Este método nos devolverá la posición actual del dispositivo en coordenadas de latitud y longitud. Para esto debe de estar activo el servicio de GPS del dispositivo. En este método usaremos la librería Geolocation ya que esta tiene una función que nos recupera la posición actual del dispositivo. Estas coordenadas son pasadas al método `loadMap(coordenadas)`.

```ts
getPosition():any{
  this.geolocation.getCurrentPosition().then(response => {
    this.loadMap(response);
  })
  .catch(error =>{
    console.log(error);
  })
}
```

`loadMap(postion: Geoposition)`: Este método recibe como parámetro las coordenadas expresadas en latitud y longitud (estas coordenadas son tomadas del método `obtenerPosicion()`) y posiciona el mapa en la posición actual del dispositivo.

```ts
loadMap(position: Geoposition){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);
  
  // create a new map by passing HTMLElement
  let mapEle: HTMLElement = document.getElementById('map');

  // create LatLng object
  let myLatLng = {lat: latitude, lng: longitude};

  // create map
  this.map = new google.maps.Map(mapEle, {
    center: myLatLng,
    zoom: 12
  });

  google.maps.event.addListenerOnce(this.map, 'idle', () => {
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: 'Hello World!'
    });
    mapEle.classList.add('show-map');
  });
}
```

## Paso 5: Template y estilos.

Ahora en el archivo `home.html` vamos a declarar un div con id **map** para poder identificar el elemento sobre el cual vamos a mostrar el mapa.

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Demo 105
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <div id="map"></div>
</ion-content>
```

Y finalmente podemos añadir estilos para hacer que el mapa se muestre al 100% de alto y ancho de la pantalla, estos estilos estaran en el archivo `home.scss`:

```scss
page-home {
  ion-content{
    background: rgb(229, 227, 223);
    #map {
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 150ms ease-in;
      display: block;
      &.show-map{
        opacity: 1;
      }
    }
  }
}
```

Finalmente toda la clase `HomePage` queda así:

```ts
import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation
  ) {}

  ionViewDidLoad(){
    this.getPosition();
  }

  getPosition():any{
    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }
}
```

Ya con esto debería de quedar todo listo. Ahora podemos probar nuestro proyecto.

```
ionic serve
```

## Resultado:

<div class="row">
  <div class="col col-100 col-md-33 offset-md-33 col-lg-33 offset-lg-33">
    <amp-img width="1080" height="1920" layout="responsive" src="/images/posts/ionic2/2016-08-30-google-maps-js-and-ionic/screen.jpg"></amp-img>
  </div>
</div>
<br/>