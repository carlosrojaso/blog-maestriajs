---
layout: post
title: "Construyendo una App de reconocimiento facial en Ionic"
keywords: "ionic reconocimiento facial, camara, facial"
date: 2018-10-12
tags: [ionic, azure, facial]
categories: ionic2
author: jheisonAlzate
repo: "https://github.com/developerjaag/facial-recognition.git"
cover: "/images/posts/ionic2/2018-09-28-reconocimiento-facial/cover.png"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-app-scripts'
    number: '3.2.0'
  - title: 'cordova-cli'
    number: '8.0.0'
  - title: 'ionic-cli'
    number: '4.1.2'
---

> La biometria poco a poco va ganando terreno en el mundo de las palicaciones moviles, Y es que bien sea para una mayor seguridad o acceso más rápido. Se pueden utilizar métodos de autenticación o registro con estas opciones.

<!--summary-->

<img width="718" height="227" class="responsive" src="/images/posts/ionic2/2018-09-28-reconocimiento-facial/cover.png">



Hoy realizaremos un registro y posterior auntenticación con reconocimiento facial.

Gracias a los abanderados en el mundo de la tecnologia podemos hacer cosas sorprendentes de una sencilla; En este caso utilizaremos el servicio de Microsoft azure.

# Paso 1: Crear y configurar la cuente de Microsoft azure
Nos dirigimos a https://azure.microsoft.com/es-es/free/ y presionamos “Iniicio gratuito”. El proceso es tan simple como crear una cuenta de correo eléctronico, por ende no entraremos en detalles.

# Paso 2: Crear el recurso.
Una vez situados en el dashboard Elegimos la opción: Crear un recurso -> AI + Machine Learning -> Face Api

<img width="470" height="368" class="responsive" src="/images/posts/ionic2/2018-09-28-reconocimiento-facial/1.png">

Luego diligenciamos  los datos del nuevo recurso. Es muy importante que tengamos presente la ubicación que elegimos, dado que esto hace que cambie la url a la que apuntaremos luego

<img width="470" height="368" class="responsive" src="/images/posts/ionic2/2018-09-28-reconocimiento-facial/2.png">

Pasado unos instantes, nuestro recurso ya estará listo para trabajar con el:

<img width="470" height="368" class="responsive" src="/images/posts/ionic2/2018-09-28-reconocimiento-facial/3.png">

Al presionar el recurso podemos acceder a ver las llaves que necesitamos para acceder al recurso:

<img width="470" height="368" class="responsive" src="/images/posts/ionic2/2018-09-28-reconocimiento-facial/4.png">

Bien ese es todo el trabajo que haremos en azure

# Paso 3: Configurar un servidor para almacenar las fotos.
Configurar un servidor para almacenar las fotos
Para confrontar las imágenes y realizar la validación del reconocimiento facial, es necesario contar con un servicio que exponga la url pública de dichas imágenes.
Para facilidad del proceso, configuraremos un servidor en cloud9.io (Es un servicio de amazon que es muy recomendable para realizar pruebas. No para tenerlo como hosting, dado que el servicio se apaga por falta de actividad). Bien aquí configuraremos un ambiente en php, de la siguiente manera.

 Creamos una cuenta en cloud9.io (nuevamente esto es muy sencillo y no entraremos en detalles).
 Una vez en la cuenta de cloud9, creamos un nuevo workspace:
 <img width="470" height="368" class="responsive" src="/images/posts/ionic2/2018-09-28-reconocimiento-facial/5.png">

 Le damos un nombre a el espacio de trabajo, y elegimos una plantilla; En mi caso es php

 <img width="470" height="368" class="responsive" src="/images/posts/ionic2/2018-09-28-reconocimiento-facial/6.png">

 Tomara unos instantes mientras todo queda configurado y listo para trabajar. Se nos abrira un ide y procedemos a crear la siguiente estructura de trabajo:

  <img width="470" height="368" class="responsive" src="/images/posts/ionic2/2018-09-28-reconocimiento-facial/7.png">

