---
layout: post
title: "Angular Elements."
keywords: "Web Components, Angular, Elements"
date: 2019-10-16
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

<amp-img width="810" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-10-16-angular-elements%2FCOVER.png?alt=media&token=ab87d9dd-6edf-4c9c-a0ed-36b8a020ce2d"></amp-img>

{% include general/net-promoter-score.html %}

## ¿ Que es Angular Elements ?

`Angular Elements` es una paquete de la plataforma, el cual podremos agregar como `@angular/elements` y este exporta un API `createCustomElement()`, el cual funciona de puente entre la interfaz de componentes de Angular y la funcionalidad de `Change Detection` para armar los componentes en el `DOM`.

## ¿ Como funcionan ?

Al usar la función `createCustomElement()` se convierte un componente en una clase que puede ser registrada con el navegador como un `custom element`. Pensemos en:

```html
<my-new-element message="Soy un elemento nuevo"></my-new-element>
```

Cuando tu `custom element` es localizado en una pagina, el navegador crea una instancia de la clase registrada y agrega esta al DOM.

<amp-img width="600" height="360" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-10-16-angular-elements%2FcustomElement1.png?alt=media&token=ba144e4c-21e1-4e25-895f-e87d491de332"></amp-img>

De esta manera podemos utilizarlos como un componente estandar del navegador.

## ¿ Como transformamos nuestro Angular components a Custom elements ?

Como dijimos anteriormente Angular provee la función `createCustomElement()` para convertir un Angular component junto con sus dependencias a Custom Element. La funcion colecta todas las propiedades observables junto con la funcionalidad de Angular que el navegador necesita para crear y destruir instancias, y detectar y responder a cambios. 

<amp-img width="600" height="387" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-10-16-angular-elements%2FcustomElement2.png?alt=media&token=3e9ad796-8e4a-4ae1-943d-f4a28aeade55"></amp-img>

- El API de transformación busca por propiedades `input`, y define los atributos correspondientes para el Custom Element. El resultante atributo usa dash-separated lowercase. Por ejemplo, para un componente con `@Input('myInputProp') inputProp`, el correspondiente custom element define un atributo `my-input-prop`.

- El API de transformación envia los `outputs` de los componentes como [HTML Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), con el nombre del custom event emparejando el `output name`. Por ejemplo, para un componente con `@Output() valueChanged = new EventEmitter()`, el correspondiente custom element enviara eventos con el nombre `valueChanged` y la información emitida sera guardada en el detalle de la propiedad del evento.

{% include blog/subscribe.html %}

## Implementando Angular Elements

Lo primero es desde un proyecto en Angular, ejecutar:

````
$ ng add @angular/material
````



Si este contenido te parece útil y me quieres ayudar a hacer mas considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)