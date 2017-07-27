---
layout: post
title: "Utilizando Directivas para añadir validaciones en formularios con ionic"
date: 2017-07-27
tags: [class, ionic2]
categories: ionic2
author: daniel_lsanchez
repo: https://github.com/ion-book/demo116
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2Fcover.png?alt=media&token=233d6bb2-1581-4ef1-8047-c0d14095230f"
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
> En este post veremos 2 ejemplos de implementación de validaciones, el primero con una validación implícita en la clase Validators, y el segundo con una validación propia de acuerdo a un comportamiento deseado, controlado por medio de una directiva.

<amp-img width="1024" height="820" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2Fcover.png?alt=media&token=233d6bb2-1581-4ef1-8047-c0d14095230f"></amp-img> 

{% include general/net-promoter-score.html %} 

En mi experiencia trabajando con el framework de ionic, me ha tocado implementar formularios y obvia mente validaciones a los campos de estos. Cuando se trata de realizar validaciones con las reglas de validación implementadas en el framework con la importación de la clase “Validators”, es relativa mente sencillo, pero cuando nos toca implementar una regla de validación personalizada en un campo es donde nos topamos con el problema. 

En este post veremos 2 ejemplos de implementación de validaciones, el primero con una validación implícita en la clase Validators, y el segundo con una validación propia de acuerdo a un comportamiento deseado, controlado por medio de una directiva.

## Pero, ¿que son las directivas?

