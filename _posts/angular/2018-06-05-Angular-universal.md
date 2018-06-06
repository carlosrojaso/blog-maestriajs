---
layout: post
title: "Angular Universal"
date: 2018-06-06
tags: [angular, universal]
categories: tips
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-05-Angular-universal%2FTitulos.png?alt=media&token=ef7344bd-332c-440b-a9bd-56afbdc399b8"
editname: "angular/2018-06-05-Angular-universal.md"
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-05-Angular-universal%2FTitulos.png?alt=media&token=ef7344bd-332c-440b-a9bd-56afbdc399b8"></amp-img>

{% include general/net-promoter-score.html %} 

> Angular Universal es la tecnologia de SSR de la plataforma Angular.

<!--summary-->

## ¿ Que es el Server Side Rendering ?

El Server Side Rendering es una tecnica que utilizando un servidor Web te permite cargar algunos elementos de tu Web App dejandolo disponible rapidamente para el usuario.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-05-Angular-universal%2FUniversalSteps.png?alt=media&token=e2532add-ee41-425f-8212-25e9ec8a9a0f"></amp-img>

Podemos observar el siguiente esquema donde vemos el proceso general del SSR, primero el servidor envia HTML que el navegador puede hacer disponible casi que inmediatamente al usuario (Carga inicial), Luego mientras el usuario ya esta interactuando con nuestra App descarga los archivos JS que necesita para funcionar, luego el navegador los ejecuta con Angular (Como normalmente se hace) y listo la pagina es interactiva.

## ¿ Que problema me soluciona el SSR ?

Bueno el SSR te soluciona principalmente dos problemas:

- Carga Inicial: Como vimos la Carga inicial es mucho mas rapida por que el Servidor se ha encargado de entregar HTML listo al navegador.

- SEO: Uno de los mayores problemas que tienen las Apps realizadas con Javascript es que los buscadores no las indexan muy bien.

Si tienes alguno de estos problemas, seria buena idea pensar en tener SSR en tu Web App.

## ¿ Angular Universal es algo nuevo ?

No. Angular Universal existe desde que existe Angular 2 pero siempre estuvo en digamos una fase experimental, pero ahora ha madurado bastante y ya esta lista.

## ¿ Como lo uso ?

La documentación actual no es muy buena o esta desactualizada. Pero a grandes rasgos debes hacer lo siguiente:

- Tener tu CLI actualizado.

````
npm install -g @angular/cli
````

- Crear un proyecto nuevo.

````
$ng new my-project
````

- Crear Universal desde el CLI.

````
$ng generate universal
````

Esto basicamente te genera unos archivos adicionales.

- Instalar las nuevas dependencias.

````
$npm install
````

Con esto debemos tener nuestra App lista, pero como te dije anteriormente tambien dependemos de un servidor. 

Voy a crear un Post adicional en los proximos dias para ver una implementación completa.

Bueno esto es todo por el dia de hoy, espero haya sido de utilidad :)



