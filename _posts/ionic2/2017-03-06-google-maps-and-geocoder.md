---
layout: post
title: "Google Maps + Geocoder"
keywords: "ionic push notifications, OneSignal, push notifications, notifications, notifications en ionic 2, OneSignal y ionic"
date: 2017-03-07
tags: [maps, ionic2, native]
categories: ionic2
author: levanocarlos
repo: 'https://github.com/calevano/geocoder-ionic2'
cover: "/images/posts/ionic2/2017-03-06-google-maps-and-geocoder/cover.jpg"
remember: true
versions:
  - title: 'ionic'
    number: '2.1.0'
  - title: 'ionic-native'
    number: '2.4.1'
---

Tengan ustedes un excelente día, en esta ocasión les traigo un nuevo artículo, pero esta vez un artículo con respecto a **GEOCODER**, existen dos formas:

- **Geocodificación:** Es el proceso de convertir direcciones en coordenadas geográficas que puedes usarlas para disponer marcadores en un mapa o posicionar el mapa. 
- **Geocodificación Inversa:** Es el proceso de convertir coordenadas geográficas en direcciones en lenguaje natural.

La anterior información se sacó de la web de [**google-maps**](https://developers.google.com/maps/documentation/geocoding/intro?hl=es-419){:target="_blank"}.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="{{site.baseurl}}/images/posts/ionic2/2017-03-06-google-maps-and-geocoder/cover.jpg" alt="Ionic Push Notifications"></amp-img>

Antes de iniciar recomiendo haber leído estos artículos de nuestros compañeros.

Aquí enseña cómo obtener el ApiKey: [**Google Maps Native**]({{site.urlbloglog}}/ionic2/google-maps-native/){:target="_blank"}

Aquí enseña a como colocar un marcador en nuestro mapa: [**Google Maps Markers**]({{site.urlbloglog}}/ionic2/google-maps-markers/){:target="_blank"}

Entonces ya teniendo el concepto claro y de haber leído los artículos anteriores, vamos a proceder a realizar nuestro proyecto de ejemplo.

## Pasos

1.- Abrimos nuestra terminal y ejecutamos esto (para crear un nuevo proyecto)

```
ionic start geocoder blank --v2
```

2.- Una vez que ya nos creó el proyecto, ingresamos haciendo esto:

```
cd geocoder 
```

3.- Añadimos la plataforma que vamos a usar, en este caso es android y colocamos esto en la terminal:

```
ionic platform add android
```

4.- Ahora que hemos agregado la plataforma podemos hacer uso de [**Ionic Native**]({{site.urlbloglog}}/ionic2/ionic-native/){:target="_blank"}, para incluir a "Geolocation, GoogleMaps, Toast" sólo tenemos que hacer esto:

```
ionic plugin add cordova-plugin-geolocation --save
ionic plugin add cordova-plugin-x-toast
ionic plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE"
```

**Nota:** Tenemos que colocar en **YOUR_ANDROID_API_KEY_IS_HERE** nuestro ApiKey que habíamos generado

5.- Ahora tenemos que abrir el proyecto con un editor, para ionic, uso Visual Studio Code, en la terminal si usas visualStudioCode simplemente haz esto: 

```
code .
```

6 .- Copiamos el script que realizó [**Mayra Rodriguez**]({{site.urlbloglog}}/authors/mayrititis/){:target="_blank"} en su post anterior sobre [**Google Maps Markers**]({{site.urlbloglog}}/ionic2/google-maps-markers/){:target="_blank"}, ya lo tienes copiado verdad?.

Ok, quiero creer que es así, entonces tenemos que modificar las importaciones de ionic-native.

Teníamos esto:

```ts
import {
  Geolocation, 
  GoogleMap, 
  GoogleMapsEvent, 
  GoogleMapsLatLng, 
  GoogleMapsMarker, 
  GoogleMapsMarkerOptions, 
  Toast
} from 'ionic-native';
```

Y cambiemoslo a esto:

```ts
import {
  Geolocation, 
  GoogleMap, 
  Geocoder, 
  GeocoderRequest, 
  GeocoderResult,
  GoogleMapsEvent, 
  GoogleMapsLatLng,
  GoogleMapsMarker, 
  GoogleMapsMarkerOptions, 
  Toast
} from 'ionic-native';
```

En una parte de nuestro código tenemos esto:

```ts
this.map.addMarker(markerOptions)
.then((marker: GoogleMapsMarker) => {
    marker.showInfoWindow();
});
```

Y cambiemoslo a esto:

```ts
this.map.addMarker(markerOptions)
.then((marker: GoogleMapsMarker) => {

  Geocoder.geocode(request)
  .then((results: GeocoderResult) => {
    let address = [
      (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
      results[0].locality
    ].join(", ");
    console.log("data_: ", address);
    marker.setTitle(address);
    marker.showInfoWindow();
  });
});
```

7.- Ya tenemos todo listo, ahora tenemos que construir el App e instalarlo en nuestro celular. Hacemos esto:

```
ionic build android --prod
ionic run android --prod
```

## Resultado:

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="1080" height="1920" layout="responsive" src="{{site.baseurl}}/images/posts/ionic2/2017-03-06-google-maps-and-geocoder/result.png"></amp-img>
  </div>
</div>
<br/>