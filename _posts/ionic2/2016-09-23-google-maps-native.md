---
layout: post
title: "Google Maps Nativo con Ionic"
date: 2016-09-23
tags: [maps, demos, ionic2]
categories: ionic2
author: daniel_lsanchez
cover: "/images/posts/ionic2/2016-09-23-google-maps-native/cover.jpg"
remember: true
repo: "https://github.com/ion-book/demo111"
versions:
  - title: 'ionic'
    number: '3.0.1'
  - title: 'ionic-native'
    number: '3.0.1'
  - title: 'cordova-cli'
    number: '6.5.0'
  - title: 'ionic-cli'
    number: '2.2.2'
---

> Hola a todos, en esta ocasión les traemos un pequeño ejemplo de cómo poder implementar **Google Maps Nativo** en tu proyecto de **Ionic**, es algo muy sencillo y de seguro que con estas bases podrás dar inicio a una gran idea.

<amp-img width="1200" height="675" layout="responsive" src="/images/posts/ionic2/2016-09-23-google-maps-native/cover.jpg"></amp-img>

# Actualización (19/04/2017)
<hr/>

Hemos actualizado este demo con el último release de **Ionic 3**, si aún estas en alguna de las versiones anteriores puedes seguir estos pasos [de Ionic 2 a Ionic 3](https://www.ion-book.com/blog/tips/ionic-2-to-ionic3/){:target="_blank"}.

Ademas en este demo se usa la funcion de lazy loading y @IonicPage. 

Para integrar Google Maps en tu aplicación es necesario que te registres en la cuenta de Google para desarrolladores y generes el API KEY de la aplicación ya sea para android o ios, esta te permitirá trabajar con Google Maps. Aquí dejo el link para ingresar a generar la key [**Link**](https://developers.google.com/maps/?hl=es-419.){:target="_blank"}

<amp-img width="1200" height="800" layout="responsive" src="http://i.cubeupload.com/kX4StC.jpg"></amp-img>

Una vez nos encontramos en la plataforma de google, es necesario que selecciones la tecnología con la cual se integrará Google Maps, para este ejemplo lo trabajaremos para la plataforma Android.

Al seleccionar la plataforma nos aparecerá una serie de textos los cuales nos explican sobre Google Maps (esto lo puedes leer para que te enteres de todo lo que google tiene para nosotros trabajar con mapas), en este paso vamos a dar click en la parte superior de la ventana sobre costado derecho en el botón **“Obtener una clave”**.

<amp-img width="1200" height="800" layout="responsive" src="http://i.cubeupload.com/ftWfcm.jpg"></amp-img>
<amp-img width="1200" height="800" layout="responsive" src="http://i.cubeupload.com/Wpn8Ga.jpg"></amp-img>

En la ventana que se nos abre, nos dirigimos a seleccionar la opción **“Crear proyecto”** y continuar.

<div class="row">
  <div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="521" height="374" layout="responsive" src="http://i.cubeupload.com/48GboH.jpg"></amp-img>
  </div>
</div>

Continuamos digitando el nombre de nuestra aplicación para con este reconocer la clave generada por Google Maps. Yo he nombrado la app con el nombre **“MapasNativo”** y este será el nombre de nuestra aplicación.

<amp-img width="915" height="580" layout="responsive" src="http://i.cubeupload.com/5iOdPK.jpg"></amp-img>

Apenas tengas lista la información, puedes pulsar el botón de **“Crear”** para que google te genere el id de tu producto.

<div class="row">
  <div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="609" height="335" layout="responsive" src="http://i.cubeupload.com/QucGs7.jpg"></amp-img>
  </div>
</div>

Copia esta clave API ya que con esta realizaremos la integración con Google Maps.

El siguiente paso es crear nuestra aplicación Ionic, en este caso usare la plantilla blank que trae ionic.

```
ionic start demo111 blank --v2
```

<div class="row">
  <div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="586" height="402" layout="responsive" src="http://i.cubeupload.com/asIPEb.jpg"></amp-img>
  </div>
</div>

Una vez se crea el proyecto, nos dirigimos a la carpeta que ionic crea con su estructura para comenzar a integrar Google Maps en nuestra aplicación.

```
cd MapasNativo
```

Para integrar Google Maps Nativo de ionic 2, necesitaremos hacer uso de 2 plugins: Geolocalización y Google Maps.

Ya sabiendo cuales son los plugins a instalar, procedemos a agregarlos a nuestra aplicación.

Geolocalización:

```
ionic plugin add cordova-plugin-geolocation --save
npm install @ionic-native/geolocation --save
```

Google Maps:

```
ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE" --save
npm install @ionic-native/google-maps --save
```
<div class="row">
  <div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="586" height="402" layout="responsive" src="http://i.cubeupload.com/NamKFU.jpg"></amp-img>
  </div>
</div>


Ahora debemos importar los servicios de Geolocation y GoogleMaps en el array de providers en el archivo `src/app/app.module.ts`, así:

{% highlight ts linenos %}
...
import { Geolocation } from '@ionic-native/geolocation';
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
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
{% endhighlight %}
 
Ahora ya tenemos lo necesario para integrar mapas en nuestra aplicación, vamos a realizar la importación de las librerías referentes a los plugin que instalamos. Para esto nos dirigimos a la carpeta del proyecto creado por ionic `app/page` y abrimos el archivo `home.ts` e importamos las librerías.

{% highlight ts linenos %}
...

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
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
    public googleMaps: GoogleMaps
  ) {

...
{% endhighlight %}

Las librerias Geolocation y GoogleMaps hacen parte de [**Ionic Native**]({{site.urlblog}}/ionic2/ionic-native){:target="_blank"}:

Para este ejemplo vamos a declarar dos métodos en nuestro archivo `home.ts` estos se llamarán:

`obtenerPosicion()`: Este método nos devolverá la posición actual del dispositivo en coordenadas de latitud y longitud. Para esto debe de estar activo el servicio de GPS del dispositivo. En este método usaremos la librería Geolocation ya que esta tiene una función que nos recupera la posición actual del dispositivo. Estas coordenadas son pasadas al método `loadMap(coordenadas)`.

{% highlight ts %}
obtenerPosicion():any{
  this.geolocation.getCurrentPosition().then(response => {
    this.loadMap(response);
  })
  .catch(error =>{
    console.log(error);
  })
}
{% endhighlight %}

`loadMap(postion: Geoposition)`: Este método recibe como parámetro las coordenadas expresadas en latitud y longitud (estas coordenadas son tomadas del método `obtenerPosicion()`) y posiciona el mapa en la posición actual del dispositivo.

{% highlight ts linenos %}
loadMap(postion: Geoposition){
  let latitude = postion.coords.latitude;
  let longitud = postion.coords.longitude;
  console.log(latitude, longitud);
  
  // create a new map by passing HTMLElement
  let element: HTMLElement = document.getElementById('map');

  let map: GoogleMap = this.googleMaps.create(element);

  // create LatLng object
  let myPosition: LatLng = new LatLng(latitude,longitud);

  // create CameraPosition
  let position: CameraPosition = {
    target: myPosition,
    zoom: 18,
    tilt: 30
  };

  map.one(GoogleMapsEvent.MAP_READY).then(()=>{
    console.log('Map is ready!');

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: myPosition,
      title: 'Here'
    };
    map.addMarker(markerOptions);
  });

}
{% endhighlight %}

Finalmente toda la clase `HomePage` queda así:

{% highlight ts linenos %}
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
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
    public googleMaps: GoogleMaps
  ) {}

  ionViewDidLoad(){
    this.obtenerPosicion();
  }

  obtenerPosicion():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(postion: Geoposition){
    let latitude = postion.coords.latitude;
    let longitud = postion.coords.longitude;
    console.log(latitude, longitud);
   
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // create LatLng object
    let myPosition: LatLng = new LatLng(latitude,longitud);

    // create CameraPosition
    let position: CameraPosition = {
      target: myPosition,
      zoom: 18,
      tilt: 30
    };

    map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      map.moveCamera(position);

      // create new marker
      let markerOptions: MarkerOptions = {
        position: myPosition,
        title: 'Here'
      };
      map.addMarker(markerOptions);
    });

  }

}
{% endhighlight %}

Ahora vamos a abrir el archivo `home.html` y vamos a incluir un div con un `id=”map”`.

{% highlight html linenos %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Demo 111
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <div id="map"></div>
</ion-content>
{% endhighlight %}

Ahora vamos a nuestro archivo `home.scss` e incluiremos el siguiente código.

{% highlight scss linenos %}
page-home {
  #map{
    display: block;
    height: 100%;
    width: 100%;
  }
}
{% endhighlight %}

Ya con esto debería de quedar todo listo. Ahora vamos a compilar nuestro proyecto y realizaremos una prueba.

```
ionic platform add android
ionic build android --prod
```

NOTA: Recuerda activar el acceso a mapas de la aplicación por la configuración del celular en aplicaciones.

# Resultados de la aplicación: 

<div class="row">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-09-23-google-maps-native/result1.jpeg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-09-23-google-maps-native/result2.jpeg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-09-23-google-maps-native/result3.jpeg"></amp-img>
  </div>
</div>