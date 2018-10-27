---
layout: post
title: "SQLite + Ionic en 7 pasos"
keywords: "cordova-sqlite-storage, sqlite, ionic sqlite, ionic db"
date: 2017-11-02
tags: [native, demos]
categories: ionic2
repo: "https://github.com/ng-classroom/demo107"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-11-02-sqlite-and-ionic%2Fcover.jpg?alt=media&token=acb5531a-957c-4dfa-bd9d-52b94790f6f2"
remember: true
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
---

> Anteriormente hemos hablado sobre [**firebase**]({{site.urlblog}}//ionic2/firebase-database-and-ionic-2){:target="_blank"}, [**pouch**]({{site.urlblog}}/tips/pouchdb){:target="_blank"} y [**Rest API**]({{site.urlblog}}//ionic2/rest-api-with-ionic-2){:target="_blank"} para el consumo de datos, ahora en este nuevo demo haremos la integración con **SQLite** que es una base de datos nativa que proveen los dispositivos móviles.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-11-02-sqlite-and-ionic%2Fcover.jpg?alt=media&token=acb5531a-957c-4dfa-bd9d-52b94790f6f2" alt="SQLite + Ionic 2 en 5 pasos"></amp-img>

{% include general/net-promoter-score.html %} 

# Actualización (30/10/2017)
<hr/>

Hemos actualizado este demo con el último release **Ionic 3.8**.

<a href="https://github.com/ion-book/demo107" target="_blank" class="btn btn-round btn-success">Ver demo</a>
<hr/>

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic. Vamos a nuestra terminal y ejecutamos:

```
ionic start demo107 blank --cordova
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo107
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera **src**.

## Paso 2: Instalar SQLite al proyecto

Ahora agregamos el plugin de **cordova-sqlite-storage** y el provider de **sqlite** en el proyecto:

```
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic-native/sqlite
```

La documentación en ionic native la puedes ver [**aquí**](https://ionicframework.com/docs/native/sqlite/){:target="_blank"} y la documentación del plugin de cordova [**aquí**](https://github.com/litehelpers/Cordova-sqlite-storage){:target="_blank"}.

Recuerda que debes agregar el provider de sqlite en `app.module.ts`, así:

```ts
...
import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

## Paso 3: Abrir una base de datos

Ahora desde el archivo `app.component.ts`, vamos a crear una base de datos para la aplicación, por eso debemos inyectar como dependencia a *SQLite* en el constructor, así:

```ts
import { SQLite } from '@ionic-native/sqlite';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: string = 'HomePage';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public sqlite: SQLite
  ) {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });
  }
  ....
}
```

Seguido a esto vamos a crear el método `createDatabase` que se encargada de crear una base de datos para la aplicación:

```ts
private createDatabase(){
  this.sqlite.create({
    name: 'data.db',
    location: 'default' // the location field is required
  })
  .then((db) => {
    console.log(db);
  })
  .catch(error =>{
    console.error(error);
  });
}
```

Como resultado tendremos la instancia de la base de datos con la que podremos ejecutar consultas, el método `createDatabase` debemos llamarlo dentro de `this.platform.ready`:

```ts
...
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: string = 'HomePage';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public sqlite: SQLite
  ) {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.createDatabase();
    });
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      console.log(db);
    })
    .catch(error =>{
      console.error(error);
    });
  }
}
```

## Paso 4: Crear un servicio

Vamos a crear el servicio `TasksService` que se encargará de manejar todos los datos, usaremos [**ionic generator**]({{site.urlblog}}/ionic2/ionic-generator){:target="_blank"} para crear este servicio:

```
ionic g provider tasks-service
```

Recuerda que debemos agregar nuestro servicio al array de `providers` en `app.module.ts`:

```ts
...
import { TasksService } from '../providers/tasks-service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    TasksService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```


En el servicio vamos a importar a **SQLiteObject** desde ionic-native (*línea 2*) y luego declaramos el método `setDatabase` (*línea 11*) para guadar la instancia de SQLiteObject.

```ts
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class TasksService {

  db: SQLiteObject = null;

  constructor() {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

}
```

Ahora declaramos el método `createTable` que se encargara de crear la estructura de la base de datos que queremos. En este caso haremos una tabla para gestionar tareas.

```ts
createTable(){
  let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
  return this.db.executeSql(sql, []);
}
```

Ahora declaramos el método `getAll` el cual nos hará una consulta a la base de datos y obtiene todas las tareas que estén en la tabla y luego serán retornadas en una promesa.

```ts
getAll(){
  let sql = 'SELECT * FROM tasks';
  return this.db.executeSql(sql, [])
  .then(response => {
    let tasks = [];
    for (let index = 0; index < response.rows.length; index++) {
      tasks.push( response.rows.item(index) );
    }
    return Promise.resolve( tasks );
  })
  .catch(error => Promise.reject(error));
}
```

Ahora con el método `create` vamos a ejecutar un **INSERT** para guardar una nueva tarea en la base de datos.

```ts
create(task: any){
  let sql = 'INSERT INTO tasks(title, completed) VALUES(?,?)';
  return this.db.executeSql(sql, [task.title, task.completed]);
}
```

Con el método `update` vamos a ejecutar un **UPDATE** para actualizar una tarea en la base de datos.

```ts
update(task: any){
  let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
  return this.db.executeSql(sql, [task.title, task.completed, task.id]);
}
```

Finalmente con el método `delete` vamos a ejecutar un **DELETE** para eliminar una tarea en la base de datos.

```ts
delete(task: any){
  let sql = 'DELETE FROM tasks WHERE id=?';
  return this.db.executeSql(sql, [task.id]);
}
```

En resumen todo nuestro servicio quedará así: 

```ts
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class TasksService {

  // public properties

  db: SQLiteObject = null;

  constructor() {}

  // public methods

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  create(task: any){
    let sql = 'INSERT INTO tasks(title, completed) VALUES(?,?)';
    return this.db.executeSql(sql, [task.title, task.completed]);
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
    return this.db.executeSql(sql, []);
  }

  delete(task: any){
    let sql = 'DELETE FROM tasks WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }

  getAll(){
    let sql = 'SELECT * FROM tasks';
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }

  update(task: any){
    let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

}
```

{% include blog/adIonic.html %}

## Paso 5: Añadir Servicio y llamar a setDatabase

Ahora vamos a inyectar como dependencia a `TasksService` en `app.component.ts` y en el método `createDatabase` luego de obtener la instancia de la base de datos vamos a ejecutar el metodo `setDatabase` y crear la tabla:

```ts
import { TasksService } from '../providers/tasks-service';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: string = null;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public tasksService: TasksService,
    public sqlite: SQLite
  ) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.createDatabase();
    });
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      this.tasksService.setDatabase(db);
      return this.tasksService.createTable();
    })
    .then(() =>{
      this.splashScreen.hide();
      this.rootPage = 'HomePage';
    })
    .catch(error =>{
      console.error(error);
    });
  }
}
```

## Paso 6: El controlador

Ahora desde el controlador de la página `home.ts` vamos a implementar el servicio de `TaskService` en este controlador haremos uso de AlertController para crear tareas a partir de una Alert. Y creamos el arreglo `tasks` como vacío en *línea 12*.

```ts
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { TasksService } from '../../providers/tasks-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: any[] = [];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public tasksService: TasksService
  ) {}
}
```

Con el método `getAllTasks` vamos a obtener todas las tareas que estén en la base de datos y en la línea 4 asignamos la respuesta al array de  `tasks`.

```ts
getAllTasks(){
  this.tasksService.getAll()
  .then(tasks => {
    this.tasks = tasks;
  })
  .catch( error => {
    console.error( error );
  });
}
```

Para crear una nueva tarea creamos un alert con un input que capture el título de la nueva tarea luego desde la línea 21 hasta la línea 28 creamos la tarea haciendo uso de `tasksService` y la agregamos al array `tasks`. 

```ts
openAlertNewTask(){
  let alert = this.alertCtrl.create({
    title: 'Crear tarea',
    message: 'escribe el nombre de la tarea',
    inputs: [
      {
        name: 'title',
        placeholder: 'Digitar nueva tarea.',
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: () =>{
          console.log('cancelar');
        }
      },
      {
        text: 'Crear',
        handler: (data)=>{ 
          data.completed = false;
          this.tasksService.create(data)
          .then(response => {
            this.tasks.unshift( data );
          })
          .catch( error => {
            console.error( error );
          })
        }
      }
    ]
  });
  alert.present();
}
```

Con el método `updateTask` actualizamos una tarea pero este método recibe dos parámetros el primero la tarea que vamos a actualizar y el segundo será la posición exacta en el array  `tasks`, estos parámetros serán enviados desde el template.

```ts
updateTask(task, index){
  task = Object.assign({}, task);
  task.completed = !task.completed;
  this.tasksService.update(task)
  .then( response => {
    this.tasks[index] = task;
  })
  .catch( error => {
    console.error( error );
  })
}
```

Con el método `deleteTask` eliminamos una tarea y recibe los dos mismos parámetros que el método `updateTask` y cuando sea eliminada removemos la tarea del array `tasks` con un splice (línea 5)

```ts
deleteTask(task: any, index){
  this.tasksService.delete(task)
  .then(response => {
    console.log( response );
    this.tasks.splice(index, 1);
  })
  .catch( error => {
    console.error( error );
  })
}
```

Finalmente el controlador de `HomePage` será así, observen que el método `getAllTasks` lo llamamos desde `ionViewDidLoad` (línea 21):

```ts
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { TasksService } from '../../providers/tasks-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{

  tasks: any[] = [];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public tasksService: TasksService
  ) {}

  ionViewDidLoad(){
    this.getAllTasks();
  }

  deleteTask(task: any, index){
    this.tasksService.delete(task)
    .then(response => {
      console.log( response );
      this.tasks.splice(index, 1);
    })
    .catch( error => {
      console.error( error );
    })
  }

  getAllTasks(){
    this.tasksService.getAll()
    .then(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    })
    .catch( error => {
      console.error( error );
    });
  }

  openAlertNewTask(){
    let alert = this.alertCtrl.create({
      title: 'Crear tarea',
      message: 'escribe el nombre de la tarea',
      inputs: [
        {
          name: 'title',
          placeholder: 'Digitar nueva tarea.',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{ 
            data.completed = false;
            this.tasksService.create(data)
            .then(response => {
              this.tasks.unshift( data );
            })
            .catch( error => {
              console.error( error );
            })
          }
        }
      ]
    });
    alert.present();
  }

  updateTask(task, index){
    task = Object.assign({}, task);
    task.completed = !task.completed;
    this.tasksService.update(task)
    .then( response => {
      this.tasks[index] = task;
    })
    .catch( error => {
      console.error( error );
    })
  }

}
```

## Paso 7: El template

En el template se encargará de llamar las funciones creadas en `HomePage` y mostrar las tareas de la base de datos.

```html
{% raw %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Tasks</ion-title>
    <ion-buttons right>
      <button ion-button icon-only (click)="openAlertNewTask()">
        <ion-icon name="add"></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
</ion-header>

<ion-content>
   <ion-list>
     <ion-item *ngIf="tasks.length == 0"> 
       Empty
     </ion-item>
    <ion-item-sliding *ngFor="let task of tasks; let i = index">
      <ion-item >
        <ion-label>{{ task.title }}</ion-label>
        <ion-checkbox (ionChange)="updateTask( task, i )" [checked]="task.completed"></ion-checkbox>
      </ion-item>
      <ion-item-options side="right" icon-left>
        <button ion-button color="danger" (click)="deleteTask(task, i)">
          <ion-icon name="trash"></ion-icon>
          Delete
        </button>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</ion-content>
{% endraw %}
```

## Resultado:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-11-02-sqlite-and-ionic%2Fscreen1.png?alt=media&token=9fe8dfb0-73fa-49c0-a4ce-11b98f4f9148"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-11-02-sqlite-and-ionic%2Fscreen2.png?alt=media&token=4d639f34-b1b9-4113-8bae-5fca37d4943c"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-11-02-sqlite-and-ionic%2Fscreen3.png?alt=media&token=fe1c0d73-9eef-4f34-a1a2-1c337f628e6b"></amp-img>
  </div>
</div>
<br>

**Nota:** Este demo solo funciona desde el dispositivo o emulador ya que SQLite no está disponible desde la web.