Tenemos un directorio para almacenar las fotos llamado "fotos", y dentro de el creamos otro llamado "tmp_login".

El archivo "permitirAcceso.php" contiene el manejo de los CORS para permitir que nuestra aplicación establesca conexión con este servidor:

```
<?php
 // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day 
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])){
           // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  
        }
           

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])){
          header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }
            
        exit(0);
    }

?>
```

El archivo "guardarFoto.php" se encarga de recibir un base 64 y convertirlo en un archivo .jpg y almacenarlo en la carpeta llamada "fotos", ademas devuelve la url publica de tal archivo

```
<?php

 require_once('permitirAcceso.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata); 


    
    $data = $request->foto;
    $nombreFoto = $request->nombre;


    file_put_contents('fotos/'.$nombreFoto.'.jpg', base64_decode($data));

    
    $array = array( 'codigo' => '200', 'nombre' => 'https://ngclassroom-jaag2106.c9users.io/fotos/'.$nombreFoto.'.jpg');
    
    $retorno = json_encode($array);
    
    echo $retorno;
 
?>
```

Finalmente el archivo "guardarFotoTmpLogin.php" realiza el mismo trabajo que el archivo anterior, solo que en la ruta fotos->tmp_login y nombrando la foto con un id unico

```
<?php

 require_once('permitirAcceso.php');

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata); 

    $data = $request->foto;
    
    $nombreFoto = uniqid();
    
    
    file_put_contents('fotos/tmp_login/'.$nombreFoto.'.jpg', base64_decode($data));
    
    //validar pin correcto
    $array = array( 'codigo' => '200', 'nombre' => 'https://ngclassroom-jaag2106.c9users.io/fotos/tmp_login/'.$nombreFoto.'.jpg');
    
    $retorno = json_encode($array);
 
    echo $retorno;
    
    
?>
```

# Paso 4: app en ionic.
Ahora viene la parte mas divertida, donde contruiremos un sistema de registro y login reconociendo rostros

Generamos un nuevo proyecto de Ionic:
```
$ionic start facialrecognition blank --cordova
```
Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd facialrecognition
```

Necesitamos crear dos paginas, una para el login y otra para el registro, asi que las creamos ejecutando

```
ionic g page login
```

y

```
ionic g page singup
```

# Paso 4.1: instalar el plugin de la camara.
necesitamos tomar fotos con el dispositivo, ais que para eso utilizaremos un plugin para la acceder a la camara del dispositivo.
ejecutamos en la terminal:
```
ionic cordova plugin add cordova-plugin-camera
```
y

```
npm install --save @ionic-native/camera
```
Luego abrimos el proyecto en un editor de código.
Debemos importarlo en el archivo src/app/app.module.ts:

```ts
...

import { Camera } from '@ionic-native/camera';

...

@NgModule({
  ...

  providers: [
    ...
    Camera
    ...
  ]
  ...
})
export class AppModule { }
```


# Paso 4.2: el código en Ionic.

Modificamos el archivo src/app/app.component.ts para que tome com root la página del login. Debe quedar asi:

```ts
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "LoginPage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
```

Este es el código para la página singup.html

```html
<ion-header>

  <ion-navbar>
    <ion-title>singup</ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>

  <ion-card>
    <ion-card-header>
      <h2 text-center>Registrate con tu foto</h2>
    </ion-card-header>
    <ion-card-content>

      <img *ngIf="foto" [src]="foto" alt="foto">

      <ion-item>
        <ion-label floating >Tu nombre</ion-label>
        <ion-input type="text" [(ngModel)]="nombre" ></ion-input>
      </ion-item>

      <button ion-button block (click)="capturarFoto()" [disabled]="!nombre">Tomar foto</button>

    </ion-card-content>
  </ion-card>

</ion-content>

<ion-footer>
  <button ion-button block clear (click)="irLogin()">Login</button>
