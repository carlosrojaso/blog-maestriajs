---
layout: post
title: "Fundamentos de SASS"
date: 2016-08-18
tags: [ui, ionic2]
categories: ionic2
author: carlosrojas
cover: "http://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png"
---

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="427" height="320" layout="responsive" src="http://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png" alt="firebase-database-and-ionic-2"></amp-img>
  </div>
</div>

Como hablamos [anteriormente]({{site.urlblog}}/ionic2/personalizando-vistas) la manera de personalizar nuestras vistas en ionic 2 es a traves de los archivos SASS.

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

```css
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

### Anidamiento

Vas a poder organizar mejor tus archivos de estilo gracias a las opciones de anidamiento que te brinda SASS. Un ejemplo:

```css
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
```

### Importar

SASS tambien ofrece la capacidad de importar, lo cual  crea una version completa de todos los modulos que hemos importado
permitiendo utilizar una estructura modular en nuestro proyecto en el CSS. Un ejemplo puede ser:

```css
// base.scss

@import 'reset';

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

### Parciales

Cada vez que creamos una version un archivo a traves de importaciones esto crea copias de cada archivo en css. Con los parciales le decimos a SASS que no cree una version indepentiente de ese archivo en CSS.
Lo unico que debemos hacer es colocar <code>_</code> en el nombre para que se entienda que ese archivo no sera convertido.

```css
_reset.scss
```

### Mixins

Los Mixins te permiten crear grupos de codigo que estas pensando en reutilizar a través de la definicion de tu CSS. Un ejemplo claro son las definiciones de CSS3 para cada navegador.

```css
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }
```

### Herencia/extend

Con esta caracteristica podemos utilziar definiciones completas de un elemento en otros.

```css
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
```

### Operadores

Con el uso de operadores <code>+</code>,<code>-</code>,<code>*</code>,<code>/</code> podemos realizar calculos sobre los tamaños de los elementos.

```css
.container { width: 100%; }


article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}

aside[role="complementary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

Bueno espero esta info sea de utilidad y ya estas listo para crear increible apariencia en Ionic.