---
layout: post
title: "Novedades en Angular Material"
date: 2018-05-22
tags: [angular]
categories: angular
author: vanessamarely
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-05-21-novedades-angular-material%2Fcover.png?alt=media&token=dbbac12e-c350-4b24-87cd-d4c94022b792"
editname: "angular/2018-05-21-novedades-angular-material"
---
> Angular Material nos permite crear componentes UI de una forma mucho mas rápida y la versión 6, trajo unas novedades muy útiles que nos permiten abordar los proyectos ágilmente.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-05-21-novedades-angular-material%2Fcover.png?alt=media&token=dbbac12e-c350-4b24-87cd-d4c94022b792"></amp-img>
{% include general/net-promoter-score.html %}

Hace poco fue lanzada la nueva versión de Angular, la v 6.0 y con ella varias novedades, entre las que se incluyen las de Angular Material.

## Angular Material

Angular Material, es un proyecto del equipo de Google, con el objetivo de crear una serie de componentes UI de alta calidad, basados en las especificaciones de Material Design; la cual es usada en muchas aplicaciones dentro y fuera de Google.

## Angular Material CDK

CDK es la versión corta para ‘Component Dev Kit’, cuyo objetivo es brindarnos una serie de herramientas para construir componentes personalizados, sin tener la necesidad de reinventar la rueda para patrones de interacción y  comportamientos que se encontraron eran comunes en los componentes UI. CDK comenzó con la base que usaban en Angular Material, pero a medida que vieron su nivel de estabilización y madurez, fue lanzada como una biblioteca independiente, que no contenía la estética visual de Material.

CDK es dividido en múltiples subpaquetes, cada uno con una responsabilidad individual y único propósito.

## Novedades en Angular Material

- Una de las nuevas características de Angular 6, permite  instalar Angular Material mucho más fácil, haciendo uso de `ng add`, solo es necesario el siguiente comando, una vez se tenga el proyecto generado con Angular CLI:

```
ng add @angular/material
```

Este comando nos evita realizar manualmente lo siguiente:

* Inserta el tema `indigo-pink` de Material en el archivo `angular.json`


```json
{% raw %}
"styles": [
    {
      "input": "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
    },
    "src/styles.scss"
  ],
{% endraw %}
```

* En el `index.html`, se inserta la fuente Roboto y la fuente de iconos de Material.

```html
{% raw %}
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
{% endraw %}
```

* En la sección de `imports` del NgModule, del archivo `app.module.ts`, se añade el `BrowserAnimationModule`, para que las animaciones de Material funcionen correctamente. 

```ts
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
```

* El Schematics de Angular Material, proporciona algunos diseños y plantillas prefabricados, para rápidamente generar y luego editar los  componentes de Material, sin tener la necesidad de leer la documentación y hacerlo de forma manual. 

Con el comando `ng generate`, es posible añadir un Nav o una Tabla de Material de forma mucho más rápida.

```
ng generate @angular/material:materialNav --name=main-nav
```
Y solo es añadir el componente en la vista: <main-nav></main-nav>

```
ng generate @angular/material:material-table --name=main-table
```

Y añadir el componente en la vista: <main-table></main-table>


- En la nueva versión de Angular, fue incluido a la lista de componentes CDK el ‘Tree’, este componente nos permite mostrar datos jerárquicos o un árbol de datos.

Existen dos tipos de Tree, los Flat (árboles planos) y los Nested (árboles anidados). En un árbol plano, los nodos no se representan uno dentro del otro y en un árbol anidado los nodos secundarios se colocan uno dentro del nodo padre.

En el siguiente repositorio se puede ver un ejemplo de la implementación del componente `Tree` y lo anteriormente mencionado:

[https://github.com/vanessamarely/cdk-tree](https://github.com/vanessamarely/cdk-tree)

## Conclusiones

Las novedades de Angular 6 (que son muchas), en Angular Material, nos traen nuevas opciones para poder trabajar los componentes UI de una forma mucho más rápida. El Schematic de Angular Material, nos evita crear manualmente componentes como las tablas, los nav, los toolbar, entre otros. Además el nuevo componente de CDK, el  Tree nos permite hacer uso de la jerarquía de datos, y nos permite manejar una gran cantidad de  datos sin afectar el rendimiento de la aplicación. 

