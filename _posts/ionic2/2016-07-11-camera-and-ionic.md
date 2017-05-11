---
layout: post
title: "Usando la cámara con Ionic, en 4 pasos."
date: 2017-05-11
tags: [native, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo102"
author: nicobytes
cover: "/images/posts/ionic2/2016-07-11-camera-and-ionic/cover.jpg"
remember: true
versions:
  - title: 'ionic'
    number: '3.2.0'
  - title: 'ionic-native'
    number: '3.7.0'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.0'
  - title: 'ionic-cli'
    number: '3.0.0'
---

> En este artículo conectar una aplicación de ionic con el recurso nativo de la cámara con ionic native y ver varias de las opciones que nos ofrece ionic para manipular la cámara.

<amp-img width="810" height="540" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/cover.jpg"></amp-img>

# Actualización (01/05/2017)
<hr/>

Hemos actualizado este demo con el último release de **Ionic 3**, si aún estas en alguna de las versiones anteriores puedes seguir estos pasos [de Ionic 2 a Ionic 3](https://www.ion-book.com/blog/tips/ionic-2-to-ionic3/){:target="_blank"}.

Ademas en este demo usamos la función de [**lazy loading** y **@IonicPage**](https://www.ion-book.com/blog/tips/ionic-page-and-lazy-loading/){:target="_blank"}. Puedes ver el repositorio [**Demo101**](https://github.com/ion-book/demo101){:target="_blank"}

<hr/>

# Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo102 blank
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo102
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="183" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/tree1.png"></amp-img>
  </div>
</div>

Agregamos la plataforma para la que vamos a desarrollar:

```
ionic cordova platform add android
ionic cordova platform add ios
```

# Paso 2: Instalando el plugin.

Lo siguiente que haremos es agregar el plugin de la cámara en nuestro proyecto con:

### Para Android:

Si en el proyecto solo vamos a trabajar con Android el plugin se agrega de la siguiente manera:

```
ionic cordova plugin add cordova-plugin-camera
```

### Para IOS:

Si queremos dar soporte para IOS, al momento de instalar el plugin debemos describir la razón para acceder a estos recursos así:

```
ionic cordova plugin add cordova-plugin-camera --variable CAMERA_USAGE_DESCRIPTION="the app need the camera" --variable PHOTOLIBRARY_USAGE_DESCRIPTION="the app need the photolibrary"
```

Ahora instalamos el provider de **Ionic Native** para la cámara, así:

```
npm install @ionic-native/camera --save
```

Debemos recordar añadir el provider `Camera` en el archivo `app.module.ts`, así:

```ts
...
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    ...
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    ...
    Camera,
    ...
  ]
})
export class AppModule {}
```

# Paso 3: Implementando la cámara

Para hacer uso de la cámara debemos inyectar al constructor de `HomePage` el provider de la `Camera`, y la declraremos la variable `image` de tipo string que guardara la imagen, así:

```ts
...
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: string = null;

  constructor(
    private camera: Camera
  ) {}

  ...
}
```

Ahora vamos a crear la función `getPicture` para implementar el uso de cámara, con el uso de `this.camera.getPicture` lanzamos la cámara del dispositivo, si todo salió bien y toma la fotografía, ejecutará la promesa y que retorna la fotografía tomada y luego se la asignamos a nuestra variable `image`, la imagen nos la retorna en `Base64` por esto debemos indicar `data:image/jpeg;base64,` y concatenarlo con la `imageData` y si algo sale mal se mostrará un error en consola haciendo uso de `catch`.

```ts
 getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }
```

Hay muchas más opciones que podrás encontrar en la documentación de cordova [aquí](https://github.com/apache/cordova-plugin-camera#cameracameraoptions--object){:target="_blank"}. 

La clase completa quedará, así:

```ts
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  image: string = null;

  constructor(
    private camera: Camera
  ) {}

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }
}
```


Ahora nuestro template `home.html`, tendremos el botón que ejecutará la función `getPicture` del controlador y mostraremos la imagen con `<img/>`, usamos la directiva `ngIf` para que muestre la imagen solo la imagen es diferente a `null`.

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Demo 102
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <button ion-button block (click)="getPicture()">Toma una foto</button>
  <img [src]="image" *ngIf="image" />
</ion-content>
```

{% include blog/subscribe.html %}

# Paso 4: Compilando

Ahora para compilar el código solo tendremos que ejecutar en nuestra terminal (Si tienen el entorno configurada):

```
ionic cordova run android --prod
ionic cordova run ios --prod
```

En el caso que no tegamos la computadora configurada podrán usar el servicio de ionic package para generar el apk (deben crear una cuenta en ionic.io):

```
ionic package build android --prod
```

## Resultado:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/screen1.jpg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/screen2.jpg"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/screen3.jpg"></amp-img>
  </div>
</div>
<br>