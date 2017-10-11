---
layout: post
title: "Novedades en Cloud Firestore"
keywords: "AngularFire5, Cloud Firestore"
date: 2017-10-05
tags: [news]
categories: news
author: javaruiz
video: true
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-04-firestore%2Fcover.jpeg?alt=media&token=63f1b115-18c0-40b7-a132-92f469f55842"
versions:
  - title: 'AngularFire5'
    number: '^5.0.0.rc.1'
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-04-firestore%2Fcover.jpeg?alt=media&token=63f1b115-18c0-40b7-a132-92f469f55842"></amp-img>

## Cloud Firestore

> Google ha lanzado un nuevo servicio de base de datos dentro de **Firebase**, una base de datos de documentos NoSQL, algo al estilo de **MongoDB**.

<!--summary-->
En el sitio oficial [Firebase Blog](https://firebase.googleblog.com/2017/10/introducing-cloud-firestore.html), detallan que esta diseña para almacenar y sincronizar fácilmente datos a gran escala, y que se encuentra ya disponible en su version **Beta**.

### Características

#### Documentos y Colecciones    
Usa Documentos y Colecciones para estructurar y consultar datos, este modelo de datos es familiar e intuitivo para muchos desarrolladores, permite hacer consultas expresivas. Las consultas se escalan con el tamaño conjunto de resultados, no con el tamaño del conjunto de datos, por lo que se obtiene el mismo rendimientos obteniendo 1 resultado de un conjunto de datos de 100 ó 1000000000.

#### SDK para **Android**, **Web** y **IOS**
Los SDK sincronizan los datos de las aplicaciones casi al instante. Esto hace muy fácil la creación de aplicaciones reactivas, la sincronización automática de datos entre dispositivos y la creación de funciones colaborativas.

#### Sincronización de datos en **RealTime** / **Offline**
Esto significa que la aplicación funcionará sin problemas, incluso cuando nuestros usuarios pierdan conectividad, y se sincronisarán cuando recuperen esa conectividad. El modo sin conexión esta disponible para Web, IOS y Android.

Sigue manteniendo el llamado **Serverless Development**, que nos ahorra el desarrollo de autentificación, y cuenta con reglas de seguridad para que usuarios pueden acceder a los documentos de **Firestore**. Puedes configurar fácilmente **Cloud Functions**.

Cloud Firestore fue construido en colaboración con el equipo de Google Cloud Platform(GCP), significa que es un producto totalmente administrado desde cero para escalar automáticamente. Cloud Firestore es una base de datos replicada en múltiples regiones que asegura el no comprometer los datos, es decir si hay alguna catástrofe la información es duradera.

Puedes consultar los SDKs en Github para [IOS](https://github.com/firebase/firebase-ios-sdk) y [javascript](https://github.com/firebase/firebase-js-sdk).
Si estas utilizando **angularfire2**, puedes ver la guía de actualización -> [Upgrading to AngularFire5](https://github.com/angular/angularfire2/blob/master/docs/version-5-upgrade.md)


> Próximamente les traeré un tutorial de como utilizar Firestore con Angular, les dejo el video de presentación de Cloud Firestore.

### Introducción a Cloud Firestore
<amp-youtube width="560" 
            height="315"
            layout="responsive"
            data-videoid="QcsAb2RR52c"></amp-youtube>

{% include general/net-promoter-score.html %} 

Ahora podremos ver en nuestra consola de **Firebase**, en la opción de ***Database*** una nueva opción:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="268" height="205" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-04-firestore%2F1.jpeg?alt=media&token=5d207d8e-62b9-427a-a2ea-c9c611f536f6"></amp-img>
  </div>
</div>

Donde seleccionaremos ***Cloud Firestore***, nos abrirá un modal para agregar nuestra primera **Colección**.
<amp-img width="708" height="400" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-04-firestore%2F2.jpeg?alt=media&token=2e5bab15-2403-465a-aace-e5455a506a3c"></amp-img>
Después nos preguntará los campos a ingresar del **Documento**, su tipo y su valor, también se queremos asignarle un ID propio ó uno generado, recordando que el conjunto de Documentos hacen una Colección.
<amp-img width="699" height="530" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-04-firestore%2F3.jpeg?alt=media&token=614e492b-4531-41c7-9711-2d591446a0dd"></amp-img>
Podremos ver esta pantalla al terminar.
<amp-img width="1260" height="647" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-04-firestore%2F4.jpeg?alt=media&token=bac721a3-3985-42fb-b3eb-47b61b19f321"></amp-img>

{% include blog/subscribe.html %}

Como dato las reglas quedarían como a continuación:
```
service cloud.firestore {
    match /databases/{database}/documents {
        match /{document=**} {
            allow read, write: if false;
        }
    }
}
```

Existen otros métodos más avanzados para interfaces en funciones y clases, por el momento vamos a dejar la parte básica.

Si quieres aprender más sobre TypeScript puedes revisar la documentación en el [sitio oficial](https://www.typescriptlang.org/).