</ion-footer>
```

Lo mas importante del anterior código es el boton que lanza la cámara y detona la acción de registro del rostro; Para esto incluimos el siguiente código en el singup.ts

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  foto = "";
  fotoEnviar = "";
  nombre = "";
  idPersonaAdicionada: any;
  keyAzure = "2142bdfab7c947829fdb142292b7a9f6";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private camera: Camera, ) {
  }

  irLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

  //tomar foto o elegirla de la galeria
  capturarFoto() {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true,
      cameraDirection: 1
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.foto = base64Image;
      this.fotoEnviar = imageData;


      this.nuevoRegistro();

    }, (err) => {
      // Handle error

    });

  }//fin capturarFoto


  //registro en azure
  nuevoRegistro() {

    let url = "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/persongroups?top=1000";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Ocp-Apim-Subscription-Key", this.keyAzure);
    let options = new RequestOptions({ headers: headers });
    this.http.get(url, options).map(res => res.json()).subscribe(data => {

      if (data.length <= 0) {
        //si no se tiene grupo creado
        this.crearPersonGroup();
      } else {
        //si ya se tienen grupos creados
        this.adicionarPersona();
      }

    },
      err => {
        console.log('error consultando grupos ' + err);
      });

  }//fin consultar personGroup

  crearPersonGroup() {

    let url = 'https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/persongroups/grupo1';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Ocp-Apim-Subscription-Key", this.keyAzure);
    let options = new RequestOptions({ headers: headers });
    let items = { "name": "group1", "userData": "Grupo de prueba" };
    this.http.put(url, items, options).map(res => res.json()).subscribe(data => {

      //cuando se crea el grupo se crea la persona para el grupo
      this.adicionarPersona();

    },
      err => {
        console.log('Error creando grupo ' + err);
      });

  }//fin crear grupo

  adicionarPersona() {


    let url = "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/persongroups/grupo1/persons";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Ocp-Apim-Subscription-Key", this.keyAzure);
    let options = new RequestOptions({ headers: headers });
    let items = { "name": this.nombre, "userData": "Registrado en ng-classroom" };
    this.http.post(url, items, options).map(res => res.json()).subscribe(data => {

      //cuando se crea una persona, se devuelve su id
      this.idPersonaAdicionada = data.personId;

      this.adicionaraFacePersona();

    },
      err => {
        console.log('Error ' + err);
      });

  }//fin adicionarPersona



  adicionaraFacePersona() {


    let url1 = "https://ngclassroom-jaag2106.c9users.io/guardarFoto.php";
    let headers1 = new Headers({ 'Content-Type': 'application/json' });
    let optionsh = new RequestOptions({ headers: headers1 });
    let items1 = { "nombre":this.nombre, "foto": this.fotoEnviar };
    this.http.post(url1, items1, optionsh).map(res => res.json()).subscribe(data => {

      var urlPublicaFoto = data.nombre;

      //se valida que en la imagen este presente un rostro
      let url2 = "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false";
      let headers2 = new Headers({ 'Content-Type': 'application/json' });
      headers2.append("Ocp-Apim-Subscription-Key", this.keyAzure);
      let options2 = new RequestOptions({ headers: headers2 });
      this.http.post(url2, { "url": urlPublicaFoto }, options2).map(res => res.json()).subscribe(data => {

        if (data[0]) {

          //se adiciona la cara de la persona
          let url = "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/persongroups/grupo1/persons/" + this.idPersonaAdicionada + "/persistedFaces";
          let headers = new Headers({ 'Content-Type': 'application/json' });
          headers.append("Ocp-Apim-Subscription-Key", this.keyAzure);
          let options = new RequestOptions({ headers: headers });
          let items = { "url": urlPublicaFoto };
          this.http.post(url, items, options).map(res => res.json()).subscribe(data => {

            //en este punto ya se debe tener al usuario registrado 
            this.entrenarGrupo();
            //se consume el servicio para entrenar el grupo           

          },
            err => {
              console.log('Error detect ' + err);
            });

        } else {
          console.log('No se detecto ningun rostro en la imagen');
        }


      },
        err => {
          console.log('Error ' + err);
        });



    }, err => {
      console.log(err);
    });


  }//fin adicionaraFacePersona


  entrenarGrupo() {

    let url = "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/persongroups/grupo1/train";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Ocp-Apim-Subscription-Key", this.keyAzure);
    let options = new RequestOptions({ headers: headers });
    let items = {};
    this.http.post(url, items, options).map(res => res.json()).subscribe(data => {

      console.log('grupo entrenado y listo');

    },
      err => {
        console.log(err);

      });

  }//fin entrenarGrupo


}//fin clase


```

