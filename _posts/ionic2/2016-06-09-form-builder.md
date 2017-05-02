---
layout: post
title: "Formularios con Ionic"
date: 2017-05-02
tags: [forms, demos, ionic2]
categories: ionic2
laucher: "/launcher/demo101"
author: nicobytes
cover: "/images/posts/ionic2/2016-06-09-form-builder/cover.png"
remember: true
versions:
  - title: 'ionic'
    number: '3.1.1'
  - title: 'ionic-native'
    number: '3.4.2'
  - title: 'ionic-app-scripts'
    number: '1.3.6'
  - title: 'cordova-cli'
    number: '6.5.0'
  - title: 'ionic-cli'
    number: '2.2.2'
---

> La forma más común de capturar información de los usuarios es a partir de **Formularios** y depende de una buena UI/UX ganar o perder un usuario en nuestra aplicación. 

<amp-img width="1366" height="779" layout="responsive" src="/images/posts/ionic2/2016-06-09-form-builder/cover.png" alt="Ionic Form Builder"></amp-img>

Por eso es de vital importancia hacer un buen manejo de ellos, tener las validaciones adecuadas y por esto Angular nos ofrece **FormBuilder**, una clase que nos provee una completa herramienta para controlar y validar formularios de forma muy eficiente y sencilla.

# Actualización (02/05/2017)
<hr/>

Hemos actualizado este demo con el último release de **Ionic 3**, si aún estas en alguna de las versiones anteriores puedes seguir estos pasos [de Ionic 2 a Ionic 3](https://www.ion-book.com/blog/tips/ionic-2-to-ionic3/){:target="_blank"}.

Ademas en este demo usamos la función de [**lazy loading** y **@IonicPage**](https://www.ion-book.com/blog/tips/ionic-page-and-lazy-loading/){:target="_blank"}. Puedes ver el repositorio [**Demo101**](https://github.com/ion-book/demo101){:target="_blank"}

<hr/>

Cómo ionic usa Angular, podremos usar la clase FormBuilder con los componentes del SDK de ionic. Para lograr esto debemos inyectar a FormBuilder como dependencia a nuestro **constructor**, así:

{% highlight ts %}
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
{% endhighlight %}

Ahora creamos el método privado `createMyForm` para crear el formulario, haciendo uso de nuestra variable `this.formBuilder` podremos crear un controlador para cada uno de nuestros campos en el formulario, aquí podremos enviar validaciones tan sencillas o complejas como queramos, así: 

{% highlight ts %}
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
{% endhighlight %}

Como resultado tenemos la clase completa así:

{% highlight ts %}
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
{% endhighlight %}

Ahora para agregar el controlador de nuestro formulario debemos asignar dentro `formGroup` la instancia de `myForm`, además debemos asignar un método para recibir la información, así:

{% highlight html %}
<form [formGroup]="myForm" (ngSubmit)="saveData()">
...
</form>
{% endhighlight %}

Por último por cada campo que tengamos debemos usar `formControlName` para asignar el controlador en cada campo, así:

{% highlight html %}
<ion-item>
  <ion-icon name="person" item-left></ion-icon>
  <ion-label stacked>Nombres:</ion-label>
  <ion-input formControlName="name" type="text" placeholder="Nombre"></ion-input>
</ion-item>
{% endhighlight %}

Todo el template como resultado quedará así:

{% highlight html linenos %}
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Formulario</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <form [formGroup]="myForm" (ngSubmit)="saveData()">
    <ion-list>
      <ion-item>
        <ion-icon name="person" item-left></ion-icon>
        <ion-label stacked>Nombres:</ion-label>
        <ion-input formControlName="name" type="text" placeholder="Nombre"></ion-input>
      </ion-item>
      <ion-item>
        <ion-icon name="person" item-left></ion-icon>
        <ion-label stacked>Apellidos:</ion-label>
        <ion-input formControlName="lastName" type="text" placeholder="Apellidos"></ion-input>
      </ion-item>
      <ion-item>
        <ion-icon name="mail" item-left></ion-icon>
        <ion-label stacked>Correo electronico:</ion-label>
        <ion-input formControlName="email" type="email" placeholder="Email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-icon name="calendar" item-left></ion-icon>
        <ion-label stacked>Fecha de nacimiento:</ion-label>
        <ion-datetime formControlName="dateBirth" displayFormat="MM-DD-YYYY" placeholder="MM-DD-YYY"></ion-datetime>
      </ion-item>
      <div formGroupName="passwordRetry">
        <ion-item>
          <ion-icon name="eye" item-left></ion-icon>
          <ion-label stacked>Contraseña:</ion-label>
          <ion-input formControlName="password" type="password" placeholder="Contraseña"></ion-input>
        </ion-item>
        <ion-item>
          <ion-icon name="eye" item-left></ion-icon>
          <ion-label stacked>Confirmar contraseña:</ion-label>
          <ion-input formControlName="passwordConfirmation" type="password" placeholder="Confirmar contraseña"></ion-input>
        </ion-item>
      </div>
      <ion-row radio-group formControlName="gender">
        <ion-item>
          <ion-icon name="woman" item-left></ion-icon>
          <ion-label>Mujer</ion-label>
          <ion-radio value="2"></ion-radio>
        </ion-item>
        <ion-item>
          <ion-icon name="man" item-left></ion-icon>
          <ion-label>Hombre</ion-label>
          <ion-radio value="1"></ion-radio>
        </ion-item>
      </ion-row>
    </ion-list>
    <div padding>
      <button ion-button block type="submit" [disabled]="!myForm.valid">Guardar</button>
    </div>
  </form>
</ion-content>
{% endhighlight %}