---
layout: post
title: "Ionic 4 + Firebase"
keywords: "ionic, firebase"
date: 2018-09-27
tags: [ionic]
categories: ionic3
author: manuelAlmarguer
repo: "https://github.com/manunoly/ionic-demo-comunidad"
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-27-ionic4-firebase%2Fcover.png?alt=media&token=498d7ebe-1381-4420-bd57-de5afd33d42d"
versions:
  - title: 'ionic/angular'
    number: '4.0.0-beta7'
  - title: 'angular/cli'
    number: '6.1.5'
---

> AngularFirebase2 que oficialmente ha pasado a llamarse Angularfire nos permite obtener varias caracteristicas que funcionan muy bien con nuestras Apps en Ionic. En esta ocasión vamos a ver como usar Ionic 4 y Angularfire.

<!--summary-->

<img width="718" height="227" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-27-ionic4-firebase%2Fcover.png?alt=media&token=498d7ebe-1381-4420-bd57-de5afd33d42d">



Hola Amig@s, como parte de nuestro aprendizaje y aportes a la comunidad de ionic en español, realizaremos varios tutoriales en los que estaremos aprendiendo a trabajar con Ionic 4, AngularFirebase2 que oficialmente ha pasado a llamarse Angularfire y para nuestra Base de Datos utilizaremos Firestore o Firebase.

Sin dar más vueltas al asunto vamos a ver los pasos a seguir para tener listo nuestro entorno y comenzar a trabajar. Si aun no tienes Ionic en tu compu puedes ver en la documentación como instalarlo.

Primero creamos nuestro proyecto con el siguiente comando, debemos integrar cordova cuando nos pregunte, ya que lo necesitaremos luego para el plugin de firebase.

```
$ionic start ionicFirebase blank —-type=angular
```

`--type=angular` es propio de Ionic 4 y le indica a ionic el tipo de proyecto que vamos a utilizar, en este caso angular con su respectivo angular router para la navegación entre páginas, si no se especifica, se utiliza la navegación anterior de la versión 3, la cual ha sido declarada como obsoleta, asegúrate de tener la última versión, puedes consultar tu versión mediante el siguiente comando en tu terminal.

```
$ionic info
```

ejecutamos `ionic serve` para levantar nuestro servidor y ver que todo hasta ahorita ha sido exitoso.

# Integrar AngularFire

Vamos ahora a integrar angularfire en nuestro proyecto, para ello ejecutamos el siguiente comando en nuestra terminal:

```
$npm install firebase @angular/fire — save
```

Con esto hemos adicionado firebase y angularfire a nuestro proyecto, pero debemos adicionar el plugins para la versión 5 de firebase, debemos especificarle que queremos la versión 5, al momento de este tuto se encontraba el @ionic-native/firebase 5.0.0-beta.21, así que ejecutamos los siguientes comandos

```
$ionic cordova plugin add cordova-plugin-firebase
```

y

```
$npm install --save @ionic-native/firebase@5.0.0-beta.21
```

Ahora nos toca crear un proyecto en la consola de firebase, vámonos al siguiente link, una vez dentro pinchamos en Añadir Proyecto, le ponemos el nombre, Fijarse en el ID que le asigna google a tu proyecto, lo puedes cambiar por uno que sea de tu agrado ya que normalmente le adiciona números para asegurar que el proyecto sea único. Una vez completados los datos pues creamos el proyecto.

<img width="553" height="710" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-27-ionic4-firebase%2F1.png?alt=media&token=7596ee0e-ae47-4810-bac3-15bc77c5d6f5">



Abrimos nuestro proyecto y nos vamos a la configuración que se encuentra en la esquina superior izquierda.

<img width="653" height="132" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-27-ionic4-firebase%2F2.png?alt=media&token=318b0d43-033f-4db4-bb2e-e91c8f511669">

Una vez dentro de la configuración del proyecto bajamos para añadir Firebase a nuestra aplicación,

<img width="762" height="313" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-27-ionic4-firebase%2F3.png?alt=media&token=9512fe16-b162-458b-9db5-a85d872b3eb8">

Esto nos permitirá adicionar firebase a nuestra aplicación, al hacer clic sobre web nos muestra la configuración y datos de nuestro proyecto firebase. Copiamos la configuración y vamos a añadirla a nuestra app.

<img width="800" height="330" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-27-ionic4-firebase%2F4.png?alt=media&token=b984c4f3-347c-475f-896a-130fb01a0270">

Una buena práctica es poner nuestra configuración dendro de las variables de entorno, mantenemos nuestro proyecto organizado y damos muestra de estar haciendo las cosas bien, no olviden cambiar el signo de igualdad por : para la asignación de la variable.

<img width="800" height="284" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-27-ionic4-firebase%2F5.png?alt=media&token=54f3b127-2bff-4240-ad0c-064578c8789a">

Ahora tenemos que ir a nuestro archivo app.module e importar Firebase y todos sus módulos, también debemos importar environment pues es ahí donde tenemos nuestra configuración de firebase, debe quedarnos de la siguiente forma.

<img width="606" height="542" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-09-27-ionic4-firebase%2F6.png?alt=media&token=436100c2-6d42-4bbf-a0c9-7c1c912c251c">

Firebase Real Time es un Json y todos los datos se almacenan en esta estructura, Firestore por su parte tiene varias particularidades las cuales debemos conocer, las más importante es conocer que todo esta organizado en colecciones, y dentro de esta colecciones tenemos documentos, esto últimos no pueden tener mas de 1MB de tamaño. Si fueras a comenzar un nuevo proyecto, pues utiliza Firestore.

Bueno con esto tenemos nuestro entorno preparado para trabajar con Ionic 4 + angularfire + firestore o firebase.

Esto ha sido todo por hoy amigos de la comunidad Ionic en español, vendrán muchos más tutoriales, en el próximo estaremos haciendo consultas a la Base de Datos y trabajando nuestros datos . Luego integraremos Angular Google Maps (AGM) y utilizaremos geofirex para filtrar puntos dentro de nuestro mapa según distancia y ubicación. 

Hasta pronto :)