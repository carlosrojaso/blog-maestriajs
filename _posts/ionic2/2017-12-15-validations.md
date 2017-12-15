---
layout: post
title: "Validaciones dinámicas en formularios"
date: 2017-12-15
tags: [class, ionic2]
categories: ionic2
author: daniel_lsanchez
repo: https://github.com/ion-book/demo116
laucher: 'https://ion-book.github.io/demo116/'
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2Fcover.jpg?alt=media&token=7e9dd6b7-79ed-43b6-97e5-b51061d62091"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-native'
    number: '4.5.0'
  - title: 'ionic-app-scripts'
    number: '3.1.5'
  - title: 'cordova-cli'
    number: '7.1.0'
  - title: 'ionic-cli'
    number: '3.19.0'
---

> En este post veremos como hacer una validación dinámica de acuerdo escuchar un cambio en específico.

<amp-img width="1024" height="820" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2Fcover.jpg?alt=media&token=7e9dd6b7-79ed-43b6-97e5-b51061d62091"></amp-img> 

{% include general/net-promoter-score.html %} 

En mi experiencia trabajando con el framework de ionic, me ha tocado implementar formularios y obviamente validaciones a los campos de estos. Cuando se trata de realizar validaciones con las reglas de validación implementadas en el framework con la importación de la clase `Validators`, es relativamente sencillo, pero cuando nos toca implementar una regla de validación personalizada en un campo, es donde nos topamos con problemas. 

En este post veremos como hacer una validación dinámica de acuerdo escuchar un cambio en específico.

Realizaremos una aplicación en la cual vamos a implementar un formulario para capturar el nombre, la dirección, correo electrónico, tipo de contacto (teléfono o celular) y el número de una persona. Las validaciones que implementaremos serán:

* Todos los campos deben de ser requeridos.
* El campo teléfono va a necesitar una validación especial. Si el usuario selecciona en el campo *tipo de contacto* la opción teléfono, el número de caracteres permitido va a ser de 7, pero si es de tipo de contacto es celular el número de caracteres permitido va a ser 10. 
* El campo nombre solo puede tener máximo 30 caracteres.
* El campo dirección sólo puede contener como mínimo 5 caracteres y un máximo de 100 caracteres. 
* Se debe de validar que el correo sea en el formato correcto.

<a href="https://ion-book.github.io/demo116/" target="_blank" class="btn btn-round btn-success">Ver demo</a>

Ahora si podemos vamos a empezar...

He creado un proyecto ionic llamado `demo116` en el cual realizare el formulario solicitado.

```
ionic start demo116 blank --cordova
```

Primero que todo vamos a crear nuestro formulario en la plantilla `home` creada por defecto al iniciar un proyecto con ionic.

El archivo `src/pages/home/home.ts`  quedaría así:

```ts
import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  /**
   * @param formularioUsuario Rastrea el valor y el estado de validez de un grupo de instancias de FormControl.
   * Un FormGroup agrega los valores de cada FormControl hijo en un objeto, con cada nombre de control como la clave.
   * Calcula su estatus reduciendo los estatus de sus hijos. Por ejemplo, si uno de los controles de un grupo no es
   * válido, todo el grupo se convierte en no válido.
   * FormGroup es uno de los tres bloques de construcción fundamentales utilizados para definir formularios en Angular,
   * junto con FormControl y FormArray.
   */
  formularioUsuario:FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  /**
   * evento que se ejecuta al enviar la informacion, este solo cumple la funcion de mostrar un mensaje de informacion,
   * resetea el formulario y sus validaciones y limpia el parametro datosUsuario para el nuevo ingreso de informacion.
   */
  saveData(){
    console.log(this.formularioUsuario.value);
    const alert = this.alertCtrl.create({
      title: "Datos enviados!",
      subTitle: "Información",
      message: "Los registros fueron enviados correctamente",
      buttons: ['Ok']
    });
    alert.present()
    this.buildForm();
  }


  buildForm() {
    /**
     * @description Asignamos a la propiedad "formularioUsuario" los campos que se van a controlar de la vista
     */
    this.formularioUsuario = this.fb.group({
      nombre:['',[Validators.required,Validators.maxLength(30)]],
      direccion:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      correo:['',[Validators.required,Validators.email]],
      tipo_contacto:['Telefono',[Validators.required]],
      numero_contacto:['',[Validators.required]]
    });
  }

}
```

Y el archivo `src/pages/home/home.html` quedaría así:

