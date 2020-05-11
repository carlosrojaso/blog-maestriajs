---
layout: post
title: "Usando AWS Amplify Datastore."
keywords: "AWS Appsync, Vue, GraphQL, Datastore"
date: 2020-03-07
tags: [vue, amplify, datastore]
categories: vue
author: carlosrojas
repo: https://github.com/carlosrojaso/maestriajs-vue-app/tree/amplify
cover: "hhttps://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2020-03-07-aws-appsync-datastore%2FCover%20Blogs.png?alt=media&token=ab954ab7-4029-454d-9edb-569c420fc14f"
editname: "2020-03-07-aws-appsync-datastore.md"
versions:
  - title: 'vue'
    number: '2.6.10'
---

> Existén ocasiones en que queremos desarrollar Apps que funcionen `Offline` sin preocuparnos por elementos como la `resolución de conflictos` y solo enfocarnos en generar logica de negocio, para esto `AWS Appsync` tiene una herramienta llamada `Aws Amplify Datastore` que nos puede ayudar con esto.

<!--summary-->

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2020-03-07-aws-appsync-datastore%2FCover%20Blogs.png?alt=media&token=ab954ab7-4029-454d-9edb-569c420fc14f"></amp-img>

{% include general/net-promoter-score.html %}

## ¿ Que es AWS Amplify ?

`AWS Amplify` es una solución que consiste en librerias, componentes y un `CLI` que te permitiran conectar tu app en `JavaScript`, `Angular`, `Vue` y `React` con la solución de `AWS Appsync` y el ecosistema de `AWS`.

Entre sus caracteristicas tiene el `datastore` el cual es una caracteristica que nos permitira otorgar de `Offline` a nuestra App sin preocuparnos mucho por la resolución de conflictos.

## ¿ Que es AWS Appsync ?

`AWS Appsync` es una solución de Amazon que te permite crear APIs facilmente los cuales vienen listos para soportar `GraphQL`.

Este servicio te permite crear una cuenta gratis [acá](https://aws.amazon.com/appsync/).


## Implementando AWS Amplify en Vue

Para implementar el `datastore` en un proyecto de Vue vamos a utilizar una app de `Notas` que hemos preparado para la ocasión.

````
$git clone https://github.com/carlosrojaso/maestriajs-vue-app.git
$git checkout amplify
$npm install
````

Luego, vamos a empezar a conectar nuestra App con Amazon.

````
$ amplify init
````

{% include blog/subscribe.html %}

En este paso no entrare en detalle porque tenemos este [Post](https://vue-classroom.com/blog/vue/vue-aws-appsync-graphql/) donde te puedes guiar, lo unico es que debes crear un esquema nuevo para tu implementación y desde el `CLI` seleccionar el esquema de ejemplo de `Todos` el cual te permitira agregar listas de tareas. Deberias ver en tu consola algo como esto en el `schema`.

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

Una vez tengamos todo conectado vamos a proceder a implementar `datastore` para esto deberemos instalar un par de dependencia adicionales.

````
$npm i @aws-amplify/core @aws-amplify/datastore
````

posiblemente si en el paso anterior generaste los `schemas` a través del `CLI` no necesitaras `@aws-amplify/core` pero lo coloco para referencia en el codigo.

Luego, deberemos generar los modelos de nuestra API con el comando.

````
$amplify codegen models
````

Esto nos genera una carpeta en `src/models` la cual solo deberemos referenciar.

```ts
import { components } from 'aws-amplify-vue'
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from '../models';
```

Ahora, nos ubicaremos donde se encuentra nuestro componente principal `src/components/Home.vue` y actualizaremos nuestras funciones de `getTasks()`, `deleteNote()`, y `saveNote()`.

## Obtener datos.

Para obtener nuestra lista de notas, actualizaremos el metodo `getTasks()` para hacer un `query` y obtener la info desde `AWS` y devolveremos un array.

```ts
async getTasks() {
      const todos = await DataStore.query(Todo);
      return todos.map((elem) => ({...elem}));
    }
```

como vez es relativamente sencillo.

## Guardar datos.

Para guardar datos debemos utilizar el metodo `save()` del `datastore`.

```ts
await DataStore.save(new Todo(
          noteToSave
        )).then(
          () => {
            this.notes.push(noteToSave);
          }
        );
```

donde `noteToSave` es un objeto que contiene la informacion de la nota que se quiere guardar.

## Editar datos.

Para editar datos debemos utilizar el mismo metodo `save()` del `datastore` pero en lugar de enviar la información de la nota, debemos usar:

```ts
	await DataStore.save(
		Todo.copyOf(original, updated => {
		updated.name = this.newTitle;
		updated.description = this.newContent;
		})
	).then(
		() => {
		const originalNote = this.notes.findIndex((item) => (item.id === this.idToEdit));
		const noteToEdit = {
			id: this.idToEdit,
			name: this.newTitle,
			description: this.newContent
			};
		this.notes[originalNote] = noteToEdit;
		}
	);
```

`original` es la nota original que vamos a editar que lo obtenemos con:

```ts
const original = await DataStore.query(Todo, this.idToEdit);
```

y el `updated` son los valores que vamos a actualizar, por eso le asignamos a cada propiedad el valor de la nota actualizada.


completo se veria asi:

```ts
const original = await DataStore.query(Todo, this.idToEdit);

	await DataStore.save(
		Todo.copyOf(original, updated => {
		updated.name = this.newTitle;
		updated.description = this.newContent;
		})
	).then(
		() => {
		const originalNote = this.notes.findIndex((item) => (item.id === this.idToEdit));
		const noteToEdit = {
			id: this.idToEdit,
			name: this.newTitle,
			description: this.newContent
			};
		this.notes[originalNote] = noteToEdit;
		}
	);
```

## Borrar datos.

Para borrar una nota deberemos usar el metodo `delete()`, la implementación de este metodo quedaria asi:

```ts
async deleteNote(id) {
      const todelete = await DataStore.query(Todo, id);

      DataStore.delete(todelete).then(
        () => {
          const taskToDelete = this.notes.findIndex((item) => (item.id === id));
          this.notes.splice(taskToDelete, 1);
        }
      );
    }
```

y tendremos el `datastore` implementado en nuestra app.

<amp-img width="1024" height="720" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2020-03-07-aws-appsync-datastore%2Fdemo.gif?alt=media&token=7456a9d9-b616-44b9-a59b-1f3ca21ff990"></amp-img>

Si este contenido te parece útil y me quieres ayudar a hacer mas considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)