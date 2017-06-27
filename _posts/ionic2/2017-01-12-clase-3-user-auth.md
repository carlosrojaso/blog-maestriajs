---
layout: post
title: "Clase 3 - Autenticación de Usuarios."
date: 2017-01-12
tags: [class, ionic cloud]
categories: ionic2
author: carlosrojas
repo: 'https://github.com/ion-book/myFirstApp'
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

Primero, debemos eliminar las páginas existentes en nuestro proyecto. Cuanto creas un nuevo proyecto por defecto Ionic te agrega algunas paginas *About*, *Contacts*, *Tabs*, *etc*.

Si tu quieres un proyecto en blanco tu puedes agregar el parametro *blank* en el final de

```
ionic start myFirstApp blank
```

Ahora borra todos los directorios en `src/pages/`.

Ahora, nosotros vamos a necesitar crear algunas páginas. Para hacer esto vamos a utilizar el comando del CLI llamado [generate](http://ionicframework.com/docs/v2/cli/generate/)

```
ionic generate page new-detail
ionic generate page news-listing
ionic generate page login
ionic generate page profile
ionic generate page reset-password
ionic generate page signup
```

Esto generara todas las páginas que nosotros necesitamos. Vamos a usar en esta app la función de [**lazy loading** y **@IonicPage**](https://www.ion-book.com/blog/tips/ionic-page-and-lazy-loading/){:target="_blank"}.

## Conectando nuestra App con Ionic Cloud.

### Instalar Ionic Cloud.

Luego de crear la cuenta en Ionic.io, debemos implementar la librería para empezar a usar cualquier servicio de Ionic Cloud. Así que vamos a nuestra terminal y ejecutamos: 

```
npm install @ionic/cloud-angular --save
```

Luego debemos conectar nuestro usuario de ionic.io con la aplicación, así:

```
ionic login
```

Luego, debemos crear nuestra aplicación en ionic.io, lo podemos hacer con:

```
ionic link
```

Debes crear el objeto `CloudSettings` para tu app. Esto lo debemos hacer en el archivo `app.module.ts` y reemplazar el APP_ID con el ID que te generarón y lo puedes encontrar en el archivo `ionic.config.json` que se encuentra en la raiz de tu proyecto.

Define los objetos:

```ts

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};

```

Y nosotros necesitamos agregar tus preferencias de cloud en `CloudModule.forRoot()` dentro de `NgModule`.

```ts

@NgModule({
  declarations: [ ... ],
  imports: [
    ...
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
    ...
  ],
  bootstrap: [IonicApp],
  entryComponents: [ ... ],
  providers: [ ... ]
})

```

Si todo quedo bien dentro de la cuenta de ionic.io debe mostrar la aplicación creada, así:

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2017-01-12-clase-3-user-auth/screen.png"></amp-img>

Ok, en este punto deberiamos tener todo conectado.

{% include blog/subscribe.html %}

### Creando la página de Login.

Si recuerdas nosotros creamos algunas paginas con el [ generate command ](http://ionicframework.com/docs/v2/cli/generate/) y deberias tener esta pagina en ` src/pages/ `

<amp-img width="771" height="438" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2Fdir_pages.png?alt=media&token=72d7dc02-5947-4700-ad31-97a6b00e10b0"></amp-img>

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
    <a ion-button block clear (click)="goToSignup()">
      Create a new account
    </a>
    <a ion-button block clear (click)="goToResetPassword()">
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

Para aprender más acerca de manejo de formularios puedes ver nuestros artículos sobre el tema:

1. [Validaciones en Formularios](https://www.ion-book.com/blog/ionic2/validations-in-forms/){:target="_blank"}
1. [Formularios con Ionic](https://www.ion-book.com/blog/ionic2/form-builder/){:target="_blank"}

Las cosas importante para ver aqui son las funciones `loginUser()` ,  `goToSignup()` y `goToResetPassword()`

Nosotros vamos a necesitar que cuando el usuario envie el *form* nuestra app envie la info a *Ionic Cloud* y registre el nuevo usuario.

```ts

  loginUser(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   
    let details = {
      'email': this.myForm.value.email,
      'password': this.myForm.value.password
    };

    this.auth.login('basic', details).then(() => {
      console.log("User logging");
      this.navCtrl.push('NewsListingPage');
    }, (err) => {

        console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';
      }
    );
  }

```

Debido a que estamos usando el `FormGroup` necesitaremos usar esta forma para obtener los valores.

```ts
this.myForm.value.email
this.myForm.value.password
```

y despues nososotros vamos a usar el metodo de login proveido por *Ionic Cloud*

```ts
this.auth.login('basic', details).then( ... );
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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
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

  loginUser(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   
    let details = {
      'email': this.myForm.value.email,
      'password': this.myForm.value.password
    };

    this.auth.login('basic', details).then(() => {
      console.log("User logging");
      this.navCtrl.push('NewsListingPage');
    }, (err) => {

        console.log(err.message);

        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';
      }  
    );
  }

  
 goToSignup(){
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

}
```

En este punto deberíamos utizar algo como esto:

<amp-img width="1280" height="800" layout="responsive" src="/images/posts/ionic2/2017-01-12-clase-3-user-auth/screen1.png"></amp-img>


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

Algo importante es ver aqui la funcion `Signup()` donde nosotros necesitamos aplicar el metodo *signup* desde Ionic Cloud.

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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
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

  signup(){

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   
    let details: UserDetails = {
      'email': this.myForm.value.email,
      'password': this.myForm.value.password
    };

    this.auth.signup(details).then(() => {
      // `this.user` is now registered
      console.log('Registered');
      this.navCtrl.push('LoginPage');
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
      <button ion-button block type="submit" [disabled]="!myForm.valid">Register</button>
    </div>
  </form>
</ion-content>
```

### reset-password.ts

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth, User, IDetailedError } from '@ionic/cloud-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  myForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private auth: Auth
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
    this.auth.requestPasswordReset(this.myForm.value.email)
    .then(() => {
      // `this.user` is now registered
      console.log('Request Sent');
      this.navCtrl.push('LoginPage');
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

Ahora ya tienes una aplicación con registro, login y recuperar contraseña, luego vamos a trabajar aun más, por ahora puedes leer estos artículos y aprender un poco sobre los formularios:

1. [Validaciones en Formularios](https://www.ion-book.com/blog/ionic2/validations-in-forms/){:target="_blank"}
1. [Formularios con Ionic](https://www.ion-book.com/blog/ionic2/form-builder/){:target="_blank"}
