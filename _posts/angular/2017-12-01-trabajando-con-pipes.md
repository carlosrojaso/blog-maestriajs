---
layout: post
title: "Trabajando con Pipes en angular 5"
date: 2017-12-01
tags: [angular]
categories: angular
author: williambastidas
cover: "https://cdn-images-1.medium.com/max/800/1*6nCOLC77AhvGvgjfvElZsg.png"
video: true
remember: true
repo: https://github.com/wibastidas/my-proyecto-angular
editname: "angular/2017-12-01-trabajando-con-pipes.md"
versions:
  - title: 'Angular CLI'
    number: '1.5.0'
  - title: 'Angular'
    number: '5.0'
---

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/800/1*6nCOLC77AhvGvgjfvElZsg.png"></amp-img>


En este post continuaremos con el proyecto del artículo anterior [Angular 5: Inicio rápido con angular-cli y angular material](https://blog.ng-classroom.com/blog/angular/inicio-rapido-angular-material/). Antes de comenzar con pipes vamos a modificar nuestro home.componente.html para utilizar el componente [MatListModule](https://material.angular.io/components/list/api) de angular material en lugar de las etiquetas `<ul>` y `<li>` de html.

{% include general/net-promoter-score.html %} 

## Requisitos

Para comenzar, asegúrate de clonar el repositorio del artículo anterior [Ver código](https://github.com/wibastidas/my-proyecto-angular). También puedes revisar el [Post](https://blog.ng-classroom.com/blog/angular/inicio-rapido-angular-material/) y construir tu proyecto desde cero.

Si decides descargar o clonar el proyecto recuerda que debes ubicarte en tu proyecto en la terminal y ejecutar:

```
npm install
```

para descargar todas las dependencias. Y luego:

```
ng serve --open
```
para verlo en tu navegador.


### 1. Usando el componente [MatListModule](https://material.angular.io/components/list/api)
Lo primero que haremos es modificar el archivo `home.componente.html` para agregar lo siguiente:

```html
<mat-list>
  <mat-list-item *ngFor="let logro of logros">
    <h3 matLine>{{logro.title}}</h3>
    <p matLine>{{logro.description}}</p>
  </mat-list-item>
</mat-list>
```

Recordemos que debemos importar el componente [MatListModule](https://material.angular.io/components/list/api) al modulo principal y agregarlo a la lista de imports de la siguiente manera:


`app.module.ts`
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
  AppComponent,
  HomeComponent
  ],
  imports: [
  BrowserModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
  export class AppModule {
}
```

### 2. Crear un filtro o pipe

La clase `matLine` hace que el texto se muestre en una sola línea y si este es muy largo se corta, para evitar esto crearemos un pipe o filtro al que le pasaremos un texto y este nos devolverá un resultado con la cantidad de caracteres que queremos mostrar. En caso de que la cantidad de caracteres sea mayor a la que deseamos mostrar retornaremos el `string` más tres puntos `”…"` para indicar que tenemos más información para mostrar.


Para esto necesitamos crear un nuevo directorio dentro de app con el nombre de pipe y y un archivo con el nombre de `truncate.pipe.ts`

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/640/1*sH5rbktWws3IR2sAS0JMPg.png"></amp-img>

Agregamos al pipe creado el siguiente código:

`truncate.pipe.ts`
```ts
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name:"truncate"
})
export class TruncatePipe implements PipeTransform{
  transform(value:string, limite:string) : string{
    let limit = parseInt(limite);
    return value.length > limit ? value.substring(0,limit)+"..." :   value;
  }
}
```

Importamos la clase `Pipe` y la intefaz `PipeTransform` desde `@angular/core`. Llamamos al decorador `@pipe` y le colocamos el nombre que usaremos en nuestra vista `‘trucate’`. Declaramos la clase `TruncatePipe` que implementa de la clase `PipeTransform` (todos los pipe deben implementar de la clase `PipeTransform`). Utilizamos el método `transform()` que recibe como parametro el valor original, en este caso la descripción del logro y después el límite de caracteres que deseamos mostrar. Finalmente retornamos un string con el valor procesado.

### 3. Importar TruncatePipe
Para poder utilizar nuestro `TruncatePipe` debemos importarlo y agregarlo a la lista de declarations en el `app.module.ts`:

`app.module.ts`
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TruncatePipe } from './pipes/truncate.pipe'

@NgModule({
  declarations: [
  AppComponent,
  HomeComponent,
  TruncatePipe
  ],
  imports: [
  BrowserModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
  export class AppModule {
}
```

Finalmente añadimos `| truncate: 30` en la impresión de la descripción del logro para filtrar y mostrar un máximo de 30 caracteres.


### 4. Utilizar nuestro pipe

`home.componente.html`
```html
<mat-list>
  <mat-list-item *ngFor="let logro of logros">
    <h3 matLine>{{logro.title}}</h3>
    <p matLine>{{logro.description | truncate: 30}}</p>
  </mat-list-item>
</mat-list>
```

Para ver la aplicaicon en el navegador ejecutamos:

```
ng serve --open
```

Usando la opción `-- open` (o simplemente `-o`) nos abrirá automáticamente la aplicación en el navegador en `http://localhost: 4200/`


Si todo salió bien deberíamos ver algo como esto:

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/640/1*ygtxxGwqdqGrqmtvQ1VM5w.png"></amp-img>

Para descargar o clonar el código fuente de este proyecto:
* [VER CÓDIGO](https://github.com/wibastidas/my-proyecto-angular)

Recuerda que luego de descargar o clonar el proyecto debes pararte en tu proyecto en la terminal y ejecutar:

```
npm install
```

para descargar todas las dependencias del proyecto. Y luego:

```
ng serve --open
```

Hasta la proxima :)