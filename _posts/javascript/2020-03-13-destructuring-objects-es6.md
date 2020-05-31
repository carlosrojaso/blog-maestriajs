---
layout: post
title: "Desestructuración en ES6"
date: 2020-03-13
categories: javascript
author: carlosrojas
tags: [ecmascript]
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-27-intro-es6%2Fecmascript.png?alt=media&token=335db467-ce9e-4e06-9a2d-fc86a785df0b"
editname: 'javascript/2020-03-13-destructuring-objects-es6.md'
versions:
  - title: 'EcmaScript'
    number: '6'
---

> Existe ocasiones en las que obtenemos `Objetos` y/o `Arrays` de los cuales queremos independizar su contenido en distintas variables las cuales queremos utilizar en diferentes calculos, esto resulta facil cuando tenemos 1 o 2 datos pero cuando son muchos este proceso se vuelve muy engorroso.

<amp-img width="1024" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-27-intro-es6%2Fecmascript.png?alt=media&token=335db467-ce9e-4e06-9a2d-fc86a785df0b"></amp-img>

{% include general/net-promoter-score.html %} 

# Desestructuración de Objetos

Primero miremos el caso de los objetos y para esto analicemos un poco el siguiente escenario.

```js
const redes = {
  name: 'Carlos Rojas',
  twitter: 'https://twitter.com/carlosrojas_o',
  facebook: 'https://www.facebook.com/carlosrojas84/',
  instagram: 'https://www.instagram.com/carlosrojas_o/',
  github: 'https://github.com/carlosrojaso',
  stackoverflow: 'https://stackoverflow.com/users/3092766/carlos-rojas' 
};

// Separando esta info.

const twitter = redes.twitter; 
const facebook = redes.facebook;
const instagram = redes.instagram;
....
```

Como vez esta tarea se vuelve aburrida y propensa a errores. Entonces, es donde viene la desestrucuración al rescate. Ahora simplemente con hacer:

```js
const redes = {
  name: 'Carlos Rojas',
  twitter: 'https://twitter.com/carlosrojas_o',
  facebook: 'https://www.facebook.com/carlosrojas84/',
  instagram: 'https://www.instagram.com/carlosrojas_o/',
  github: 'https://github.com/carlosrojaso',
  stackoverflow: 'https://stackoverflow.com/users/3092766/carlos-rojas' 
};

const {twitter, facebook, instagram} = redes;

console.log(twitter);
console.log(facebook);
console.log(instagram);
```

Adicionalmente si quieres colocar tus propios alias solo debes utilizar algo asi:

```js
const redes = {
  name: 'Carlos Rojas',
  twitter: 'https://twitter.com/carlosrojas_o',
  facebook: 'https://www.facebook.com/carlosrojas84/',
  instagram: 'https://www.instagram.com/carlosrojas_o/',
  github: 'https://github.com/carlosrojaso',
  stackoverflow: 'https://stackoverflow.com/users/3092766/carlos-rojas' 
};

const {twitter: tw, facebook: fb, instagram: ig} = redes;

console.log(tw);
console.log(fb);
console.log(ig);
```

otra cosa interesante es que digamos si queremos tener las propiedades restantes almacenadas para despues, podemos usar algo como:

{% include blog/subscribe.html %}

```js
const redes = {
  name: 'Carlos Rojas',
  twitter: 'https://twitter.com/carlosrojas_o',
  facebook: 'https://www.facebook.com/carlosrojas84/',
  instagram: 'https://www.instagram.com/carlosrojas_o/',
  github: 'https://github.com/carlosrojaso',
  stackoverflow: 'https://stackoverflow.com/users/3092766/carlos-rojas' 
};

const {twitter, facebook, instagram, ...otras} = redes;

console.log(otras.instagram);
console.log(otras.github);
console.log(otras.stackoverflow);
```

# Desestructuración de Arrays

Digamos que tenemos algo parecido al ejemplo anterior pero con un `Array`.

```js
const redes = ['https://twitter.com/carlosrojas_o', 'https://www.facebook.com/carlosrojas84/' 'https://www.instagram.com/carlosrojas_o/', 'https://github.com/carlosrojaso', 'https://stackoverflow.com/users/3092766/carlos-rojas'];

// Separando esta info.

const twitter = redes[0]; 
const facebook = redes[1];
const instagram = redes[2];
....
```

Podemos utilizar basicamente las mismas opciones que con los objetos cambiando los `{ }` por `[ ]`.

```js
const redes = ['https://twitter.com/carlosrojas_o', 'https://www.facebook.com/carlosrojas84/' 'https://www.instagram.com/carlosrojas_o/', 'https://github.com/carlosrojaso', 'https://stackoverflow.com/users/3092766/carlos-rojas'];

// Separando esta info.

const [twitter, facebook, instagram] = redes;

console.log(twitter);
console.log(facebook);
console.log(instagram);
```

```js
const redes = ['https://twitter.com/carlosrojas_o', 'https://www.facebook.com/carlosrojas84/' 'https://www.instagram.com/carlosrojas_o/', 'https://github.com/carlosrojaso', 'https://stackoverflow.com/users/3092766/carlos-rojas'];

// Separando esta info.

const [twitter: tw, facebook: fb, instagram: ig] = redes;

console.log(tw);
console.log(fb);
console.log(ig);
```

```js
const redes = ['https://twitter.com/carlosrojas_o', 'https://www.facebook.com/carlosrojas84/' 'https://www.instagram.com/carlosrojas_o/', 'https://github.com/carlosrojaso', 'https://stackoverflow.com/users/3092766/carlos-rojas'];

// Separando esta info.

const [twitter: tw, facebook: fb, instagram: ig, ...otras] = redes;

console.log(otras); // ['https://github.com/carlosrojaso', 'https://stackoverflow.com/users/3092766/carlos-rojas']
```

# Cambiando valores.

Por último existe un escenario el cual resulta muy util y que podemos solucionar con la desestructuración y es cuando queremos intercambiar los valores de dos variables, para esto soliamos usar una variable temporal.

```js
var valorUno = 10;
var valorDos = 20;
var _tmp; // variable temporal

_tmp = valorUno;
valorUno = valorDos;
valorDos = _tmp;
```

Pero ahora usando la destructuracion podemos hacer algo como lo siguiente:

```js
var valorUno = 10;
var valorDos = 20;

[valorUno, valorDos] = [valorDos, valorUno];

console.log(valorUno); // 20
console.log(valorDos); // 10
```

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)