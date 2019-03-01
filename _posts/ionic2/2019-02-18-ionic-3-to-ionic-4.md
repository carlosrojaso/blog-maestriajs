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
$ionic start myApp blank
````

## src/providers - src/app/services.

Ahora que tenemos nuestra App con la estructura general nueva de Ionic vamos a empezar a mover nuestro providers hacia la nueva estructura de `services`

<h3>Ionic 3</h3>

<div class="row">
  <div class="col col-25 col-md-25 col-lg-25"></div>
  <div class="col col-50 col-md-50 col-lg-50">
    <amp-img  width="257" height="270" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-18-ionic-3-to-ionic-4%2FCaptura%20de%20pantalla%202019-02-28%20a%20la(s)%206.17.35%20p.%20m..png?alt=media&token=e5b249f4-fc32-4cc4-8189-60de1bca4e85"></amp-img>
  </div>
  <div class="col col-25 col-md-25 col-lg-25"></div>
</div>

<h3>Ionic 4</h3>

<div class="row">
  <div class="col col-25 col-md-25 col-lg-25"></div>
  <div class="col col-50 col-md-50 col-lg-50">
    <amp-img  width="257" height="270" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-18-ionic-3-to-ionic-4%2FCaptura%20de%20pantalla%202019-02-28%20a%20la(s)%206.17.35%20p.%20m..png?alt=media&token=e5b249f4-fc32-4cc4-8189-60de1bca4e85"></amp-img>
  </div>
  <div class="col col-25 col-md-25 col-lg-25"></div>
</div>

Debemos mover nuestro `providers` de `src/providers` hacia `src/app/services`

<div class="row">
  <div class="col col-25 col-md-25 col-lg-25"></div>
  <div class="col col-50 col-md-50 col-lg-50">
    <amp-img  width="304" height="173" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-18-ionic-3-to-ionic-4%2FCaptura%20de%20pantalla%202019-02-28%20a%20la(s)%206.39.51%20p.%20m..png?alt=media&token=97f91af4-3988-4eaf-8057-883ea73afd97"></amp-img>
  </div>
  <div class="col col-25 col-md-25 col-lg-25"></div>
</div>

y debe quedar algo asi.

<div class="row">
  <div class="col col-25 col-md-25 col-lg-25"></div>
  <div class="col col-50 col-md-50 col-lg-50">
    <amp-img  width="326" height="226" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-18-ionic-3-to-ionic-4%2FCaptura%20de%20pantalla%202019-02-28%20a%20la(s)%206.41.15%20p.%20m..png?alt=media&token=bcec6684-22ce-4c1e-a1d0-c40cdbb24aad"></amp-img>
  </div>
  <div class="col col-25 col-md-25 col-lg-25"></div>
</div>

adicionalmente no te olvides de agregar. en cada servicio.

```ts
@Injectable({ providedIn: 'root' })
```


## Copiar pages y otros componentes src/app/

Debido al cambio de estructura de Ionic ahora toca mover todas las paginas y demas componentes desde `pages` y otras carpetas hacias `src/app/`.

<h3>Ionic 3</h3>

<div class="row">
  <div class="col col-25 col-md-25 col-lg-25"></div>
  <div class="col col-50 col-md-50 col-lg-50">
    <amp-img  width="247" height="313" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-18-ionic-3-to-ionic-4%2FCaptura%20de%20pantalla%202019-02-28%20a%20la(s)%207.16.38%20p.%20m..png?alt=media&token=8db99d7e-3452-4063-8579-ba956e072ea2"></amp-img>
  </div>
  <div class="col col-25 col-md-25 col-lg-25"></div>
</div>

<h3>Ionic 4</h3>

<div class="row">
  <div class="col col-25 col-md-25 col-lg-25"></div>
  <div class="col col-50 col-md-50 col-lg-50">
    <amp-img  width="327" height="340" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-02-18-ionic-3-to-ionic-4%2FCaptura%20de%20pantalla%202019-02-28%20a%20la(s)%207.16.53%20p.%20m..png?alt=media&token=dc06da78-c71a-406d-b561-a7cd3080215e"></amp-img>
  </div>
  <div class="col col-25 col-md-25 col-lg-25"></div>
</div>

Una vez realices este cambio debes utilizar el `router` de Angular y actualizar toda la navegacion de tu App.

# rxJS

Si usaste `rxJS` en tu App te recomiendo usar el `tslinter` oficial.

````
npm i -g rxjs-tslint
rxjs-5-to-6-migrate -p [path/to/tsconfig.json]
````


# Markup

Despues que tengas todos tus controladores y servicios funcionando, ahora debes actualizar todo el `Markup` de tu App, para esto te recomiento tambien usar el `tslinter` del equipo de Ionic.

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

Bueno como vez la migración de un app en `ionic 3` no es un proceso facíl y por lo tanto te recomiendo que hagas pequeños simulacros con Apps basicas antes de meterte con algo robusto, a mi personalmente me tomo bastante.

Bueno espero que esta info te ilumine un poco sobre este proceso y sigán programando :)