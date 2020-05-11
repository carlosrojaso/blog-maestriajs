---
layout: post
title: "Usando el Vue Router"
date: 2018-12-28
repo: "https://github.com/vue-classroom/demo3"
categories: vue
author: carlosrojas
tags: [vue]
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-22-vue-router%2Fcover.png?alt=media&token=7c810142-f28d-44c6-9305-83e5b89a2bf0"
remember: true
editname: '2018-12-28-vue-router.md'
versions:
  - title: 'Vue CLI'
    number: '3.2.1'
  - title: 'vue-router'
    number: '3.0.2'
---

> Cuando estas desarrollando `SPA` (Single Page Application) normalmente vamos a necesitar un mecanismo con el cual podamos cargar diferentes `componentes` desde una misma `pagina` y acá es donde entre el `Router`.

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-22-vue-router%2Fcover.png?alt=media&token=7c810142-f28d-44c6-9305-83e5b89a2bf0"></amp-img>

{% include general/net-promoter-score.html %} 

# ¿ Que es el Vue Router ?

El `Vue Router` es el router oficial para `VueJs`. Este nos permitira realizar `SPA`s de una manera relativamente simple ya que soluciona muchos problemas por nosotros. Entre sus caracteristicas podremos encontrar:

- Trazado de rutas/vistas anidadas.
- Configuración modular basada en componentes.
- Parametros de ruta.
- Efectos de transición entre vistas.
- Enlaces con `CSS Clases` automaticas al estar activos.
- HTML 5 history mode o hash mode.

# ¿ Como usamos el Vue Router ?

Lo primero que haremos sera crear un proyecto nuevo para poder usar nuestro `Router`.

````
$vue create demo3
````

El `Router` esta en un paquete separado por lo que tendremos que instalarlo en nuestro proyecto.

````
$npm install vue-router
````

de esta manera agregaremos el paquete a nuestro proyecto y debemos llamarlo desde nuestro `main.js`.

```js
...
import VueRouter from 'vue-router'
...
Vue.use(VueRouter);  
```

Ya con esto `Vue` sabe que vamos a utilizar el `Router` en el proyecto.

# Agregando Bootstrap.

Para que nuestra App tenga una mejor apariencia voy a instalar Bootstrap en nuestro proyecto. Para esto simplemente ejecuto.

````
$npm install bootstrap jquery popper.js
````

y en nuestro `main.js` agregamos.

```js
...
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
...
```

# Creando nuestras rutas.

Ahora voy a crear un archivo `rutas.js` donde voy a escribir cuales van a ser las rutas de mi App.

```js
import HelloWorld from './components/HelloWorld.vue'
import ComponenteDos from './components/ComponenteDos.vue'
import ComponenteTres from './components/ComponenteTres.vue'

export const rutas = [
  {path: '', component: HelloWorld},
  {path: '/rutaDos', component: ComponenteDos},
  {path: '/rutaTres/:id', component: ComponenteTres}
];
```

Aca hemos creado 3 componentes `HelloWorld`, `ComponenteDos` y `ComponenteTres`

Podemos ver su estructura aqui.

<h3>components/HelloWorld.vue</h3>

```
{% raw %}
<template>
  <div class="jumbotron">
    <h4>Ruta de inicio</h4>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>
<script>
export default {
  name: 'HelloWorld'
}
</script>
{% endraw %}
```

<h3>components/ComponenteDos.vue</h3>

```
{% raw %}
<template>
  <div class="jumbotron">
    <h4>Ruta Dos</h4>
    <img alt="Placeholder" src="https://via.placeholder.com/300">
  </div>
</template>
<script>
export default {
  name: 'ComponenteDos'
}
</script>
{% endraw %}
```
<h3>components/ComponenteTres.vue</h3>

```
{% raw %}
<template>
  <div class="jumbotron">
    <h4>Ruta Tres</h4>
    <p>El id es {{id}}</p>
  </div>
</template>
<script>
export default {
  name: 'ComponenteDos',
  data(){
    return {
      id: this.$route.params.id
    }
  }
}
</script>
{% endraw %}
```

En este ultimo componente observa que estamos atrapando el parametro `id` que le vamos a enviar por la URL es por esto que usamos el `this.$route.params.id`.

{% include blog/subscribe.html %}

adicionalmente, observa que en nuestro archivo `rutas.js` hemos agregado el tercer path de la siguiente manera:

```js
...
{path: '/rutaTres/:id', component: ComponenteTres}
...
```

con esto le decimos a `Vue` que le pasaremos un argumento en la url el cual es `id`.

# Creando nuestro menu con las rutas.

Para esto vamos a crear un archivo `components/Header.vue` y le agregaremos un menu con las rutas a utilizar.

```
{% raw %}
<template>
  <div class="header clearfix">
    <nav>
      <ul class="nav nav-pills float-right">
      <li class="nav-link"><router-link to="/">Inicio</router-link></li>
      <li class="nav-link"><router-link to="/rutaDos">Ruta 2</router-link></li>
      <li class="nav-link"><router-link to="/rutaTres/4">Ruta con Param</router-link></li>
      </ul>
      <h3 class="text muted">Demo 3</h3>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Header'
}
</script>
{% endraw %}
```

# Diciendole a nuestra vista donde colocar el nuevo componente.

Por defecto le hemos dicho a `Vue` que utilice el archivo `App.vue` entonces en este vamos a utilizar el `router-view` el cual le indicara a nuestra App donde cargar los componentes con el `router`.

```
{% raw %}
<template>
  <div class="container">
  <encabezado></encabezado>
  <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    encabezado: Header
  }
}
</script>
{% endraw %}
```

y ya con esto estamos listos.

<amp-img width="1134" height="460" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-22-vue-router%2Fvue-router-final.gif?alt=media&token=171f2206-a513-457d-a293-68167e24145f"></amp-img>

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)