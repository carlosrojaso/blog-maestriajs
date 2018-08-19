---
layout: post
title: "Angular: Entendiendo ng-template"
date: 2018-08-20
tags: [angular, servicio]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-20-Angular-Templating%2Fng-template.png?alt=media&token=ec91a93f-bb4a-49f2-b032-cd381533be16"
editname: "angular/2018-08-20-Angular-Templating.md"
versions:
  - title: 'Angular CLI'
    number: '6.1.1'
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-20-Angular-Templating%2Fng-template.png?alt=media&token=ec91a93f-bb4a-49f2-b032-cd381533be16"></amp-img>

{% include general/net-promoter-score.html %} 

> Cuando estas construyendo interfaces complejas como por ejemplo multiples forms y tablas con los que tus usuarios van a interactuar algo como `ngIf` deja de ser suficiente por claridad y escalabilidad es aquí donde `ng-template` resulta útil.

<!--summary-->

## ¿ Que es template ?

Dentro del mundo del desarrollo Web siempre se encuentra la necesidad de compartir piezas de `html` en varias vistas de una WebApp recientemente, con la llegada de los [Web Components](https://www.webcomponents.org/) podemos encontrar la implementación de `template` para poder reutilizar estas estructuras en diferentes lugares. Su implementación en Vanilla Javascript y HTML.

```html
{% raw %}
<template id="mytemplate">
  <div>Hola soy un template</div>
</template>
{% endraw %}
```

y para usarla seria algo como

```js
var t = document.querySelector('#mytemplate');
var clone = document.importNode(t.content, true);
document.body.appendChild(clone);
```

## ¿ Que es ng-template ?

Es una directiva que hace parte del `@angular/core` y como su nombre lo indica representa a una plantilla en `Angular`. Aunque no lo creas si has usado algo como `ngIf`, `ngFor`, o `ngSwitch` ya has usado `ng-template` esto es debido a que Angular por debajo la utiliza para hacer su magia. Prueba algo sencillo.

```html

<ng-template>
  <div>Hola soy un ng-template</div>
</ng-template>

```

Notaras que no se renderiza nuestro template y esto es debido a que es una definición de `ng-template` pero no se esta usando algo asi como el primer ejemplo.

entonces, podemos decir que `ng-template` es la propia implementación de `template` de Angular.

## ¿ Como usamos ng-template ?

Un ejemplo sencillo donde es util el uso de `ng-template` es en algo tan comun como un loader.

```html

<div [ngIf]="status" [ngIfElse]="loading">
   <div>
     Hola soy un ng-template
   </div>
</div>

<ng-template #loading>
    <div>Cargando...</div>
</ng-template>

```

Aca utilizamos `ngIf` para chequear si el estado de nuestra vista esta listo o mostramos un mensaje de Cargando...

{% include blog/subscribe3.html %}w

## La directiva ng-container

`ng-container` es una directiva que principalmente nos da un lugar donde inyectar `ng-template` sin tener que agregar elementos extras en el DOM y sin crear elementos que posiblemente puedan afectar nuestro CSS. Su uso es algo como esto:

```html

<ng-container *ngTemplateOutlet="loading"></ng-container>

```

Puedes observar que aca estamos usando la directiva `ngTemplateOutlet` esta nos permite cargar las plantillas que hemos creados anteriormente en este contenedor.

## El contexto dentro de los template.

Dentro de `ng-template` tenemos acceso a las mismas variables que podemos observar por fuera del `ng-template` en el que fueron creadas. como por ejemplo `status` pero cada `ng-template` podria utilizar y definir sus propias variables. 

```html
{% raw %}
<ng-template #estimateTemplate let-lessonsCounter="estimate">
    <div> Approximately {{lessonsCounter}} lessons ...</div>
</ng-template>
<ng-container 
   *ngTemplateOutlet="estimateTemplate;context:ctx">
</ng-container>
{% endraw %}
```

Entonces observemos este pequeño ejemplo. aca vemos algo que es `let-` esta es una manera de crear un `Input()` para esos templates y decirle que su nombre va a ser `lessonCounter` es por esto que dentro de nuestro template podemos hacer uso del lessonCounter y la manera en que se lo estamos enviando es a través del `ngTemplateOutlet`  cuando despues del `;` le enviamos el contexto que seria nuestra variable `ctx`.

Puedes entender un poco mas a fondo en la [Documentación](https://angular.io/api/common/NgTemplateOutlet).

Bueno esto es todo por el dia de hoy, espero haya sido de utilidad :)