---
layout: post
title: "Clase 3 - Autenticación de Usuarios."
date: 2017-01-12
tags: [class, ionic2, ionic cloud]
categories: ionic2
comments: true
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2Ffirebase-ionic-user-authentication.png?alt=media&token=a0422048-52b1-4b85-b017-48063ce1fd85"
---

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2Ffirebase-ionic-user-authentication.png?alt=media&token=a0422048-52b1-4b85-b017-48063ce1fd85"></amp-img> 

Hello Startupers!!! and welcome to our lesson number 3. Hooray!!!

if you remember the first lesson we create a simple App called *myFirstApp* you can go [here](http://www.startupers.io/ionic-2-lesson1)

Now, we going to continue building our amazing App. Remember our goals.

* Read news from a Feed (RSS).
* Register users.
* Authenticate users.
* Reset password.

First, we need delete the existing pages in my project. When you create a new project by default ionic add some pages about, contacts, tabs, etc.

If you want a project blank you can add the *blank* parameter in the end of

````javascript

$ionic start myFirstApp --v2 blank

````

Delete all the directories in ````src/pages/````

Now, We going to need create some Pages. to do this we going to use a CLI command called [generate](http://ionicframework.com/docs/v2/cli/generate/)

````javascript
$ ionic generate page NewsDetail
$ ionic generate page NewsListing
$ ionic generate page Login
$ ionic generate page Profile
$ ionic generate page ResetPassword
$ ionic generate page Signup
````

That will generate all the pages we need, and then we need go to our ````src/app/app.module.ts```` and import all our news pages and remove the old ones, at the end we would to have something like this:

````javascript

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { NewsDetailPage } from '../pages/news-detail/news-detail';
import { NewsListingPage } from '../pages/news-listing/news-listing';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';

````

And add the pages in NgModule

````javascript

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

````

## Connecting our App with Ionic Cloud.

Now, we need install the Cloud service client.

````javascript

$ npm install @ionic/cloud-angular --save

````

Before you can configure your cloud settings, you’ll need to have an app ID. In your project directory, run:

````javascript

$ ionic io init

````

Define a CloudSettings object for your app’s cloud settings. Replace APP_ID with your app’s ID, which you can find in your ````ionic.config.json```` file.

````javascript

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};

````

And we need to add your cloud settings into ````CloudModule.forRoot()```` inside ````NgModule````


````javascript

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

````

Ok, in this point we should have everything connected.

<br/>
*Are you enjoying this Post?*

*Enroll in our FREE 5 lesson course that will help take your understand Ionic 2 and Ionic Cloud.*

<form action="https://gumroad.com/follow_from_embed_form" class="form gumroad-follow-form-embed" method="post">
<input name="seller_id" type="hidden" value="8823315497069">
<input name="email" placeholder="Your email address" type="email">
<button data-custom-highlight-color="" type="submit">Subscribe</button>
</form>
<br/>


## Creating the Login Page.

If you remember we create some pages with the [ generate command ](http://ionicframework.com/docs/v2/cli/generate/) and you should have this pages in ```` src/pages/ ````

<img src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2Fdir_pages.png?alt=media&token=72d7dc02-5947-4700-ad31-97a6b00e10b0" alt="">

We going to create our *login view* first we need open ```` src/pages/login/login.html ```` and add some components.

### login.html 

```` javascript

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

````

here we gonna see that we are using some components that are from Ionic Framework. 

We going to see more in depth what the components are in the next lessons, but meanwhile you can check this links:

[ion-content](https://ionicframework.com/docs/v2/api/components/content/Content/){:target="_blank"}

[ion-header](https://ionicframework.com/docs/v2/api/components/toolbar/Header/){:target="_blank"}

[ion-navbar](https://ionicframework.com/docs/v2/api/components/navbar/Navbar/){:target="_blank"}

[Forms](https://ionicframework.com/docs/v2/resources/forms/){:target="_blank"}

the important thing to see here is the functions ````loginUser()```` ,  ````goToSignup()```` and ````goToResetPassword()````

We going need that when the user submit the *form* our app send the info to *Ionic Cloud* and register the new user.


````javascript

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

````
Because we are using a ````FormGroup```` we need to use this way to get the values.

````javascript
this.myForm.controls['email'].value
this.myForm.controls['password'].value
````

and after that we going to use the login method provide for *Ionic Cloud*

````javascript

this.auth.login('basic', details).then( ... );

````

the other functions are for navigation in the views.

````javascript

private goToSignup(){
    this.navCtrl.push(SignupPage);
  }

````

````javascript

private goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }
````

and all the magic together

### login.ts 

````typescript

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

````

we can add some styles too in ```` src/pages/login/login.scss ````:

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

In this point we should see something like this:

<img src="https://firebasestorage.googleapis.com/v0/b/startupers-9cbb6.appspot.com/o/Posts%2FScreen%20Shot%202016-12-19%20at%2010.59.23%20PM.png?alt=media&token=6820112d-a01d-4612-81cc-fa9e6191b075" alt="">


Ok, now we need modify the *SignupPage* to create new users in our app.

We can use a similar form like in the login page.

### signup.html

````javascript

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

````

Important to see here the function ````Signup()```` where we need to apply the *signup* method from Ionic Cloud.

````

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

````

all together

### signup.ts

````javascript

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


````

ok, now we gonna build the reset page.

### reset-password.html

````javascript

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

````

### reset-password.ts

````javascript
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
````

Ok, in this point you should to see something like this:

[Demo](/launcher/demo101/){:target="_blank"}

[Repo](https://github.com/StartupersAcademy/myFirstApp){:target="_blank"}

Ok, this is everything for now. In 6 or 7 days since received this in your email you going to receive the next lesson. but, meanwhile you can read the next links :)  

[Forms](https://ionicframework.com/docs/v2/resources/forms/){:target="_blank"}

Please rate this [lesson here](https://carlosrojaso.typeform.com/to/Y07Lg9) and Help us to improve :)

Keep coding...

Carlos Rojas
@carlosrojas_o