Como se puede observar es un conjunto de peticiones http hacia el servidor Azure que previamente configuramos. Explico un poco lo que se realiza:

-Como parametros destacados tenemos: keyAzure (que debe tener el contenido de la llave que nos entrego Azure), nombre (es un dato con el que se puede identificar al usuario) y idPersonaAdicionada (es el id que devuelve Azure luego de registrar a una persona)

Antes de explicar a rasgos generales los metodos , es importante entender como funciona el registro en el reconocimiento facial de Azure
Azure agrupa las personas en grupos, asi que podriamos tener por ejemplo un grupo para clientes, otro para usuarios administrativos, etc. esos grupos contienen a las personas, las cuales pueden tener asociada mas de un rostro

-Los metodos mas relevantes son:

`nuevoRegistro()`: Aqui se valida si ya tenemos un grupo, de lo contrario pasamos a crearlo.

`crearPersonGroup()`: Se crea un grupo para adicionar personas

`adicionarPersona()`: Se registra una persona en el grupo y le pasamos un par de datos relevantes para esa persona (en este caso uno de esos datos es el número telefonico)

`adicionaraFacePersona()`: Este metodo se encarga primero de subir la foto de la persona al servidor de cloud 9 que configuramos previamente para que devuelva la url publica de dicha fotografia, luego con Azure se valida si en la fotografia esta presente un rostro, para despues vincular la imagen a la persona que se acabo de almacenar.

`entrenarGrupo()`: finalmete como todo aprendizaje de maquina se debe entrenar la red para que asocie las caracteristicas de la imagen con la persona.

Bien, ahora que ya tenemos el registro, pasemos al login.

El archivo login.html queda asi:

```html
<ion-header>

  <ion-navbar>
    <ion-title>login</ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>

  <ion-card>
    <ion-card-header>
      <h2 text-center>Ingresa son tu rostro</h2>
    </ion-card-header>
    <ion-card-content>

      <img *ngIf="foto" [src]="foto" alt="foto">

      <button ion-button block (click)="tomarFoto()">Tomar foto</button>

    </ion-card-content>
  </ion-card>

</ion-content>

<ion-footer>
  <button ion-button block clear (click)="irRegistro()">Registrarse</button>
</ion-footer>
```
Lo importante es el boton para tomar la foto, que el que dispara toda la acción.

