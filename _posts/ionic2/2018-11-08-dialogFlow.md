---
layout: post
title: "Reconocimiento facial en app Ionic"
keywords: "ionic reconocimiento facial, camara, facial"
date: 2018--28
tags: [ionic, google, dialogflow, chatbot]
categories: ionic2
author: jheisonAlzate
repo: "https://github.com/developerjaag/ngClassroomDialogFlow"
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-13-ionic-fonts%2FCambiarFuentes.png?alt=media&token=588d8fd9-4213-40b7-9ea8-481140536846"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-app-scripts'
    number: '3.2.0'
  - title: 'cordova-cli'
    number: '8.0.0'
  - title: 'ionic-cli'
    number: '4.1.2'
---

> Los agentes de inteligencia artificial van tomando cada vez más fuerza al momento de generar una interacción con los clientes de nuestro producto o servicio.
Gracias a la carrera de nubes entre empresas como Google, Microsoft, Ibm y Amazon; Podemos tener herramientas muy poderosas y de una fácil y rápida implementación. Hoy haremos una implementación de DialogFlow de Google, con la que crearemos un agente virtual o chatbot. y para darle más portabilidad, lo consumiremos desde Ionic.

Anteriormente se realizo un hangouts con nuestro compañero Rodrigo Torrico, lo pueden ver siguiendo este enlace: https://www.youtube.com/watch?v=5dU2Mk2S6gg

Bien comencemos...
<!--summary-->

{% include general/net-promoter-score.html %}

# Paso 1: Crear el agente en DialogFlow
Para esto se requiere tener una cuenta en Google, este proceso es tan simple que no pasaremos a explicarlo.
Luego nos dirigimos a la consola de DialogFlow, entrando en la siguiente dirección: https://console.dialogflow.com

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D1.png"></amp-img>

Aquí ingresamos con nuestra cuenta de Google y observamos un ambiente como el siguiente, y presionamos el botón para crear "CREATE AGENT":

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D2.png"></amp-img>

Posteriormente identificamos el agente con un nombre, elegimos la zona (de preferencia la más cercana a nuestra ubicación) y elegimos el idioma por defecto; Más adelante explicaré algo con el idioma para comunicarnos con nuestro agente en los idiomas configurados desde la app.

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D3.png"></amp-img>

En este tutorial, solo me centraré en el manejo de los intents de DialogFlow que son las respuestas a un escrito dado por el usuario, para las demás opciones te invito a explorar la plataforma y jugar con ella, como con las Entities (que le dan una guía al agente del tema de conversación, ejm: Si se habla de sistemas operativos, identificar un linux de un windows...)

# Paso 2: Crear Intents
Bien, ahora que ya tenemos nuestro agente listo, es hora de enseñarle que responder ante un texto que envié un usuario.
Por defecto tenemos dos Intents creados, (uno para saludar, y otro para responder en caso de que el agente no comprenda lo que el usuario escribió).

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D4.png"></amp-img>

Para crear nuestro nuevo intent, presionamos el botón resaltado en el resaltado rojo (CREATE INTENT).

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D4.png"></amp-img>

Le damos un nombre identificativo a nuestro nuevo intent (primer resaltado rojo), y procedemos a ingresar las freses que puede digitar el usuario que disparan las respuestas de este intent (segundo resaltado rojo). Notemos además que solo tenemos el idioma ingles adicionado (resaltado azul).

A este intent le he dado como nombre "Capital", por que la idea es que podamos saber la capital del país de un agente con el que nos comuniquemos. Así que si estamos en el idioma Español el agente indique que la capital del país es Bógota y si el idioma es ingles, nos comunique que la capital es washington. Con esto podemos ilustrar el manejo de idiomas.

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D6.png"></amp-img>

He adicionado algunas de las posibles frases que podría enviar un usuario a nuestro agente. Cabe mencionar que no necesariamente el usuario debe enviar la frase tal cual para que nuestro agente la entienda, solo basta con la intensión de la frase; De allí el nombre de "Intents".

Ahora debemos ingresar lo que queremos que el agente responda ante tal intent:

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D7.png"></amp-img>

Yo he definido las siguientes respuestas, las cuales se mostraran de manera aleatoria ante este intent:

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D8.png"></amp-img>

