---
layout: post
title: "Filtrar lista de alto rendimiento en Ionic 2 y 3"
date: 2018-01-08
tags: [ionic, filter, list]
categories: ionic2
author: williambastidas
cover: "https://cdn-images-1.medium.com/max/800/1*FkhVb9V4G1LDRQ40-Gi9sQ.png"
remember: true
editname: "ionic2/2018-09-01-ionic-filter-list.md"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.19.0'
---

> Mostrar una lista con datos es quizás uno de los elementos más comunes de una aplicación móvil, y agregar la capacidad de buscar y filtrar esas listas también es una característica común. Necesitamos poder hacer esto en nuestras aplicaciones Ionic 2 y 3, y debe hacerse de una manera que proporcione un alto nivel de rendimiento.

<img width="1024" height="512" class="responsive" src="https://cdn-images-1.medium.com/max/800/1*FkhVb9V4G1LDRQ40-Gi9sQ.png" alt="Ionic PWA firebse hosting">

 

En este artículo vamos a ver cómo filtrar los datos de la lista en Ionic 2y 3, con un enfoque en el **rendimiento** y la **usabilidad**. Aquí le damos un vistazo rápido a lo que construiremos:

<img width="392" height="480" class="responsive" src="https://cdn-images-1.medium.com/max/800/1*YdOVAs24kTPes5DPhxcy-g.gif" alt="Ionic PWA firebse hosting">


### 1. Generar una nueva aplicación Ionic 2

Comencemos generando una nueva aplicación en blanco Ionic 2. La aplicación solo tendrá una página que mostrará una lista con una barra de búsqueda.

Ejecute el siguiente comando para generar una nueva aplicación Ionic 2:

```
ionic start ionic2-filtro-busqueda blank
```

### 2. Crear el provider

Ejecute el siguiente comando para generar el provider:

```
ionic g provider Data
```

### 3. Filtrado básico (modificar provider)

Nuestro DataProvider almacenará algunos datos estáticos y crearemos una función a la que podemos llamar para devolver un subconjunto de esos datos en función de algunos criterios de búsqueda.

Configuramos una variable **items** que luego llenamos con un array de datos en el constructor. Este es nuestro conjunto de datos predeterminado. Luego, implementamos una función **filterItems** que incluirá **searchTerm** y nos proporcionará un array que contiene solo los elementos que coinciden con los criterios de búsqueda.

Cuando trabajamos con arreglos, tenemos dos funciones muy útiles que podemos aprovechar: `filter` y `map`. Un “filter” eliminará elementos de un array en función de alguna función. Un “map” cambiará elementos en un array en función de alguna función.


Modificaremos nuestro `src/providers/data.ts` para reflejar lo siguiente:

```ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class DataProvider {
items: any;
constructor(public http: Http) {
  this.items = [
  {title: 'one'},
  {title: 'two'},
  {title: 'three'},
  {title: 'four'},
  {title: 'five'},
  {title: 'six'}]
}
  filterItems(searchTerm){
  return this.items.filter((item) => {
   return item.title.toLowerCase().indexOf(
     searchTerm.toLowerCase()) > -1;
   });
  }
}
```

En el código anterior filtramos el array de elementos. La función filter solo devolverá verdadero para los elementos en los que el termino de búsqueda está contenido en algún lugar dentro de la cadena del título. Luego devolvemos ese array filtrado, que ahora solo contendrá elementos que coincidan con los criterios de búsqueda.

### 4. Importar y añadir HttpModule

También debemos importar y añadir `HttpModule` a nuestro modulo principal `app.module.ts`:

```ts
import { HttpModule } from '@angular/http';
imports: [
  BrowserModule,
  HttpModule,
  IonicModule.forRoot(MyApp)
],
```

### 5. Modificar home.ts para reflejar lo siguiente:

```ts
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {
searchTerm: string = '';
items: any;
constructor(public navCtrl: NavController, public dataService: DataProvider) { }
 ionViewDidLoad() {
 this.setFilteredItems();
 }
 setFilteredItems() {
 this.items = this.dataService.filterItems(this.searchTerm);
 }
}
```

Ahora que tenemos una forma de filtrar los datos, solo debemos aprovecharla. En esta clase, también tenemos una variable “items” que usaremos para almacenar el array filtrado devuelto por el provider data. También tenemos un `searchTermque` el usuario podrá controlar, y esto se suministra a la función `setFilteredItems` que llamará a la función del provider.

