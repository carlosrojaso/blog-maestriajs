---
layout: post
title: "Personalizar fuente en app Ionic"
keywords: "ionic push notifications, OneSignal, push notifications, notifications, notifications en ionic 2, OneSignal y ionic"
date: 2018-09-13
tags: [font, google]
categories: ionic3
author: Json
repo: "https://github.com/developerjaag/Ionic-Fonts/"
cover: "../../images/post/ionic2/2018-09-13-fonts/portadaPostFont.png"
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

> Ionic nos provee de elegantes y hermosos componentes visuales; Pero en un mundo invadido por aplicaciones móviles, es importante tener un toque personal. Y uno de ellos, y quizas el más perceptible es la tipografia.
<!--summary-->

<amp-img width="718" height="227" layout="responsive" src="../../images/post/ionic2/2018-09-13-fonts/portadaPostFont.png" alt="Ionic google fonts"></amp-img>

{% include general/net-promoter-score.html %}

Realizar el cambio de la tipografia es un aspecto muy vistoso dentro de una aplicación Ionic, y que no implica gran trabajo para hacerlo.

Google fonts nos provee de una gran cantidad de tipografias que podemos utilizar de una manera libre.

Bien, ahora comenzaremos...

# Paso 1: Iniciando el proyecto
Lo primero que haremos será iniciar un nuevo proyecto con ionic, vamos a nuestra terminal y ejecutamos:

```
ionic start googleFonts blank --cordova
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto desde nuestra terminal con:

```
cd googleFonts
```

# Paso 2: Elegir la fuente.
Vamos a nuestro navegador y nos dirigimos a   [Google fonts](https://fonts.google.com/){:target="_blank"}  y elegimos la fuente que deseemos, Yo eligiré la que se llama slabo.


# Paso 2: Descargar la fuente.
Estando en el prewiev de la fuente, presionamos "Select this font".
<amp-img width="470" height="368" layout="responsive" src="../../images/post/ionic2/2018-09-13-fonts/selectThisFont.png" alt="Elegir fuente"></amp-img>
Esto Adiciona la fuente al paquete que se desea descargar:

<amp-img width="681" height="609" layout="responsive" src="../../images/post/ionic2/2018-09-13-fonts/urlFont.png" alt="url font"></amp-img>

Como se observa en la imagen anterios, Debemos seleccionar y pegar la url de la api de Google para esta fuente. En mi caso seria:
```
https://fonts.googleapis.com/css?family=Slabo+27px
```

Ahora abrimos una nueva pestaña del navegador y pegamos la url que acabamos de copiar. Al ir al enlace se nos muesta los @font-face que posee la fuente; Copiamos la url que deseamos descargar asi:

<amp-img width="1309" height="609" layout="responsive" src="../../images/post/ionic2/2018-09-13-fonts/urlFontFace.png" alt="url font face"></amp-img>

Posteriormente abrimos una nueva pestaña del navegador y pegamos la url que acabamos de copiar; Esto inicia la descarga del archivo que contiene la funte.

Para tener un poco de orden, creamos un directorio llamado fonts para guardar las fuentes en nuestro proyecto de Ionic. Lo podemos hacer en la ruta src/assets (tambien he renombrado el archivo para que sea más comodo de trabajar, lo he nombrado slabo.woff2)

# Paso 3: Aplicar la fuente.
Ahora abrimos el proyecto de Ionic con nuetro editor preferido y modificamos el archivo src/app/app.scss para incluir la fuente:

```
@font-face{
    font-family: Slabo;
    src : url('../assets/fonts/slabo.woff2')
}

```

Con esto ya tenemos la fuente lista para utilizar, y para aplicarla solo debemos adicionar al mismo archivo

```
*{
    font-family: Slabo;
}
```

Lo anterior aplicaria la fuente a todo el contenido, pero si deseamos que solo se aplique a las etiquetas h1 seria asi:

```
h1{
    font-family: Slabo;
}
```

## Ejecutando:
Ahora podemos observar los cambios digitando en la terminal:
```
ionic serve
```





