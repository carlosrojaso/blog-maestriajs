---
layout: post
title: "Conectado una REST API con Ionic 2"
date: 2016-07-19
tags: ionic2 api
categories: demos
comments: true
laucher: "/laucher/demo103"
author: nicobytes
cover: "http://i.imgur.com/tDpJiCR.jpg"
remember: true
---

> Una parte fundamental de cualquier aplicación es conectarse con servicio externos, en este caso vamos a conectarnos con una **REST API**. Vamos a crear una aplicación que se contecte con [http://randomuser.me/](http://randomuser.me/){:target="_blank"} un API con información de usuarios aleatorios.

<img class="img-responsive" src="http://i.imgur.com/tDpJiCR.jpg" alt="camera-and-ionic">

# Actualización (06/11/2016)
<hr/>
Hemos actualizado este demo con el último release de [Ionic 2 RC 2](http://www.ion-book.com/news/ionic-2-rc-2){:target="_blank"}, si aun estas en alguna de las versiones Beta puedes seguir estos pasos [Steps to Upgrade](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#steps-to-upgrade-to-rc0){:target="_blank"}.

<hr/>

# Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2](http://www.ion-book.com/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start demo103 blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo103
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera `src` y lucirá de esta manera:

<img class="img-responsive center-block" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/demos%2Fdemo102%2FScreenshot%20from%202016-11-06%2012-46-16.png?alt=media" alt="folders">

# Paso 2: Crear provider

Vamos a usar [ionic generator](http://www.ion-book.com/ionic2/ionic-generator){:target="_blank"} para crear nuestro nuevo proveedor de datos

```
ionic g provider user-service
```

ionic creará un archivo para nuestro servicio que estará en `src/providers/user-service.ts`:

Recuerda que debes agregar este provider dentro del array `providers` en `app/app.module.ts`

# Paso 3: Conectarse a Random User API

Random User es un **REST API** que nos retorna usuarios aleatoriamente, pueden consultar la docs de esta API [aquí](https://randomuser.me/documentation){:target="_blank"}.

Para conectarse solo debemos hacer una solicitud con el parámetro *results* que será la cantidad de usuarios que necesitemos así:

```
https://randomuser.me/api/?results=25
```

La respuesta de random user api será de esta manera:

{% highlight json %}
{
  "results": [
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "samuel",
        "last": "ross"
      },
      "location": {
        "street": "5592 pockrus page rd",
        "city": "santa ana",
        "state": "oregon",
        "postcode": 69974
      },
      "email": "samuel.ross@example.com",
      "login": {
        "username": "silverwolf434",
        "password": "blackjac",
        "salt": "d14iEZQT",
        "md5": "261a57061d35918f5c3ef7f90f4f2a80",
        "sha1": "c330ad8c974ab9982622d5d5506cfed4886a79ab",
        "sha256": "8ca4a1ca48975a69bd829de61298cd6a950dede740d4c0e755d07ee4cfc06fa5"
      },
      "registered": 1155461743,
      "dob": 1078494582,
      "phone": "(179)-102-8139",
      "cell": "(107)-396-0688",
      "id": {
        "name": "SSN",
        "value": "476-30-9095"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/80.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/80.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/80.jpg"
      },
      "nat": "US"
    }
  ],
  "info": {
    "seed": "705567e86a824a27",
    "results": 1,
    "page": 1,
    "version": "1.0"
  }
}
{% endhighlight %}

Nos retorna toda la información necesaria respecto a usuario, ahora solo modificaremos el método `load()` del `archivo user-service.ts`:

{% highlight javascript linenos %}
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
  data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('https://randomuser.me/api/?results=25')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.results;
          resolve(this.data);
        });
    });
  }
}
{% endhighlight %}

Como vemos en *la línea 22*  hacemos la solicitud correspondiente, en *la línea 23* procesamos la solicitud convirtiéndola en formato JSON, esto nos retorna un [Observable](http://www.ion-book.com/ionic2/observables-angular2){:target="_blank"} al cual nos suscribimos y luego en *la línea 25* obtenemos la data con `data.results`, finalmente retornamos con `resolve(this.data)`.

# Paso 3: Inyectar el servicio en el Ctrl.

Desde el archivo `home.ts` vamos a inyectar en servicio creado de esta manera:

{% highlight ts linenos %}
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UserService} from '../../providers/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  users: any[] = [];

  constructor(
    public navCtrl: NavController,
    public userService: UserService
  ) {
    this.userService.load()
    .then(data => {
      this.users = data;
    }) ;
  }
}
{% endhighlight %}

En *la línea 3* importamos el servicio de `UserService` desde su ubicación, en *la línea 7* tenemos que indicarle que este componente usará nuestro proveedor `UserService`, en *la línea 11* definiremos `users` como un array vacío, luego en *la línea 15* lo inyectamos como una dependencia de nuestra clase y finalmente desde *la línea 17 hasta la línea 20*, llamamos al método `load` que hará la solicitud y la respuesta la asigna a `this.users`.

# Paso 4: El template

Ahora en el template de home.html lo único que nos queda es mostrar los usuarios:

{% highlight html linenos %}
{% raw %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Demo 103
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item *ngFor="let user of users">
      <ion-avatar item-left>
        <img [src]="user.picture.medium">
      </ion-avatar>
      <h2>{{ user.name.first | uppercase }}</h2>
      <p>{{ user.email }}</p>
    </ion-item>
  </ion-list>
</ion-content>
{% endraw %}
{% endhighlight %}

En *la línea 11* iteramos array de users y luego solo mostramos las atributos de cada usuario.

# Resultado:

Ahora podemos ver el resultado ejecutando:

```
ionic serve -l
```
<br/>
<img class="img-responsive" src="http://i.imgur.com/4r1RZ9x.png" alt="result">