Inicialmente llamamos `setFilteredItems` en el evento ionViewDidLoad para que se muestren los datos predeterminados al inicializar la vista, y luego cada vez que llamemos `setFilteredItems()` devolverá un array de datos en función de los términos de búsqueda enviados.


### 6. Agregar <ion-searchbar> al home.html

Agregamos una barra de búsqueda aquí para que el usuario pueda definir su propio término de búsqueda. Tenemos un enlace de datos bidireccional configurado `searchTerm`, por lo que tan pronto como el usuario modifique el valor en `<ion-searchbar>` el valor en nuestra clase también cambiará. Luego escuchamos para que el evento `(ionInput)` detecte cuándo el usuario ha modificado la búsqueda, y llamamos `setFilteredItems()` para activar el filtrado de los datos.

```html
<ion-header>
  <ion-navbar>
    <ion-title>
  Ionic Blank
    </ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-searchbar [(ngModel)]="searchTerm"   (ionInput)="setFilteredItems()"></ion-searchbar>
  <ion-list>
    <ion-item *ngFor="let item of items">
      {{item.title}}
    </ion-item>
  </ion-list>
</ion-content>
```

### 7. Filtrado con Observables

Tenemos una lista configurada que filtra los datos sin usar un pipe, pero podemos llevar eso aún más allá. Actualmente estamos buscando cada vez que el usuario ingresa un valor en la barra de búsqueda.

No necesitamos que la búsqueda suceda hasta que el usuario haya terminado de escribir. Idealmente, queremos darle al usuario un tiempo para terminar de escribir su búsqueda antes de activar una búsqueda, y podemos hacerlo fácilmente con un **Observable**.

Angular 2 proporciona un Observable que podemos usar con entradas a las que se puede acceder a través de **Control** . Esto nos permitirá escuchar la información de una manera más avanzada. Vamos a ver.

Modifique `home.ts` para reflejar lo siguiente:


```ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import 'rxjs/add/operator/debounceTime';
@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {
searchTerm: string = '';
searchControl: FormControl;
items: any;
constructor(public navCtrl: NavController, public dataService: DataProvider) {
 this.searchControl = new FormControl();
}
ionViewDidLoad() {
 this.setFilteredItems();
 this.searchControl.valueChanges.debounceTime(700).subscribe(search  => {
 this.setFilteredItems();
 });
}
setFilteredItems() {
 this.items = this.dataService.filterItems(this.searchTerm);
}
}
```

Ahora estamos importando `FormControl` y el operador `debounceTime`.Configuramos una nueva variable llamada `searchControl`, y luego creamos una nueva instancia de `Control` y sela asignamos. Verás cómo enlazamos eso con el `<ion-searchbar>` de nuestra plantilla en solo un momento.

Con `FormControl`, nos podemos suscribir al observable `valueChange` que emitirá algunos datos cada vez que cambie el valor del campo de entrada. Sin embargo, no solo escuchamos los cambios, también encadenamos el operador `debounceTime`, lo que nos permite especificar el tiempo que queremos esperar antes de activar lo observable. Si el valor vuelve a cambiar antes de que `debounceTime` expire, no se activará. Esto evitará que `setFilteredItems` llame a la función y, dependiendo de qué tan rápido el usuario escriba, solo se debe llamar una vez por búsqueda. En este caso, estamos configurando un tiempo `debounceTimede` 700 milisegundos, pero puede ajustarlo para que sea lo que quiera.

Modifique `home.html` para reflejar lo siguiente:


```html
<ion-header>
 <ion-navbar>
  <ion-title>
   Ionic Blank
  </ion-title>
 </ion-navbar>
</ion-header>
<ion-content>
 <ion-searchbar [(ngModel)]="searchTerm"  [formControl]="searchControl"></ion-searchbar>
  <ion-list>
   <ion-item *ngFor="let item of items">
    {{item.title}}
   </ion-item>
 </ion-list>
</ion-content>
```

La última pieza del rompecabezas es conectar nuestro `<ion-searchbar>` al `searchControlcreado`. Hemos eliminado el oyente `(ionInput)`, porque la función de filtrado ahora será activada por el Observable.

### 8. Mejorando la experiencia del usuario

