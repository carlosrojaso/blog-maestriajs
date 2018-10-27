---
layout: post
title: "Pruebas unitarias: Introducción a Jasmine"
keywords: "unit test, pruebas unitartias, ionic, pruebas unitarias ionic, webpack, jasmine, karma"
date: 2017-08-08
tags: [testing, demos]
categories: ionic2
repo: "https://github.com/ng-classroom/demo117"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-08-intro-jasmine%2FPRUEBAS%20UNITARIAS.jpg?alt=media&token=8941e62a-9aca-4f6a-a410-a2a7cb250634"
remember: true
versions:
  - title: 'ionic'
    number: '3.6.0'
  - title: 'ionic-native'
    number: '3.12.1'
  - title: 'ionic-app-scripts'
    number: '2.1.3'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.6.0'
---

> Escribir pruebas unitarias nos ayudará a reducir de forma significativa los errores que puedan llegar a producción y en nuestro artículo anterior explicamos como [configurar nuestro entorno con Karma y Jasmine](https://www.ion-book.com/blog/ionic2/unit-test-config-ionic/){:target="_blank"}, ahora veremos un poco más acerca de Jasmine.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-08-intro-jasmine%2FPRUEBAS%20UNITARIAS.jpg?alt=media&token=8941e62a-9aca-4f6a-a410-a2a7cb250634"></amp-img>

{% include general/net-promoter-score.html %}

[Jasmine](https://jasmine.github.io/){:target="_blank"} es un framework que nos ayudará a escribir pruebas unitarias y se integra fácilmente con Angular / Ionic. Recuerda nuestro artículo sobre: [Pruebas unitarias: Configuración del entorno.](https://www.ion-book.com/blog/ionic2/unit-test-config-ionic/){:target="_blank"}

Jasmine tiene varias herramientas que nos ayuda a escribir nuestras pruebas unitarias. Y vamos a ver las características más importantes, escribiendo pruebas para este modelo:

`src/models/person.model.ts`


```ts
export class Person{

  constructor(
   public name: string,
   public lastname: string,
   public age: number
  ){}

  getFullName(): string{
   return `${this.name} ${this.lastname}`; 
  }

  getAgeInYears( years: number ): number{
   return this.age + years;
  }
}
```

*Nota: Mas adelante usaremos la metodología de TDD (Desarrollo orientado a las pruebas) para escribir las pruebas.*

Vamos a usar a la clase `Person` y sobre este modelo vamos a escribir pruebas unitarias con Jasmine, revisemos un poco este modelo:

- Tiene con `constructor` que recibe tres parametros
- Tiene el método `getFullName` que nos concatena name y lastname
- Tiene el método `getAgeInYears` que nos retorna un cálculo de la edad de una persona en unos años, por ejemplo, una persona tiene 24 años y quiero saber cuantos años tendrá en 20 años.

Ahora vamos a ponernos manos a la obra y ver las partes clave sobre Jasmine:

## Describe:

La sentencia `describe` se usa para poder agrupar un conjunto de pruebas, donde podemos escribir pruebas unitarias a una clase y luego agrupar pruebas por cada método de la clase así:

```ts
describe("Test for Person", ()=>{

  describe("Test for person.getFullName", ()=>{
  });

  describe("Test for person.getAgeInYears", ()=>{
  })
})
```

## It

La sentencia `it`, define cada uno de los casos de prueba que vamos escribir y estarán dentro de cada `describe`. Cada uno de los `it` debe evaluar un caso de prueba en particular. Por ejemplo:


`src/models/person.model.spec.ts`

```ts
describe("Test for Person", ()=>{
  
  describe("Test for person.getFullName", ()=>{

   it("should return an string with name + lastname", ()=>{	
    //CODE
   })  
  })
  
  describe("Test for person.getAgeInYears", ()=>{

    it("should return '34' years", ()=>{
		 //CODE
    })

    it("should return '24' years", ()=>{
     //CODE
    })

    it("should return '20' years with negative number", ()=>{
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

  describe("Test for person.getFullName", ()=>{
  })
  
  describe("Test for person.getAgeInYears", ()=>{
  })
})
```

## Expect

La sentencia `expect` nos sirve para verificar cualquier comportamiento de nuestro código con lo que esperamos como resultado, por ejemplo:

```ts
expect(6+6).toEqual(12)
expect(1 === 1).toBeThuthy()
expect(null).toBeNull()
expect("Nicolas").toEqual("Nicolas")
```

Si miramos cada uno de los ejemplos estamos usando algunos verificadores de Jasmine en donde podemos verificar una variable contra una de las utilidades de Jasmine. Jasmine tiene varios muy útiles, puedes encontrarlos todos en la documentación oficial [aquí](https://jasmine.github.io/api/2.7/matchers.html){:target="_blank"}.

Ahora podemos seguir con nuestro ejemplo y escribir cada unas de las verificaciones:

`src/models/person.model.spec.ts`

```ts
import { Person } from './person.model';

describe("Test for Person", ()=>{

  describe("Test for person.getFullName", ()=>{

   it("should return an string with name + lastname", ()=>{
     let person = new Person("Nicolas", "Molina", 24);
     expect(person.getFullName()).toEqual("Nicolas Molina");
   });
  });

  describe("Test for person.getAgeInYears", ()=>{

   it("should return '34' years", ()=>{
     let person = new Person("Nicolas", "Molina", 24);
     let age = person.getAgeInYears(10);
     expect(age).toEqual(34);
   });

  it("should return '20' years", ()=>{
     let person = new Person("Nicolas", "Molina", 20);
     let age = person.getAgeInYears(15);
     expect(age).toEqual(35);
  });

  it("should return '20' years with negative number", ()=>{
     let person = new Person("Nicolas", "Molina", 28);
     let age = person.getAgeInYears(-10);
     expect(age).toEqual(28);
  });
 });
});
```

{% include blog/subscribe.html %}

Ahora vamos a correr nuestras pruebas pruebas con el comando `npm test` en la terminal y miremos el reporte que nos genera:

<amp-img width="824" height="274" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-08-intro-jasmine%2FScreen%20Shot%202017-08-08%20at%209.08.48%20AM.png?alt=media&token=18b013ae-934e-4d75-b640-55887a783693"></amp-img>

podemos ver que pasa todas las pruebas menos la última, cuando le envío un numero negativo no debería operar la suma de un numero negativo, así que vamos a refactorizar nuestro método `getAgeInYears`:

### Antes:

```ts
getAgeInYears( years: number ): number{
  return this.age + years;
}
```

### Después:

```ts
getAgeInYears( years: number ): number{
  if( years > 0 ){ 
    return this.age + years;
  }
  return this.age;
}
```

Ahora si corremos todas las pruebas unitarias de nuevo con `npm test` tendremos que todos los casos de prueba funcionan. 

<amp-img width="811" height="372" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-08-08-intro-jasmine%2FScreen%20Shot%202017-08-08%20at%209.12.36%20AM.png?alt=media&token=72d12047-e128-4ac6-881c-8b59c2fadd7e"></amp-img>

Y esto es gracias a uno de los pasos más importante en pruebas unitarias y es la **refactorización**, con las pruebas unitarias detectamos un posible fallo y ahora hicimos una mejora a nuestro código.

Hasta aquí dejaremos nuestra primer introducción a **Jasmine** en los próximos artículos escribiremos pruebas integradas con Angular / Ionic.