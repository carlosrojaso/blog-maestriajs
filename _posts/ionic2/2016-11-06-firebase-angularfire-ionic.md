---
layout: post
title:  "Firebase + AngularFire + Ionic, en 7 pasos"
date: 2017-06-14
categories: ionic2
tags: [firebase]
author: nicobytes
repo: "https://github.com/ion-book/demo104"
remember: true
cover: "/images/posts/ionic2/2016-11-06-firebase-angularfire-ionic/cover.jpg"
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

> Incluir **Firebase** en un proyecto de ionic puede ser algo complejo pero el equipo de Angular nos ofrece *AngularFire*, una librería para conectar más fácil con firebase dentro de *Ionic* o cualquier proyecto basado en Angular.

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2016-11-06-firebase-angularfire-ionic/cover.jpg"></amp-img>

# Paso 1: Creación del proyecto en Firebase.

Debes ir a la nueva consola de firebase [aquí](https://console.firebase.google.com){:target="_blank"} y crear un proyecto nuevo:

<amp-img width="999" height="572" layout="responsive" src="/images/posts/ionic2/2016-08-02-firebase-database-and-ionic/screen.png" alt="firebase-database-and-ionic-2"></amp-img>

# Paso 2: Copiar las variables de configuración.

Ahora debemos ir a la sección de **Auth** y copiar las variables de configuración que nos provee firebase, oprime el botón **WEB SETUP**:

<amp-img width="1015" height="573" layout="responsive" src="/images/posts/ionic2/2016-08-02-firebase-database-and-ionic/screen1.png" alt="firebase-database-and-ionic-2"></amp-img>

# Paso 3: Reglas de seguridad

Por último vamos a la sección de Database y configuraremos las reglas de seguridad para que nos permita conectarnos a la base de datos sin ninguna autentificación:

<amp-img width="1015" height="575" layout="responsive" src="/images/posts/ionic2/2016-08-02-firebase-database-and-ionic/screen2.png" alt="firebase-database-and-ionic-2"></amp-img>

# Paso 4: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo104 blank
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo104
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="183" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/tree1.png"></amp-img>
  </div>
</div>

# Paso 5: Agregar Firebase y AngularFire

Ahora para integrar Firebase y AngularFire debemos instalar dos dependencias en el proyecto, así:

```
npm install firebase angularfire2 --save
```

# Paso 6: Creando variable de configuración

Debemos crear una variable que tenga las llaves otorgadas por Firebase en `app.module.ts`.

```ts
const firebaseConfig = {
  apiKey: "AIzaSyAvYzM1bqFjoVi-VGMHeDbN0XwFsYDtLQ0",
  authDomain: "demo104-60efc.firebaseapp.com",
  databaseURL: "https://demo104-60efc.firebaseio.com",
  projectId: "demo104-60efc",
  storageBucket: "demo104-60efc.appspot.com",
  messagingSenderId: "903778168776"
};
```

# Paso 7: Conectado Ionic con Firebase

Para conectarnos a Firebase debemos importar a `AngularFireModule` y `AngularFireDatabaseModule`, agregar estos módulos a los `imports` de la aplicación, así:

```ts
...

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: "AIzaSyAvYzM1bqFjoVi-VGMHeDbN0XwFsYDtLQ0",
  authDomain: "demo104-60efc.firebaseapp.com",
  databaseURL: "https://demo104-60efc.firebaseio.com",
  projectId: "demo104-60efc",
  storageBucket: "demo104-60efc.appspot.com",
  messagingSenderId: "903778168776"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig,'demo104'),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [...]
})
export class AppModule {}
```

Y listo ya con la anterior configuración conectamos Ionic con Firebase, si quieres ver el ejemplo completo con Firebase Database, puede ir aquí:

<a href="https://www.ion-book.com/blog/ionic2/firebase-database-and-ionic/" target="_blank"><amp-img width="1280" height="720" layout="responsive" src="/images/posts/ionic2/2016-08-02-firebase-database-and-ionic/cover.jpg"></amp-img></a> 
