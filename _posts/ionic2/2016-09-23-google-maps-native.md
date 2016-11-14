---
layout: post
title: "Google Maps Nativo con Ionic 2"
date: 2016-09-23
tags: [maps, demos, ionic2]
categories: ionic2
comments: true
author: daniel_lsanchez
cover: "http://i.cubeupload.com/vzI3hJ.jpg"
---

> Hola a todos, en esta ocasión les traemos un pequeño ejemplo de cómo poder implementar **Google Maps Nativo** en tu proyecto de **Ionic 2**, es algo muy sencillo y de seguro que con estas bases podrás dar inicio a una gran idea.

<img class="img-responsive" src="http://i.cubeupload.com/vzI3hJ.jpg" alt="google maps">

Para integrar Google Maps en tu aplicación es necesario que te registres en la cuenta de Google para desarrolladores y generes el API KEY de la aplicación ya sea para android o ios, esta te permitirá trabajar con Google Maps. Aquí dejo el link para ingresar a generar la key [**Link**](https://developers.google.com/maps/?hl=es-419.){:target="_blank"}

<img class="img-responsive" src="http://i.cubeupload.com/kX4StC.jpg" alt="step 1">

Una vez nos encontramos en la plataforma de google, es necesario que selecciones la tecnología con la cual se integrará Google Maps, para este ejemplo lo trabajaremos para la plataforma Android.

Al seleccionar la plataforma nos aparecerá una serie de textos los cuales nos explican sobre Google Maps (esto lo puedes leer para que te enteres de todo lo que google tiene para nosotros trabajar con mapas), en este paso vamos a dar click en la parte superior de la ventana sobre costado derecho en el botón **“Obtener una clave”**.

<img class="img-responsive" src="http://i.cubeupload.com/ftWfcm.jpg" alt="step 2">
<img class="img-responsive" src="http://i.cubeupload.com/Wpn8Ga.jpg" alt="step 3">

En la ventana que se nos abre, nos dirigimos a seleccionar la opción **“Crear proyecto”** y continuar.

<img class="img-responsive" src="http://i.cubeupload.com/48GboH.jpg" alt="step 4">

Continuamos digitando el nombre de nuestra aplicación para con este reconocer la clave generada por Google Maps. Yo he nombrado la app con el nombre **“MapasNativo”** y este será el nombre de nuestra aplicación.

<img class="img-responsive" src="http://i.cubeupload.com/5iOdPK.jpg" alt="step 5">

Apenas tengas lista la información, puedes pulsar el botón de **“Crear”** para que google te genere el id de tu producto.

<img class="img-responsive" src="http://i.cubeupload.com/QucGs7.jpg" alt="step 6">

Copia esta clave API ya que con esta realizaremos la integración con Google Maps.

El siguiente paso es crear nuestra aplicación Ionic, en este caso usare la plantilla blank que trae ionic.

```
ionic start MapasNativo blank --v2
```

<img class="img-responsive" src="http://i.cubeupload.com/asIPEb.jpg" alt="step 7">

Una vez se crea el proyecto, nos dirigimos a la carpeta que ionic crea con su estructura para comenzar a integrar Google Maps en nuestra aplicación.

```
cd MapasNativo
```

Para integrar Google Maps Nativo de ionic 2, necesitaremos hacer uso de 2 plugins: Geolocalización y Google Maps.

Ya sabiendo cuales son los plugins a instalar, procedemos a agregarlos a nuestra aplicación.

Geolocalización:

```
ionic plugin add cordova-plugin-geolocation
```

Google Maps:

```
ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID=”Ingresa el api key que generaste para android” --variable API_KEY_FOR_IOS=”Ingresa el api key que generaste para ios”
```

<img class="img-responsive" src="http://i.cubeupload.com/NamKFU.jpg" alt="step 9">

Ahora ya tenemos lo necesario para integrar mapas en nuestra aplicación, vamos a realizar la importación de las librerías referentes a los plugin que instalamos. Para esto nos dirigimos a la carpeta del proyecto creado por ionic “app/page” y abrimos el archivo “home.ts” e importamos las librerías.

{% highlight ts linenos %}
import { Geolocation, GoogleMapsEvent, GoogleMapsLatLng, GoogleMap } from 'ionic-native';
{% endhighlight %}

Las librerias Geolocation y GoogleMaps hacen parte de [**Ionic Native**](http://www.ion-book.com/ionic2/ionic-native){:target="_blank"}:

<img class="img-responsive" src="http://i.cubeupload.com/4kBzpX.jpg" alt="step 10">

Para este ejemplo vamos a declarar dos métodos en nuestro archivo `home.ts` estos se llamarán:

`obtenerPosicion()`: Este método nos devolverá la posición actual del dispositivo en coordenadas de latitud y longitud. Para esto debe de estar activo el servicio de GPS del dispositivo. En este método usaremos la librería Geolocation ya que esta tiene una función que nos recupera la posición actual del dispositivo. Estas coordenadas son pasadas al método `loadMap(coordenadas)`.

{% highlight ts linenos %}
obtenerPosicion():any{
  Geolocation.getCurrentPosition().then(res => {
    console.log(res.coords);
    let coordenada = [{
      'longitude' : res.coords.longitude,
      'latitude' : res.coords.latitude
    }];
    console.log(coordenada);
    this.loadMap(coordenada);
  });
}
{% endhighlight %}

`loadMap(coordenadas:any)`: Este método recibe como parámetro las coordenadas expresadas en latitud y longitud (estas coordenadas son tomadas del método `obtenerPosicion()`) y posiciona el mapa en la posición actual del dispositivo.

{% highlight ts linenos %}
loadMap(coordenada:any[]){
  console.log(coordenada);
  let longitud = coordenada[0]['longitude'];
  let latitude = coordenada[0]['latitude'];
  // let location: crea un objeto con las coordenadas latitude y longitud y es pasada a las // opciones de google maps.

  let location = new GoogleMapsLatLng(latitude,longitud);
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
      'latLng': location,
      'tilt': 30,
      'zoom': 15,
      'bearing': 50
    }
  });
  this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
  console.log('Map is ready!');
});

{% endhighlight %}

<img class="img-responsive" src="http://i.cubeupload.com/6alr1n.jpg" alt="step 11">
<img class="img-responsive" src="http://i.cubeupload.com/6c3Ff6.jpg" alt="step 12">

Ahora vamos a abrir el archivo `home.html` y vamos a incluir un div con un `id=”map”`.

{% highlight html linenos %}
<ion-header>
  <ion-navbar>
    <ion-title>Ionic Blank</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <div id="map"></div>
</ion-content>
{% endhighlight %}

Ahora vamos a nuestro archivo `home.scss` e incluiremos el siguiente código.

{% highlight scss linenos %}
.home-page{
  #map{
    height: 100%;
  }
}
{% endhighlight %}

Ya con esto debería de quedar todo listo. Ahora vamos a compilar nuestro proyecto y realizaremos una prueba.

```
ionic build android
```

NOTA: Recuerda activar el acceso a mapas de la aplicación por la configuración del celular en aplicaciones.

# Resultados de la aplicación: 

<div class="row">
  <div class="col-xs-12 col-sm-4">
    <img class="img-responsive" src="http://i.cubeupload.com/lQvKh1.jpg" alt="app 2">
  </div>
  <div class="col-xs-12 col-sm-4">
    <img class="img-responsive" src="http://i.cubeupload.com/lhHr7n.jpg" alt="app 1">
  </div>
  <div class="col-xs-12 col-sm-4">
    <img class="img-responsive" src="http://i.cubeupload.com/HZbINA.jpg" alt="app 3">
  </div>
</div>