De grosso modo, las Directivas son  [Según la documentación oficial](https://angular.io/guide/attribute-directives) marcas en los elementos del árbol DOM en los nodos del HTML, que notifican al compilador de angular que debe de proporcionar ciertos comportamientos a dichos elementos o transformarlos según lo deseado.

Podemos dar por entendido que las directivas son la técnica que nos va a permitir crear nuestros propios componentes visuales e implementarlos en nuestro código HTML para que este cumpla con un comportamiento o función deseada.

Realizaremos una aplicación la en la cual vamos a implementar un formulario para capturar el nombre la dirección, correo electrónico, tipo de contacto (teléfono o celular) y el numero de una persona. Las validaciones que implementaremos serán:

* Todos los campos deben de ser requeridos.
* El campo teléfono va a necesitar una validación especial. Si el usuario selecciona en el campo “tipo de contacto” la opción teléfono, el número de caracteres permitido va a ser de 7, pero si es celular el número de caracteres permitido va a ser 10. 
* El campo nombre solo puede tener máximo 30 caracteres.
* El campo dirección solo puede contener como mínimo 5 caracteres y un máximo de 100 caracteres. 
* Se debe de validar que el correo sea en el formato correcto.

Ahora si podemos empezar…

He creado un proyecto ionic llamado “DatosUsuario” en el cual realizare el formulario solicitado.
Dentro de la carpeta “src” creare 2 carpetas mas para darle un orden a los archivos llamadas “directives” y “validators” . Dentro de la carpeta “directive” creare un archivo llamado “longitud-numero-telefonico-tipo.directive.ts” y dentro de la carpeta “validators” creare un archivo llamado “longitud-numero-telefonico-tipo.validator.ts”. Asi seria la estructura de nuestro proyecto hasta ahora.

<amp-img width="982" height="552" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2FCaptura%20de%20pantalla%202017-07-27%20a%20la(s)%203.22.51%20p.m..png?alt=media&token=d806ac55-f8e5-4acd-bd84-db655356e814"></amp-img> 

Primero que todo vamos a crear nuestro formulario en la plantilla home creada por defecto al iniciar un proyecto con ionic.

El archivo “home.ts”  quedaría así:

```ts
{% raw %}
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
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
  /**
   * @param datosUsuario Parametro tipo array que almacena la informacion del formulario por el ngModel 
   */
  datosUsuario:any[] = [];
  /**
   * @param _tipoContacto Este parametro se encarga de pasar el tipo de validacion para la directiva que controla
   * la longitud de digitos del numero telefonico de acuerdo a si es telefono o celular.
   */
  _tipoContacto:string ;

  constructor(public navCtrl: NavController, private fb: FormBuilder, private alertCtrl:AlertController) {
    /**
     * @description Asignamos a la propiedad "formularioUsuario" los campos que se van a controlar de la vista
     */
    this.formularioUsuario = this.fb.group({
      nombre:[this.datosUsuario['nombre'],[Validators.required,Validators.maxLength(30)]],
      direccion:[this.datosUsuario['direccion'],[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      correo:[this.datosUsuario['correo'],[Validators.required,Validators.email]],
      tipo_contacto:[this.datosUsuario['tipo_contacto'],[Validators.required]],
      numero_contacto:[this.datosUsuario['numero_contacto'],[Validators.required]]
    })
    this.datosUsuario['tipo_contacto'] = 'Telefono';
  }

  /**
   * evento que se ejecuta al enviar la informacion, este solo cumple la funcion de mostrar un mensaje de informacion,
   * resetea el formulario y sus validaciones y limpia el parametro datosUsuario para el nuevo ingreso de informacion.
   */
  saveData(){
    console.log(this.datosUsuario)
    let alerta = this.alertCtrl.create({
      title:"Datos enviados!",
      subTitle:"Información",
      message:"Los registros fueron enviados correctamente",
      buttons:['Ok']
    });
    alerta.present()
    this.formularioUsuario.reset()
    this.datosUsuario = [];
    this.datosUsuario['tipo_contacto'] = 'Telefono';
  }

  /**
   * Evento que se ejecuta al realizar la seleccion del tipo de contacto, esta carga la propiedad _tipoContacto para
   * realizar la validacion adecuada de acuerdo al tipo seleccionado
   */
  tipoContactoChange(){
    this._tipoContacto = this.datosUsuario['tipo_contacto'];
  }

}
{% endraw %}
```

Y el archivo “home.html” quedaría así:

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
          <ion-input formControlName="nombre" type="text" placeholder="Nombre" name="nombre" [(ngModel)]="datosUsuario.nombre" ></ion-input>
        </ion-item>
        <ion-item *ngIf="formularioUsuario.get('nombre').errors && formularioUsuario.get('nombre').dirty">
          <p *ngIf="formularioUsuario.get('nombre').hasError('required')" style="white-space: normal; color:red">El nombre es requerido.</p>
          <p *ngIf="formularioUsuario.get('nombre').hasError('maxlength')" style="white-space: normal; color:red">El maximo de caracteres permitidos es 30.</p>
        </ion-item>
        <ion-item>
          <ion-icon name="pin" item-left></ion-icon>
          <ion-label stacked>Dirección:</ion-label>
          <ion-input formControlName="direccion" type="text" placeholder="Dirección" name="direccion" [(ngModel)]="datosUsuario.direccion"></ion-input>
        </ion-item>
        <ion-item *ngIf="formularioUsuario.get('direccion').errors && formularioUsuario.get('direccion').dirty">
          <p *ngIf="formularioUsuario.get('direccion').hasError('required')" style="white-space: normal; color:red">La dirección es requerida.</p>
          <p *ngIf="formularioUsuario.get('direccion').hasError('minlength')" style="white-space: normal; color:red">El minimi de caracteres permitidos es 5.</p>
          <p *ngIf="formularioUsuario.get('direccion').hasError('maxlength')" style="white-space: normal; color:red">El maximo de caracteres permitidos es 100.</p>
        </ion-item>
        <ion-item>
          <ion-icon name="at" item-left></ion-icon>
          <ion-label stacked>Correo Electronico:</ion-label>
          <ion-input formControlName="correo" type="email" placeholder="correo" name="correo" [(ngModel)]="datosUsuario.correo" ></ion-input>
        </ion-item>
        <ion-item *ngIf="formularioUsuario.get('correo').errors && formularioUsuario.get('correo').dirty">
          <p *ngIf="formularioUsuario.get('correo').hasError('required')" style="white-space: normal; color:red">El correo es requerido.</p>
          <p *ngIf="formularioUsuario.get('correo').hasError('email')" style="white-space: normal; color:red">El correo electronico indicado no es valido.</p>
        </ion-item>
        <ion-row radio-group formControlName="tipo_contacto" name="tipo_contacto" [(ngModel)]="datosUsuario.tipo_contacto" (ionChange)="tipoContactoChange()">
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
          <p *ngIf="formularioUsuario.get('tipo_contacto').hasError('required')" style="white-space: normal; color:red">El tipo de contacto es requerido.</p>
        </ion-item>
        <ion-item>
          <ion-icon name="call" item-left></ion-icon>
          <ion-label stacked>Numero de contacto:</ion-label>
          <ion-input formControlName="numero_contacto" type="text" placeholder="Numero de contacto"name="numero_contacto" [(ngModel)]="datosUsuario.numero_contacto" tamano-telefono-tipo [tipoContacto]='_tipoContacto' ></ion-input>
        </ion-item>
        <ion-item *ngIf="formularioUsuario.get('numero_contacto').errors && formularioUsuario.get('numero_contacto').dirty">
          <p *ngIf="formularioUsuario.get('numero_contacto').hasError('required')" style="white-space: normal; color:red">El numero es requerido.</p>
          <p *ngIf="formularioUsuario.get('numero_contacto').hasError('tamano-telefono-tipo')" style="white-space: normal; color:red">{{ this.formularioUsuario.get('numero_contacto').errors['mensaje'] }}</p>
        </ion-item>
        <ion-item>
          <button ion-button block type="submit" [disabled]="!formularioUsuario.valid">Enviar</button>
        </ion-item>
      </ion-list> 
    </form>
  </div>
</ion-content>
{% endraw %}
```

Hasta este punto tenemos el formulario y el controlador de formulario creado con la mayoría de validaciones solicitadas:

* Todos los campos deben de ser requeridos.
* El campo nombre solo puede tener máximo 30 caracteres.
* El campo dirección solo puede contener como mínimo 5 caracteres y un máximo de 100 caracteres. 
* Se debe de validar que el correo sea en el formato correcto.

Pero como realizamos esta validación:

* El campo teléfono va a necesitar una validación especial. Si el usuario selecciona en el campo “tipo de contacto” la opción teléfono, el número de caracteres permitido va a ser de 7, pero si es celular el número de caracteres permitido va a ser 10. 

Para solucionar este tipo de validación que depende del campo “tipo_contacto” lo que vamos a realizar es usar una directiva de angular. Con esta podremos controlar la validación deseada.

Nos dirigimos a realizar el código en nuestro archivo “longitud-numero-telefonico-tipo.directive”.

```ts
{% raw %}
import { Directive, Input, forwardRef, OnChanges, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

import { esValidoTamano } from '../validators/longitud-numero-telefonico-tipo.validator';

const TAMANO_TELEFONO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => LongitudNumeroTelefonoTipo),
  multi: true
};

