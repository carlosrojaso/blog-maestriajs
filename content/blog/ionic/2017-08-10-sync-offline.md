---
layout: post
title: "Sincronización Offline con AngularFire"
keywords: "firebase, angular, ionic, "
date: 2017-08-10
tags: [firebase, ionic]
categories: ionic2
author: javebratt
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-02-24-formsularios-firebase%2F5mTwi1e.jpg?alt=media&token=506ec3e9-8174-4f3f-8311-edddc5a3abbd"
versions:
  - title: 'ionic'
    number: '3.6.0'
  - title: 'ionic-native'
    number: '3.12.1'
  - title: 'ionic-app-scripts'
    number: '2.1.3'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.6.0'
---

> Una de las preguntas que mas me hacen es como hacer para tener Firebase trabajando de manera Offline con Ionic Apps, Para cuando los usuarios estan en conexiones inestables.
<!--summary-->

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-02-24-formsularios-firebase%2F5mTwi1e.jpg?alt=media&token=506ec3e9-8174-4f3f-8311-edddc5a3abbd">



Yo siempre respondo de la misma manera, "Estoy esperando a que Firebase agregue soporte oficial a su JS SDK para poder usarlo" pero enfrentemoslo, esta ha sido una larga espera y aún nada.

Buscando un poco encontre una libreria interesante y facil de usar llamada [AngularFire2 Offline](https://github.com/adriancarriger/angularfire2-offline) por Adrian Carriger.

He estado jugando con ella por unos dias, y he encontrado que es muy facil de usar, y lo mejor es que no tienes que hacer grandes configuraciones o cambios para tenerla funcionando.

Con esa introducucción vamos a programar.

## AngularFire2 Offline

Lo primero que debes hacer es instalar la libreria ( Asumiendo que tu ya tienes una App en Ionic creada estas ubicado en el directorio de la App ), Solo abre la terminar y ejecuta.

```
$ npm install angularfire2-offline angularfire2 firebase --save
```

Si estas usando npm 5+ puedes remover el *--save*, este lo hace automaticamente.

Una vez este instalado, ve al archivo ```app.module.ts```, importe e inicialice ambos *AngularFire2* y *AngularFire2 Offline*:

```ts
import { AngularFireModule } from 'angularfire2';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "Your Firebase Credentials",
  authDomain: "Your Firebase Credentials",
  databaseURL: "Your Firebase Credentials",
  projectId: "Your Firebase Credentials",
  storageBucket: "Your Firebase Credentials",
  messagingSenderId: "Your Firebase Credentials"
};

@NgModule({
  declarations: [...],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireOfflineModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [...],
  providers: [...]
})
export class AppModule {}
```

Notese como hemos agregado el *AngularFireOfflineModule* a la declaracion de entrada.

Ahora que nuestra app esta inicializada nosotros podemos empezar a jugar con la libreria, vamos dentro del ```home.html``` y muestre una lista simple de canciones, la idea es que la lista persista aun si quedamos Offline y tenemos una actualización.

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Playlist
    </ion-title>
    <ion-buttons end>
      <button ion-button icon-only (click)="addSong()">
        <ion-icon name="add"></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-list>
    <ion-item *ngFor="let item of items | async">
      {{ item.songName }}
    </ion-item>  
  </ion-list>
</ion-content>
```

Estamos mostrando la lista dentro de nuestras etiquetas ```<ion-content></ion-content``` y estamos agregando un pequeño boton a la barra de navegación para agregar nuevas canciones a nuestra lista.

Nosotros crearemos canciones nuevas offline, y se sincronizaran con la base de datos una vez volvamos online.

Ahora vemos que toda la funcionalidad esta funcionando, mueve el ```home.ts``` e importa todo lo que necesites:

```ts
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { 
  AfoListObservable, 
  AngularFireOfflineDatabase } from 'angularfire2-offline/database';
```
La cosa genial sobre esta libreria offline es que tiene los mismos metodos que Angularfire2 tiene, Asi que los nombres son los mismos.



Para obtener nuestro HTML trabajando y mostrar la lista todo lo que necesitamos es crear una lista Observable de la base de datos.

```ts
public items: AfoListObservable<any[]>;
constructor(afoDatabase: AngularFireOfflineDatabase, 
    public alertCtrl: AlertController) {
    this.items = afoDatabase.list('/items');
}
```

No hemos hecho nada distinto a lo que hacemos con el AngularFire2 normal, y ya tenemos persistencia offline para nuestros datos, prueba guardando algunos datos y desconecta el Internet y haz una actualización, veras los datos aun ahi.

Ahora si queremos agregar las canciones a la lista, Nosotos usamos la función ```.push``` normal de AngularFire2.

```ts
addSong(): void {
  const prompt = this.alertCtrl.create({
    title: 'Add Song',
    message: "Add a new song to your playlist",
    inputs: [
      {
        name: 'songName',
        placeholder: 'Song Name'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          this.items.push({
            songName: data.songName
          });
        }
      }
    ]
  });
  prompt.present();
}
```

Nosotros solo empujamos la canción con una propiedad: ```songName```. Esta es la manera exacta para empujar objetos a una lista en AngularFire2, ahora vamos  y desconectemos el internet y agrega una canción veras que la canción aparece inmediatamente en tu lista.

Y si ves la base de datos tu veras que la canción no esta allí (duh, estamos desconectados), vamos a actualizar la vista, veras que la nueva canción aún aparece ahi, conectate a Internet y revisa tu base de datos 🙂

## Para tener en cuenta.

Algunas cosas para tener en cuenta:

* Los mismos metodos, es verdad, eso significa que puedes hacer consultas, trabajar con listas, objetos, CRUD, etc. Todo lo cual tiene sincronización offline.

* ```preserveSnapshot``` no esta soportada.

* Si escribes estando offline seguido por una actualización, las actualizaciones seran enviadas cuando tengas una conexion a Internet disponible.

Ver post [original en Ingles](https://javebratt.com/offline-angularfire2/?utm_content=buffer6cf2c).