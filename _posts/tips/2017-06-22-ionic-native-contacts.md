---
layout: post
title: "Implementando el plugin de Contacts con Ionic Native"
keywords: "ionic native"
date: 2017-06-22
repo: https://github.com/ion-book/demo115
tags: [tips]
categories: tips
author: daniel_lsanchez
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-06-22-ionic-native-contacts%2Fionic-native-header.jpg?alt=media&token=0d138d1f-626c-451e-ba0d-39cdba7f44fe"
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

> Ionic Native [Contacts](https://ionicframework.com/docs/native/contacts/), te permite acceder y administrar la lista de contactos de tu dispositivo. 

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-06-22-ionic-native-contacts%2Fionic-native-header.jpg?alt=media&token=0d138d1f-626c-451e-ba0d-39cdba7f44fe"></amp-img>

{% include general/net-promoter-score.html %} 

Hola a chic@s el dia de hoy les vengo presentando este nuevo post el cual nos guiara al momento de implementar el plugin Contacts de ionic native.

En esta oportunidad vamos a listar los contactos de nuestro dispositivo y a presentarlos en una lista, pero también tendremos un botón en el header de nuestra página el cual servirá para crear un nuevo contacto en nuestro dispositivo. Espero este post sea de gran utilidad para ustedes. Ahora solo nos queda comenzar :)



## 1. CREAMOS EL PROYECTO IONIC

Creamos un proyecto nuevo de ionic, en mi caso lo llame “ionic-contactos“.

````
$ ionic start ionic-contactos blank --v2
````

## 2. INGRESAMOS A LA CARPETA CREADA DEL PROYECTO IONIC

Ingresamos a la carpeta que se genero al ejecutar el comando “ionic start ionic-contactos blank –v2” la cual contiene todos los fuentes de nuestra aplicación. Para ingresar a la carpeta usamos el comando “cd ionic-contactos”.

````
$ cd ionic-contactos
````

## 3. AGREGAMOS LA PLATAFORMA EN LA QUE VAMOS A DESARROLLAR

En este punto agregamos la plataforma para la cual vamos a desarrollar nuestra app, en este caso usaremos la plataforma de android. Para agregarla digitamos el comando

````
$ ionic platform add android
````

## 4. AGREGAMOS EL PLUGIN “CONTACTS” DE IONIC NATIVE

Agregamos el plugin con el que vamos a trabajar el cual se encargara de administrar las funcionalidades que podemos hacer con los contactos. Ingresamos los comandos

````
$ ionic plugin add cordova-plugin-contacts
````

y

````
$ npm install –save @ionic-native/contacts
````

## 5. IMPORTAR EL PLUGIN A NUESTRO PROYECTO

Una vez listo los pasos anteriores nos dirigimos al archivo ```app.module.ts``` en la ruta (En mi caso)```ionic-contactos/src/app/app.module.ts```  y agregamos el plugin y lo referenciamos como un “providers” de nuestra aplicación.

Ahora estamos listos para usar el plugin en nuestra aplicación...

## 6. AGREGAMOS UNA PAGINA NUEVA

Esta página se encargara de crear un contacto en nuestro dispositivo. Usamos el comando 

````
ionic g page crearContacto
````

{% include blog/subscribe.html %}

## 7. IMPORTAR MODULO DE LA PAGINA NUEVA

Nos dirigimos al archivo ```module.ts``` y hacemos referencia al modulo de la pagina nueva agregada.

## 8. AGREGAMOS EL CODIGO A NUESTRA PAGINA “home.ts”

Abrimos el archivo ```home.ts``` que se encuentra en la ruta ```ionic-contactos/src/app/pages/home/home.ts``` y en este vamos a hacer el código para recuperar los contactos del dispositivo en nuestra aplicación.

**cargarListaContactos()**: La función se encargara de recuperar el listado de contactos de nuestro dispositivo. En mi caso agregué un fragmento de código el cual lo que hará será recorrer el listado de contactos recuperado del dispositivo y cargaremos una variable “datosMostrar” solo con los contactos que tienen los campos displayName,phoneNumbers y photos. 

