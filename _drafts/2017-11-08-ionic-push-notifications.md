---
layout: post
title: "Ionic Push Notifications"
keywords: "ionic push notifications, ionic push, push notifications, notifications, notifications en ionic 2"
date: 2017-11-08
tags: [push, demos, native]
categories: ionic2
repo: "https://github.com/ion-book/demo110"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fcover.jpg?alt=media&token=8b799ab0-3cd7-400c-abe2-3af45b46d2ef"
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

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fcover.jpg?alt=media&token=8b799ab0-3cd7-400c-abe2-3af45b46d2ef" alt="Ionic Push Notifications"></amp-img>

{% include general/net-promoter-score.html %} 

# Actualización (08/11/2017)
<hr/>

Ionic Push ya no será uno de los servicios de ionic, recomendamos manejas notificaciones con Firebase o OneSignal.

<amp-img width="826" height="156" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Falert.png?alt=media&token=1fd9d2b2-d141-4681-bf26-0a978acc3a1e" alt="Validaciones en Formularios"></amp-img>


Aqui nuestros artículos respecto al tema:

[Ionic + OneSignal = PushNotification Awesome Easy](https://blog.ng-classroom.com/blog/ionic2/ionic-and-onesignal/)

[Push Notifications para IOS](https://blog.ng-classroom.com/blog/ionic2/ionic-and-onesignal-for-ios/)

<hr/>

Ionic cuenta con un conjunto de servicios que tienen una gran integración con aplicaciónes hibridas. Se llama Ionic Cloud y ofrece varias herramientas que pueden potenciar las aplicaciónes:

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="624" height="519" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen.png?alt=media&token=95505aa0-fdc7-4e6a-b55a-cfe2dd7f0a24" alt="Validaciones en Formularios"></amp-img>
  </div>
</div>

En este artículo implementaremos el sistema **Ionic Push + Ionic**, pero primero revisaremos cómo funciona el sistema de notificaciones, con la siguiente gráfica:

<amp-img width="1600" height="595" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen1.png?alt=media&token=2a13608f-182c-4511-ab5e-e1f4762f0bd9" alt="Validaciones en Formularios"></amp-img>

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

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen2.png?alt=media&token=0f8cfcd2-9641-4918-a0f0-cc8ec64eb248"></amp-img>

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

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen3.png?alt=media&token=45396c31-9950-43aa-98f3-df89c9f03d16"></amp-img>

{% include blog/subscribe.html %}

## Paso 4: Generar tus llaves en Firebase

Ahora para enviar mensajería para Android debemos generar las siguientes llaves:

- Server key
- Sender ID

Estas llaves se generan desde firebase.google.com, donde debemos crear un proyecto y luego ir a la página de **Setting > Cloud Messaging**, así:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen4.png?alt=media&token=34da8dce-12c2-419d-b2f4-1adf5d508e20"></amp-img>

Ahora estas credenciales debemos adjuntarlas en la plataforma de ionic.io, seleccionar la aplicación y luego ir a **Setting > Certificates**, así:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen5.png?alt=media&token=8ea132f4-6de6-4ac4-9bf0-3e0559b84417"></amp-img>

Luego debemos crear un perfil de seguridad:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen6.png?alt=media&token=d00017c1-a358-4df6-8ef0-732bebc0828c"></amp-img>

Y por último editamos el perfil de seguridad creado y en la sección de **Android** agregamos nuestra **FCM Server Key**:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen7.png?alt=media&token=6fd474c0-f09b-40f5-b03c-ebcfd06aa8c5"></amp-img>

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

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen8.png?alt=media&token=5404dce4-e556-47ed-9357-79fcd5151695"></amp-img>

Luego creamos los detalles de nuestro aplicacion, como mensaje, título, sonido etc.

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen9.png?alt=media&token=0d2a0216-04e6-4eec-831b-31c1d996c916"></amp-img>

Luego seleccionamos los usuarios a los que queremos que llegue la notificación.

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen10.png?alt=media&token=ac90230c-2b6f-4a58-b7d9-796f97b66c16"></amp-img>

*Nota: Puedes usar el servicio de Ionic Auth + Ionic Push para así registrar a los usuarios y así poder organizarlos en grupos y poder enviar notificaciones segmentadas.*

Luego seleccionamos el perfil de seguridad y enviamos.

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen11.png?alt=media&token=569dbb97-0a06-4965-a415-1f5636a169e1"></amp-img>

## Resultado:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen12.png?alt=media&token=3483dda6-d599-4ead-bdcd-50eb6f6a5dd1"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen13.png?alt=media&token=35f91c47-af7d-490a-9ed8-1f53c93bc9a0"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-push-notifications%2Fscreen14.png?alt=media&token=f87d8c9a-9353-44ef-8c54-0b8d6e1bcd63"></amp-img>
  </div>
</div>
<br>

**Nota:** Este demo solo funciona desde el dispositivo o emulador.