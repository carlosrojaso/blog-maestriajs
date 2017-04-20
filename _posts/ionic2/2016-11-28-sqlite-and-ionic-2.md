---
layout: post
title: "SQLite + Ionic 2 en 6 pasos"
date: 2016-11-28
tags: [native, demos, ionic2]
categories: ionic2
repo: "https://github.com/ion-book/demo107"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo107%2FConstruye%20una%20INCREDIBLE%20app%20de%20tareas.jpg?alt=media"
remember: true
versions:
  - title: 'ionic'
    number: '2.0.0-rc.3'
  - title: 'ionic-native'
    number: '2.2.3'
---

> Anteriormente hemos hablado sobre [**firebase**]({{site.urlblog}}//ionic2/firebase-database-and-ionic-2){:target="_blank"}, [**pouch**]({{site.urlblog}}/tips/pouchdb){:target="_blank"} y [**Rest API**]({{site.urlblog}}//ionic2/rest-api-with-ionic-2){:target="_blank"} para el consumo de datos, ahora en este nuevo demo haremos la integración con **SQLite** que es una base de datos nativa que proveen los dispositivos móviles.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo107%2FConstruye%20una%20INCREDIBLE%20app%20de%20tareas.jpg?alt=media" alt="SQLite + Ionic 2 en 5 pasos"></amp-img>
## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2]({{site.urlblog}}/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start demo107 blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo107
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera *app*.


## Paso 2: Instalar SQLite al proyecto

Ahora agregamos el plugin en el proyecto:

```
ionic plugin add cordova-sqlite-storage --save
```

La documentación en ionic native la puedes ver [**aquí**](http://ionicframework.com/docs/v2/native/sqlite/){:target="_blank"} y la doc del plugin de cordova [**aquí**](https://github.com/litehelpers/Cordova-sqlite-storage){:target="_blank"}.

## Paso 3: Crear un servicio

Vamos a crear el servicio  `TasksService` que se encargará de manejar todos los datos, usaremos [**ionic generator**]({{site.urlblog}}/ionic2/ionic-generator){:target="_blank"} para crear este servicio:

```
ionic g provider tasks-service
```

En el servicio vamos a importar a **SQLite** desde ionic-native (*línea 2*) y luego creamos declaramos la variable `db` (*línea 10*) y en el constructor creamos una instancia de SQLite.

{% highlight ts linenos %}
import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class TasksService {

  db: SQLite = null;

  constructor() {
    this.db = new SQLite();
  }

}
{% endhighlight %}

Seguido a esto vamos a crear el método `openDatabase` que se encargada de abrir la base de datos y nos retorna una promesa:

{% highlight ts %}
openDatabase(){
  return this.db.openDatabase({
    name: 'data.db',
    location: 'default' // the location field is required
  });
}
{% endhighlight %}

Ahora tendremos el método `createTable` que se encargara de crear la estructura de la base de datos que queremos. En este caso haremos una tabla para gestionar tareas.

{% highlight ts %}
createTable(){
  let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
  return this.db.executeSql(sql, []);
}
{% endhighlight %}

Vamos a crear nuestro primer método funcional `getAll` el cual nos hará una consulta a la base de datos y obtiene todas las tareas que estén en la tabla y luego serán retornadas en una promesa.

{% highlight ts %}
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
}
{% endhighlight %}

Ahora con el método `create` vamos a ejecutar un **INSERT** para guardar una nueva tarea en la base de datos.

{% highlight ts %}
create(task: any){
  let sql = 'INSERT INTO tasks(title, completed) VALUES(?,?)';
  return this.db.executeSql(sql, [task.title, task.completed]);
}
{% endhighlight %}

Con el método `update` vamos a ejecutar un **UPDATE** para actualizar una tarea en la base de datos.

{% highlight ts %}
update(task: any){
  let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
  return this.db.executeSql(sql, [task.title, task.completed, task.id]);
}
{% endhighlight %}

Finalmente con el método `delete` vamos a ejecutar un **DELETE** para eliminar una tarea en la base de datos.

{% highlight ts %}
delete(task: any){
  let sql = 'DELETE FROM tasks WHERE id=?';
  return this.db.executeSql(sql, [task.id]);
}
{% endhighlight %}

En resumen todo nuestro servicio quedará así: 

{% highlight ts linenos%}
import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class TasksService {

  // public properties

  db: SQLite = null;

  constructor() {
    this.db = new SQLite();
  }

  // public methods

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
  }

  openDatabase(){
    return this.db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    });
  }

  update(task: any){
    let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

}
{% endhighlight %}

## Paso 4: El controlador

Ahora desde el controlador de la página `home.ts` vamos a implementar el servicio de `TaskService` en este controlador haremos uso de AlertController para crear tareas a partir de una Alert. Y creamos el arreglo `tasks` como vacío en *línea 12*.

{% highlight ts linenos%}
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
{% endhighlight %}

Con el método `getAllTasks` vamos a obtener todas las tareas que estén en la base de datos y en la línea 4 asignamos la respuesta al array de  `tasks`.

{% highlight ts linenos%}
getAllTasks(){
  this.tasksService.getAll()
  .then(tasks => {
    this.tasks = tasks;
  })
}
{% endhighlight %}

Para crear una nueva tarea creamos un alert con un input que capture el título de la nueva tarea luego desde la línea 21 hasta la línea 28 creamos la tarea haciendo uso de `tasksService` y la agregamos al array `tasks`. 

{% highlight ts linenos%}
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
{% endhighlight %}

Con el método `updateTask` actualizamos una tarea pero este método recibe dos parámetros el primero la tarea que vamos a actualizar y el segundo será la posición exacta en el array  `tasks`, estos parámetros serán enviados desde el template.

{% highlight ts linenos%}
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
{% endhighlight %}

Con el método `deleteTask` eliminamos una tarea y recibe los dos mismos parámetros que el método `updateTask` y cuando sea eliminada removemos la tarea del array `tasks` con un splice (línea 5)

{% highlight ts linenos%}
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
{% endhighlight %}

Finalmente el controlador de `HomePage` será así, observen que el método `getAllTasks` lo llamamos desde `ionViewDidLoad` (línea 21):

{% highlight ts linenos%}
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
{% endhighlight %}

## Paso 5: El template

En el template se encargará de llamar las funciones creadas en `HomePage` y mostrar las tareas de la base de datos.

{% highlight html linenos %}
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
{% endhighlight %}

## Paso 6: Añadir Servicio y llamar a openDatabase

En este último paso asegurate de que el servicio `TasksService` este agregado en el array de providers de `app.module.ts`:

{% highlight ts linenos%}
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TasksService } from '../providers/tasks-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TasksService
  ]
})
export class AppModule {}
{% endhighlight %}

Y cuando la app esté lista para iniciar en `app.component.ts` asegurate de llamar a `openDatabase` y crear la tabla.

{% highlight ts linenos%}
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { TasksService } from '../providers/tasks-service';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = null;

  constructor(
    public platform: Platform,
    public tasksService: TasksService
  ) {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      tasksService.openDatabase()
      .then(() => this.tasksService.createTable())
      .then(()=>{
        this.rootPage = HomePage;
      })
    });
  }
}

{% endhighlight %}

## Resultado:

<div class="row">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo107%2FScreenshot_20161128-153234.png?alt=media"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo107%2FScreenshot_20161128-153251.png?alt=media"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo107%2FScreenshot_20161128-153254.png?alt=media"></amp-img>
  </div>
</div>
<br>

**Nota:** Este demo solo funciona desde el dispositivo o emulador ya que SQLite no está disponible desde la web.