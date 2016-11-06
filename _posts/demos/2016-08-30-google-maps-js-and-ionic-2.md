---
layout: post
title: "Google Maps JS + Ionic 2 en 4 pasos"
date: 2016-08-30
tags: ionic2 maps
categories: demos
comments: true
repo: "https://ion-book.github.io/demo105/"
author: nicobytes
cover: "http://i.cubeupload.com/gxxOpn.png"
remember: true
---

> La interacción con mapas en aplicaciones móviles es muy común y en este artículo explicaremos cómo integrar **Google Maps** usando el SDk de JS con **Ionic 2**.

<img class="img-responsive" src="http://i.cubeupload.com/gxxOpn.png" alt="firebase-database-and-ionic-2">

Hay dos maneras de implementar google maps en nuestras aplicaciones, una es manejando el **SDK de JS** y la otra manera es integrar el **SDK nativo** al proyecto, en este artículo veremos cómo hacerlo con el SDK de js y en futuros artículos hablaremos de cómo implementar el SDK nativo.

# Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2](http://www.ion-book.com/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start demo105 blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo105
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera *app*.

# Paso 2: Agregar Type

Este proceso se hace para que dentro de nuestro proyecto [Typescript](http://www.ion-book.com/ionic2/typescript){:target="_blank"} reconozca las variables del SDK de google y las podamos usar sin problema.

```
npm install --save @types/googlemaps
```

# Paso 3: Incluir el SDk

Ahora iremos al archivo `index.html` que se encuentra la carpeta `src` y luego de llamar a `build/polyfills.js` incluimos el SDK, ademas tienes que agregar el **API KEY** que te ofrece google para usar el SDK, lo puedes generar desde está [URL](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=es){:target="_blank"}.

{% highlight javascript linenos %}
<body>

  <!-- Ionic's root component and where the app will load -->
  <ion-app></ion-app>

  <!-- The polyfills js is generated during the build process -->
  <script src="build/polyfills.js"></script>

  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
  <!-- The bundle js is generated during the build process -->
  <script src="build/main.js"></script>

</body>
{% endhighlight %}

# Paso 4: Crear mapa.

Ahora en el archivo `src/pages/home/home.ts` crearemos la variable `map` (*línea 10*) donde guardaremos la instancia del mapa creado y con el uso de el metodo `ionViewDidLoad` detectaremos cuando la vista ya este completamente cargada y usamos el SDK de google para crear el mapa.

{% highlight javascript linenos %}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;

  constructor(
    public navCtrl: NavController
  ) {}

  ionViewDidLoad(){
    let mapEle = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, {
      center: {lat: 4.5981, lng: -74.0758},
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      google.maps.event.trigger(mapEle, 'resize');
    });
  }
}
{% endhighlight %}

# Paso 4: Template y estilos.


Ahora en el archivo `home.html` vamos a declarar un div con id **map** (*línea 8*) para poder identificar el elemento sobre el cual vamos a mostrar el mapa.

{% highlight html linenos %}
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
{% endhighlight %}

Y finalmente podemos añadir estilos para hacer que el mapa se muestre al 100% de alto y ancho de la pantalla, estos estilos estaran en el archivo `home.scss`:

{% highlight scss linenos %}
page-home {
  ion-content{
    background: rgb(229, 227, 223);
    #map {
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 150ms ease-in;
      &.show-map{
        opacity: 1;
      }
    }
  }
}

{% endhighlight %}

# Resultado:

Ahora podemos ver el resultado ejecutando:

```
ionic serve -l
```

<br/>
<a target="_blank" href="{{ page.repo }}">
  <img class="img-responsive" src="http://i.cubeupload.com/43XZ5H.png" alt="result">
</a>
