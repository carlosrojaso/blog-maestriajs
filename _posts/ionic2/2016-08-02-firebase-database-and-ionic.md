---
layout: post
title: "Firebase Database + Ionic"
date: 2017-05-13
tags: [firebase, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo104"
author: nicobytes
cover: "/images/posts/ionic2/2016-08-02-firebase-database-and-ionic/cover.jpg"
remember: true
versions:
  - title: 'ionic'
    number: '3.2.1'
  - title: 'ionic-native'
    number: '3.10.2'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.1.2'
---

> En artículos pasados ya hemos hablado de firebase y sus [**servicios**]({{site.urlblog}}/ionic2/firebase-3){:target="_blank"} y una breve implementación con [**Ionic**]({{site.urlblog}}/ionic2/ionic-2-firebase-3){:target="_blank"}, ahora vamos a hacer una integración con su servicio de base de datos en tiempo real, usando la libreria de [**AngularFire**](https://angularfire2.com/api/){:target="_blank"} creamos una simple aplicación de tareas.

<amp-img width="1920" height="1080" layout="responsive" src="/images/posts/ionic2/2016-08-02-firebase-database-and-ionic/cover.jpg" alt="firebase-database-and-ionic-2"></amp-img>

# Actualización (14/05/2017)
<hr/>

Hemos actualizado este demo con el último release de **Ionic 3**, si aún estas en alguna de las versiones anteriores puedes seguir estos pasos [de Ionic 2 a Ionic 3](https://www.ion-book.com/blog/tips/ionic-2-to-ionic3/){:target="_blank"}.

Ademas en este demo usamos la función de [**lazy loading** y **@IonicPage**](https://www.ion-book.com/blog/tips/ionic-page-and-lazy-loading/){:target="_blank"}. Puedes ver el repositorio [**Demo104**](https://github.com/ion-book/demo104){:target="_blank"}

<hr/>

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
export const firebaseConfig = {
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

# Paso 8: Creando HomePage.

Ahora haremos uso del archivo `pages/home/home.ts` para mostrar las tareas, modificándolo de esta manera:

Primero debemos importar `FirebaseListObservable` y `AngularFireDatabase` y declarar la variable `tasks` que será de tipo FirebaseListObservable, la cual va a tener el control de la lista, luego inyectamos a AngularFireDatabase como dependencia y por último vamos a definir `tasks` como una colección de datos hacia `/tasks`.

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public fireDatabase: AngularFireDatabase
  ) {
    this.tasks = this.fireDatabase.list('/tasks');
  }
}
```

Teniendo la lista de tareas con referencia a Firebase Database podemos crear una tarea en la base de datos, solo es necesario hacer uso del método `push` a la lista, así:

```ts
this.tasks.push({
  title: "Nueva tarea",
  done: false
});
```

Para actualizar una tarea necesitamos la llave de la tarea que crea Firebase y luego enviamos los datos que vamos a modificar al método `update`, así:

```ts
this.tasks.update(key,{
  title: 'Nuevo titulo',
  done: true
});
```

Y para eliminar una tarea tambien necesitamos la llave de la tarea y la enviamos como parametro a `remove`, así:

```ts
this.tasks.remove( key );
```

Vamos a hacer uso de [AlertController](https://ionicframework.com/docs/api/components/alert/AlertController/){:target="_blank"} para crear una interfaz para crear tareas.

Ahora declaramos el método `createTask` el cual agrega un tarea a la base de datos haciendo, mediante un alert donde con un campo de texto capturamos la tarea y luego con uso del método **push** agregamos la tarea.

```ts
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
```

Con declaramos el método `updateTask` el cual actualiza una tarea con el método **update**, pero a este debemos enviarle el id de la tarea con **task.$key** y los datos a actualizar.

```ts
updateTask( task ){
  this.tasks.update( task.$key,{
    title: task.title,
    done: !task.done
  });
}
```

Finalmente declaramos el método `removeTask` que elimina una tarea con el método **remove** al cual tenemos que enviarle el id de la tarea con **task.$key**.

```ts
removeTask( task ){
  this.tasks.remove( task.$key );
}
```

La clase completa quedará así:

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';

@IonicPage()
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
    this.tasks = this.database.list('/tasks');
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
    this.tasks.update( task.$key,{
      title: task.title,
      done: !task.done
    });
  }

  removeTask( task ){
    this.tasks.remove( task.$key );
  }
}
```

# Paso 9: El template.

Ahora solo nos queda trabajar en el template `pages/home/home.html` que modificaremos de esta manera:

En el header tendremos un botón que ejecuta la función `createTask`, la cual nos muestra el Alert para agregar una nueva tarea.

```html
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
```

Ahora iteramos el array de tareas, pero usaremos el pipe de **async** (`let task of tasks | async`) lo cual nos permite recorrer una lista asíncrona, tendremos el método de `updateTask` y cada vez que oprimimos check en una tarea se actualizará y finalmente tendremos el botón que ejecuta a `removeTask` para eliminar una tarea.

```html
{% raw %}
<ion-content>
  <ion-list>
    <ion-item-sliding *ngFor='let task of tasks | async'>
      <ion-item>
        <ion-label>{{ task.title }}</ion-label>
        <ion-checkbox (ionChange)="updateTask( task )" [checked]="task.done"></ion-checkbox>
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

El template completo es así:

```html
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
        <ion-checkbox (ionChange)="updateTask( task )" [checked]="task.done"></ion-checkbox>
      </ion-item>
       <ion-item-options>
        <button ion-button color="danger" (click)="removeTask( task )">
          Delete
        </button>
       </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</ion-content>
```

# Resultado:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-08-02-firebase-database-and-ionic/result1.jpg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-08-02-firebase-database-and-ionic/result3.jpg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-08-02-firebase-database-and-ionic/result2.jpg"></amp-img>
  </div>
</div>
<br>