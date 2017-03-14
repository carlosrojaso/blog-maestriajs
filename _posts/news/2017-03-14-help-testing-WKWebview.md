---
layout: post
title: "Ayuda al equipo de Ionic a probar el Plugin WKWebView."
keywords: "Ionic"
date: 2017-03-14
tags: [ionic2, news]
categories: news
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-14-help-testing-WKWebview%2FUntitled-1.png?alt=media&token=81b1dfa4-b01c-45c8-abe2-deddb27b6803"
---
> El dia de ayer desde el (Foro de Ionic)[https://forum.ionicframework.com/t/wkwebview-v3-0-0/82814] **Mike Hartington** escribio acerca de los avances en el plugin [WKWebview](https://github.com/apache/cordova-plugin-wkwebview-engine) y le pide a la comunidad el probar y dar retroalimentación.

<amp-img width="1400" height="440" layout="" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-14-help-testing-WKWebview%2FUntitled-1.png?alt=media&token=81b1dfa4-b01c-45c8-abe2-deddb27b6803"></amp-img> 

## Que es WKWebView ?

El navegador por defecto en IOS es Safari. y simplificando Safari utiliza un Webview. La plataforma de IOS provee dos tipos de Webview que pueden ser utilizados. **UIWebView** que es el viejo(y lento) Webview y uno nuevo que llamado **WKWebView**. WKWebView es mejor y rapido que UIWebview en todos los aspectos. ademas de ser significativamente más rapido y fluido, Apple esta activamente actualizandolo en cada versión de IOS.

{% include blog/subscribe.html %}

<amp-img width="852" height="516" layout="" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-14-help-testing-WKWebview%2FCaptura%20de%20pantalla%202017-03-14%20a%20las%209.30.43%20a.m..png?alt=media&token=59240375-c107-4ffc-ac2a-720b0d4af2ec"></amp-img> 

## Como actualizar ?

1. Si ya lo tienes instalado, remuevelo.

````
ionic plugin rm cordova-plugin-wkwebview-engine --save
````

2. Entonces, instalar desde el master en git.

````
ionic plugin install https://github.com/driftyco/cordova-plugin-wkwebview-engine --save
````

Si encuentras algún problema solo debes crear un [Issue](https://github.com/driftyco/cordova-plugin-wkwebview-engine/issues)



