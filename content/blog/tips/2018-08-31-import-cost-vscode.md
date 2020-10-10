---
layout: post
title: "¿Cómo usar import-cost en VSCode?"
date: 2018-08-30
tags: [angular, news, ionic, vscode]
categories: tips
author: nicobytes
video: true
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-31-import-cost-vscode%2Fcover.jpg?alt=media&token=42e7d60a-f0e6-4aed-b7a6-0a6f5a894ff3"
---
> Import-cost es una extensión en VSCode que nos permite conocer cuánto pesa en bytes cada una de los imports dentro de nuestros archivos, de esta forma tenemos conocimiento de que cada una de las librerías tiene un impacto el peso final de la aplicación.

<img width="1280" height="720" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-31-import-cost-vscode%2Fcover.jpg?alt=media&token=42e7d60a-f0e6-4aed-b7a6-0a6f5a894ff3"> 

## ¿Porqué es importante preocuparse por el peso de la aplicación?

Es importante ya que cada navegador debe descargar los archivos JavaScript de la aplicación y luego analizarlos, compilarlos y ejecutarlos.


<img width="900" height="544" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-31-import-cost-vscode%2Fjs.png?alt=media&token=5f4703b4-caf1-4409-bb5e-4aac4929accf"> 

Y si nuestros archivos pesan mucho, el tiempo de carga de la aplicación puede ser alto, además a veces se incluyen librerías muy pesadas que agregan un gran peso de la aplicación.

## Import Cost

Esta extensión nos permite conocer el peso de cada uno de nuestros imports en VSCode, mostrando aun costado su peso.

<img width="900" height="173" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-31-import-cost-vscode%2Fimport-cost.png?alt=media&token=f7fd8036-2b97-443e-9ded-d4a520f8245c"> 

## ¿Cómo instalarlo?

Solo debemos ir a VSCode y entrar a la sección de **extensions** y luego buscar **Import Cost**, te debe mostrar algo similar a la siguiente pantalla:

<img width="800" height="500" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-31-import-cost-vscode%2Fextensions.png?alt=media&token=36164f48-4790-4f0c-a3a2-c4ec6596dc5b">

Luego solo debes instarlo y ¡listo!

En este video hablo mucho mas en particular de esta extensión y una demostración de como funciona en un proyecto Angular.

<amp-youtube width="560" 
            height="315"
            class="responsive"
            data-videoid="ZN1RN1BQIX4"></amp-youtube>
