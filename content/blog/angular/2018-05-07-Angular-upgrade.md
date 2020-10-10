---
layout: post
title: "Actualizando tu App a Angular 6"
date: 2018-05-09
tags: [angular]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-05-07-Angular-upgrade%2FTitulos.png?alt=media&token=ee69f1e5-d51d-4e2a-a17e-994cec141fb7"
editname: "angular/2018-05-07-Angular-upgrade.md"
---
> Con la salida de la nueva plataforma Angular V.6 y su nueva gama de posibilidades y mejoras no es raro querer migrar tu App a Angular V.6 y su CLI.

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-04-09-Angular-cli-angular-6%2Fangular-cli.png?alt=media&token=37d30d21-535d-4d92-a77f-9cc710e14e94">


Recientemente, estoy actualizando todo los repos del curso de Angular a la version de Angular 6 y ayudandome de la app [update.angular.io](https://update.angular.io/) y el comando `ng update`, el proceso es relativamente sencillo y te dejamos aca los pasos.

## Pasos.

Suponemos que tu proyecto funciona con el Angular CLI y se encuentra en una versión anterior.

- Actualizar el Angular CLI a su versión 6.

```
npm install -g @angular/cli
```

- Actualizar el paquete Angular CLI en tu proyecto.

```
ng update @angular/cli
```

- Normalmente el actualizar el Angular CLI sube las versiones de los paquetes de Angular a su version 6. Sin embargo, con el `ng update` nos aseguraremos de que otros paquetes necesitamos actualizar. 

```
ng update
```

<img width="1160" height="573" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-05-07-Angular-upgrade%2FCaptura%20de%20pantalla%202018-05-06%20a%20la(s)%205.09.22%20p.%20m..png?alt=media&token=6dbe57f5-ef92-4161-ac40-facdbc457dbe">

{% include blog/adAngular.html %}

- Y por último lo que me parece mas complejo y es actualizar `rxjs` en su versión 6 cambiaron el nombre al importar sus librerias y si lo usas en tu proyecto vas a recibir muchos errores. Entonces, deberas buscar donde lo importas y cambiarlo a la nueva [nomenclatura](https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md#import-paths).

`import { Subscription } from ‘rxjs/Subscription’` cambia a
`import { Subscription } from ‘rxjs’`

`import { Subject } from ‘rxjs/Subject’` cambia a
`import { Subject } from ‘rxjs’`

`import { BehaviorSubject } from ‘rxjs/BehaviorSubject’` cambia a
`import { BehaviorSubject } from ‘rxjs’`

`import { Observable } from ‘rxjs/Observable’` cambia a
`import { Observable } from ‘rxjs’`

`import { of } from ‘rxjs/observable/of’` cambia a
`import { of } from ‘rxjs’`

Importante, si utilizas alguno de los operadores deberas utilizar su nueva forma [así](https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md#pipe-syntax).

Bueno esperamos que esta información te ayude en tus proyectos con Angular.

Si te gustó comparte y/o comenta. Hasta la proxima :)