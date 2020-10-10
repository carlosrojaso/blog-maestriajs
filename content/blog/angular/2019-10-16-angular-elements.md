---
layout: post
title: "Crea componentes nativos con Angular."
keywords: "Web Components, Angular, Elements"
date: 2019-10-21
tags: [angular]
categories: angular
author: carlosrojas
repo: https://github.com/ng-classroom/angular-elements-demo
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-10-16-angular-elements%2FCOVER.png?alt=media&token=ab87d9dd-6edf-4c9c-a0ed-36b8a020ce2d"
editname: "angular/2019-10-16-angular-elements.md"
versions:
  - title: '@angular/core'
    number: '8.2.3'
  - title: '@angular/cli'
    number: '8.3.0'
---

> La `Web` ha evolucionado a través de los años para permitir implementar mejores elementos a nuestras `SPAs` una de esas mejoras son los `Custom Elements`, Un `Custom Element` nos permite extender el `HTML` de los navegadores para crear nuestro propios `Componentes` y puedan ser reutilizados asi como usas `<video>` o `<audio>` con cualquier tecnologia. 

<!--summary-->

<img width="810" height="450" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-10-16-angular-elements%2FCOVER.png?alt=media&token=ab87d9dd-6edf-4c9c-a0ed-36b8a020ce2d">



## ¿ Que es Angular Elements ?

`Angular Elements` es una paquete de la plataforma, el cual podremos agregar como `@angular/elements` y este exporta un API `createCustomElement()`, el cual funciona de puente entre la interfaz de componentes de Angular y la funcionalidad de `Change Detection` para armar los componentes en el `DOM`.

## ¿ Como funcionan ?

Al usar la función `createCustomElement()` se convierte un componente en una clase que puede ser registrada con el navegador como un `custom element`. Pensemos en:

```html
<my-new-element message="Soy un elemento nuevo"></my-new-element>
```

Cuando tu `custom element` es localizado en una pagina, el navegador crea una instancia de la clase registrada y agrega esta al DOM.

<img width="600" height="360" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-10-16-angular-elements%2FcustomElement1.png?alt=media&token=ba144e4c-21e1-4e25-895f-e87d491de332">

De esta manera podemos utilizarlos como un componente estandar del navegador.

## ¿ Como transformamos nuestro Angular components a Custom elements ?

Como dijimos anteriormente Angular provee la función `createCustomElement()` para convertir un Angular component junto con sus dependencias a Custom Element. La funcion colecta todas las propiedades observables junto con la funcionalidad de Angular que el navegador necesita para crear y destruir instancias, y detectar y responder a cambios. 

<img width="600" height="387" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-10-16-angular-elements%2FcustomElement2.png?alt=media&token=3e9ad796-8e4a-4ae1-943d-f4a28aeade55">

- El API de transformación busca por propiedades `input`, y define los atributos correspondientes para el Custom Element. El resultante atributo usa dash-separated lowercase. Por ejemplo, para un componente con `@Input('myInputProp') inputProp`, el correspondiente custom element define un atributo `my-input-prop`.

- El API de transformación envia los `outputs` de los componentes como [HTML Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), con el nombre del custom event emparejando el `output name`. Por ejemplo, para un componente con `@Output() valueChanged = new EventEmitter()`, el correspondiente custom element enviara eventos con el nombre `valueChanged` y la información emitida sera guardada en el detalle de la propiedad del evento.



## Implementando Angular Elements

Lo primero es crear un proyecto en Angular.

````
$ ng new angular-elements-demo
$ cd angular-elements-demo
````

y crearemos un componente nuevo, llamado `HelloWorld` para ser originales.

````
$ng g c HelloWorld
````

y vamos a agregar el paquete de `Angular Elements` y 

````
$ ng add @angular/elements
````

y el paquete de polyfills `webcomponentsjs` para ampliar el soporte del componente a más navegadores.

````
$ npm install @webcomponents/webcomponentsjs
````

Con esto ya tenemos una buena base para continuar.

Ahora vamos a nuestro componente `HelloWorld` y vamos a agregar un poco de logica.

