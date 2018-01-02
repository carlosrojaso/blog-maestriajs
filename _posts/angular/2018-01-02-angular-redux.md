---
layout: post
title: "REDUX en Angular"
date: 2018-01-02
tags: [angular, redux]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-01-02-angular-redux%2FRedux.png?alt=media&token=11a355d5-5b8c-496c-ac5a-4f41e5c4b6d8"
editname: "angular/2018-01-02-angular-redux.md"
versions:
  - title: 'Angular CLI'
    number: '1.6.1'
  - title: 'Angular'
    number: '5.0'
---
> A medida que tu aplicacion va creciendo y vas creando más y más componentes cada vez es mas dificil saber quien cambia el estado de los datos. Es por esto que se habla del patron de Administración de estado *Redux*.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-01-02-angular-redux%2FRedux.png?alt=media&token=11a355d5-5b8c-496c-ac5a-4f41e5c4b6d8"></amp-img> 

{% include general/net-promoter-score.html %} 

## ¿ Que es Redux ?

Redux es un contenedor de estado predictivo para apps en Javascript.

Este te ayuda a escribir aplicaciones que se comporten consistentemente, se ejecute como en diferentes entornos ( Cliente, Servidor y Nativo ) y sean faciles de probar.

### Beneficios.

- Arquitectura escalable de datos.
- Mayor control en el flujo de datos.
- Programación Funcional.
- Control de estados.
- E stado global e inmutable

### Los tres principios de Redux.

<amp-img width="789" height="414" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-01-02-angular-redux%2FCaptura%20de%20pantalla%202018-01-01%20a%20la(s)%2011.28.46%20p.m..png?alt=media&token=a31004ea-acef-4cdc-897d-fe7b9c26d149"></amp-img> 

*ÚNICA FUENTE DE LA VERDAD* 

El estado de toda tu aplicación está almacenado en un árbol guardado en un único store.

<amp-img width="960" height="540" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-01-02-angular-redux%2FRedux%20con%20Angular.png?alt=media&token=3ba563c5-c74c-491e-9000-9b5fccef2ad5"></amp-img> 

*EL ESTADO ES DE SOLO LECTURA*

La única forma de modificar el estado es emitiendo una acción, un objeto describiendo qué ocurrió.

*LOS CAMBIOS SE REALIZAN EN FUNCIONES PURAS*

Para especificar cómo el árbol de estado es transformado por las acciones, se utilizan reducers puros.

## Como usamos esto en Angular ?

Existén dos librerias que en la actualidad te permiten implementar este patrón en tus Apps con Angular, estas son [angular-redux](https://github.com/angular-redux/ng-redux) y [ngrx](https://github.com/ngrx).

[ngrx](https://github.com/ngrx) es la libreria que los expertos en Angular recomiendan y posiblemente se convierta en el estandar.

## Por donde comenzar ?

Te recomiendo este [30 dias con RXjs](https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-1-e911e68f6063) hecho por [Jorge Cano](https://blog.ng-classroom.com/blog/authors/jorgecano/) el cual te explica los principios en los que se basa [ngrx](https://github.com/ngrx).

He creado el canal <b>redux-angular</b> en el slack de ng-classroom donde con todos los interesados podremos resolver nuestras dudas :)

Espero sea de utilidad este post y empecemos a utilizar esta arquitectura en nuestras aplicaciones.