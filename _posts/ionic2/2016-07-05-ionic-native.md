---
layout: post
title: "¿Qué es Ionic Native?"
tags: [native, ionic2]  
date: 2016-07-05
categories: ionic2
comments: true
author: nicobytes
cover: "http://i.imgur.com/FSAJb3n.png"
---

> **Ionic-native** es todo un conjunto de envolturas en ES5/ES6/Typescript para cualquiera de los plugins de **Cordova/Phonegap**, la cual hace que cuando queremos agregar cualquier función nativa a nuestra aplicación sea muy fácil.

<amp-img width="1318" height="764" layout="responsive" src="http://i.imgur.com/FSAJb3n.png"></amp-img>

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

A diferencia de la versión 1 donde usamos ngCordova, **ionic native** nos permite saber si al usar un plugin nos falta instalar el plugin o saber cual es problema realmente, aunque debemos probarlo directamente en un dispositivo o emulador y en el emulador de la web no funcionará correctamente.

Aqui estan los plugins que ya están listos para ser usados con **ionic native**:
<ul>
  
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/3dtouch" target="_blank">3DTouch</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/action-sheet" target="_blank">Action Sheet</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/admob" target="_blank">AdMob</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/app-availability" target="_blank">App Availability</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/app-rate" target="_blank">App Rate</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/app-version" target="_blank">App Version</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/background-mode" target="_blank">Background Mode</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/backgroundgeolocation" target="_blank">BackgroundGeolocation</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/badge" target="_blank">Badge</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/barcode-scanner" target="_blank">Barcode Scanner</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/base64-to gallery" target="_blank">Base64 To Gallery</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/battery-status" target="_blank">Battery Status</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/ble" target="_blank">BLE</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/bluetooth-serial" target="_blank">Bluetooth Serial</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/brightness" target="_blank">Brightness</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/calendar" target="_blank">Calendar</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/camera" target="_blank">Camera</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/cardio" target="_blank">CardIO</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/clipboard" target="_blank">Clipboard</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/connection" target="_blank">Connection</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contact" target="_blank">Contact</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactaddress" target="_blank">ContactAddress</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactfield" target="_blank">ContactField</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactfindoptions" target="_blank">ContactFindOptions</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactname" target="_blank">ContactName</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contactorganization" target="_blank">ContactOrganization</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/contacts" target="_blank">Contacts</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/date-picker" target="_blank">Date Picker</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/db-meter" target="_blank">DB Meter</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/device" target="_blank">Device</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/device-motion" target="_blank">Device Motion</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/device-orientation" target="_blank">Device Orientation</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/deviceaccounts" target="_blank">DeviceAccounts</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/diagnostic" target="_blank">Diagnostic</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/dialogs" target="_blank">Dialogs</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/email-composer" target="_blank">Email Composer</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/facebook" target="_blank">Facebook</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/file" target="_blank">File</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/flashlight" target="_blank">Flashlight</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/geolocation" target="_blank">Geolocation</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/globalization" target="_blank">Globalization</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/google-analytics" target="_blank">Google Analytics</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/google-maps" target="_blank">Google Maps</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/google-plus" target="_blank">Google Plus</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/hotspot" target="_blank">Hotspot</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/httpd" target="_blank">Httpd</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/image-picker" target="_blank">Image Picker</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/inappbrowser" target="_blank">InAppBrowser</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/insomnia" target="_blank">Insomnia</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/ionic-deeplinks" target="_blank">Ionic Deeplinks</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/keyboard" target="_blank">Keyboard</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/launch-navigator" target="_blank">Launch Navigator</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/local-notifications" target="_blank">Local Notifications</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/mediaerror" target="_blank">MediaError</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/mediaplugin" target="_blank">MediaPlugin</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/network" target="_blank">Network</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/printer" target="_blank">Printer</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/push" target="_blank">Push</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/safariviewcontroller" target="_blank">SafariViewController</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/screenshot" target="_blank">Screenshot</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/sms" target="_blank">SMS</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/social-sharing" target="_blank">Social Sharing</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/spinner-dialog" target="_blank">Spinner Dialog</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/splashscreen" target="_blank">Splashscreen</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/sqlite" target="_blank">SQLite</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/status-bar" target="_blank">Status Bar</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/toast" target="_blank">Toast</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/touchid" target="_blank">TouchID</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/transfer" target="_blank">Transfer</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/vibration" target="_blank">Vibration</a>
</li>
<li class="capitalize ">
  <a href="http://ionicframework.com/docs/v2/native/webintent" target="_blank">WebIntent</a>
</li>

</ul>