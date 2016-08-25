---
layout: post
title: "Fundamentos de SASS"
date: 2016-08-18
tags: ionic2 sass
categories: ionic2
comments: true
author: carlosrojas
cover: "http://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png"
url: "http://www.ion-book.com/ionic2/fundamentos-SASS"
---

<img class="img-responsive" src="http://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png" alt="sass logo">

Como hablamos [anteriormente](http://www.ion-book.com/ionic2/personalizando-vistas) la manera de personalizar nuestras vistas en ionic 2 es a traves de los archivos SASS.

En este post vamos a hablar sobre los Fundamentos de SASS, para que de esta manera no tengamos problemas al realizar nuestras modificaciones.

## Que es SASS?

SaSS es una forma de escribir hojas de estilos (CSS) con algunas mejoras que permiten tener una mejor estructura y hacerlo mas escalable.

## Por que usar SASS?

Ahorrar tiempo a mediano plazo y proyectos mas escalables.

## Como usar SASS?

Ionic por defecto maneja el uso de SASS desde tu proyecto, entonces, no debes preocuparte :)

## Fundamentos

### Variables

Las variables permiten asignar valor a cualquier serie de propiedades y de esta manera hacer cambios rapidos sobre la apariencia solamente modificando
estas. Las variables utilizan <code>$</code>. Un ejemplo:

<pre>
<code>
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
</code>
</pre>

### Anidamiento

Vas a poder organizar mejor tus archivos de estilo gracias a las opciones de anidamiento que te brinda SASS. Un ejemplo:

<pre>
<code>
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
</code>
</pre>

### Importar

SASS tambien ofrece la capacidad de importar, lo cual  crea una version completa de todos los modulos que hemos importado
permitiendo utilizar una estructura modular en nuestro proyecto en el CSS. Un ejemplo puede ser:

<pre>
<code>
// base.scss

@import 'reset';

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
</code>
</pre>

### Parciales

Cada vez que creamos una version un archivo a traves de importaciones esto crea copias de cada archivo en css. Con los parciales le decimos a SASS que no cree una version indepentiente de ese archivo en CSS.
Lo unico que debemos hacer es colocar <code>_</code> en el nombre para que se entienda que ese archivo no sera convertido.

<pre>
<code>
_reset.scss
</code>
</pre>

### Mixins

Los Mixins te permiten crear grupos de codigo que estas pensando en reutilizar a través de la definicion de tu CSS. Un ejemplo claro son las definiciones de CSS3 para cada navegador.

<pre>
<code>
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }
</code>
</pre>

### Herencia/extend

Con esta caracteristica podemos utilziar definiciones completas de un elemento en otros.

<pre>
<code>
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}

.warning {
  @extend .message;
  border-color: yellow;
}
</code>
</pre>

### Operadores

Con el uso de operadores <code>+</code>,<code>-</code>,<code>*</code>,<code>/</code> podemos realizar calculos sobre los tamaños de los elementos.

<pre>
<code>
.container { width: 100%; }


article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complementary"] {
  float: right;
  width: 300px / 960px * 100%;
}
</code>
</pre>

Bueno espero esta info sea de utilidad y ya estas listo para crear increible apariencia en Ionic.