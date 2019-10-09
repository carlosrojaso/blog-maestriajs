---
layout: post
title: "Angular Material + Appsync."
keywords: "AWS Appsync, Angular, Material"
date: 2019-10-09
tags: [angular]
categories: angular
author: carlosrojas
repo: https://github.com/carlosrojaso/graphqlappsync
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-09-30-angular-material-appsync%2Fcover.png?alt=media&token=a8dc5ef9-8864-4060-bdd6-f2f31dfec04d"
editname: "angular/2019-09-30-angular-material-appsync.md"
versions:
  - title: 'Angular Material'
    number: '8.1.3'
  - title: 'aws-amplify'
    number: '1.1.36'
---

> Material Design es un lenguaje de diseño que fue desarrollado por Google en 2014 y ya se ha convertido en una metafora para Apps movíles en Android y en muchos sitios Web. Angular Material nos ayuda a implementar sus lineamientos en nuestras Apps. 

<!--summary-->

<amp-img width="820" height="312" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-09-30-angular-material-appsync%2Fcover.png?alt=media&token=a8dc5ef9-8864-4060-bdd6-f2f31dfec04d"></amp-img>

{% include general/net-promoter-score.html %}

## ¿ Que es Angular Material ?

`Angular Material` es una colección de componentes con el aspecto y el comportamiento definido en `Material Design` el cual podemos utilizar en nuestras Apps facilmente en Angular.

## ¿ Que es AWS Appsync ?

`AWS Appsync` es una solución de Amazon que te permite crear APIs facilmente los cuales vienen listos para soportar `GraphQL`.

