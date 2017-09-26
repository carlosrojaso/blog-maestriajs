---
layout: post
title: "Como Publicar tu App en Google Play Store."
keywords: "Tips"
date: 2017-09-27
tags: [tips]
categories: tips
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-27-enviando-al-appstore%2FGoogle%20play%20store.png?alt=media&token=d259e585-5402-484b-a372-38a18812b426"
versions:
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.12.0'
---

> Has trabajado fuertemente en tu App y ha llegado el gran momento que todos esperamos, hacerla publica al mundo. En este post te mostramos paso por paso como enviarla a Google Play Store.

<!--summary-->

<amp-img width="1280" height="720" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-27-enviando-al-appstore%2FGoogle%20play%20store.png?alt=media&token=d259e585-5402-484b-a372-38a18812b426"></amp-img>

{% include general/net-promoter-score.html %} 

Para avanzar con este tutorial te sugiero que hayas probado anteriormente tu App con dispositivos reales y estes seguro que esta listo para enviar.

## Creando el Build de Producción.

El CLI de Ionic tiene integrado una caracteristica que te minimiza el tamaño de los archivos para que el peso de tu build sea optimo:

````
ionic cordova build android --prod --release
````

al final esto no debe generar un apk.

*Nota*: Anota la ubicacion del archivo lo vas a tener que firmar para que pueda ser enviado despues.

## Firmando nuestro Build.

Para avanzar en esta parte debes tener correctamente instalado tu entorno de Android SDK con las variables de entorno bien configuradas. Puedes ver este [link](http://j.mp/2xuzvvv).

### Crear un certificado.

*Nota:* Guarda el certificado en un lugar seguro, ya que lo vas a necesitar si quieres actualizar en un futuro tu App. 

Vamos a generar nuestro certificado con la herramienta del *keytool*:

````
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias

````

### Firmar nuestro Build.

En este paso vamos firmar nuestro apk para de esta manera confirmar que nosotros somos los desarrolladores.

````
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks android-release-unsigned.apk my-alias
````

Aca debes tener en cuenta que *android-release-unsigned.apk* debe ser la ubicación donde se genero tu build al comienzo.

Por ultimo Google play pide un proceso de optimización adicional, el cual lo realiza la herramienta *zipalign*. 

Esta herramienta esta normalmente en la ubicación de Android y debes tener al menos una version del API instalada. Puedes encontrarla acá. */path/to/Android/sdk/build-tools/VERSION/zipalign*

````
zipalign -v 4 android-release-unsigned.apk HelloWorld.apk
````

Ok, hasta este punto hemos terminado con el firmado del APK.

{% include blog/subscribe2.html %}

## Preparando la App en Google Play Store.

- Primero debes crear una cuenta para [publicar](https://developer.android.com/distribute/console/index.html).

- Debes Crear tu App y Preparar la Ficha de tu App.

<amp-img width="991" height="556" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-27-enviando-al-appstore%2FCaptura%20de%20pantalla%202017-09-26%20a%20la(s)%2012.45.35%20p.m..png?alt=media&token=94f2a316-2bfe-40a7-ac71-cf4ca632421f"></amp-img>

- Debes subir la versión que generamos en Producción o en Beta o Alfa para Pruebas.

<amp-img width="942" height="401" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-27-enviando-al-appstore%2FCaptura%20de%20pantalla%202017-09-26%20a%20la(s)%203.56.22%20p.m..png?alt=media&token=a15ecf69-a3f7-48e3-a220-686f5271efe9"></amp-img>

- Asegurarte de llenar toda la información obligatoria de Google Play.

<amp-img width="282" height="384" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-27-enviando-al-appstore%2FCaptura%20de%20pantalla%202017-09-26%20a%20la(s)%204.04.46%20p.m..png?alt=media&token=bdae1f89-e550-4880-bc4a-f31c60586a1c"></amp-img>

- Publicar desde el administrador de Versiones.

<amp-img width="542" height="351" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-27-enviando-al-appstore%2FCaptura%20de%20pantalla%202017-09-26%20a%20la(s)%204.04.52%20p.m..png?alt=media&token=ce72db83-a91c-43bb-9af3-702d8c27d6c9"></amp-img>

Puedes ver nuestra App [Aquí](http://j.mp/2xviNfk).
