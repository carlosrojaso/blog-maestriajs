---
layout: post
title: "Trazando rutas con Google Maps JS + Ionic"
keywords: "directions, google maps, ionic"
date: 2017-08-18
tags: [maps, demos]
categories: ionic2
repo: "https://github.com/ng-classroom/demo118"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-18-directions-google-ionic%2Fcover.jpg?alt=media&token=876c7b4c-3f5e-4af3-a26d-be58e67f5732"
remember: true
versions:
  - title: 'ionic'
    number: '3.6.0'
  - title: 'ionic-native'
    number: '4.1.0'
  - title: 'ionic-app-scripts'
    number: '2.1.3'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.9.2'
---

> Hemos hablado mucho sobre mapas ahora vamos a trazar rutas desde un punto A hasta un punto B usando **Google Maps JS & Ionic**.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-18-directions-google-ionic%2Fcover.jpg?alt=media&token=876c7b4c-3f5e-4af3-a26d-be58e67f5732"></amp-img>

{% include general/net-promoter-score.html %}

En esta artículo vamos a mostrar una ruta usando google maps. El resultado va ser una ruta de un punto A hasta punto B pasando por puntos intermedios, así:

<div class="row">
  <div class="col col-100 col-md-33 offset-md-33 col-lg-33 offset-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-18-directions-google-ionic%2Fscreen4.jpg?alt=media&token=f55f7f6f-0b27-47d4-997c-2940f1c269ac"></amp-img>
  </div>
</div>
<br/>

