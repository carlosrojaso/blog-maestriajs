---
layout: post
title: "Ayuda a testear el Split Panel."
keywords: "Ionic"
date: 2017-02-17
tags: [ionic2, release]
categories: news
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FScreen-Shot-2017-02-16-at-19.18.25-squashed.png?alt=media&token=dedc78c8-00cf-4cad-8472-7b0f9000b815"
---
> Hace unos momentos desde el Blog oficial de Ionic, se pide ayuda para testear una nueva caracteristica que se ve muy bién.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FScreen-Shot-2017-02-16-at-19.18.25-squashed.png?alt=media&token=dedc78c8-00cf-4cad-8472-7b0f9000b815"></amp-img> 

Esta es una nueva caracteristica que se quiere implementar en el framework fue trabajada por [Manu](https://github.com/manucorporat) que hace parte del equipo de Ionic.

Con **Split Panel** es mucho mas facil trabajar el menu de navegación en dispositivos con pantallas grandes (Tales como el Iphone 7 plus, tablets y escritorio) y colapsara (Como normalmente lo hace) en pantallas pequeñas. Entonces, ahora el menu lateral
podra trabajar independientemente del contenido o ellos pueden trabajar en conjunto. Adicionalmente, el menu puede ser fijo o mostrado como un side menu.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FHelp-testing%2FFeb-16-2017-19-15-43.gif?alt=media&token=6ca016e6-2574-43b7-8523-527446253a6e"></amp-img> 

Para ayudar a probar debes instalar la versión nocturna de Ionic.

{% include blog/subscribe.html %}

```
$npm install --save ionic-angular@nightly
```

para uso basico simplemente usa  ```<ion-split-panel>``` alrededor de tus etiquetas ```<ion-menu>``` y ```<ion-nav>```:

{% highlight js %}

<ion-split-panel>
  <ion-menu [content]="content">
  </ion-menu>
  <ion-nav [root]="rootPage" #content swipeBackEnabled="false" main></ion-nav>
</ion-split-panel>

{% endhighlight %}

**Nota:** Split Panel solo esta disponible en Ionic 2.x.x y superior.


