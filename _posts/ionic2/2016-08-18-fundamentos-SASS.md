---
layout: post
title: "Fundamentos de SASS"
date: 2016-08-18
tags: [ui]
categories: ionic2
author: carlosrojas
cover: "/images/posts/ionic2/2016-08-18-fundamentos-sass/cover.jpg"
---

Como hablamos [anteriormente](https://www.ion-book.com/blog/ionic2/custom-colors/) la manera de personalizar colores en nuestras vistas en Ionic es a traves de los archivos SASS.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2016-08-18-fundamentos-sass/cover.jpg"></amp-img>

Como hablamos [anteriormente](https://www.ion-book.com/blog/ionic2/custom-colors/) la manera de personalizar colores en nuestras vistas en Ionic es a traves de los archivos SASS.

En este post vamos a hablar sobre los Fundamentos de SASS, para que de esta manera no tengamos problemas al realizar nuestras modificaciones.

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50 offset-md-25 offset-lg-25">
    <amp-img width="427" height="320" layout="responsive" src="/images/posts/ionic2/2016-08-18-fundamentos-sass/logo.png" alt="sass"></amp-img>
  </div>
</div>

## ¿Qué es SASS?

SaSS es una forma de escribir hojas de estilos (CSS) con algunas mejoras que permiten tener una mejor estructura y hacerlo mas escalable.

## ¿Por qué usar SASS?

Ahorrar tiempo a mediano plazo y proyectos mas escalables.

## ¿Cómo usar SASS?

Ionic por defecto maneja el uso de SASS desde tu proyecto, entonces, no debes preocuparte :)

## Fundamentos

En un proyecto con Ionic debes tener en cuenta que existen dos archivos importantes:
 
1. `src/themes/variables.scss`: Este será el archivo donde definimos las variables globales de la aplicación.
1. `src/app/app.scss`: Este será el archivo donde definimos los estilos y reglas de css que igualmente serán globales en la aplicación.
 
Luego tendremos un archivo `.scss` por cada página y componente que creemos en para la aplicación.

### Variables

Las variables permiten asignar valor a cualquier serie de propiedades y de esta manera hacer cambios rapidos sobre la apariencia solamente modificando
estas. Las variables utilizan `$`. Un ejemplo:

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

SASS tambien ofrece la capacidad de importar, lo cual  crea una version completa de todos los modulos que hemos importado permitiendo utilizar una estructura modular en nuestro proyecto. Un ejemplo puede ser:

```css
// base.scss

@import 'reset';

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

### Parciales

Cada vez que creamos una versión un archivo a traves de importaciones esto crea copias de cada archivo en css, con los parciales le decimos a SASS que no cree una versión indepentiente de ese archivo.
Lo único que debemos hacer es colocar `_` en el nombre para que se entienda que ese archivo no sera convertido.

```css
_reset.scss
```

### Mixins

Los Mixins te permiten crear grupos de código que estas pensando en reutilizar a través de la definición de tu CSS. Un ejemplo claro son las definiciones de CSS3 para cada navegador.

```css
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
     -moz-border-radius: $radius;
      -ms-border-radius: $radius;
          border-radius: $radius;
}

.box { @include border-radius(10px); }
```

{% include blog/subscribe.html %}

### Herencia/extend

Con esta característica podemos utilizar definiciones completas de un elemento en otros.

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

Con el uso de operadores `+`,`-`,`*`,`/` podemos realizar calculos sobre los tamaños de los elementos.

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

Bueno espero esta información sea de utilidad y ya estas listo trabajar con SASS en Ionic.