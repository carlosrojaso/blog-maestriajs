---
layout: post
title: "Ionic 2 + OneSignal = PushNotification Awesome Easy"
keywords: "ionic push notifications, OneSignal, push notifications, notifications, notifications en ionic 2, OneSignal y ionic"
date: 2017-01-30
tags: [push, ionic2, native]
categories: ionic2
author: levanocarlos
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F1.-%20dashboard_onesignal.png?alt=media"
---

> En el mundo de las aplicaciones móviles ya sean Híbridas o Nativas es sumamente necesario implementar las notificaciones push.
Existen diversas alternativas para hacer que tu aplicación tenga las **Notificaciones Push**.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F1.-%20dashboard_onesignal.png?alt=media" alt="Ionic Push Notifications"></amp-img>

Hace poco salio un post de parte del equipo de **ion-book** donde te enseñaban a usar las [Notificaciones Push](https://www.ion-book.com/blog/ionic2/ionic-push-notifications/){:target="_blank"} de Ionic con su [**Ionic Cloud**](https://www.ion-book.com/blog/ionic2/ionic-push-notifications/){:target="_blank"}.

Hoy les enseñare otra alternativa sencilla de implementar las **Notificaciones Push** sin usar tanto código gracias a una tecnología llamada **OneSignal** *(Es totalmente Gratis, incluso puedes usarlo para notificaciones para los navegadores web)*.

## OneSignal

### Primero

1. Primero tenemos que entrar a la página de [OneSignal](https://onesignal.com/){:target="_blank"} nos registrarnos(puedes hacerlo mediante Github, Google, Facebook o el típico y aburrido correo y password).

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="431" height="483" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F2.-%20login_onesignal.png?alt=media" alt="1"></amp-img>
  </div>
</div>

### Segundo

2.- Una vez dentro nos mostrará una vista donde podremos ver los proyectos que crearemos, puede ser un proyecto o todos los que tu imaginación quiera.

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="698" height="615" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F1.-%20dashboard_onesignal.png?alt=media" alt="2"></amp-img>
  </div>
</div>

### Tercero

3.- Le damos clic a crear nuevo. 
Con esto estamos creando un nuevo proyecto para implementarlo con Ionic, colocamos el nombre que queramos.

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="458" height="257" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F3.-%20new_project.png?alt=media" alt="2"></amp-img>
  </div>
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="592" height="267" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F4.-%20name_project.png?alt=media" alt="2"></amp-img>
  </div>
</div>

### Cuarto

4.-  Nos pedirá seleccionar la plataforma a configurar( en este caso lo haremos para android,  puedes hacerlo para otros). Seleccionamos el Google Android (Ahora es FCM).

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="503" height="347" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F5.-%20select_platform.png?alt=media" alt="2"></amp-img>
  </div>
</div>

### Quinto

5.- Una vez que ya seleccionamos la plataforma nos mostrara esta vista donde tendremos que poner el Google Server ApiKey y el Google Project Number.
Aca dejo la documentación de OneSignal con respecto a cómo crear un proyecto FCM .
https://documentation.onesignal.com/docs/generate-a-google-server-api-key

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="529" height="325" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F6.-%20configuration.png?alt=media" alt="2"></amp-img>
  </div>
</div>

### Sexto

6.- Una vez que ya lo tenemos, creamos el proyecto, colocamos el API Key y el Project Number nos mostrará una vista donde tenemos que seleccionar el SDK  a usar, en este caso será una App Híbrida por lo tanto tenemos que seleccionar si es Phonegap, Cordova, Ionic.

<div class="row">
  <div class="col col-100 col-md-100 col-lg-80 offset-lg-10">
    <amp-img width="508" height="364" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F7.-%20sdk.png?alt=media" alt="2"></amp-img>
  </div>
</div>

### Septimo

7.- Habiendo seleccionado el SDK que usaremos nos aparece otra vista donde verificará si existe un usuario suscrito. Cuando hallamos creado el proyecto de IONIC y hallamos instalado el Apk en un dispoditivo podremos hacer clic en el boton de nombre “Check Subscribed Users” con esto onesignal verifica que al menos existe un usuario para enviar una notificación.

Es aquí donde entra la parte más emocionante y súper sencilla. 

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="518" height="355" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F8.-%20process.png?alt=media" alt="2"></amp-img>
  </div>
</div>

## Ionic

Crearemos un proyecto en Ionic, si señores ya es momento de tocar IONIC.

### Primero

1.- Abrimos nuestra terminal y colocamos esto.

```
ionic start onesignalionic blank --v2
```

### Segundo

2.- Una vez que ya nos creó el proyecto, ingresamos haciendo esto:

```
cd onesignalionic
```

### Tercero

3.- Añadimos la plataforma que vamos a usar, en este caso es android y colocamos esto en la terminal:

```
ionic platform add android
```

### Cuarto

4.- Ahora que hemos agregado la plataforma podemos hacer uso de ionic- native, para incluir a OneSignal sólo tenemos que hacer esto.

```
ionic plugin add onesignal-cordova-plugin
```

### Quinto

5.- Ahora tenemos que abrir el proyecto con un editor, para ionic, uso Visual Studio Code, en la terminal si usas visualStudioCode simplemente haz esto: 

```
code .
```

### Sexto

6.- Tenemos que modificar el archivo `app.components` dentro de la carpeta `src/app`, colocamos este script después del `splashscreen.hide()`;

{% highlight ts linenos %}
 constructor(platform: Platform, alertCtrl: AlertController) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      let notificationOpenedCallback = function(jsonData) {
        let alert =alertCtrl.create({
          title: jsonData.notification.payload.title,
          subTitle: jsonData.notification.payload.body,
          buttons: ['OK']
        });
        alert.present();
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("ID_PROYECT_ONESIGNAL", "ID_GOOGLE")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    });
  }
{% endhighlight %}

### Septimo

7.- Ya tenemos todo listo, ahora tenemos que construir el App e instalarlo en nuestro celular.
Hacemos esto:

```
ionic build android --prod
ionic run android --prod
```

Ya tenemos todo listo por parte de OneSignal y por parte del proyecto de Ionic.

Ahora para hacer la prueba de enviar una **notificacion push** solo tenemos que entrar al dashboard de onesignal, nos vamos a la sección **New Message** como indica la imagen (me comprometo en poder hacer otro tutorial donde describo las secciones de OneSignal).

<div class="row">
  <div class="col col-100 col-md-100 col-lg-80 offset-lg-10">
    <amp-img width="780" height="308" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F9.-%20new_message.png?alt=media" alt="2"></amp-img>
  </div>
</div>

Le damos clic en **Preview** -> nos da una vista previa de toda la información que se enviará, le damos clic en “Send” y listo. Esto es todo realmente… Cansado de leer ?... no verdad?

Muestro lo screenShot de las notificaciones push que llegan.

## Resultado:

<div class="row">
  <div class="col col-100 col-md-80 offset-md-10 col-lg-80 offset-lg-10">
    <div class="row">
      <div class="col col-100 col-md-50 col-lg-50">
        <amp-img width="1080" height="1920" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F10.-%20notification_push.png?alt=media"></amp-img>
      </div>
      <div class="col col-100 col-md-50 col-lg-50">
        <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fonesignal%2F11.-%20notification_push_app.png?alt=media"></amp-img>
      </div>
    </div>
  </div>
</div>
<br>

Ojo, se puede personalizar el icono, el sonido, y todo lo demás en un post más adelante lo haré.

**Nota:** Este demo solo funciona desde el dispositivo o emulador.