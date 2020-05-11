---
layout: post
title: "Usando AWS Appsync con GraphQL y Vue."
keywords: "AWS Appsync, Vue, GraphQL"
date: 2019-11-04
tags: [vue]
categories: vue
author: carlosrojas
repo: https://github.com/carlosrojaso/vue-graphqlappsync
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-11-04-vue-aws-appsync-graphql%2Fcover.png?alt=media&token=1708ce32-f08d-4e4a-8bce-e5d6963482e0"
editname: "2019-11-04-vue-aws-appsync-graphql.md"
versions:
  - title: 'Vue CLI'
    number: '4.0.4'
---

> Existén ocasiones en que queremos desarrollar Web Apps sin necesidad de preocuparnos por el API. Adicionalmente, hay nuevas tecnologias como `GraphQL` que nos dan una capa extra de control en nuestro Cliente. 

<!--summary-->

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-11-04-vue-aws-appsync-graphql%2Fcover.png?alt=media&token=1708ce32-f08d-4e4a-8bce-e5d6963482e0"></amp-img>

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
$vue create vue-offline-realtime-todos
$cd vue-offline-realtime-todos
$npm i aws-amplify-vue
````

Luego, vamos a empezar a conectar appsync.

````
$ amplify init
````

La herramienta te detecta la mayoria de las cosas, entonces, muchas cosas por defecto estan bien.

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

Ok, Ahora vuelvo a mi proyecto en Vue y agrego en el `src/main.js`.

```js
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { rutas } from "./rutas"
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

Vue.use(VueRouter);
Vue.use(AmplifyPlugin, AmplifyModules)

const enrutador = new VueRouter({
  routes: rutas
});

Vue.config.productionTip = false

new Vue({
  router: enrutador,
  render: h => h(App)
}).$mount('#app')
```

y pasamos a ejecutar la conexión del SDK con nuestro proyecto.

```
amplify add codegen --apiId zk4sm6xxxxxxxx
```

donde `zk4sm6xxxxxxxx` es el API Key que te genera Appsyn y lo obtienes entrando en tu API.

<amp-img width="161" height="353" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-11-04-vue-aws-appsync-graphql%2FScreen%20Shot%202019-11-04%20at%204.11.12%20PM.png?alt=media&token=a311b5ef-b3f9-409e-b6ce-c0e2d2b2ae20"></amp-img>

y dirigiendote a `Integrate with your app`.

Con esto el `CLI` nos ha creado todo lo necesario en nuestro proyecto de Vue y nos ha generado los archivos `graphql` que podremos utilizar despues.

Luego, en el componente que he creado `src/componentes/Home.vue`

```js
<template>
  <div class="home">
    <div v-for="item in todos" v-bind:key="item.id">
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import { components } from 'aws-amplify-vue';
import { ListTodosQuery } from "../graphql/queries";
export default {
  name: 'Home',
  data () {
    return {
      note: '',
      todos: [],
      filter: 'all',
      logger: {}
    }
  },
  components: {
    ...components
  },
  created() {
    this.logger = new this.$Amplify.Logger('NOTES_component')
    this.list();
  },
  computed: {
    listTodosQuery() {
      return this.$Amplify.graphqlOperation(ListTodosQuery);
    }
  },
  methods: {
    list() {
      this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(ListTodosQuery))
      .then((res) => {
        this.todos = res.data.listTodos.items;
        this.logger.info(`Todos successfully listed`, res);
        console.log(res);
      })
      .catch((e) => {
        this.logger.error(`Error listing Todos`, e);
        console.log(e);
      });
    },
  }
}
</script>
```


y debes observar algo como.

<amp-img width="850" height="379" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-11-04-vue-aws-appsync-graphql%2FScreen%20Shot%202019-11-04%20at%2010.47.02%20AM.png?alt=media&token=2be3900b-f588-4ffb-a45e-c340c72e4a3b"></amp-img>

Con esto sabemos que la app esta conectada con `AWS Appsync` y podemos continuar nuestro desarrollo. Si quieres ver el ejemplo completo, descarga el repositorio.

```
$git clone https://github.com/carlosrojaso/vue-graphqlappsync.git
$npm install
$git checkout v1.0
```

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)