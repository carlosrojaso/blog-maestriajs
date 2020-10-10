---
layout: post
title: "Offline con AWS Appsync."
keywords: "AWS Appsync, Angular, GraphQL, Offline"
date: 2020-03-09
tags: [angular]
categories: angular
author: carlosrojas
repo: https://github.com/carlosrojaso/maestriajs-angular-app/tree/amplify
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-03-09-angular-aws-appsync%2Fcover.png?alt=media&token=0866cff1-cabd-4d2d-9dc9-d5796b1fd9eb"
editname: "angular/2020-03-02-angular-aws-appsync-datastore.md"
versions:
  - title: 'angular/core'
    number: '9.0.0'
---

> Ya vimos una solución `offline` que podemos lograr con `AWS amplify datastore` la cual nos brinda una forma rapida de agregar esta caracteristica a nuestra App, existe otra opción la cual es una libreria que es desarrollada por el equipo de `AWS Appsync` que nos permite integrar `offline` en nuestras apps en `JavaScript` a través de `Mutations` que es una caracteristica de `GraphQL` por lo cual debes conocer esta tecnologia, pero en este articulo miraremos como agregarla a nuestro proyecto.

<!--summary-->

<img width="810" height="450" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-03-09-angular-aws-appsync%2Fcover.png?alt=media&token=0866cff1-cabd-4d2d-9dc9-d5796b1fd9eb">



## ¿ Que es AWS Appsync ?

`AWS Appsync` es una solución de Amazon que te permite crear APIs facilmente los cuales vienen listos para soportar `GraphQL`.

