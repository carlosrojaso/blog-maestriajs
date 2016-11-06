---
layout: post
title: "Forms con IonicV2"
date: 2016-06-09
tags: ionic2 angular2 forms
categories: demos
comments: true
laucher: "/laucher/demo101"
author: nicobytes
cover: "http://i.imgur.com/PWBxv0C.png"
remember: true
---

> La forma más común de capturar información de los usuarios son los **Formularios** y depende de una buena UI/UX ganar o perder un usuario en nuestra aplicación. 

Por eso es de vital importancia hacer un buen manejo de ellos, tener las validaciones adecuadas y por esto Angular2 nos ofrece **FormBuilder**, una clase que nos provee una completa herramienta para controlar y validar formularios de forma muy eficiente y sencilla.

# Actualización (06/10/2016)
<hr/>
Hemos actualizado este demo con el último release de [Ionic 2 RC 2](http://www.ion-book.com/news/ionic-2-rc-2){:target="_blank"}, si aun estas en alguna de las versiones Beta puedes seguir estos pasos [Steps to Upgrade](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#steps-to-upgrade-to-rc0){:target="_blank"}.

<hr/>

Como **ionic2** usa **Angular2**, podremos usar esta clase con los componentes de UI de ionic2.

<img class="img-responsive" src="http://i.imgur.com/PWBxv0C.png" alt="Form">

Examinemos el siguiente código:

{% highlight ts linenos %}
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

Presta atención a de la *linea 23 a la 35*, aqui es donde ocurre la magia, haciendo uso de nuestra variable `this.formBuilder` podremos crear un controlador para cada uno de nuestros campos en el formulario, aquí podremos enviar validaciones tan sencillas o complejas como queramos. 

El **Form** es algo largo pero sencillo:

{% highlight html linenos %}

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

{% endhighlight %}