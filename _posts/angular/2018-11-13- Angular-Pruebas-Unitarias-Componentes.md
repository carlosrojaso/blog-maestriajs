---
layout: post
title: "Angular Testing Framework + Como probar componentes basicos."
keywords: "unit test, pruebas unitartias, angular, pruebas unitarias, webpack, jasmine, karma"
date: 2018-11-19
tags: [testing, demos]
categories: angular
repo: "https://github.com/ng-classroom/demo133"
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

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-13-%20Angular-Pruebas-Unitarias-Componentes%2Fcover.png?alt=media&token=b8401322-47bf-41d9-a470-85cddfa409f1"></amp-img>

{% include general/net-promoter-score.html %}

# Como probar la clase de un componente.

Vamos a crear un componente simple con un boton de la siguiente manera.

```ts
@Component({
  selector: 'test-comp',
  template: `
    <button (click)="clicked()">Click me!</button>
    <span>{{message}}</span>`
})
export class TestComponent {
  isOn = false;

  get message() { return `El test es ${this.isOn ? 'On' : 'Off'}`; }

  protected clicked() { this.isOn = !this.isOn; }

}
```

Como puedes ver es un componente sencillo que tiene un `getter` y una `funcion` que hacen cosas muy basicas. Para probar esto simplemente debemos utilizar las funciones de `Jasmine`.


```ts
describe('TestComponent', () => {
  it('#clicked() should toggle #isOn', () => {
    const comp = new TestComponent();
    expect(comp.isOn).toBe(false, 'off at first');
    comp.clicked();
    expect(comp.isOn).toBe(true, 'on after click');
    comp.clicked();
    expect(comp.isOn).toBe(false, 'off after second click');
  });

  it('#clicked() should set #message to "is on"', () => {
    const comp = new LightswitchComponent();
    expect(comp.message).toMatch(/is off/i, 'off at first');
    comp.clicked();
    expect(comp.message).toMatch(/is on/i, 'on after clicked');
  });
});
```

# Como probar el DOM de un componente.