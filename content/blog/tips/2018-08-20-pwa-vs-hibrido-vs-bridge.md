---
layout: post
title: "PWA vs Ionic vs NativeScript"
date: 2018-08-29
tags: [angular, news, ionic, pwa, nativescript]
categories: tips
author: nicobytes
video: true
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-20-pwa-vs-hibrido-vs-bridge%2Fcover.jpg?alt=media&token=733bc134-8484-481e-bc9d-e6325aa222a3"
---
> ¿Qué camino elegir para una aplicación móvil con Angular? PWA, Hibrido o Bridge, existen los tres lados del desarrollo y cada uno tiene sus ventajas y desventajas, en este artículo vamos a recorrer algunos puntos que debemos evaluar para así tomar una buena elección.

<img width="1280" height="720" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-20-pwa-vs-hibrido-vs-bridge%2Fcover.jpg?alt=media&token=733bc134-8484-481e-bc9d-e6325aa222a3"> 

Con el conocimiento que se ha adquirido con Angular se puede entrar al mundo de desarrollo para dispositivos móviles desde tres frentes:

- PWA
- Híbrido (Ionic)
- Bridge (NativeScript)

Cado uno de estos tiene sus ventajas y desventajas, pero en este artículo vamos a hacer una comparación de acuerdo algunos criterios para aclarar cual llegaría a ser un buen camino.

En primer lugar, vamos a hacer una comparación desde el punto de vista técnico y luego desde un punto de vista de negocio.

### Rendimiento

<img width="860" height="480" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-20-pwa-vs-hibrido-vs-bridge%2Fnativescript.png?alt=media&token=38f7f8a3-ce7a-41d8-b9d2-2c7dfda00859"> 

En rendimiento el ganador es NativeScript, ya que la UI corre nativamente desde el sistema operativo del dispositivo y tiene mejor comunicación con los recursos nativos, este es recomendable si en la aplicación se hace un uso exigente del dispositivo y sus recursos. 


### Recursos nativos

<img width="860" height="480" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-20-pwa-vs-hibrido-vs-bridge%2Fnativescript.png?alt=media&token=38f7f8a3-ce7a-41d8-b9d2-2c7dfda00859"> 

En consumo de recursos nativos el ganador es NativeScript, ya que se integra de mejor manera a cualquier librería nativa de algún tercero o del mismo dispositivo, como resultado las aplicaciones que hagan uso intenso de recursos nativos tendrán mejor respuesta.

### Portabilidad

<img width="860" height="479" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-20-pwa-vs-hibrido-vs-bridge%2Fionic.png?alt=media&token=0ed52c28-f75e-4add-855d-97d45e5ec29c"> 

En portabilidad el ganador es Ionic, por usar todas las tecnologías web existentes a su favor hace que podamos correr la misma aplicación en múltiples plataformas (PWA, Android, IOS, Electron, WebApp) con la misma base de código.

### Componentes

<img width="860" height="479" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-20-pwa-vs-hibrido-vs-bridge%2Fionic.png?alt=media&token=0ed52c28-f75e-4add-855d-97d45e5ec29c"> 

En componentes el ganador es Ionic, no es secreto que durante los años que lleva Ionic en producción tiene la familia de componentes mas completo para móviles del mercado, tiene un SDK bastante rico y versátil que permite que se pueda usar todo su poder y poner en marcha una aplicación en poco tiempo.

### Curva de aprendizaje

<img width="856" height="479" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-08-20-pwa-vs-hibrido-vs-bridge%2Fpwa.png?alt=media&token=77bf964d-1595-4ccb-ba50-1bf337793fd1"> 

Las PWA ganan en este punto ya que el conocimiento que debes adquirir no es tan alto comparado como el que se debe adquirir respecto Ionic y Nativescript. Y Angular ha hecho que con el CLI podamos integrar PWA de manera fácil.

Lo anterior sería una decisión basado en aspectos técnicos, pero realmente lo que debemos analizar son las características del equipo y el negocio que va a llevar a cabo el proyecto, la tecnología se debe adaptar al negocio y no al revés.

Así que realmente esta es una decisión de negocio, teniendo en cuanta varios puntos a evaluar como:

- La curva de aprendizaje
- La experiencia del equipo
- Numero de personas en el equipo
- El consumo de recursos nativos.
- Portabilidad
- Dinero y tiempo 

Por eso en este video hago una explicación mucho más profunda y clara de estos tres enfoques PWA, Hibrido y Nativo llegando a evaluar los casos en puede ser mejor una o la otra.

<amp-youtube width="560" 
            height="315"
            class="responsive"
            data-videoid="3VgCrt1HO_M"></amp-youtube>


