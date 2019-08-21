---
layout: post
title: "Usando AWS Appsync con GraphQL y Angular."
keywords: "AWS Appsync, Angular, GraphQL"
date: 2019-08-21
tags: [angular]
categories: angular
author: carlosrojas
repo: https://github.com/ng-classroom/awsappsync
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-08-240-conectar-angular-aws-appsync-graphql%2F2.png?alt=media&token=e1bec285-1cd3-4510-bd6b-5778968adc63"
editname: "angular/2019-08-240-conectar-angular-aws-appsync-graphql.md"
versions:
  - title: 'angular/core'
    number: '7.0.0'
---

> Existén ocasiones en que queremos desarrollar Web Apps sin necesidad de preocuparnos por el API. Adicionalmente, hay nuevas tecnologias como `GraphQL` que nos dan una capa extra de control en nuestro Cliente. 

<!--summary-->

<amp-img width="820" height="312" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-08-240-conectar-angular-aws-appsync-graphql%2F2.png?alt=media&token=e1bec285-1cd3-4510-bd6b-5778968adc63"></amp-img>

{% include general/net-promoter-score.html %}

## ¿ Que es GraphQL ?

GraphQL es una tecnologia la cual te permite hacer peticiones a un API y obtener exactamente lo que quieres del sistema. Lo primero es que vamos a entender algunos terminos para poder avanzar en esta implementacion.

- *Resolver* es una función que retorna algun dato.
- *Queries*  es una petición a un servidor por algun campo o datos.
- *Mutation* es un cambio que le hacemos a los datos que estamos recibiendo.
- *Suscription* es un flujo de datos que vamos a escuchar en tiempo real.
- *Types* son una descripción de los datos que estamos recibiendo.

Un ejemplo sencillo de `GraphQL` puede ser enviando el siquiente `Query`:

```js
{
  me {
    name
  }
}
```

Puede producir:

```js
{
  "me": {
    "name": "Luke Skywalker"
  }
}
```

## ¿ Que es AWS Appsync ?

`AWS Appsync` es una solución de Amazon que te permite crear APIs facilmente los cuales vienen listos para soportar `GraphQL`.