Este servicio te permite crear una cuenta gratis [acá](https://aws.amazon.com/appsync/).

## ¿ Que es Amplify CLI ?

Es la herramienta de comandos que podemos instalar en nuestros computadores para poder integrar facilmente nuestras Apps Web y Moviles con los AWS Services.

Para instalarlo, Nos vamos a ubicar en la raiz de nuestro proyecto y ejecutar en una terminal:

````
$ npm install -g @aws-amplify/cli
````

A partir de acá deberas seguir los pasos para saber como implementar un servicio que tome los datos desde [AppSync](https://blog.ng-classroom.com/blog/angular/angular-aws-appsync-graphql/).

Debemos utilizar el siguiente Schema:

````
input CreateTodoInput {
	id: ID
	name: String!
	description: String
}

input DeleteTodoInput {
	id: ID
}

input ModelBooleanFilterInput {
	ne: Boolean
	eq: Boolean
}

input ModelFloatFilterInput {
	ne: Float
	eq: Float
	le: Float
	lt: Float
	ge: Float
	gt: Float
	contains: Float
	notContains: Float
	between: [Float]
}

input ModelIDFilterInput {
	ne: ID
	eq: ID
	le: ID
	lt: ID
	ge: ID
	gt: ID
	contains: ID
	notContains: ID
	between: [ID]
	beginsWith: ID
}

input ModelIntFilterInput {
	ne: Int
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
	contains: Int
	notContains: Int
	between: [Int]
}

enum ModelSortDirection {
	ASC
	DESC
}

input ModelStringFilterInput {
	ne: String
	eq: String
	le: String
	lt: String
	ge: String
	gt: String
	contains: String
	notContains: String
	between: [String]
	beginsWith: String
}

type ModelTodoConnection {
	items: [Todo]
	nextToken: String
}

input ModelTodoFilterInput {
	id: ModelIDFilterInput
	name: ModelStringFilterInput
	description: ModelStringFilterInput
	and: [ModelTodoFilterInput]
	or: [ModelTodoFilterInput]
	not: ModelTodoFilterInput
}

type Mutation {
	createTodo(input: CreateTodoInput!): Todo
	updateTodo(input: UpdateTodoInput!): Todo
	deleteTodo(input: DeleteTodoInput!): Todo
}

type Query {
	getTodo(id: ID!): Todo
	listTodos(filter: ModelTodoFilterInput, limit: Int, nextToken: String): ModelTodoConnection
}

type Subscription {
	onCreateTodo: Todo
		@aws_subscribe(mutations: ["createTodo"])
	onUpdateTodo: Todo
		@aws_subscribe(mutations: ["updateTodo"])
	onDeleteTodo: Todo
		@aws_subscribe(mutations: ["deleteTodo"])
}

type Todo {
	id: ID!
	name: String!
	description: String
}

input UpdateTodoInput {
	id: ID!
	name: String
	description: String
}
````

Posiblemente despues de actualizar el Schema en `AWS Appsync` vas a tener que ejecutar

````
$amplify codegen
````

en tu proyecto de Angular para que se actualicen los documentos de GraphQL en tu App.

{% include blog/subscribe.html %}

## Implementando Material en Angular

Lo primero es desde un proyecto en Angular, ejecutar:

````
$ ng add @angular/material
````

Con esto el Angular CLI agregara todo lo necesario. Ahora tenemos que agregar

```ts

...

import { APIService } from './API.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
...
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [APIService],
  bootstrap: [AppComponent],
...
})
export class AppModule { }
```

Con esto ya tenemos algunos componentes de Material que vamos a utilizar ademas de estar usando el `APIService` que `Amplify CLI` crea por nosotros.

Luego, vamos a crear un nuevo componente `TodoDialog` el cual vamos a utilizar para agregar nuevos items.

````
$ ng generate component TodoDialog 
````

y vamos a agregar lo siguiente en su template

```html
{%raw%}
<h2 mat-dialog-title>{{description}}</h2>


<mat-dialog-content [formGroup]="form">
    <mat-form-field>
        <input matInput
                placeholder="Task Name"
               formControlName="name">
    </mat-form-field>

    <mat-form-field>
        <textarea matInput placeholder="Description"
            formControlName="description">
        </textarea>
    </mat-form-field>
</mat-dialog-content>

<mat-dialog-actions>

    <button class="mat-raised-button"
            (click)="close()">
        Close
    </button>

    <button class="mat-raised-button mat-primary"
            (click)="save()">
        Save
    </button>

</mat-dialog-actions>
{%endraw%}
```

y en el controlador

```ts
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent {

  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) {id, name, description}: any) {
    this.description = description;

    this.form = fb.group({
      id: [id],
      name: [name, Validators.required],
      description: [description, Validators.required]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
```

Con esto tendremos un `dialog` que nos permitira agregar tareas.

Ahora, modificaremos nuestro `app.component.html`

```html
{%raw%}
<mat-toolbar color="primary">
  <mat-toolbar-row>
    <span>ngNotesApp</span>
  </mat-toolbar-row>
</mat-toolbar>
<mat-card *ngFor="let item of notes" class="example-card">
  <mat-card-header>
    <mat-card-title>{{ item.name }}</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>
      {{ item.description }}
    </p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button (click)="deleteNote(item.id)">DELETE</button>
    <button mat-button (click)="openDialog(item)">EDIT</button>
  </mat-card-actions>
</mat-card>
<button mat-fab (click)="openDialog()" class="md-fab-bottom-right">+</button>
<router-outlet></router-outlet>
{%endraw%}
```

y el controlador

```ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { APIService, CreateTodoInput, DeleteTodoInput, UpdateTodoInput } from './API.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'graphqlappsync';
  notes: Array<CreateTodoInput> = [];

  constructor( private apiService: APIService, private cd: ChangeDetectorRef, private dialog: MatDialog) {
    this.updateNotesList();
  }

  save(newItem: CreateTodoInput) {
    this.apiService.CreateTodo(newItem).then(
      (resolve) => {
        this.updateNotesList();
      }
    ).catch(
      (error) => {
        console.log('error >>>', error);
      }
    );
  }

  deleteNote(itemId: string) {
    const itemToDelete: DeleteTodoInput = {
      id: itemId
    };

    this.apiService.DeleteTodo(itemToDelete).then(
      (resolve) => {
        this.updateNotesList();
      }
    ).catch(
      (error) => {
        console.log('error >>>', error);
      }
    );
  }

  updateNote(itemToUpdate: any) {
    this.apiService.UpdateTodo(itemToUpdate).then(
      (resolve) => {
        this.updateNotesList();
      }
    ).catch(
      (error) => {
        console.log('error >>>', error);
      }
    );
  }

  updateNotesList() {
    this.notes = [];
    this.apiService.ListTodos().then(
      (resolve) => {
        resolve.items.forEach(
          (item) => {
            this.notes.push(item);
          }
        );
        this.cd.detectChanges();
      }
    ).catch(
      (error) => {
        console.log('error >>>', error);
      }
    );
  }

  openDialog(item?: UpdateTodoInput) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
        id: '',
        name: '',
        description: ''
    };

    if (item) {
      dialogConfig.data = {
        id: item.id,
        name: item.name,
        description: item.description
      };
    }

    const dialogRef = this.dialog.open(TodoDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        (data) => {
          if (data) {
            const newItem: CreateTodoInput = {
              name: data.name,
              description: data.description
            };

            if (item) {
              this.updateNote(data);
            } else {
              this.save(newItem);
            }
          }
        }
    );
  }
}
```

Y con esto ya deberiamos poder ingresar data nueva a nuestro proyecto en `AWS Appsync`.

<amp-img width="1050" height="611" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-09-30-angular-material-appsync%2FScreen%20Shot%202019-10-09%20at%207.22.32%20AM.png?alt=media&token=75b6ef26-b925-467c-a178-41cb9109b740"></amp-img>

Bueno eso es todo por ahora. Espero sea de utilidad :)