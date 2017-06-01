---
layout: post
title: "Registro con Facebook + Ionic"
date: 2017-06-01
tags: [native, demos]
categories: ionic2
author: daniel_lsanchez
cover: "/images/posts/ionic2/2016-08-25-facebook-and-ionic/cover.png"
repo: https://github.com/ion-book/demo113
versions:
  - title: 'ionic'
    number: '3.3.0'
  - title: 'ionic-native'
    number: '3.10.2'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.3.0'
---

> **Facebook** es uno de las métodos más comunes y usados para registrar y capturar nuevos usuarios, así que en este artículo veremos como hacer el proceso de registrar nuestros usuarios usando **facebook + ionic**.

<amp-img width="800" height="450" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/cover.png"></amp-img>

Para comenzar debemos de tener instalado todo el entorno de desarrollo de ionic [(inicio en ionic)](http://ionicframework.com/docs/intro/installation/){:target="_blank"}. Una vez lista nuestra máquina podemos comenzar.

Primero que todo crearemos un proyecto en blanco y lo llamaremos **demo113** en Ionic. Nos ubicamos en la ruta donde queremos almacenar nuestro proyecto y digitamos el siguiente comando en nuestra consola.

```
ionic start demo113 blank
```

El sistema comenzará a crear el proyecto ionic, al terminar de crear la aplicación nos situaremos en el proyecto, digitando el comando en la consola:

```
cd demo113
```

Ahora agregaremos las plataformas en las que deseamos trabajar nuestra aplicación, nosotros agregaremos la plataforma de **android** para este ejemplo digitando el siguiente comando en la consola:

```
ionic cordova platform add android
```

El siguiente paso es ingresar a la plataforma de [Facebook para desarrolladores](https://developers.facebook.com/){:target="_blank"}, para ello debes de tener una cuenta de Facebook. Al ingresar a la plataforma nos dirigiremos en el costado superior derecho y hacemos click en el botón **Mis aplicaciones**.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen1.png"></amp-img>

el siguiente paso es crear un identificador de la aplicación en la plataforma de Facebook, para ello damos click en **+ Agregar una nueva aplicación** y digitamos los datos que nos piden en el modal que se abre y terminamos haciendo click en **Crear identificador de la aplicación**.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen2.png"></amp-img>

*Nota: Recuerda que que Facebook restringe cualquier nombre para la aplicación que contenga las palabras FB, face, book, isnt. Entre otras.*

Perfecto ahora ya tenemos un identificador para la aplicación.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen3.png"></amp-img>

El siguiente paso es dar click sobre **+ Agregar productos** que se encuentra en el menú del costado izquierdo, al hacer click el sistema muestra una ventana con todos los productos que nos provee Facebook para trabajar. En el caso de nosotros daremos click sobre el botón **Empezar** del producto **Inicio de sesión con facebook**.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen4.png"></amp-img>

Ahora en esta parte seleccionaremos la plataforma con la que trabajaremos para el login de Facebook, en este caso es la plataforma de android.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen5.png"></amp-img>

Se nos abrirá una ventana donde nos mostrará un pequeño tutorial para realizar los ajustes en la plataforma  y para configurar la clave hash de nuestra aplicación.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen6.png"></amp-img>

Vamos ir seguir los pasos, que nos dan a continuación, pero abrán varios pasos que simplemente vamos a saltar ya que se configuran de manera diferente con el plugin de facebook, a continuación veremos los pasos que si debemos tener en cuenta. Ahora vamos a poner el **Package Name** de la aplicación. Este lo puedes ver en archivo `config.xml` de tu aplicación.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen7.png"></amp-img>

al dar click en el botón **Next** nos mostrará un modal pidiéndonos que verifiquemos el nombre de paquete de google play, en este caso daremos clic en **usar este nombre de paquete (use this package name)**.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen8.png"></amp-img>

Ahora crearemos la clave hash de nuestra aplicación, podemos dar clic en los link para visualizar un ejemplo del comando a ejecutar en nuestra consola para obtener dicha clave.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen9.png"></amp-img>

ahora digitamos el comando indicado para nuestra máquina, en este caso usare el comando para mac, lo copiare y pegare en consola.

<amp-img width="690" height="460" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen10.png"></amp-img>

La clave hash que nos genera la copiamos en el campo requerido y finalizamos con el proceso en Facebook.

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen11.png"></amp-img>

Ahora los pasos restantes solo vamos a oprimir el botón **Next**, luego volvemos a nuestra consola e instalaremos el plugin de [Facebook](https://ionicframework.com/docs/native/facebook/){:target="_blank"}, digitamos en la consola el siguiente comando.

```
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="1394107387338116" --variable APP_NAME="ion-demo"
npm install --save @ionic-native/facebook
```

**APP_ID**: número de id que se genero cuando creamos el app en Facebook.

**APP_NAME**: Nombre de la aplicación de Facebook.

<amp-img width="803" height="307" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen12.png"></amp-img>

Ahora debemos agregar `Facebook` como provider en `app.module.ts`.

```ts
...
import { Facebook } from '@ionic-native/facebook';
...

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    ...
    Facebook,
    ...
  ]
})
export class AppModule {}
```

{% include blog/subscribe.html %}

con esto ya estamos listos para ir al código y realizar una prueba. Abrimos nuestro editor de código preferido, en mi caso Visual Code, y nos abrimos el proyecto ionic que creamos, nos dirigimos al directorio `src/pages/home` en este nos centraremos para nuestro trabajo.

En el archivo `home.html` agregaremos un botón el cual ejecutará al hacer click la función **loginFacebook** y mostraremos los datos que nos recupera al validar la información de registro.

```html
{% raw %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Demo113</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  Prueba registro con facebook.
  <button ion-button block (click)="loginFacebook()">Login con facebook</button>
  <ion-item *ngIf="showUser">
    <ion-avatar item-left>
      <img [src]="user.picture.data.url" alt="">
    </ion-avatar>
    <h2>{{user.name}}</h2>
    <p>{{user.email}}</p>
  </ion-item>
</ion-content>
{% endraw %}
```

En el archivo `home.ts` incluiremos el código necesario para realizar la comunicación con Facebook. Debemos de importar la librería Facebook esta nos permitirá la comunicación con Facebook.

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: any = {};
  showUser: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private facebook: Facebook
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  loginFacebook(){
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      console.log(rta.status);
      if(rta.status == 'connected'){
        this.getInfo();
      };
    })
    .catch(error =>{
      console.error( error );
    });
  }

  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(data);
      this.showUser = true; 
      this.user = data;
    })
    .catch(error =>{
      console.error( error );
    });
  }

}
```

Con esto ya está todo listo para compilar nuestro proyecto y realizar la prueba. 
Para compilar nuestro proyecto android digitamos el comando en la consola:

```
ionic cordova build android --prod
```

Esto nos generará el apk y este lo podremos instalar en nuestro dispositivo o en un emulador para realizar la prueba.

# Resultado:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen14.png"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen15.png"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <amp-img width="720" height="1280" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen16.png"></amp-img>
  </div>
</div>
<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2016-08-25-facebook-and-ionic/screen13.png"></amp-img>