**modalNuevoContacto()**: La función se encargara de abrir una página tipo modal la cual mostrara un formulario para crear un nuevo contacto y agregarlo a la lista.

```ts
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
/**
 * PLUGINS IONIC NATIVE
 */
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

/**
 * PAGINAS
 */
import { CrearContacto } from '../crear-contacto/crear-contacto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /**
   * listaContactos => se encarga de almacenar el listado de contactos recuperados del dispositivo
   * y pinta la lista que se ve en la vista.
   */
  listaContactos:any[]=[];
  avatar:string="./assets/icon/avatar.png";
  constructor(public navCtrl: NavController, private contacts:Contacts, private modalCtrl:ModalController) {
    this.cargarListaContactos();
  }
  /**
   * Funcion encargada de cargar la lista de contactos del celular, en mi caso filtrare y mostrare solo
   * los objetos que tienen valor en los campos dislplayName, photos, phoneNumbers. Con estos cargare
   * la lista a mostrar.
   */
  cargarListaContactos(){
    this.contacts.find(["*"])
    .then(res => {
      console.log({funcion:'CargarListaContactos',res:res})
      let datosMostar:any[]=[];
      res.map((item) =>{
        if(item.displayName != null && item.photos != null && item.phoneNumbers != null){
          datosMostar.push({displayName:item.displayName,photos:[{value:this.avatar}],phoneNumbers:item.phoneNumbers})
        }        
      })
      console.log({funcion:'CargarListaContactos',datosMostar:datosMostar})
      this.listaContactos = datosMostar;
    },error => {
      console.log({error:error})
    })
  }
  /**
   * Abre una ventana modal para ingresar la informacion del contacto a crear
   */
  modalNuevoContacto(){
    let modal = this.modalCtrl.create(CrearContacto);
    modal.onDidDismiss(data => {
      console.log({dataOnDidDismiss:data});
      if(data.estado){
        console.log(data)
        this.listaContactos.push({displayName:data.contacto.displayName,photos:[{value:this.avatar}],phoneNumbers:data.contacto.phoneNumbers});
      }
    });
    modal.present();
  }
}
```

## 9. DISEÑAMOS LA VISTA DE LA LISTA DE CONTACTOS

Ahora agregamos el código en el archivo ```home.html``` para la vista de nuestra aplicación la cual se encargara de listar los contactos recuperados del dispositivo. En esta pagina agregaremos un botón en el header el cual se encargara de llamar la función modalNuevoContacto() al hacerle click, en el content  de la pagina implementaremos un *ngFor para cargar la lista de contactos.

```html
{% raw %}
<ion-header>
  <ion-navbar>
    <ion-title>
      Contacts Ionic Native
    </ion-title>
    <ion-buttons end>
      <button ion-button icon-only (click)="modalNuevoContacto()">
        <ion-icon name="add-circle"></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-list>
    <ion-item *ngFor="let contacto of listaContactos">
      <ion-avatar item-start>
        <img [src]="contacto.photos[0].value ">
      </ion-avatar>
      <h2>{{contacto.displayName }}</h2>
      <p>Dispositivo: {{contacto.phoneNumbers[0].type}} - Numero: {{contacto.phoneNumbers[0].value}}</p>
    </ion-item>
  </ion-list>
</ion-content>
{% endraw %}
```


Con estos pasos hemos terminado el código necesario para listar los contactos. Ahora realizaremos el código para la pagina “crear-contacto”.

## 10. PAGINA CREAR CONTACTO

