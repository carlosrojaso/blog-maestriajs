---
layout: post
title: "TypeScript fundamentos y ejemplos básicos"
keywords: "typescript"
date: 2017-06-23
tags: [typescript]
categories: typescript
author: javaruiz
cover: "/images/posts/tips/2017-06-23-typescript-fundamentos/cover.jpeg"
versions:
  - title: 'typescript'
    number: '2.3.4'
---

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/tips/2017-06-23-typescript-fundamentos/cover.jpeg"></amp-img>

{% include general/net-promoter-score.html %} 

## Typescript

> We love TypeScript for many things… With TypeScript, several of our team members have said things like 'I now actually understand most of our own code!' because they can easily traverse it and understand relationships much better. And we’ve found several bugs via TypeScript’s checks.” — Brad Green, Engineering Director - AngularJS

<!--summary-->
**TypeScript** es un lenguaje de programación libre y de código abierto desarrollado por **Microsoft**. Es un superconjunto de **JavaScript**, que esencialmente añade ***tipado*** estático y objetos basados en clases.

> Anders Hejlsberg, diseñador de C#, ha trabajado en el desarrollo de TypeScript.

**TypeScript** extiende la sintaxis de **JavaScript**, por tanto cualquier código JavaScript existente debería funcionar sin problemas. Está pensado para grandes proyectos, los cuales a través de un compilador de TypeScript se traduce a código JavaScript original. Permite además trabajar sin problemas con famosas librerías y frameworks de JavaScript como **jQuery, MongoDB, Node.js, y D3.js, Angular** por ejemplo esta realizado con TypeScript.

Tiene una sintaxis intuitiva, los navegadores no convertirán TypeScript a Javascript si no que TypeScript cuenta con un ***Transpiler*** que convierte el código TypeScript a JavaScript y puedes elegir si usar **ES5 ó ES6** recordando que la versión actual que soportan todos los navegadores es **ES5**.

## Instalación

Para instalar TypeScript necesitaremos tener instalado previamente Node.js y npm, en la terminal ingresamos el siguiente comando:

````
npm install -g typescript
````

Con esto estaremos listos para usar TypeScript, crea un archivo con extensión ***“.ts”***

Para compilar el resultado usaremos:

````
tsc <nombre_de_archivo>.ts
````

## Tipos de variables y datos

En TypeScript las variables se declaran igual que en Javascript, pero se especifica que tipo de dato es, por ejemplo:

```ts
// Dato de tipo string
var name: string = 'Tu nombre';
name = 'Otro nombre'; // Es correcto
name = 2 // Es incorrecto
// Dato de tipo number
var age: number = 29;
age = 0xf00d; // Es hexadecimal y es correcto
age = '3'; // Es un string e incorrecto
// Dato de tipo boolean
var havePets: boolean = true;
havePets = false; // Es correcto
havePets = 3 // Es incorrecto
// Ejemplo
const test = name + havePets; // No se puede sumar number + boolean
```

Las ***variables*** tienen la palabra reservada `var` pero el tipo de dato que se va a utilizar ó estará asignado a la variable y se denota como a continuación `nombreVariable: tipoDato`, a estos tipos de dato se les **denomina datos primitivos**, y son de tipo:

* ***String***
* ***Number***
* ***boolean***

Existe la palabra reservada `const` que es una nueva forma de declarar variables (introducida en ***ES6***), que es similar a `var` pero tiene un scope bloqueado ya que su valor no se puede modificar, en caso de que se reasignara un valor causaría un error. De igual manera `var` también puede usarse como `let`, de ahora en adelante la usaremos así como mejor práctica.

También se pueden usar ***template strings*** que se usan para tener varias lineas y expresiones embebidas, se denotan con (`), y la expresión dentro del texto por ***${ expr }***, ejemplo:

```ts
let name: string = `Javier Ruiz`;
let age: number = 28;
let sentence: string = `Hola, mi nombre es ${ name }.
Este año voy a cumplir ${ age + 1 } años.`;
// Esto sería equivalente a
let sentence: string = "Hola, mi nombre es " + name + ".\n\n" + "Este año voy a cumplir " + (age + 1) + " años.";
```

## Arreglos

Los arreglos en TypeScript se pueden presentar de dos maneras:

`nombreVariable: tipoDato[]` ò `nombreVariable: Array<tipoDato>`

```ts
let arrayNumber: number[] = [1, 2, 3];
let arrayString: string[] = ['1', '2', '3'];
// Ó bien de la siguiente manera
let arrayNumber: Array<number> = [1, 2, 3];
let arrayString: Array<string> = ['1', '2', '3'];
```

De igual manera se pueden combinar los tipos de dato por ejemplo un `string` y un `number`.

```ts
let arrayMixed: any[] = [2, '5', 3];
```

Cuando se conoce el orden de los elementos en el arreglo es posible combinarlos también pero necesitas que el arreglo solo acepte su tipo de dato en el orden que están, se le llama ***tuple***.

```ts
// Declaramos el tuple
let array: [string, number];
// Inicializamos Correctamente
array = ['Hola', 2];
// Inicializamos Incorrectamente
array = [2, 'hola']; // Regresará un error
```

{% include blog/subscribe.html %}

## Enum

Algo bueno que se añade en TypeScript es ***Enum*** que es una ayuda para los estandarizar nuestros tipos de datos numéricos de una manera fácil.

```ts
// Roles
enum Roles = { Admin, User}; // Admin = 0, User = 1
let user: Roles = Roles.Admin;
```

Por defecto enum inicia el valor de sus propiedades en ***“0…”*** , pero se puede modificar, en el anterior ejemplo **Admin** sería **0**, pero probablemente quiero que sea **1**, de igual manera se pueden modificar todos lo demás.

```ts
// Roles
enum Roles = { Admin = 1, User};
let user: Roles = Roles.Admin; // Ahora User será 2
// Modificando todos
enum Roles = { Admin = 1, User = 3, Guest = 0 };
```

Ahora, si el valor del **enum** pero no sabemos a que corresponde, podemos ir de un valor numérico a un texto.

```ts
// Roles
enum Roles = { Admin = 1, User, Guest };
let user: Roles = string = Roles[1];
```

## Any y Object

Si no sabemos que tipo de dato vamos a recibir, por ejemplo usando librerías de terceros o consumiendo un **API** podemos hacer uso de ***any***, ó bien si recibimos un ***Objeto***, que trae diferentes tipos de datos.

```ts
// Any
let list: any[] = [1, '2', true];
let user: Object = {
    name: "Tu nombre",
    age: 29,
    havePets: true
};
console.log(list[0], user.name);
```

## Interfaces

TypeScript nos permite declarar objetos más complejos ó estructurados, por ejemplo:

```ts
// Interface
interface Puppy {
    name: string,
    age: string
};
// Declaración Válida
const puppy: Puppy = {
   name: "Mascota",
   age: 2
};
// Declaración Inválida
const invalidPuppy: Puppy = {
   eat: true
};
// Esta declaración es inválida puesto que la prop eat no existe en la interface.
```

Puede no ser necesario todas la propiedades de la **interface** esto puede depender de la propiedad que se quiera llenar, ejemplo:

```ts
// Interface
interface Puppy {
    name: string,
    age?: string
};
const puppy: Puppy = {
   name: "Mascota"
};
```

Existen otros métodos más avanzados para interfaces en funciones y clases, por el momento vamos a dejar la parte básica.

Si quieres aprender más sobre TypeScript puedes revisar la documentación en el [sitio oficial](https://www.typescriptlang.org/).
