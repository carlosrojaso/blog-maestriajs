---
layout: post
title: "Principios de JavaScript"
date: 2020-09-18
categories: javascript
author: carlosrojas
tags: [ecmascript, js]
cover: "https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-27-intro-es6%2Fecmascript.png?alt=media&token=335db467-ce9e-4e06-9a2d-fc86a785df0b"
editname: 'javascript/2020-09-16-principios-js.md'
versions:
  - title: 'EcmaScript'
    number: '6'
---

> JS es el lenguaje de programación de la Web, aunque utilizamos la palabra **JavaScript** este termino le pertenece a la empresa ORACLE pero es ampliamente utilizado, **EcmaScript** es la definición abierta de **JS** y por eso encontraras en articulos el uso de **ES5** o **ES6** esto al final es para significar el mismo lenguaje de programación.

<amp-img width="1024" height="450" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/vueclassroom.appspot.com/o/2018-12-27-intro-es6%2Fecmascript.png?alt=media&token=335db467-ce9e-4e06-9a2d-fc86a785df0b"></amp-img>

{% include general/net-promoter-score.html %}

Continuando con nuestro ejemplo del edificio, digamos que ya tenemos nuestra estructura (HTML), hemos agregado los detalles (CSS), ahora queremos que nuestro edificio interactue con las personas utilizando mecanismos que hagan su vida mas facil en nuestro proyecto, pensemos en agregar ascensores, alcantarillado, electricidad, servicios de comunicación entre otros.

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-09-16-principios-js%2F3.jpg?alt=media&token=8d5d0dcb-998d-4b6b-a5d0-b73f7b321348"></amp-img>

Realizar toda la interacción entre nuestro proyecto y el usuario lo logramos programando comportamiento y para eso vamos a utilizar **JavaScript**.

# Bases de Programación.

A continuación vamos a entender algunos conceptos que van a ser de uso frecuente en nuestra nueva vida como desarrollador.

## ¿Que es la programación?

La programación informática es el arte de indicarle a una computadora lo que tiene que hacer mediante un conjunto de instrucciones.

## ¿Qué es un algoritmo?

Un algoritmo son una serie de instrucciones que le indican a una computadora como comportarse `salidas` con ciertas `entradas`. Podemos pensar en una receta para realizar un pastel, esta receta necesita ingredientes `entradas`, unos pasos que debemos seguir como se indica `instrucciones` y un producto que vamos obtener al final que sera nuestro pastel `salidas`.

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-09-16-principios-js%2F4.jpg?alt=media&token=30f6c91f-81be-400a-b90b-981b02eaf1ad"></amp-img>

## ¿Qué es una variable?

Una variable es un lugar en nuestro programa que utilizamos para almacenar información y le asignamos un nombre para identificarlo y poder usarla dentro de nuestra receta.

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-09-16-principios-js%2F5.jpg?alt=media&token=2fa6a7d4-785e-4262-845b-3035a937fcb4"></amp-img>

## ¿Qué es una función?

Es un mecanismo dentro de nuestra receta a la cual le enviamos algunos parametros y esperamos algún resultado.

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-09-16-principios-js%2F6.jpg?alt=media&token=1e0d57f4-52eb-4945-81ac-d7106f2df317"></amp-img>

## ¿Qué es un Array?

Un array es un lugar en nuestro programa que vamos a utilizar para almacenar información de un conjunto de valores.

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-09-16-principios-js%2F8.jpg?alt=media&token=92d64ef8-7793-4b31-bf3b-a135ebdea648"></amp-img>

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-09-16-principios-js%2F9.jpg?alt=media&token=6f01259a-af64-4580-93b1-4182b6dc0383"></amp-img>

## ¿Qué es un condicional?

Un comparación es un mecanismo que utilizamos en nuestro programa para realizar alguna decisión basado en el estado que tienen algunos elementos en nuestra receta para decidir si tomamos un camino u otro.

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-09-16-principios-js%2F10.jpg?alt=media&token=2e38fec3-8294-4230-b528-bc19bb5c308b"></amp-img>

## ¿Qué es una iteración?

Una iteración es una repetición que realizamos sobre algun elemento hasta que cumplido una condición se detiene. Normalmente, lo usamos para hacer tareas repetitivas dentro de nuestro programa.