Primero que todo agregamos el plugin y lo referenciamos como un “providers” de nuestra aplicación en el archivo “crear-contacto.module.ts”.

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearContacto } from './crear-contacto';
import { Contacts } from '@ionic-native/contacts';
@NgModule({
  declarations: [
    CrearContacto,
  ],
  imports: [
    IonicPageModule.forChild(CrearContacto),
  ],
  exports: [
    CrearContacto
  ],
  providers:[Contacts]
})
export class CrearContactoModule {}
```


## 11. INGRESAMOS CODIGO PARA CREAR UN NUEVO CONTACTO

Ahora agreguemos el código necesario en la pagina “crear-contacto.ts” la cual se encargara de crear un contacto nuevo. La vista de esta página será un simple formulario para ingresar los datos deseados.

**crearContacto()**: Esta función se encargara de implementar la lógica para crear un contacto, por medio de ngModel cargamos la información en la propiedad datos y esta la usamos para crear nuestro contacto nuevo.

**dismiss()**: Esta función se encargara de retornar a la pagina “home” en la que visualizaremos la lista con el contacto agregado una vez se crea.

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * PLUGINS IONIC NATIVE
 */
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

/**
 * Generated class for the CrearContacto page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-crear-contacto',
  templateUrl: 'crear-contacto.html',
})
export class CrearContacto {
  datos:any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts:Contacts,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearContacto');
  }

  /**
   * Funsion para agregar un nuevo contacto a la lista de contactos del telefono.
   */
  crearContacto(){
    let contact: Contact = this.contacts.create();
    let avatar ="./assets/icon/avatar.png";
    contact.displayName = this.datos['nombre'];
    contact.phoneNumbers = [new ContactField(this.datos['tipoNumero'], this.datos['numero'])];
    contact.photos = [new ContactField('url',avatar,false)]
    contact.save().then(
      () => { 
        console.log('Contact Guardado!', contact)
        this.dismiss({estado:true,contacto:contact});
      },
      (error: any) => {
        console.error('Error al guardar el contacto.', error)
        this.dismiss({estado:false});
      }
    );
  }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
```

## 12. AGREGAR EL CODIGO PARA CREAR LA VISTA DE LA PAGINA CREAR CONTACTO

Ahora ingresamos el código a nuestra página “crear-contacto.html” la cual pintara un formulario para crear un contacto. Esta página se abrirá en forma de un modal.

```html
{% raw %}
<ion-header>
  <ion-navbar>
    <ion-title>crearContacto</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-list>
    <ion-item>
      <ion-label floating>Nombre</ion-label>
      <ion-input type="text"  name="nombre" [(ngModel)]="datos.nombre"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label floating>Tipo numero</ion-label>
      <ion-select [(ngModel)]="datos.tipoNumero" name="tipoNumero">
        <ion-option value="Movil">Movil</ion-option>
        <ion-option value="Fijo">Fijo</ion-option>
        <ion-option value="Fax">Fax</ion-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-label floating>Numero telefonico</ion-label>
      <ion-input type="number" [(ngModel)]="datos.numero" name="numero"></ion-input>
    </ion-item>
  </ion-list>
  <div padding>
    <button ion-button color="primary" block (click)="crearContacto()">Crear contacto</button>
    <button ion-button color="danger" block (click)="dismiss(false)">Cancelar</button>
  </div>
</ion-content>
{% endraw %}
```

Esto es todo, ahora solo falta compilar nuestra aplicación para generar nuestro apk y realizar nuestra prueba.

<amp-img width="540" height="960" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-06-22-ionic-native-contacts%2FScreenshot_2017-06-13-13-51-13.png?alt=media&token=f6b36179-5730-43ee-8494-9845894759ec"></amp-img>

<amp-img width="540" height="960" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-06-22-ionic-native-contacts%2FScreenshot_2017-06-13-13-12-16_resized.png?alt=media&token=1a5922d8-baff-40c4-8bc0-4ff96492eec4"></amp-img>

<amp-img width="540" height="960" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-06-22-ionic-native-contacts%2FScreenshot_2017-06-13-13-12-06_resized.png?alt=media&token=015dc176-eb83-4c48-911d-831f25104a79"></amp-img>

<amp-img width="540" height="960" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-06-22-ionic-native-contacts%2FScreenshot_2017-06-13-13-11-42_resized.png?alt=media&token=37137f31-19db-4a68-825a-966776a47abe"></amp-img>