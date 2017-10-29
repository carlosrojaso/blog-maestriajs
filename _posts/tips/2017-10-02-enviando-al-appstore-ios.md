---
layout: post
title: "Como Publicar tu App en App Store."
keywords: "Tips"
date: 2017-10-06
tags: [tips]
categories: tips
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FAPP%20STORE.png?alt=media&token=952683d1-90d7-4ae3-8f83-ba10b8e978ad"
versions:
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.12.0'
---

> Has trabajado fuertemente en tu App y ha llegado el gran momento que todos esperamos, hacerla publica al mundo. En este post te mostramos paso por paso como enviarla al App Store.

<!--summary-->

<amp-img width="1280" height="720" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FAPP%20STORE.png?alt=media&token=952683d1-90d7-4ae3-8f83-ba10b8e978ad"></amp-img>

{% include general/net-promoter-score.html %} 

## Requerimientos.

- Debes tener una cuenta de desarrollador de 99 USD/ año activa.

- Debes tener instalado Xcode.

## Preparación.

- Asegurate de tener los iconos y los Splashscreens listos. Puedes ver este [post](https://www.ion-book.com/blog/tips/preparando-iconos-splashscreen/).

- Debes crear un build para producción desde tu proyecto.

````
ionic cordova build ios --prod --release
`````

- Ahora deberias tener un proyecto de Xcode en tu carpeta *platforms/ios/*

<amp-img width="413" height="202" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-04%20a%20la(s)%205.41.20%20p.m..png?alt=media&token=1bc7e648-cf29-4c5a-8491-39721241f3fa"></amp-img>

- Vamos a abrir el que dice nombre_del_proyecto.xcodeproject, debe abrir Xcode.

- Ahora debes asegurarte de tener tus credenciales y certificados funcionando bien. (Esto es clave) Para esto debes ingresar desde el menu de Xcode > Preferences

<amp-img width="318" height="301" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-04%20a%20la(s)%205.43.31%20p.m..png?alt=media&token=1875bf3f-4f4e-49d3-a757-65c12699bfd6"></amp-img>

<amp-img width="319" height="266" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-04%20a%20la(s)%205.45.26%20p.m..png?alt=media&token=40718fbf-fe4d-418a-b52a-67078b6fdced"></amp-img>

- Y configurar tus credenciales a traves de Xcode. Lo puedes ver en la parte inferior.

<amp-img width="447" height="121" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-04%20a%20la(s)%205.45.34%20p.m..png?alt=media&token=761f89b4-af01-496c-97ac-acb4557fa9fe"></amp-img>

- Luego debes ingresar a la configuracion general de tu proyecto en Xcode. y asegurar que tu certificado este bien asociado.

{% include blog/subscribe.html %}

## Acerca de los Certificados.

Este punto es un poco complicado pero Xcode ya te permite obtener lo principal facilmente, según te mostre antes. En general vas a necesitar tener 3 cosas asociadas desde tu cuenta de Apple.

- Vas a necesitar un App ID asociado a tu app y debe ser igual en el config.xml de tu App en ionic.

<amp-img width="341" height="263" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2Fappids.png?alt=media&token=9ebdd0bc-bfde-4cad-b644-47e9afc7ab20"></amp-img>

- Vas a necesitar un certificado de distribución y debes seleccionar App Store.

<amp-img width="254" height="172" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-05%20a%20la(s)%209.43.21%20a.m..png?alt=media&token=62509956-4e6d-4a3d-882a-2b047ab38f75"></amp-img>

- Y vas a necesitar un provision profile asociado a las dos anteriores y a tu app en XCode.

<amp-img width="235" height="141" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-05%20a%20la(s)%2012.11.48%20p.m..png?alt=media&token=27f4e49f-5b4f-49e9-b049-f9f47e21be3d"></amp-img>

Esto es en esencia lo que debes hacer pero si tienes problema con la generación o entender por que se necesita puedes ver la documentación de [Apple](http://j.mp/2xVXbsY).

## Construyendo el build y enviando desde Xcode.

- Una vez todo este bien conectado debes ingresar desde Xcode a Product > Archive.

<amp-img width="378" height="353" layout="fixed" src="
https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-05%20a%20la(s)%2012.15.26%20p.m..png?alt=media&token=26c5da06-a5eb-45cb-b71b-4c79ddae3338"></amp-img>

- Genera tu build y te aparecera una ventana lista para distribución.

<amp-img width="1203" height="537" layout="responsive" src="
https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-05%20a%20la(s)%2012.18.09%20p.m..png?alt=media&token=81486ac0-1ef1-43f7-9063-d7b54d7f83fb"></amp-img>

Antes de enviar desde Xcode debes crear una ficha de app en [itunes connect](https://itunesconnect.apple.com/).

## Creando tu app en Itunes connect.

- Debes ingresar a [itunes connect](https://itunesconnect.apple.com/) e ir a Mis Apps.

<amp-img width="323" height="259" layout="fixed" src="
https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-04%20a%20la(s)%2011.07.53%20a.m..png?alt=media&token=cc4a655f-14de-4f0d-b408-1be302af8b66"></amp-img>

- Aca deberas llenar toda la info de tu App con imagenes de tu App e información relevante.

- Una vez terminado, debes volver a XCode.

## Envio desde XCode a Itunes Connect.

- Ahora si debemos volver a la ventana que nos genero Xcode cuando hicimos Archive y presionar "Upload to App Store".

<amp-img width="258" height="179" layout="fixed" src="
https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2FCaptura%20de%20pantalla%202017-10-05%20a%20la(s)%2012.26.44%20p.m..png?alt=media&token=e42b5072-3a9d-4f1b-83b4-2b6b03683595"></amp-img>

<amp-img width="750" height="457" layout="responsive" src="
https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-02-enviando-al-appstore-ios%2Fuploading.png?alt=media&token=555f61a3-e858-434b-855b-da5306c2bc0e"></amp-img>

Ok, ahora debes esperar un buen tiempo a que suba tu App. Una vez subida debes volver a Itunes Connect y empezar el proceso de revision que puede tomar entre 2 a 4 semanas en estar exitosamente listo para publicar.

Espero este post sea de utilidad y mucha suerte :)








