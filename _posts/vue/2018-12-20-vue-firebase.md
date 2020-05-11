---
layout: post
title: "Conectando tu App en Vue a Firebase"
date: 2018-10-20
repo: "https://github.com/vue-classroom/demo2"
categories: vue
author: carlosrojas
tags: [vue]
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-20-vue-firebase%2Fcover.png?alt=media&token=1e49baed-2435-43be-b0ef-0690298383fe"
remember: true
editname: '2018-12-20-vue-firebase.md'
versions:
  - title: 'Vue CLI'
    number: '3.2  .1'
---

> Cuando estes desarrollando tu App con `Vue` te vas a dar cuenta que necesitaras tareas comunes como `Autenticar Usuarios`, `Almacenar info` y `Almacenar imagenes` para estas tareas tenemos `Firebase` el cual es un `PaSS` que es muy facil de integrar.

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-20-vue-firebase%2Fcover.png?alt=media&token=1e49baed-2435-43be-b0ef-0690298383fe"></amp-img>

{% include general/net-promoter-score.html %} 

# ¿ Que es Firebase ?

`Firebase` es una plataforma de soluciones en la Web que viene a reemplazar el desarrollo de servicios en el `Servidor`. Entre las cosas que podremos hacer en Firebase están: Autenticar usuarios, Almacenar información de nuestra App en una base de datos en Tiempo Real, Almacenar imagenes y videos de nuestros Usuarios, Realizar operaciones de `computing` entre nuestros Servicios, entre otras.

# Paso 1: Instalando lo necesario.

Para comenzar nuestro primer proyecto en `Vue` vamos a utilizar el `CLI` oficial que podemos encontrar en [cli.vuejs.org](https://cli.vuejs.org).

```
$npm install -g @vue/cli
```

Adicionalmente, voy a instalar el `cli-service-global` que es necesario si quiero correr un servidor local.

```
$npm install -g @vue/cli-service-global
```

una vez tenga todo listo podemos verificar con:

```
$vue --version
```

## Paso 2: Crear un Proyecto nuevo.

El `CLI` me ayudara a crear toda la estructura necesaria para iniciar my proyecto en `Vue`.

````
$vue create vue-firebase
````

con esto tendremos todos los archivos necesarios para comenzar nuestro proyecto.

## Paso 3: Agregar Firebase al proyecto.

````
$npm install firebase vuefire --save
````

Una vez termine de agregar las dependencias debemos abrir el archivo `main.js` y decirle a Vue que vamos a usar `VueFire`.

```js
import Vue from 'vue'
import App from './App.vue'
import VueFire  from 'vuefire';

// explicit installation is required in a module environment
Vue.use(VueFire);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## Paso 4: Conectar nuestra App con Firebase.

En este tutorial asumimos que ya tienes una cuenta en [Firebase](https://firebase.google.com/) y ya has creado un Proyecto nuevo. Tambien que sabes donde encontrar la información para `inicializar` el App (Si No. Puedes ver este [link](https://firebase.google.com/docs/web/setup)).

{% include blog/subscribe.html %}

Ahora voy a crear un archivo `firebase.js` e inicializar nuestra App con `Firebase`.

```js
import Firebase from 'firebase/firebase';

let config = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  storageBucket: "...",
  messagingSenderId: "..."
};

const app = Firebase.initializeApp(config);

export const db = app.database();
```

Ahora con esto actualizamos nuestro archivo `main.js` para agregarle la inicialización que necesitamos.

```js
import './firebase';

import Vue from 'vue'
import App from './App.vue'
import VueFire  from 'vuefire';
```

## Paso 5: Conectar nuestra App con Firebase.

Ahora en nuestro proyecto de Firebase vamos al `Database` y creamos un `Realtime Database` que vamos a provisionar de la siguiente manera.

<amp-img width="360" height="201" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-20-vue-firebase%2Ffirebase.png?alt=media&token=106886f4-7ba2-40b8-adeb-67b49ecf7373"></amp-img>

Con esto tenemos algunos datos a mostrar en nuestra App.

## Paso 6: Usando una directiva y trayendo la info.

Por ultimo tenemos que entrar a nuestro archivo `App.vue` y agregar el `firebase.js` y obtener la info de los datos con nuestra refencia a  `todos`

```js
import HelloWorld from './components/HelloWorld.vue';

import {db} from './firebase';

export default {
  name: 'app',
  firebase: {
    items:  db.ref('todos')
  },
  components: {
    HelloWorld
  }
}
```

Una vez hecho esto tendremos la lista de elementos que se encuentran en ese nodo y desde el template en `App.vue` vamos a imprimirlos.

```html
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item['.key']}} - {{item['.value']}}
      </li>
    </ul>
  </div>
```

notese que hemos utilizado la directiva `v-for` la cual nos va a permitir facilmente iterar sobre esa colección.

<amp-img width="960" height="600" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-20-vue-firebase%2Fdemofinal.png?alt=media&token=39f274ec-3c94-41b5-9ffe-3ffb66dc69a0"></amp-img>

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)