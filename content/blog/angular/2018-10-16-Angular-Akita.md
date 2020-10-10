---
layout: post
title: "Usando Akita"
date: 2018-10-16
tags: [angular, architecture]
categories: angular
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-16-Angular-Akita%2FCoverAkita.png?alt=media&token=fec80453-f1ea-4b0d-9f91-641ea539f921"
editname: "angular/2018-10-16-Angular-Akita.md"
versions:
  - title: 'ngxs/store'
    number: '2.0.0'
---
> A medida que tu aplicacion va creciendo y vas creando más y más componentes cada vez es mas dificil saber quien cambia el estado de los datos. Akita es una alternativa para State Management como lo es Ngrx o Ngxs.

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-16-Angular-Akita%2FCoverAkita.png?alt=media&token=fec80453-f1ea-4b0d-9f91-641ea539f921"> 

 

## ¿ Que es Akita ?

Akita es un patrón de `Store Management`, construido sobre RxJs, el cual toma ideas de otras opciones en el mercado, como los multiples datastores de `Flux`, las actualizacion inmutables de `Redux` y los flujos de datos, para crear `Observable Data Stores model`.

La arquitectura de Akita esta basado en principios de diseño orientado a Objetos.

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-16-Angular-Akita%2Fakita_Architecture.png?alt=media&token=72ef228f-636c-4593-87e1-c6b68571a57b">


### Beneficios.

- Paradigma orientado a Objetos. No funcional.
- El problema del Boilerplate.

### Los principios de Akita.

- El `Store` es un objeto simple el cual contiene el estado del Store y sirve como "Simple fuente de la verdad".

- La unica forma de cambiar el estado es llamando a `setState()` o uno de los metodos basados en el.

- Un componente No debe obtener la información directamente del `Store` sino que debe usar un `Query`.

- Logica asincrona y llamadas de actualización deben ser encapsuladas en Servicios.




### El Modelo.

Es la representación de una entidad.

```ts
import { ID } from '@datorama/akita';

export type Todo = {
  id: ID;
  title: string;
  completed: boolean;
};

export function createTodo({ id, title }: Partial<Todo>) {
  return {
    id,
    title,
    completed: false
  } as Todo;
}
```

### La entidad Store.

Como dijimos anteriormente es la unica fuente de la verdad. El `Entity Store` es una clase que te entrega todo lo que necesitas para administrar el `Store`.

```ts
import { Todo } from './todo.model';
import { EntityState, EntityStore } from '@datorama/akita';

export interface State extends EntityState<Todo> {}

@Injectable({
  providedIn: 'root'
})
export class TodosStore extends EntityStore<State, Todo> {
  constructor() {
    super(initialState);
  }
}
```

### la entidad de Consultas.

La manera de acceder a los estados desde un componente es a través de Queries. El `Entity Query` es una clase que te entrega todo lo que necesitas para realizar estas operaciones.

```ts
import { QueryEntity } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class TodosQuery extends QueryEntity<State, Todo> {
  constructor(protected store: TodosStore) {
    super(store);
  }
}
```

## ¿ Como empezar ?

Instala la libreria en tu proyecto.

```
$npm i @datorama/akita --S
```

y ya estas preparado para comenzar a utilizar esta otra alternativa para el `Store Management`

Espero este Post sea de utilidad :)