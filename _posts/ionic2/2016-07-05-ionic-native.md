---
layout: post
title: "¿Qué es Ionic Native?"
tags: ionic2  
date: 2016-07-05
categories: ionic2
comments: true
author: nicobytes
cover: "http://i.imgur.com/FSAJb3n.png"
---

> **Ionic-native** es todo un conjunto de envolturas en ES5/ES6/Typescript para cualquiera de los plugins de **Cordova/Phonegap**, la cual hace que cuando queremos agregar cualquier función nativa a nuestra aplicación sea muy fácil.

<img src="http://i.imgur.com/FSAJb3n.png" class="img-responsive" alt="image angular2"/>

Recordemos que en la versión en ionic1, tuvimos a **ngCordova** que eran servicios que envolvían las funciones de los plugins de **Cordova/Phonegap**, esto nos ayudó mucho a implementar los plugins a nuestra app de forma muy fácil, pero el problema era el difícil mantenimiento a **ngCordova** ya que los plugins de Cordova cambian constantemente mantener actualizado **ngCordova** es algo complejo, entonces nos tocaba estar pendiente y mirar la documentación de ngCordova + la documentación del plugin nativo.

Ahora con **ionic native** esto cambio, si nos va a envolver las funciones del plugin para una fácil implemetatcion y nos retorna una `Promise` o `Observable` pero va fielmente integrada al plugin, es decir que si queremos implementar algún plugin solo debemos ir a la documentación oficial de cordova del plugin.

## Promises and Observables

Cuando hacemos la implementación de **ionic-native** tendremos como respuesta una  `Promise` o `Observable`, una `Promise` será cuando no necesitamos hacer seguimiento constante de una función y solo queremos un valor de respuesta, por ejemplo al usar la geolocalización y pedir las coordenadas.

Un `Observable` será cuando queremos hacer seguimiento constante de alguna función, por ejemplo pedir lo geolocalización cada 5 minutos, aquí los usaremos un `Observable`. Miremos el ejemplo:

{% highlight js linenos %}
import {Geolocation} from 'ionic-native';

Geolocation.getCurrentPosition().then(pos => {
  console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
});

let watch = Geolocation.watchPosition().subscribe(pos => {
  console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
});

// to stop watching
watch.unsubscribe();
{% endhighlight %}

En la *línea 3* manejamos un `Promise` en donde solo recibimos los datos pero en *línea 7* donde usamos `watchPosition` para estar pidiendo la geolocalización cada X tiempo usamos un `Observable` en el cual podemos usar `subscribe` y `unsubscribe`.
## Runtime Diagnostics

A diferencia de la versión 1 donde usamos ngCordova, **ionic native** nos permite saber al implementar un plugin nos falta instalar el plugin o saber cual es problema realmente, aunque debemos probarlo directamente en un dispositivo o emulador y en el emulador de la web no funcionará correctamente.

Aqui estan los plugins que ya están listos para ser usados con **ionic native**:
<ul>
  
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/3dtouch">3DTouch</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/action-sheet">Action Sheet</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/admob">AdMob</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/app-availability">App Availability</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/app-rate">App Rate</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/app-version">App Version</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/background-mode">Background Mode</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/backgroundgeolocation">BackgroundGeolocation</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/badge">Badge</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/barcode-scanner">Barcode Scanner</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/base64-to gallery">Base64 To Gallery</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/battery-status">Battery Status</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/ble">BLE</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/bluetooth-serial">Bluetooth Serial</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/brightness">Brightness</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/calendar">Calendar</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/camera">Camera</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/cardio">CardIO</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/clipboard">Clipboard</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/connection">Connection</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contact">Contact</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactaddress">ContactAddress</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactfield">ContactField</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactfindoptions">ContactFindOptions</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactname">ContactName</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactorganization">ContactOrganization</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contacts">Contacts</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/date-picker">Date Picker</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/db-meter">DB Meter</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/device">Device</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/device-motion">Device Motion</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/device-orientation">Device Orientation</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/deviceaccounts">DeviceAccounts</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/diagnostic">Diagnostic</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/dialogs">Dialogs</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/email-composer">Email Composer</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/facebook">Facebook</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/file">File</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/flashlight">Flashlight</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/geolocation">Geolocation</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/globalization">Globalization</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/google-analytics">Google Analytics</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/google-maps">Google Maps</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/google-plus">Google Plus</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/hotspot">Hotspot</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/httpd">Httpd</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/image-picker">Image Picker</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/inappbrowser">InAppBrowser</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/insomnia">Insomnia</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/ionic-deeplinks">Ionic Deeplinks</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/keyboard">Keyboard</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/launch-navigator">Launch Navigator</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/local-notifications">Local Notifications</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/mediaerror">MediaError</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/mediaplugin">MediaPlugin</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/network">Network</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/printer">Printer</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/push">Push</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/safariviewcontroller">SafariViewController</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/screenshot">Screenshot</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/sms">SMS</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/social-sharing">Social Sharing</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/spinner-dialog">Spinner Dialog</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/splashscreen">Splashscreen</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/sqlite">SQLite</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/status-bar">Status Bar</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/toast">Toast</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/touchid">TouchID</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/transfer">Transfer</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/vibration">Vibration</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/webintent">WebIntent</a>
</li>

</ul>