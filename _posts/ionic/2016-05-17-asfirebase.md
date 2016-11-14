---
layout: post
title: "asFirebase Starter"
date: 2016-05-21
categories: ionic
tags: [firebase, ionic1]
comments: true
author: carlosrojas
cover: "http://img.youtube.com/vi/O17OWyx08Cg/0.jpg"
---

<a href="http://www.youtube.com/watch?v=O17OWyx08Cg"><img class="img-responsive" src="http://img.youtube.com/vi/O17OWyx08Cg/0.jpg" alt="Firebase"/></a>

Hace unos dias se libero una nueva versión de Firebase llena de nuevas cosas interesantes, es por eso que decidimos
actualizar nuestro starter [Firebase Auth Starter](http://market.ionic.io/starters/firebaseauthstarter) y de esta manera prepararnos para lo que se viene.



Sus caracteristicas actuales son:

## Caracteristicas.

* Registar Usuarios.
* Autenticación de Usuarios.
* Reset Password.
* Logout.
* Validación de Formularios lista.

## Instalación.

Su instalación es muy sencilla.

1- Usando ionic start:

```
$ ionic start [yourapp] https://github.com/ion-book/firebaseStarter
```

2- Modificar www/js/app.js y editar FURL

```
.constant('FURL', 'https://asfirebase.firebaseio.com/')
```

con tu propia URL de firebase.

Debes agregar "Enable Email & Password Authentication" en tu App en Firebase

3- Probar.

```
$ ionic serve
```


#### Actualización.

Lo que puedes encontrar ahora es:

* **Admob:**  added admob compatibility.
* **Social Networks Auth** added login w/ Facebook, Google, Twitter

También si necesitas ayuda puedes.

Escribirme   [@carlosrojas_o](https://twitter.com/carlosrojas_o)

[Facebook Page](https://www.facebook.com/asfirebase/)

[Ionic Videos ](http://j.mp/1KIgYsI)