En este caso vamos usar el SDK de Google Maps en javascript, ya pronto estaremos escribiendo otro artículo usando el SDK nativo., para comprender este tutorial completamente te recomendamos haber leído el artículo: [Google Maps JS + Ionic](https://www.ion-book.com/blog/ionic2/google-maps-js-and-ionic/){:target="_blank"} ya que este será nuestro punto de partida.

*Nota: Vamos a trabajar este artículo en base a un contexto específico, pero igual puede aplicar para cualquier caso.*

## Contexto

Tenemos una compañía que debe entregar pedidos todos los días a unos clientes específicos, por lo cual tiene un conjunto de distribuidores que van en automóvil y entregan dichos pedidos. Tenemos una empresa distribuidora el cual su objetivo es entregar el pedido de dichos clientes en el momento que lo requiera, por lo cual maneja la gestión de pedidos y distribución del mismo. Para este ejemplo nos enfocaremos en la distribución.

Queremos con ayuda de Google Maps & Ionic, crear una aplicación para los distribuidores que les indique qué ruta deben seguir para realizar la entrega de los pedidos y de retorno a almacén.

<amp-img width="800" height="336" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-18-directions-google-ionic%2Fprocess.jpg?alt=media&token=bc57767c-3003-4a12-8959-2d5f592cd987"></amp-img>

Este contexto es una pequeña parte de la Tesis de la Srta [Zulema Vicente](https://www.facebook.com/zulema.vicente.9){:target="_blank"}, futura y gran Lic. Industrial y de Sistemas, ella ha trabajado en un sistema completo en base a procesos, que le permitan gestionar los pedidos y la distribución. Este sistema tiene muchas complejidades que son analizadas en el proyecto.

*Nota: De parte de nuestra comunidad un agradecimiento a la Srta [Zulema Vicente](https://www.facebook.com/zulema.vicente.9){:target="_blank"} por compartir su caso de tesis con nosotros.*

Ahora manos a la obra, vamos a usar Google Maps & Ionic para proveer esta solución.

## Primer paso:

Nuestro primer paso inicia desde resultado obtenido en el artículo [Google Maps JS + Ionic](https://www.ion-book.com/blog/ionic2/google-maps-js-and-ionic/){:target="_blank"}, donde mostramos un mapa con un marker, así:

<div class="row">
  <div class="col col-100 col-md-33 offset-md-33 col-lg-33 offset-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-18-directions-google-ionic%2Fscreen1.jpg?alt=media&token=6213c81a-fea6-4c3c-9582-ccb95bd18352"></amp-img>
  </div>
</div>
<br/>

## Segundo paso:

Para poder trazar una ruta vamos a usar las siguientes instancias de Google Maps: 

- `DirectionsService:` A este servicio le vamos a enviar unos parámetros para calcular la ruta sugerida por Google desde el punto A hasta el punto B, este servicio nos retorna una serie de datos computados que se pueden manejar o simplemente mostrarlos con `DirectionsRenderer`.
- `DirectionsRenderer:` Este servicio se encarga de mostrar en nuestro mapa la ruta con sus markers y un panel con las indicaciones.
- `LatLngBounds:` Este servicio permite crear un área donde en el mapa con unos límites en los cuales el mapa se optimizará.

Tendiendo esto en cuenta vamos a declarar y crear las instancias de estos objetos en el constructor, de la siguiente manera:

`src/pages/home/home.ts`:

```ts
...
export class HomePage {

  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation
  ) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();
  }
...
```

## Tercer paso

En nuestro `html` debemos tener dos partes importantes, la primera será donde se va a mostrar el mapa y la segunda parte donde se mostrará el conjunto de indicaciones que debe seguir el usuario para esa ruta, nuestro html debe quedar así:

`src/pages/home/home.html`:

```html
<ion-content>
  <div id="map"></div>
  <ion-scroll scrollY="true" class="scroll">
    <div padding-horizontal id="panel"></div>
  </ion-scroll>
</ion-content>
```

También debemos hacer unas modificaciones a nuestros estilos para que el mapa no se muestre en toda la pantalla, así:

`src/pages/home/home.scss`:

```scss
page-home {
  ion-content{
    background: rgb(229, 227, 223);
    #map {
      width: 100%;
      height: 250px;
      opacity: 0;
      transition: opacity 150ms ease-in;
      display: block;
      &.show-map{
        opacity: 1;
      }
    }
    .scroll{
      height: calc(100% - 250px);
    }
  }
}
```

{% include blog/subscribe.html %}

## Cuarto paso

Vamos a indicar al servicio de `directionsDisplay` cuál será el elemento html donde va a trazar la ruta en nuestro mapa y otro elemento html donde mostrará las indicaciones.

Para esto vamos a modificar nuestro método `loadMap` (recordemos que tomamos como base el artículo  [Google Maps JS + Ionic](https://www.ion-book.com/blog/ionic2/google-maps-js-and-ionic/){:target="_blank"}) y crearemos un método privado llamado `calculateRoute`, así debería quedar:

Antes:

`src/pages/home/home.ts`:

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

Después:

`src/pages/home/home.ts`:

```ts
loadMap(position: Geoposition){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);
  // create a new map by passing HTMLElement
  let mapEle: HTMLElement = document.getElementById('map');
  let panelEle: HTMLElement = document.getElementById('panel');

  // create LatLng object
  this.myLatLng = {lat: latitude, lng: longitude};

  // create map
  this.map = new google.maps.Map(mapEle, {
    center: this.myLatLng,
    zoom: 12
  });

  this.directionsDisplay.setMap(this.map);
  this.directionsDisplay.setPanel(panelEle);

  google.maps.event.addListenerOnce(this.map, 'idle', () => {
    mapEle.classList.add('show-map');
    this.calculateRoute();
  });
}

private calculateRoute(){
  //code
}
```

## Quinto paso:

Ahora vamos a declarar los `waypoints`, en la mayoría de casos solo es necesario conocer la ruta de un punto A un punto B, pero siguiendo con nuestro contexto necesitamos que siga esta ruta y además cruze por puntos específicos es su trayecto. En nuestro caso el distribuidor debe ir a cada uno de los clientes para hacer la entrega de pedidos.

El formato de cada `waypoint` debe ser el siguiente:

```ts
{
  location: {
    lat: 4.6241329,
    lng: -74.1768411
  },
  stopover: true,
}
```

En este demo vamos a tener unos puntos ya preparados (waypoints) y estos puntos los tendremos declarados de forma estática así:

```ts
this.waypoints = [
  {
    location: { lat: 4.6241329, lng: -74.1768411 },
    stopover: true,
  },
  {
    location: { lat: 4.6247745, lng: -74.1698888 },
    stopover: true,
  },
  {
    location: { lat: 4.6212241, lng: -74.1631081 },
    stopover: true,
  },
  {
    location: { lat: 4.6222508, lng: -74.1667989 },
    stopover: true,
  }
];
```

*Sin embargo pueden ser obtenidos desde alguna servicio externo que provea estos datos.*

Ahora vamos a indicarle a "Goolge" que optimice nuestro mapa en nuestra posición `myLatlng` y también por donde van a estar todos nuestros `waypoints` dentro el método `calculateRoute`, así:

`src/pages/home/home.ts`:

```ts
private calculateRoute(){
    
  this.bounds.extend(this.myLatLng);

  this.waypoints.forEach(waypoint => {
    var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
    this.bounds.extend(point);
  });

  this.map.fitBounds(this.bounds);

}
```

## Sexto paso:

Ahora vamos a trabajar en la parte más importante y enviar los datos necesarios a Google para obtener la ruta, para esto debemos tener en cuenta varias opciones que podemos enviar:

### Un punto de inicio y un punto de fin

Esta será una coordenada donde Google Maps sabrá su punto inicial y su punto final, si recuerdan el contexto de nuestro problema, debemos hacer que un distribuidor salga de la empresa, luego entregue toda una lista de pedidos y al finalizar debe volver a la empresa, así que para nuestro caso en punto de inicio y fin será el mismo pero obviamente se pueden tener puntos diferentes.

### waypoints

Los puntos por donde la ruta debe pasar en nuestro caso los puntos son tiendas de entrega.

### travelmode

Sera la forma en que queremos recorrer esa ruta de acuerdo a esto puede variar ya que no es lo mismo ir caminando, en carro o en avión.

### avoidTolls

Si está en `true`, este punto le dice a Google Maps que evite las carreteras por donde haya que pagar un peaje donde sea posible.

### optimizeWaypoints

Si está en `true`, Google Maps tratará de optimizar los waypoints intermedios y dar así una ruta más óptima.

Ya teniendo todos nuestras opciones listas ahora solo tenemos que enviar la solicitud a Google Maps para obtener el cálculo de nuestra ruta, así:

`src/pages/home/home.ts`:

```ts
private calculateRoute(){
    
  ...

  this.directionsService.route({
    origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
    destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
    waypoints: this.waypoints,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true
  }, (response, status)=> {
    //render
  });  

}
```

*pueden ver la documentación oficial [aquí](https://developers.google.com/maps/documentation/javascript/directions?hl=es-419){:target="_blank"}.*

Ahora obtendremos una respuesta y solo debemos hacer uso de `directionsDisplay` para mostrar el mapa y las indicaciones de la ruta sugerida, así:

`src/pages/home/home.ts`:

```ts
private calculateRoute(){
    
  ...

  this.directionsService.route({
    ...
  }, (response, status)=> {
    if(status === google.maps.DirectionsStatus.OK) {
      console.log(response);
      this.directionsDisplay.setDirections(response);
    }else{
      alert('Could not display directions due to: ' + status);
    }
  });  

}
```

Si revisamos todo el método de `calculateRoute` finalmente queda así:

`src/pages/home/home.ts`:

```ts
private calculateRoute(){
    
  this.bounds.extend(this.myLatLng);

  this.waypoints.forEach(waypoint => {
    var point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
    this.bounds.extend(point);
  });

  this.map.fitBounds(this.bounds);

  this.directionsService.route({
    origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
    destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
    waypoints: this.waypoints,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true
  }, (response, status)=> {
    if(status === google.maps.DirectionsStatus.OK) {
      console.log(response);
      this.directionsDisplay.setDirections(response);
    }else{
      alert('Could not display directions due to: ' + status);
    }
  });  

}
```

## Resultado:

Ahora si ejecutamos `ionic serve` ó `ionic cordova run android --prod`, podemos ver el siguiente resultado:

Como vemos nos muestra un mapa con una ruta trazada y con cada uno de sus `waypoints`, además Google Maps renderiza las indicaciones en nuestro vista.

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-18-directions-google-ionic%2Fscreen2.jpg?alt=media&token=e391fab2-62a3-4f58-ae96-77ed84c6656c"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-18-directions-google-ionic%2Fscreen3.jpg?alt=media&token=d96902ab-bd86-4c91-951e-34a80e93dba5"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-18-directions-google-ionic%2Fscreen4.jpg?alt=media&token=f55f7f6f-0b27-47d4-997c-2940f1c269ac"></amp-img>
  </div>
</div>
<br>

## Consideraciones y límites:

- En la tesis final se tomarón muchos más factores en cuenta.
- Google Maps tiene un límite de 10 de waypoints contando el punto de inicio y fin, en la parte paga de Google Maps son hasta 23.

<amp-img width="874" height="318" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-18-directions-google-ionic%2Finfo.png?alt=media&token=65dd7e8f-5b35-48d2-83ec-b932df9ce8dc"></amp-img>

- [Nada es gratis en la vida](https://www.youtube.com/watch?v=IKKdAHLmdII){:target="_blank"} y google maps tiene un limite te peticiones y con google maps pro puede que nos retorne mejores resultados, los puedes ver [aquí](https://developers.google.com/maps/pricing-and-plans/){:target="_blank"}.
- No sabemos qué algoritmo usa Google Maps para haber obtenido esa ruta, sin duda hay varios algoritmos que determinan esto pero segun la documentacion de Google es una mezcla de varios factores como distancia, tráfico, tiempo etc pero en ninguna parte dicen que tipo de algoritmo usan, es una caja negra para nosotros.
- Se puede personalizar el panel de navegación usando componentes de ionic, esto se logra trabajando con la respuesta nos retorna todas las indicaciones de la ruta como un arreglo.