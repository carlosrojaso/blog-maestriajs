---
layout: post
title: "Angular Testing Framework + Como probar un Servicio"
keywords: "unit test, pruebas unitartias, angular, pruebas unitarias, webpack, jasmine, karma"
date: 2018-10-01
tags: [testing, demos]
categories: angular
repo: "https://github.com/ng-classroom/demo129"
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-15-%20Angular-Pruebas-Unitarias%2FPruebas%20unitarias.png?alt=media&token=b5fd0776-2a2f-4e17-b098-59584ab6573d"
remember: true
versions:
  - title: 'Angular CLI'
    number: '6.1.1'
  - title: 'karma'
    number: '1.7.1'
  - title: 'karma-jasmine'
    number: '1.1.2'
---

> Escribir pruebas unitarias nos ayudará a reducir de forma significativa los errores que puedan llegar a producción, en este articulo vamos a ver como realizarlas en un Servicio.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-15-%20Angular-Pruebas-Unitarias%2FPruebas%20unitarias.png?alt=media&token=b5fd0776-2a2f-4e17-b098-59584ab6573d"></amp-img>

{% include general/net-promoter-score.html %}

## Consideraciones para el HTTP.

- Las peticiones HTTP son un poco lentas y a medida que vamos agregando más Pruebas vamos a ver como va tomar mucho más tiempo a medida que crece nuestro Test Suite.

- Si estamos sin conexión o el *Servidor* es innacesible nuestras pruebas van a romperse debido al Timeout. Nuestras pruebas pueden estar bien pero nos generara un error.

## ¿ Que es un Stub ?

*Stubs* son objetos que creamos en el momento de la prueba para obtener un comportamiento para las dependencias que estamos utilizando en nuestras pruebas.

## ¿ Que es un Mock ?

Un *Mock* son objetos que representan parte de una dependencia en nuestra prueba. Normalmente, los Mocks van a ser utilizados por mas de una Prueba a través de todo el Conjunto de Pruebas. 

## ¿ Cual es la diferencia entre un Mock y un Stub ?

La gran diferencia entre Mock y Stub es que los Mocks nos permiten probar el comportamiento de algo, mientras el Stub nos permite probar el estado de algo.

Aunque ambos nos permiten conocer el resultado de algo, con un Mock también estamos interesados en como se logro ese resultado.

{% include blog/subscribe.html %}

## Preparando nuestro Servicio.

Vamos a crear un Servicio sencillo que 



Esto es todo, hasta un proximo post :)