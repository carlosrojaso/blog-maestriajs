---
layout: post
title: "Angular CLI"
keywords: "Angular, cli"
date: 2018-12-10
tags: [tools, angular]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-12-09-Angular-cli%2Fcover.png?alt=media&token=84967eea-a042-47b2-a166-c95780abb7da"
---

> Crear archivos dentro de nuestro proyecto (Boilerplate) resulta siempre una tarea engorrosa y poco estandarizada, es por esto que el equipo de Angular ha desarrollado una herramienta poderosa que nos va a ayudar bastante en nuestro proceso de desarrollo es el `Angular CLI`.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-12-09-Angular-cli%2Fcover.png?alt=media&token=84967eea-a042-47b2-a166-c95780abb7da"></amp-img>

{% include general/net-promoter-score.html %}

# ¿ Como instalar ?

Para instalar simplemente utilizaremos `npm` para tenerla en nuestro entorno.

```
$npm install @angular/cli -g
```

y cuando termine de instalar simplemente hacemos:

````
$ng --version
````

# Lo basico.

Los comandos que siempre vamos a utilizar en nuestros proyectos con Angular son los siguientes.

````
$ng new App
````

Con este comando crearemos una App en Angular con todo lo necesario.

````
$ng generate component myComponent
````

Con este comando crearemos diferentes elementos de los bloques de Angular entre los que podemos crear estan `directive`, `pipe`, `service` |class|module

