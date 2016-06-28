---
layout: post
title: "¿Qué es ionic generator?"
tags: ionic2 cli
date: 2016-06-20
categories: ionic2
comments: true
author: nicobytes
---

> **Ionic generator** es una función del CLI de **ionic2** para crear automáticamente piezas clave de nuestra aplicación, lo cual nos ahorra mucho tiempo y aumenta nuestra rapidez para desarrollar un proyecto.

Lo que podemos crear automáticamente usando **ionic generator** será lo siguiente:

1. component
1. directive
1. page
1. provider

# ionic g page [PageName]

Empezaremos creando una nueva **page**, es lo que más vamos a usar en proyectos con ionic2, solo tenemos que ir a nuestra terminal y dentro del proyecto ejecutar el siguiente comando:

```
ionic g page login

# Results:
√ Create app/pages/login/login.html
√ Create app/pages/login/login.scss
√ Create app/pages/login/login.ts
```

Cuando creamos una **page**, ionic crea esta página dentro la carpeta *<u>pages</u>* y creará tres archivos por cada página (*.html*, *.scss* y *.ts*). 
El archivo `login.html` será nuestro template, el archivo `login.scss` donde definimos los estilos de la página y finalmente el archivo `login.ts` donde estará toda la lógica:

`login.ts`:

{% highlight javascript linenos %}
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  constructor(public nav: NavController) {}
}
{% endhighlight %}

y su template `login.html`: 

{% highlight html linenos %}
<ion-navbar *navbar>
  <ion-title>login</ion-title>
</ion-navbar>
<ion-content padding class="login">
</ion-content>
{% endhighlight %}

# ionic g component [ComponentName]

Un **component** es una pieza de código que podremos usar en cualquier parte de nuestra aplicación y para un crear un **component** vamos a nuestra terminal ejecutando el siguiente comando:

```
ionic g component myComponent

# Results:
√ Create app/components/my-component/my-component.html
√ Create app/components/my-component/my-component.ts
```

**Automáticamente** ionic nos crea el archivo `my-component.ts` y su template `my-component.html`, los componentes creados quedarán en la carpeta de *<u>components</u>* del proyecto. 

`my-component.ts`:

{% highlight javascript linenos %}
import {Component} from '@angular/core';
@Component({
  selector: 'my-component',
  templateUrl: 'build/components/my-component/my-component.html'
})
export class MyComponent {
  text: string = "";
  constructor() {
    this.text = 'Hello World';
  }
}
{% endhighlight %}

# ionic g directive [DirectiveName]

Una **directive** es un modificador de atributos que podemos usar en cualquier elemento de nuestra aplicación, para crearla vamos a nuestra terminal ejecutando el siguiente comando:

```
ionic g directive myDirective

# Results:
√ Create app/components/my-directive/my-directive.ts
```

ionic nos dejara nuestra nueva **directive** igualmente dentro de la carpeta  *<u>components</u>*.

`my-directive.ts`:

{% highlight javascript linenos %}
import {Directive} from '@angular/core';
@Directive({
  selector: '[my-directive]' // Attribute selector
})
export class MyDirective {
  constructor() {
    console.log('Hello World');
  }
}
{% endhighlight %}

# ionic g provider [ProviderName]

Ahora crearemos un nuevo servicio (**provider**), los providers son los encargados de **manipular los datos** como: conexiones con REST Api, Localstorage, SQLite etc. Para crearla vamos a nuestra terminal ejecutando el siguiente comando:

```
ionic g provider userService

# Results:
√ Create app/providers/user-service/user-service.ts
```

el código del servicio será el siguiente:

`user-service.ts`:

{% highlight javascript linenos %}
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  data: any = null;

  constructor(public http: Http) {}

  load() {
    if (this.data) {
    }
    return new Promise(resolve => {
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
{% endhighlight %}

ionic nos dejará todos los providers dentro de una carpeta llamada *<u>providers</u>*.

# ionic g pipe [PipeName]

Los **pipes** son transformaciones que podemos hacer a cualquier dato desde nuestros templates, como por ejemplo mostrar un texto en mayúscula, mostrar valores de moneda, formatos de fecha etc. Para crearla vamos a nuestra terminal ejecutando el siguiente comando:

```
ionic g pipe myPipe

# Results:
√ Create app/pipes/myPipe.ts
```

el código de nuestro pipe es el siguiente:

`myPipe.ts`:

{% highlight javascript linenos %}
import {Injectable, Pipe} from '@angular/core';

@Pipe({
  name: 'my-pipe'
})
@Injectable()
export class MyPipe {
  transform(value: string, args: any[]) {
    value = value + ''; // make sure it's a string
    return value.toLowerCase();
  }
}
{% endhighlight %}

# Resultado

Por último tendremos toda nuestra aplicación de esta manera:

<img src="http://i.imgur.com/rhTAWtE.jpg" class="img-responsive" alt="ionic generator"/>
 
Nuestro proyecto quedará de una forma más ordenada y con un mayor control, todo esto lo podemos hacer manualmente pero sin duda con **ionic generator** podemos ahorrar tiempo valioso en la creación de cada uno de estos.

Para saber sobre ionic suscribete a nuestro Newsletter y mantente atento.
Espero sea de utilidad y sigan Programando :)


[@nicobytes](http://www.nicobytes.com){:target="_blank"}