@Directive({
    selector:'[tamano-telefono-tipo]',
    providers:[TAMANO_TELEFONO_VALIDATOR]
})
export class LongitudNumeroTelefonoTipo implements Validator, OnInit, OnChanges{

    @Input() tipoContacto:string;
    private validatorFn: Function;
    private onChange: Function;

    constructor() {console.log({directiva:'entro directiva'}) }

    ngOnInit(){
        this.tipoContacto = this.tipoContacto === null || this.tipoContacto === undefined ? 
        'Telefono' : this.tipoContacto;
    }

    ngOnChanges(changes: SimpleChanges){
        let cambioTipo: SimpleChange = changes['tipoContacto'];
        this.createValidatorFunction(cambioTipo.currentValue);
        if (this.onChange) this.onChange();
    }

    validate(control:AbstractControl): {[key: string]: any} {
        console.log({funcion:'validate',parametros:{control:control},descripcion:"Funcion validate que implementa la clase Validator"})
        return this.validatorFn ? this.validatorFn(control) : null;
    }

    registerOnValidatorChange(fn: () => void) { this.onChange = fn; }

    private createValidatorFunction (tipoContacto: any) {
        this.validatorFn = esValidoTamano(this.tipoContacto);
    }
}
{% endraw %}
```

Nota: Sin entrar mucho en detalle, lo que estamos haciendo es añadiendo al provider NG_VALIDATORS a nuestra directiva LongitudNumeroTelefonoTipo. Para ello, es necesario utilizar la propiedad multi: true, indicando que queremos utilizar varias dependencias para el token NG_VALIDATORS y la propiedad useExisting que hace referencia a nuestra directiva.

¿Y para qué es la función forwardRef? 

La función forwardRef nos permite hacer referencia a instancias de clases que aún no se hayan creado en el sistema de inyección de dependencias de Angular. Es decir, en este caso, el decorador Directive está haciendo referencia a una instancia de LongitudNumeroTelefonoTipo que aún no se ha creado.

Y nuestro archivo longitud-numero-telefonico-tipo.validator” quedaría asi:

```ts
{% raw %}
import { AbstractControl, ValidatorFn } from "@angular/forms";

