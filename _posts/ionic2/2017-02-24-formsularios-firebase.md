---
layout: post
title: "Aprende a validar formularios con Ionic y Firebase"
keywords: "ionic,firebase"
date: 2017-02-24
tags: [push, ionic2, native]
categories: ionic2
author: javebratt
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-02-24-formsularios-firebase%2F5mTwi1e.jpg?alt=media&token=506ec3e9-8174-4f3f-8311-edddc5a3abbd"
---

> Estas seguro del tipo de dato que estas enviando desde tu App en Ionic es la misma que se esta almacenando en la base de datos de Firebase? Resulta que para mi no lo era.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-02-24-formsularios-firebase%2F5mTwi1e.jpg?alt=media&token=506ec3e9-8174-4f3f-8311-edddc5a3abbd" alt="Firebase"></amp-img>

Post en [**Ingles**](https://javebratt.com/validate-forms-ionic-firebase/) 

Estaba revisando una app de ingresos que realice para mi esposa, ella organiza eventos, y yo estaba convencido que toda la programación estaba en su punto, al momento me di cuenta que el precio de los tiquetes
se estaba almacenando en **Firebase** como *String* en lugar de *Numeros* =/

Eso me llevo a escavar un poco mas en la validación de formularios en Ionic 2, y no solo eso sino también en como validar el lado del Servidor con Firebase, para asegurar que las cosas estuvierán almacenadas como pense.

Para el final de este post tu aprenderas a validar tus datos con Ionic y Firebase.

<amp-img width="400" height="206" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-02-24-formsularios-firebase%2Fgiphy.gif?alt=media&token=d490afb8-b578-456e-aef7-0b12962b2bb7" alt="Pic1"></amp-img>

Haras esto en tres pasos.

* Paso 1. Haras la validación en el Formulario de Ionic.
* Paso 2. Haras una validación extra por seguridad con los tipos de datos en **Typescript**. 
* Paso 3. Validaras los datos desde el lado del servidor con Firebase.

La primera cosa que debes hacer es crear tu App e Inicializar  Firebase, eso esta fuera del alcance de este Post (Principalmente por que estoy cansado de copiar/pegar) asi que si no sabes como hacerlo puedes [leer sobre esto primero.] (https://javebratt.com/ionic2rc0-firebase-js-sdk/)

Despues que tu App este lista, quiero que crees un proveedor para manejar los datos (Yeah, estamos usando proveedores aunque sea una sola función)

Abre tu terminal y crea algo como esto.

````
$ ionic generate provider FirebaseData
````

Ahora ve dentro de ````app.module.ts```` e importalo.

````
import { FirebaseData } from '../providers/firebase-data';
````

entonces, Inicializa esto en el ````NgModule````:

````
providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  FirebaseData
]
````

Ahora todo esta listo, asi que vamos con la Validación del Formulario.

## Paso 1. Crea y Valida el Formulario en Ionic.

Vamos a hacer algo simple aqui, estamos creando un formulario que tomara 3 entradas, el nombre de una canción, el nombre de un artista, 
y la edad de usuario para asegurarnos que el usuario esta sobre los 18.

Ir a ````home.ts```` e importar los formularios de Angular.

````
import { FormBuilder, Validators } from '@angular/forms';
````

Nosotros usaremos ````FormBuilder```` para crear el formulario, asi que vamos e inyecta esto en el controlador.

````
constructor(public navCtrl: NavController, 
  public formBuilder: FormBuilder) {...}
````

Ahora vamos a crear un nuevo formulario y declarar este antes del constructor.

````
public addSongForm: any;
constructor(public navCtrl: NavController, 
  public formBuilder: FormBuilder) {...}
````

Ahora vamos a inicializar el formulario y declarar las entradas esto va a ser.

````
this.addSongForm = formBuilder.group({
  songName: ['', Validators.compose([Validators.required, 
    Validators.maxLength(45)])],
  artistName: ['', Validators.compose([Validators.required, 
    Validators.minLength(2)])],
  userAge: ['', Validators.compose([Validators.required])]
});
````

vamos con un poco de teoria sobre lo que acabamos de ver.

Los formularios en Angular vienen con varias cosas bonitas que podemos utilizar, una de estas es el modulo de validación, ese modulo viene con 
validadores pre configurados como ````required````, ````minLength```` y ````maxLength````

Sin hacer nada extra de trabajo, el modulo de validación va a corroborar que la entrada de ````songName```` no vaya a tener mas de 45 caracteres, o que el nombre del artista necesita al menos dos caracteres, o que todo los campos son requeridos.

La cosa realmente cool es que lo podemos llevar a otro nivel y **hacer nuestros propios validadores**

Por ejemplo, Yo quiero validar los usuarios que están sobre 18 años, asi que vamos a ir requiriendo a los usuarios llenar la edad y validar el campo para que este sobre los 18.

Yo se que existén probablemente 10 mejores formas para hacer esto, pero recuerda que ese no es el punto. 😛

Vamos a crear validadores que tomen la edad y se aseguren que el numero sea mayor o igual de 18.

Para eso yo quiero crear un folder llamado ````validators```` dentro de tu folder ````src````, y crea un archivo llamado ````age.ts````

Abre ````age.ts```` y vamos a crear nuestro validador.

La primera cosa que tu haras es ese archivo es importar el modulo que nosotros necesitaremos:

````
import { FormControl } from '@angular/forms';
````

Entonces crearemos y exportaremos la clase, que voy a llamar ````AgeValidator````:

````
export class AgeValidator {...}
````

y dentro de la clase, crearemos un metodo llamado ````isValid````

````
static isValid(control: FormControl): any {...}
````

Ahora dentro de ese metodo nosotros verificaremos la edad:

````
if (control.value >= 18){ return null; }
return {"notOldEnough": true};
````

Si el valor esta evaluado es superior que o igual que 18 este va a retornar  ````null````, pero si no, este retornara ese objeto.

Ahora que el validador esta listo, vamos adelante e importaremos este en ````home.ts````:

````
import { AgeValidator } from '../../validators/age';
````

y agrega este a la inicialización del campo ````userAge```` en el constructor:

````
this.addSongForm = formBuilder.group({
  userAge: ['', Validators.compose([Validators.required, AgeValidator.isValid])]
});
````

## El formulario vista.

Ahora es tiempo de ir a ````home.html```` y empezar a crear el formulario, primero borra todo lo que esta dentro de las etiquetas ````<ion-content></ion-content>````.

y crea un formulario aquí.

````
<form [formGroup]="addSongForm" (submit)="addSong()" novalidate></form>
````

El formulario va a tener algunas cosas:

* ````[formGroup]="addSongForm"```` es el nombre (e inicialización en el archivo ts) que le estamos dando al formulario.
* ````(submit)="addSong()"```` le esta diciendo a Ionic que cuando este formulario es ingresado este necesita correr la función ````addSong()````
* ````novalidate```` le dice al navegador que apague la notificación por defecto, de esa manera nosotros manejaremos la validación con los modulos del formulario.

Despues de que el formulario es creado es tiempo para agregar nuestro primera entrada, primero crearemos la entrada:

````
<ion-item>
  <ion-label stacked>Song Name</ion-label>
  <ion-input formControlName="songName" type="text" 
    placeholder="What's the song's name?">
  </ion-input>
</ion-item>
````

entonces,  nosotros mostraremos un mensaje de error si el formulario no es valido, asi que es correcto despues que la entrada agrega un parrafo con el mensaje de error.

````
<ion-item class="error-message" *ngIf="!addSongForm.controls.songName.valid 
  && addSongForm.controls.songName.dirty">
  <p>
    The song's name is required to be under 45 characters.
  </p>
</ion-item>
````

Hemos configurado un mensaje de error para que permanezca escondido, y se muestre solo si:

* El campo del formulario no es valido y
* El campo del formulario es ````dirty```` (Esto significa que el usuario ya agrego valores a este)

Vamos también a agregar una clase CSS para mostrar una pequeña linea roja si el campo no es valido (ya sabes, nada dice que un formulario tiene un error como una lineas rojas) 

````
  <ion-input [class.invalid]="!addSongForm.controls.songName.valid 
    &&  addSongForm.controls.songName.dirty">
  </ion-input>
````

Eso justo ahi agrega una clase CSS llamada ```ìnvalid```` si el formulario no es valido y tiene un valor adentro.

por cierto, esta es la linea de CSS.

`````
.invalid{
  border-bottom: 1px solid #FF6153;
}
`````

Al final la entrada entera deberia verse asi.

````
<ion-item>
  <ion-label stacked>Song Name</ion-label>
  <ion-input formControlName="songName" type="text" 
    placeholder="What's the song's name?"
    [class.invalid]="!addSongForm.controls.songName.valid && addSongForm.controls.songName.dirty">
  </ion-input>
</ion-item>
<ion-item class="error-message" 
  *ngIf="!addSongForm.controls.songName.valid && addSongForm.controls.songName.dirty">
  <p>
    The song's name is required to be under 45 characters.
  </p>
</ion-item>
````

Ahora repite el proceso dos veces para el nombre del artista.

````
<ion-item>
  <ion-label stacked>Artist Name</ion-label>
  <ion-input formControlName="artistName" type="text" 
    placeholder="What's the artist's name?"
    [class.invalid]="!addSongForm.controls.artistName.valid && addSongForm.controls.artistName.dirty">
  </ion-input>
</ion-item>
<ion-item class="error-message" 
  *ngIf="!addSongForm.controls.artistName.valid && addSongForm.controls.artistName.dirty">
  <p>
    The artist's name has to be at least 2 characters long.
  </p>
</ion-item>
````

y para la edad del usuario.

````
<ion-item>
  <ion-label stacked>How old are you?</ion-label>
  <ion-input formControlName="userAge" type="number" 
    placeholder="I'm 30 years old."
    [class.invalid]="!addSongForm.controls.userAge.valid && addSongForm.controls.userAge.dirty">
  </ion-input>
</ion-item>
<ion-item class="error-message" 
  *ngIf="!addSongForm.controls.userAge.valid && addSongForm.controls.userAge.dirty">
  <p>
    You must be 18 or older to use this app.
  </p>
</ion-item>
````

y finalmente agregaras un boton de enviar.

````
<button ion-button block type="submit">
  Add Song
</button>
````

Vamos a adelantarnos y desactivar el botón hasta que el formulario sea valido.

````
<button ion-button block type="submit" [disabled]="!addSongForm.valid">
  Add Song
</button>
````

<amp-img width="350" height="538" layout="fixed" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-02-24-formsularios-firebase%2Finvalid-squashed.png?alt=media&token=07bc18d5-ec67-4496-a8bb-d92bde21f92a" alt="Pic2"></amp-img>

y ahi tu tienes una **validación de formulario** trabajando en una Ionic 2 App.

y para muchas Apps, Asi es, esa es toda la validación que ellos ofrecén y eso esta Bien, algo asi.

Pero ahora lo vamos a elevar un poco más de nivel, vamos a trabajar en tener nuestros datos de formulario validado en multiples formas y evitar sorpresas extrañas.

Asi que agregaremos 2 capas extras de seguridad.

## Paso 2. Agregar Declaración de Tipos de Datos en TypeScript.

Para la declaración de datos, tu comenzaras trabajando en tu proveedor ````FirebaseData````, para mandar los datos a Firebase.

Avancemos y en el archivo ````firebase-data.ts```` importaremos Firebase.

````
import firebase from 'firebase';
````

y entonces solo crearemos la función para empujar una nueva canción a la base de datos:

````
saveSong(songName, artistName, userAge) {
  return firebase.database().ref('songs')
    .push({ songName, artistName, userAge });
}
````

eso es una función normal  ````push()```` para agregar objetos a una lista en Firebase, una cosa buena que aprendi de [ES6 for Everyone](https://javebratt.com/es6) es que si las propiedades del objeto y los valores
tienen el mismo nombre tu puedes solo tipear estos muchas veces, asi:

````
.push({
  songName: songName,
  artistName: artistName,
  userAge: userAge
});
````

Se convierte en:

````
.push({ songName, artistName, userAge });
````

y ahora, agregamos la declaración de tipos, tan facil como:

````
saveSong(songName: string, artistName: string, userAge: number) {...}
````

Eso le dice a TypeScript que las canciones nombradas tienen que ser ````String````, El nombre del Artista tiene que ser ````String````, y la edad de los usuarios debe ser un numero.

Ahora en tu archivo ````home.ts```` solo debes crear la función ````addSong()```` para enviar datos al proveedor, esto deberia ser algo como:

````
addSong(){
  if (!this.addSongForm.valid){
    console.log("Nice try!");
  } else {
    this.firebaseData.saveSong(this.addSongForm.value.songName, this.addSongForm.value.artistName, 
      parseFloat(this.addSongForm.value.userAge)).then( () => {
        this.addSongForm.reset();
      });
  }

}
````
Si el formulario no es valido, no hagas nada, y si lo es, entonces, enviaremos los datos a el proveedor, estoy reseteando todos los valores despues de guardados.

Lo ves? Acabamos de agregar una capa extra de integridad de los datos con este pequeño trabajo.

y Ahora es tiempo de hacer una validación en el lado del Servidor y agregar seguridad EXTRA.

## Paso 3. Agregando validación del lado del Servidor.

Por ejemplo, si alguno ha manejado el enviar "23" en lugar de 23 tu estaras enviando un String en lugar de un numero, y Firebase solo lo almacenara.

Entonces, si necesitas una operación con la edad empezaras a tener errores.

Firebase provee un lenguaje de seguridad muy detallado, donde puedes elegir quien puede ver que.

Por ejemplo, tu puedes seleccionar tus canciones para ser seleccionadas solo por el usuario quien las guarda, o que solo administradores puedan almacenar nuevas canciones.

Pero lo que muchas personas no saben, es que las reglas de seguridad también te dejan escribir reglas de validación, donde tu puedas especificar que tipos de datos tu estas yendo a guardar (Puedes ser ULTRA especifico ahí).

Para editar esto, ve a reglas de seguridad desde tu consola de Firebase.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-02-24-formsularios-firebase%2FScreenshot-from-2017-01-18-19-30-51-squashed.png?alt=media&token=fec245bd-424e-4cb7-ab3e-d4f0491f0f0d
" alt="Firebase"></amp-img>

Entonces, nosotros agregaremos las reglas, para las simples reglas de leer/escribir que tienes ahi, agregaras una regla de validación al nodo cancion:

````
"songs": {
  "$songId": {
    ".validate": ""
  }
}
````
Dentro de la propiedad ````validate```` agregaremos nuestras reglas.

Firebase tiene unas pocas reglas listas para usar, como ````data````, ````newData````. y ````now````.

Estaremos usando ````newData```` desde que esta es la regla que se refiere  a nuevos datos siendo guardado en nuestra base de datos.

Si quieres una lista de todas las variables y sus explicaciones puedes chequear [acá](https://firebase.google.com/docs/database/security/securing-data).

La primera cosa que nosotros necesitaremos para estar seguros es que cada cada nueva cancion realmente tiene las 3 propiedades, el nombre de la canción, el artista, y la edad del usuario.

Para eso usaremos la propiedad ````.hasChildren()````

````
"songs": {
  "$songId": {
    ".validate": "newData.hasChildren(['songName', 'artistName', 'userAge'])"
  }
}
````
En esa linea, nosotros le estamos diciendo a Firebase que cada nueva canción que nosotros guardaremos necesita tener 3 hijos, un hijo llamado ````songName````, otro llamado ````artistName```` y el tercero
llamado ````userAge````.

Vamos a empezar validando el nombre de la canción primero, recuerda que nosotros configuramos dos reglas 1) este debe ser un String 2) este debe ser menor de 45 caracteres.

Asi que miraremos la primera, asegurandonos que sea un String, para eso agregaremos otra regla para validar la propiedad:


````
newData.child('songName').isString()
````

Esto asegurara que cuando una nueva cancion es agregada, su propiedad ````songName```` necesitara ser un String.

Puede tambien agregar las otras reglas y decirle que chequee su longitud y este seguro que esta por debajo de 45 caracteres.

````
newData.child('songName').val().length <= 45
````

Ahora haremos lo mismo con el ````artistName````

````
newData.child('artistName').isString()
````

y

````
newData.child('songName').val().length > 1
````

y por ultimo para validar el ````userAge````

````
newData.child('userAge').isNumber() && newData.child('userAge').val() > 17
````

Al final las reglas se veran asi:

````
{
  "rules": {
    ".read": true,
    ".write": true,

    "songs": {
      "$songId": {
        ".validate": "newData.hasChildren(['songName', 'artistName', 'userAge']) && newData.child('songName').isString() && newData.child('songName').val().length <= 45 && newData.child('artistName').isString() && newData.child('songName').val().length > 1 && newData.child('userAge').isNumber() && newData.child('userAge').val() > 17"
      }
    }
  }
}
````

De esta manera te aseguraras que siempre guarde la información correcta si por cualquier cosa tu envias tu información como un String en lugar de un numero en la edad del usuario, entonces el metodo ````.push()````
te enviara un error **Permission Denied**

Hay lo tienes un flujo completo de validación, iniciando validando tus entradas en tu app y moviendote hasta la validación en Firebase.

