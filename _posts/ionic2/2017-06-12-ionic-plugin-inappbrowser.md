---
layout: post
title: "Usar el plugin InAppBrowser en Ionic"
date: 2017-06-13
tags: [demos, cordova, plugin, native]
categories: ionic2
repo: "https://github.com/edy-ap/ionic-inappbrowser"
author: edyavendano
cover: "/images/posts/ionic2/2017-06-12-ionic-plugin-inappbrowser/cover.jpg"
remember: true
versions:
  - title: 'ionic'
    number: '3.3.0'
  - title: 'ionic-native'
    number: '3.12.1'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.3.0'
---

> Ionic Framework nos ofrece soporte para los plugins de apache cordova, en la paqueteria **ionic-native**, lo cual nos proporciona
una interfaz para poder utilizarlo en nuestro proyecto.

En este ejemplo aprenderemos a utilizar el plugin [**InAppBrowser**](https://ionicframework.com/docs/native/in-app-browser/){:target="_blank"}, basicamente este plugin nos permite abrir un link ya sea en el navegador(si utilizamos ionic serve) o
en el navegador del dispositivo si estamos utilizando alguna plataforma como android o IOS.

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2017-06-12-ionic-plugin-inappbrowser/cover.jpg" alt="cli-plugin-cordova"></amp-img>

{% include general/net-promoter-score.html %} 

Antes que nada debemos tener nuestro ambiente configurado, es decir tener el cli de ionic, si tienes dudas te dejo el link
de [**Instalación**]( https://ionicframework.com/docs/intro/installation/){:target="_blank"}
 

# Paso 1: Iniciando el proyecto 
Iniciaremos nuestro proyecto utilizando el siguiente comando

```
ionic start ionic-inappbrowser blank --cordova
```

# Paso 2: Añadiendo el plugin **InAppBrowser**

Para esto ejecutaremos el siguiente comando, que instala el plugin de cordova

```
ionic cordova plugin add cordova-plugin-inappbrowser
```

Nos pedira que instalemos el plugin de cordova, le decimos que si como en la siguiente imagen:

<amp-img width="835" height="141" layout="responsive" src="/images/posts/ionic2/2017-06-12-ionic-plugin-inappbrowser/screen.png" alt="cli-plugin-cordova"></amp-img>

Luego añadimos la libreria de ionic native

```
npm install --save @ionic-native/in-app-browser
```

No ocuparemos añadir alguna plataforma porque este plugin funciona en el navegador.

# Paso 3: Inyectando el provider en el archivo app.module

Por este momento evitare usar la funcion de Lazy Loading ya que por experiencia personal, le falta algunos detalles por pulir y que llega a generar ciertos errores, espero que en la proximas versiones estos queden solucionados.

Abrimos el archivo `app.module.ts`, y añadimos el provider **InAppBrowser**

```ts
...
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

# Paso 4: Realizando la logica del plugin

Ahora que ya añadimos el provider, procederemos a inyectarlo en el constructor de la clase `HomePage` en el archivo `home.ts`.

```ts
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private iap: InAppBrowser
  ) {
  }
}
```

Ahora en la clase `HomePage` creamos una funcion llamada **openLink**, 
y utilizamos la funcion create del objeto "iab", pasandole como primer parametro
la dirección que queremos abrir, y como segundo parametro el destino, en este caso que lo abra en una pagina en blanco

```ts
openLink(){
  this.iab.create("https://www.ion-book.com/","_blank");
}
```

{% include blog/subscribe.html %}

Ahora en el archivo `home.html`, agregamos un botón, y en el evento click invocamos a la función creada anteriormente.

```html
<ion-content padding>
  <p>Usando el plugin in-app-browser</p>
  <button ion-button color="primary" (click)="openLink()">Abrir link</button>
</ion-content>
```

y ya con esto al dar click en el botón nos abrirá el link que definimos.

En el repo de [**github**](https://github.com/edy-ap/ionic-inappbrowser/){:target="_blank"} enontraran el proyecto completo.
