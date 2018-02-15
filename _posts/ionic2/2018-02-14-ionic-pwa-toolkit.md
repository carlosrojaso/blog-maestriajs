---
layout: post
title: "Ionic PWA Toolkit"
date: 2018-02-15
tags: [pwa, ionic, toolkit]
categories: ionic2
author: williambastidas
cover: "https://cdn-images-1.medium.com/max/800/1*L60K2inHjNJ1SiEIp-gJFg.png"
remember: true
editname: "ionic2/2018-02-14-ionic-pwa-toolkit.md"
---

>Ionic PWA Toolkit una combinación de herramientas para crear **aplicaciones web progresivas** con IONIC.

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*L60K2inHjNJ1SiEIp-gJFg.png" alt="Ionic PWA Toolkit"></amp-img>

{% include general/net-promoter-score.html %} 

En este artículo a demás de generar nuestra primera pwa con el nuevo kit de herramientas de ionic, intentaremos hechar un vistazo a la estructura del proyecto y algunos conceptos claves.

### Que incluye el proyecto?

* Ionic
* Routing
* Stencil
* Configuración de Notificaciones Push
* Mostrar un toast cuando hay una nueva versión de la PWA disponible
* Pruebas Unitarias
* Pre-Rendering
* zero config lazy-loading
* zero config code-splitting
* Polyfills cargados selectivamente según el soporte del navegador
* ES6 por defecto para nuevos navegadores, ES5 para navegadores más antiguos
* Todo lo necesario para agregar a la pantalla de inicio PWA (trabajador de servicio, manifiesto web y meta tags iOS)
* Componente lazy-img para mejorar la carga de nuestras imágenes

### Lo clave en esta lista:

**Ionic:** Todos los widgets UI predefinidos y prediseñados con los que estamos familiarizados desde Ionic-Angular, pero llevados a Web Components.

