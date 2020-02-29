---
layout: post
title: "Iterables en ES6"
date: 2020-03-18
categories: ecmascript
author: carlosrojas
tags: [ecmascript]
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-27-intro-es6%2Fecmascript.png?alt=media&token=335db467-ce9e-4e06-9a2d-fc86a785df0b"
editname: 'javascript/2020-03-18-Iterables-Looping.md'
versions:
  - title: 'EcmaScript'
    number: '6'
---

> Existe ocasiones en las que obtenemos `Objetos` y/o `Arrays` para las cuales queremos recorrer cada uno de sus elementos para realizar operaciones, usualmente, utilizamos  el `forEach` el cual es un metodo que nos ha funcionado pero en `ES6` tenemos el `for in` y el `for of`.

<amp-img width="1024" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-27-intro-es6%2Fecmascript.png?alt=media&token=335db467-ce9e-4e06-9a2d-fc86a785df0b"></amp-img>

{% include general/net-promoter-score.html %} 

Miremos primero como se hace tradicionalmente el recorrido de un conjunto de elementos.

```js
const data = ['item1', 'item2', 'item3', 'item 4'];

data.forEach(
  (item)=> {
    console.log(item);
  }
)
```

y vemos que en la consola nos muestra los elementos.

<amp-img width="3360" height="352" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-01-28-Iterables-Looping%2FScreen%20Shot%202019-01-29%20at%205.41.53%20AM.png?alt=media&token=1d5051ee-e41e-48b5-90b6-964bf8f0de72"></amp-img>


Adicionalmente, tambien contabamos con el `for` el cual personalmente me parecia un mecanismo mas intuitivo para los ciclos si conocias otros lenguajes. Lo que hicimos anteriormente lo podemos replicar como:

```js
const data = ['item1', 'item2', 'item3', 'item 4'];

for(let i=0; i < data.length; i++) {
  console.log(data[i]);
}
```

y podemos observar un resultado similar.

<amp-img width="3358" height="412" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-01-28-Iterables-Looping%2FScreen%20Shot%202019-01-29%20at%206.49.42%20AM.png?alt=media&token=20c2c24e-9319-431a-8cea-a97f07ea4ff2"></amp-img>

Actualmente, a los que mostramos anteriormente que nos van a ser de ayuda en la mayoria de los casos tenemos dos tipos mas  de  `for` los cuales nos van a dar mas herramientas para poder recorrer elementos iterables, estos son el `for...in` y el `for...of`.

```js
const data = ['item1', 'item2', 'item3', 'item 4'];

for(const index in data) {
  console.log(data[index]);
}
```

<amp-img width="1440" height="648" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-01-28-Iterables-Looping%2FScreen%20Shot%202019-01-29%20at%206.56.43%20AM.png?alt=media&token=b8b38893-2c80-4499-be58-7f1ed602292a"></amp-img>

{% include blog/subscribe.html %}

```js
const data = ['item1', 'item2', 'item3', 'item 4'];

for(const item of data) {
  console.log(item);
}
```

<amp-img width="1870" height="598" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-01-28-Iterables-Looping%2FScreen%20Shot%202019-01-29%20at%207.00.43%20AM.png?alt=media&token=46dfe3d1-ef87-4b15-879f-ef3994af74f3"></amp-img>

tambien podriamos capturar su posicion de la siguiente manera


```js
const data = ['item1', 'item2', 'item3', 'item 4'];

for(const [i, item] of data.entries()) {
  console.log("Posicion: " + i);
  console.log("Item: " + item);
}
```

<amp-img width="1702" height="626" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-01-28-Iterables-Looping%2FScreen%20Shot%202019-01-29%20at%207.03.22%20AM.png?alt=media&token=5811d022-b897-4a50-b9bc-cf740269ef39"></amp-img>


Ahora miremos un poco como seria el uso de los `for...in` y `for...of` con objetos.

Lo primero es entender que los objetos son un poco distintos de los arrays, el `for...in` funciona sin problema.

```js
const data = {
  prop1: 'item1', 
  prop2: 'item2', 
  prop3: 'item3', 
  prop4: 'item 4'
};

for(const prop in data) {
  const value = data[prop];
  console.log("Item: " + value);
}
```

<amp-img width="991" height="290" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-01-28-Iterables-Looping%2FScreen%20Shot%202019-01-29%20at%204.19.53%20PM.png?alt=media&token=8b77d99f-8be0-4a00-93ed-360c42b7231c"></amp-img>

Pero para hacer que nos funcione el `for...of` debemos iterar sobre el resultado del `Object.keys(data)`

```js
const data = {
  prop1: 'item1', 
  prop2: 'item2', 
  prop3: 'item3', 
  prop4: 'item 4'
};

for(const prop of  Object.keys(data)) {
  const value = data[prop];
  console.log("Item: " + value);
}
```

<amp-img width="773" height="316" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2019-01-28-Iterables-Looping%2FScreen%20Shot%202019-01-29%20at%204.20.28%20PM.png?alt=media&token=6c47f288-d4c9-4428-a08b-86c380aa95fb"></amp-img>

Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)