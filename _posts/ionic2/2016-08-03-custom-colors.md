---
layout: post
title: "Personalizando colores en Ionic con Sass"
date: 2016-08-03
tags: [ui]
categories: ionic2
author: carlosrojas
cover: "/images/posts/ionic2/2016-08-03-custom-colors/cover.jpg"
versions:
  - title: 'ionic'
    number: '3.3.0'
---

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2016-08-03-custom-colors/cover.jpg" alt="Personalizando colores en Ionic con Sass"></amp-img>

La personalización de nuestras Apps es uno de los aspectos en el exito en el mar de Apps que puedes encontrar en Google Play o App Store.

Ahora si quieres personalizar las vistas en Ionic deberas utilizar SASS, lo cual hace muy fácil realizar cambios a todos los componentes de Ionic.

La forma mas fácil de empezar es modificar el archivo `src/theme/app.variables.scss` aca podras encontrar las variables principales para poder modificar.

```scss
$colors: (
  primary:    #488aff,
  secondary:  #32db64,
  danger:     #f53d3d,
  light:      #f4f4f4,
  dark:       #222
);
```

Puedes cambiar los colores en este archivo y podras observar como se modifica la apariencia general de tu app. Te recomendamos comenzar con `primary`, también puedes agregar nuevos colores:

```scss
$colors: (
  primary:    #488aff,
  secondary:  #32db64,
  danger:     #f53d3d,
  light:      #f4f4f4,
  dark:       #222,
  twitter:    #55acee
);
```

{% include blog/subscribe.html %}

Por otro lado puedes cambiar su color de contraste:

```scss
$colors: (
  primary:    #488aff,
  secondary:  #32db64,
  danger:     #f53d3d,
  light:      #f4f4f4,
  dark:       #222,
  twitter: (
    base: #55acee,
    contrast: #ffffff
  )
);
```

Ahora puedes usar este nuevo color `twitter` en el SDK de ionic, ejemplo:

```html
<button ion-button color="twitter">I'm a button</button>
<ion-navbar color="twitter"></ion-navbar>
<ion-checkbox color="twitter"><ion-checkbox>
...
```

Si quieres usar un color dentro del los archivos `.scss`, debes hacerlo así:

```scss
my-component {
  background: color($colors, twitter, base);
}
h1.my-title{
  background: color($colors, twitter, contrast);
}
h1.my-subtitle{
  background: color($colors, primary);
}
```

Luego observaremos un poco más a fondo como personalizar nuestras apps y te invitamos a jugar con estas variables y a investigar un poco más sobre SASS.


