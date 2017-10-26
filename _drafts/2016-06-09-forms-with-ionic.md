---
layout: post
title: "Formularios en Ionic"
date: 2017-10-26
tags: [forms, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo101"
laucher: "https://ion-book.github.io/demo101/"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-06-09-form-with-ionic%2Fcover.jpg?alt=media&token=fc7a53d1-f38b-4a36-9910-b48566220694"
remember: true
versions:
  - title: 'ionic'
    number: '3.7.1'
  - title: 'ionic-native'
    number: '4.3.2'
  - title: 'ionic-app-scripts'
    number: '3.0.1'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.15.1'
---

> La forma más común de capturar información de los usuarios es a partir de **Formularios** y depende de una buena UI/UX ganar o perder un usuario en nuestra aplicación. 

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-06-09-form-with-ionic%2Fcover.jpg?alt=media&token=fc7a53d1-f38b-4a36-9910-b48566220694" alt="Ionic Form Builder"></amp-img>

{% include general/net-promoter-score.html %} 

Por eso es de vital importancia hacer un buen manejo de ellos, tener las validaciones adecuadas y por esto Angular nos ofrece **FormBuilder**, una clase que nos provee una completa herramienta para controlar, construir y validar formularios de forma muy eficiente y sencilla.

# Actualización (25/10/2017)
<hr/>

Hemos actualizado este demo con el último release [**Ionic 3.7**](https://www.ion-book.com/blog/news/ionic-3-7/){:target="_blank"}
<hr/>

<a href="https://ion-book.github.io/demo101/" target="_blank" class="btn btn-round btn-success">Ver demo</a>

Cómo ionic usa Angular, podremos usar la clase FormBuilder en los componentes del SDK de ionic. Para lograr esto debemos inyectar a FormBuilder como dependencia a nuestro `constructor`, así:

```ts
...
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'my-form.html',
})
export class MyFormPage {

  myForm: FormGroup;
  
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder
  ) {
  ...
}
```

Ahora vamos a crear el método privado `createMyForm` para crear el formulario, haciendo uso de nuestra variable `this.formBuilder` podremos crear un controlador para cada uno de nuestros campos en el formulario, aquí podremos enviar validaciones tan sencillas o complejas como queramos, así: 

```ts
private createMyForm(){
  return this.formBuilder.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    dateBirth: ['', Validators.required],
    passwordRetry: this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    }),
    gender: ['', Validators.required],
  });
}
```

Como resultado tendremos la clase completa así:

`src/pages/my-form/my-form.ts`:

```ts
import { Component } from '@angular/core';
import { IonicPage , NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'my-form.html',
})
export class MyFormPage {

  myForm: FormGroup;
  
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder
  ) {
    this.myForm = this.createMyForm();
  }
  
  saveData(){
    console.log(this.myForm.value);
  }
  
  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      dateBirth: ['', Validators.required],
      passwordRetry: this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      }),
      gender: ['', Validators.required],
    });
  }
}
```

{% include blog/subscribe.html %}

Ahora para agregar el controlador de nuestro formulario debemos asignar dentro del atributo `formGroup` la instancia de `myForm`, además debemos asignar un método para recibir la información, así:

```html
<form [formGroup]="myForm" (ngSubmit)="saveData()">
...
</form>
```

Por último por cada campo debemos usar `formControlName` para asignar el controlador en cada campo, así:

```html
<ion-item>
  <ion-icon name="person" item-start></ion-icon>
  <ion-label stacked>Nombres:</ion-label>
  <ion-input formControlName="name" type="text" placeholder="Nombre"></ion-input>
</ion-item>
```

Todo el template como resultado quedará así:

`src/pages/my-form/my-form.html`:

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Formulario</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <form [formGroup]="myForm" (ngSubmit)="saveData()">
    <ion-list>
      <ion-item>
        <ion-icon name="person" item-start></ion-icon>
        <ion-label stacked>Nombres:</ion-label>
        <ion-input formControlName="name" type="text" placeholder="Nombre"></ion-input>
      </ion-item>
      <ion-item>
        <ion-icon name="person" item-start></ion-icon>
        <ion-label stacked>Apellidos:</ion-label>
        <ion-input formControlName="lastName" type="text" placeholder="Apellidos"></ion-input>
      </ion-item>
      <ion-item>
        <ion-icon name="mail" item-start></ion-icon>
        <ion-label stacked>Correo electronico:</ion-label>
        <ion-input formControlName="email" type="email" placeholder="Email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-icon name="calendar" item-start></ion-icon>
        <ion-label stacked>Fecha de nacimiento:</ion-label>
        <ion-datetime formControlName="dateBirth" displayFormat="MM-DD-YYYY" placeholder="MM-DD-YYY"></ion-datetime>
      </ion-item>
      <div formGroupName="passwordRetry">
        <ion-item>
          <ion-icon name="eye" item-start></ion-icon>
          <ion-label stacked>Contraseña:</ion-label>
          <ion-input formControlName="password" type="password" placeholder="Contraseña"></ion-input>
        </ion-item>
        <ion-item>
          <ion-icon name="eye" item-start></ion-icon>
          <ion-label stacked>Confirmar contraseña:</ion-label>
          <ion-input formControlName="passwordConfirmation" type="password" placeholder="Confirmar contraseña"></ion-input>
        </ion-item>
      </div>
      <ion-row radio-group formControlName="gender">
        <ion-col>
          <ion-item>
            <ion-icon name="woman" item-start></ion-icon>
            <ion-label>Mujer</ion-label>
            <ion-radio value="2"></ion-radio>
          </ion-item>
        </ion-col>
        <ion-col>
          <ion-item>
            <ion-icon name="man" item-start></ion-icon>
            <ion-label>Hombre</ion-label>
            <ion-radio value="1"></ion-radio>
          </ion-item>
        </ion-col>
      </ion-row>
    </ion-list>
    <div padding>
      <button ion-button block type="submit" [disabled]="!myForm.valid">Guardar</button>
    </div>
  </form>
</ion-content>
```

## Resultado: 

<amp-img width="791" height="639" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-06-09-form-with-ionic%2Fscreen.png?alt=media&token=bf6ef3e2-1b05-4ac2-a365-77a0eede3e3a" alt="Ionic Form Builder"></amp-img>