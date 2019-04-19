---
layout: post
title: "Angular CLI"
keywords: "Angular, cli"
date: 2019-04-22
tags: [tools, angular]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-12-09-Angular-cli%2Fcover.png?alt=media&token=84967eea-a042-47b2-a166-c95780abb7da"
---

> Crear archivos dentro de nuestro proyecto (Boilerplate) resulta siempre una tarea engorrosa y poco estandarizada, es por esto que el equipo de Angular ha desarrollado una herramienta poderosa que nos va a ayudar bastante en nuestro proceso de desarrollo es el `Angular CLI`.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-12-09-Angular-cli%2Fcover.png?alt=media&token=84967eea-a042-47b2-a166-c95780abb7da"></amp-img>

{% include general/net-promoter-score.html %}

El `Angular CLI` es una herramienta que te ayuda a estructurar facilmente tu proyecto en Angular, esta construida sobre `Angular DevKit` y entre sus caracteristicas podemos encontrar:

<h2>Rica en características.</h2>

Sin mucha configuración soporta TypeScript, TSLint, Sass, Pruebas Unitarias y Pruebas e2e.

<h2>Extendible.</h2>

Con el sistema de `Schematics` la comunidad puede crear colecciones que te permitén realizar tareas comunes de manera facil.

<h2>Prototipado Rapido.</h2>

Enfocate en la logica del negocio en lugar de configuraciones de Webpack o otras tecnologias que te quitán tiempo que podrias dedicar a tu App.

# ¿ Como instalar ?

Para instalar simplemente utilizaremos `npm` para tenerla en nuestro entorno.

```
$npm install @angular/cli -g
```

y cuando termine de instalar simplemente hacemos:

````
$ng --version
````

# $ng new.

El comando `new` te crea un nuevo espacio de trabajo con todo listo para programar en `Angular`.

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

Si no quieres que el `CLI` te genere las pruebas basicas de tus componentes nuevos, puedes usar:

````
$ng new App --skip-tests
````

# $ng add.

Con el comando `add` agregas caracteristicas a tu espacio de trabajo desde paquetes en `npm`. Un ejemplo de su uso es:

````
$ng add @angular/pwa
````

Con este comando agregamos la capacidad de `Progressive Web App` en nuestra App.

# $ng build.

Con el comando `build` transforma tus archivos de desarrollo para poder ser entendidos por un navegador de una manera optima. Su uso es:

````
$ng build
````

Puedes construir una versión de desarrollo la cual podras enviar a un server de desarrollo o obligar a compilar tus cambios.

````
$ng build --prod
````

Podras construir una versión de producción la cual esta optimizada para tu servidor de producción.

# $ng config.

El comando `config` te deja obtener configuracion de tu espacio de trabajo o te deja configurarlo. 

````
$ng config -g cli.packageManager yarn
````

Con este comando cambiamos el administrador de paquetes para usar `yarn`.

# $ng doc.

Con el comando `doc` vamos hacia la documentación oficial de Angular. Podemos enviar algunos `keywords`.

````
$ng doc -g directive
````

Con este comando vamos a buscar la palabra clave `directive` dentro de la documentación.

# $ng generate.

Cuando estas en la construcción de tu App puedes usar:

````
$ng generate component myComponent
````

Con este comando crearemos diferentes elementos de los bloques de Angular entre los que podemos crear `component`, `directive`, `pipe`, `service`, `class`, `module`.

{% include blog/subscribe.html %}

# $ng lint.

Con el comando `lint` vamos a llamar las reglas de `Tslint` que tengamos en nuestro proyecto.

````
$ng lint
````

# $ng run.

Con el comando `run` puedes ejecutar reglas de configuración que tengas en tu `angular.json`.

````
$ng run AngularApp:build
````

En este ejemplo tengo un proyecto llamando `AngularApp` y quiero ejecutar el `build`.

# $ng serve.

El comando `serve` nos deja utilziar un servidor local de desarrollo.

````
$ng serve
````

Puedes ir viendo tus cambios en tu navegador.

# $ng update.

El comando `update` nos deja actualizar nuestros espacios de trabajos facilmente a nuevas versiones de las herramientas de Angular.

````
$ng update @angular/cli @angular/core
````

Con este comando vamos a actualizar la version del `CLI` y la de `Angular core` en nuestro proyecto.

# $ng version.

El comando `version` te permite saber que version de `Angular CLI` tienes.

# --dry-run.

Si no estas seguro de que va a hacer un comando, puedes usar la opción `--dry-run`.

````
ng new App --dry-run
````

Con esta opción el `CLI` no va a hacer cambios y en lugar de eso va a imprimir en consola que cambios reales haria ese comando.

Bueno esto es todo. Espero sea de utilidad :)
