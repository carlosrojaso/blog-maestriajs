---
layout: post
title: "Nativescript y su CLI"
keywords: "nativescript"
date: 2017-11-03
tags: [nativescript]
categories: nativescript
author: jorgecano
editname: "ionic2/2017-11-03-nativescript.md"
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-03-nativescript%2FNativescript.png?alt=media&token=f4858a95-5240-4b5c-b28c-433c0d959822"
versions:
  - title: 'tns'
    number: '3.3.0'
---

> Estoy mientras escribo siguiendo las instrucciones para utilizar Nativescript con Angular y Firebase. Vamos a ver como preparar nuestro entorno para empezar con Nativescript.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-03-nativescript%2FNativescript.png?alt=media&token=f4858a95-5240-4b5c-b28c-433c0d959822" alt="SQLite + Ionic 2 en 5 pasos"></amp-img>

{% include general/net-promoter-score.html %}

Vayamos paso por paso.

1- entre a la web de nativescript donde me indica que tenemos que instalar su cliente 

````
npm install -g nativescript
````

El primer error que encontré acá, como me pasa con los clientes normalmente es que necesito permisos de “sudo”… por lo tanto lo corri de nuevo:

````
sudo npm install -g nativescript
````

Se tomo un tiempo para hacer la instalación, pero con el sudo y xcode instalado funciono todo bien (esto de xcode obviamente es solo para mac), hasta que me tiro unos warnings pero como son warnings siguió la instalación para eso veo en la instalación avanzada que pide un par de cosas mas ademas de instalar el cliente, algo a tener en cuenta que parece obvio ya que depende de las SDK para poder compilar luego.

<amp-img width="800" height="304" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-03-nativescript%2F1-RMimj1697WheLAvLDRjPvg.png?alt=media&token=a9c14d71-9c2d-4696-b4e3-ab807f3d9d9d"></amp-img>

Para esto, dependiendo de su sistema operativo los invito a ver como hacer su instalación desde el siguiente link 

[http://docs.nativescript.org/angular/start/quick-setup](http://docs.nativescript.org/angular/start/quick-setup)

Algo muy copado es que te pregunta si querés que nativescript te instale lo necesario para poder utilizarlo, tras una serie de preguntas desde la terminal… yo lo utilize y me funciono de 10 :D

Una vez que seguimos las instrucciones (no las pongo acá porque depende del sistema), hice a comprobación que tarda un rato mas con el siguiente codigo:

````
tns doctor
````

Y ahora que tenia todo, a bajarme el código example:

````
git clone https://github.com/NativeScript/sample-Groceries.git
````

Y luego de un tiempito (es un poco pesado) me bajo todo lo que necesitaba para poder arrancar el proyecto…

Una vez que tenemos el proyecto base, vamos a tener que indicarle a nativescript para que OS’s lo vamos a hacer…

la forma de hacerlo es desde la consola, y vamos a ejecutar

para ios:

````
tns platform add ios
````

para android:

````
tns platform add android
````

una vez tengamos todo esto, podemos levantar el hola mundo… de la siguiente forma

para ios:

````
tns run ios
````

para android:

````
tns run android
````

Deberias ver algo asi.

<amp-img width="800" height="929" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2017-11-03-nativescript%2F1-qiUM-3eTU-DiDErUeXi7FA.png?alt=media&token=60147200-b634-4d12-a59d-1285ede1563b"></amp-img>

Ya con esto tendremos todo listo para empezar...

[Ver Post Completo](https://medium.com/@jorgeucano/nativescript-y-su-gran-cliente-47dbf0479e52)