De nuevo, te invito a que explores las diferentes opciones o herramientas que tenemos en los intents; Como por ejemplo los parametros, donde podemos brindar al usuario una experiencia más personalizada...quizás llamandolo por su nombre...


Ahora podemos probar nuestro intent, con el panel que se encuentra a la derecha:


<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D9.png"></amp-img>

Nótese que la frase que se le envió al agente no esta exactamente estructurada como previamente la definimos, sin embargo el agente reacciona correctamente ante la intensión, sorprendente ¿no?.

# Paso 3: Idiomas en los Intents

Ahora pasaremos a que nuestro agente comprenda cuando nos comuniquemos en otro idioma, para este caso español

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D10.png"></amp-img>

Cuando se adiciona el nuevo idioma, podemos cambiarnos a el , presionando su abreviatura en la parte izquierda (el que se encuentra en color azul indica en cual estamos trabajando).

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D11.png"></amp-img>

Ahora si nos dirigimos a los intents, y seleccionamos el que previamente creamos (Capital), podemos observar que nuevamente esta sin posibles ingresos de usuario y sin respuestas por parte del agente.

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D12.png"></amp-img>

Así que repetiremos el mismo proceso que realizamos con el otro previamente en el intent, pero ahora para el idioma configurado. en este caso Español; y esta vez le diremos al agente que responda ante este intent, que la capital es Bógota.

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D13.png"></amp-img>

Y por supuesto, probamos que todo este como lo queremos

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D14.png"></amp-img>

Antes de pasar a la app de Ionic, debemos obtener la llave que permite la comunicación con nuestros agentes:

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D15.png"></amp-img>


# Paso 4: El app de Ionic

Bien, luego de pasar un buen rato con DialogFlow, vamos a comunicarnos con los agentes que ya tenemos desde un app móvil.

Generamos un nuevo proyecto de Ionic:
```
$ionic start ngClassRoomDialogFlow blank --cordova
```
Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd ngClassRoomDialogFlow
```

# Paso 4.1: instalar el complemento para establecer la comunicación.

ejecutamos en la terminal:

```
npm i api-ai-javascript
```

Una vez que termine de ejecutarse, abrimos el proyecto con un editor de código; Y nos dirigimos a la carpeta node_modules/api-ai-javascript y creamos un archivo llamado index.js.map el cual dejaremos vacio.

luego modificamos el archivo node_modules/api-ai-javascript/ts/ApiAiConstants.ts
cambiando la constante 

```
...
export const DEFAULT_CLIENT_LANG: AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES.EN;
```

por una variable

```
...
export var DEFAULT_CLIENT_LANG: AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES.EN;
```

Esto lo hicimos por que al momento de enviar la petición (post) a DialogFlow, el complemento envía como parametro de idioma ("lang") por defecto 'en', y ahora con este cambio podemos modificar el idioma. como por ejemplo enviando 'es'.

# Paso 4.2: archivo home.ts

El siguiente es el código del archivo home.ts con comentarios explicativos:

```
import { Component, ViewChild } from '@angular/core';//importamos ViewChild para referenciar el contenido de la vista
import { NavController, Content } from 'ionic-angular';//importanmos content para controlar el deslizamiento al pie de página

import { ApiAiClient, ApiAiConstants } from 'api-ai-javascript';
ApiAiConstants.DEFAULT_CLIENT_LANG = ApiAiConstants.AVAILABLE_LANGUAGES.ES; //Aqui controlamos el lenguaje para comunicarnos con el agente

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  client;
  accessToken = 'ff633c85e0154e08beb53af7eaf19893'; //esta es la llave que nos otroga DialogFlow

  user_textToSend: string; //contiene lo qu el usuario escriba
  messageHistory: any[] = []; //aqui se almacenan los objetos con los mensajes que se pintan en pantalla

  constructor(public navCtrl: NavController) {

    //establecemos la comunicación
    this.client = new ApiAiClient({
      accessToken: this.accessToken
    });

  }//fin constructor

  //enviar mensaje al agente
  sendMessage() {

    //creamos un objeto con un nuevo mensaje
    let newMessage_user = {
      fromUser: true, //en true es un mensaje del usuario
      text: this.user_textToSend
    }
    this.user_textToSend = ''; //limpiamos la caja de texto en la que el usuario escribe

    this.messageHistory.push(newMessage_user); //adiciona lo que el usuario escriba al array de mensajes para que se muestre en pantalla
    this.scrollToBottom();//se desliza hacia el pie de página para que se vea el ultimo mensaje

    //hace envia la petición post al agente
    this.client.textRequest(newMessage_user.text).then(response => {

        let newMessage_bot = {
          fromUser: false, //en false es un mensaje del agente
          text: response.result.fulfillment.speech //contiene el texto que devuelve el agente
        }

        this.messageHistory.push(newMessage_bot); //adiciona lo que el agente escriba al array de mensajes para que se muestre en pantalla
        this.scrollToBottom();//se desliza hacia el pie de página para que se vea el ultimo mensaje

      }).catch(error => {
        //algo salió mal
        this.user_textToSend = ''; //limpiamos la caja de texto en la que el usuario escribe
        console.log(error); //se imprime en consola el error
      });

  }//fin sendMessage

  //desliza la vista al pie de página
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }//fin scrollToBottom

}//fin clase

