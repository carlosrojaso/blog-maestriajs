---
layout: post
title: "¿ Como crear un componente en Angular ?"
date: 2018-11-13
tags: [angular, componentes]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-12-Angular-Crear-Componentes%2Fcover.png?alt=media&token=f9f45f29-effe-43e2-88c9-1ae7a2820d41"
editname: "angular/2018-11-12-Angular-Crear-Componentes.md"
versions:
  - title: 'Angular CLI'
    number: '6.1.1'
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-12-Angular-Crear-Componentes%2Fcover.png?alt=media&token=f9f45f29-effe-43e2-88c9-1ae7a2820d41"></amp-img>

{% include general/net-promoter-score.html %} 

> Los componentes son la manera en que construimos nuestras Apps diviendo la funcionalidad en pequeñas piezas que luego al unirlas construyen una vista de un usuario.

<!--summary-->

## ¿ Que es un componente en Angular ?

Un componente en Angular es una combinación de un archivo `html` con un `ts` y algunas veces `scss` para crear un elemento con caracteristicas propias tanto de comportamiento como de apariencia que se puede mostrar en un navegador. Lo puedes pensar como en una pieza de lego la cual vas juntando con otras piezas de lego para formar algo interesante para interactuar con un usuario.

<amp-img width="960" height="540" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-12-Angular-Crear-Componentes%2F1.png?alt=media&token=e8cbfe6f-f359-4a09-8289-696ab8dabf3d"></amp-img>

Adicionalmente, si has visto las otras tecnologias lideres en el area de Frontend en la actualidad tambien utilizán un acercamiento de `Web components` y esto me hizo investigar un poco mas sobre el porque este enfoque tenia sentido y encontre algo escrito por [Brad Frost](http://bradfrost.com/) en el cual el plantea que los `Web Componentes` obedecen a un sistema que el ha llamado `Diseño Atomico`.

## ¿ Que es el Diseño Atomico ?

El diseño atomico es una metodologia para crear sistemas de diseño. Existén 5 distintos niveles en el diseño atomico:

<amp-img width="1024" height="768" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-12-Angular-Crear-Componentes%2Fatomic-design.png?alt=media&token=ae4828f9-5f50-47ef-9b8c-d151eed21db9"></amp-img>

**Atomos.** Son los bloques elementales de la materia. Aplicados a nuestras interfaces Web los `atomos` son nuestras etiquetas `HTML`, tal como etiquetas de formularios, un `input` o un `button`.

<amp-img width="1024" height="768" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-12-Angular-Crear-Componentes%2Fatoms.jpg?alt=media&token=06bf66ed-1d2b-4080-88cd-54d022e097e7"></amp-img>

**Moleculas.** Las moleculas son un grupo de atomos juntos que forman un elemento compuesto que tiene sus propias proiedades y sirve como piedra angular de nuestro `diseño atomico`.

Podemos pensar por ejemplo en los atomos `label`, `input` y `button` los cuales por si solos no son muy útiles, pero si los conviertes en una `molecula` puedes crear algo super útil como un formulario de busqueda.

<amp-img width="1024" height="768" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-12-Angular-Crear-Componentes%2Fmolecule.jpg?alt=media&token=d8985337-9234-483a-b3a7-2ff7fd8ab57d"></amp-img>

**Organismos.** Los organismos son grupos de moleculas unidas para formar algo relativamente complejo de una interfaz.

<amp-img width="1024" height="113" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-12-Angular-Crear-Componentes%2Forganism2.jpg?alt=media&token=78deadf7-0d07-4f8c-826b-a9aa12ddd48a"></amp-img>

Ir construyendo de `moleculas` a `organismos` fomenta la creación de componentes standalone, portables, y reusables.

{% include blog/subscribe.html %}

**Plantillas.** Las plantillas son grupos de organismos unidos para formar paginas.

<amp-img width="1024" height="113" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-12-Angular-Crear-Componentes%2Ftemplate1.jpg?alt=media&token=47d6638d-8acc-46b5-9c8d-2dea104696a7"></amp-img>

las plantillas son concretas y proveen de contexto a todas las moleculas y organismos abstractos.

**Paginas.** Las paginas son instancias especificas de las plantillas. 

<amp-img width="1024" height="768" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-12-Angular-Crear-Componentes%2Fpage1.jpg?alt=media&token=a180527e-f658-405e-9e77-f5fa44a1e3d1"></amp-img>

Las paginas son el más alto nivel de fidelidad y es donde nuestros usuarios pasaran la mayoria del tiempo porque son el resultado mas tangible.

Volviendo a `Angular` los componentes estan acompañados del decorador `@Component` y tiene un aspecto asi:

```ts
@Component({
  selector: 'mi-componente',
  templateUrl: 'mi-componente.html',
  styleUrls: ['mi-componente.scss']
})
```

## ¿ Como creamos un Componente ? 

Crear un Componente es muy facil solo debemos utilizar Angular CLI y ejecutar el siguiente comando.

````
$ ng generate component mi componente.
````

y de esta manera solo debes importar este componente en los otros bloques donde desees utilizarlo y en la plantillas hacer algo como:

```html
<mi-componente></mi-componente>
```

Bueno esto es todo por el dia de hoy, espero haya sido de utilidad :)



