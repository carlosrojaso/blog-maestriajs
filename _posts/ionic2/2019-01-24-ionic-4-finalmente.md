---
layout: post
title: "Liberado oficialmente Ionic 4"
date: 2019-01-24
tags: [ionic]
categories: ionic2
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-01-24-ionic-4-finalmente%2Fionic-4-final.png?alt=media&token=6db207a5-016c-4a7c-b5ca-e7bf7f586ca4"
editname: "ionic2/2018-08-27-ionic-4-gettingStarted.md"
repo: "https://github.com/ng-classroom/demo128"
versions:
  - title: 'ionic'
    number: '4.0.0'
  - title: 'ionic-cli'
    number: '4.1.0'
---

> Finalmente despues de mucho tiempo de avances, historias y muchas `betas` y  `RCs` tenemos una versión estable de `ionic` lista para poder usar en producción 🎉

<amp-img width="1440" height="800" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-01-24-ionic-4-finalmente%2Fionic-4-final.png?alt=media&token=6db207a5-016c-4a7c-b5ca-e7bf7f586ca4"></amp-img>

{% include general/net-promoter-score.html %} 

El dia de hoy se hizo un gran anuncio en su [Blog](https://blog.ionicframework.com/introducing-ionic-4-ionic-for-everyone/) y no era para menos ya que `ionic 4` es algo totalmente distinto a la manera como se venia haciendo Apps en Ionic desde los ultimos 2 años, pero ¿ Que hace a Ionic 4 tan especial ?

## El fin al Frontend Churn.

Posiblemente ya has vivido la constante ansiedad por las decenas de frameworks de `Javascript` que se liberán semanalmente y no digo que esto esta mal ya que es parte del dinamismo que me hizo elegir el `Frontend` como mi especialidad y es parte de la innovación que se vive en este campo.  Si recuerdas Ionic fue construido sobre `AngularJS` y posteriormente portado a `Angular` lo cual fue una mejora muy grande para el desarrollo hibrido con `tooling` moderno, pero esto aún hacia que los desarrolladores que utilizaban `React` o `VueJS` no se pudieran ver beneficiados de los excelentes componente que Ionic nos ofrece a los desarrolladores Web.

Esto cambio con la estandarización de los [Web Components](https://www.webcomponents.org/introduction) una colección de APIs que te permiten crear tus propias etiquetas de manera nativa en el navegador, lo cual hizo que fuese posible utilizar los Componentes de Ionic (Aka Componentes de Angular) en Componentes que se pueden utilizar con cualquier framework.

## Mejoras en rendimiento.

<amp-img width="1560" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-01-24-ionic-4-finalmente%2Fionic4-performance-comparison.png?alt=media&token=fc6750ea-f43d-47dc-b505-576f74f5f842"></amp-img>

Gracias a la filosofia del equipo de Ionic de crear componentes altamente optimizados y su distribucion como `Web Componentes` la  [Primera renderización significativa](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint) ha mostrado un descenso significativa en  `Ionic Angular`.

## Estandarización para la personalización 🎨

Ahora Ionic esta utilizando `CSS Variables` lo cual permite que los componentes sean expuestos a través de un API el cual se podra manipular de una manera mas estandar sin tener que recurrir a la antigua manera de hacer Ionic con un preprocesador SASS o directamente sobre el `CSS` de los componentes.

# Nueva documentación.

<amp-img width="2438" height="1614" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-01-24-ionic-4-finalmente%2Fionic-4-docs.png?alt=media&token=06fb4911-904e-4e34-b70e-64bdd781f772"></amp-img>

Ahora podras encontrar la [nueva documentación](https://ionicframework.com/docs/) de Ionic la cual ha sido rediseñada y simplificada para ayudarte a encontrar las cosas mas importantes que puedas necesitar en tu desarrollo.

# Uso de CLI de cada Framework

Esto personalmente me parece lo mas cool de este nuevo cambio, ya que vas a poder utilizar el `Angular CLI`, el `React CLI`, o el `Vue CLI` directamente sobre Ionic lo cual abre un mundo de posibilidades y no dejaras que te quedes atras con caracteristicas que vayan implementando sus desarrolladores en estas excelentes herramientas.

# ¿Como comenzar?

Bueno el procedimiento sigue siendo parecido a los anteriormente vistos.

```
$npm install -g ionic
$ionic start awesome-app
```

Adicionalmente si quieres migrar tu App, debes seguir la [Guia de migración](https://ionicframework.com/docs/building/migration/).

Bueno esperamos que estes tan emocionado como nosotros y sigán programando :)