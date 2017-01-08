---
layout: post
title: "Ionic 2 VS Nativescript"
keywords: "ionic 2, nativescript, ionic 2 vs nativescript, ionic 2 o nativescript"
date: 2017-01-08
tags: [tips, ionic2, news]
categories: tips
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionicvsnative%2FFOLLOW.jpg?alt=media"
---

> Vamos a analizar estos dos geniales frameworks y indagar sobre las ventajas y desventajas de cada uno.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionicvsnative%2FFOLLOW.jpg?alt=media" alt="Validaciones en Formularios"></amp-img>

Hace poco tuve la oportunidad de participar en un hangout, discutiendo de estos dos frameworks y las ventajas y desventajas de cada uno. Les dejo el video:

<amp-youtube width="560" 
            height="315"
            layout="responsive"
            data-videoid="UA8CVdhRvlk"></amp-youtube>

Empecemos!!

## Cross Platform

Los dos nos prometen que con una sola base de código puedes desarrollar aplicaciones para Android y IOS, que son los mercados que más nos interesan a la hora de desarrollar apps móviles, solo que en caso de Ionic es mucho más abierto, como lo dice uno de sus lemas **“One code base. Running everywhere.”** veamos:

<div class="table-responsive">
  <table class="table table-condensed">
    <thead> 
      <tr>
        <th>Plataformas</th> 
        <th>Nativescript</th> 
        <th>Ionic 2</th> 
      </tr> 
    </thead>
    <tbody>
      <tr>
        <td>Android </td>
        <td><div class="icon icon-android-done"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>IOS</td>
        <td><div class="icon icon-android-done"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>PWA</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>WEB</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
				<td>Desptok (with electron)</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>Windows Phone</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
    </tbody>
  </table>
</div>

Ionic 2 al tecnología web está más abierta puede estar en muchas más plataformas y ser versátil. 

## Performance

Ahora en este punto Nativescript tiene un mayor performance que las apps en Ionic 2, ya que la Interfaz no se renderiza en un WebView sino nativamente en el sistema operativo, pero la diferencia es muy poca, entre la una y otra. En el caso de Ionic 2 se puede habilitar el proceso de **AOT (Compilación de alto nivel)** que harán que tus apps reduzcan el tiempo de de carga.

Ahora si este punto es sumamente importante para ti, hablando de milisegundos de diferencia tu opcion podria ser nativescript o react native o incluso si quieres que tu app tenga un alto performance hazlo nativo en android y ios y no busques soluciones híbridas.

## Comunidad

Bueno en este caso Ionic tiene muchisima mas comunidad, pero esto se debe a que ionic ya lleva bastante tiempo en mercado para tener una comunidad activa y fuerte, en cambio NativeScript lleva mucho menos tiempo, aún así comunidad es buena y tiene a grandes exponentes dentro de la comunidad.

## Curva de aprendizaje

Debemos suponer que ya se tiene bases en HTML, Css y Javascript teniendo eso en cuenta, en el caso de Ionic 2 debes aprender Angular, Typescript y Scss lo cual no es complejo y de por sí es fácil entender cómo trabaja. Con nativescript la curva es más alta debes aprender todo lo de ionic pero agregale algo de XML y algunas etiquetas de css de más.

## Angular

Este es un gran punto ya que los dos soportar a Angular, bueno en realidad en Ionic 2 no es una opción por defecto debes trabajar con Angular, en el caso de Nativescript es opcional pero es la mejor forma de trabajarlo en conjunto con Angular.

## El Sdk (componentes)

En componentes Ionic tiene muchos más componentes disponibles para usar que Nativescript, es decir nos dan un libreria mucho más amplia para usar en comparación y por otro lado nativescript tiene una parte de componentes pagos, es decir hay una suite que nos ofrecen con componentes más avanzados pero son de pago.

## Nativo

Ok en el acceso de recursos nativos, las apps ionic se renderizan en un webview y por ser debe usar plugins para conectarse a los recursos nativo como la cámara, geolocalización, acelerómetro y lo mismo si queremos consumir alguna librería de algún tercero como el SDK de Firebase o el SDK de Fabric, por ejemplo tenemos que buscar si estan los plugins habilitados para estas librerías.

En el caso de Nativescript no hay problema puedes usar cualquier recurso nativo y sdk externo sin necesidad de plugins.

## Soporte

Las dos tecnologías tiene geniales empresas detrás, en el caso de Ionic es driftyco (ionic.io) que es un empresa que solo se enfoca en todo el ecosistema de ionic lo cual es un muy buena mezcla ya que solo se enfocan en ionic y su ecosistema, por parte de nativescript esta telerik es una empresa que ya lleva mucho más tiempo en el mercado de apps pero no es su producto a lo que están enfocados al 100% sin embargo llevan mucho invirtiendo en este framework.

Ahora paramos de hablar y vamos a ver algunas diferencias en cuanto a código:

### images (Ionic 2)

{% highlight html%}
<img src="https://placehold.it/350x150" />
{% endhighlight %}

<div class="row">
	<div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="945" height="358" layout="responsive" src="http://www.hybridtonative.com/images/ui-components/images-ionic.png"></amp-img>
	</div>
