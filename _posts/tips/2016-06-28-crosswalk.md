---
layout: post
title: "Aumenta el performance con Crosswalk"
tags: [native, tips]  
date: 2017-06-08
categories: tips
author: nicobytes
cover: "/images/posts/tips/2016-06-28-crosswalk/cover.jpg"
---

> Al desarrollar aplicaciones para Android basadas en un **Webview** nos enfrentamos al problema de la fragmentación en dispositivos, es decir hay muchas versiones de Android viejas en el mercado, con **[Crosswalk Project](https://crosswalk-project.org/){:target="_blank"}** no solo solucionamos el problema de la fragmentación sino que aumentamos el performance de la aplicación.

<amp-img width="1746" height="934" layout="responsive" src="/images/posts/tips/2016-06-28-crosswalk/cover.jpg" alt="crosswalk"></amp-img>

[Crosswalk Project](https://crosswalk-project.org/){:target="_blank"} es un proyecto de intel que nos provee un **Webview** estándar y con las últimas APIs, para poder usarlo sin importar que versión de android tenga el usuario, al usar el **Webview** de **Crosswalk Project** aumentamos el performance de la aplicación ya que tiene un **Webview** mucho mas optimo para correr las aplicaciones, brindando una buena experiencia tanto para usuarios con versiones viejas como para versiones actuales.

# Actualización (08/06/2017)
<hr/>

Este proyecto ya no va a ser mantenido por intel y su último release será el número 23, aquí la razón principal:
 
> Cuando Intel inició el Proyecto Crosswalk en 2013, el objetivo era llevar toda la potencia de la plataforma web a los desarrolladores de aplicaciones móviles y de escritorio. Desde entonces, el entorno ha evolucionado y las Progressive Web Apps aportan el poder de las aplicaciones nativas a las aplicaciones web puras. Ahora, el Webview de Android comparte código y funciones con el navegador Chrome y se mantiene actualizado, mientras que Electrón y NW.JS de Intel soportan desarrollo para apps de escritorio. Como resultado, creemos que Crosswalk ha hecho su trabajo y podemos hacer un mayor impacto centrándonos en otras áreas.
 
La noticia completa aqui: [https://crosswalk-project.org/blog/crosswalk-final-release.html](https://crosswalk-project.org/blog/crosswalk-final-release.html){:target="_blank"} 
 
Esto es un buena noticia, es decir crosswalk es un proyecto que nos ayudó a dar soporte a viejas versiones de android (android 4) y lo seguirá haciendo hasta el release 23, después de este release ya no se tendrá soporte. Me parece una decisión acertada ya que no es fácil soportar versiones viejas, ¿Recuerdas cuando era necesario dar soporte para IE8? es algo similar, es mejor para la tecnología seguir avanzando y así aprovechar las características de los nuevos celulares y APIs de la web.


Aun así puedes seguir usando crosswalk:
 
<hr/>

# Ionic + Crosswalk Project

Para agregar el webview de Crosswalk Project a nuestra aplicación de ionic solo necesitamos ejecutar este comando dentro de nuestro proyecto:

```
ionic cordova plugin add cordova-plugin-crosswalk-webview
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

<amp-img width="1046" height="589" layout="responsive" src="/images/posts/tips/2016-06-28-crosswalk/screen1.png" alt="crosswalk"></amp-img>

[https://mixpanel.com/trends/#report/android_os_adoption](https://mixpanel.com/trends/#report/android_os_adoption)

Por eso Crosswalk soluciona este problema y muchas empresas confían en el:

<amp-img width="1091" height="436" layout="responsive" src="/images/posts/tips/2016-06-28-crosswalk/screen.png" alt="crosswalk"></amp-img>
