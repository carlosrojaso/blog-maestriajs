---
layout: post
title: "Firebase Database + Ionic 2"
date: 2016-08-02
tags: ionic2 firebase
categories: demos
comments: true
repo: "https://ion-book.github.io/demo104/"
author: nicobytes
cover: "http://i.cubeupload.com/T62oZF.jpg"
---

> En artículos pasados ya hemos hablado de firebase y sus [**servicios**](http://www.ion-book.com/ionic2/firebase-3){:target="_blank"} y una breve implementación con [**Ionic 2**](http://www.ion-book.com/ionic2/ionic-2-firebase-3){:target="_blank"}, ahora vamos a hacer una integración con su servicio de base de datos en tiempo real, usando la libreria de [**AngularFire2**](https://angularfire2.com/api/){:target="_blank"} creamos una simple aplicación de tareas.

<img class="img-responsive" src="http://i.cubeupload.com/T62oZF.jpg" alt="firebase-database-and-ionic-2">

# Actualización (17/08/2016)
<hr/>
Hemos actualizado este demo con el último release de [Ionic 2 Beta 11](http://www.ion-book.com/news/ionic-2-beta-11){:target="_blank"}, que tiene la más reciente actulización. Aquí está cómo se puede hacer la actualización [Steps to Upgrade](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#steps-to-upgrade-to-beta-11){:target="_blank"}.

<hr/>

# Paso 1: Creación del proyecto en Firebase.

Debes ir a la nueva consola de firebase [aquí](https://console.firebase.google.com){:target="_blank"} y crear un proyecto nuevo:

<img class="img-responsive" src="http://i.cubeupload.com/9FkUqS.png" alt="folders">

# Paso 2: Copiar las variables de configuración.

Ahora debemos ir a la sección de **Auth** y copiar las variables de configuración que nos provee firebase, oprime el botón **WEB SETUP**:

<img class="img-responsive" src="http://i.cubeupload.com/KpwFRs.png" alt="config">

# Paso 3: Reglas de seguridad

Por último vamos a la sección de Database y configuraremos las reglas de seguridad para que nos permita conectarnos a la base de datos sin ninguna autentificación:

<img class="img-responsive" src="http://i.cubeupload.com/sWK679.png" alt="rules">

# Paso 4: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2](http://www.ion-book.com/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start demo104 blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo104
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera *app*.

# Paso 5: Agregar Firebase y AngularFire2

Ahora para integrar firebase y Angularfire 2 solo se debe instalar dos dependencias en el proyecto.

```
npm install firebase --save
npm install angularfire2 --save
```

# Paso 6: Agregar typing

Ahora para que typescript reconsica a firebase y Angularfire2 debemos agregar la definición de typescript para esta librería, así que vamos al archivo de `typings/index.d.ts` y agregamos la siguiente línea:

```
/// <reference path="../node_modules/angularfire2/firebase3.d.ts" />
```

# Paso 7: Conectado Ionic 2 con Firebase 3

Ahora dentro de nuestra aplicación debemos agregar los datos copiados en el **paso 2**, así conectaremos nuestra aplicación con Firebase.

{% highlight javascript linenos %}
import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, af: AngularFire) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyAvYzM1bqFjoVi-VGMHeDbN0XwFsYDtLQ0",
    authDomain: "demo104-60efc.firebaseapp.com",
    databaseURL: "https://demo104-60efc.firebaseio.com",
    storageBucket: "demo104-60efc.appspot.com",
  }),
]);
{% endhighlight %}

En *la línea 5* debemos importar a `FIREBASE_PROVIDERS` y `defaultFirebase`, ahora modificaremos el método de `ionicBootstrap`, en *la línea 21* definimos los proveedores de Firebase como globales y desde *la línea 22 hasta la línea 27* enviamos las variables de configuración.

# Paso 8: Creando el Controlador.

Ahora haremos uso del archivo `pages/home/home.ts` para mostrar las tareas, modificándolo de esta manera:

{% highlight javascript linenos %}
import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {FirebaseListObservable, FirebaseDatabase} from 'angularfire2';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  tasks: FirebaseListObservable<any>;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private database: FirebaseDatabase
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


{% endhighlight %}

En *la línea 3* importamos `FirebaseListObservable` y  `FirebaseDatabase`, en *la línea 10* declaramos la variable `tasks` que sea de tipo FirebaseListObservable, en *la línea 14* inyectamos  a FirebaseDatabase como dependencia y luego en *la línea 16* vamos a definir qué `tasks` es igual a la base de datos con la dirección `/tasks`.

En *la línea 19* declaramos el método `createTask` el cual agrega un tarea a la base de datos haciendo, mediante un alert donde con un campo de texto capturamos la tarea y luego en *la línea 39* con uso del método **push** agregamos la tarea.

En *la línea 50* declaramos el método `updateTask` el cual actualiza una tarea con el método **update**, pero a este debemos enviarle el id de la tarea con **task.$key** y los datos a actualizar.

Finalmente en *la línea 59* declaramos el método `removeTask` que elimina una tarea con el método **remove** al cual tenemos que enviarle el id de la tarea con **task.$key**.

# Paso 9: El template.

Ahora solo nos queda trabajar en el template `pages/home/home.html` que modificaremos de esta manera:

{% highlight html linenos %}
{% raw %}
<ion-header>
  <ion-navbar primary>
    <ion-title>
      Tasks
    </ion-title>
    <ion-buttons start>
      <button (click)="createTask()">
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
        <ion-checkbox (click)="updateTask( task )" [(ngModel)]="task.done" ngDefaultControl></ion-checkbox>
      </ion-item>
       <ion-item-options>
        <button danger (click)="removeTask( task )">
          Delete
        </button>
       </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</ion-content>
{% endraw %}
{% endhighlight %}

En *la línea 7* tendremos un botón que ejecuta la función `createTask`, la cual nos muestra el Alert para agregar una nueva tarea, en *la línea 16* iteramos el array de tareas, pero usaremos el pipe de **async** (`let task of tasks | async`) lo cual nos permite recorrer una lista asíncrona, en *la línea 19* tendremos el método de `updateTask` y cada vez que oprimimos check en una tarea se actualiza y finalmente en *la línea 22* tendremos el botón que ejecuta a `removeTask` para eliminar una tarea.

# Resultado:

Ahora podemos ver el resultado ejecutando:

```
ionic serve -l
```
<br/>
<a target="_blank" href="{{ page.repo }}">
  <img class="img-responsive" src="http://i.cubeupload.com/xEo4BC.png" alt="result">
</a>

