---
layout: post
title: "Angular Universal + Express"
date: 2018-06-13
tags: [angular, universal, express]
categories: tips
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-13-Angular-universal_Express%2FTitulos2.png?alt=media&token=95994e0e-15fd-49dd-85f1-57a185f8b735"
editname: "angular/2018-06-13-Angular-universal_Express.md"
versions:
  - title: 'Angular CLI'
    number: '1.5.x'
  - title: 'Angular'
    number: '5.x'
---

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-06-13-Angular-universal_Express%2FTitulos2.png?alt=media&token=95994e0e-15fd-49dd-85f1-57a185f8b735">

 

> Angular Universal es la tecnologia de SSR de la plataforma Angular.

<!--summary-->

## ¿ Como usamos Universal en Local ?

Como vimos anteriormente el SSR corre en el lado de un servidor, entonces, debemos instalar uno para ejecutar Universal, en esta oportunidad vamos a utilizar Express. Los pasos son:

- Tener tu CLI actualizado.

````
npm install -g @angular/cli
````

- Crear un proyecto nuevo.

````
$ng new my-project
````

- Crear Universal desde el CLI.

````
$ng generate universal
````

- Agregar Universal con el CLI.

````
$ng generate universal
````

Este comando debe crear 3 archivos en tu proyecto. `src/app/app.server.module.ts`, `src/main.server.ts` y `src/tsconfig.server.json`.

- Actualizar las dependencias.

````
$npm install
````

- Agregando `express` y dependencias para simular un servidor.

````
npm install --save @nguniversal/module-map-ngfactory-loader @nguniversal/express-engine express reflect-metadata
````

- Agregamos un pequeño servidor en la carpeta `server/index.ts`

```ts
import  'zone.js/dist/zone-node';
import  'reflect-metadata';
import { enableProdMode } from  '@angular/core';
import  *  as  express  from  'express';
import { join } from  'path';
  
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } =  require('./main.bundle');

import { ngExpressEngine } from  '@nguniversal/express-engine';
import { provideModuleMap } from  '@nguniversal/module-map-ngfactory-loader';

enableProdMode();

const  app  =  express();
const  PORT  =  process.env.PORT  ||  4000;
const  DIST_FOLDER  =  join(process.cwd(), 'dist');
app.engine('html', ngExpressEngine({
  bootstrap:  AppServerModuleNgFactory,
  providers: [
      provideModuleMap(LAZY_MODULE_MAP)
  ]
}));
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Server static files from browser
app.get('*.*', express.static(DIST_FOLDER));
// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'index.html'), { req });
});
// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
```

- Agregamos un archivo compilador en el servidor.

Creamos un archivo `server/tsconfig.ssr.json`

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../dist-server",  
    "sourceMap": false,
    "baseUrl": "./",
    "module": "commonjs",
    "types":[
      "node"
    ]
  },
  "files": [
    "index.ts"
  ],
  "exclude": [
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

- Agregaremos algunas instrucciones a nuestro `package.json`.

```json
"tsc:server": "tsc -p server/tsconfig.ssr.json",
"build:client-and-server-bundles": "ng build --prod --aot && ng build --prod --aot --app 1 --output-hashing=false",
"build:universal": "npm run build:client-and-server-bundles && npm run tsc:server",
"serve:universal": "node dist-server/index.js"
```

- Por último probaremos los resultados.

````
$npm run build:universal
````

y

````
$npm run serve:universal
````

Con esto debemos ver la pagina de inicio, pero solo lo comprobaremos si al ver el codigo tenemos nuestra App dentro de los tags `<app-root></app-root>`.

Basado en este [Post](https://blog.angularindepth.com/angular-5-universal-firebase-4c85a7d00862)

Bueno esto es todo por el dia de hoy, espero haya sido de utilidad :)