Nuestro filtro de listas está diseñado muy bien ahora, y debería funcionar muy bien. Sin embargo, dado que hemos agregado el operador `debounceTime`, provoca un ligero retraso que sin duda será perceptible para el usuario. Cada vez que hacemos algo "en segundo plano", debemos indicarle al usuario que algo está sucediendo; de lo contrario, parecerá que la interfaz está rezagada o rota.

Una demora está bien, y un retraso artificial a veces es incluso beneficioso, pero definitivamente no quiere dejar al usuario preguntándose “¿es esto lento o está congelado?”.

Vamos a hacer un cambio ahora que no tendrá ningún efecto en el rendimiento, pero tendrá un impacto en la percepción del usuario de la capacidad de respuesta de la aplicación. Simplemente vamos a agregar un spinner que se mostrará cuando una búsqueda esté en progreso.

Modifique `home.html` para reflejar lo siguiente:

```html
<ion-header>
 <ion-navbar>
  <ion-title>
   Ionic Blank
  </ion-title>
 </ion-navbar>
</ion-header>
<ion-content>
 <ion-searchbar [(ngModel)]="searchTerm"  [formControl]="searchControl" (ionInput)="onSearchInput()"></ion-searchbar>
 <div *ngIf="searching" class="spinner-container">
  <ion-spinner></ion-spinner>
 </div>
 <ion-list>
   <ion-item *ngFor="let item of items">
    {{item.title}}
   </ion-item>
 </ion-list>
</ion-content>
```

Hemos agregado un `<ion-spinner>`, que simplemente muestra una pequeña animación de spinner, y solo la mostramos cuando se `searching` evalúa como verdadero (lo definiremos en un momento). También hemos agregado el `(ionInput)` nuevamente, pero esta vez lo usaremos para determinar cuándo está buscando el usuario.

Modifique `home.ts` para reflejar lo siguiente:

```ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import 'rxjs/add/operator/debounceTime';
@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {
 searchTerm: string = '';
 searchControl: FormControl;
 items: any;
 searching: any = false;
constructor(public navCtrl: NavController, public dataService: DataProvider) {
 this.searchControl = new FormControl();
}
ionViewDidLoad() {
 this.setFilteredItems();
 this.searchControl.valueChanges.debounceTime(700).subscribe(sear ch => {
 this.searching = false;
 this.setFilteredItems();
 });
}
onSearchInput(){
 this.searching = true;
}
setFilteredItems() {
 this.items = this.dataService.filterItems(this.searchTerm);
}
}
```

Inicialmente, establecemos `searchingen` false y lo configuramos como true cuando el usuario comienza a buscar. Una vez que se activan nuestros observables y llamamos a la función de filtro, establecemos `searching` que sea false de nuevo para que el spinner esté oculto.

Ahora solo necesitamos agregar un poco de estilo a la ruleta para centrarla.

Modifique `home.scss` para reflejar lo siguiente:

```css
page-home {
 .spinner-container {
 width: 100%;
 text-align: center;
 padding: 10px;
 }
}
```

Finalmente si cada uno de nuestros items tuviera más de un atributo, como por ejemplo {title: string, description:string…} (aunque no es nuestro caso), y quisiéramos extender el rango de búsqueda en más de un item solo debemos modificar nuestro método filterItems en el provider data.ts, para que retorne la búsqueda en cada atributo que deseemos. Quedaría algo como esto:

```ts
filterItems(searchTerm){
 return this.items.filter((item) => {
  return item.title.toLowerCase().
   indexOf(searchTerm.toLowerCase()) > -1 ||
     item.description.toLowerCase().
      indexOf(searchTerm.toLowerCase()) > -1;
 });
}
```

### Resumen
Los métodos descritos en este tutorial deberían ayudar a crear filtros de listas de alto rendimiento para casi cualquier escenario. No siempre es necesario usar el enfoque basado en Observable al filtrar listas básicas, pero ciertamente verá una mejora en el rendimiento para filtrar grandes listas de datos. Este artículo esta basado en el artículo original [High Performance List Filtering in Ionic 2 & 3](https://www.joshmorony.com/high-performance-list-filtering-in-ionic-2/) de Joshua Morony con algunas actualizaciones.

Para descargar o clonar el código fuente de este proyecto:
* [VER CÓDIGO](https://github.com/wibastidas/ionic2-filtro-busqueda)



Hasta la proxima :)