---
layout: post
title: "Aumenta el performance con Crosswalk"
tags: [native, tips]  
date: 2016-06-28
categories: tips
comments: true
author: nicobytes
cover: "http://i.imgur.com/Ed37R8S.jpg"
---

> Al desarrollar aplicaciones para Android basadas en un **Webview** nos enfrentamos al problema de la fragmentación en dispositivos, es decir hay muchas versiones de Android viejas en el mercado, con **[Crosswalk Project](https://crosswalk-project.org/){:target="_blank"}** no solo solucionamos el problema de la fragmentación sino que aumentamos el performance de la aplicación.

<amp-img width="1746" height="934" layout="responsive" src="http://i.imgur.com/Ed37R8S.jpg" alt="crosswalk"></amp-img>

[Crosswalk Project](https://crosswalk-project.org/){:target="_blank"} es un proyecto de intel que nos provee un **Webview** estándar y con las últimas APIs, para poder usarlo sin importar que versión de android tenga el usuario, al usar el **Webview** de **Crosswalk Project** aumentamos el performance de la aplicación ya que tiene un **Webview** mucho mas optimo para correr las aplicaciones, brindando una buena experiencia tanto para usuarios con versiones viejas como para versiones actuales.

# Ionic + Crosswalk Project

Para agregar el webview de Crosswalk Project a nuestra aplicación de ionic solo necesitamos ejecutar este comando dentro de nuestro proyecto:

```
ionic plugin add cordova-plugin-crosswalk-webview
```

# Principales ventajas de Crosswalk Project

1. Obtener un comportamiento coherente, predecible mediante la reducción de la fragmentación de dispositivos Android.
1. Utilizar las últimas innovaciones web y APIs. Proporcionar una experiencia rica característica en todos los dispositivos Android 4.0 o superior.
1. Fácilmente depurar con Chrome DevTools.
1. Mejorar el rendimiento de su HTML, CSS y JavaScript

Algunas más:

<div class="table-responsive">
  <table class="table table-condensed">
    <thead> 
      <tr>
        <th>HTML5 feature</th> 
        <th>Without the Crosswalk</th> 
        <th>With the Crosswalk</th> 
      </tr> 
    </thead>
    <tbody>
      <tr>
        <td>WebRTC </td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>WebGL</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>Vibration API</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>Predictable layout</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>CSS feature queries</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>Current Flexbox</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>WOFF web fonts</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
      <tr>
        <td>Controlled WebView updates</td>
        <td><div class="icon icon-android-close"></div></td> 
        <td><div class="icon icon-android-done"></div></td>
      </tr>
    </tbody>
  </table>
</div>

# Pero, ¿Qué es la fragmentación?

Android es un sistema operativo que se puede adaptar a cualquier hardware en comparación de IOS de Apple que está integrado a el hardware y software como uno solo. 

Por esto varios fabricantes pueden hacer su propio hardware y luego incluir Android como sistema operativo, esto ha generado un problema y es la fragmentación de dispositivos, es decir tenemos muchos fabricantes que no permiten una fácil actualización de android y por eso la adopción de nuevas versiones en android es más compleja, miremos la siguiente gráfica:

<amp-img width="1046" height="589" layout="responsive" src="http://i.imgur.com/uxiY1ij.png" alt="crosswalk"></amp-img>

[https://mixpanel.com/trends/#report/android_os_adoption](https://mixpanel.com/trends/#report/android_os_adoption)

Por eso Crosswalk soluciona este problema y muchas empresas confían en el:

<amp-img width="1091" height="436" layout="responsive" src="http://i.imgur.com/YGjGovL.png" alt="crosswalk"></amp-img>
