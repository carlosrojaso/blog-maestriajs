---
layout: post
title: "Angular CLI"
keywords: "Angular, cli"
date: 2018-12-12
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

Con este comando crearemos una App en Angular con todo lo necesario. Puedes usar 

````
$ng new App --skip-install
````

Con esta opción podras crear una App en Angular pero sin instalar las dependencias de `npm`. Más adelante podras instalarla con:

````
$npm install
````

Cuando estas en la construcción de tu App puedes usar:

````
$ng generate component myComponent
````

Con este comando crearemos diferentes elementos de los bloques de Angular entre los que podemos crear `component`, `directive`, `pipe`, `service`, `class`, `module`.

{% include blog/subscribe.html %}

# Comandos utiles.

Si no quieres que el `CLI` te genere las pruebas basicas de tus componentes nuevos, puedes usar:

````
$ng new App --skip-tests
````

Si no estas seguro de que va a hacer un comando, puedes usar la opción `--dry-run`.

````
ng new App --dry-run
````

Con esta opción el `CLI` no va a hacer cambios y en lugar de eso va a imprimir en consola que cambios reales haria ese comando.

Si tienes conocimientos en `Webpack` y quieres personalizar tu configuración puedes usar algo como:

````
$ng eject 
````

Con este comando veras el archivo de configuración de `Webpack` en tu proyecto y podras personalizarlo.

# Comandos utiles.

Usando

````
$ng serve
````

Puedes ir viendo tus cambios en tu navegador con un servidor local.

con

````
$ng build
````

Puedes construir una versión de desarrollo la cual podras enviar a un server de desarrollo o obligar a compilar tus cambios.

````
$ng build --prod
````

Podras construir una versión de producción la cual esta optimizada para tu servidor de producción.

Bueno esto es todo. Espero sea de utilidad :)
