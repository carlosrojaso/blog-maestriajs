---
layout: post
title: "Usando el Routing de Angular"
keywords: "angular, routing"
date: 2018-10-30
tags: [testing, demos]
categories: angular
repo: "https://github.com/ng-classroom/demo132"
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-30-%20Angular-Routing%2Fcover.png?alt=media&token=fa1e7f20-cd8a-42f9-be48-39b3a6943043"
remember: true
versions:
  - title: 'Angular CLI'
    number: '7.0.3'
  - title: 'karma'
    number: '1.7.1'
  - title: 'karma-jasmine'
    number: '1.1.2'
---

> Cuando realizas una App con Angular en la mayoria de los casos te vas a encontrar con la necesidad de tener que cambiar entre diferentes vistas para estos casos Angular tiene un sistema de navegación gestionado por el `Angular Router`.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-30-%20Angular-Routing%2Fcover.png?alt=media&token=fa1e7f20-cd8a-42f9-be48-39b3a6943043"></amp-img>

{% include general/net-promoter-score.html %}

## ¿ Que es el Angular Router ?

El `Router` en Angular permite habilitar el sistema de navegación en nuestra App. Consideremos un escenario común que es cuando tenemos un sistema de autenticación, cuando queremos ingresar a la App debemos ingresar nuestro `usuario` y `contraseña` y despues podemos ingresar a nuestra App. Aca podemos observar varias cosas lo primero es que posiblemente nuestra App tenga las `urls` como `http://myapp.com/login` y una vez ingresamos correctamente `http://myapp.com/dashboard`. Este es el trabajo del `Router` permitir que podamos mostrar ciertos componentes dependiendo de la `url` que estamos utilizando. Adicionalmente, podremos enviar informacion a través de la `url` y también podremos evitar que un usuario no autenticado acceda directamente a `http://myapp.com/dashboard`.

## ¿ Como utilizo el sistema de navegación en una App ?

Bueno para mostrar la implementación del `router` vamos a crear una nueva App utilizando el `Angular CLI`.

```
$ng new demo132
```

Si te das cuenta el `CLI` te pregunta si quieres implementar el `routing` en tu proyecto. Le vamos a decir `Si`.

