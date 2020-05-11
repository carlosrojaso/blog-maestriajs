---
layout: post
title: "Anuncios en Vue 3"
keywords: "Vue"
date: 2019-12-05
tags: [vue]
categories: vue
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-12-05-vue-3-anuncios%2Fcover.png?alt=media&token=a505fb90-d2f8-4b68-be6d-f43cc5b6cc2c"
editname: "2019-12-05-vue-3-anuncios.md"
versions:
  - title: 'Vue CLI'
    number: '4.0.4'
---

> La versión 3 de `Vue` esta a unos meses de su release y nos encontramos en `pre-alpha` por lo cual han venido llegando una serie de anuncios con las nuevas caracteristicas que se vienen y ya se puede observar el codigo en el [repo](https://github.com/vuejs/vue-next) de `next`.

<!--summary-->

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-12-05-vue-3-anuncios%2Fcover.png?alt=media&token=a505fb90-d2f8-4b68-be6d-f43cc5b6cc2c"></amp-img>

{% include general/net-promoter-score.html %}

## Aplicaciones mas rapidas.

[Evan](https://mobile.twitter.com/youyuxi) en algún momento resumio las metas de `Vue 3` como:

- Hacerlo más rapido.
- Hacerlo más pequeño.
- Hacerlo más mantenible.
- Hacerlo más facíl de usar nativo.
- Hacer tu vida más facíl.

***Optimización,*** Actualmente un `bundle` de una app sencilla en Vue 2 pesa alrededor de 20kb, se estima que en Vue 3 pese alrededor de la mitad.

***Global API tree-shaking,*** Actualmente el `bundle` de una app en Vue 2 incluye todas las caracteristicas a pesar de que no se esten usando, en Vue 3 solo se incluira lo que se este usando.

***Proxy-based reactivity,*** Actualmente el sistema de reactividad de Vue 2 esta basado en `Object.defineProperty` que tiene algunas limitaciones como tener que usar `Vue.set` y `Vue.delete` esto causa una carga en el `scripting` debido a la recursividad que se debe hacer, con la implementación de JS Proxies esto mejorara de manera significativa.

## Composition API

Actualmente, cuando estamos agregando logica a un componente utilizamos `data`, `methods`, `computed`, etc. que conocemos como `Options API` esto trae algunas cosas como no poder tener `sugerencias` o `type checking`, ademas, que no es codigo `JavaScript` per se.

`Composition API` busca solucionar estos pequeños problemas agregando mecanismos presentes en `JavaScript` para poder elegir las propiedades de nuestro componente a través de function-based APIs.

Este es un componente en Vue 3.

```js
{% raw %}
<template>
  <button @click="increment">
    Count is: {{ count }}, double is {{ double }}, click to increment.
  </button>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    onMounted(() => console.log('component mounted!'))

    return {
      count,
      double,
      increment
    }
  }
}
</script>
{% endraw %}
```

Miremos que ahora tenemos que importar las propiedades que vamos a utilizar y usar el metodo `setup` para devolverlas.

{% include blog/subscribe.html %}

## Global mounting/configuration API change

Tenemos un nuevo cambio y es la manera en que configuramos nuestra App de manera global.

En Vue 2 teniamos esto.

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.ignoredElements = [/^app-/]
Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.component(/* ... */)
Vue.directive(/* ... */)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

Ahora sera algo asi:

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.ignoredElements = [/^app-/]
app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)

app.mount('#app')
```

## Fragments

Actualmente no puedes crear algo asi:

```html
<template>
  <div>Hello</div>
  <div>World</div>
</template>
```

debido a que los componentes en Vue necesitan ser bindeados en solo un elemento `DOM`. Aún no sabemos la manera en que este mecanismo se llevara a cabo.

## Suspense

Esta sera una forma de suspender la renderización de tu componente hasta que una condicion se cumpla.

```html
<Suspense>
  <template >
    <Suspended-component />
  </template>
  <template #fallback>
    Loading...
  </template>
</Suspense>
```

## Multiple v-models

`v-model` es un herramienta util en los componentes para tener binding en 2 vias pero solo esta permitido su uso a uno por componente. Ahora podras utilizar multiples `v-model` en tu codigo.

```html
<InviteeForm
  v-model:name="inviteeName"
  v-model:email="inviteeEmail"
/>
```

Bueno como ves son muchas las nuevas caractisticas que se vienen en la nueva entrega de `Vue` y como sabes esta aún en `alpha` , entonces, muchas cosas pueden cambiar pero es interesante empezar a conocer esto.

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)