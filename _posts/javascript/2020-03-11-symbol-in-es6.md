---
layout: post
title: "El tipo Symbol en ES6"
date: 2020-03-11
categories: ecmascript
author: carlosrojas
tags: [ecmascript]
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-27-intro-es6%2Fecmascript.png?alt=media&token=335db467-ce9e-4e06-9a2d-fc86a785df0b"
editname: 'javascript/2020-03-11-symbol-in-es6.md'
versions:
  - title: 'EcmaScript'
    number: '6'
---

> En JavaScript existe algo que se llaman las `primitivas` estos es datos que No son [Object](https://developer.mozilla.org/en-US/docs/Glossary/object) y no tienen metodos. Con ES6 se incluye una nueva primitiva `Symbol`. 

<amp-img width="1024" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-27-intro-es6%2Fecmascript.png?alt=media&token=335db467-ce9e-4e06-9a2d-fc86a785df0b"></amp-img>

{% include general/net-promoter-score.html %} 

# ¿ Que son las Primitivas ? 

Una forma sencilla de entender las primitivas es pensar en tipos de datos que no son `Objetos`, ademas, que representan el nivel más bajo de la implementación del lenguaje y son `inmutables` es decir, le puedes reasignar un valor a una `primitiva` pero no la puedes alterar de la misma manera que lo puedes hacer con Objetos, Arreglos y Funciones. Los 7 tipos de primitivas son: string, number, boolean, null, undefined, bigint y symbol.

```js
// Usar un metodo en el string no cambia el valor.
var bar = "baz";
console.log(bar);               // baz
bar.toUpperCase();
console.log(bar);               // baz

// Usar un metodo en el Array cambia el Array.
var foo = [];
console.log(foo);               // []
foo.push("plugh");
console.log(foo);               // ["plugh"]

// El asignamiento da a la primitiva un nuevo (No mutado) valor.
bar = bar.toUpperCase();       // BAZ
```

Es algo simple pero el entendimiento de esto nos va a ayudar mucho en nuestro dia a dia.

{% include blog/subscribe.html %}

# ¿ Que es symbol ? 

Es un tipo de dato que nos permite generar identificadores unicos en nuestro codigo. 

```js
var sym1 = Symbol('foo');
var sym2 = Symbol('foo');

sym1 === sym2 // false
```

Acá podemos ver algo importante y es el uso de la funcion `Symbol()` que devuelve un valor de tipo `symbol`.

```js
var sym1 = Symbol('foo'); // Good
var sym2 = new Symbol(); // TypeError
```

Ok, y ahora en que caso seria útil usar un `symbol`. Bueno lo puedes pensar en ocasiones donde necesitas identificadores que pueden aparecer varias veces en tu codigo y podrián confundirse con otros valores.


```js
const operators = {
  plus:         Symbol('+'),
  multiply:     Symbol('x'),
  substraction: Symbol('-'),
  division:     Symbol('/'),
};
```

Ahora con algo asi podria asegurarme que solo al utilizar los botones identificados con esos botones pueden hacer esas operaciones en lugar de enviarle un `string` que podria estar presente o confundirse en cualquier parte de nuestro codigo.

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)