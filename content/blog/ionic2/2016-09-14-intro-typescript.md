---
layout: post
title: "¿Introducción a TypeScript?"
tags: [typescript, demos, ionic2]  
date: 2016-09-14
categories: typescript
author: unjavascripter
repo: "https://github.com/UnJavaScripter/typescript-basics"
cover: "http://i.cubeupload.com/hm2KzP.jpg"
---

<img width="1200" height="675" class="responsive" src="http://i.cubeupload.com/hm2KzP.jpg">

 

El post original lo puedes ver en: [http://j.mp/2cHynLV](http://j.mp/2cHynLV)

TypeScript es un ‘superset’ de JavaScript que añade ciertas funcionalidades a nuestro código como, tipos de dato definidos e interfaces. Angular 2 está hecho en TypeScript, por lo tanto vale la pena aprender un poco y ver de que se trata, lo más probable es que en el futuro cercano se popularice.

### Funcionamiento

Básicamente funciona así:

1. Creas un archivo de texto con extensión ts miAplicacion.ts
2. Escribes código en el formato de TypeScript dentro de tu archivo
3. Compilas tu archivo usando el compilador de TypeScript
4. Se genera un archivo con extensión js miAplicacion.js

### SETUP

Existen varios plugins para TypeSctipt, en este ejemplo lo usaremos directamente desde node:

```
$ npm install -g typescript
```

Ejecutando el compilador de TypeScript

Tras instalar TypeScript tendremos disponible en nuestra terminal el programa tsc, TypeScript Compiler, con el comando:

```
$ tsc nombreDelArchivo.ts --watch
```

Le decimos a TypeScript Compiler que compile nombreDelArchivo.ts a nombreDelArchivo.js. Así mismo con el parámetro --watch le decimos que esté atento a cualquier cambio y realice la compilación en cada caso.

### TIPOS

Empecemos por lo más Type de TypeScript, Strong Typing o “tipado fuerte” (o estricto):

Si tenemos la siguiente función en JavaScript de toda la vida:

```js
let alertar = (mensaje) => {
  alert(mensaje);
}
```

TypeScript nos permite definir tipos estrictos:

Podemos llamar a la función alertar y pasar cualquier valor como mensaje. Sin embargo, tiene más sentido que la función reciba únicamente cadenas de texto (strings):

```js
let alertar = (mensaje: string) => {
  alert(mensaje);
}
```

Y eso es todo. Como te podrás imaginar si se quieren otros tipos de datos como números o valores booleanos tan solo hay que reemplazarlo sobre el string que usamos:

```js
let alertar = (mensaje: number) => {
  alert(mensaje);
}
```

ó

```js
let alertar = (mensaje: boolean) => {
  alert(mensaje);
}
```

Incluso podemos definir valores con union types para hacer que estos reciban más de un solo tipo de dato:

```js
let alertar = (mensaje: string | number) => {
  alert(mensaje);
}
```

Podemos ser incluso más flexibles y definir valores con el tipo any;

```js
let alertar = (mensaje: any) => {
  alert(mensaje);
}
```

De esta forma volvemos al ejemplo inicial con JavaScript de toda la vida en donde nuestra función recibe cualquier tipo de dato.

### INTERFACES

Una interfaz nos permite modelar la forma de un objeto:


```js
interface Zapato {
  marca: string,
  numero: number,
  deprotivo: boolean
}
```


Ahora podemos definir un objeto y especificar que debe tener la forma de Zapato, es decir, extender la interfaz.

Usando el ejemplo anterior con la función alertar limitamos el tipo del mensaje para validar que concuerde con la estructura que se define en la interfaz Zapato:

```js
interface Zapato {
  marca: string,
  numero: number,
  deprotivo: boolean
}
```

```js
let alertar = (mensaje: Zapato) => {
  alert(mensaje);
}
```

```js
alertar({marca: 'Patito', numero: 42, deprotivo: true});
```

Si pasaramos un argumento de más o nos faltara uno, TypeScript nos lo hará saber con un error.

Podemos tener propiedades opcionales dentro de una interfaz:

```js
interface ITelefono {
  marca: string,
  precio: number,
  nfc: boolean,
  ranurasParaSIMCard?: number
}
```

Aquí podemos pasar un número en la propiedad ranurasParaSIMCard o no pasar un valor en absoluto. Algo a notar también es que en este ejemplo definí la interfaz como I NombreDeLaInterfaz, esta nomenclatura suele encontrarse en Internet y es eso, sólo una forma de escribir los nombres de las interfaces.

Finalmente, cabe notar que la interfaz por sí sola no hace nada en nuestro código final (js), es únicamente una restricción que establecemos durante el desarrollo de nuestro código TypeScript. Si intentaramos compilar la definición de la interfaz terminaríamos con un archivo JavaScript vacío.

### EJEMPLO

Una interfaz nos permite modelar la forma de un objeto:

Ahora sí llegamos al ejemplo que tanto esperabas (🙄): código que integra lo que hemos visto hasta ahora. Este ejemplo usa el concepto de clases, si no lo tienes muy claro puedes visitar la documentación de Mozilla para este tema.

```js
interface IPokemon {
    nombre: string,
    sonido: string,
    dormido?: boolean
}

class Pokemon {
  
  pokemon;
    
  get (){
    return this.pokemon;
  }

  set (nuevoPokemon){
    this.pokemon = nuevoPokemon;
  }
  
  hacerHablar() {
    if (this.pokemon.dormido){
      console.log('Zzzzz');
    }else{
      console.log(this.pokemon.sonido);
    }
  }

  constructor(nuevoPokemon: IPokemon) {
    this.set(nuevoPokemon);
  }
}


let pikachu = new Pokemon({ nombre: "Pikachu", sonido: "¡Pika pika!" });

pikachu.hacerHablar();

let snorlax = new Pokemon({ nombre: "Snorlax", sonido: "Snoooor-laax", dormido: true });

snorlax.hacerHablar();
```

1.Definimos una interfaz con una propiedad opcional

2.Definimos una clase que tiene:

2.1 Una referencia a un objeto principal

2.2 Un método getter para consultar nuestro objeto principal

2.3 Un método para escribir nuestro objeto principal

2.4 Un método para ejecutar una acción

2.5 Un constructor que:

2.5.1 Recibe como parámetro un objeto que debe tener la forma especificada por la interfaz

2.5.2 Invoca al método set para escribir el objeto principal

3.Una instancia de la clase

4.La invocación del método destinado a ejecutar una acción

5.Una instancia de la clase

6.La invocación del método destinado a ejecutar una acción