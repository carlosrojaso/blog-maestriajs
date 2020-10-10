---
layout: post
title: "Angular Testing Framework + Como probar componentes basicos."
keywords: "unit test, pruebas unitartias, angular, pruebas unitarias, webpack, jasmine, karma"
date: 2018-11-19
tags: [testing, demos]
categories: angular
repo: "https://github.com/ng-classroom/demo134"
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-13-%20Angular-Pruebas-Unitarias-Componentes%2Fcover.png?alt=media&token=b8401322-47bf-41d9-a470-85cddfa409f1"
remember: true
versions:
  - title: 'Angular CLI'
    number: '7.0.3'
  - title: 'karma'
    number: '1.7.1'
  - title: 'karma-jasmine'
    number: '1.1.2'
---

> Escribir pruebas unitarias nos ayudará a reducir de forma significativa los errores que puedan llegar a producción, en este articulo vamos a ver como realizarlas en los componentes. Adicionalmente, al ser tan larga los tipos de componentes que podemos probar voy a realizarlo en varios Posts, entonces, comencemos...

<!--summary-->

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-13-%20Angular-Pruebas-Unitarias-Componentes%2Fcover.png?alt=media&token=b8401322-47bf-41d9-a470-85cddfa409f1">



# Como probar la clase de un componente.

Para empezar con nuestras pruebas de componente vamos a crear un proyecto nuevo.

````
$ng new demo134
````

Vamos a crear un componente simple con un boton de la siguiente manera.

````
$ng generate component test
````

y vamos a modificar algunas cosas.

```html
<p>
  <button (click)="clicked()">Click me!</button>
  <span>{{message}}</span>
</p>
```

y la logica.

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  isOn = false;

  get message() {
    return `El test es ${this.isOn ? 'On' : 'Off'}`; 
  }

  clicked() {
    this.isOn = !this.isOn;
  }
}
```

<img width="1875" height="912" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-13-%20Angular-Pruebas-Unitarias-Componentes%2FtestComponent.gif?alt=media&token=97cb11e4-f5c9-4e7b-ac16-e28ae803bae5">

Como puedes ver es un componente sencillo que tiene un `getter` y una `funcion` que hacen cosas muy basicas. Para probar esto simplemente debemos utilizar las funciones de `Jasmine`.

```ts
describe('TestComponent', () => {
  it('#clicked() should toggle #isOn', () => {
    const comp = new TestComponent();
    expect(comp.isOn).toBe(false, 'off al inicio');
    comp.clicked();
    expect(comp.isOn).toBe(true, 'on despues de Click');
    comp.clicked();
    expect(comp.isOn).toBe(false, 'off despues de segundo Click');
  });

  it('#clicked() should set #message to "is on"', () => {
    const comp = new TestComponent();
    expect(comp.message).toMatch(/es off/i, 'off al inicio');
    comp.clicked();
    expect(comp.message).toMatch(/es on/i, 'on after clicked');
  });
});
```

En este estas pruebas simplemente estamos probando de que `comp.isOn` comience en false y se cambie correctamente al darle `click` y de igual manera el mensaje que muestra. Ahora para ejecutar las pruebas solo debemos hacer.

````
$ng test
````

<img width="861" height="506" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-13-%20Angular-Pruebas-Unitarias-Componentes%2Ftests.png?alt=media&token=e8eddfe2-01fd-483c-8cc3-d6e0a74a0294">



# Como probar el DOM de un componente.

Un componente es mas que solo clases. Cuando queremos saber si el componente va a renderizar adecuadamente o responder a las entradas y gestos debemos utilizar un acercamiento distinto y Angular nos va a ayudar mucho en este camino. Ahora vamos a crear otro componente y ver un poco de magia.

````
$ng generate test2
````

El Angular CLI te creara una carpeta y si vemos un poco mas de cerca esta carpeta veras un archivo `test2.component.spec.ts`

```ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Test2Component } from './test2.component';

describe('Test2Component', () => {
  let component: Test2Component;
  let fixture: ComponentFixture<Test2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Test2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

En este archivo que Angular crea por ti vas a encontrar la preparacion del componente `test2` y la prueba de que se este creando el componente. Ahora paso a explicarte varias cosas.

**createComponent()**

Despues de configurar el testBed puedes usar

````
const fixture = TestBed.createComponent(BannerComponent);
````

Esto creara una instancia del componente y agregara los elementos al test-runner DOM y te retornara un `ComponentFixture`.

**ComponentFixture**

El `ComponenteFixture` es un elemento para test que te permitira interactuar con el componente y sus elementos en tus pruebas.

Bueno como ves hasta este punto ya has creado pruebas a las clases de los componentes y a los propios componentes cuando se crean y todo ha sido facíl gracias al `Test Framework` de Angular. Bueno esto es todo por el dia de hoy, hasta un proximo Post :)