</div>

### images (NativeScript)

{% highlight xml%}
<Image src="https://placehold.it/350x150"></Image>
{% endhighlight %}

<div class="row">
	<div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="945" height="358" layout="responsive" src="http://www.hybridtonative.com/images/ui-components/images-ns.png"></amp-img>
	</div>
</div>

### Lists (Ionic 2)

{% highlight html%}{% raw %}
<ion-list>
	<ion-item *ngFor="let item of items">
		{{ item.title }}
	</ion-item>
</ion-list>
{% endraw %}{% endhighlight %}

<div class="row">
	<div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="945" height="358" layout="responsive" src="http://www.hybridtonative.com/images/ui-components/listviews-ionic.png"></amp-img>
	</div>
</div>

### Lists (NativeScript)

{% highlight html%}
<ListView [items]="items">
  <template let-item="item">
    <Label [text]="item.title"></Label>
  </template>
</ListView>
{% endhighlight %}

<div class="row">
	<div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="945" height="358" layout="responsive" src="http://www.hybridtonative.com/images/ui-components/listviews-ns.png"></amp-img>
	</div>
</div>

### Text Inputs (Ionic 2)

{% highlight html%}
<ion-list>
  <ion-item>
    <ion-label>Username</ion-label>
    <ion-input type="text"></ion-input>
  </ion-item>
  <ion-item>
    <ion-label>Password</ion-label>
    <ion-input type="password"></ion-input>
  </ion-item>
</ion-list>
{% endhighlight %}

<div class="row">
	<div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="980" height="324" layout="responsive" src="http://www.hybridtonative.com/images/ui-components/inputs-ionic.png"></amp-img>
	</div>
</div>

### Text Inputs (NativeScript)

{% highlight html%}{% raw %}
<GridLayout rows="auto auto" columns="90 *">
  <Label text="Username" row="0" col="0"></Label>
  <TextField text="" row="0" col="1"></TextField>
  <Label text="Password" row="1" col="0"></Label>
  <TextField secure="true" text="" row="1" col="1"></TextField>
</GridLayout>
{% endraw %}{% endhighlight %}

<div class="row">
	<div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="980" height="324" layout="responsive" src="http://www.hybridtonative.com/images/ui-components/inputs-ns.png"></amp-img>
	</div>
</div>

### Dialogs (Ionic 2)

{% highlight ts %}
import { AlertController } from "ionic-angular";

export class MyPage {

  constructor(public alertCtrl: AlertController) { }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: "Attention!",
      subTitle: "Oh no, something went wrong...",
      buttons: ["OK"]
    });
    alert.present();
  }

}
{% endhighlight %}

<div class="row">
	<div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="945" height="830" layout="responsive" src="http://www.hybridtonative.com/images/ui-components/dialogs-ionic.png"></amp-img>
	</div>
</div>

### Dialogs (NativeScript)

{% highlight ts %}
import * as dialogs from "ui/dialogs";

export class MyComponent {

  constructor() { }

  showAlert() {
    dialogs.alert({
        title: "Attention!",
        message: "Oh no, something went wrong...",
        okButtonText: "OK"
    });
  }

}
{% endhighlight %}

<div class="row">
	<div class="col col-100 col-md-66 col-lg-66">
    <amp-img width="945" height="830" layout="responsive" src="http://www.hybridtonative.com/images/ui-components/dialogs-ns.png"></amp-img>
	</div>
</div>

## Conclusión (Mi opinión)

Ionic 2 es un gran solucion y he desarrolló con el ya por más de 2 años para empresas, agencias etc y ahora con la nueva versión es muchísimo más potente que antes y la comunidad es magnífica, el performance y UX es una de mis preocupaciones, en cuanto al performance lo puedes solucionar con AOT y hacer UX con SCSS, HTML y JS es mucho más fácil que nativo o XML, sin embargo con nativescript se optime un poco más de performance pero hacer interfaz lleva un curva de aprendizaje un poco más alta. 

El otro puntos son los SDKs externos como Firebase o Fabric etc, son más difíciles de implementar en Ionic ya que deben estar por medio de plugin y aun asi no esta todo habilitado en el caso de nativescript lo puedes usar cualquier sdk sin mayores problemas.

En mi punto de vista Ionic 2 puedo solucionar estos problemas, pero si en verdad quiero consumir los SDK a su máximo y adquirir un verdadero performance estaría más inclinado a probar React Native que nativescript.

## Otros puntos de vista

- [Upgrading Hybrid Apps to Native with NativeScript](http://www.hybridtonative.com/){:target="_blank"} by NativeScript
- [NativeScript vs Ionic Framework, Should You Switch?](https://www.thepolyglotdeveloper.com/2015/11/nativescript-vs-ionic-framework-should-you-switch/){:target="_blank"} by Nic Raboy
- [Ionic VS React Native VS NativeScript ](https://blog.enriqueoriol.com/2016/12/ionic-vs-react-native-vs-nativescript-updated.html){:target="_blank"} by Enrique Oriol
- [Ionic 2 Vs NativeScript](http://www.desarrolloweb.com/articulos/ionic-vs-nativescript.html){:target="_blank"} by Desarrollo Web