function validarTamano(c: string,d:any) {
    console.log({funcion:'validar tamaño',parametros:{ c:c,d:d,tamano:c.length}})
    let retorno:any[] = [];
    retorno['mensaje'] = '';
    retorno['valor'] = -1;
    if(c != undefined && d != undefined){
        let tamano = c.length;
        if(d == 'Telefono'){
            if(tamano >= 8){
                retorno['mensaje'] = 'El numero de telefono no puede contener mas de 7 caracteres';
                retorno['valor'] = null;
                return retorno
            }
        }else{
            if(tamano >= 11){
                retorno['mensaje'] = 'El numero de celular no puede contener mas de 10 caracteres';
                retorno['valor'] = null;
                return retorno
            }
        }

    }
    return retorno
}

export function esValidoTamano (tipoContacto: string): ValidatorFn {
  return function (control: AbstractControl): {[key: string]: any} {
    if (control.value != null || typeof control.value === 'string' && control.value.length !== 0) {
        let tipo = tipoContacto;
        let retorno = validarTamano(control.value,tipo);
        if(retorno['valor'] == -1){
            return null;
        }else{
            return { 'tamano-telefono-tipo': true,'mensaje':retorno['mensaje'] } 
        }
    } else {
        return null;
    }
  }
}

        <ion-item>
          <button ion-button block type="submit" [disabled]="!formularioUsuario.valid">Enviar</button>
        </ion-item>
      </ion-list> 
    </form>
  </div>
</ion-content>
{% endraw %}
```

Ahora vamos a declarar la directiva para poder usarla en nuestro proyecto en el archivo “app.module.ts” este archivo quedaría así:

```ts
{% raw %}
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LongitudNumeroTelefonoTipo } from '../directives/longitud-numero-telefonico-tipo.directive';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LongitudNumeroTelefonoTipo
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
{% endraw %}
```

y ahora agregamos la directiva a nuestro formulario, el cual hemos agregado con antelacion en el ```home.ts```y el ```home.html```

Por medio de la propiedad “_tipoContacto” le pasamos a la directiva el parámetro para indicarle si la validación va a ser para un teléfono o un celular. En el evento “tipoContactoChange”  lo que estamos haciendo es actualizando la propiedad con cada selección en el campo “tipo_contacto”. 

Ahora todo esto debe de funcionar como lo han pedido, con sus validaciones correspondientes. Realicemos la prueba.

<amp-img width="350" height="622" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F1.png?alt=media&token=3a029a9f-29dc-47ee-96fb-30a7bc909f9d"></amp-img> 

<amp-img width="350" height="622" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F2.png?alt=media&token=f79be944-834c-444e-b274-753c65dcbc4a"></amp-img> 

<amp-img width="350" height="622" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F3.png?alt=media&token=1c8ad83a-f6bf-4613-bacf-b06835c013b5"></amp-img> 

<amp-img width="350" height="622" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F4.png?alt=media&token=ed3a4fda-83f7-4613-95aa-482daec78eba"></amp-img> 

<amp-img width="350" height="622" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F5.png?alt=media&token=34fd3809-0ec5-4f3f-9f8b-5ec2824d7154"></amp-img> 

<amp-img width="350" height="622" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F6.png?alt=media&token=e72aa965-2d0a-4735-927f-d7a4c0d65e01"></amp-img> 

<amp-img width="350" height="622" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-07-27-directivas%2F7.png?alt=media&token=b8970148-8b63-4385-b116-fa46dd8f4090"></amp-img> 