**Stencil:**  Un compilador que toma archivos TSX  ( [JSX](https://reactjs.org/docs/introducing-jsx.html) +
[TS](https://www.typescriptlang.org/) ) y los convierte en [Web components](https://developer.mozilla.org/es/docs/Web/Web_Components) y adicionalmente no importa el framework que utilices Angular, React o VueJs (o incluso ningún framework).[.Mejora el rendimiento por ser componentes nativos, el tamaño de los componentes lo cual es un requerimiento de las PWA y también la pesadilla de la fragmentación de los frameworks donde uno no es compatible con el otro.](https://blog.ng-classroom.com/blog/news/stencil/)

**Notificaciones** **Push:** Todo el código repetitivo para notificaciones push, incluido el trabajador del servicio, se incluye de fábrica, lo que ahorra tiempo y configuración.

**Agregar** a la pantalla de inicio : Un trabajador de servicio (gracias a Workbox ), un manifiesto web y las metaetiquetas correctas para iOS. Esto significa que la PWA se puede agregar a la pantalla de inicio tanto en dispositivos Android como iOS.


En vista de que el mayor impacto parece venir por [Stencil](https://stenciljs.com/) me gustaría agregar lo siguiente:_ Stencil crea componentes web y el equipo de Ionic ha creado un conjunto de componentes web con Stencil que se han convertido en Ionic Core . Stencil también se puede usar para crear componentes web para cualquier propósito, no solo se usa para crear componentes ionic. El paquete de componentes web de Ionic puede ser utilizado por cualquier framework y también se puede utilizar sin ninguno. Hay una biblioteca especial llamada `ionic-angular` que es el marco de la biblioteca de ionic específico de Angular (el que hemos estado usando durante mucho tiempo).

Para quienes estamos familiarizados de alguna forma con la construcción de aplicaciones ionic y pwa con ionic puede ser confuso este nuevo ecosistema, por lo que antes de continuar me quiero compartir las siguientes interrogantes que plantea Josh Morony en su artículo [Building a PWA with Stencil: An Introduction to Stencil](https://www.joshmorony.com/building-a-pwa-with-stencil-an-introduction-to-stencil/). con el fin de ayudarnos a despejar algunas dudas:

* Pensé que Stencil era una herramienta detrás de escena para Ionic 4. Lo es.
* ¿Vamos a necesitar aprender Stencil para usar Ionic ahora? No.
* ¿Necesitamos aprender Stencil para construir PWA con Ionic? No.
* ¿Debo aprender Stencil? Tal vez.
* ¿Por qué debería construir un PWA con Stencil cuando puedo construir una con Ionic-Angular? Rendimiento, en su mayoría.
* ¿Eso significa que no debería construir un PWA con Ionic-Angular? No.
* ¿Se está desaprovechando Ionic-Angular? No.

### Desarrollando la aplicacación

Para configurar [Ionic PWA Toolkit ](https://github.com/ionic-team/ionic-pwa-toolkit) para un nuevo proyecto, solo necesitamos clonar el repositorio de GitHub:

```
git clone https://github.com/ionic-team/ionic-pwa-toolkit.git PROJECT-NAME
```

Una vez que ha finalizado la clonación, debemos entrar al proyecto e instalar las dependencias:

```
cd PROJECT-NAME
```

```
npm install
```

Una vez que las dependencias hayan terminado de instalarse, podemos ejecutar la aplicación con:

```
npm start
```

El proyecto debería iniciarse en el navegador en `localhost:3333` y deberíamos ver algo como esto:

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <amp-img width="313" height="606" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*oSn8vhr2rRgrRnwFPfCccw.png" alt="Ionic PWA Toolkit"></amp-img>
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>


Se ve bastante similar a una aplicación Ionic normal. Aunque los componentes web Ionic que se introducen en Ionic 4 se pueden usar fácilmente en cualquier proyecto Stencil, de manera predeterminada no se incluyen en el motor de arranque (está en el kit de herramientas Ionic PWA). Lo que vemos es en realidad elementos básicos de HTML diseñados con algunos SCSS personalizados.

Cuando estemos en desarrollo, podemos usar el siguiente comando para habilitar la recarga del navegador cuando realicemos un cambio:

```
npm run dev
```

También podemos compilar el proyecto para generar una aplicación de producción ejecutando:

```
npm run build
```

A continuación, encontraremos la aplicación creada dentro de la carpeta ***www*** .

En este punto, la compilación final ya no es realmente un “proyecto stencil”, solo son componentes web vainilla que se compilaron con Stencil. Estos componentes web funcionan directamente en navegadores modernos, no requieren ningún tipo de framework para ejecutarse.


### Archivos y carpetas
La estructura de carpetas en el proyecto que acabamos de configurar, es bastante similar a una aplicación Ionic-Angular normal:

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*yRVVFJD68CnBI8mHNuYC1g.png" alt="Ionic PWA Toolkit"></amp-img>
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>

Tenemos una carpeta **src** donde se lleva a cabo la mayor parte de la codificación y también contiene una carpeta de **assets** para activos estáticos. Tenemos el archivo **index.html** que contiene la estructura básica del sitio web junto con `<my-app>` componente raíz de la aplicación. También tenemos una carpeta www que contiene el código creado para el proyecto.

Tenemos los archivos de configuración habituales, como `package.json`, `tsconfig.json` y así sucesivamente. También tenemos un archivo `stencil.config.js` el compilador usa este archivo para determinar cómo se debe compilar el proyecto y si es necesario incorporar componentes externos.

No hay mucho de lo que preocuparse ahora, haremos casi todo el trabajo dentro de la carpeta **components** (ya sea creando nuevos componentes o editando los existentes).

### Sintaxis
Una gran parte de la sintaxis para los proyectos de Stencil es muy similar a la que estamos acostumbrados en angular. La mayor diferencia es el uso de ***TSX*** (que es JSX con la adición de TypeScript).

### JSX / TSX

JSX (JavaScript XML) agrega la capacidad de usar sintaxis XML dentro de JavaScript. TSX es lo mismo, excepto que permite el uso de TypeScript y XML .

Lo que nos permite es usar la misma sintaxis que usaríamos para HTML, excepto que podemos agregarlo directamente en nuestro código JavaScript / TypeScript. Si quisiéramos definir algún tipo de plantilla dentro de JavaScript, generalmente haríamos algo como esto:
```
let myTemplate = '<div><p>Hello</p></div>';
```

No podemos escribir sintaxis HTML dentro de JavaScript porque no es una sintaxis de JavaScript válida. En cambio, creamos un `string` como en el ejemplo anterior para mantenerlo. Sin embargo, con JSX / TSX, podemos agregar la sintaxis XML directamente a JavaScript:
```
let myTemplate = <div><p>Hello</p></div>;
```

Utilizaremos esto en Stencil a través de la función `render()` que encontraremos dentro de nuestros componentes:

```ts
render() {
 if (this.match && this.match.params.name) {
  return (
   <div>
    <p>
      Hello! My name is {this.match.params.name}.
      My name was passed in through a route param!
    </p>
   </div>
  );
 }
}
```
La función `render` determinará qué se muestra en la pantalla (la plantilla, básicamente). Encontraremos una función `render` en cada uno de los componentes de ejemplo en Ionic PWA Toolkit.

EL código del ejemplo anterior lo podemos encontrar en ***app-profile.tsx***

Como JSX/TSX solo agrega la capacidad de usar sintaxis XML dentro de JavaScript significa que se podemos usar la lógica básica de JavaScript `if/el` separa controlar cómo se procesa el archivo (en lugar de las directivas de angular como `*ngIf`). En este caso, el mensaje solo se representa `if` se cumple la condición.

### Estructura básica de componentes
Observando la estructura general de un componente Stencil vemos que es bastante similar a un componente angular:

app-home.tsx

```ts
import { Component } from '@stencil/core';
 
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {
 
  componentDidLoad() {
    console.log('The component has been rendered');
  }
 
  someCustomFunction() {
    console.log('Watch out!... Radioactive man');
  }
 
  render() {
    return (
      <div>
        <p>
          Welcome to the Stencil App Starter.
          You can use this starter to build entire apps all with
          web components using Stencil!
          Check out our docs on <a  href='https://stenciljs.com'>stenciljs.com</a> to get started.
        </p>
 
        <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link>
      </div> 
    );
  }
}
```

Importamos `Component` de la biblioteca `@stencil/core` y luego usamos el decorador `@Component` para definir algunos metadatos para el componente. Suministramos una propiedad `tag` que define la etiqueta para el elemento, por ejemplo `<app-home>`, y una `styleUrl` que define el archivo SCSS que este componente utilizará para el diseño.

Exportamos una clase que define el componente. Lo más importante es que esta clase contiene la función `render` que determina qué se mostrará al usuario. Sin embargo, también podemos definir nuestras propias funciones personalizadas como lo hacemos en Ionic-Angular, e incluso tenemos eventos de ciclo de vida similares (por ejemplo, en `componentDidLoaden` lugar de `ionViewDidLoad`).

Ahora veamos rápidamente alguna sintaxis común y cómo se compara con Ionic-Angular.


### Interpolaciones
En Angular, una interpolación es cuando calculamos algo y presentamos su valor en la pantalla. Haríamos interpolaciones como esta:
```
{{ name }}
```

Este concepto es casi idéntico en Stencil, excepto que usamos una sola llave y debemos incluir la referencia a `this`:

```
{this.name}
```

### @Prop y @State
Definir un `@Prop` nos permite pasar un dato a un componente. Si tuviéramos que configurar el siguiente `@Prop`:
```ts
import { Component, Prop } from '@stencil/core';
 
@Component({
  tag: 'my-first-component',
  styleUrl: 'my-first-component.scss'
})
export class MyComponent {
 
  // El nombre debe ser una propiedad pública del componente
  @Prop() name: string;
 
  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}
```

Entonces podríamos pasarle un nombre al componente cuando lo usemos, así:
```
<my-first-component name="Max"></my-first-component>
```
Podemos acceder a ese valor dentro de nuestro componente utilizando `this.name`. Esto es idéntico en concepto a Angular `@Input`. `@State` es similar, excepto que lo usamos para definir valores que van a cambiar dentro de nuestro componente. Usando otro ejemplo de la documentación:

```ts
export class TodoList {
 
  @State() completedTodos: Todo[];
 
  ...
}
```

Este componente necesita un seguimiento `completedTodos`, que cambiará con el tiempo. En lugar de simplemente definirlo como un miembro de la clase como lo haríamos en Ionic / Angular.
```ts
export class TodoList {
 
  completedTodos: Todo[];
 
  ...
}
```

Anteponemos `@State` para que Stencil sepa que este valor cambiará. Cada vez que una `@Prop` o `@State` se actualiza, la función `render` se ejecutará y actualizará lo que el usuario ve en la pantalla.


### @Event y @Listen
Podemos definir un `@Event` con un `EventEmitter` para activar un evento:

```ts
import { Event, EventEmitter } from '@stencil/core';

export class TodoList {
 
  @Event() todoCompleted: EventEmitter;
 
  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

De nuevo, esto es exactamente lo mismo que haríamos en una aplicación Ionic-Angular (excepto que la usaríamos en `@Output` lugar de `@Event`). Creamos `todoCompleted` con `@Event()` y luego podemos activar ese evento llamando `this.todoCompleted.emit()`.

Para escuchar ese evento en un componente principal, usamos `@Listen`:

```ts
export class TodoApp {
 
  @Listen('todoCompleted');
 
  todoCompletedHandler(event: CustomEvent) {
    console.log('Received the custom todoCompleted event');
  }
}
```

Esto es algo diferente de lo que haríamos en Ionic-Angular, porque normalmente configuraríamos un enlace de evento en la plantilla como este:

```
<todo-list (todoCompleted)="someFunction()">
```
y configuraríamos el correspondiente `someFunction()` para manejar el evento.



Hay más sintaxis para recorrer y quienes estamos familiarizados con Angular podemos observar que muchos de los conceptos generales son bastante similares.

Stencil proporciona una API similar a Angular y React, pero se centra en satisfacer las demandas de rendimiento de las aplicaciones web progresivas.

### Referencias:

[Ionic PWA Toolkit Beta](https://github.com/ionic-team/ionic-pwa-toolkit). 

[The magical, reusable web component compiler](https://stenciljs.com/). 

[Building a PWA with Stencil An Introduction to Stencil](https://www.joshmorony.com/building-a-pwa-with-stencil-an-introduction-to-stencil/). 

[Building a PWA with Stencil Project Structure and Syntax](https://www.joshmorony.com/building-a-pwa-with-stencil-project-structure-and-syntax/). 

[Announcing the Ionic PWA Toolkit Beta](https://blog.ionicframework.com/announcing-the-ionic-pwa-toolkit-beta/). 


Hasta la proxima :)