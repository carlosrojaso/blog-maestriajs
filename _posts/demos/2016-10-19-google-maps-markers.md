---
layout: post
title: "Google Maps con Markers"
date: 2016-10-19
tags: [maps, demos, ionic2]
categories: demos
comments: true
repo: "https://github.com/mayrarodriguez1709/ionic2-google-maps-markers"
author: mayrititis
cover: "http://i.cubeupload.com/y2EKrQ.jpg"
remember: true
---

> Ya hemos visto en los posts anteriores sobre cómo integrar Google Maps con nuestra aplicación en Ionic 2, bien sea de forma [nativa](http://www.ion-book.com/ionic2/google-maps-native){:target="_blank"} o con [javascript](http://www.ion-book.com/demos/google-maps-js-and-ionic-2){:target="_blank"}. En este post veremos un poco más sobre la integración de **Google Maps con Ionic 2** y es sobre el tema de los **Markers**.

<img class="img-responsive" src="http://i.cubeupload.com/y2EKrQ.jpg" alt="google-maps-markers">

Los **Markers** nos permiten identificar un lugar en el mapa siempre y cuando tengamos las coordenadas geográficas, por defecto Google Maps trae un icono de color rojo que muchos seguramente conocen, sin embargo podemos personalizarlo, lo cual es sorprendentemente sencillo e increiblemente util. 

## 1. Creación del proyecto

```
ionic start gm-markers blank --v2
```

## 2. Instalación de los Plugins de Cordova y de las Api keys de Android y iOS 

Si te sientes un poco perdido sobre el tema de las Api keys, te invito a leer el post de [**Google maps native**](http://www.ion-book.com/ionic2/google-maps-native){:target="_blank"}

```
cd gm-markers
```

```
ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE
```

```
ionic plugin add cordova-plugin-geolocation
```

## 3. Integración de Google Maps Nativo

Tomando en cuenta el post de [**Google maps native**](http://www.ion-book.com/ionic2/google-maps-native){:target="_blank"}, integramos rapidamente nuestro mapa.

En `home.html`, debemos colocar un div con nuestro id ‘map’, o como queramos llamarlo.

{% highlight html linenos%}
<ion-header>
  <ion-navbar>
    <ion-title>
      Google Map
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <div id="map"></div>  
</ion-content>
{% endhighlight %}

En nuestro `home.ts`, importamos las librerias para el map, la geolocalización y las referentes al Marker

{% highlight ts%}
import {Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, 
  GoogleMapsMarkerOptions, GoogleMapsMarker, Toast} from 'ionic-native';
{% endhighlight %}

Dentro de la clase declaramos dos variables

{% highlight ts%}
map: GoogleMap;
latLng: any;
{% endhighlight %}

En el constructor llamamos a la función `getCurrentPosition()` para obtener la position del usuario.

{% highlight ts%}
constructor(public navCtrl: NavController, private platform: Platform) {
  platform.ready().then(() => {
      this.getCurrentPosition();
  });
}
{% endhighlight %}

Luego escribimos la función para obtener la localización:

{% highlight ts%}
getCurrentPosition(){
  Geolocation.getCurrentPosition()
    .then(position => {

      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      this.latLng = new GoogleMapsLatLng(lat, lng)

      this.loadMap();
  });
}
{% endhighlight %}

Así mismo escribimos la función para cargar el mapa, la cual he decido llamar `loadMap()`

{% highlight ts%}
loadMap(){
  this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
      'compass': true,
      'myLocationButton': true,
      'indoorPicker': true,
      'zoom': true,
    },
    'gestures': {
      'scroll': true,
      'tilt': true,
      'rotate': true,
      'zoom': true
    },
    'camera': {
      'latLng': this.latLng,
      'tilt': 30,
      'zoom': 15,
      'bearing': 50
    }
  });

  this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
    console.log('Map is ready!');
  });
}
{% endhighlight %}

Ahora ejecuta:

```
ionic run android ó ionic run ios 
```

para corroborar que funcione bien el mapa.

## 4 .Colocando el Marker

Una vez concluido el paso anterior colocaremos justo debajo de `console.log(‘Map is ready’)` la llamada a la función que mostrará nuestro **marker** la cual recibe el nombre de `setMarker()`

Esta función contendrá lo siguiente

{% highlight ts%}
setMarker(){
  //primero validamos que tengamos los datos de la localización
  if(this.latLng){

    //De esta forma estamos colocando el marker en la posicion de nuestra ubicación, con el titulo ‘Mi posición’
    let markerOptions: GoogleMapsMarkerOptions = {
      position: this.latLng,
      title: 'Mi posición'
    };
      
    //Luego lo agregamos al mapa, y una vez agregado llamamos la función showInfoWindow() para mostrar el título señalado anteriormente.

    this.map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
    });
  }else{
    
    //En caso de no obtener la ubicación es bueno señalar al usuario porque no se mostró el marker
    Toast.show("No se ha podido obtener su ubicación", '5000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
}
{% endhighlight %}

**Resultado:**

<div class="row">
  <div class="col-xs-12 col-sm-6 col-sm-offset-3">
    <img class="img-responsive" src="http://i.cubeupload.com/qmD4AO.png" alt="app">
  </div>
</div>

## 5 .Colocando nuestro Marker Personalizado

Para colocarle una imagen personalizada nuestro marker, basta con almacenar la imagen en la carpeta de `assets` ubicada en el directorio `src`, luego guardamos la dirección desde la raíz de nuestro proyecto en una variable:


{% highlight ts%}
let customMarker = "www/assets/custom-marker.png";
{% endhighlight %}

y agregamos `icon: customMarker` en los parámetros que recibe el `markerOptions`, de la siguiente manera:

{% highlight ts%}
let markerOptions: GoogleMapsMarkerOptions = {
  position: this.latLng,
  title: 'Mi posicion',
  icon: customMarker
};
{% endhighlight %}

Ahora ejecuta:

```
ionic run android ó ionic run ios 
```

**y voila!** 

<div class="row">
  <div class="col-xs-12 col-sm-6 col-sm-offset-3">
    <img class="img-responsive" src="http://i.cubeupload.com/3jjfy6.png" alt="app 2">
  </div>
</div>

### Enlaces de Referencia

- [https://developers.google.com/maps/documentation/javascript/markers](https://developers.google.com/maps/documentation/javascript/markers){:target="_blank"}
- [http://ionicframework.com/docs/v2/native/googlemap](http://ionicframework.com/docs/v2/native/googlemap){:target="_blank"}