---
layout: post
title: "Personalizando vistas en Ionic 2"
date: 2016-08-03
tags: [ui, ionic2]
categories: ionic2
comments: true
author: carlosrojas
cover: "http://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png"
---

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="427" height="320" layout="responsive" src="http://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png" alt="firebase-database-and-ionic-2"></amp-img>
  </div>
</div>

La personalización de nuestras Apps es uno de los aspectos en el exito en el mar de Apps que puedes encontrar en Google Play o App Store.

Ahora si quieres personalizar las vistas en Ionic 2 deberas utilizar SASS, lo cual hace muy facil realizar cambios a todos los componentes de Ionic.

La forma mas facil de empezar es modificar el archivo `app/theme/app.variables.scss` aca podras encontrar las variables principales para poder modificar.

```
$colors: (
  primary:    #387ef5,
  secondary:  #32db64,
  danger:     #f53d3d,
  light:      #f4f4f4,
  dark:       #222,
);
```

Puedes cambiar los colores en este archivo y podras observar como se modifica la apariencia general de tu app. Te recomendamos comenzar con `primary`

Luego observaremos un poco más a fondo como personalizar nuestras apps y te invitamos a jugar con estas variables y a investigar un poco más sobre SASS.


