---
layout: post
title: "Angular CLI & Schematics."
date: 2018-02-21
tags: [angular]
categories: angular
author: carlosrojas
repo: https://github.com/ion-book/my-app-schematic
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-18-angular_cli_schematics%2FSchematics.png?alt=media&token=b4d31957-c23b-4c31-991c-b1293b22a877"
versions:
  - title: 'Angular CLI'
    number: '1.7.0'
---
> Existén ocasiones en los proyectos que quieres actualizar tareas manuales como crear un archivo o cambiar la configuración.

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-18-angular_cli_schematics%2FSchematics.png?alt=media&token=b4d31957-c23b-4c31-991c-b1293b22a877"> 

 

## Que es Schematics ?

El equipo de Angular ha pensado en este escenario y para eso ha creado *Schematics* una forma de crear reglas dentro de tus proyectos como crear un formato especial de archivos o automatizar tareas como por ejemplo al actualizar los *breaking changes* cada que sale una nueva versión.

*Nota:* Schematics esta en Angular Labs por lo tanto puede sufrir cambios significativos.

## Principos

* Fácil de Usar y Desarrollar.

* Extensibilidad y Reusabilidad.

* Atomicidad.

* Asincronizidad.


## Como crear tu primer Schematic.

Instalar el Angular CLI (Si no lo tienes con anterioridad).

````
$ npm install -g @angular/cli
````

o

````
$ yarn global add @angular/cli
````

{% include blog/adAngular.html %}

Luego instalamos el CLI de Schematics.

````
$ npm install -g @angular-devkit/schematics-cli
````

o

````
$ yarn global add @angular-devkit/schematics-cli
````

Ahora creamos un Schematic en Blanco.

````
$ schematics blank --name=hello-world
````

Deberiamos tener algo asi.

<div class="row wrap">
  <div class="col col-md-25 col-lg-25">
  </div>
  <div class="col col-md-50 col-lg-50">
    <img width="259" height="332" class="responsive"  src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-02-18-angular_cli_schematics%2FCaptura%20de%20pantalla%202018-02-21%20a%20la(s)%206.44.50%20a.%20m..png?alt=media&token=170d6c53-e49d-4573-a694-497ef8d2f909" alt=""> 
  </div>
  <div class="col col-md-25 col-lg-25">
  </div>
</div>

Ahora en nuestro ```index.ts```modificamos la regla que trae por defecto.

```ts
export function helloWorld(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.create(options.name || 'hello', 'world');
    return tree;
  };
}
```

Guardamos.

## Preparando.

Ahora debemos convertir nuestro archivo en una especie de libreria. Para eso dentro de nuestro schematic ejecutamos:

````
$ npm run build
````

y

````
$ schematics .:hello-world
````

este ultimo ejecutara una simulación de nuestra regla. Si quieres que se ejecute realmente debes agregar ```---dry-run=false```

## Probando.

Ahora en un proyecto nuevo vamos a probar nuestro schematic.

````
$ ng new myapp
````

Ahora la que en mi opinion es la parte mas compleja :p es linkear el componente a nuestro proyecto como si fuera una libreria.

Vamos a nuestro schematic.

````
$ cd ../hello-world
````

Aca debemos hacer un link local para el que voy a utilizar yarn (npm no me funciono)

````
$ yarn link
````

y luego lo debo agregar a mi proyecto.

````
$ cd ../myapp
````
````
$ yarn hello-world
````

y listo ya todo deberia estar listo. Ahora podre generar mi schematic con el comando ```ng generate```

````
$ ng generate hello-world:hello-world myprimerSchematic```
````

Bueno espero que sea de ayuda y no te olvides comentar y compartir :)