<amp-img width="720" height="405" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2020-09-16-principios-js%2F11.jpg?alt=media&token=443ca23b-063e-46a9-9fb1-b3a67603fc2d"></amp-img>

# En JavaScript.

## Como usar Variables

En JavaScript podemos declarar variables de la siguiente manera:

```js
var x = 5;
let y = 6;
const z = x + y; // el valor de z es igual a 11
```

Se recomienda usar `let` en lugar de `var` en la mayoria de los escenarios. `var` fue la forma tradicional de declarar variables en JavaScript.

`const` se utiliza para declarar variables que se esperan no cambien de valor.

{% include blog/subscribe.html %}

## Tipos de datos en JavaScript.

JS es un lenguaje tipado dinámicamente, es decir, Si tienes experiencia con Java o C++ recordaras que te toca decir con antelación que tipo de dato manejara la variable, en JS, No.

En JS podemos separar los tipos de datos en Primitivas y No Primitivas.

Primitivas son valores que no son objetos y no tienen metodos.

`string` — Usado para valores de texto.

`number` — Usado para valores numéricos.

`boolean` — Usado para valores logicos (true y false).

`null` — Usado para representar un sin valor. Es un caso especial y representa un objeto sin valor.

`undefined` — Una variable a la que nunca se le asigno un valor.

`symbol` — Un valor unico.

`bigint` — Un valor numerico muy grande.

No Primitivas son objetos y podemos decir que los principales son:

`Object` — Valor que tiene un objeto.

`function` —  Valor especial que puede tener una variable.

## Como escribir funciones

La forma basica para escribir una función en JavaScript es:

```js
function nombre(parametro1, parametro2, parametro2) {
  // Instrucciones a ser ejecutadas.
}
```

Un ejemplo puede ser una función que sume dos numeros.

```js
function suma(num1, num2) {
  return num1 + num2;
}
```

En este ejemplo, la función nos va a devolver de los numeros que le enviemos.

La forma de llamar esta función en nuestro codigo seria:

```js
const a = 5;
const b = 6;

suma(a,b); // devolvera 11

```

## Como usar Condicionales

En JavaScript podemos escribir condicionales principalmente de las siguientes maneras:

```js

// Si tenemos una condicion

if (condition) {
  //  block of code to be executed if the condition is true
}

// Si tenemos una condicion y un comportamiento por defecto

if (condition) {
  //  block of code to be executed if the condition is true
} else { 
  //  block of code to be executed if the condition is false
}

// Si tenemos varias condiciones y un comportamiento por defecto

if (condition1) {
  //  block of code to be executed if condition1 is true
} else if (condition2) {
  //  block of code to be executed if the condition1 is false and condition2 is true
} else {
  //  block of code to be executed if the condition1 is false and condition2 is false
}
```

Un ejemplo del uso de condicionales puede ser el siguiente:

```js

if(edad >= 18) {
  console.log('eres mayor de edad');
} else {
  console.log('eres menos de edad');
}
```

En este ejemplo estamos utilizando los condicionales para saber si la edad de un usuario es mayor a la edad legal o no.

Para escribir las condiciones te debes ayudar de los relacionales que puedes encontrar <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores" target="_blank">acá</a>.

## Como usar Iteraciones

Para escribir iteraciones en JavaScript podemos usar el `for` y el `while` que basicamente hacén lo mismo pero se escribén un poco distinto. Recomendamos usar `for` en la mayoria de las iteraciones. La forma basica de escribirlas es:

```js
for (statement 1; statement 2; statement 3) {
  // operaciones
}
```

```js
while (condition) {
  // operaciones
}
```

Escribamos un ejemplo que imprima los numeros del 1 al 10.

```js
for (let i=0; i < 10; i++) {
  console.log(i + 1);
}
```

```js
let i=0;

while (i < 10) {
  console.log(i + 1);
  i = i + 1;
}
```

En estos ejemplos estamos haciendo exactamente lo mismo usando tanto `for` como `while`, pero si ves usando un `while` debemos tener cuidado de escribir cosas adicionales que en un `for` vienen en su declaración.


Bueno esperamos que esta sea una buena base para comenzar con tu aprendizaje de JavaScript, no te olvides escribir en los comentarios si tienes preguntas. Si este contenido te parece útil y me quieres ayudar a hacer mas, considera apoyarme en [Patreon](https://www.patreon.com/carlosrojas_o).

Bueno eso es todo por ahora. Espero sea de utilidad :)