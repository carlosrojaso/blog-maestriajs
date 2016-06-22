---
layout: post
title: "¿Qué es Typescript?"
tags: typescript  
date: 2016-06-22
categories: typescript
comments: true
author: carlosrojas
---

<img src="http://i.imgur.com/yFY9ETL.png" class="img-responsive" alt="image angular2"/>

Si has observado un proyecto en Ionic habras observado que ahora contiene dos carpetas una "app" y otra "www" que es distinto a como se estructuraba un proyecto en Ionic 1 y ademas si abres la carpeta "app" veras archivos con una extensión TS, esto 
es debido a que ahora se utiliza Typescript para trabajar con Ionic.

TypeScript es un lenguaje de programación escrito encima de Javascript que busca otorgar características adicionales dentro de las cuales se encuentran tipos estáticos, clases e interfaces. 

A diferencia de otras opciones como Coffescript, Typescript 
conserva mucha relación con Javascript plano lo que mejora la facilidad en su utilización,  otra característica interesante es que una vez el código este listo pasa por un proceso de transpilación el cual convierte el código de TypeScript en Javascript 
de nuevo para ser entendido por los navegadores.

### ¿Como instalar Typescript?


`
npm install -g typescript
`

### ¿Como transpilar Typescript?

Como sabes los navegadores y por consecuencia el webview de los dispositivos solo entiende javascript, es por esto que debemos transpilar nuestro codigo en Typescript a Javascript. para esto debemos utilizar el comando tsc.

`
tsc archivo.ts
`


Bueno esto es todo por ahora. Espero sea de utilidad y Sigan Programando :) 

@Carlosrojas_o
