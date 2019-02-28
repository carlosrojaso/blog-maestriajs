---
layout: post
title: "Migrando tu App hacia Ionic 4"
date: 2019-02-28
tags: [ionic]
categories: ionic2
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-01-24-ionic-4-finalmente%2Fionic-4-final.png?alt=media&token=6db207a5-016c-4a7c-b5ca-e7bf7f586ca4"
editname: "ionic2/2019-02-18-ionic-3-to-ionic-4.md"
versions:
  - title: 'ionic'
    number: '4.0.0'
  - title: 'ionic-cli'
    number: '4.1.0'
---

> Como anteriormente anunciamos `ionic` ya esta listo para producción, pero si tienes Apps en `ionic 3` debes realizar una serie de pasos para poder disfrutar de la potencia de los `Web Components`.

<amp-img width="1440" height="800" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-01-24-ionic-4-finalmente%2Fionic-4-final.png?alt=media&token=6db207a5-016c-4a7c-b5ca-e7bf7f586ca4"></amp-img>

{% include general/net-promoter-score.html %} 

Lo primero que tenemos que hacer es actualizar nuestro `CLI` si no lo has hecho aun tendras que ejecutar:

```
$npm install -g ionic
```

## Crear un nuevo proyecto con Ionic 4

Ahora que tienes  la última versión del `CLI` debes crear una App nueva con el template `blank`.

````
$ionic start myApp tabs
````

## src/providers - src/app/services.

Ahora que tenemos nuestra App con la estructura general nueva de Ionic vamos a empezar a mover nuestro 

## styleUrls

Ahora Ionic esta utilizando `CSS Variables` lo cual permite que los componentes sean expuestos a través de un API el cual se podra manipular de una manera mas estandar sin tener que recurrir a la antigua manera de hacer Ionic con un preprocesador SASS o directamente sobre el `CSS` de los componentes.

# rxJS

````
npm i -g rxjs-tslint
rxjs-5-to-6-migrate -p [path/to/tsconfig.json]
````


# Uso de CLI de cada Framework

````
npm i -D @ionic/v4-migration-tslint
vi ionic-migration.json
````

````
{
  "rulesDirectory": ["@ionic/v4-migration-tslint/rules"],
  "rules": {
    "ion-action-sheet-method-create-parameters-renamed": true,
    "ion-alert-method-create-parameters-renamed": true,
    "ion-back-button-not-added-by-default": { "options": [true], "severity": "warning" },
    "ion-button-attributes-renamed": true,
    "ion-button-is-now-an-element": true,
    "ion-buttons-attributes-renamed": true,
    "ion-col-attributes-renamed": true,
    "ion-datetime-capitalization-changed": true,
    "ion-fab-attributes-renamed": true,
    "ion-fab-button-is-now-an-element": true,
    "ion-fab-fixed-content": true,
    "ion-icon-attribute-is-active-removed": true,
    "ion-item-attributes-renamed": true,
    "ion-item-divider-ion-label-required": true,
    "ion-item-ion-label-required": true,
    "ion-item-is-now-an-element": true,
    "ion-item-option-is-now-an-element": true,
    "ion-item-option-method-get-sliding-percent-renamed": true,
    "ion-item-options-attribute-values-renamed": true,
    "ion-label-attributes-renamed": true,
    "ion-list-header-ion-label-required": true,
    "ion-loading-method-create-parameters-renamed": true,
    "ion-menu-events-renamed": true,
    "ion-menu-toggle-is-now-an-element": true,
    "ion-navbar-is-now-ion-toolbar": true,
    "ion-option-is-now-ion-select-option": true,
    "ion-overlay-method-create-should-use-await": true,
    "ion-overlay-method-present-should-use-await": true,
    "ion-radio-attributes-renamed": true,
    "ion-radio-group-is-now-an-element": true,
    "ion-radio-slot-required": true,
    "ion-range-attributes-renamed": true,
    "ion-segment-button-ion-label-required": true,
    "ion-spinner-attribute-values-renamed": true,
    "ion-tabs-refactored": { "options": [true], "severity": "warning" },
    "ion-text-is-now-an-element": true
  }
}
````

````
npx tslint -c ionic-migration.json -p tsconfig.json
````


# ¿Como comenzar?

Bueno el procedimiento sigue siendo parecido a los anteriormente vistos.

```
$npm install -g ionic
$ionic start awesome-app
```

Adicionalmente si quieres migrar tu App, debes seguir la [Guia de migración](https://ionicframework.com/docs/building/migration/).

Bueno esperamos que estes tan emocionado como nosotros y sigán programando :)