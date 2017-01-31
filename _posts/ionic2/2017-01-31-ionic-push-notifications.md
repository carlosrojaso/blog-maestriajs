---
layout: post
title: "Ionic Push Notifications"
keywords: "ionic push notifications, ionic push, push notifications, notifications, notifications en ionic 2"
date: 2017-01-30
tags: [demos, ionic2, native]
categories: ionic2
repo: "https://github.com/ion-book/demo110"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FPUSH%20(1).jpg?alt=media"
---

> Implementar el sistema de **notificaciones push** en una aplicación es una de las tareas más comunes y Ionic tiene un servicio que nos ahorra este trabajo.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FPUSH%20(1).jpg?alt=media" alt="Ionic Push Notifications"></amp-img>

Ionic cuenta con un conjunto de servicios que tienen una gran integración con aplicaciónes hibridas. Se llama Ionic Cloud y ofrece varias herramientas que pueden potenciar las aplicaciónes:

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="624" height="519" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionic-cloud.png?alt=media" alt="Validaciones en Formularios"></amp-img>
  </div>
</div>

En este artículo implementaremos el sistema **Ionic Push + Ionic 2**, pero primero revisaremos cómo funciona el sistema de notificaciones, con la siguiente gráfica:

<amp-img width="1600" height="595" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fsend-push-diagram.png?alt=media" alt="Validaciones en Formularios"></amp-img>

*Nota: GCM ahora es FCM*

Para enviar notificaciones Push a dispositivos Android y IOS debemos conectarnos al servicio de **FCM (Firebase Cloud Message)** de Android y a **APNS (Apple Push Notification Service)** de IOS, ellos son los que realmente hacen que la notificación llegue al dispositivo. Para comunicarnos con FCM o APNS vamos a usar Ionic Push, el cual nos ahorra todo el trabajo de crear un servicio que se comunique con FCM o APNS.

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2]({{site.urlblog}}/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start demo110 blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo110
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera *app*.

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="500" height="493" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo102%2FScreenshot%20from%202016-11-06%2012-46-16.png?alt=media"></amp-img>
  </div>
</div>

Luego agregamos la plataforma para las que vamos a desarrollar:

```
ionic platform add android
ionic platform add ios
```

## Paso 2: Crear una cuenta en ionic.io

Ahora debemos crear una cuenta en [ionic.io](https://apps.ionic.io/login){:target="_blank"}, para poder usar Ionic Push.

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-apps-ionic-io-login-1485815140293.png?alt=media"></amp-img>

## Paso 3: Instalar Ionic Cloud.

Luego de crear la cuenta en Ionic.io, debemos implementar la librería para empezar a usar cualquier servicio de Ionic Cloud. Así que vamos a nuestra terminal y ejecutamos: 

```
npm install @ionic/cloud-angular --save
```

Luego debemos conectar nuestro usuario de ionic.io con la aplicación, así:

```
ionic io init
```

Esto genera un **ID** para la aplicación, que lo encontramos en `ionic.config.json`, ahora debemos agregar ionic cloud a los módulos de la aplicación en `src/app/app.module.ts`, así:

{% highlight ts linenos %}
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
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  ...
})
export class AppModule {}
{% endhighlight %}

Si todo quedo bien dentro de la cuenta de ionic.io debe mostrar la aplicación creada, así:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-apps-ionic-io-apps-1485815827609.png?alt=media"></amp-img>

## Paso 4: Generar tus llaves en Firebase

Ahora para enviar mensajería para Android debemos generar las siguientes llaves:

- Server key
- Sender ID

Estas llaves se generan desde firebase.google.com, donde debemos crear un proyecto y luego ir a la página de **Setting > Cloud Messaging**, así:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-console-firebase-google-project-ion-demo-156701-settings-cloudmessaging-1485816187925.png?alt=media"></amp-img>

Ahora estas credenciales debemos adjuntarlas en la plataforma de ionic.io, seleccionar la aplicación y luego ir a **Setting > Certificates**, así:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-apps-ionic-io-app-20c91c51-config-credentials-1485816799367.png?alt=media"></amp-img>

Luego debemos crear un perfil de seguridad:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-apps-ionic-io-app-20c91c51-config-credentials-1485816826581.png?alt=media"></amp-img>

Y por último editamos el perfil de seguridad creado y en la sección de **Android** agregamos nuestra **FCM Server Key**:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-apps-ionic-io-app-20c91c51-config-credentials-1485817079784.png?alt=media"></amp-img>

## Paso 5: Instalar Plugin Push

Ahora debemos instalar el plugin que nos permite enviar y recibir notificaciones desde la aplicación con ionic 2.

```
ionic plugin add phonegap-plugin-push --variable SENDER_ID=your_sender_id --save
```

Además debemos añadir la configuración de notificaciones en `src/app/app.module.ts`, así:

{% highlight ts linenos %}
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID',
  },
  'push': {
    'sender_id': 'SENDER_ID',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};
{% endhighlight %}

*Nota: Hay varias opciones que se pueden configurar como el sonido, icono etc, para ver todas las opciones revisar la documentación oficial de [Ionic Push](http://docs.ionic.io/services/push/){:target="_blank"}*

## Paso 6: Escuchando notificaciones.

Ahora debemos registrar el **PushToken** de cada dispositivo, el **PushToken** es un identificador único de cada dispositivo y debemos obtenerlo y luego registrarlo en ionic.io. Para esto crearemos el método `registerToken` en `app.component.ts`, así:

{% highlight ts linenos %}
....
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, public push: Push) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.registerToken();
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
}
{% endhighlight %}

Finalmente para recibir y controlar notificaciones, puedes agregar este método en el lugar que se necesite, puede ser en el Home de la aplicación luego que el usuario ingrese o desde el inicio en `app.component.ts`:

{% highlight ts linenos %}
this.push.rx.notification()
.subscribe((msg) => {
  alert(msg.title + ': ' + msg.text);
});
{% endhighlight %}

## Paso 7: Enviando notificaciones

Ahora para enviar notificaciones podemos usar la plataforma de ionic.io y probar que recibimos una notificación en la aplicación.

Primero vamos a la sección de Push:

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-apps-ionic-io-app-20c91c51-push-overview-1485818942702%20(1).png?alt=media"></amp-img>

Luego creamos los detalles de nuestro aplicacion, como mensaje, título, sonido etc.

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-apps-ionic-io-app-20c91c51-push-create-1485818960028%20(1).png?alt=media"></amp-img>

Luego seleccionamos los usuarios a los que queremos que llegue la notificación.

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-apps-ionic-io-app-20c91c51-push-segment-4c307b8b-8f62-4bd0-93f2-0bcfefa62340-1485818996727%20(1).png?alt=media"></amp-img>

*Nota: Puedes usar el servicio de Ionic Auth + Ionic Push para así registrar a los usuarios y así poder organizarlos en grupos y poder enviar notificaciones segmentadas.*

Luego seleccionamos el perfil de seguridad y enviamos.

<amp-img width="1366" height="678" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fscreencapture-apps-ionic-io-app-20c91c51-push-send-4c307b8b-8f62-4bd0-93f2-0bcfefa62340-1485819024807.png?alt=media"></amp-img>

## Resultado:

<div class="row">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FScreenshot_20170130-185440.png?alt=media"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FScreenshot_20170130-185448.png?alt=media"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FScreenshot_20170130-185458.png?alt=media"></amp-img>
  </div>
</div>
<br>

**Nota:** Este demo solo funciona desde el dispositivo o emulador.