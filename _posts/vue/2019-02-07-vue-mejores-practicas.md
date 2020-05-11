---
layout: post
title: "Mejores Practicas en Vue"
date: 2019-02-06
categories: vue
author: carlosrojas
tags: [vue]
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-02-07-vue-mejores-practicas%2Fcover.png?alt=media&token=e8669a77-f503-40ed-bbf6-1cef3a9b5fa9"
editname: '2019-02-07-vue-mejores-practicas.md'
versions:
  - title: 'Vue CLI'
    number: '3.2.1'
---

> A medida que vamos avanzando con nuestra App empezamos a tener ciertas dudas de que practicas utilizar en ciertos momentos, es por esto que he buscando algunas las cuales te pueden ser utiles.

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-02-07-vue-mejores-practicas%2Fcover.png?alt=media&token=e8669a77-f503-40ed-bbf6-1cef3a9b5fa9"></amp-img>

{% include general/net-promoter-score.html %}

# Limpiar los event listeners en el destroy de los componentes con $off.

Cuando estes escuchando eventos con `$on` tenemos que recordar removerlos con `$off` en `destroyed()`. Para prevenir fugas de memoria.

# Siempre usar kebab-case para nombres de eventos.

Cuando estemos emitiendo/escuchando eventos personalizados, deberiamos usar kebab-case porque igualmente van a ser convertidos a kebab-case.

```js
// Emitiendo.
this.$emit('my-event') // instead of myEvent
// Escuchando.
v-on:my-event
```

{% include blog/subscribe.html %}

# Evita llamar el mismo metodo en created() y en watch.

Si necesitamos disparar un metodo en la inicialización de un componente y en el cambio de la propiedad, la practica comun es:

```js
watch: {
  myProperty() {
    this.doSomething();
  }
},
created() {
  this.doSomething();
},
methods: {
  doSomething() {
     console.log('doing something...');
  }
},
```

pero es redundante, para esto podemos usar:

```js
watch: {
  myProperty: {
    immediate: true, // forcing handler on initial status
    handler() {
      this.doSomething();
    }
  }
},
methods: {
  doSomething() {
     console.log('doing something...');
  }
},
// Even better solution
watch: {
  myProperty: {
    immediate: true, // forcing handler on initial status
    handler() {
      console.log('doing something...'); // No need to declare a function on methods for 1 use case
    }
  }
},
```

# Siempre usar :key en ciclos v-for.

Siempre usar `:key` para tus ciclos en el template. Sino puede terminar en errores dificil de encontrar.

# Nombres de props deberian usar CamelCase durante la declaración, pero kebab-case en plantillas.

Siguiendo las convenciones de los lenguajes: Javascript(CamelCase) y HTML(kebab-case) tiene sentido que un `prop` sea definido en camelCase en JS y usado en kebab-case en HTML.

# Nunca usar v-if en el mismo elemento que v-for.

Esto es un problema de `performance` miremos lo siguiente:

```html
<ul>
  <li
    v-for="game in games"
    v-if="game.isActive"
    :key="game.slug"
  >
    {{ game.title }}
  <li>
</ul>
```

esto sera traducido a.

```js
this.games.map(function (game) {
  if (game.isActive) {
    return game.title
  }
})
```

Lo cual cambia el orden de complejidad.

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)