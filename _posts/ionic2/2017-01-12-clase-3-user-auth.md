---
layout: post
title: "Clase 3 - Autenticación de Usuarios."
date: 2017-09-13
tags: [class, ionic cloud]
categories: ionic2
author: carlosrojas
repo: 'https://github.com/ion-book/myFirstApp'
remember: true
cover: "/images/posts/ionic2/2017-01-12-clase-3-user-auth/cover.png"
versions:
  - title: 'ionic'
    number: '3.3.0'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.0'
  - title: 'ionic-cli'
    number: '3.10.1'
---

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2017-01-12-clase-3-user-auth/cover.png"></amp-img> 

{% include general/net-promoter-score.html %} 

!Hola Ioner! y bienvenido a nuestra clase 3.

Si recuerdas la primera clase, nosostros creamos unas simple App llamada *myFirstApp* puede ir [aquí](https://www.ion-book.com/blog/ionic2/clase-1-feed/)
Ahora, vamos a continuar construyendo nuestra App. Recordemos nuestras metas.

* Leer noticias desde el Feed (RSS).
* Registrar usuarios.
* Autenticar usuarios.
* Restaurar el password.

Primero, debemos eliminar las páginas existentes en nuestro proyecto. Cuanto creas un nuevo proyecto por defecto Ionic te agrega algunas paginas *About*, *Contacts*, *Tabs*, *etc*.

Si tu quieres un proyecto en blanco tu puedes agregar el parametro *blank* en el final de

```
ionic start myFirstApp blank
```

Ahora borra todos los directorios en `src/pages/`.

Ahora, nosotros vamos a necesitar crear algunas páginas. Para hacer esto vamos a utilizar el comando del CLI llamado [generate](http://ionicframework.com/docs/v2/cli/generate/)

```
ionic generate page feed-list
ionic generate page login
ionic generate page profile
ionic generate page reset-password
ionic generate page signup
```

Esto generara todas las páginas que nosotros necesitamos. Vamos a usar en esta app la función de [**lazy loading** y **@IonicPage**](https://www.ion-book.com/blog/tips/ionic-page-and-lazy-loading/){:target="_blank"}.

## Conectando nuestra App con Firebase.

### Instalar Firebase.

Luego de crear la cuenta en [Firebase](https://firebase.google.com/), debemos implementar la librería para empezar a usar cualquier servicio de Firebase y AngularFire2 para facilitar nuestra vida usando Observables. Así que vamos a nuestra terminal y ejecutamos: 

```
npm install angularfire2 firebase promise-polyfill --save
```

Ahora Debes crear el objeto `firebaseConfig` para tu app. Esto lo debemos hacer en el archivo `app.module.ts` y reemplazar la información de la app con la que obtienes de tu proyecto en Firebase.

Define los objetos:

```ts

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

export const firebaseConfig = {
  apiKey: "xxxxxxxxxx",
  authDomain: "your-domain-name.firebaseapp.com",
  databaseURL: "https://your-domain-name.firebaseio.com",
  storageBucket: "your-domain-name.appspot.com",
  messagingSenderId: '<your-messaging-sender-id>'
};

```

también necesitamos agregar los modulos de AngularFire2 dentro de `NgModule`.

```ts

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
...


@NgModule({
  declarations: [ ... ],
  imports: [
    ...
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
    ...
  ],
  bootstrap: [IonicApp],
  entryComponents: [ ... ],
  providers: [ ... ]
})

```

Ok, hasta aqui deberiamos tener todo conectado.

{% include blog/subscribe.html %}

### Creando la página de Login.

Si recuerdas nosotros creamos algunas paginas con el [ generate command ](http://ionicframework.com/docs/v2/cli/generate/) y deberias tener esta pagina en ` src/pages/ `

<amp-img width="771" height="438" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fclase3%2FCaptura%20de%20pantalla%202017-09-13%20a%20la(s)%209.08.20%20a.m..png?alt=media&token=9568ee11-de17-4711-954e-183e78462cbf"></amp-img>

Nosotros vamos a crear nuestro *login view* por lo que vamos a abrir ```` src/pages/login/login.html ```` y agregar algunos componentes.

### login.html 

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Login</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <form [formGroup]="myForm" (ngSubmit)="loginUser()">
    <ion-list>
      <ion-item text-center>
        <ion-img width="192" height="192" src="assets/logo192.png" ></ion-img>
      </ion-item>
      <ion-item>
        <ion-icon name="person" item-left></ion-icon>
        <ion-label stacked>Email:</ion-label>
        <ion-input formControlName="email" type="text" placeholder="Email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-icon name="key" item-left></ion-icon>
        <ion-label stacked>Password:</ion-label>
        <ion-input formControlName="password" type="password" placeholder="Password"></ion-input>
      </ion-item>
    </ion-list>
    <div padding>
      <button ion-button block type="submit" [disabled]="!myForm.valid">Ingresar</button>
    </div>
  </form>
  <div text-center>
    <a ion-button block clear (click)="goToSignup()">
      Nueva cuenta
    </a>
    <a ion-button block clear (click)="goToResetPassword()">
      Olvide password
    </a>
  </div>
</ion-content>
```

En este punto podemos ver que estamos usando algunos componentes que son del Ionic Framework.

Nosotros vamos a ver más a fondo que son los componentes en las proximas clases, pero mientras tanto tu puedes ver estos links:

[ion-content](https://ionicframework.com/docs/v2/api/components/content/Content/){:target="_blank"}

[ion-header](https://ionicframework.com/docs/v2/api/components/toolbar/Header/){:target="_blank"}

[ion-navbar](https://ionicframework.com/docs/v2/api/components/navbar/Navbar/){:target="_blank"}

Para aprender más acerca de manejo de formularios puedes ver nuestros artículos sobre el tema:

1. [Validaciones en Formularios](https://www.ion-book.com/blog/ionic2/validations-in-forms/){:target="_blank"}
1. [Formularios con Ionic](https://www.ion-book.com/blog/ionic2/form-builder/){:target="_blank"}

Las cosas importante para ver aqui son las funciones `loginUser()` ,  `goToSignup()` y `goToResetPassword()`

Nosotros vamos a necesitar que cuando el usuario envie el *form* nuestra app envie la info a *Firebase* y registre el nuevo usuario.

```ts

  loginUser(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   

    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(() => {
      console.log("User logging");
      this.navCtrl.setRoot('HomePage');
    }, (err) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: err.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

```

Debido a que estamos usando el `FormGroup` necesitaremos usar esta forma para obtener los valores.

```ts
this.myForm.value.email
this.myForm.value.password
```

y despues nososotros vamos a usar el metodo de login proveido por *Firebase*

```ts
this.afAuth.auth.signInWithEmailAndPassword(email, password).then( ... );
```

las otras funciones las usamos para navegación.

```ts
goToSignup(){
  this.navCtrl.push('SignupPage');
}
```

```ts
goToResetPassword(){
  this.navCtrl.push('ResetPasswordPage');
}
```

y toda la magia junta se ve asi.

### login.ts 

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Loading, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  myForm: FormGroup;
  user: Observable<firebase.User>;
  public loading:Loading;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user = afAuth.authState;
  }

  loginUser(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   

    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(() => {
      console.log("User logging");
      this.navCtrl.setRoot('HomePage');
    }, (err) => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: err.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }
  

  goToSignup(){
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

}

```

{% include blog/subscribe.html %}

En este punto deberíamos utizar algo como esto:

<amp-img width="1280" height="800" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fclase3%2FCaptura%20de%20pantalla%202017-09-13%20a%20la(s)%209.10.54%20a.m..png?alt=media&token=0314bef4-56f2-47a3-af36-0f7e43e7f32b"></amp-img>


Ok, ahora necesitamos modificar el *SignupPage* para crear el nuevo usuario en nuestra app.

Nosotros podemos usar un formulario similar como en la pagina de login.

### signup.html

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Signup</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <form [formGroup]="myForm" (ngSubmit)="signup()">
    <ion-list>
      <ion-item>
        <ion-icon name="person" item-left></ion-icon>
        <ion-label stacked>Email:</ion-label>
        <ion-input formControlName="email" type="text" placeholder="Email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-icon name="key" item-left></ion-icon>
        <ion-label stacked>Password:</ion-label>
        <ion-input formControlName="password" type="password" placeholder="Password"></ion-input>
      </ion-item>
    </ion-list>
    <div padding>
      <button ion-button block type="submit" [disabled]="!myForm.valid">Register</button>
    </div>
  </form>
</ion-content>
```

Algo importante es ver aqui la funcion `Signup()` donde nosotros necesitamos aplicar el metodo *createUserWithEmailAndPassword* desde Firebase.

```ts

this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then(
      res => {
        this.navCtrl.setRoot('HomePage');
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      }); 

```

todo junto

### signup.ts

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, 
  Loading, 
  AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  myForm: FormGroup;
  public loading:Loading;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   

    this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then(
      res => {
        this.navCtrl.setRoot('HomePage');
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    
  }

}

```

ok, ahora vamos a construir la pagina de restaurar.

### reset-password.html

```html
<ion-header>
  <ion-navbar>
    <ion-title>ResetPassword</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <form [formGroup]="myForm" (ngSubmit)="resetPassword()">
    <ion-icon name="contact"></ion-icon>
    <ion-list>
      <ion-item>
        <ion-icon name="person" item-left></ion-icon>
        <ion-label stacked>Email:</ion-label>
        <ion-input formControlName="email" type="text" placeholder="Email"></ion-input>
      </ion-item>
    </ion-list>
    <div padding>
      <button ion-button block type="submit" [disabled]="!myForm.valid">Reset</button>
    </div>
  </form>
</ion-content>
```

### reset-password.ts

```ts
import { Component } from '@angular/core';
import { IonicPage,NavController,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public nav: NavController,
    public alertCtrl: AlertController
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('Hello ResetPasswordPage Page');
  }

  resetPassword(){
    console.log("Email:" + this.myForm.value.email);
    
    this.afAuth.auth.sendPasswordResetEmail(this.myForm.value.email)
    .then((user) => {
      let alert = this.alertCtrl.create({
        message: "Te enviamos un link a tu correo.",
        buttons: [
          {
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.nav.pop();
            }
          }
        ]
      });
      alert.present();
    }, (error) => {
      var errorMessage: string = error.message;
      let errorAlert = this.alertCtrl.create({
        message: errorMessage,
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      errorAlert.present();
    });
  }

}
```

Ahora ya tienes una aplicación con registro, login y recuperar contraseña, luego vamos a trabajar aun más, por ahora puedes leer estos artículos y aprender un poco sobre los formularios:

1. [Validaciones en Formularios](https://www.ion-book.com/blog/ionic2/validations-in-forms/){:target="_blank"}
1. [Formularios con Ionic](https://www.ion-book.com/blog/ionic2/form-builder/){:target="_blank"}
