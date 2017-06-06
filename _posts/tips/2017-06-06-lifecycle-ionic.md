---
layout: post
title: "Aprende el ciclo de vida de un componente en Ionic"
keywords: "ciclo de vida en ionic"
date: 2017-06-06
tags: [tips, news]
categories: tips
author: hllauradofalco
cover: "/images/posts/tips/2017-06-06-lifecycle-ionic/cover.jpg"
---

> Aprender los ciclos de vida de un componente en Ionic, te ayudará a obtener mejor control de tu aplicación, aprende todo en este artículo. 

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/tips/2017-06-06-lifecycle-ionic/cover.jpg"></amp-img>

En Ionic normalmente cuando nos referimos a una vista de la aplicación estamos hablando de una página que a la vez es un componente de Angular. Todo componente de Angular tiene un ciclo de vida, lo mismo sucede con Ionic. Angular nos ofrece una serie de eventos que podemos capturar en cada etapa del ciclo de vida de su componente activo y que podemos hacer uso de ellos en Ionic, pero en este caso nos ocuparemos de los eventos propios de Ionic. 

Estos eventos nos informan en qué etapa específica nos encontramos del ciclo de vida de un componente desde su creación hasta su destrucción para que de esta manera puedas ejecutar tareas de manera más eficientes en tu aplicación. 

Luego de esta breve introducción seguro te preguntarás, ¿cuáles son estos eventos que Ionic nos brinda?

<amp-img width="924" height="381" layout="responsive" src="/images/posts/tips/2017-06-06-lifecycle-ionic/img1.png"></amp-img>

## constructor

Esto es realmente una característica estándar de las clases en ES6 y no proporcionada directamente por Ionic, pero es el primer evento que se dispara cuando se crea una página. En este momento no hay seguridad que todo dentro de su clase esté listo para su uso. Acá no se debe de realizar llamadas API REST, ya que esto podría retrasar la creación de su clase y con ello hacer lenta la aplicación o causar comportamientos inesperados. Debe de mantenerse lo más simple posible y solo inicializar las variables de su clase. Este evento se dispara cuando se está creando la página y solo lo hace una vez.

```ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(){
    //your code
  } 

  ...

}
```

{% include blog/subscribe.html %}

## ionViewCanEnter

Este sería nuestro guardia de navegación y es muy útil si queremos chequear algo antes de entrar a la página. Es el evento ideal para comprobar si cuentas con los permisos para poder ver el contenido de la página.  Debes de asegurarte que la lógica que utilices acá devuelva un booleano.

```ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ...

  ionViewCanEnter(){
    return //your check;
  }

}
```

## ionViewDidLoad

Se ejecuta cuando la página se ha cargado. Este evento sólo se activa una vez y sólo una vez como la función constructor(), pero la diferencia es que en este punto, puede estar seguro de que todas sus variables y dependencias inyectadas están disponibles para su uso. Esta es la función donde usted puede hacer todas sus llamadas HTTP iniciales para obtener sus datos y hacer el levantamiento pesado principal de su aplicación. No puede olvidar que el código que se ejecuta aquí solo se llama una vez.

```ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ...

  ionViewDidLoad(){
    //your code;
  }

}
```

## ionViewWillEnter

Se ejecuta cuando la página está a punto de entrar y convertirse en la página activa. A pesar de que la página está completamente cargada desde el punto de vista del código, todavía hay mucha magia que se está realizando detrás de la escena para hacer que tu página sea totalmente activa y visible para el usuario. Ionic todavía tiene una cierta lógica interna para manejar cosas como la animación de las transiciones etc. Este es un gran lugar para tareas que se deben de realizar siempre que entras en la vista, como activar listener de eventos, actualizar una tabla, ocultar y mostrar cosas en su página antes de que sea visible para el usuario etc.

```ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ...

  ionViewWillEnter(){
    //your code;
  }

}
```

## ionViewDidEnter

Se ejecuta cuando la página ha entrado completamente y ahora es la página activa. Este evento se disparará, ya sea la primera carga o al cargar la página en caché. Es la función final que se activa al navegar en una página como parte del ciclo de vida de ella. Acá ya puedes poner toda la lógica que desees aunque se utiliza fundamentalmente para alguna característica que necesitas que el usuario vea muy pronto o la primera cosa que desees que el usuario interactúe cuando entre a la página.

```ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ...

  ionViewDidEnter(){
    //your code;
  }

}
```

## ionViewCanLeave

Corre antes de que la vista pueda salir. Esto puede usarse como una especie de "guardia" en las vistas autenticadas donde necesita comprobar los permisos antes de que la vista pueda salir. En esencia es lo mismo a  ionViewCanEnter() pero en este caso te deja salir de la página si la lógica que utilizaste dentro de ella retorna true.

```ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ...

  ionViewCanLeave(){
    return //your check;
  }

}
```

## ionViewWillLeave

Se ejecuta cuando la página está a punto de salir. En el punto en que se desencadena este evento, sigue siendo la página activa, pero se ha puesto en cola para que se elimine y ya no se puede evitar salir de la página. Acá puede ser un buen lugar para preparar los datos que podrías utilizar en la siguiente página o realizar una llamada asíncrona alguna API que se necesitará en la próxima vista.

```ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ...

  ionViewWillLeave(){
    //your code;
  }

}
```

## ionViewDidLeave

Se ejecuta cuando la página ha terminado de salir y ya no es la página activa. Esta función es un gran lugar para guardar datos o estados de la página que está dejando, así cómo activar algunas operaciones de fondo que no requieren que la vista sea visible

```ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ...

  ionViewDidLeave(){
    //your code;
  }

}
```

## ionViewWillUnload

Es el último evento que se dispara en el ciclo de vida de una página típica de Ionic. Este es el lugar donde se liberan los recursos que ya no son necesarios y todo tipo de limpieza para evitar posibles pérdidas de memoria. Acá haces el “unsubscribe” a los eventos y observables que te hayas suscrito. Esta función sólo se ejecuta una vez y es la última parada antes de que la página se destruya y se desvincula de la vista con todos sus elementos eliminados.


```ts
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  ...

  ionViewWillUnload(){
    //your code;
  }

}
```

Ahora ya con este control de eventos puedes mejorar el control y velocidad de tu aplicación en ionic.
