---
layout: post
title: "Clase 3 - Autenticación de Usuarios."
date: 2017-01-12
tags: [class, ionic cloud]
categories: ionic2
author: carlosrojas
cover: "/images/posts/ionic2/2017-01-12-clase-3-user-auth/cover.png"
versions:
  - title: 'ionic'
    number: '3.3.0'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.0'
  - title: 'ionic-cli'
    number: '3.4.0'
---

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2017-01-12-clase-3-user-auth/cover.png"></amp-img> 

!Hola Ioner! y bienvenido a nuestra clase 3.

Si recuerdas la primera clase, nosostros creamos unas simple App llamada *myFirstApp* puede ir [aquí](https://www.ion-book.com/blog/ionic2/clase-1-feed/)
Ahora, vamos a continuar construyendo nuestra App. Recordemos nuestras metas.

* Leer noticias desde el Feed (RSS).
* Registrar usuarios.
* Autenticar usuarios.
* Restaurar el password.

Primero, Debemos eliminar las paginas existentes en nuestro proyecto. Cuanto creas un nuevo proyecto por defecto Ionic te agrega algunas paginas *About*, *Contacts*, *Tabs*, *etc*.

Si tu quieres un proyecto en blanco tu puedes agregar el parametro *blank* en el final de

```
$ionic start myFirstApp blank
```

Borra todos los directorios en  `src/pages/`

Ahora, nosotros vamos a necesitar crear algunas pagínas. Para hacer esto vamos a utilizar el comando del CLI llamado [generate](http://ionicframework.com/docs/v2/cli/generate/)

```
$ ionic generate page NewsDetail
$ ionic generate page NewsListing
$ ionic generate page Login
$ ionic generate page Profile
$ ionic generate page ResetPassword
$ ionic generate page Signup
```

Esto generara todas las pagínas que nosotros necesitamos. Ahora debemos ir a `src/app/app.module.ts` e imporatemos todas las paginas de noticias y removeremos las antiguas, al final tu deberias tener algo como esto:

```ts

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { NewsListingPage } from '../pages/news-listing/news-listing';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';

```

y agregamos las nuevas pagnas en NgModule

```ts

@NgModule({
  declarations: [
    MyApp,
    NewsDetailPage,
    NewsListingPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsDetailPage,
    NewsListingPage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage
  ],
  providers: []
})
export class AppModule {}

```

## Conectando nuestra App con Ionic Cloud.

Ahora, necesitamos instalar el Cloud Service client.

```ts
$ npm install @ionic/cloud-angular --save
```

Antes de que puedas configurar tus cloud settings, tendras que tener un app ID. en el directorio de tu proyecto, ejecuta:

```
$ ionic io init

```

Debes crear el objeto ````CloudSettings```` para tu app. Esto lo debemos hacer en el archivo ````app.module.ts```` y reemplazar el APP_ID con el ID que  te generarón al usar ````ionic io init```` y lo puedes encontrar en el archivo ````ionic.config.json```` que se encuentra en la raiz de tu proyecto.

Define los objetos 

```ts

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};

```

Y nosotros necesitamos agregar tus preferencias de cloud en ````CloudModule.forRoot()```` dentro de ````NgModule````


```ts

@NgModule({
  declarations: [ ... ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [ ... ],
  providers: [ ... ]
})

```

Ok, en este punto deberiamos tener todo conectado.

{% include blog/subscribe.html %}

## Creando la pagina de Login.

Si recuerdas nosotros creamos algunas paginas con el [ generate command ](http://ionicframework.com/docs/v2/cli/generate/) y deberias tener esta pagina en ```` src/pages/ ````

<amp-img width="771" height="438" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2Fdir_pages.png?alt=media&token=72d7dc02-5947-4700-ad31-97a6b00e10b0"></amp-img>

Nosotros vamos a crear nuestro *login view* por lo que vamos a abrir ```` src/pages/login/login.html ```` y agregar algunos componentes.

### login.html 

```ts

<ion-header>
  <ion-navbar color="primary">
    <ion-title>Login</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <form [formGroup]="myForm" (ngSubmit)="loginUser()" padding class="loginpage">
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
      <button ion-button block type="submit" [disabled]="!myForm.valid">Login</button>
    </div>
  </form>
  <div text-center>
   <a block clear (click)="goToSignup()">
      Create a new account
    </a>

    <a block clear (click)="goToResetPassword()">
      I forgot my password
    </a>
  </div>
</ion-content>

```

En este punto podemos ver que estamos usando algunos componentes que son del Ionic Framework.

Nosotros vamos a ver más a fondo que son los componentes en las proximas clases, pero mientras tanto tu puedes ver estos links:

[ion-content](https://ionicframework.com/docs/v2/api/components/content/Content/){:target="_blank"}

[ion-header](https://ionicframework.com/docs/v2/api/components/toolbar/Header/){:target="_blank"}

[ion-navbar](https://ionicframework.com/docs/v2/api/components/navbar/Navbar/){:target="_blank"}

[Forms](https://ionicframework.com/docs/v2/resources/forms/){:target="_blank"}

Las cosas importante para ver aqui son las funciones ````loginUser()```` ,  ````goToSignup()```` y ````goToResetPassword()````

Nosotros vamos a necesitar que cuando el usuario envie el *form* nuestra app envie la info a *Ionic Cloud* y registre el nuevo usuario.


```ts

  private loginUser(){

    console.log("Email:" + this.myForm.controls['email'].value);
    console.log("Password:" + this.myForm.controls['password'].value);
   
    let details = {'email': this.myForm.controls['email'].value, 'password': this.myForm.controls['password'].value};

    this.auth.login('basic', details).then(() => {
    console.log("User logging");
    this.navCtrl.push(NewsListingPage);
    }, (err) => {

        console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';
      }
      );
  

  }

```

Debido a que estamos usando el ````FormGroup```` necesitaremos usar esta forma para obtener los valores.

```ts
this.myForm.controls['email'].value
this.myForm.controls['password'].value
```

y despues nososotros vamos a usar el metodo de login proveido por *Ionic Cloud*

```ts

this.auth.login('basic', details).then( ... );

```

las otras funciones las usamos para navegación.

```ts

private goToSignup(){
    this.navCtrl.push(SignupPage);
  }

```

```ts

private goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }
```

y toda la magia junta se ve asi.

### login.ts 

```ts

import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';
import { NewsListingPage } from '../news-listing/news-listing';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
   myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public auth: Auth, 
    public user: User
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private loginUser(){

    console.log("Email:" + this.myForm.controls['email'].value);
    console.log("Password:" + this.myForm.controls['password'].value);
   
    let details = {'email': this.myForm.controls['email'].value, 'password': this.myForm.controls['password'].value};

    this.auth.login('basic', details).then(() => {
    console.log("User logging");
    this.navCtrl.push(NewsListingPage);
    }, (err) => {

        console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';
      }
      );
  

  }

  private goToSignup(){
    this.navCtrl.push(SignupPage);
  }

  private goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }


}

```

nosotros podemos agregar algunos estilos tambien en ```` src/pages/login/login.scss ````:

### login.scss 

`````scss

.loginpage {
  form {
    margin-bottom: 20px;
    button {
      margin-top: 10px;
    }
  }
  ion-label {
    margin-left: 5px;
  }

  ion-input {
    padding: 5px;
  }

}

`````

En este punto deberiamos utizar algo como esto:

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2FScreen%20Shot%202016-12-19%20at%2010.59.23%20PM.png?alt=media&token=6820112d-a01d-4612-81cc-fa9e6191b075"></amp-img> 


Ok, ahora necesitamos modificar el *SignupPage* para crear el nuevo usuario en nuestra app.

Nosotros podemos usar un formulario similar como en la pagina de login.

### signup.html

```ts

<ion-header>
  <ion-navbar color="primary">
    <ion-title>Signup</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <form [formGroup]="myForm" (ngSubmit)="Signup()" padding class="login">
    <ion-icon name="contact"></ion-icon>
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

Algo importante es ver aqui la funcion ````Signup()```` donde nosotros necesitamos aplicar el metodo *signup* desde Ionic Cloud.

```ts

this.auth.signup(details).then(() => {
  // `this.user` is now registered
}, (err: IDetailedError<string[]>) => {
  for (let e of err.details) {
    if (e === 'conflict_email') {
      alert('Email already exists.');
    } else {
      // handle other errors
    }
  }
});

```

todo junto

### signup.ts

```ts

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public auth: Auth, 
    public user: User
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    
  }
  
  private Signup(){

    console.log("Email:" + this.myForm.controls['email'].value);
    console.log("Password:" + this.myForm.controls['password'].value);
   
    let details: UserDetails = {'email': this.myForm.controls['email'].value, 'password': this.myForm.controls['password'].value};

    this.auth.signup(details).then(() => {
      // `this.user` is now registered
      console.log('Registered');
      this.navCtrl.push(LoginPage);
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        switch (e) {
        case 'required_email': 
          console.log('Missing email field.');
        case 'required_password': 
          console.log('Missing password field');
        break; 
        case 'conflict_email': 
          console.log('A user has already signed up with the supplied email');
        break;
        case 'conflict_username': 
          console.log('A user has already signed up with the supplied username');
        break;
        case 'invalid_email': 
          console.log('The email did not pass validation.');
        break;
        default:
          console.log('Something unknow.');
      }     
      }
    }); 
  }
}


```

ok, ahora vamos a construir la pagina de restaurar.

### reset-password.html

```ts

<ion-header>

  <ion-navbar>
    <ion-title>ResetPassword</ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>
<form [formGroup]="myForm" (ngSubmit)="ResetPassword()" padding class="login">
    <ion-icon name="contact"></ion-icon>
    <ion-list>
      <ion-item>
        <ion-icon name="person" item-left></ion-icon>
        <ion-label stacked>Email:</ion-label>
        <ion-input formControlName="email" type="text" placeholder="Email"></ion-input>
      </ion-item>
    </ion-list>
    <div padding>
      <button ion-button block type="submit" [disabled]="!myForm.valid">Register</button>
    </div>
  </form>
</ion-content>

```

### reset-password.ts

```ts

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, IDetailedError } from '@ionic/cloud-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {
  myForm: FormGroup;

  constructor(public navCtrl: NavController,
  public formBuilder: FormBuilder,
  public auth: Auth, ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('Hello ResetPasswordPage Page');
  }

  private ResetPassword(){
    console.log("Email:" + this.myForm.controls['email'].value);
    this.auth.requestPasswordReset(this.myForm.controls['email'].value).then(() => {
      // `this.user` is now registered
      console.log('Request Sent');
      this.navCtrl.push(LoginPage);
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        switch (e) {
        case 'required_email': 
          console.log('Missing email field.');
        case 'required_password': 
          console.log('Missing password field');
        break; 
        case 'conflict_email': 
          console.log('A user has already signed up with the supplied email');
        break;
        case 'conflict_username': 
          console.log('A user has already signed up with the supplied username');
        break;
        case 'invalid_email': 
          console.log('The email did not pass validation.');
        break;
        default:
          console.log('Something unknow.');
      }     
      }
    }); 
  }

}
```

Ok, en este punto deberias ver algo como esto:


[Demo](/launcher/demo110/){:target="_blank"}

[Repo](https://startupersacademy.github.io/myFirstApp/){:target="_blank"}

Ok, esto es todo por ahora pero puedes ver este leer este link y aprender un poco sobre los formularios

[Forms](https://ionicframework.com/docs/v2/resources/forms/){:target="_blank"}
