---
layout: post
title: "NGRX VS NGXS VS AKITA"
keywords: "ngrx, ngxs, akita"
date: 2018-12-06
tags: [testing, demos]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-12-06-NGRX-NGXS-AKITA%2Fcover.png?alt=media&token=923addd4-0f4c-499e-a458-d769a9770e65"
---

> En este blog hemos hablado en varias oportunidades acerca de Ngrx, Ngxs y Akita. Pero en esta ocasión te traemos un analisis a fondo para que decidas tu proximo gestor de State Management en tus Apps con Angular.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-12-06-NGRX-NGXS-AKITA%2Fcover.png?alt=media&token=923addd4-0f4c-499e-a458-d769a9770e65"></amp-img>

{% include general/net-promoter-score.html %}

En la actualidad las apps en Javascript estan adoptando soluciones de almacenamiento basados en `Redux`, las cuales consistén de un Store, Selectores para obtener la información del Store en forma de `Observables` y `Actions` para modificar los datos del Store. Para hacer esto en Angular existén varias soluciones disponibles actualmente de la cual `Ngrx` es la más popular pero `Ngxs` y `Akita` resultán ser opciones confiables y rapidas de aplicar. Entonces, ¿ Que solución debo aplicar ?

# Opciones.

<h2>NGRX</h2>

Solución de manejo de estados construido sobre RxJs e inspirada en Redux. [Sitio Web](https://ngrx.io/)

<h2>NGXS</h2>

Solución basada en el patrón CQRS el cual es utilizado en librerias como Redux pero reduce el `boilerplate` utilizando `TypeScript` y sus caracteristicas de Clases y Decoradores. [Sitio Web](https://ngxs.gitbook.io/ngxs/)

<h2>Akita</h2>

Solución basada en el patrón CQRS el cual es utilizado en librerias como Redux pero reduce el `boilerplate` utilizando `TypeScript` y sus caracteristicas de Clases y Decoradores. [Sitio Web](https://ngxs.gitbook.io/ngxs/)

# Herramientas.

<h2>REDUX DEVTOOLS</h2>

Esta herramienta existe como un plugin en Chrome y Firefox. Esta permite a los desarrolladores ver el impacto de una acción en Redux y viajar en el tiempo entre estas acciones.

<h2>NGRX</h2>

Ngrx provee `@ngrx/store-devtools ` para Devtools. Esta trabaja bién. Su implemetación es facil agregando una linea al `AppModule`.

```ts
StoreDevToolsModule.instrument()
```

<h2>NGXS</h2>

NGXS provee `@ngxs/devtools-plugin` para Devtools. Esta sin embargo no soporta todas las funcionalidades, como por ejemplo saltar acciones o despachar nuevas acciones usando el Devtools. Su implemetación es facil agregando una linea al `AppModule`.

```ts
NgxsReduxDevtoolsPluginModule.forRoot()
```

<h2>Akita</h2>

Akita es una solución que no utiliza exactamente el patrón Redux y por lo tanto tambien tiene una funcionalidad limitada en el Devtools.  Provee `@datorama/akita-ngdevtools.` Su implemetación es facil agregando una linea al `AppModule`.

```ts
AkitaNgDevtools.forRoot()
```

# SCHEMATICS.

<h2>NGRX</h2>

NGRX tiene schematics disponibles en `@ngrx/schematics` este permite crear stores, caracteristicas de stores, reducers, acciones, componentes contenidos, efectos, entidades y todo con varias opciones.

<h2>NGXS</h2>

NGXS no ofrece schematics sin embargo ofrece un `CLI`.

<h2>Akita</h2>

Akita soporta schematics a través de `akita-schematics`. permite crear store, modelos, queries, y Servicios.

En resumén es algo como esto.

<table style="width: 100%;" border="1">
<tbody>
<tr>
<td><b>Tooling</b></td>
<td><b>Redux DevTools</b></td>
<td><b>Schematics</b></td>
</tr>
<tr>
<td>NGRX</td>
<td>Si</td>
<td>Si</td>
</tr>
<tr>
<td>NGXS</td>
<td>Limitado</td>
<td>No</td>
</tr>
<tr>
<td>Akita</td>
<td>Limitado</td>
<td>Si</td>
</tr>
</tbody>
</table>

# BOILERPLATE CODE.

Esto se refiere a los archivos que tenemos que agregar a nuestro proyecto para agregar el codigo necesario en nuestro manejo de estados.

<table style="width: 100%;" border="1">
<tbody>
<tr>
<td><b>Boilerplate</b></td>
<td><b>Boilerplate code</b></td>
</tr>
<tr>
<td>NGRX</td>
<td>Con más Boilerplate</td>
</tr>
<tr>
<td>NGXS</td>
<td>Mediano</td>
</tr>
<tr>
<td>Akita</td>
<td>El menor</td>
</tr>
</tbody>
</table>

# Dependencias y tamaño.

Esta se refiere al tamaño que le agregamos a nuestro proyecto instalando las dependencias que necesita cada solución a traves de `npm`.

<table style="width: 100%;" border="1">
<tbody>
<tr>
<td><b>Tamaño</b></td>
<td><b>Non-production (MB)</b></td>
<td><b>Production (KB)</b></td>
</tr>
<tr>
<td>Base</td>
<td>14.6</td>
<td>754</td>
</tr>
<tr>
<td>NGRX</td>
<td>14.9</td>
<td>786</td>
</tr>
<tr>
<td>NGXS</td>
<td>14.8</td>
<td>778</td>
</tr>
<tr>
<td>Akita</td>
<td>15.4</td>
<td>778</td>
</tr>
</tbody>
</table>

# Comunidad.

Se refiere a la popularidad, el numero de contribuyentes y los tutoriales que puedes encontrar en las busquedas. Esto te asegura encontrar más soporte y librerias que puedan hacer tu desarrollo mas fluido.

<table style="width: 100%;" border="1">
<tbody>
<tr>
<td><b>Solución</b></td>
<td><b>Google Trends</b></td>
<td><b>GitHub stars</b></td>
<td><b>Contributors</b></td>
<td><b>Commits</b></td>
</tr>
<tr>
<td>NGRX</td>
<td>1ero</td>
<td>1ero</td>
<td>1ero</td>
<td>1ero</td>
</tr>
<tr>
<td>NGXS</td>
<td>2do</td>
<td>2do</td>
<td>2do</td>
<td>3ro</td>
</tr>
<tr>
<td>Akita</td>
<td>3ro</td>
<td>3ro</td>
<td>3ro</td>
<td>2do</td>
</tr>
</tbody>
</table>

Bueno ahora ya tienes más información para tomar tu proxima decisión arquitectonica. Este Post esta basado en este excelente [analisis](https://ordina-jworks.github.io/angular/2018/10/08/angular-state-management-comparison.html?utm_campaign=Angular%2BWeekly&utm_medium=email&utm_source=Angular_Weekly_19), esperamos que sea de ayuda y nos vemos en un proximo Post :)