Este servicio te permite crear una cuenta gratis [acá](https://aws.amazon.com/appsync/).

## ¿ Que es Amplify CLI ?

Es la herramienta de comandos que podemos instalar en nuestros computadores para poder integrar facilmente nuestras Apps Web y Moviles con los AWS Services.

Para instalarlo, Nos vamos a ubicar en la raiz de nuestro proyecto y ejecutar en una terminal:

````
$ npm install -g @aws-amplify/cli
````

{% include blog/subscribe.html %}

## Implementando AWS Appsync en Angular

Primero, vamos a crear nuestro nuevo proyecto en Angular con el CLI. 

````
$npm install -g @angular/cli
$ng new awsappsync
````

Luego, vamos a empezar a conectar appsync.

````
$ amplify init
````

La herramienta te detecta la mayoria de las cosas, entonces, muchas cosas por defecto estan bien.

<amp-img width="1160" height="442" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-08-240-conectar-angular-aws-appsync-graphql%2FScreen%20Shot%202019-08-19%20at%204.25.15%20PM.png?alt=media&token=e4f15ab9-6a3e-45dc-8b07-47d064e8c3a4"></amp-img>

Luego, tenemos que entrar en AWS y crear un `API` en la consola de `AWS Appsync`.

<amp-img width="1024" height="554" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-08-240-conectar-angular-aws-appsync-graphql%2FScreen%20Shot%202019-08-21%20at%206.07.17%20AM.png?alt=media&token=1bc9c18e-0bb3-4e98-981a-c07f351c9a5d"></amp-img>

y tengo un esquema asi:

```js
input CreateMyTestModelInput {
	title: String
}

input DeleteMyTestModelInput {
	id: ID!
}

type Mutation {
	createMyTestModel(input: CreateMyTestModelInput!): MyTestModel
	updateMyTestModel(input: UpdateMyTestModelInput!): MyTestModel
	deleteMyTestModel(input: DeleteMyTestModelInput!): MyTestModel
}

type MyTestModel {
	id: ID!
	title: String
}

type MyTestModelConnection {
	items: [MyTestModel]
	nextToken: String
}

type Query {
	getMyTestModel(id: ID!): MyTestModel
	listMyTestModels(filter: TableMyTestModelFilterInput, limit: Int, nextToken: String): MyTestModelConnection
}

type Subscription {
	onCreateMyTestModel(id: ID, title: String): MyTestModel
		@aws_subscribe(mutations: ["createMyTestModel"])
	onUpdateMyTestModel(id: ID, title: String): MyTestModel
		@aws_subscribe(mutations: ["updateMyTestModel"])
	onDeleteMyTestModel(id: ID, title: String): MyTestModel
		@aws_subscribe(mutations: ["deleteMyTestModel"])
}

input TableBooleanFilterInput {
	ne: Boolean
	eq: Boolean
}

input TableFloatFilterInput {
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

input TableIDFilterInput {
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

input TableIntFilterInput {
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

input TableMyTestModelFilterInput {
	id: TableIDFilterInput
	title: TableStringFilterInput
}

input TableStringFilterInput {
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

input UpdateMyTestModelInput {
	id: ID!
	title: String
}
```

Ok, Ahora vuelvo a mi proyecto en Angular y agrego en el `main.ts`.

```ts
...
import Amplify from 'aws-amplify';
import amplify from './aws-exports';
Amplify.configure(amplify);
...
```

Luego, debo ir al `src/tsconfig.app.json` y al `tsconfig.json`y agregar:

```js
{
...
  "compilerOptions": {
    "types": ["node"]
  }
...
}
```

Esto debido a los tipos que deben usar las dependencias. Adicionalmente, tenemos que agregar algo a los `src/polyfills` para que el navegador entienda algunas cosas de las dependencias.

```ts
import * as process from 'process';
window['process'] = process;
declare global {
  interface Window { global: any; }
}
window.global = window;
```

Ahora, instalemos las otras dependencias:

````
$ npm install --save aws-amplify aws-amplify-angular process @types/node @aws-amplify/api
````

y pasamos a ejecutar la conexión del SDK con nuestro proyecto.

```
amplify add codegen --apiId zk4sm6xxxxxxxx
```

donde `zk4sm6xxxxxxxx` es el identificador del API que creaste en appsync.

<amp-img width="1158" height="340" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-08-240-conectar-angular-aws-appsync-graphql%2FScreen%20Shot%202019-08-21%20at%206.07.17%20AM.png?alt=media&token=1bc9c18e-0bb3-4e98-981a-c07f351c9a5d"></amp-img>


Con esto el `CLI` nos ha creado todo lo necesario en nuestro proyecto de Angular y nos ha generado un Servicio. Vamos a utilizar ese servicio para eso lo agrego al `src/app/app.module.ts` 

```ts
...
import { APIService } from './API.service';

...
...
providers: [APIService],
...
```

y lo voy a utilizar en el `src/app.component.ts`

```ts
import { Component } from '@angular/core';
import { APIService, CreateMyTestModelInput } from './API.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'awsappsync';

  constructor(apiService: APIService) {
    const allData = apiService.CreateMyTestModel(<CreateMyTestModelInput>{'title': 'Hello, world!'}).then(
      (response) => {
        console.log('response >>>', response);
      }
    );
  }
}
```

y debes observar algo como.

<amp-img width="1024" height="397" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-08-240-conectar-angular-aws-appsync-graphql%2FScreen%20Shot%202019-08-21%20at%206.58.17%20AM.png?alt=media&token=b73e080e-92e5-4c44-9258-fe5bdb927e8b"></amp-img>

Bueno eso es todo por ahora. Espero sea de utilidad :)