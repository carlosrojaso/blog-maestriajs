---
layout: post
title: "Creando Custom Elements con Vue"
date: 2019-10-27
categories: vue
author: carlosrojas
tags: [vue]
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-10-24-vue-custom-elements%2Fcover-vue-custom-element-demo.png?alt=media&token=c3386d65-799b-46c9-988c-4ed0b3bb8ae9"
repo: 'https://github.com/vue-classroom/vue-custom-element-demo'
editname: '2019-10-24-vue-custom-elements.md'
versions:
  - title: 'Vue CLI'
    number: '4.0.4'
---

> La `Web` ha evolucionado a través de los años para permitir implementar mejores elementos a nuestras `SPAs` una de esas mejoras son los `Custom Elements`, Un `Custom Element` nos permite extender el `HTML` de los navegadores para crear nuestro propios `Componentes` y puedan ser reutilizados asi como usas `<video>` o `<audio>` con cualquier tecnologia.

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-10-24-vue-custom-elements%2Fcover-vue-custom-element-demo.png?alt=media&token=c3386d65-799b-46c9-988c-4ed0b3bb8ae9"></amp-img>

{% include general/net-promoter-score.html %}

## ¿ Que son los componentes Web nativos ?

Los Web Components son una colección de 4 especificaciones los cuales nos permiten utilizar nuestras propias etiquetas en los navegadores. La especificación de `Custom Elements` crea las bases para diseñar y usar nuevos tipos de elementos en el `DOM`, La especificación de `Shadow DOM` define como encapsular el estilo y el markup en los Web Components, La especificacion de `ES Modules` define la inclusión y reutilización de Javascript en una forma optima y estandar, La especificación de `HTML template` que define como declarar fragmentos de Markup que no van a ser utilizados en el `load` inicial sino en tiempo de ejecución.


## ¿ Como funcionan ?

Al usar `vueCustomElement` se convierte un componente en una clase que puede ser registrada con el navegador como un `custom element`. Pensemos en:

```html
<my-new-element message="Soy un elemento nuevo"></my-new-element>
```

Cuando tu `custom element` es localizado en una pagina, el navegador crea una instancia de la clase registrada y agrega esta al DOM.

De esta manera podemos utilizarlos como un componente estandar del navegador.

<amp-img width="1000" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-10-24-vue-custom-elements%2Fcover-vue-custom-element-demo.png?alt=media&token=c3386d65-799b-46c9-988c-4ed0b3bb8ae9"></amp-img>

{% include blog/subscribe.html %}

## Implementando un Custom Element en Vue

Lo primero es crear un proyecto en Angular.

````
$ vue create vue-custom-element-demo
$ cd vue-custom-element-demo
````

Luego, agregamos el paquete `vue-custom-element`

```
npm install vue-custom-element --save
```

y actualizamos nuestro `main.js` para que se vea asi:

```js
import App from './App.vue'
import vueCustomElement from 'vue-custom-element';

Vue.config.ignoredElements = [
  'app-element'
];

Vue.use(vueCustomElement);

Vue.customElement('app-element', App, {});


/*
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
*/
```

Luego, vamos a nuestro componente `App.vue` y hacemos un componente llamado `app-element` simple.

```html
{% raw %}
<template>
  <p><img alt="Vue logo" src="./assets/logo.png"><br/> prop value: {{myprop}}</p>
</template>

<script>
export default {
  name: 'app-element',
  props: ['myprop']
}
</script>
{% endraw %}
```

y por ultimo modificamos nuestro `public/index.html` para que tome el nuevo elemento y hacemos un `query selector` para comprobar que es un elemento que el navegador entiende.

```html
{% raw %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>vue-custom-element-demo</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but vue-custom-element-demo doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <!-- built files will be auto injected -->
    <app-element myprop="I can pass props!"></app-element>
    <script>
      console.info(document.querySelector('app-element'));
    </script>
  </body>
</html>
{% endraw %}
```

```
$npm run build
```

y para probar debemos ejecutar nuestra app desde la carpeta `dist` y desafortunadamente no podemos utilizar el `npm run serve`, entonces, instalaremos un paquete que nos ayudara con esto.

```
$npm install -g serve
```

y ejecutamos desde la raiz.

```
$serve -s dist
```

<amp-img width="800" height="504" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-10-24-vue-custom-elements%2FScreen%20Shot%202019-10-27%20at%202.45.07%20PM.png?alt=media&token=48f1c39c-69de-446f-9a45-a89a908b6647"></amp-img>


Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)