Ahora el archivo login.ts contiene el siguiente código

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  foto: any;
  fotoEnviar: any;
  nombreFotoGuardada: any;
  keyAzure = "2142bdfab7c947829fdb142292b7a9f6";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera, public http: Http, public alertCtrl: AlertController) {
  }

  irRegistro() {
    this.navCtrl.setRoot('SingupPage');
  }

  tomarFoto() {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true,
      cameraDirection: 1
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.foto = base64Image;
      this.fotoEnviar = imageData;

      this.subirFoto();

    }, (err) => {
      // Handle error
    });

  }//fin tomar foto


  //subir la foto a temporal del servidro
  subirFoto() {

    let url1 = "https://ngclassroom-jaag2106.c9users.io/guardarFotoTmpLogin.php";
    let headers1 = new Headers({ 'Content-Type': 'application/json' });
    let optionsh = new RequestOptions({ headers: headers1 });
    let items1 = { "foto": this.fotoEnviar };
    this.http.post(url1, items1, optionsh).map(res => res.json()).subscribe(data => {

      this.nombreFotoGuardada = data.nombre;
      this.detectarFotoTempAzure();

    },
      err => {
        console.log(err);
      });

  }//fin subirFoto

  detectarFotoTempAzure() {

    //detectar foto azure
    let url = "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Ocp-Apim-Subscription-Key", this.keyAzure);
    let options = new RequestOptions({ headers: headers });
    let items = { "url":  this.nombreFotoGuardada};
    this.http.post(url, items, options).map(res => res.json()).subscribe(data => {

      if (data[0]) {
        let idRetornado = data[0].faceId;
        this.validarLogin(idRetornado);
      } else {
        console.log('No se detecto ningun rostro');
      }

    },
      err => {
        console.log('Error en detectando face ' + err);
      });

  }//fin detectarFotoTempAzure

  validarLogin(idRetornado) {

    //validar coincidencias
    let url = "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/identify";
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Ocp-Apim-Subscription-Key", this.keyAzure);
    let options = new RequestOptions({ headers: headers });
    let items = {
      "personGroupId": "grupo1",
      "faceIds": [idRetornado],
      "maxNumOfCandidatesReturned": 1,
      "confidenceThreshold": 0.5
    };
    this.http.post(url, items, options).map(res => res.json()).subscribe(data => {

      if (data[0].candidates[0].personId) {
        //se obtuvo una coincidencia (se consulta el nombre con el personId)
        this.consultarNombrePersona(data[0].candidates[0].personId);
      } else {
        console.log('No se obtivieron coincidencias');
      }

    },
      err => {
        console.log('Error en validando face ' + err);
      });


  }// fin validarLogin

  consultarNombrePersona(idPersona) {

    //validar coincidencias
    let url = "https://brazilsouth.api.cognitive.microsoft.com/face/v1.0/persongroups/grupo1/persons/" + idPersona;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append("Ocp-Apim-Subscription-Key", this.keyAzure);
    let options = new RequestOptions({ headers: headers });
    this.http.get(url, options).map(res => res.json()).subscribe(data => {

      const alert = this.alertCtrl.create({
        title: 'siiii!',
        subTitle: 'Se iniciará sesión con ' + data.name,
        buttons: ['OK']
      });
      alert.present();



    },
      err => {
        console.log('Error en consultando persona ' + err);
      });


  }//fin consultarNombrePersona


}//fin clase

```
Pasemos a explicar un poco lo que hace el anterios código:

Se tienen 4 parametros: foto (muestra la foto que se capturo al usuario), fotoEnviar (contiene el base 64 que se envia al servidor de cloud 9), nombreFotoGuardada (almacenará la url publica que retorna cloud 9) y keyAzure (aqui debe estar la llave que retorno Azure).

Como metodos tenemos los siguientes:

`tomarFoto()`: Captura la foto con la cámara del dispositivo

`subirFoto()`: Envia la foto al servidor en cloud 9, que previamente se configuró y retorna la url de la imagen.

`detectarFotoTempAzure()`: Valida la presencia de un rostro en la imagen y devuelve un id para el rostro que detecto

`validarLogin(idRetornado)`: Con el id del rostro que se retorno, se hac euna comparación para saber si el rostro existe en un grupo en especifico; Tambien se le puede indicar a Azure el máximo de coincidencias que nos retorne (para este ejemplo es 1)

`consultarNombrePersona(idPersona)`: Con el id que se retono al verificar las coincidencias, se consulta la información con la que se registro el usuario.

Con esto tendriamos implementado todo un sistema de reconocimiento facial. Ahora para compilar nuestro proyecto y realizar la prueba, digitamos el comando en la consola:

```
ionic cordova build android --prod
```

Te invito a que juegues con este proyecto, como por ejemplo mostrando loaders, alertas, utilizando httpclient... Hasta la proxima :)





