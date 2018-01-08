---
layout: post
title: "Service Workers en Angular"
date: 2017-12-21
tags: [angular, pwa]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-12-21-angular-service-workers%2FThe-Art-of-Building-Apps-with-Javascript..png?alt=media&token=2dba40ae-a56c-4e59-a2ac-61e44313c4da"
editname: "angular/2017-12-21-angular-service-workers.md"
versions:
  - title: 'Angular CLI'
    number: '1.6.1'
  - title: 'Angular'
    number: '5.0'
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-12-21-angular-service-workers%2FThe-Art-of-Building-Apps-with-Javascript..png?alt=media&token=2dba40ae-a56c-4e59-a2ac-61e44313c4da"></amp-img> 

{% include general/net-promoter-score.html %} 

!Hola!

Si estuviste atento a lo que ocurrio esta semana en el mundo del desarrollo Web, posiblemente escuchaste que [Edge](https://blogs.windows.com/msedgedev/2017/12/19/service-workers-going-beyond-page/?utm_content=buffere64a2&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer) y [Safari](https://webkit.org/blog/8042/release-notes-for-safari-technology-preview-46/?utm_content=buffer843ec&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer) vendran en su proxima versión con Service Workers activos por defecto. Esto significa que tus PWAs van a funcionar perfecto en todas estas plataformas. Adicionalmente, hace unas semanas se libero Angular CLI 1.6 la cual permite habilitar los Service Workers facilmente en tus Proyectos de Angular. Si quieres utilizarlo aca te digo como:

Instalar Angular CLI

```
$npm install -g @angular/cli
```

Crear una nueva App

```
$ng new pwaApp
```

```
$cd pwaApp/
```

Instalar la libreria y decirle al CLI que lo vas a utilizar.

```
$npm install @angular/service-worker
```

```
$ng set apps.0.serviceWorker=true
```

Importar y registrar el Service Worker

```ts
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment';
 
...
 
@NgModule({
  imports: [
    ...
     ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production})
  ],
  ...
})
export class AppModule { }
```

Crear el archivo de configuración, ngsw-config.json

```
{
  "index": "/index.html",
  "assetGroups": [{
    "name": "app",
    "installMode": "prefetch",
    "resources": {
      "files": [
        "/favicon.ico",
        "/index.html"
      ],
      "versionedFiles": [
        "/*.bundle.css",
        "/*.bundle.js",
        "/*.chunk.js"
      ]
    }
  }, {
    "name": "assets",
    "installMode": "lazy",
    "updateMode": "prefetch",
    "resources": {
      "files": [
        "/assets/**"
      ]
    }
  }]
}
```

Construir el Proyecto.

```
$ng build --prod
```

y eso es todo. Ahora tienes una PWA en tu directorio dist/

## Opcional: Probando localmente tu PWA

Debido a que ```ng serve``` funciona con tareas de construcción de tu App debes tener un Servidor adicional para usar tu App con el Service Worker Activo.

Instalar HTTP Server

```
$npm install -g http-server
```

Ejecuta http-server

```
$cd dist/
```

```
$http-server -p 8080
```

Listo ahora ya tienes tu App corriendo con un Service Worker en tu navegador. Debes utilizar las Chrome Dev Tools para observar el funcionamiento de estas.