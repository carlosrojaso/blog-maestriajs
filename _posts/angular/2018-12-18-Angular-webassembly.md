---
layout: post
title: "WebAssembly + Angular"
keywords: "angular, web assembly"
date: 2018-12-18
tags: [tools, angular]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-12-18-Angular-webassembly%2Fcover.png?alt=media&token=80a94289-4c9e-4be5-b33f-0216e0a86fc1"
---

> En algunas ocasiones `Angular` no es lo suficientemente rapido para realizar algunas operaciones de `computing` en las cuales necesitamos mas rendimiento para lograr una mejor experiencia de usuario, en estos casos existe una tecnologia llamada `WebAssembly` la cual nos puede ayudar con esto.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-12-18-Angular-webassembly%2Fcover.png?alt=media&token=80a94289-4c9e-4be5-b33f-0216e0a86fc1"></amp-img>

{% include general/net-promoter-score.html %}

# ¿ Que es WebAssembly ?

WebAssembly es un nuevo tipo de codigo que puede correr en los Web Browsers modernos lo que lo hace interesante es que el codigo es genera un binario compacto que se ejecuta de una manera casi nativa en terminos de rendimiento y te permite usar una diversa selección de lenguajes tal como `C/C++` los cuales van a poder ser cargados como modulos dentro de `Javascript`.

# ¿ Por que WebAssembly ?

# ¿ Como usamos WebAssembly con Angular ?

Lo primero que tenemos que hacer es crear un proyecto nuevo usando el `Angular CLI`

````
$ng new demo136 
````

Instalamos los `typings` para el WebAssembly Javascript API.

````
$npm install @types/webassembly-js-api --dev --save
````

Luego vamos a tener que instalar el `WebAssembly Compiler` para esto te puedes referirte a la [guia de instalación](https://webassembly.org/getting-started/developers-guide/).

En mi caso como uso `OS X` mi proceso es el siguiente:

````
$ git clone https://github.com/juj/emsdk.git
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
````

Ok. Una vez tengamos instalado el compilador debemos ser capaz de poder usar `WebAssembly` en nuestra maquina.

Ahora vamos a crear un directorio `wasm` en nuestro proyecto y crearemos un archivo `factorial.c` que es donde crearemos una funcion en `C++` para calcular el factorial.

```
int factorial(int n) {
   if(n < 0) return 0;
   else if(n > 1) return n*factorial(n-1);
   return 1;
}
```
# Exponiendo nuestra funcion en C en nuestra App en Javascript.

Para exponer nuestra funcion en C a nuestra App debemos agregar unos decoradores para que todo sea identificado. Luego de agregar esto nuestro codigo quedaria asi.

````
#include <emscripten.h>

int EMSCRIPTEN_KEEPALIVE factorial(int n) {
   if(n < 0) return 0;
   else if(n > 1) return n*factorial(n-1);
   return 1;
}
````

Una vez hecho esto debemos compilar el archivo factorial.c para que se convierta en un archivo que el navegador entienda y es por esto que tuvimos que instalar el `compilador` en el paso anterior.

````
$cd src
````

Desde la raiz de mi proyecto me voy a ubicar en el directorio `src`.

````
$emcc wasm/factorial.c -Os -s WASM=1 -s MODULARIZE=1 -o wasm/factorial.js
````

Esto tomara un tiempo pero al final tendras 2 archivos un `factorial.js` y un `factorial.wasm`.

Ya con esto estariamos listos.

# Usando nuestra funcion dentro de un Servicio.

Vamos a generar un nuevo servicio.

````
ng generate service wasm
````

y debemos cargar los archivos generados de una manera no muy elegante.

```ts
...
import * as Module from './../../wasm/factorial.js';
import '!!file-loader?name=wasm/factorial.wasm!../../wasm/factorial.wasm';

import { Injectable } from '@angular/core';
...
```



Bueno esto es todo. Espero sea de utilidad :)
