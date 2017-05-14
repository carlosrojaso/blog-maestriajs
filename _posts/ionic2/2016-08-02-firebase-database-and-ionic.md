---
layout: post
title: "Firebase Database + Ionic"
date: 2016-08-02
tags: [firebase, demos]
categories: ionic2
laucher: "/launcher/demo104"
author: nicobytes
cover: "http://i.cubeupload.com/T62oZF.jpg"
remember: true
versions:
  - title: 'ionic'
    number: '3.2.1'
  - title: 'ionic-native'
    number: '3.7.0'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.0.0'
---

> En artículos pasados ya hemos hablado de firebase y sus [**servicios**]({{site.urlblog}}/ionic2/firebase-3){:target="_blank"} y una breve implementación con [**Ionic 2**]({{site.urlblog}}/ionic2/ionic-2-firebase-3){:target="_blank"}, ahora vamos a hacer una integración con su servicio de base de datos en tiempo real, usando la libreria de [**AngularFire2**](https://angularfire2.com/api/){:target="_blank"} creamos una simple aplicación de tareas.

<amp-img width="1920" height="1080" layout="responsive" src="http://i.cubeupload.com/T62oZF.jpg" alt="firebase-database-and-ionic-2"></amp-img>

# Actualización (14/11/2016)
<hr/>
Hemos actualizado este demo con el último release de [Ionic 2 RC 2]({{site.urlblog}}/news/ionic-2-rc-2){:target="_blank"}, que tiene la más reciente actulización.

<hr/>

# Paso 1: Creación del proyecto en Firebase.

Debes ir a la nueva consola de firebase [aquí](https://console.firebase.google.com){:target="_blank"} y crear un proyecto nuevo:

<amp-img width="999" height="572" layout="responsive" src="http://i.cubeupload.com/9FkUqS.png" alt="firebase-database-and-ionic-2"></amp-img>

# Paso 2: Copiar las variables de configuración.

Ahora debemos ir a la sección de **Auth** y copiar las variables de configuración que nos provee firebase, oprime el botón **WEB SETUP**:

<amp-img width="1015" height="573" layout="responsive" src="http://i.cubeupload.com/KpwFRs.png" alt="firebase-database-and-ionic-2"></amp-img>

# Paso 3: Reglas de seguridad

Por último vamos a la sección de Database y configuraremos las reglas de seguridad para que nos permita conectarnos a la base de datos sin ninguna autentificación:

<amp-img width="1015" height="575" layout="responsive" src="http://i.cubeupload.com/sWK679.png" alt="firebase-database-and-ionic-2"></amp-img>

# Paso 4: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2]({{site.urlblog}}/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start demo104 blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo104
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera `src`.

# Paso 5: Agregar Firebase y AngularFire2

Ahora para integrar firebase y Angularfire 2 solo se debe instalar dos dependencias en el proyecto.

```
npm install @types/request@0.0.30 --save-dev --save-exact
npm install firebase angularfire2 --save
```

# Paso 6: Crear variable de configuración

```ts
export const firebaseConfig = {
  apiKey: "AIzaSyAvYzM1bqFjoVi-VGMHeDbN0XwFsYDtLQ0",
  authDomain: "demo104-60efc.firebaseapp.com",
  databaseURL: "https://demo104-60efc.firebaseio.com",
  storageBucket: "demo104-60efc.appspot.com",
  messagingSenderId: "903778168776"
};
```

Estas las otorga firebase, creado un proyecto en [firebase.google.com](https://firebase.google.com){:target="_blank"}


# Paso 7: Conectado Ionic 2 con Firebase 3

Ahora dentro de nuestra aplicación debemos agregar los datos copiados en el **paso 2**, así conectaremos nuestra aplicación con Firebase.

```ts
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

export const firebaseConfig = {
  apiKey: "AIzaSyAvYzM1bqFjoVi-VGMHeDbN0XwFsYDtLQ0",
  authDomain: "demo104-60efc.firebaseapp.com",
  databaseURL: "https://demo104-60efc.firebaseio.com",
  storageBucket: "demo104-60efc.appspot.com",
  messagingSenderId: "903778168776"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}
```

En *la línea 3* debemos importar a `AngularFireModule`, ahora modificaremos agregamos a los imports (**línea 23**) `AngularFireModule.initializeApp(firebaseConfig)` y le enviamos la variable `firebaseConfig`.

# Paso 8: Creando el Controlador.

Ahora haremos uso del archivo `pages/home/home.ts` para mostrar las tareas, modificándolo de esta manera:

```ts
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.tasks = this.database.list('/tasks')
  }

  createTask(){
    let newTaskModal = this.alertCtrl.create({
      title: 'New Task',
      message: "Enter a title for your new task",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
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
            this.tasks.push({
              title: data.title,
              done: false
            });
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }

  updateTask( task ){
    setTimeout(()=>{
      this.tasks.update( task.$key,{
        title: task.title,
        done: task.done
      });
    },1);
  }

  removeTask( task ){
    this.tasks.remove( task );
  }
}

```

En *la línea 3* importamos `FirebaseListObservable` y  `AngularFireDatabase`, en *la línea 11* declaramos la variable `tasks` que sea de tipo FirebaseListObservable, en *la línea 16* inyectamos a AngularFireDatabase como dependencia y luego en *la línea 18* vamos a definir qué `tasks` es igual a la base de datos con la dirección `/tasks`.

En *la línea 21* declaramos el método `createTask` el cual agrega un tarea a la base de datos haciendo, mediante un alert donde con un campo de texto capturamos la tarea y luego en *la línea 41* con uso del método **push** agregamos la tarea.

En *la línea 52* declaramos el método `updateTask` el cual actualiza una tarea con el método **update**, pero a este debemos enviarle el id de la tarea con **task.$key** y los datos a actualizar.

Finalmente en *la línea 61* declaramos el método `removeTask` que elimina una tarea con el método **remove** al cual tenemos que enviarle el id de la tarea con **task.$key**.

# Paso 9: El template.

Ahora solo nos queda trabajar en el template `pages/home/home.html` que modificaremos de esta manera:

```html
{% raw %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Tasks
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="createTask()">
        <ion-icon name="add"></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item-sliding *ngFor='let task of tasks | async'>
      <ion-item>
        <ion-label>{{ task.title }}</ion-label>
        <ion-checkbox (ionChange)="updateTask( task )" [(ngModel)]="task.done"></ion-checkbox>
      </ion-item>
       <ion-item-options>
        <button ion-button danger (click)="removeTask( task )">
          Delete
        </button>
       </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</ion-content>
{% endraw %}
```

En *la línea 7* tendremos un botón que ejecuta la función `createTask`, la cual nos muestra el Alert para agregar una nueva tarea, en *la línea 16* iteramos el array de tareas, pero usaremos el pipe de **async** (`let task of tasks | async`) lo cual nos permite recorrer una lista asíncrona, en *la línea 19* tendremos el método de `updateTask` y cada vez que oprimimos check en una tarea se actualiza y finalmente en *la línea 22* tendremos el botón que ejecuta a `removeTask` para eliminar una tarea.

# Resultado:

Ahora podemos ver el resultado ejecutando:

```
ionic serve -l
```