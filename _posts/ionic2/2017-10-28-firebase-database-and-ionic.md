---
layout: post
title: "Firebase Database + Ionic"
date: 2017-10-28
tags: [firebase, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo104"
laucher: "https://demo104-60efc.firebaseapp.com/"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-28-firebase-database-and-ionic%2Fcover.jpg?alt=media&token=089d8b1e-202c-47c5-b784-5661420a0bb5"
remember: true
editname: "ionic2/2017-10-28-firebase-database-and-ionic.md"
versions:
  - title: 'ionic'
    number: '3.8.0'
  - title: 'ionic-native'
    number: '4.3.2'
  - title: 'ionic-app-scripts'
    number: '3.0.1'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.16.0'
  - title: 'angularfire2'
    number: '5.0.0-rc.3'
---

> Hemos actualizado este artículo al última versión que maneja angularfire2 con Firebase Database, sin embargo recomendamos migrar a la nueva y mejorada version de base de datos de Firebase llamada [**FireStore**](https://www.ion-book.com/blog/news/firestore/){:target="_blank"}, más adelante haremos un ejemplo usando esta nueva y optimizada base de datos.

<amp-img width="1920" height="1080" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-28-firebase-database-and-ionic%2Fcover.jpg?alt=media&token=089d8b1e-202c-47c5-b784-5661420a0bb5"></amp-img>

{% include general/net-promoter-score.html %} 

# Actualización (25/10/2017)
<hr/>

Hemos actualizado este demo con el último release [**Ionic 3.7**](https://www.ion-book.com/blog/news/ionic-3-7/){:target="_blank"}

Hemos actualizado este artículo al última versión que maneja angularfire2 con Firebase Database, sin embargo recomendamos migrar a la nueva y mejorada version de base de datos de Firebase llamada [**FireStore**](https://www.ion-book.com/blog/news/firestore/){:target="_blank"}, más adelante haremos un ejemplo usando esta nueva y optimizada base de datos.

<hr/>

<a href="https://demo104-60efc.firebaseapp.com/" target="_blank" class="btn btn-round btn-success">Ver demo</a>

Y el código en: [https://github.com/ion-book/demo104](https://github.com/ion-book/demo104){:target="_blank"}.

# Paso 1: Creación del proyecto en Firebase.

Debes ir a la nueva consola de firebase [aquí](https://console.firebase.google.com){:target="_blank"} y crear un proyecto nuevo:

<amp-img width="999" height="572" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-28-firebase-database-and-ionic%2Fscreen.png?alt=media&token=fee12b41-de98-448f-8100-1fa120d9d72d"></amp-img>

# Paso 2: Copiar las variables de configuración.

Ahora debemos ir a la sección de **Auth** y copiar las variables de configuración que nos provee firebase, oprime el botón **WEB SETUP**:

<amp-img width="1015" height="573" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-28-firebase-database-and-ionic%2Fscreen1.png?alt=media&token=8e7cf2c1-9320-4fcd-93ac-b5b22bd3e12b"></amp-img>

# Paso 3: Reglas de seguridad

Por último vamos a la sección de Database y configuraremos las reglas de seguridad para que nos permita conectarnos a la base de datos sin ninguna autentificación:

<amp-img width="1015" height="575" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-28-firebase-database-and-ionic%2Fscreen2.png?alt=media&token=6e9ed0f1-97c1-4b2c-ac68-68bc03267b4d"></amp-img>

# Paso 4: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo104 blank --cordova
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo104
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="183" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-27-camera-and-ionic%2Ftree1.png?alt=media&token=aba780c6-5554-4ee9-b912-511564e883e3"></amp-img>
  </div>
</div>

# Paso 5: Agregar Firebase y AngularFire

Ahora para integrar Firebase y AngularFire debemos instalar dos dependencias en el proyecto, así:

```
npm install angularfire2 firebase --save
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

Primero debemos importar `AngularFireList` y `AngularFireDatabase` y declarar la variable `tasks` que será de tipo `Observable` y la variable `tasksRef` la cual va a tener el control de la lista, luego inyectamos a AngularFireDatabase como dependencia y por último vamos a definir `tasks` y `tasksRef` como una colección de datos hacia `/tasks`.

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.tasksRef = this.database.list('tasks');
    this.tasks = this.tasksRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
```

Teniendo la referencia a la lista de tareas con referencia podemos crear una tarea en la base de datos, solo es necesario hacer uso del método `push` a la lista, así:

```ts
this.tasksRef.push({
  title: "Nueva tarea",
  done: false
});
```

Para actualizar una tarea necesitamos la llave de la tarea que crea Firebase y luego enviamos los datos que vamos a modificar al método `update`, así:

```ts
this.tasksRef.update(key,{
  title: 'Nuevo titulo',
  done: true
});
```

Y para eliminar una tarea tambien necesitamos la llave de la tarea y la enviamos como parametro a `remove`, así:

```ts
this.tasksRef.remove( key );
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
          this.tasksRef.push({
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
  this.tasksRef.update( task.key,{
    title: task.title,
    done: !task.done
  });
}
```

Finalmente declaramos el método `removeTask` que elimina una tarea con el método **remove** al cual tenemos que enviarle el id de la tarea con **task.$key**.

```ts
removeTask( task ){
  this.tasksRef.remove( task.key );
}
```

La clase completa quedará así:

`src/pages/home/home.ts`:

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    this.tasksRef = this.database.list('tasks');
    this.tasks = this.tasksRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
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
            this.tasksRef.push({
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
    this.tasksRef.update( task.key,{
      title: task.title,
      done: !task.done
    });
  }

  removeTask( task ){
    console.log( task );
    this.tasksRef.remove( task.key );
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
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-28-firebase-database-and-ionic%2Fresult1.jpg?alt=media&token=8bd1ec07-cba7-41a0-8046-69da09352517"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-28-firebase-database-and-ionic%2Fresult3.jpg?alt=media&token=b169f3fe-8919-4589-a198-a84f890685df"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-28-firebase-database-and-ionic%2Fresult2.jpg?alt=media&token=c42cce13-6d9f-483e-882b-124ef49c01bb"></amp-img>
  </div>
</div>
<br>