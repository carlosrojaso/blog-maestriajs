---
layout: post
title: "Ionic 2 VS Nativescript"
keywords: "ionic 2, nativescript, ionic 2 vs nativescript, ionic 2 o nativescript"
date: 2017-01-08
tags: [tips, ionic2, news]
categories: tips
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionicvsnative%2FFOLLOW.jpg?alt=media"
draft: true
---

> Vamos a analizar estos dos geniales frameworks e indagar sobre las ventajas y desventajas de cada uno.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2Fionicvsnative%2FFOLLOW.jpg?alt=media" alt="Validaciones en Formularios"></amp-img>

Hace poco tuve la oportunidad de participar en un hangout, discutiendo sobre estos dos frameworks y sus ventajas y desventajas. Les dejo el video:

<amp-youtube width="560" 
            height="315"
            layout="responsive"
            data-videoid="UA8CVdhRvlk"></amp-youtube>

Voy a tocar algunos puntos que son importantes al comparar cada uno, empecemos!

## Cross Platform

Los dos nos prometen que con una sola base de código puedes desarrollar aplicaciones para Android y IOS, que son los mercados que más nos interesan a la hora de desarrollar apps móviles, solo que en caso de Ionic es mucho más versátil, como lo dice uno de sus lemas **“One code base. Running everywhere.”** veamos:

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

Ionic 2 al usar tecnología web puede estar en muchas más plataformas y ser versátil. 

{% include blog/subscribe.html %}

## Performance

Ahora en este punto Nativescript tiene un mayor performance que las apps en Ionic 2, ya que la interfaz no se renderiza en un **WebView** sino nativamente en el sistema operativo, pero la diferencia es muy poca entre una y la otra. En el caso de Ionic 2 se puede habilitar el proceso de **AOT (Compilación de alto nivel)** que hará que la app reduzca el tiempo de carga.

Ahora si este punto del performance es sumamente importante para ti, hablando de milisegundos de diferencia, tu opción podria ser NativeScript o react native o incluso si quieres que tu app tenga un alto performance hazlo nativo en android y ios y no busques soluciones híbridas.

## Comunidad

Bueno en este caso Ionic tiene muchisima más comunidad, pero esto se debe a que ionic ya lleva bastante tiempo en el mercado y por eso tiene una comunidad más fuerte, en cambio NativeScript lleva mucho menos tiempo aún así su comunidad es buena y tiene a grandes exponentes.

## Curva de aprendizaje

Debemos suponer que ya se tiene bases en HTML, CSS y JavaScript, teniendo eso en cuenta, en el caso de Ionic 2 debes aprender Angular, Typescript y SCSS lo cual no es complejo y de por sí es fácil entender cómo trabaja. Con NativeScript la curva es más alta debes aprender todo lo de ionic pero agregale algo de **XML** y algunas etiquetas de CSS de más.

## Angular

Este es un gran punto ya que los dos soportan trabajar con **Angular**, bueno en realidad en Ionic 2 es una obligación, en el caso de NativeScript es opcional, pero la mejor forma de trabajarlo es en conjunto con Angular.

## El SDK (componentes)

En componentes, Ionic tiene muchos más disponibles para usar que Nativescript, es decir nos dan un librería mucho más amplia para usar en comparación. Por otro lado NativeScript tiene una parte de componentes de pago, es decir hay una suite que nos ofrecen con componentes más avanzados pero son de pago.

## Nativo

Ok, en el acceso de recursos nativos las apps en Ionic se renderizan en un WebView y por eso deben usar plugins para conectarse a los recursos nativos como la cámara, geolocalización, acelerómetro y lo mismo si queremos consumir alguna librería de algún tercero como el SDK de Firebase o el SDK de Fabric, por ejemplo tenemos que buscar si estan los plugins hechos para estas librerías.

En el caso de NativeScript no hay problema puedes usar cualquier recurso nativo y SDK externo sin necesidad de plugins.

## Soporte

Las dos tecnologías tieneN geniales empresas detrás, en el caso de Ionic es **driftyco (ionic.io)** que es un empresa que solo se enfoca al desarrollo de todo el ecosistema de ionic, lo cual es un muy buena mezcla ya que solo se enfocan en ionic y sus productos alrededor de él, por parte de NativeScript esta **telerik** es una empresa que ya lleva mucho más tiempo en el mercado de apps, pero no es UN producto a lo que están enfocados al 100% sin embargo llevan mucho invirtiendo en este framework.

Ahora vamos a parar de hablar y vamos a ver algunas diferencias en cuanto a código:

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

Ionic 2 es un gran solución y he desarrollado con este framework por más de 2 años productos para empresas, agencias, startups, etc y ahora con la versión de Ionic 2 es muchísimo más potente que antes y la comunidad es magnífica, el performance y UX es una de mis preocupaciones, en cuanto al performance en Ionic 2 se puede solucionar con **AOT (Compilación de alto nivel)** y hacer UI/UX con SCSS, HTML y JS es mucho más fácil, con NativeScript se obtiene más de performance ya que no corre en un WebView, pero hacer UI/UX lleva una curva de aprendizaje más alta.

Otro aspecto importante son los SDKs externos por ejemplo Firebase o Fabric, son más difíciles de implementar en Ionic ya que deben estar por medio de un plugin y aún así no está todo disponible, en el caso de NativeScript puedo usar cualquier SDK sin mayor problema.

En mi punto de vista con Ionic 2 se pueden solucionar estos problemas, pero si en verdad quiero consumir los SDK de terceros al máximo y adquirir un verdadero performance estaría más inclinado a probar React Native que NativeScript.

## Otros puntos de vista

- [Upgrading Hybrid Apps to Native with NativeScript](http://www.hybridtonative.com/){:target="_blank"} by NativeScript
- [NativeScript vs Ionic Framework, Should You Switch?](https://www.thepolyglotdeveloper.com/2015/11/nativescript-vs-ionic-framework-should-you-switch/){:target="_blank"} by Nic Raboy
- [Ionic VS React Native VS NativeScript ](https://blog.enriqueoriol.com/2016/12/ionic-vs-react-native-vs-nativescript-updated.html){:target="_blank"} by Enrique Oriol
- [Ionic 2 Vs NativeScript](http://www.desarrolloweb.com/articulos/ionic-vs-nativescript.html){:target="_blank"} by Desarrollo Web