**hello-world.component.html**

```html
<div>
    <button (click)="showInfo()">Mostrar con Evento</button>
</div>
```

**hello-world.component.ts**

```ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnInit {
  @Input() rname;
  @Input() occupation;
  @Input() location;

  @Output() display = new EventEmitter();
  constructor() { }
  showInfo() {
    this.display.emit(`Nombre: ${this.rname}
    Ocupacion: ${this.occupation}
    Localizado en: ${this.location}`);
  }
  ngOnInit() {
  }
}
```

Acá mira que hemos comentado la linea del `selector` ya que como vamos a utilizar este componente como un `Custom Element` lo hacemos para no confundir a `Angular`.

Luego, Vamos a eliminar cosas que no vamos a utilizar que hacen parte de un proyecto en Angular como es el `AppComponent` y solo dejaremos el `app.module.ts` y lo modificaremos de la siguiente manera.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { HelloWorldComponent } from './hello-world/hello-world.component';

@NgModule({
  declarations: [
    HelloWorldComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [HelloWorldComponent],
  providers: []
})
export class AppModule {
  constructor(injector: Injector) {
    const custom = createCustomElement(HelloWorldComponent, {injector});
    customElements.define('app-hello-world', custom);
  }
  ngDoBootstrap() {}
}
```

Acá puedes ver que estamos usando la función `createCustomElement()` para volver nuestro componente `HelloWorld` un componente nativo estandar y le pasamos el `injector` que es una forma de resolver dependencias en `Angular`.

Tambien vemos `customElements.define()` que es como registramos nuestro componente y usamos `ngDoBootstrap()` que es una manera manual de inicializar nuestra App. Con esto ya tendriamos todo lo necesario para usar nuestro componente como un `CustomElement` pero queremos que sea reutilizable en cualquier App (Esa es la idea).

Entonces, para esto vamos a tomar todos los archivos genera el `$ng build` y concatenarlos en un archivo que se llame `angularapp.js` y sea facilmente importado en otra app.

Para esto desde tu terminal ejecutas el siguiente comando:

````
$ ng build angular-elements-demo --prod --output-hashing=none && cat dist/angular-elements-demo/runtime-es5.js dist/angular-elements-demo/polyfills-es5.js dist/angular-elements-demo/scripts.js dist/angular-elements-demo/main-es5.js > preview/angularapp.js
````

o para evitar hacer esto cada vez que realizas un cambio volverlo un script como el `custombuild.sh` que encontraras en el repo del demo.

Listo, crearemos una carpeta `preview` al mismo nivel de la raiz de nuestro proyecto y ejecutamos el comando. Deberias tener el archivo `preview/angularapp.js`.

Por último, agregaremos un `preview/index.html` donde usaremos este nuevo componente.

**preview/index.html**

```html
{% raw %}
<html>


<body>
    <app-hello-world rname="Carlos Rojas" occupation="Dev" location="Colombia"></app-hello-world>

    <script src="./angularapp.js"></script>
</body>
<script>
    const component = document.querySelector('app-hello-world');
    component.addEventListener('display', (event) => {
        console.log("in event!");
        alert(event.detail);
    });
</script>

</html>
{% endraw %}
```

y usamos `vanila js` para poder interactuar con nuestro componente `app-hello-world`.

Para probarlo voy a instalar un servidor local.

````
$ npm install -g serve
````

y ejecutamos

````
$ serve -S preview
````

<img width="977" height="548" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-10-16-angular-elements%2FScreen%20Shot%202019-10-20%20at%2010.56.09%20AM.png?alt=media&token=45b9f9b7-8078-49f2-8f39-671c30d50c9c">

Puedes encontrar mas info acá.

[https://angular.io/guide/elements](https://angular.io/guide/elements)

[https://blog.bitsrc.io/using-angular-elements-why-and-how-part-1-35f7fd4f0457](https://blog.bitsrc.io/using-angular-elements-why-and-how-part-1-35f7fd4f0457)

Si este contenido te parece útil y me quieres ayudar a hacer mas considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)