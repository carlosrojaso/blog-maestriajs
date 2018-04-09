---
layout: post
title: "Angular CLI & Angular 6"
date: 2018-04-09
tags: [angular]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-09-Angular-cli-angular-6%2Fangular-cli.png?alt=media&token=37d30d21-535d-4d92-a77f-9cc710e14e94"
editname: "angular/2018-04-09-Angular-cli-angular-6.md"
---
> El Angular CLI hace más facil crear una aplicaciónes que simplemente funcionen. Utilizando Angular y sus mejores practicas.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-09-Angular-cli-angular-6%2Fangular-cli.png?alt=media&token=37d30d21-535d-4d92-a77f-9cc710e14e94"></amp-img>
{% include general/net-promoter-score.html %}

Estamos proximos a una nueva actualización de la plataforma Angular. Entre sus herramientas contamos con el Angular CLI, el cual nos ayuda principalmente con el `boilerplate`de nuestra App teniendo en cuenta las mejores practicas.

## ¿ Que caracteristicas nuevas nos trae el Angular CLI ?

Angular carga todos los componentes que están importados en nuestro módulo principal `app.module.ts` y puede ser que tarde unos segundos en cargar nuestra aplicación, dependiendo cuantos componentes haya. Para resolver ese problema llegó a nosotros lo que es Lazy Loading.

{% include blog/adAngular.html %}

- Generación de nuevas librerias. Ahora con `ng generate library <name>` vas obtener los archivos para crear tu propia libreria.

- Actualización de dependencias. Ahora con `ng update` el Angular CLI analiza las dependencias de tu proyecto y te deja actualizarlas. Incluyendo la del propio CLI.

- Cambio del `angular.json`. Para soportar las nuevas caracteristicas del CLI el archivos `angular.json` va a cambiar, pero con `ng update` podras actualizarlo facilmente.

- Un empaquetamiento mas ligero global. Gracias a Webpack 4 y que el Angular CLI mantiene todo en el `package.json` ahora el empaquetamiento final es mucho mas ligero.

- `ng config` para obtener y configurar valores. Ahora puedes cambiar facilmente los valores de CLI y tu proyecto con el `ng config`.

## Como instalarlo ?

Simplemente debes hacer una instalación por npm con:

````
$ npm install -g @angular/cli
````

y si quieres tener todo lo último antes de que salga la versión estable.

````
$ npm install -g @angular/cli@next
````

Bueno esperamos que esta información te ayude en tus proyectos con Angular.

Si te gustó comparte y/o comenta. Hasta la proxima :)