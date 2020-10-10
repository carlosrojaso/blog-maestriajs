---
layout: post
title: "Usando Ngxs en Angular"
date: 2018-11-22
tags: [angular, architecture]
categories: angular
author: hllauradofalco
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-22-usando-ngxs%2Fcover.png?alt=media&token=a0243de8-2e35-44a7-b305-9d66fce9c037"
editname: "angular/2018-11-22-usando-ngxs.md"
versions:
  - title: 'ngxs/store'
    number: '2.0.0'
---
> En este sitio se ha escrito con anterioridad sobre manejadores de estados, por qué existen, que resuelven y como lo hacen. Desde `NGRX` o `NGXS`, hasta el último que se ha sumado al barco como `Akita`. Todos ellos muy buenos  y que de una forma u otra resuelven lo mismo, que no es más que controlar el estado global de nuestra aplicación.

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-22-usando-ngxs%2Fcover.png?alt=media&token=a0243de8-2e35-44a7-b305-9d66fce9c037"> 

 

Pero como toda herramienta tiene sus ventajas y sus desventajas. Claro está, todas estas tienen más ventajas que desventajas, sino no las estuviéramos utilizando en nuestros proyectos. Pero si hay algo que nos molesta de estás librerías es la cantidad de archivos extras repetitivos que nos generan y la curva de aprendizaje que tienen cada uno de ellos. 

En mi caso personal el que más he utilizado es `NGXS` y hace relativamente poco, sacaron un nuevo paquete que nos permite reducir un poco más esos molestos archivos extras o por lo menos no crearlos hasta que realmente lo necesitemos.
Emitter: Este paquete te permite, como dicen ellos, deshacerte de las acciones hasta que realmente las necesitemos, ya que realmente no nos aporta mucho a nuestro proyecto y si nos crea un sin número de nuevos archivos a medida que va creciendo nuestra aplicación. Donde para registrar acciones directamente a nuestro estado utilizamos los beneficios de los decoradores.

## Instalación

````
$npm install @ngxs/store –save
$npm install @ngxs-labs/emitter
````



## Uso

Importamos en el módulo principal de la aplicación NgxsModule y NgxsEmitPluginModule.

```ts
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
​
@NgModule({
    imports: [
        NgxsModule.forRoot(states),
        NgxsEmitPluginModule.forRoot()
    ]
})
export class AppModule {}
```

Luego creamos un archivo donde crearemos el estado inicial de nuestra aplicación y la clase que gestionará ese estado.

```ts
import { State, StateContext } from '@ngxs/store';
import { Receiver } from '@ngxs-labs/emitter';
​
@State<number>({
    name: 'counter',
    defaults: 0
})
export class CounterState {
    @Receiver()
    public static increment({ setState, getState }: StateContext<number>) {
        setState(getState() + 1);
    }
​
    @Receiver()
    public static decrement({ setState, getState }: StateContext<number>) {
        setState(getState() - 1);
    }
}
```

Y a continuación mostramos como utilizaríamos los métodos “increment” y “decrement” dentro de nuestro componente.

```ts
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
​
import { Observable } from 'rxjs';
​
import { CounterState } from './counter.state';
​
@Component({
    selector: 'app-counter',
    template: `
        <ng-container *ngIf="counter$ | async as counter">
            <h3>Counter is {{ counter }}</h3>
        </ng-container>
​
        <button (click)="increment.emit()">Increment</button>
        <button (click)="decrement.emit()">Decrement</button>
    `
})
export class CounterComponent {
    @Select(CounterState)
    public counter$: Observable<number>;
​
    // Use in components to emit asynchronously payload
    @Emitter(CounterState.increment)
    public increment: Emittable<void>;
​
    @Emitter(CounterState.decrement)
    public decrement: Emittable<void>;
}
```

Acá lo diferente de como normalmente utilizamos Ngxs, es que hacemos un mayor uso de los decoradores, donde el decorador `@Select` es el mismo que conocemos con anterioridad y el nuevo es el `@Emitter`. Donde este nos relaciona la variable “increment” con la función “increment” de la clase CounterState y para ejecutar esa acción decimos “increment.emit()”. Lo mismo sucede con la variable “decrement” de nuestro componente. 

En el caso que necesitamos pasar parámetros podemos hacerlo de la siguiente manera:

```ts
import { State, StateContext } from '@ngxs/store';
import { Receiver } from '@ngxs-labs/emitter';
​
@State<string[]>({
    name: 'animals',
    defaults: []
})
export class AnimalsState {
    @Receiver()
    public static addAnimal({ setState, getState }: StateContext<string[]>, { payload }: EmitterAction<string>) {
        setState([
            ...getState(),
            payload
        ]);
    }
}

import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
​
import { Observable } from 'rxjs';
​
import { AnimalsState } from './animals.state';
​
@Component({
    selector: 'app-root',
    template: `
        <p *ngFor="let animal of (animals$ | async)">{{ animal }}</p>
        <button (click)="addAnimals()">Add animals</button>
    `
})
export class AppComponent {
    @Select(AnimalsState)
    public animals$: Observable<string[]>;
​
    @Emitter(AnimalsState.addAnimal)
    private addAnimal: Emittable<string>;
​
    public addAnimals(): void {
        this.addAnimal.emitMany(['panda', 'zebra', 'monkey']);
    }
}
```

Y para no hacer más extenso el articulo les pongo como pudiéramos agregarle las acciones.

```ts
@Receiver({ type: '[App information] Get app information' })
    public static async getAppInformation({ setState }: StateContext<AppInformationStateModel>) {
        setState(
            await this.appService.getAppInformation()
        );
    }
```

Para más información de este paquete no dejen de consultar la página oficial de [NGXS](https://ngxs.gitbook.io/ngxs).