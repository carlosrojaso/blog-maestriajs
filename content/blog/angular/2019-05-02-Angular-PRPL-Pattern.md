---
layout: post
title: "El patrón PRPL en Angular"
keywords: "PRPL, Angular, cli"
date: 2019-05-02
tags: [tools, angular]
categories: angular
author: carlosrojas
repo: https://github.com/ng-classroom/prpl-demo
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-05-02-Angular-PRPL-Pattern%2F3.png?alt=media&token=21a36b10-4efe-4e1f-91a3-4edb27c92b52"
---

> En la actualidad contamos con tecnologías WEB enriquecidas y que están evolucionando constantemente ( Como Service Workers por ejemplo ) los cuales han permitido que podamos hacer Apps sofisticadas para los dispositivos móviles y extender esa característica hasta llegar a las Progressive Web Apps ( WebApps que se sienten como Apps descargadas desde las tiendas ).

<!--summary-->

<img width="820" height="312" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-05-02-Angular-PRPL-Pattern%2F3.png?alt=media&token=21a36b10-4efe-4e1f-91a3-4edb27c92b52">



El principal problema con esto es que el desarrollo Web Móvil es muy lento por que las mayorias de las técnicas aplicadas son pensadas en Web de Escritorio y es por esto que Google ha diseñado el patrón de arquitectura PRPL. Este patrón aún se encuentra en experimentación.

La sigla PRPL viene por:

- PUSH (Empujar) recursos críticos para la ruta URL inicial usando <link preload> y http/2.
- RENDER (Interpretar) la ruta inicial.
- PRE-CACHE (Almacenamiento Previo en Cache) de los recursos restantes.
- LAZY LOAD (Carga Perezosa) del resto de los recursos sobre pedido.

El objetivo principal de este patrón es:

- Mínimo tiempo de interacción.
- Máxima eficiencia de almacenamiento en caché.
- Facilidad de desarrollo e implementación.


<h2>Estructura de nuestra APP.</h2>

Para aplicar este patrón a una SPA (Single Page-App) deberemos tener en cuenta lo siguiente:

- El principal entrypoint 
- El App-Shell
- El resto de los fragmentos de nuestra App cargados con Lazy Loading.

<img width="1945" height="966" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-05-02-Angular-PRPL-Pattern%2F1.png?alt=media&token=8f8660b4-cd6e-492f-8272-16b340ef38fc">

En el diagrama las líneas punteadas representan recursos cargados a medida que se necesitan por el shell. Las líneas sólidas dependencias estáticas cargadas con <link> o <script>.

Para lograr el correcto funcionamiento el Servidor y el Service Worker deberán trabajar en conjunto.
El principal entrypoint.
El entrypoint debe ser el encargado de cargar rápidamente el shell y cualquier polyfill que sea necesario. También usa paths absolutos para todas sus dependencias.
El App-Shell.
El App-shell es responsable por el ruteo e incluye el mínimo html y css para interactuar con el usuario lo más rápido posible.

El App-shell también está encargado de cargar los fragmentos con lazy-load a medida que sean requeridos.
El Build.
Opcionalmente tu proceso de Build debería generar dos salidas:

Un unbundled build diseñado para la mezcla Servidor/Browser que soporte HTTP/2  para entregar los recursos que el Browser necesita para una rápida primera interacción mientras optimiza el cache. La entrega de estos recursos puede ser disparada rapidamente usando <link rel=”preload”> o HTTP/2 Push.

Un bundled construido diseñado para para minimizar el número de round-trips requeridos para tener la aplicación ejecutándose en una combinación Server/Browser que no soporta server push.

El servidor debería estar encargado de entregar el build correcto dependiendo del navegador.

<h2>El bundled construido.</h2>

Debido a que la tecnología HTTP/2 no se ha popularizado lo suficientemente rápido probablemente tendrás que manejar el escenario para Browsers que no soportan HTTP/2. En este caso el proceso de construcción debe generar un build para el shell y para cada fragmento.

<img width="1878" height="941" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-05-02-Angular-PRPL-Pattern%2F2.png?alt=media&token=9af038ef-266e-4cfa-97cd-feeaa6fc4fe3">

Si observamos la gráfica de arriba cualquier dependencia común es agrupada con el shell y sus dependencias estáticas. A medida que el usuario va solicitando más vistas las vamos cargando con lazy-load retornando a través del servidor una versión correcta del Bundle del fragmento.

<h2>Construyendo nuestra APP.</h2>

```
$ng new prpl-demo --routing -p capp --skip-git
$cd prpl-demo
```

Ahora agregamos `@angular/pwa` a nuestro proyecto.

````
$ng add @angular/pwa --project prpl-demo
````

Ahora vamos a agregar los modulos a nuestra App.

````
$ ng generate module Step1 --routing
$ ng generate module Step2 --routing
$ ng generate module Step3 --routing
$ ng generate module Shared
````

y agregarlos como Lazy Loading en `app-routing.module.ts`.

```ts
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'step1'
  },
  {
    path: 'step1',
    loadChildren: 'src/app/step1/step1.module#Step1Module'
  },
  {
    path: 'step2',
    loadChildren: 'src/app/step2/step2.module#Step2Module'
  },
  {
    path: 'step3',
    loadChildren: 'src/app/step3/step3.module#Step3Module'
  }
];
```

Ahora vamos a agregar un servicio para manejar informacion entre todos los componentes.

````
$ng generate service shared/services/Offer
````

y unos componentes compartidos.

````
$ng generate component shared/components/Header -c 'OnPush' --module shared/shared.module.ts --export
$ng generate component shared/components/Input -c 'OnPush' --module shared/shared.module.ts --export
$ng generate component shared/components/Button -c 'OnPush' --module shared/shared.module.ts --export
$ng generate component shared/components/Step -c 'OnPush' --module shared/shared.module.ts --export
````

Aca marcamos los componentes como `onPush` porque es la estrategia que queremos para nuestra detección de cambios. Puedes ver más [acá](https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4).

y ahora creamos el componente de cada paso.

```
$ng generate component step1/components/Home --module step1/step1.module.ts
$ng generate component step2/components/Home --module step2/step2.module.ts
$ng generate component step3/components/Home --module step4/step3.module.ts
```

La optimización del build corre por cuenta del `Angular CLI` y las caracteristicas de Offline por parte del `@angular/pwa` lo cual nos ahorra mucho tiempo. Si quieres ver el ejemplo completo pueder ir [acá](https://github.com/ng-classroom/prpl-demo).

Como puedes observar el patrón PRPL es un paradigma pensado en el dolor que se tiene al navegar actualmente por la Web desde un Móvil y busca crear una excelente experiencia cuando nuestros usuarios estén utilizando nuestras Progressive Web Apps. Espero te haya sido de utilidad y hasta un proximo Post :)
