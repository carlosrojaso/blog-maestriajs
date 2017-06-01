---
layout: post
title: "Ionic incluyendo librerías externas"
date: 2017-05-31
categories: ionic2
tags: [tips, ionic2]
categories: tips
author: javico2609
cover: "/images/posts/tips/2017-05-30-ionic-external-lib/cover.jpg"
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

<amp-img width="858" height="450" src="/images/posts/tips/2017-05-30-ionic-external-lib/cover.jpg"></amp-img>

Con esta técnica podremos incluir librerías externas a nuestra aplicación como Font Awesome icons.

## 1. Instalar Ionic y Cordova.

```
$# npm install -g cordova ionic
```

## 2. Creamos una app con el Starter Tutorial.

```
$# ionic start myApp tabs
$# cd myApp
```

## 3. Incluimos alguna librería externa como font awesome icons

`package.json`

```json
 "dependencies": {
    "font-awesome": "^4.7.0"
  }
```

## 4. Modificar uno de los parámetros de configuración de las task de ionic específicamente el de `ionic_copy` por uno custom en el `package.json`.

`myApp\scripts\custom.lib.js`

```json
  "config": {
    "ionic_copy": "./scripts/custom.lib.js"
  },
```

## 5. Agregar las librerias externas junto a la configuración de Ionic.

[**Configuración original**](https://github.com/ionic-team/ionic-app-scripts/blob/master/config/copy.config.js){:target="_blank"}


```js
	// this is a custom dictionary to make it easy to extend/override
	// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
	// then provide an object with a `src` array of globs and a `dest` string
	module.exports = {
	  copyAssets: {
		src: ['{{SRC}}/assets/**/*'],
		dest: '{{WWW}}/assets'
	  },
	  copyIndexContent: {
		src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
		dest: '{{WWW}}'
	  },
	  copyFonts: {
		src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
		dest: '{{WWW}}/assets/fonts'
	  },
	  copyPolyfills: {
		src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
		dest: '{{BUILD}}'
	  },
	  copySwToolbox: {
		src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
		dest: '{{BUILD}}'
	  },
	  copyFontAwesomeCSS: {
		src: '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css',
		dest: '{{WWW}}/assets/css/'
	  },
	  copyFontAwesome: {
		src: '{{ROOT}}/node_modules/font-awesome/fonts/**/*',
		dest: '{{WWW}}/assets/fonts/'
	  },
	  copyi18n: {
		src: '{{SRC}}/i18n/**/*',
		dest: '{{WWW}}/i18n/'
	  }
	};
```

Como podemos ver no solo se puede utilizar para agregar librerías externas sino también para aquellos elementos que no esten comprendidos en una app de ionic como el Idioma.

## 6. Incluir en el index.html las dependencias de la librería que estemos agregando.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>ICBanking v2</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-eval' 'unsafe-inline' *; object-src 'self'; style-src 'self' 'unsafe-inline'; media-src *">
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no">

  <link rel="icon" type="image/x-icon" href="assets/icon/favicon.ico">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#4e8ef7">
    
  <!-- cordova.js required for cordova apps -->
  <script src="cordova.js"></script>

  <!-- un-comment this code to enable service worker
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('service worker installed'))
        .catch(err => console.log('Error', err));
    }
  </script>-->

  <link href="assets/css/font-awesome.min.css" rel="stylesheet">
  <link href="build/main.css" rel="stylesheet">

</head>
<body>

  <!-- Ionic's root component and where the app will load -->
  <ion-app></ion-app>

  <!-- The polyfills js is generated during the build process -->
  <script src="build/polyfills.js"></script>

  <!-- The bundle js is generated during the build process -->
  <script src="build/main.js"></script>

</body>
</html>
```
