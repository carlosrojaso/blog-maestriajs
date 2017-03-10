---
layout: post
title: "Construye increibles Apps para Escritorio con la nueva grilla responsiva de Ionic."
keywords: "Ionic"
date: 2017-02-25
tags: [ionic2, news]
categories: news
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fnews%2Fionic-2-final-header.jpg?alt=media&token=c5deb097-7881-438d-9fd0-9bc9ecf0aabc"
---
> El dia de ayer desde el [Blog oficial de Ionic](http://blog.ionic.io/build-awesome-desktop-apps-with-ionics-new-responsive-grid/), se ha anunciado una mejora en la grilla en su uso con dispositivos de escritorio.

<amp-img width="1024" height="512" layout="responsive" src="http://blog.ionic.io/wp-content/uploads/2017/02/grid.gif"></amp-img> 

El equipo de Ionic comenta que ha estado trabajando muy fuertemente en mejorar el soporte de aplicaciones para escritorio, una de las caracteristicas mas pedida. La pieza central del soporte en escritorio para Ionic es un nuevo sistema de grillas que hace facil construir UI  que escala desde movil hasta Tablet pasando por Escritorio.

La [nueva grilla](http://ionicframework.com/docs/v2/api/components/grid/Grid) es una poderosa, mobile-first grid system compuesto de tres unidades - Una grilla, Fila(s) y Columna(s). Las columnas se van a expandir para llenar sus filas, y se redimensionara para llenar adicionales columnas. Esta basado en un diseño de 12 columnas con diferentes puntos de quiebre basado en el tamaño de la pantalla. El numero de columnas y puntos de quiebre puede ser [Personalizado utilizando SaSS](http://ionicframework.com/docs/v2/api/components/grid/Grid/#customizing-the-grid).

Vamos a ir mas a fondo en el nuevo sistema de grilla.

## ¿ Que hay de nuevo ?

* Atributos para las grillas, y columnas son ahora soportadas en adición a usarlas como un elemento. Usar los elementos ````<ion-grid>````, ````<ion-row>```` y ````<ion-col>```` o agrega algún elemento (e.j, ````<div ion-row>```` o ````<p ion-col>````).
* Nuevo y renovados [atributos para filas](http://ionicframework.com/docs/v2/api/components/grid/Row/#row-attributes)
    * Las filas se envolveran por defecto, pero agregando el atributo ````nowrap```` se evitara el envolvimiento.
    * El envolvimiento hacia atras para las filas se lograra agregando el atributo ````wrap-reverse````.
    * Los atributos para alinear verticalmente todas las columnas para una fila ha sido cambiada a ````align-item-*````.
    * Los atributos para alinear horizontalmente todas las columnas para una fila has sido agregada como ````justify-content-*````
* [Los Atributos para columnas](http://ionicframework.com/docs/v2/api/components/grid/Col/#column-attributes) para alinear una columna verticalmente ha sido cambiado a ````align-self-*````
* Soporte Media Query para cualquier numero de puntos de quiebre los cuales pueden ser [personalizados via SaSS](http://ionicframework.com/docs/v2/api/components/grid/Grid/#customizing-the-grid). Por defecto: Todos los puntos de quiebre ( ````xs```` ), ````sm````, ````md````, ````lg```` y ````xl````.
* Cada columna puede ser configurada para tomar un numero especifico de columnas fuera del numero total de columnas, no más por un porcentaje definido.
* Nueva variable ancho de columnas que toma el ancho de su contenido agregando los atributos ````col-{breakpoint}-auto````, donde ````breakpoint```` puede ser omitido a fin de que afecte todos los puntos de quiebre o especificado para usar uno de los puntos de quiebre predefinidos.
* Agregar modificadores pull y push para cambiar el orden de las columnas.
* Atributos de fila responsivas han sido deprecadas, pero las mismas pueden ser logradas usando los nuevos atributos.
* Seleccionar la grilla a un tamaño fijo basado en el tamaño de la pantalla al agregar el atributo ````fixed````.

{% include blog/subscribe.html %}

<amp-img width="1024" height="512" layout="responsive" src="http://blog.ionic.io/wp-content/uploads/2017/02/grid-2-1.gif"></amp-img> 

## Instalando

Para usar la nueva grilla simplemente actualiza a la ultima versión de Ionic corriendo el siguiente comando.

````
$ npm install --save --save-exact ionic-angular@2.1.0
````

Si eres nuevo en utilizar la grilla antes, dale un vistazo a la [documentación del API de la grilla](http://ionicframework.com/docs/v2/api/components/grid/Grid/) para información de su uso.

Quieres saber como actualizar tu app con la grilla anterior ? Lee directamente este [Post](http://blog.ionic.io/build-awesome-desktop-apps-with-ionics-new-responsive-grid/)