```html
{% raw %}
<ion-header>
  <ion-navbar>
    <ion-title>
      Validaciones formulario
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <div><h1>Registro de datos</h1></div>
  <div>
    <form [formGroup]="formularioUsuario" (ngSubmit)="saveData()" novalidate>
      <ion-list>
        <ion-item>
          <ion-icon name="person" item-left></ion-icon>
          <ion-label stacked>Nombre:</ion-label>
          <ion-input
            formControlName="nombre"
            type="text"
            placeholder="Nombre"
            name="nombre">
          </ion-input>
        </ion-item>
        <ion-item *ngIf="formularioUsuario.get('nombre').errors && formularioUsuario.get('nombre').dirty">
          <p *ngIf="formularioUsuario.get('nombre').hasError('required')" class="error">
            El nombre es requerido.
          </p>
          <p *ngIf="formularioUsuario.get('nombre').hasError('maxlength')" class="error">
            El maximo de caracteres permitidos es 30.
          </p>
        </ion-item>
        <ion-item>
          <ion-icon name="pin" item-left></ion-icon>
          <ion-label stacked>Dirección:</ion-label>
          <ion-input
            formControlName="direccion"
            type="text"
            placeholder="Dirección"
            name="direccion">
          </ion-input>
        </ion-item>
        <ion-item *ngIf="formularioUsuario.get('direccion').errors && formularioUsuario.get('direccion').dirty">
          <p *ngIf="formularioUsuario.get('direccion').hasError('required')" class="error">
            La dirección es requerida.
          </p>
          <p *ngIf="formularioUsuario.get('direccion').hasError('minlength')" class="error">
            El minimi de caracteres permitidos es 5.
          </p>
          <p *ngIf="formularioUsuario.get('direccion').hasError('maxlength')" class="error">
            El maximo de caracteres permitidos es 100.
          </p>
        </ion-item>
        <ion-item>
          <ion-icon name="at" item-left></ion-icon>
          <ion-label stacked>Correo Electronico:</ion-label>
          <ion-input
            formControlName="correo"
            type="email"
            placeholder="correo"
            name="correo">
          </ion-input>
        </ion-item>
        <ion-item *ngIf="formularioUsuario.get('correo').errors && formularioUsuario.get('correo').dirty">
          <p *ngIf="formularioUsuario.get('correo').hasError('required')" class="error">
            El correo es requerido.
          </p>
          <p *ngIf="formularioUsuario.get('correo').hasError('email')" class="error">
            El correo electronico indicado no es valido.
          </p>
        </ion-item>
        <ion-row radio-group formControlName="tipo_contacto">
          <ion-col col-6>
            <ion-item>
              <ion-icon name="call" item-left></ion-icon>
              <ion-label>Telefono</ion-label>
              <ion-radio value="Telefono"></ion-radio>
            </ion-item>
          </ion-col>
          <ion-col col-6>
            <ion-item>
              <ion-icon name="phone-portrait" item-left></ion-icon>
              <ion-label>Celular</ion-label>
              <ion-radio value="Celular"></ion-radio>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-item *ngIf="formularioUsuario.get('tipo_contacto').errors && formularioUsuario.get('tipo_contacto').dirty">
          <p *ngIf="formularioUsuario.get('tipo_contacto').hasError('required')" class="error">
            El tipo de contacto es requerido.
          </p>
        </ion-item>
        <ion-item>
          <ion-icon name="call" item-left></ion-icon>
          <ion-label stacked>Numero de contacto:</ion-label>
          <ion-input
            formControlName="numero_contacto"
            type="text"
            placeholder="Numero de contacto"
            name="numero_contacto">
          </ion-input>
        </ion-item>
        <ion-item *ngIf="formularioUsuario.get('numero_contacto').errors && formularioUsuario.get('numero_contacto').dirty">
          <p *ngIf="formularioUsuario.get('numero_contacto').hasError('required')" class="error">
            El numero es requerido.
          </p>
        </ion-item>
      </ion-list>
      <div class="padding">
        <button ion-button block type="submit" [disabled]="!formularioUsuario.valid">Enviar</button>
      </div>
    </form>
  </div>
</ion-content>

{% endraw %}
```

Hasta este punto tenemos el formulario y el controlador de formulario creado con la mayoría de validaciones solicitadas:

* Todos los campos deben de ser requeridos.
* El campo nombre solo puede tener máximo 30 caracteres.
* El campo dirección sólo puede contener como mínimo 5 caracteres y un máximo de 100 caracteres. 
* Se debe de validar que el correo sea en el formato correcto.

¿Pero como realizamos una validación dinámica de acuerdo al tipo de contacto?

Recordemos que el campo teléfono va a necesitar una validación especial. Si el usuario selecciona en el campo “tipo de contacto” la opción teléfono, el número de caracteres permitido va a ser de 7, pero si es celular el número de caracteres permitido va a ser 10. 

Para solucionar este tipo de validación que depende del campo `tipo_contacto` lo que vamos a realizar escuchar el cambio de este campo y de acuerdo a esto modificar las validacion del campo `numero_contacto`. Con esta podremos controlar la validación deseada.

Gracias a que usamos formularios reactivos podemos escuchar un cambio en alguno de los cambios y de acuerdo a eso modificar la validación dinámicamente, de la siguiente manera:


```ts
this.formularioUsuario.get('tipo_contacto')
.valueChanges
.subscribe(value => {
  console.log(value);
  if (value === 'Telefono') {
    const validators = [Validators.required, Validators.maxLength(7)];
    this.formularioUsuario.get('numero_contacto').setValidators(validators);
  }else {
    const validators = [Validators.required, Validators.maxLength(10)];
    this.formularioUsuario.get('numero_contacto').setValidators(validators);
  }
  this.formularioUsuario.updateValueAndValidity();
});
```

