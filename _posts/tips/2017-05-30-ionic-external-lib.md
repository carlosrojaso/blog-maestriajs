---
layout: post
title: "Ionic 3 incluyendo librerías externas"
date: 2017-05-30
categories: ionic2
tags: [tips, ionic2]
categories: tips
author: javico2609
cover: "http://i.imgur.com/ZYv3zLt.png"
versions:
  - title: 'ionic'
    number: '3.2.0'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.0'
  - title: 'ionic-cli'
    number: '3.0.0'
---

<amp-img width="200" height="200" src="http://i.imgur.com/ZYv3zLt.png"></amp-img>

Con esta técnica podremos incluir librerías externas a nuestra aplicación como d3, Font Awesome icons.

## 1. Instalar Ionic 2 y Cordova.

```
$# sudo npm install -g ionic@beta cordova
```

## 2. Creamos una app con el Starter Tutorial.

```
$# ionic start app tutorial --v2
$# cd app
```

## 3. Incluimos alguna librería externa como font awesome icons

`package.json`

```json
 "dependencies": {
    "font-awesome": "^4.7.0"
  }
```

## 4. Modificar uno de los parametros de configuracíon de las task d ionic especificamente el de `ionic_copy` por uno custom.

```json
  "config": {
    "ionic_copy": "./scripts/custom.lib.js"
  },
```
