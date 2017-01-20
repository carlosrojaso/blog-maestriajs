---
layout: post
title: "Clase 4 - Objetos."
date: 2017-01-19
tags: [class, ionic2]
categories: ionic2
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fclase4%2Fphoto.png?alt=media&token=fa8b622a-ae10-4e33-a34a-238ab162de8a"
draft: true
---
> Hola Ioners!!! y bienvenido a la Clase 4. Hooray!!!

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fclase4%2Fphoto.png?alt=media&token=fa8b622a-ae10-4e33-a34a-238ab162de8a"></amp-img> 

Hasta el momento has aprendido lo siguiente.

* [Como conectar una App con Ionic Cloud.](/blog/ionic2/clase-3-user-auth/){:target="_blank"}
* [Algunos fundamento de Ionic y las tecnologias que lo componen.](/blog/ionic2/clase-2-feed/){:target="_blank"}

Ahora, vamos a aprender sobre las Clases y los Objetos y vamos a crear nuestra vista de Noticias.

## Que es un Objeto ?

Un Objeto son datos compuestos. Combina varios tipos de datos dentro de un solo paquete. Lo que hace un objeto unico es que combina datos con codigo. 

## Que es una Clase ?

Las clases son el tipo de dato de los Objetos. Cada clase define los valores y tipos de datos que va a manejar, ademas de los procedimientos que va a utilizar para manipular esos datos y entregar resultados.

Puedes ver una clase como una plantilla y el objeto como el producto de esa plantilla.

<amp-img width="560" height="245" layout="responsive"  src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2Fobject.png?alt=media&token=1b29e488-c458-4e8e-bb87-442a1054b60f" alt=""></amp-img> 

Los objetos tienen dos caracteristicas más atributos y metodos. Atributos son propiedades que tienen los objetos y los metodos son funciones que pueden revisar los objetos. Tu puedes ver un ejemplo en esta imagén.

<amp-img width="245" height="245"  layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2FCPT-OOP-objects_and_classes_-_attmeth.svg.png?alt=media&token=d9774d2b-d8a8-4ffa-b788-9ced6212340d" alt=""></amp-img>

Si pones un ojo en tu App nosotros podemos encontrar este elemento en nuestro Proyecto.

### login.ts

{% highlight js %}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class LoginPage {
   myForm: FormGroup;
}

{% endhighlight %}

Si ves esta pieza de codigo, tu puedes ver las palabras ````ìmport```` y ````export````. ````import```` es la palabra que le dice a Ionic que vas a
crear objetos de las clases que estas importando. De la misma manera la palabra ````export```` le dice a Ionic que esa clase que estas creando  podra ser 
importada en el futuro.

Ahora vamos a usar un servicio. Un servicio es algo asi como una pieza de codigo con metodos que tu vas a reusar en diferentes partes de tu app.
para crear un provider vamos utilziar el comando ````generate````.

{% highlight js %}

$ ionic g provider rssService

{% endhighlight %}

y ahora necesitamos decirle a Ionic que vamos a utilizar este servicio.

### app.module.ts

{% highlight js %}

...
import { rssService } from '../providers/rssService';
...
@NgModule({
  declarations: [
    MyApp,
...
...
  providers: [rssService]
})
export class AppModule {}

{% endhighlight %}

Ok, ahora estamos listos para continuar con nuestra App.