Lo anterior lo agregamos el método `buildForm`, asi:

```ts
buildForm() {
  /**
    * @description Asignamos a la propiedad "formularioUsuario" los campos que se van a controlar de la vista
    */
  this.formularioUsuario = this.fb.group({
    nombre:['',[Validators.required,Validators.maxLength(30)]],
    direccion:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
    correo:['',[Validators.required,Validators.email]],
    tipo_contacto:['Telefono',[Validators.required]],
    numero_contacto:['',[Validators.required, Validators.Validators(7)]]
  });

  this.formularioUsuario.get('tipo_contacto')
  .valueChanges
  .subscribe(value => {
    console.log(value);
    if (value === 'Telefono') {
      const validators = [Validators.required, Validators.Validators(7)];
      this.formularioUsuario.get('numero_contacto').setValidators(validators);
    }else {
      const validators = [Validators.required, Validators.maxLength(10)];
      this.formularioUsuario.get('numero_contacto').setValidators(validators);
    }
    this.formularioUsuario.updateValueAndValidity();
  });
}
```

Ahora bien también podemos crear nuestras propias validaciones para así mostrar un mensaje de acuerdo al error, lo haremos creado nuestra propia clase de validaciones, así:

`src/validators/validators.ts:`

```ts
import { FormControl } from "@angular/forms";

export class MyValidators{

  static checkPhoneSize(control: FormControl) {
    const value: string = control.value;
    if (value && value.length >= 7) {
      return {
        'phoneSize': true
      }
    }
    return null;
  }

  static checkCellPhoneSize(control: FormControl) {
    const value: string = control.value;
    if (value && value.length >= 10) {
      return {
        'cellPhoneSize': true
      }
    }
    return null;
  }

}
```

Finalmente podemos implementar nuestras propias validaciones de la siguiente manera:

```ts
buildForm() {
  /**
    * @description Asignamos a la propiedad "formularioUsuario" los campos que se van a controlar de la vista
    */
  this.formularioUsuario = this.fb.group({
    nombre:['',[Validators.required,Validators.maxLength(30)]],
    direccion:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
    correo:['',[Validators.required,Validators.email]],
    tipo_contacto:['Telefono',[Validators.required]],
    numero_contacto:['',[Validators.required, MyValidators.checkPhoneSize]]
  });

  this.formularioUsuario.get('tipo_contacto')
  .valueChanges
  .subscribe(value => {
    console.log(value);
    if (value === 'Telefono') {
      const validators = [Validators.required, MyValidators.checkPhoneSize];
      this.formularioUsuario.get('numero_contacto').setValidators(validators);
    }else {
      const validators = [Validators.required, MyValidators.checkCellPhoneSize];
      this.formularioUsuario.get('numero_contacto').setValidators(validators);
    }
    this.formularioUsuario.updateValueAndValidity();
  });
}
```

Recuerden importar sus propias validaciones en la página, así:

```ts
import { MyValidators } from './../../validators/validators';
...
```

Ahora en template podemos mostrar un mensaje de acuerdo al error que tenga ese campo, así:

```html
<ion-item *ngIf="formularioUsuario.get('numero_contacto').errors && formularioUsuario.get('numero_contacto').dirty">
  <p *ngIf="formularioUsuario.get('numero_contacto').hasError('required')" class="error">
    El numero es requerido.
  </p>
  <p *ngIf="formularioUsuario.get('numero_contacto').hasError('phoneSize')" class="error">
    El numero de telefono no puede contener mas de 7 caracteres
  </p>
  <p *ngIf="formularioUsuario.get('numero_contacto').hasError('cellPhoneSize')" class="error">
    El numero de celular no puede contener mas de 10 caracteres
  </p>
</ion-item>
```

Ahora todo esto debe de funcionar como lo han pedido, con sus validaciones correspondientes. Realicemos la prueba...


<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="350" height="622" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F1.png?alt=media&token=3a029a9f-29dc-47ee-96fb-30a7bc909f9d"></amp-img> 
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="350" height="622" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F2.png?alt=media&token=f79be944-834c-444e-b274-753c65dcbc4a"></amp-img> 
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="350" height="622" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F3.png?alt=media&token=1c8ad83a-f6bf-4613-bacf-b06835c013b5"></amp-img> 
  </div>
</div> 

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="350" height="622" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F4.png?alt=media&token=ed3a4fda-83f7-4613-95aa-482daec78eba"></amp-img> 
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="350" height="622" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F5.png?alt=media&token=34fd3809-0ec5-4f3f-9f8b-5ec2824d7154"></amp-img> 
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="350" height="622" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F6.png?alt=media&token=e72aa965-2d0a-4735-927f-d7a4c0d65e01"></amp-img> 
  </div>
</div>  

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="350" height="622" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F7.png?alt=media&token=b8970148-8b63-4385-b116-fa46dd8f4090"></amp-img>
  </div>
</div> 
