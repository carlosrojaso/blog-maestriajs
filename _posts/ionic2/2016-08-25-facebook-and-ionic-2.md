---
layout: post
title: "Registro con Facebook + Ionic 2"
date: 2016-08-24
tags: ionic2 Facebook
categories: ionic2
comments: true
author: daniel_lsanchez
cover: "http://i.cubeupload.com/1tGc19.png"
draf: true
---

> **Facebook** es una de las métodos más comunes y usados para registrar y capturar nuevos usuarios, así que en este artículo veremos como hacer el proceso de registrar nuestros usuarios usando **facebook + ionic 2**.

<img class="img-responsive" src="http://i.cubeupload.com/1tGc19.png" alt="facebbok">

Para comenzar debemos de tener instalado todo el entorno de desarrollo de ionic [(inicio en ionic 2)](http://ionicframework.com/docs/v2/getting-started/installation/){:target="_blank"}. Una vez lista nuestra máquina podemos comenzar.

Primero que todo crearemos un proyecto en blanco y lo llamaremos **loginFacebook** en Ionic 2. Nos ubicamos en la ruta donde queremos almacenar nuestro proyecto y digitamos el siguiente comando en nuestra consola.

```
sudo ionic start loginFacebook blank --v2 
```

El sistema comenzará a crear el proyecto ionic.

<img class="img-responsive" src="http://i.cubeupload.com/bdYw8F.png" alt="1">

al terminar de crear la aplicación nos situaremos en el proyecto, digitando el comando en la consola:

```
cd loginFacebook
```

<img class="img-responsive" src="http://i.cubeupload.com/JzP8wX.png" alt="2">

estando en la carpeta **loginFacebook** podemos digitar el comando en la consola `ls` y visualizamos todos los archivos y carpetas que se crean al crear el proyecto ionic 2.

<img class="img-responsive" src="http://i.cubeupload.com/Dq3YTE.png" alt="3">

Ahora agregaremos las plataformas en las que deseamos trabajar nuestra aplicación, nosotros agregaremos la plataforma de **android** para este ejemplo digitando el siguiente comando en la consola:

```
sudo ionic platform add android
```

<img class="img-responsive" src="http://i.cubeupload.com/Uks9mY.png" alt="4">

El siguiente paso es ingresar a la plataforma de [Facebook para desarrolladores](https://developers.facebook.com/){:target="_blank"}, para ello debes de tener una cuenta de Facebook. Al ingresar a la plataforma nos dirigiremos en el costado superior derecho y hacemos click en el botón **Mis aplicaciones**.

<img class="img-responsive" src="http://i.cubeupload.com/4380nd.png" alt="5">

el siguiente paso es crear un identificador de la aplicación en la plataforma de Facebook, para ello damos click en **+ Agregar una nueva aplicación** y digitamos los datos que nos piden en el modal que se abre y terminamos haciendo click en **Crear identificador de la aplicación**.

<img class="img-responsive" src="http://i.cubeupload.com/OQ9Doz.png" alt="5">

*Nota: En este caso coloque en nombre para mostrar solo login ya que Facebook restringe cualquier nombre para la aplicación que contenga las palabras FB, face, book, isnt. Entre otras.*

Perfecto ahora ya tenemos un identificador para la aplicación.

<img class="img-responsive" src="http://i.cubeupload.com/whGjKa.png" alt="6">

El siguiente paso es dar click sobre **+ Agregar productos** que se encuentra en el menú del costado izquierdo, al hacer click el sistema muestra una ventana con todos los productos que nos provee Facebook para trabajar. En el caso de nosotros daremos click sobre el botón **Empezar** del producto **Inicio de sesión con facebook**.

<img class="img-responsive" src="http://i.cubeupload.com/1Pbi2h.png" alt="7">

este nos llevara a una ventana donde nos darán una pequeña introducción para trabajar con el login de Facebook, en esta podremos continuar  haciendo click en el link  *ajustes de la plataforma (plartform setting)* para continuar con la configuración requerida. En esta página nos situamos en la parte inferior y damos click en el botón **+ Agregar plataforma**.

<img class="img-responsive" src="http://i.cubeupload.com/Yba9lu.png" alt="8">

En esta parte seleccionaremos la plataforma con la que trabajaremos para el login de Facebook, en este caso es la plataforma de android.

<img class="img-responsive" src="http://i.cubeupload.com/0MvZhF.png" alt="9">

esto nos llevará a la configuración de la plataforma, daremos click en el botón **Inicio rápido**.

Se nos abrirá una ventana donde nos mostrará un pequeño tutorial para realizar los ajustes en la plataforma  y para configurar la clave hash de nuestra aplicación.

<img class="img-responsive" src="http://i.cubeupload.com/FkXohv.png" alt="9">

Realmente lo que nos interesa en este caso para nuestra aplicación es lo que se encuentra en la parte inferior de la página, ponemos el nombre del paquete de nuestra app, la clase a la que hace referencia el plugin de Facebook y una clave hash.

<img class="img-responsive" src="http://i.cubeupload.com/f6VyGu.png" alt="10">

al dar click en el botón **Next** nos mostrará un modal pidiéndonos que verifiquemos el nombre de paquete de google play, en este caso daremos clic en **usar este nombre de paquete (use this package name)**.

<img class="img-responsive" src="http://i.cubeupload.com/FkU5rb.png" alt="11">

Ya para finalizar crearemos la clave hash de nuestra aplicación, podemos dar clic en los link para visualizar un ejemplo del comando a ejecutar en nuestra consola para obtener dicha clave.

<img class="img-responsive" src="http://i.cubeupload.com/XdnNa4.png" alt="5">

ahora digitamos el comando indicado para nuestra máquina, en este caso usare el comando para mac, lo copiare y pegare en consola.

<img class="img-responsive" src="http://i.cubeupload.com/3CDTUO.png" alt="5">

La clave hash que nos genera la copiamos en el campo requerido y finalizamos con el proceso en Facebook.

<img class="img-responsive" src="http://i.cubeupload.com/iNGhNj.png" alt="5">

ahora volvemos a nuestra consola e instalaremos el plugin de Facebook [cordova-plugin-facebook4](https://github.com/jeduan/cordova-plugin-facebook4){:target="_blank"}, digitamos en la consola el siguiente comando.

```
sudo ionic plugin add cordova-plugin-facebook4 --variable APP_ID=" 284452415266660" --variable APP_NAME="Login"
```

**APP_ID**: número de id que se genero cuando creamos el app en Facebook.

**APP_NAME**: Nombre de la aplicación de Facebook.

<img class="img-responsive" src="http://i.cubeupload.com/kPriUI.png" alt="5">

con esto ya estamos listos para ir al código y realizar una prueba. Abrimos nuestro editor de código preferido, en mi caso Visual Code, y nos abrimos el proyecto ionic 2 que creamos.

<img class="img-responsive" src="http://i.cubeupload.com/SH8ozP.png" alt="5">

nos dirigimos al directorio `app/pages/home` en este nos centraremos para nuestro trabajo.

En el archivo `home.html` agregaremos un botón el cual ejecutará al hacer click la función **loginFacebook** y mostraremos los datos que nos recupera al validar la información de registro.

{% highlight html linenos %}
<ion-header>
  <ion-navbar>
    <ion-title>
      Login Facebook
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  Prueba registro con facebook.
  <button block(click)="loginFacebook()">Login con facebook</button>
</ion-content>

{% endhighlight %}

En el archivo `home.ts` incluiremos el código necesario para realizar la comunicación con Facebook. Debemos de importar la librería Facebook esta nos permitirá la comunicación con Facebook.

{% highlight javascript linenos %}
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Facebook} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }

  loginFacebook(){
    Facebook.login(['public_profile', 'email'])
    .then(rta => {
      console.log(rta.status)
      if(rta.status == 'conneced'){
        Facebook.api('/me?fields=id,name,email,first_name,last_name,gender,['public_profile','email']')
        .then(rta=>{
          console.log(rta);
        })
        .catch(error =>{
          console.error( error );
        });
      };
    })
    .catch(error =>{
      console.error( error );
    });
  }
}
{% endhighlight %}

Con esto ya está todo listo para compilar nuestro proyecto y realizar la prueba. 
Para compilar nuestro proyecto android digitamos el comando en la consola:

```
sudo ionic build android
```

Esto nos generará el apk y este lo podremos instalar en nuestro dispositivo o en un emulador para realizar la prueba.

# Resultado:

<img class="img-responsive" src="http://i.cubeupload.com/psktlb.jpeg" alt="5">
<img class="img-responsive" src="http://i.cubeupload.com/m8LA1M.jpeg" alt="5">
<img class="img-responsive" src="http://i.cubeupload.com/TrKouV.png" alt="5">