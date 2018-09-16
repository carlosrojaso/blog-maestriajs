---
layout: post
title: "Angular Testing Framework + Como probar un modelo"
keywords: "unit test, pruebas unitartias, angular, pruebas unitarias, webpack, jasmine, karma"
date: 2018-09-17
tags: [testing, demos]
categories: ionic2
repo: "https://github.com/ng-classroom/demo129"
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-15-%20Angular-Pruebas-Unitarias%2FPruebas%20unitarias.png?alt=media&token=b5fd0776-2a2f-4e17-b098-59584ab6573d"
remember: true
versions:
  - title: 'Angular CLI'
    number: '6.1.1'
  - title: 'karma'
    number: '1.7.1'
  - title: 'karma-jasmine'
    number: '1.1.2'
---

> Escribir pruebas unitarias nos ayudará a reducir de forma significativa los errores que puedan llegar a producción, en este articulo vamos a ver como empezar a utilizar el conjunto de herramientas que Angular nos provee para realizar pruebas.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-15-%20Angular-Pruebas-Unitarias%2FPruebas%20unitarias.png?alt=media&token=b5fd0776-2a2f-4e17-b098-59584ab6573d"></amp-img>

{% include general/net-promoter-score.html %}

## Angular Testing Framework.

Desde la versión de Angular 2 en adelante Angular provee un conjunto de herramientas para poder preparar las pruebas unitarias y de esta manera podemos escribir pruebas fácilmente para los artefactos de Angular / Ionic, como componentes, directivas, pipes, providers etc.

Cuando iniciamos un proyecto con Angular CLI al momento de crear el proyecto con `ng new nombre-proyecto`, nos entrega un proyecto ya preparado para ejecutar y escribir pruebas unitarias con Karma y Jasmine.

## ¿ Que es Karma ?

Karma es el encargado de correr todas las pruebas unitarias que escribamos y como resultado nos da un reporte que nos muestra las pruebas que pasaron y las pruebas que fallaron. En la mayoría de veces para ejecutar las pruebas unitarias lanza un navegador para correr las pruebas unitarias. Ver mas [aquí](https://karma-runner.github.io/){:target="_blank"}

## ¿ Que es Jasmine ?

[Jasmine](https://jasmine.github.io/){:target="_blank"} es un framework que nos ayudará a escribir pruebas unitarias y se integra fácilmente con Angular.

Jasmine tiene varias herramientas que nos ayuda a escribir nuestras pruebas unitarias. Y vamos a ver las características más importantes, escribiendo pruebas para este modelo:

`
$ng g class models/person.model.ts
`

`src/models/person.model.ts`


```ts
export class Person {
    protected _name: string;
    protected _lastName: string;
    protected _id: number;

    constructor(data: any) {
        if (data.hasOwnProperty('name')) {
            this._name = data.name;
        }
        if (data.hasOwnProperty('lastName')) {
            this._lastName = data.lastName;
        }
        if (data.hasOwnProperty('id')) {
            this._id = data.id;
        }
    }

    get name(): string {
        return this._name;
    }

    get lastName(): string {
        return this._lastName;
    }

    get id(): number {
        return this._id;
    }
}
```

Vamos a usar a la clase `Person` y sobre este modelo vamos a escribir pruebas unitarias con Jasmine, revisemos un poco este modelo:

- Tiene con `constructor` que recibe un objeto.
- Tiene varios `get` que nos devolvera los valores de cada atributo.

Ahora vamos a ponernos manos a la obra y ver las partes clave sobre Jasmine:

## Describe:

La sentencia `describe` se usa para poder agrupar un conjunto de pruebas, donde podemos escribir pruebas unitarias a una clase y luego agrupar pruebas por cada método de la clase así:

```ts
describe("Test for Person", ()=>{

  describe("Test for Person with data", ()=>{
  });

  describe("Test for Person without data", ()=>{
  })
})
```

## It

La sentencia `it`, define cada uno de los casos de prueba que vamos escribir y estarán dentro de cada `describe`. Cada uno de los `it` debe evaluar un caso de prueba en particular. Por ejemplo:


`src/models/person.model.spec.ts`

```ts
describe("Test for Person", ()=>{
  
  describe("Test for Person with data", ()=>{

   it("should be defined", ()=>{	
    //CODE
   })
  })
  
  describe("Test for Person without data", ()=>{

    it("shouldn't be defined", ()=>{
		 //CODE
    })
  })
})
```

## BeforeEach:

La sentencia `beforeEach` la podemos usar para no repetir código, todo lo que este dentro de la sentencia `beforeEach` se ejecuta por cada `describe`

```ts
describe("Test for Person", ()=>{

  beforeEach(()=>{
   //code for each it
  })

  describe("Test for Person with data", ()=>{
  })
  
  describe("Test for Person without data", ()=>{
  })
})
```

## Expect

La sentencia `expect` nos sirve para verificar cualquier comportamiento de nuestro código con lo que esperamos como resultado, por ejemplo:

```ts
expect(6+6).toEqual(12)
expect(1 === 1).toBeThuthy()
expect(null).toBeNull()
expect("Test").toEqual("Test")
```

Si miramos cada uno de los ejemplos estamos usando algunos verificadores de Jasmine en donde podemos verificar una variable contra una de las utilidades de Jasmine. Jasmine tiene varios muy útiles, puedes encontrarlos todos en la documentación oficial [aquí](https://jasmine.github.io/api/2.7/matchers.html){:target="_blank"}.

Ahora podemos seguir con nuestro ejemplo y escribir cada unas de las verificaciones:

`src/models/person.model.spec.ts`

```ts
import { Person } from './person.model';

describe('Test for person', () => {

    describe('Test for Person with data', () => {
        it('should be defined', () => {
            const person = new Person({name: 'Jhon', lastName: 'Doe', id: 24});
            expect(person).toBeDefined();
            expect(person.name).toEqual('Jhon');
            expect(person.lastName).toEqual('Doe');
            expect(person.id).toEqual(24);
        });
    });

    describe('Test for Person without data', () => {
        it('should not be defined', () => {
            const person = new Person({});
            expect(person).toBeDefined();
            expect(person.name).toBeUndefined();
            expect(person.lastName).toBeUndefined();
            expect(person.id).toBeUndefined();
        });
    });
});
```

{% include blog/subscribe.html %}

Ahora vamos a correr nuestras pruebas pruebas con el comando `ng test` en la terminal y miremos el reporte que nos genera:

<amp-img width="824" height="274" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-15-%20Angular-Pruebas-Unitarias%2Fcapt1.png?alt=media&token=7e38e595-18a5-42df-8506-3c81886c8fa5"></amp-img>

Podemos ver que ahora las nuevas pruebas que hemos agregado pasan correctamente con los valores esperados y nos aseguran que en una futura `refactorización` no vayamos a quebrar nada.

Esto es todo, hasta un proximo post :)