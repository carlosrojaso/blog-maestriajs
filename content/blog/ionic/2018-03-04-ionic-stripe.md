---
layout: post
title: "Usando Ionic + Stripe."
date: 2018-03-06
tags: [ionic, stripe]
categories: ionic
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-03-04-ionic-stripe%2Fionicystripe.png?alt=media&token=bec840ff-6bf7-4ba0-a8b0-8da59995b16e"
editname: "ionic2/2018-03-04-ionic-stripe.md"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-native'
    number: '4.5.2'
  - title: 'ionic-app-scripts'
    number: '3.1.7'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.19.0'
---
> En muchas ocasiones queremos monetizar nuestras aplicaciones moviles y no sabemos por donde comenzar. En esta ocasión vamos a utilizar uno de los proveedores de pagos más famosos utilizado con Ionic.

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-03-04-ionic-stripe%2Fionicystripe.png?alt=media&token=bec840ff-6bf7-4ba0-a8b0-8da59995b16e"> 

 

En esta oportunidad voy a dar una continuación de nuestro [post sobre Compodoc](https://blog.ng-classroom.com/blog/angular/compodoc-documentacion_angular_apps/) pero esta vez con Ionic.

## Que es Stripe ?

Stripe es uno de los muchos proveedores de pagos que existén en Internet. Una de las cualidades que hacen a Stripe uno de los favoritos es su facilidad para conectarse con las Plataformas Web.

Stripe tiene dos tipos de SDK el nativo para dispositivos moviles y el de Javascript para Web ambos pueden ser utilizados con Ionic, en este tutorial vamos a utilizar el de Javascript pero si quieres utilizar el nativo puedes ver [acá](https://ionicframework.com/docs/native/stripe/).

Si quieres ver más a fondo las caracteristicas de este proveedor visita su [Documentación](https://stripe.com/docs).


## Preparación.

Comienza tu proyecto de Ionic.

````
$ionic start demo125 blank
````

En este paso solo estoy comenzando un proyecto en blanco con el CLI de Ionic. Ahora debemos ingresar a la carpeta que nos creo con:

````
$cd demo125
````

Ahora debemos crear una pagina para manejar el proceso de Stripe y utilizar sus elementos.

````
$ionic g page stripe
````

ahora vamos al app/app.module.ts y nos aseguramos que todo este agregado.

```ts
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
```

Luego vamos a agregar el sdk de stripe en nuestro index.html.

```html
{% raw %}
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Ionic App</title>
  <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no">

  <link rel="icon" type="image/x-icon" href="assets/icon/favicon.ico">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#005AA9">

  <!-- add to homescreen for ios -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <!-- Agregamos linea de  Stripe -->
  <script src="https://js.stripe.com/v3/" async></script>


  <!-- cordova.js required for cordova apps (remove if not needed) -->
  <script src="cordova.js"></script>

  <!-- un-comment this code to enable service worker
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('service worker installed'))
        .catch(err => console.error('Error', err));
    }
  </script>-->

  <link href="build/main.css" rel="stylesheet">

</head>
<body>

  <!-- Ionic's root component and where the app will load -->
  <ion-app></ion-app>

  <!-- The polyfills js is generated during the build process -->
  <script src="build/polyfills.js"></script>

  <!-- The vendor js is generated during the build process
       It contains all of the dependencies in node_modules -->
  <script src="build/vendor.js"></script>

  <!-- The main bundle js is generated during the build process -->
  <script src="build/main.js"></script>

</body>
</html>
{% endraw %}
```



Ahora, vamos a nuestra plantilla de home ```pages/home/home.html``` y agregamos un boton que nos llevara a la pagina de Stripe.

```ts
<ion-header>
  <ion-navbar>
    <ion-title>
      Demo 125
    </ion-title>
  </ion-navbar>
</ion-header>
 
<ion-content padding>
  <button ion-button large full (click)="open()">Use Stripe</button>
</ion-content>
```

Y creamos el metodo ```open()``` en su componente.

```ts
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StripePage } from "../stripe/stripe";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  open(){
    this.navCtrl.push(StripePage)
  }
}
```

Ahora vamos al template que creamos de Stripe ```pages/stripe/stripe.html```y realizamos el manejo del proceso de agregar la tarjeta usando los elementos del SDK de Stripe.

```html
{% raw %}
<ion-header>
  <ion-navbar>
    <ion-title>Stripe JS</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
    <form action="/" method="post" id="payment-form">
      <div class="form-row">
        <div id="card-element">
          <!-- a Stripe Element will be inserted here. -->
        </div>
  
        <!-- Used to display Element errors -->
        <div id="card-errors" role="alert"></div>
      </div>
    <button ion-button block large>Add Card</button>
    </form>

</ion-content>
{% endraw %}
```

Y agregamos el manejo del proceso en su componente.

```ts
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var Stripe;

/**
 * Generated class for the StripePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-stripe',
  templateUrl: 'stripe.html',
})
export class StripePage {

  stripe = Stripe('YOUR_API_KEY');
  card: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.setupStripe();
  }

  setupStripe(){
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      //this.stripe.createSource(this.card)
      this.stripe.createToken(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
          this.card.clear();
        }
      });
    });
  }

}
```

Importante aquí cambiar ```stripe = Stripe('YOUR_API_KEY');``` por el public key que te provee Stripe. Puedes ver el proceso [aquí](https://stripe.com/docs/dashboard#api-keys).

Al terminar el proceso de registrar la tarjeta deberias ver el token generado en tu consola, este es el que se utiliza para realizar las transacciones y todo lo que quieras hacer con Stripe. Puedes utilizar Tarjetas de Credito de pruebas de [acá](https://stripe.com/docs/testing).

Bueno espero que sea de ayuda y no te olvides comentar y compartir :)