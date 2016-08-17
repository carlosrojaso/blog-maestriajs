---
layout: post
title: "Usando la cámara con Ionic 2"
date: 2016-07-11
tags: ionic2 plugins
categories: demos
comments: true
repo: "https://github.com/ion-book/demo102"
author: nicobytes
cover: "http://i.imgur.com/9Uq2Naw.jpg"
---

> En los últimos artículos hemos visto una [introducción a Ionic 2](http://www.ion-book.com/ionic2/introIonic2){:target="_blank"} y como crear un [hola mundo](http://www.ion-book.com/ionic2/ionic2){:target="_blank"} con Ionic 2, ahora vamos hacer uso de [ionic native](http://www.ion-book.com/ionic2/ionic-native){:target="_blank"} para usar la cámara del dispositivo y tomar una fotografía.

<img class="img-responsive" src="http://i.imgur.com/9Uq2Naw.jpg" alt="camera-and-ionic">

# Actualización (17/08/2016)
<hr/>
Hemos actualizado este demo con el último release de [Ionic 2 Beta 11](http://www.ion-book.com/news/ionic-2-beta-11){:target="_blank"}, que tiene la más reciente actulización con [ionic native](http://www.ion-book.com/news/ionic-native-news){:target="_blank"}. Aquí está cómo se puede hacer la actualización [Steps to Upgrade](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#steps-to-upgrade-to-beta-11){:target="_blank"}.

<hr/>

# Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, si no lo recuerdas puedes ver esto con mas detalle en la [Introduccion a Ionic 2](http://www.ion-book.com/ionic2/ionic2){:target="_blank"}.
Vamos a nuestra terminal y ejecutamos:

```
ionic start demo102 blank --v2
```

Ahora entramos a la carpeta del proyecto desde nuestra terminal con:

```
cd demo102
```

Como iniciamos nuestro proyecto con el template **blank** tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar sera *app* y lucirá de esta manera:

<img class="img-responsive" src="http://i.imgur.com/rGu7pp9.png" alt="folders">

Agregamos la plataforma para la que vamos a desarrollar:

```
ionic platform add android
```

Lo siguiente que haremos es agregar el plugin de la cámara en nuestro proyecto con:

```
ionic plugin add cordova-plugin-camera
```

Ahora por buena práctica cada vez que agreguemos un plugin, iremos guardando el estado de la aplicación con:

```
ionic state save
```

Esto lo que hará, es actualizar el archivo de `package.json` con las dependencias del proyecto

# Paso 2: Implementando la cámara

Hace poco hablamos sobre [ionic-native](http://www.ion-book.com/ionic2/ionic-native){:target="_blank"} y ahora sera mas facil el consumo de cualquier API nativa con el uso de esta, ahora vamos nuestro archivo `home.ts` y implementaremos el uso de la cámara de esta manera:

{% highlight javascript linenos %}
import {Component} from '@angular/core';
import {Camera} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  image: string;

  constructor() {}

  getPicture(){
    let options = {
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    Camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }
}
{% endhighlight %}

En la *línea 2* importamos la cámara desde [ionic-native](http://www.ion-book.com/ionic2/ionic-native){:target="_blank"}, luego en la *línea 9* tendremos la variable `image` de tipo string que guardara la imagen, en la *línea 11* dejaremos un constructor vacío, ahora desde la *línea 13 a la línea 27* tendremos la definición de `getPicture` para implementar el uso de cámara.

En la *línea 14* definimos las opciones al momento de tomar la fotografía, estas opciones las podrás encontrar en la documentación de cordova [aquí](https://github.com/apache/cordova-plugin-camera#cameracameraoptions--object){:target="_blank"}. Luego con el uso de `Camera.getPicture` lanzamos la cámara del dispositivo, si todo salió bien y toma la fotografía, ejecutará la promesa y en la *línea 21* la fotografía tomada se la asignamos a nuestra variable `image`, la imagen nos la retorna en `Base64` por esto debemos indicar `data:image/jpeg;base64,` y concatenarlo con la `imageData` y si algo sale mal se mostrará un error en consola haciendo uso de `catch`.

Veamos ahora nuestro template `home.html`:

{% highlight html linenos %}
<ion-header>
  <ion-navbar>
    <ion-title>
      Demo 102
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <button block (click)="getPicture()">Toma una foto</button>
  <img [src]="image" *ngIf="image" />
</ion-content>

{% endhighlight %}

En la *línea 10* tendremos el botón que ejecutará la función `getPicture` del controlador y en la *línea 11* mostraremos la imagen, usamos la directiva `ngIf` para que muestre la imagen solo si ya tomamos la fotografía.

# Paso 3: Compilando

Ahora para compilar el código solo tendremos que ejecutar en nuestra terminal (Si tienen computadora configurada):

```
ionic build android
```

En el caso que no tegamos la computadora configurada podrán usar el servicio de ionic package para generar el apk (deben crear una cuenta en ionic.io):

```
ionic package build android
```


# Resultado:

<br/>
<img class="img-responsive" src="http://i.imgur.com/OA55G0K.png" alt="result">  
