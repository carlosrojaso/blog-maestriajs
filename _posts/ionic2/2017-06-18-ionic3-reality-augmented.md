---
layout: post
title: "Ionic + Realidad Aumentada"
tags: [ionic, wikitude, reality augmented]
date: 2017-06-18
categories: ionic2
author: javico2609
cover: "/images/posts/ionic2/2017-06-18-ionic3-reality-augmented/cover.jpg"
versions:
  - title: 'ionic'
    number: '3.2.1'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.1.2'
---

La realidad aumentada (RA) es el término que se usa para definir la visión de un entorno físico del mundo real, a través de un dispositivo tecnológico, es decir, los elementos físicos tangibles se combinan con elementos virtuales, logrando de esta manera crear una realidad aumentada en tiempo real. [**Wikipedia**](https://es.wikipedia.org/wiki/Realidad_aumentada){:target="_blank"}

En este pequeño tutorial le enseñaremos como integrar uno de los SDKs mas utilizado para el trabajo con realidad aumentada [**Wikitude**](https://www.wikitude.com/){:target="_blank"}.

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic:

```
ionic start ionic-reality-augmented blank
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto:

```
cd ionic-reality-augmented blank
```

## Paso 2 Instalar el plugin de cordova para **Wikitude**

```
ionic cordova plugin add https://github.com/Wikitude/wikitude-cordova-plugin.git
```

Después debemos crear una declaración en el `app.component.ts` de cordova para que compile el typescript.

```
declare var cordova: any;


```