```

# Paso 4.3: archivo home.html

Archivo home.html que contiene la vista y donde el usuario interactúa y se pintan los mensajes

```
<ion-header>
  <ion-navbar>
    <ion-title>
      ng-ClassRoom
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding >

  <ion-list no-lines> <!-- lista para mostrar los mensajes -->

    <div *ngFor="let message of messageHistory"> <!--Se recorren los mensajes-->

      <ion-item class="messageBot" *ngIf="!message.fromUser"> <!-- Si el mensaje es del usuario -->
        <ion-avatar item-start>
          <img src="https://api.adorable.io/avatars/285/nico.png">
        </ion-avatar>
        <h3>{{message.text}}</h3><!--Texto del mensaje-->
      </ion-item>

      <ion-item class="messageUser" *ngIf="message.fromUser"><!--Si el mensaje es del agente-->
        <h3 text-right>{{message.text}}</h3><!--Texto del mensaje-->
        <ion-avatar item-end>
          <img src="https://api.adorable.io/avatars/285/carlos.png">
        </ion-avatar>
      </ion-item>

    </div>

  </ion-list>



</ion-content>

<ion-footer class="footer_page"><!--En footer para que la caja de texto del usuario siempre este visible-->


  <ion-grid>
    <ion-row>
      <ion-col col-10>

          <ion-item><!--Caja de texto para que el usuario escriba-->
            <ion-input type="text" placeholder="Escribe algo..." [(ngModel)]="user_textToSend"
              maxlength="200"></ion-input>
          </ion-item>

      </ion-col>
      <ion-col col-2>

        <button ion-button clear icon-only (click)="sendMessage()"><!--Detona la acción de enviar el mensaje al agente-->
          <ion-icon name="send"></ion-icon>
        </button>

      </ion-col>
    </ion-row>
  </ion-grid>

</ion-footer>

```

# Paso 4.3: archivo home.scss
Estilos para la vista

```
page-home {

    .messageUser{

        border-radius: 80px 0px 80px 80px !important;
        -moz-border-radius: 80px 0px 80px 80px !important;
        -webkit-border-radius: 80px 0px 80px 80px !important;
        border: 0px solid #000000;
        background-color: #7EDBED;
        margin-top: 1rem;
        margin-bottom: 1rem;

    }


    .messageBot{

        border-radius: 0px 80px 80px 80px !important;
        -moz-border-radius: 0px 80px 80px 80px !important;
        -webkit-border-radius: 0px 80px 80px 80px !important;
        border: 0px solid #000000;
        background-color: #FFFFFF;
        margin-top: 1rem;
        margin-bottom: 1rem;

    }


    .footer_page{

        background-color: white;

    }


}

```

# Paso 4.4: Probando

Así se ve nuestro proyecto en acción:

Español:

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D16.png"></amp-img>

Inglés

<amp-img width="470" height="368" layout="responsive" src="../../images/posts/ionic2/2018-11-08-dialogflow/D17.png"></amp-img>



Con esto tendriamos implementado todo un sistema de agentes virtuales. Ahora para correr nuestro proyecto y realizar la prueba, digitamos el comando en la consola:

```
ionic serve
```

Te invito a que juegues con este proyecto, como por ejemplo cambiando el idioma dinámicamente, mostrando cuando el agente esta escribiendo, validar que el usuario no envié un texto vació, mejores estilos, etc...