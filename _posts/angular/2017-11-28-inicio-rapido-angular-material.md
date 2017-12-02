---
layout: post
title: "Angular 5: Inicio rápido con angular-cli y angular material"
date: 2017-11-28
tags: [class, angular]
categories: angular
author: williambastidas
cover: "https://cdn-images-1.medium.com/max/640/1*YxdVfV6NXT5QAXCAGIKLCQ.png"
remember: true
repo: https://github.com/wibastidas/my-proyecto-angular
editname: "angular/2017-11-28-inicio-rapido-angular-material.md"
versions:
  - title: 'Angular CLI'
    number: '1.5.0'
  - title: 'Angular'
    number: '5.0'
---

<amp-img width="1024" height="512" layout="responsive" src="https://cdn-images-1.medium.com/max/640/1*YxdVfV6NXT5QAXCAGIKLCQ.png"></amp-img>

{% include general/net-promoter-score.html %} 

**Angular** es un framework de desarrollo para JavaScript creado por Google para crear single page application (**SPA**), o aplicaciones de página única. Es uno de los frameworks más populares para desarrollar aplicaciones modernas y escalables en el lado del cliente.

En este artículo veremos como crear rápidamente una aplicación Angular (**Angular 2, Angular 4 ,Angular 5**) utilizando Angular **CLI** (Command Line Interface) y Angular **Material** un módulo que nos permite trabajar con componentes de interfaz de usuario completos y modernos que funcionan en la web, el móvil y en escritorio basados en Material Design. (Material Design es un conjunto de especificaciones definidas por Google para mantener una estructura coherente y atractiva en la web y aplicaciones móviles.)

Las ultimas versiones de Angular han mejorado el funcionamiento general del framework y nos permite utilizar TypeScript para definir nuestras clases, propiedades y métodos, generando un código mucho más limpio.

En este post crearemos una aplicación utilizando la ultima versión de Angular (desde cero ) para mostrar logros o historias, crearemos nuestro propio componente, mostraremos datos de variables , listaremos arreglos y utilizaremos angular material para mejorar la interfaz de usuario.

## Requisitos

