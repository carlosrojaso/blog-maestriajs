---
layout: post
title: "Validaciones en Formularios"
keywords: "validaciones con ionic, formularios con angular 2, validar email con angular 2, formbuilder, formularios con ionic 2"
date: 2017-05-24
tags: [forms, demos]
categories: ionic2
repo: "https://github.com/ion-book/demo109"
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fvalidations-in-forms%2FValidaciones%20en%20Formularios.jpg?alt=media"
remember: true
versions:
  - title: 'ionic'
    number: '3.3.0'
  - title: 'ionic-native'
    number: '3.10.3'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.3.0'
---

> La forma más común de capturar información de los usuarios son los **Formularios** y depende de una buena UI/UX ganar o perder un usuario en nuestra aplicación.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2016-12-29-validations-in-forms/cover.jpg" alt="Validaciones en Formularios"></amp-img>

{% include general/net-promoter-score.html %} 

# Actualización (21/05/2017)
<hr/>

Hemos actualizado este demo con el último release de **Ionic 3**, si aún estas en alguna de las versiones anteriores puedes seguir estos pasos [de Ionic 2 a Ionic 3](https://www.ion-book.com/blog/tips/ionic-2-to-ionic3/){:target="_blank"}.

Ademas en este demo usamos la función de **lazy loading** y **@IonicPage**. Puedes ver el repositorio [**Demo109**](https://github.com/ion-book/demo109){:target="_blank"}

<hr/>

Por eso es de vital importancia hacer un buen manejo de ellos, tener las validaciones adecuadas y por esto Angular nos ofrece **FormBuilder**, una clase que nos provee una completa herramienta para controlar y validar formularios de forma muy eficiente y sencilla.

Antes puedes ver nuestro artículo anterior [**Formularios con Ionic**]({{site.urlblog}}/ionic2/form-builder/){:target="_blank"} donde hacemos la construcción de un formulario sencillo, en este artículo nos enfocaremos en las **validaciones**.

En Angular existen tres maneras de trabajar con formularios:

## Forms con NgModel

Es mucho más simple de trabajar y es muy familiar a Angular 1, pero se tiene menos control y es difícil hacer pruebas unitarias usando NgModel.

## Forms con Templates

De esta manera la lógica está casi toda en el template, lo que puede llegar a ser difícil de mantener, hacer test y el template de puede ver desordenado.

## Forms con FormBuilder

Con FormBuilder dejas toda la lógica del lado del controlador (esto es muy útil), es mucho más ordenado, fácil para hacer pruebas y fácil de mantener, lo unico es que debes agregar un import en tu controlador.

Para crear nuestro formulario con FormBuilder, vamos a ver la siguiente estructura básica:

```ts
this.myForm = this.fb.group({
  name: ['', [Validators.required]],
  company: ['', [Validators.required]],
  email: ['', [Validators.required]],
  age: ['', [Validators.required]],
  url: ['', [Validators.required]],
  password: ['', [Validators.required]],
});
```

La clase completa se vera asi `home.ts`:

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      email: ['', [Validators.required]],
      age: ['', [Validators.required]],
      url: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  saveData(){
    alert(JSON.stringify(this.myForm.value));
  }

}
```

Con el método `saveData` obtenemos la información del formulario luego que todo sea validado.

Antes de empezar, es necesario entender los conceptos básicos para desarrollar el demo de este artículo.

Observamos que todos los campos tienen una validación la cual es `Validators.required`, es decir que todos los campos son obligatorios. Con Angular y FormBuilder podemos agregar validaciones tan complejas como queramos, existen dos tipos de validaciones.

## Validaciones asíncronas

Las validaciones asíncronas son aquellas en las cuales debemos hacer una solicitud externa y de acuerdo a ello validar los datos, por ejemplo para validar un nombre de usuario (usersname), primero debemos hacer una solicitud a nuestra base de datos y comprobar que el nombre de usuario está disponible, esto es una validación asíncrona.

## Validaciones síncronas

La validación asíncrona es aquella que no necesitamos de consultar ninguna fuente externa para comprobar los datos, como por ejemplo validar que el email tiene el formato correcto ó validar que el usuario sea mayor un adulto a partir de la edad ó validar un número mínimo de caracteres etc.

Teniendo esto en cuenta podemos hacer combinaciones muy útiles de validaciones respetando esta la siguiente forma:

```ts
'field': [_value_, [validaciones sincronas], [validaciones asíncronas]],
```

Como ven primero va el valor por defecto, luego declaramos el conjunto de la validaciones sincronas y luego el conjunto de validaciones asíncronas. En este artículo trabajaremos con validaciones sincronas (más adelante escribiremos sobre las validaciones asíncronas).

**Angular**, son provee la clase `Validators` que trae funciones comunes que son de mucha utilidad en los formularios:

1. **Validators.required** = Comprueba que el campo sea llenado.
1. **Validators.minLength** = Comprueba que el campo cumpla con un mínimo de caracteres.
1. **Validators.maxLength** = Comprueba que el campo cumpla con un máximo de caracteres.
1. **Validators.pattern** = Comprueba que el campo cumpla con un patrón usando una expresión regular.
1. **Validators.email** = Comprueba que el campo cumpla con un patrón de correo válido.

Con estas funciones podemos crear conjuntos de validaciones, por ejemplo al campo company podemos agregar el siguiente conjunto de validaciones:

```ts
'company': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
```

Y esto hará que el campo cumpla con todas las validaciones que fueron declaradas para que el campo `company` sea un campo válido.

Y esto hará que el campo cumpla con todas las validaciones que fueron declaradas para que el campo company sea un campo válido. También podemos crear nuestras propias validaciones, pero esto lo veremos en los próximos artículos.

Ahora nos enfocaremos en el template y mostrar los errores de cada campo al usuario, como ejemplo tomaremos en cuenta nuestro campo `company` que debe cumplir con varias validaciones al mismo tiempo.

```html
...
<ion-item>
  <ion-label stacked>Company:</ion-label>
  <ion-input formControlName="company" type="text" placeholder="company"></ion-input>
</ion-item>
<ion-item *ngIf="myForm.get('company').errors && myForm.get('company').dirty">
  <p *ngIf="myForm.get('company').hasError('required')">Field is required</p>
  <p *ngIf="myForm.get('company').hasError('minlength')">Min of 5 characters</p>
  <p *ngIf="myForm.get('company').hasError('maxlength')">Max of 10 characters</p>
</ion-item>
..
```

Como podemos ver se hace uso del elemento myForm dentro del formulario y así podemos obtener el estado actual del campo, y haciendo uso de `myForm.get('field').hasError(‘typeError')` podremos saber cuál mensaje mostrar al usuario dependiendo del error que tenga el campo.

Ahora si con estos conceptos claros podemos iniciar con nuestro demo (Demo Time).

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start demo109 blank
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd demo109
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="183" layout="responsive" src="/images/posts/ionic2/2016-07-11-camera-and-ionic/tree1.png"></amp-img>
  </div>
</div>

Luego agregamos la plataforma para la que vamos a desarrollar:

```
ionic cordova platform add android
ionic cordova platform add ios
```

## Paso 2: Crear el Formulario

Vamos a usar FormBuilder para crear nuestro formulario, de esta manera:

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      url: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
      password: ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
    });
  }

  saveData(){
    alert(JSON.stringify(this.myForm.value));
  }

}
```

como podemos ver usamos todos los métodos que nos provee la clase `Validators`.

### Expresiones regulares

Las expresiones regulares son muy frecuente para validar datos, las expresiones y imagenes a continuacion son del artiulo [8 Regular Expressions You Should Know](https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149){:target="_blank"}

Usamos la siguiente expresión regular para validar una **url**:

<div class="row">
  <div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="600" height="500" layout="responsive" src="https://cdn.tutsplus.com/net/uploads/legacy/404_regularExpressions/images/url.jpg"></amp-img>
  </div>
</div>

```
/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
```

Usamos la siguiente expresión regular para validar un **password**:

<div class="row">
  <div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="600" height="370" layout="responsive" src="https://cdn.tutsplus.com/net/uploads/legacy/404_regularExpressions/images/password.jpg"></amp-img>
  </div>
</div>

```
/^[a-z0-9_-]{6,18}$/
```

## Paso 3: El template

Ahora en el template vamos a controlar cómo mostrar los errores al usuario a partir de el formulario `myForm` declarada en el controlador, nuestro template completo será el siguiente:

```html
<form [formGroup]="myForm" (ngSubmit)="saveData()" novalidate>
  <ion-list> 
    <ion-item>
      <ion-label stacked>Name:</ion-label>
      <ion-input formControlName="name" type="text" placeholder="name"></ion-input>
    </ion-item>
    <ion-item *ngIf="myForm.get('name').errors && myForm.get('name').dirty">
      <p color="danger" ion-text *ngIf="myForm.get('name').hasError('required')">Field is required</p>
    </ion-item>
    <ion-item>
      <ion-label stacked>Company:</ion-label>
      <ion-input formControlName="company" type="text" placeholder="company"></ion-input>
    </ion-item>
    <ion-item *ngIf="myForm.get('company').errors && myForm.get('company').dirty">
      <p color="danger" ion-text *ngIf="myForm.get('company').hasError('required')">Field is required</p>
      <p color="danger" ion-text *ngIf="myForm.get('company').hasError('minlength')">Min of 5 characters</p>
      <p color="danger" ion-text *ngIf="myForm.get('company').hasError('maxlength')">Max of 10 characters</p>
    </ion-item>
    <ion-item>
      <ion-label stacked>E-mail:</ion-label>
      <ion-input formControlName="email" type="text" placeholder="email"></ion-input>
    </ion-item>
    <ion-item *ngIf="myForm.get('email').errors && myForm.get('email').dirty">
      <p color="danger" ion-text *ngIf="myForm.get('email').hasError('required')">Field is required</p>
      <p color="danger" ion-text *ngIf="myForm.get('email').hasError('email')">It is not an email</p>
    </ion-item>
    <ion-item>
      <ion-label stacked>Age:</ion-label>
      <ion-input formControlName="age" type="number" placeholder="age"></ion-input>
    </ion-item>
    <ion-item *ngIf="myForm.get('age').errors && myForm.get('age').dirty">
      <p color="danger" ion-text *ngIf="myForm.get('age').hasError('required')">Field is required</p>
      <p color="danger" ion-text *ngIf="myForm.get('age').hasError('invalid')">You are not adult</p>
    </ion-item>
    <ion-item>
      <ion-label stacked>Url:</ion-label>
      <ion-input formControlName="url" type="text" placeholder="url"></ion-input>
    </ion-item>
    <ion-item *ngIf="myForm.get('url').errors && myForm.get('url').dirty">
      <p color="danger" ion-text *ngIf="myForm.get('url').hasError('required')">Field is required</p>
      <p color="danger" ion-text *ngIf="myForm.get('url').hasError('pattern')">It is not an url</p>
    </ion-item>
    <ion-item>
      <ion-label stacked>Password:</ion-label>
      <ion-input formControlName="password" type="password" placeholder="password"></ion-input>
    </ion-item>
    <ion-item *ngIf="myForm.get('password').errors && myForm.get('password').dirty">
      <p color="danger" ion-text *ngIf="myForm.get('password').hasError('required')">Field is required</p>
      <p color="danger" ion-text *ngIf="myForm.get('password').hasError('pattern')">It is not a strong password</p>
    </ion-item>
  </ion-list>
  <div padding>
    <button ion-button block type="submit" [disabled]="myForm.invalid">Guardar</button>
  </div>
</form>
```

En el template agregamos cada uno de los mensajes correspondientes a cada error, finalmente si todo el formulario es válido se habilita el botón `Guardar` y podremos obtener la información con el método `saveData` que está en `home.ts` 