Este servicio te permite crear una cuenta gratis [acá](https://aws.amazon.com/appsync/).

## ¿ Que es AWS Appsync JavaScript SDK ?

Es una libreria desarrollada para JavaScript (Aunque también se encuentra disponible para iOS y Android)

## Implementando AWS Appsync en Angular

Para implementar esta libreria en un proyecto de Angular vamos a utilizar una app de `Notas` que hemos preparado para la ocasión.

````
$git clone https://github.com/carlosrojaso/maestriajs-angular-app.git
$git checkout appsync
$npm install
````

En la rama `appsync` esta el ejemplo terminado para referencia.

Luego, vamos a empezar a conectar nuestra App con Amazon.

````
$ amplify init
````



En este paso no entrare en detalle porque tenemos este [Post](https://blog.ng-classroom.com/blog/angular/angular-aws-appsync-graphql/) donde te puedes guiar, lo unico es que debes crear un esquema nuevo para tu implementación y desde el `CLI` seleccionar el esquema de ejemplo de `Todos` el cual te permitira agregar listas de tareas. Deberias ver en tu consola algo como esto en el `schema`.

````
input CreateTodoInput {
	id: ID
	name: String!
	description: String
	_version: Int
}

input DeleteTodoInput {
	id: ID
	_version: Int
}

enum ModelAttributeTypes {
	binary
	binarySet
	bool
	list
	map
	number
	numberSet
	string
	stringSet
	_null
}

input ModelBooleanInput {
	ne: Boolean
	eq: Boolean
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
}

input ModelFloatInput {
	ne: Float
	eq: Float
	le: Float
	lt: Float
	ge: Float
	gt: Float
	between: [Float]
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
}

input ModelIDInput {
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
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
	size: ModelSizeInput
}

input ModelIntInput {
	ne: Int
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
	between: [Int]
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
}

input ModelSizeInput {
	ne: Int
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
	between: [Int]
}

enum ModelSortDirection {
	ASC
	DESC
}

input ModelStringInput {
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
	attributeExists: Boolean
	attributeType: ModelAttributeTypes
	size: ModelSizeInput
}

input ModelTodoConditionInput {
	name: ModelStringInput
	description: ModelStringInput
	and: [ModelTodoConditionInput]
	or: [ModelTodoConditionInput]
	not: ModelTodoConditionInput
}

type ModelTodoConnection {
	items: [Todo]
	nextToken: String
	startedAt: AWSTimestamp
}

input ModelTodoFilterInput {
	id: ModelIDInput
	name: ModelStringInput
	description: ModelStringInput
	and: [ModelTodoFilterInput]
	or: [ModelTodoFilterInput]
	not: ModelTodoFilterInput
}

type Mutation {
	createTodo(input: CreateTodoInput!, condition: ModelTodoConditionInput): Todo
	updateTodo(input: UpdateTodoInput!, condition: ModelTodoConditionInput): Todo
	deleteTodo(input: DeleteTodoInput!, condition: ModelTodoConditionInput): Todo
}

type Query {
	syncTodos(
		filter: ModelTodoFilterInput,
		limit: Int,
		nextToken: String,
		lastSync: AWSTimestamp
	): ModelTodoConnection
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
	_version: Int!
	_deleted: Boolean
	_lastChangedAt: AWSTimestamp!
}

input UpdateTodoInput {
	id: ID!
	name: String
	description: String
	_version: Int
}
````

Si ya tienes el `schema` en un proyecto existente el comando:

````
$ amplify add codegen --apiId xxxxxxx
````

Te generara la carpeta `src/graphql` con los archivos necesarios para implementar `graphql`. el id `xxxxxxxx` lo puedes ver desde tu API en la consola de amazon.

Una vez tengamos todo conectado vamos a proceder a implementar `appsync` para esto deberemos instalar un par de dependencia adicionales.

````
$npm install --save aws-appsync
````

Algo importante a tener en cuenta es que 


Lo primero que haremos es crear un servicio al que llamaremos `appsync`.

````
$ng generate service appsync
````

y nos debera crear un archivo en `src/appsync.service.ts` donde crearemos lo siguiente:

```ts
import { Injectable } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import awsmobile from '../aws-exports';

@Injectable({
  providedIn: 'root'
})
export class AppsyncService {

  hydrac;

  constructor() {
    const client = new AWSAppSyncClient({
      url: awsmobile.aws_appsync_graphqlEndpoint,
      region: awsmobile.aws_appsync_region,
      auth: {
        type: 'API_KEY',
        apiKey: awsmobile.aws_appsync_apiKey
      }
    });
    this.hydrac = client;
 }

 hc() {
  return this.hydrac.hydrated();
 }
}
```

En este servicio basicamente nos estamos conectando al cliente de Amazon que nos permitira interactuar con nuestra `Api`, y tenemos un metodo para `hidratar` nuestra referencia. 

Ahora, nos ubicaremos donde se encuentra nuestro componente principal `src/app/dashboard/dashboard.component.ts` e inyectaremos el cliente y lo utilizarmos para `obtener`, `escribir`, `actualizar` y `borrar` información.

## Obtener datos.

Para obtener nuestra lista de notas, cambiaremos el metodo `getTasks()` por `loadTasks()` para hacer un `query` y obtener la info desde `AWS`.

```ts
async loadTasks() {
    const client = await this.appsyncService.hc();

    const options = {
      query: gql(listTodos),
      fetchPolicy: 'cache-and-network'
    };

    return client.watchQuery(options);
  }
```

Luego nos podremos subscribir a lo que retorna este metodo y obtener la información de las notas.

## Guardar datos.

Para guardar datos vamos a mejorar el metodo `save()` para que realice una operacion optimista y usando el `cache()` de Apollo realice la operación a nivel local.

```ts
async save() {
    const client = await this.appsyncService.hc();

    const dialogRef = this.dialog.open(FormDialogComponent);
    dialogRef.afterClosed().subscribe(
      async (response) => {
        if (response) {
          const newIndex = uuidv4();
          response.id = newIndex;

          const result = await client.mutate({
            mutation: gql(createMutation),
            variables: {
              input: response
            },
            optimisticResponse: () => ({
              createTodo: {
                __typename: '',
                id: response.id,
                name: response.name,
                description: response.description,
              }
            }),
            update: (cache, { data: { createTodo } }) => {
              const query = gql(listTodos);

              // Read query from cache
              const data = cache.readQuery({ query });

              // Add newly created item to the cache copy
              data.listTodos.items = [
                ...data.listTodos.items.filter(item => item.id !== createTodo.id),
                createTodo
              ];

              // Overwrite the cache with the new results
              cache.writeQuery({ query, data });
            }
          });

          if (result) {
            console.log(result);
          }
        }
    });
  }
```

Este metodo puede parecer un poco complejo, pero basicamente lo importante a entender es que en `update` realizamos las operaciones locales como si la operación hubiese sido exitosa.

## Editar datos.

Para editar datos vamos a mejorar el metodo `edit()` usando una respuesta optimista muy parecido al de guardar, pero fijate en el `update` que en lugar de agregar un item a la notas va a reemplazar el que le hemos enviado usando el `id`.

```ts
async edit(task) {
    const client = await this.appsyncService.hc();

    const dialogRef = this.dialog.open(FormDialogComponent, { data: task });
    dialogRef.afterClosed().subscribe(
      async (response) => {
        if (response) {
          const result =  await client.mutate({
            mutation: gql(updateMutation),
            variables: {
              input: {
                id: task.id,
                name: task.name,
                description: task.description,
              }
            },
            optimisticResponse: () => ({
              updateTodo: {
                __typename: '', // This type must match the return type of the query below (listTodos)
                id: task.id,
                name: task.name,
                description: task.description
              }
            }),
            update: (cache, { data: { updateTodo } }) => {
              const query = gql(listTodos);

              // Read query from cache
              const data = cache.readQuery({ query });

              const objIndex = data.listTodos.items.findIndex((obj => obj.id === updateTodo.id));

              data.listTodos.items[objIndex].name = updateTodo.name;
              data.listTodos.items[objIndex].description = updateTodo.description;

              // Overwrite the cache with the new results
              cache.writeQuery({ query, data });
            }
          });

          if (result) {
            console.log(result);
          }
        }
    });
  }
```

## Borrar datos.

Para borrar una nota deberemos mejoraremos el metodo `delete()`, la implementación de este metodo quedaria asi:

```ts
async delete(task) {
    const client = await this.appsyncService.hc();

    const result = await client.mutate({
      mutation: gql(deleteMutation),
      variables: {
        input: {
          id: task.id
        }
      },
      optimisticResponse: () => ({
        deleteTodo: {
          __typename: '', // This type must match the return type of the query below (listTodos)
          id: task.id,
          name: task.name,
          description: task.description
        }
      }),
      update: (cache, { data: { deleteTodo } }) => {
        const query = gql(listTodos);

        // Read query from cache
        const data = cache.readQuery({ query });

        // Remove item to the cache copy
        data.listTodos.items = [...data.listTodos.items.filter(item => item.id !== deleteTodo.id)];

        // Overwrite the cache with the new results
        cache.writeQuery({ query, data });
      }
    });
  }
```

Es muy parecido a los anteriores pero en el `update` simplemente estamos escribiendo el arreglo de notas sin el elemento que queremos borrar.

## Subscripciones.

Si queremos que los cambios se reflejen en todos los clientes automaticamente debemos utilizar las subscripciones para avisar a cada app abierta que hubo un cambio para esto debemos crear varias subscripciones `loadTaskSubscriber()`, `loadOnCreateSubscriber()`, `loadOnDeleteSubscriber()`, y `loadOnUpdateSubscriber()`. Cada uno de estas subcripciones va a estar escuchando por algun cambio en `Appsync` para informarlo a todos los clientes. Su implementacion se veria asi.

```ts
async loadTaskSubscriber() {
    this.listTasksSubscriber = await this.loadTasks();
    this.listTasksSubscriber.subscribe(
      ({data}) => {
        if (data && data.hasOwnProperty('listTodos')) {
          this.tasks = data.listTodos.items;
        }
      },
      (err: any) => {
        console.warn(err);
      }
    );
  }
```

Va a estar escuchando si hay nuevos items que cargar.

```ts
async onCreateListener() {
    const client = await this.appsyncService.hc();
    return client.subscribe({query: gql(onCreateTodo)});
  }
```

Va a estar escuchando si alguno de los clientes creo un item.

```ts
async onDeleteListener() {
    const client = await this.appsyncService.hc();
    return client.subscribe({query: gql(onDeleteTodo)});
  }
```

Va a estar escuchando si alguno de los clientes borro un item.

```ts
async onUpdateListener() {
    const client = await this.appsyncService.hc();
    return client.subscribe({query: gql(onUpdateTodo)});
  }
```

Va a estar escuchando si alguno de los clientes edito un item.


Con esto ya tendremos todas las piezas que debemos agregar y podremos tener offline sin preocuparnos por varias cosas que `appsync` hace por nosotros.

Puedes ver el codigo completo del `src/app/dashboard/dashboard.component.ts` se veria.

```ts
// tslint:disable: no-shadowed-variable
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppsyncService } from '../appsync.service';

import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

import uuidv4 from 'uuid/v4';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

import { listTodos } from '../../graphql/queries';
import { createTodo as createMutation, updateTodo as updateMutation, deleteTodo as deleteMutation } from '../../graphql/mutations';
import { merge, fromEvent, Observable, Observer } from 'rxjs';
import { onCreateTodo, onDeleteTodo, onUpdateTodo } from '../../graphql/subscriptions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasks: any;
  listTasksSubscriber;
  connectionStatus = 'offline';
  subsCreate: any;
  subsDelete: any;
  subsUpdate: any;
  title = 'angular-app';

  constructor(
    private appsyncService: AppsyncService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.loadTaskSubscriber();

    this.detectOnline().subscribe( async isOnline => {
      if (isOnline) {
        this.connectionStatus = 'online';
        await this.loadOnCreateSubscriber();
        await this.loadOnDeleteSubscriber();
        await this.loadOnUpdateSubscriber();
      } else {
        this.connectionStatus = 'offline';
      }
    });
  }

  ngOnDestroy() {
    (this.listTasksSubscriber && this.listTasksSubscriber.unsubscribe())();
    (this.subsCreate && this.subsCreate.unsubscribe())();
    (this.subsDelete && this.subsDelete.unsubscribe())();
    (this.subsUpdate && this.subsUpdate.unsubscribe())();
  }

  async delete(task) {
    const client = await this.appsyncService.hc();

    const result = await client.mutate({
      mutation: gql(deleteMutation),
      variables: {
        input: {
          id: task.id
        }
      },
      optimisticResponse: () => ({
        deleteTodo: {
          __typename: '', // This type must match the return type of the query below (listTodos)
          id: task.id,
          name: task.name,
          description: task.description
        }
      }),
      update: (cache, { data: { deleteTodo } }) => {
        const query = gql(listTodos);

        // Read query from cache
        const data = cache.readQuery({ query });

        // Remove item to the cache copy
        data.listTodos.items = [...data.listTodos.items.filter(item => item.id !== deleteTodo.id)];

        // Overwrite the cache with the new results
        cache.writeQuery({ query, data });
      }
    });
  }

  detectOnline() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

  async edit(task) {
    const client = await this.appsyncService.hc();

    const dialogRef = this.dialog.open(FormDialogComponent, { data: task });
    dialogRef.afterClosed().subscribe(
      async (response) => {
        if (response) {
          const result =  await client.mutate({
            mutation: gql(updateMutation),
            variables: {
              input: {
                id: task.id,
                name: task.name,
                description: task.description,
              }
            },
            optimisticResponse: () => ({
              updateTodo: {
                __typename: '', // This type must match the return type of the query below (listTodos)
                id: task.id,
                name: task.name,
                description: task.description
              }
            }),
            update: (cache, { data: { updateTodo } }) => {
              const query = gql(listTodos);

              // Read query from cache
              const data = cache.readQuery({ query });

              const objIndex = data.listTodos.items.findIndex((obj => obj.id === updateTodo.id));

              data.listTodos.items[objIndex].name = updateTodo.name;
              data.listTodos.items[objIndex].description = updateTodo.description;

              // Overwrite the cache with the new results
              cache.writeQuery({ query, data });
            }
          });

          if (result) {
            console.log(result);
          }
        }
    });
  }

  handleDelete(id) {
    const objIndex = this.tasks.findIndex((obj => obj.id === id));
    if (objIndex >= 0) {
      this.tasks.splice(objIndex, 1);
    }
  }

  handleEdit(task) {
    const objIndex = this.tasks.findIndex((obj => obj.id === task.id));
    this.tasks[objIndex] = {...task};
  }

  async save() {
    const client = await this.appsyncService.hc();

    const dialogRef = this.dialog.open(FormDialogComponent);
    dialogRef.afterClosed().subscribe(
      async (response) => {
        if (response) {
          const newIndex = uuidv4();
          response.id = newIndex;

          const result = await client.mutate({
            mutation: gql(createMutation),
            variables: {
              input: response
            },
            optimisticResponse: () => ({
              createTodo: {
                __typename: '',
                id: response.id,
                name: response.name,
                description: response.description,
              }
            }),
            update: (cache, { data: { createTodo } }) => {
              const query = gql(listTodos);

              // Read query from cache
              const data = cache.readQuery({ query });

              // Add newly created item to the cache copy
              data.listTodos.items = [
                ...data.listTodos.items.filter(item => item.id !== createTodo.id),
                createTodo
              ];

              // Overwrite the cache with the new results
              cache.writeQuery({ query, data });
            }
          });

          if (result) {
            console.log(result);
          }
        }
    });
  }

  async loadOnCreateSubscriber() {
    this.subsCreate = await this.onCreateListener();

    this.subsCreate.subscribe({
      next: data => {
        if (data.data.onCreateTodo) {
            this.tasks = this.tasks.filter((el) => (el.id !== undefined));
            const objIndex = this.tasks.findIndex((obj => obj.id === data.data.onCreateTodo.id));
            if (objIndex < 0) {
              this.tasks.push(data.data.onCreateTodo);
            }
        }
      },
      error: error => {
        console.warn(error);
      }
    });
  }

  async loadOnDeleteSubscriber() {
    this.subsDelete = await this.onDeleteListener();

    this.subsDelete.subscribe({
      next: data => {
        if (data.data.onDeleteTodo) {
          this.handleDelete(data.data.onDeleteTodo.id);
        }
      },
      error: error => {
        console.warn(error);
      }
    });
  }

  async loadOnUpdateSubscriber() {
    this.subsUpdate = await this.onUpdateListener();

    this.subsUpdate.subscribe({
      next: data => {
        if (data.data.onUpdateTodo) {
          this.handleEdit(data.data.onUpdateTodo);
        }
      },
      error: error => {
        console.warn(error);
      }
    });
  }

  async loadTasks() {
    const client = await this.appsyncService.hc();

    const options = {
      query: gql(listTodos),
      fetchPolicy: 'cache-and-network'
    };

    return client.watchQuery(options);
  }

  async loadTaskSubscriber() {
    this.listTasksSubscriber = await this.loadTasks();
    this.listTasksSubscriber.subscribe(
      ({data}) => {
        if (data && data.hasOwnProperty('listTodos')) {
          this.tasks = data.listTodos.items;
        }
      },
      (err: any) => {
        console.warn(err);
      }
    );
  }

  async onCreateListener() {
    const client = await this.appsyncService.hc();
    return client.subscribe({query: gql(onCreateTodo)});
  }

  async onDeleteListener() {
    const client = await this.appsyncService.hc();
    return client.subscribe({query: gql(onDeleteTodo)});
  }

  async onUpdateListener() {
    const client = await this.appsyncService.hc();
    return client.subscribe({query: gql(onUpdateTodo)});
  }
}
```

Y deberia estar funcionando bien en offline.

<img width="1024" height="720" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-03-02-angular-aws-appsync-datastore%2Famplify.gif?alt=media&token=6180e779-c57b-4507-987d-fc26714f7dfa">

Si este contenido te parece útil y me quieres ayudar a hacer mas considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)