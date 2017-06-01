---
layout: post
title: "Ionic Push Notifications"
keywords: "ionic push notifications, ionic push, push notifications, notifications, notifications en ionic 2"
date: 2017-05-25
tags: [push, demos, native]
categories: ionic2
repo: "https://github.com/ion-book/demo110"
author: nicobytes
cover: "/images/posts/ionic2/2017-01-31-ionic-push-notifications/cover.jpg"
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
    number: '3.3.0'
---

> Implementar el sistema de **notificaciones push** en una aplicación es una de las tareas más comunes y Ionic tiene un servicio que nos ahorra este trabajo.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/cover.jpg" alt="Ionic Push Notifications"></amp-img>

Ionic cuenta con un conjunto de servicios que tienen una gran integración con aplicaciónes hibridas. Se llama Ionic Cloud y ofrece varias herramientas que pueden potenciar las aplicaciónes:

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="624" height="519" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen.png" alt="Validaciones en Formularios"></amp-img>
  </div>
</div>

En este artículo implementaremos el sistema **Ionic Push + Ionic**, pero primero revisaremos cómo funciona el sistema de notificaciones, con la siguiente gráfica:

<amp-img width="1600" height="595" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen1.png" alt="Validaciones en Formularios"></amp-img>

*Nota: GCM ahora es FCM*

Para enviar notificaciones Push a dispositivos Android y IOS debemos conectarnos al servicio de **FCM (Firebase Cloud Message)** de Android y a **APNS (Apple Push Notification Service)** de IOS, ellos son los que realmente hacen que la notificación llegue al dispositivo. Para comunicarnos con FCM o APNS vamos a usar Ionic Push, el cual nos ahorra todo el trabajo de crear un servicio que se comunique con FCM o APNS.

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo110 tabs
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo110
```

Como iniciamos nuestro proyecto con el template **tabs** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera *app*.

Luego agregamos la plataforma para las que vamos a desarrollar:

```
ionic platform add android
```

## Paso 2: Crear una cuenta en ionic.io

Ahora debemos crear una cuenta en [ionic.io](https://apps.ionic.io/login){:target="_blank"}, para poder usar Ionic Push.

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen2.png"></amp-img>

## Paso 3: Instalar Ionic Cloud.

Luego de crear la cuenta en Ionic.io, debemos implementar la librería para empezar a usar cualquier servicio de Ionic Cloud. Así que vamos a nuestra terminal y ejecutamos: 

```
npm install @ionic/cloud-angular --save
```

Luego debemos conectar nuestro usuario de ionic.io con la aplicación, así:

```
ionic login
```

Luego, debemos crear nuestra aplicación en ionic.io, lo podemos hacer con:

```
ionic link
```

Esto genera un **ID** para la aplicación, que lo encontramos en `ionic.config.json`, ahora debemos agregar ionic cloud a los módulos de la aplicación en `src/app/app.module.ts`, así:

```ts
...
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};

@NgModule({
  ...
  imports: [
    ...
    CloudModule.forRoot(cloudSettings)
  ],
  ...
})
export class AppModule {}
```

Si todo quedo bien dentro de la cuenta de ionic.io debe mostrar la aplicación creada, así:

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen3.png"></amp-img>

{% include blog/subscribe.html %}

## Paso 4: Generar tus llaves en Firebase

Ahora para enviar mensajería para Android debemos generar las siguientes llaves:

- Server key
- Sender ID

Estas llaves se generan desde firebase.google.com, donde debemos crear un proyecto y luego ir a la página de **Setting > Cloud Messaging**, así:

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen4.png"></amp-img>

Ahora estas credenciales debemos adjuntarlas en la plataforma de ionic.io, seleccionar la aplicación y luego ir a **Setting > Certificates**, así:

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen5.png"></amp-img>

Luego debemos crear un perfil de seguridad:

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen6.png"></amp-img>

Y por último editamos el perfil de seguridad creado y en la sección de **Android** agregamos nuestra **FCM Server Key**:

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen7.png"></amp-img>

## Paso 5: Instalar Plugin Push

Ahora debemos instalar el plugin que nos permite enviar y recibir notificaciones desde la aplicación con ionic.

```
ionic cordova plugin add phonegap-plugin-push --variable SENDER_ID=your_sender_id --save
```

Además debemos añadir la configuración de notificaciones en `src/app/app.module.ts`, así:

```ts
const cloudSettings: CloudSettings = {
  core: {
    app_id: '20c91c51'
  },
  push: {
    sender_id: '564553849534',
    pluginConfig: {
      ios: {
        badge: true,
        sound: true
      },
      android: {
        iconColor: '#343434',
        forceShow: true
      }
    }
  }
};
```

La variable `forceShow` debe estar en `true` en android si queremos que la notificación se muestre cuando al app en primer plano o segundo plano, es decir cuando la app este abierta o cerrada.

*Nota: Hay varias opciones que se pueden configurar como el sonido, icono etc, para ver todas las opciones revisar la documentación oficial de [Ionic Push](http://docs.ionic.io/services/push/){:target="_blank"}*

## Paso 6: Escuchando notificaciones.

Ahora debemos registrar el **PushToken** de cada dispositivo, el **PushToken** es un identificador único de cada dispositivo y debemos obtenerlo y luego registrarlo en ionic.io. Para esto crearemos el método `registerToken` en `app.component.ts`, así:

```ts
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = 'TabsPage';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public push: Push
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.registerToken();
      this.getNotifications();
    });
  }

  private registerToken(){
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t,{
        ignore_user: true
      });
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
    });
  }

  private getNotifications(){
    this.push.rx.notification()
    .subscribe((msg) => {
      alert(msg.title + ': ' + msg.text);
    });
  }
}
```

Finalmente para recibir y controlar notificaciones, puedes agregar el método `getNotifications` en el lugar que se necesite, puede ser en `HomePage` de la aplicación luego que el usuario ingrese o desde el inicio en `app.component.ts`:

```ts
private getNotifications(){
  this.push.rx.notification()
  .subscribe((msg) => {
    alert(msg.title + ': ' + msg.text);
  });
}
```

## Paso 7: Enviando notificaciones

Ahora para enviar notificaciones podemos usar la plataforma de ionic.io y probar que recibimos una notificación en la aplicación.

Primero vamos a la sección de Push:

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen8.png"></amp-img>

Luego creamos los detalles de nuestro aplicacion, como mensaje, título, sonido etc.

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen9.png"></amp-img>

Luego seleccionamos los usuarios a los que queremos que llegue la notificación.

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen10.png"></amp-img>

*Nota: Puedes usar el servicio de Ionic Auth + Ionic Push para así registrar a los usuarios y así poder organizarlos en grupos y poder enviar notificaciones segmentadas.*

Luego seleccionamos el perfil de seguridad y enviamos.

<amp-img width="1366" height="678" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen11.png"></amp-img>

## Resultado:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen12.png"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen13.png"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2017-01-31-ionic-push-notifications/screen14.png"></amp-img>
  </div>
</div>
<br>

**Nota:** Este demo solo funciona desde el dispositivo o emulador.