Para comenzar, asegúrese de tener instalado [NodeJS (v6.9 +) y NPM (v3.x +)](https://nodejs.org/en/download/). en su máquina.

### 1. Preparando el ambiente

Primero instalemos Angular-Cli, ejecutamos:

```
npm install -g @angular/cli
```

Esto instalará globalmente la herramienta angular-cli.

*Quizas puedas necesitar `sudo` para instalar globalmente*

Si todo salio bien, el comando `ng -v` nos mostrara las versiones instaladas:

```
ng -v
```

<amp-img layout="responsive" width="640" height="401" src="https://cdn-images-1.medium.com/max/640/1*KSfHN2Zc9YC6tS_RFjbr6w.png"></amp-img>


### 2. Crear el proyecto

Ahora podemos crear un proyecto angular utilizando el comando `ng new`, en este caso, nombraremos el proyecto “my-proyecto-angular”.

```
ng new my-proyecto-angular
```

Ok, ahora si todo sale bien, tu puedes ver en la ubicacion de tu directorio una nueva carpeta llamada *"my-proyecto-angular"* 

Luego vamos al directorio en el que creamos el proyecto:

```
cd my-proyecto-angular
```

Desde ahora, siempre que ejecutemos algo en el CLI va a ser desde esta ubicación.

{% include blog/subscribe.html %}


### 3. Instalando las bibliotecas de [Angular material](https://material.angular.io/components/categories)

```
npm install --save @angular/material @angular/cdk
npm install --save @angular/animations
```

Estas son las bibliotecas adicionales que necesitaremos más adelante para ejecutar el componente de Angular material, el indicador  `— save` agrega las dependencias a nuestro `package.json`.


### 4. Configurando los estilos

Con la configuración del entorno completa, ahora es el momento de modificar algunas partes de la aplicación angular para asegurarnos de que estamos utilizando los estilos y componentes material del framework.

Abrimos el archivo `angular-cli.json` y modificamos la propiedad de styles `styles.css` a styles.scss.

```css
"styles": [ 
  "styles.scss" 
]
```

Luego navegamos a la carpeta src y cambiamos el nombre de nuestro archivo `styles.css` a `styles.scss` . Con esto cambiamos la extensión del archivo para que podamos admitir SCSS.

Ahora editamos el archivo `styles.scss` y agregamos el siguiente código:

```ts
@import '~@angular/material/prebuilt-themes/indigo-pink.css';

html, body {
  margin: 0px;
  padding: 0px;
}
body{
  background-color: #f0f0f0;
  font-family: Roboto, 'Helvetice New', 'Arial', sans-serif
}
```

Lo que hemos hecho es importar el tema Material indigo-pink.css que no es más que una combinación de colores de material design predefinidos. Puedes exploras otros temas en la misma ruta.

{% include blog/subscribe.html %}

Le quitamos el margen y el padding al html y al body, al body le agregamos un background-color gris, finalmente la fuente.

### 5. EJecutar la aplicación

Para ver la aplicaicon en el navegador ejecutamos:

```
ng serve --open
```

Usando la opción `— open` (ó simplemente `-o`) nos abrirá automáticamente la aplicación en el navegador en `http: // localhost: 4200 /`

Deberiamos ver algo como esto:
<amp-img layout="fixed" width="303" height="528" src="https://cdn-images-1.medium.com/max/640/1*k9dAIGCGx-9YIZ7DwIDtFg.png"></amp-img>


### 6. Nuestro primer componente

Ahora crearemos nuestro propio componente con la interfaz de linea de comando de angular:

```
ng g component Home

```

Una vez que el generador finaliza las modificaciones en el directorio src dentro de app vamos a tener una nueva carpeta que hace referencia nuestro nuevo componente.

### 7. Agregar un componente dentro de otro

En este paso lo que haremos es agregar el componente recién creado `home.component.html` al template `app.component.html`. Para esto simplemente borramos lo que hay en el archivo `app.component.html` y agregamos el selector `app-home` de la siguiente manera:

```html
<h1>
 {{title}}
</h1>
<app-home></app-home>
```

Bajo el título de nuestra aplicación debería aparecer lo que esta dentro de nuestro componente.

<amp-img layout="fixed" width="303" height="528" src="https://cdn-images-1.medium.com/max/640/1*ulzQBLdDlFxnrfIhybSIlA.png"></amp-img>


### 8. Agregar datos en el componente
En nuestra aplicación mostraremos una lista de historias dentro de nuestro componente. Comenzaremos por editar nuestro `home.component.ts`:


```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 logros : ILogro[];
 titulo  : string = 'Bienvenidos';

 constructor() { }

 ngOnInit() {
 this.logros = this.getLogros();
 }
 
 getLogros() : ILogro[]{
  return [{
   id:1,
   title:"Logré algo muy interesante",
   description:"Lorem ipsum dolor sit amet"
  }, {
   id:2,
   title:"Logré otra cosa muy interesante",
   description:"Lorem ipsum dolor sit amet"
  }, {
   id:3,
   title:"Logré algo aún mas interesante",
   description:"Lorem ipsum dolor sit amet"
  }
 ]
 }

}

interface ILogro{
  id : number;
  title : string;
  description ?: string;
}
```

Lo primero que haremos es definir una interface `ILogro` (Una interfaz solo define una estructura), con los campos id de tipo number, title de tipo string y descripcion de tipo string, donde el valor `?` indica que el campo puede ser opcional.


También definimos una variable titulo de tipo string que inizializamos en Bienvenidos”.

Luego definimos un arreglo de elementos que cumplan la interfaz logros.

Delegamos la generación de los logros a un método que llamamos `getLogros` y que precisamente devuelve un arreglo con objetos del tipo `ILogro`.

Finalmente en el método `ngOnInit()` asignamos este arreglo a nuestra variable logros.

### 9. Mostrar datos en nuestro componente

Una vez tengamos los datos en el home.component.ts editaremos ahora nuestro `home.component.html` para mostrar lo siguiente:

```html
{{titulo}}
<ul>
  <li *ngFor="let logro of logros">
    {{logro.title}}
  </li>
</ul>
```

Cada vez que queremos imprimir un dato que viene desde nuestro componente colocamos el nombre de la variable entre dos llaves `{{title}}` y lo que este dentro se evalúa como código de javascript y se imprime el valor de la variable. (Esta es la impresión básica de datos).

Para mostrar nuestro arreglo de logros utilizamos la directiva `*ngFor`, dentro de una lista que nos ayuda a repetir la etiqueta `<li>` por cada elemento del arreglo, donde va a ver disponible una variable disponible `logro` la cual sera equivalente a cada uno de los elementos que hay dentro del arreglo.

<amp-img layout="fixed" width="303" height="528" src="https://cdn-images-1.medium.com/max/640/1*OqtjD5Lz4c5p-7XSnxsf5g.png"></amp-img>

### 10. Utilizando Angular Material

Una vez integrado angular material en nuestro proyecto, podemos comenzar a utilizar sus componentes. En este caso utilizamos un toolbar para mostrar el titulo principal de nuestra aplicación con el color `primary` y todo el contenido de nuestra app lo colocamos dentro de una tarjeta mat-card.

Modificaremos el archivo `app.component.html`:

```html
<mat-toolbar color="primary">
  <span>{{title}}</span>
</mat-toolbar>
<mat-card>
  <app-home></app-home>
</mat-card>
```

Por cada componente que utilicemos debemos importar la dependencia y agregar a los imports en el `app.module.ts`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
```

Para que la tarjeta no ocupe todo el ancho de la pantalla modificaremos el archivo `app.component.scss`:

```css
mat-card{
  max-width: 960px;
  margin: 0 auto;
}
```

### 10. El resultado final sera el siguiente:

<amp-img layout="responsive" width="640" height="238" src="https://cdn-images-1.medium.com/max/640/1*XQp8mXwkKUJCoz6Axcgtqg.png"></amp-img>


<amp-img layout="fixed" width="293" height="528" src="https://cdn-images-1.medium.com/max/640/1*Ljx92kLPhyj0rB_B5g7_wQ.png"></amp-img>

Hasta la proxima :)