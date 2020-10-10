---
layout: post
title: "Web Components en Ionic"
keywords: "Ionic"
date: 2017-09-06
tags: [ionic2, news]
categories: news
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fcover.jpg?alt=media&token=9b791a14-8643-4990-a232-114c29931807"
---
> Vamos a hablar más a detalle sobre stencil y sobre todo en algunos detalles dichos en la conferencia sobre stencil en la [Polymer Summit 2017](https://summit.polymer-project.org/).

<img width="1200" height="675" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fcover.jpg?alt=media&token=9b791a14-8643-4990-a232-114c29931807"> 

 

Como carlos lo mencionó en el artículo anterior, [stencil](https://www.ion-book.com/blog/news/stencil/){:target="_blank"} en el nuevo proyecto creado por el equipo de ionic.

En este artículo quiero resaltar los puntos más importante tocados en la conferencia

## Web Components en Ionic

Ionic ha iniciando como SDK para múltiples plataformas orientando en principio a apps que van estar en un tienda de aplicaciones como iTunes o Google Play.

<img width="1276" height="675" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen1.png?alt=media&token=1f0c82ef-d933-4e30-a21b-04bb54c6e11a"> 

Recordemos que ionic tiene una visión clara sobre la cual construyen el framework.

> One code base. Running everywhere.

Ionic es una empresa que le apuesta enteramente a las tecnologías web, es decir no hace parte de los frameworks que tienen una solución cross-platform como react native, nativescript o xamarin que funcionan de forma distinta, ionic usa la tecnología web para cumplir esta misión. Usa todo el poder de la web y lo que esto ha traído en los últimos años como PWA, Services workers, Web Components, Javascript, Html, Css, Web Animations Api etc. Por eso con ionic puedes desarrollar apps para Android, IOS, PWA y hasta apps con Electron.

<img width="954" height="536" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen3.png?alt=media&token=55850182-605d-4bb9-8b73-898f72f3aef1">

Ahora si miramos un poco atrás ionic desde el principio tenía el objetivo de crear un SDK amigable para los desarrolladores y de alto rendimiento, por esta razón eligieron a Angular para poder brindar el SDK de ionic, además Angular sigue siendo uno de los frameworks más robustos y completos. Sin embargo estos últimos años también hay otros increíbles frameworks como Vue.js, React, Ember etc.

<img width="964" height="495" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen2.png?alt=media&token=2af8da48-9adf-400e-9b5c-bb5b16eb7b9a">

El equipo de ionic quiere poder llevar su tecnología a muchos más desarrolladores, pero soportar SDK por cada framework es difícil, una solución es poder hacer que los componentes de ionic sean Web Components nativos ya que es el pilar en el cual está basado todos los frameworks actuales. Asi ionic podria estar disponible para cualquier otro framework.

<img width="1276" height="679" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen5.png?alt=media&token=67521ede-ee6b-4036-9e32-3623f1aa7697">

<img width="1272" height="674" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen4.png?alt=media&token=a7e933b3-c02d-45c4-afb3-896585e18e3b">

Con Web Components no solo hacen que se puedan usar el SDK de ionic en cualquier otro framework además logran una mejora muy significativa en rendimiento.

<img width="1272" height="671" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen6.png?alt=media&token=348e6fe6-d55f-4006-9e14-a243e733c2ec">

Pero al desarrollar Web Components nativos se pierden algunas características que son esenciales al momento de desarrollar.

<img width="960" height="475" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen7.png?alt=media&token=2ca8a723-d352-401c-9f35-527e6fcce69e">

Y boom! por eso el equipo de ionic anuncia stencil.

<img width="1272" height="675" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen8.png?alt=media&token=1e159c05-20e0-435d-b950-c0a1cc8a59d0">

Stencil es un compilador que toma archivos TSX ( JSX + TS ) y los convierte en Web components nativos y adicionalmente no importa el framework que utilices Angular, React o VueJs 

<img width="960" height="477" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen9.png?alt=media&token=b1e7f69c-0d92-4f28-9c06-c221fba335c3">
<img width="959" height="477" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen10.png?alt=media&token=5df34c14-0983-404f-9610-393ceb3acbc3">

Un componente en Stencil podria ser así:

```ts
import { Component, Prop } from '@stencil/core';
@Component({
  tag: 'my-first-component',
  styleUrl: 'my-first-component.scss'
})
export class MyComponent {
  // Indicate that name should be a public property on the component
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

Y luego que esté compilado por stencil podría usarse como un simple tag html en cualquier framework, así:

```html
<my-first-component name="nicobytes"></my-first-component>
```



Además los web components vienen con lazy loading por defecto.

<img width="963" height="473" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen11.png?alt=media&token=2a98a0b4-3588-4b72-a7a7-c987ba64a020">

Y ya finalizando nos dicen para quienes está enfocado stencil.

<img width="961" height="475" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-06-stencil-conf%2Fscreen12.png?alt=media&token=f969280c-4809-4c0c-9ced-b27fcdd8fdc6">

Puedes ver la conferencia completa aqui: [https://www.youtube.com/watch?v=UfD-k7aHkQE](https://www.youtube.com/watch?v=UfD-k7aHkQE){:target="_blank"}

### ¿Ya puedo empezar a utilizarlo?

Si, puedes ingresar a su sitio oficial y seguir los pasos de instalacion [aquí](https://stenciljs.com/docs/getting-started).

### ¿Donde puedo verlo funcionando?

El sitio oficial de [stencil](https://stenciljs.com/) esta hecho con esta tecnologia. ademas, deberias de ver los [demos](https://stenciljs.com/demos) y en especial [este](https://stencil-fiber-demo.firebaseapp.com/) donde se muestra una solución a un problema que viene a resolver React Fiber pero que ya funciona muy bien con Stencil. 

Esta tecnologia es muy prometedora y lo mejor de todo es que la vamos a tener dentro de Ionic. Que piensas? no te olvides de dejar tu opinion.

### Conclusiones (desde mi punto de vista.)

1. Los frameworks actuales soportan la creación de web components, pero en este momento ya se puede hacer de forma nativa y si el peso que trae un framework.

1. Stencil no es nuevo framework es un compilador que nos arroja vanilla  web components que pueden ser usados en cualquier framework.

1. El las futuras versiones de ionic los componentes de ionic estarán con stencil.

1. Los Web Components compilados por stencil son más rápidos que cualquier otro framework por el hecho de ser nativos para el navegador.

1. Yo personalmente trabajo mucho con Angular y no lo cambiare pero esta bueno que con stencil los componentes no solo sean más rápidos, si no que los pueda usar desde otro framework. Es hora de cambiar el centro de atención en la larga e interminable discusión de que framework es mejor que otro, sin duda cada uno tiene sus puntos fuertes y diferentes maneras de hacer las cosas y estamos seguros que en el framework que escogas si te especializas y lo aprendes profesionalmente podrás lograr cosas increíbles, podemos mostrarte asombrosas apps con miles de usuarios en Angular, react y vue. El punto aquí es si elegís cualquiera de ellos no te vas arrepentir siempre y cuando lo aprendas de una forma avanzada. 

