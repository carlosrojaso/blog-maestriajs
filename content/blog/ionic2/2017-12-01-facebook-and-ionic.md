---
layout: post
title: "Registro con Facebook + Ionic"
date: 2017-12-01
tags: [native, demos]
categories: ionic2
author: daniel_lsanchez
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fcover.png?alt=media&token=729f232b-f43f-4ff1-8895-d5af5f1fb599"
repo: https://github.com/ion-book/demo113
editname: "ionic2/2017-12-01-facebook-and-ionic.md"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-native'
    number: '4.4.2'
  - title: 'ionic-app-scripts'
    number: '3.1.2'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.19.0'
---

> **Facebook** es uno de las métodos más comunes y usados para registrar y capturar nuevos usuarios, así que en este artículo veremos como hacer el proceso de registrar nuestros usuarios usando **facebook + ionic**.

<img width="800" height="450" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fcover.png?alt=media&token=729f232b-f43f-4ff1-8895-d5af5f1fb599">

 

# Actualización (01/12/2017)
<hr/>

Hemos actualizado este demo con el último release **Ionic 3.9** y **Angular 5**.

<a href="https://github.com/ion-book/demo113" target="_blank" class="btn btn-round btn-success">Ver demo</a>
<hr/>

Para comenzar debemos de tener instalado todo el entorno de desarrollo de ionic [(inicio en ionic)](http://ionicframework.com/docs/intro/installation/){:target="_blank"}. Una vez lista nuestra máquina podemos comenzar.

Primero que todo crearemos un proyecto en blanco y lo llamaremos **demo113** en Ionic. Nos ubicamos en la ruta donde queremos almacenar nuestro proyecto y digitamos el siguiente comando en nuestra consola.

```
ionic start demo113 blank --cordova
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

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen1.png?alt=media&token=b726ec2d-54c4-4c32-9e06-e2d244a0ad59">

el siguiente paso es crear un identificador de la aplicación en la plataforma de Facebook, para ello damos click en **+ Agregar una nueva aplicación** y digitamos los datos que nos piden en el modal que se abre y terminamos haciendo click en **Crear identificador de la aplicación**.

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen2.png?alt=media&token=b57faa16-dc5a-4997-b929-f91ebc3d505a">

*Nota: Recuerda que que Facebook restringe cualquier nombre para la aplicación que contenga las palabras FB, face, book, isnt. Entre otras.*

Perfecto ahora ya tenemos un identificador para la aplicación.

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen3.png?alt=media&token=d30dda52-5bb9-48a3-94e8-7131baa49a2a">

El siguiente paso es dar click sobre **+ Agregar productos** que se encuentra en el menú del costado izquierdo, al hacer click el sistema muestra una ventana con todos los productos que nos provee Facebook para trabajar. En el caso de nosotros daremos click sobre el botón **Empezar** del producto **Inicio de sesión con facebook**.

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen4.png?alt=media&token=cc7708a2-f55c-4b15-8342-4d26dc35f13b">

Ahora en esta parte seleccionaremos la plataforma con la que trabajaremos para el login de Facebook, en este caso es la plataforma de android.

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen5.png?alt=media&token=6b1bd487-f705-45c6-81de-d26fa8b02dda">

Se nos abrirá una ventana donde nos mostrará un pequeño tutorial para realizar los ajustes en la plataforma  y para configurar la clave hash de nuestra aplicación.

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen6.png?alt=media&token=6ef57a36-d3e8-4687-b0e7-2b298590950a">

Vamos ir seguir los pasos, que nos dan a continuación, pero abrán varios pasos que simplemente vamos a saltar ya que se configuran de manera diferente con el plugin de facebook, a continuación veremos los pasos que si debemos tener en cuenta. Ahora vamos a poner el **Package Name** de la aplicación. Este lo puedes ver en archivo `config.xml` de tu aplicación.

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen7.png?alt=media&token=83270cc2-7667-49d5-aa8b-924687e99aca">

al dar click en el botón **Next** nos mostrará un modal pidiéndonos que verifiquemos el nombre de paquete de google play, en este caso daremos clic en **usar este nombre de paquete (use this package name)**.

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen8.png?alt=media&token=a87ab1cc-2b3e-4f69-8734-36875b2b0d18">

Ahora crearemos la clave hash de nuestra aplicación, podemos dar clic en los link para visualizar un ejemplo del comando a ejecutar en nuestra consola para obtener dicha clave.

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen9.png?alt=media&token=14870bcf-1c12-4ea6-97e5-2c6c6df8a2be">

ahora digitamos el comando indicado para nuestra máquina, en este caso usare el comando para mac, lo copiare y pegare en consola.

<img width="690" height="460" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen10.png?alt=media&token=cf248402-cd6b-4306-94f7-52002131d34f">

La clave hash que nos genera la copiamos en el campo requerido y finalizamos con el proceso en Facebook.

<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen11.png?alt=media&token=f1956662-cb17-4688-811a-ab74b1766208">

Ahora los pasos restantes solo vamos a oprimir el botón **Next**, luego volvemos a nuestra consola e instalaremos el plugin de [Facebook](https://ionicframework.com/docs/native/facebook/){:target="_blank"}, digitamos en la consola el siguiente comando.

```
ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="1394107387338116" --variable APP_NAME="ion-demo"
npm install --save @ionic-native/facebook
```

**APP_ID**: número de id que se genero cuando creamos el app en Facebook.

**APP_NAME**: Nombre de la aplicación de Facebook.

<img width="803" height="307" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen12.png?alt=media&token=6f2aa92e-f399-4760-b5c0-12ff98ecdd23">

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
    <img width="720" height="1280" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen14.png?alt=media&token=7591bc79-825b-4c6d-abff-f1288228374d">
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <img width="720" height="1280" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen15.png?alt=media&token=eee869d9-6136-4a42-ac39-6e5cf9f1bfb8">
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <img width="720" height="1280" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen16.png?alt=media&token=dc7912e6-a16b-473c-82e6-76746bb5e115">
  </div>
</div>
<img width="1280" height="800" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Ffacebook-and-ionic%2Fscreen13.png?alt=media&token=f2ab57ea-d20c-40e6-ae87-0ace5d163793">