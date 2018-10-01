---
layout: post
title: "¿Qué es AOT en Angular?"
keywords: "aot, Ahead-of-Time, performance, como mejorar el rendimiento, performance"
date: 2018-10-01
tags: [tips, news, angular]
categories: tips
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-01-aot-ahead-of-time%2F6-aot%202.jpg?alt=media&token=9a090868-576d-4ee7-b972-febcc3e05186"
---

> Con esta técnica podremos reducir el tamaño de las aplicaciones de un 30% a un 60% y aún más importante reducir el tiempo de carga de la aplicación casi en un 50%.

<amp-img width="1280" height="720" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-10-01-aot-ahead-of-time%2F6-aot%202.jpg?alt=media&token=9a090868-576d-4ee7-b972-febcc3e05186" alt="Aumenta el performance de tu aplicación con AOT"></amp-img>

Con **AOT (Ahead-of-Time compiler)** podemos mejorar la carga de la aplicación y ganar gran parte de la fluidez en la aplicación.

Antes de empezar necesitamos entender que una aplicación en Angular consta principalmente de sus componentes, pipes, providers y plantillas, antes de que el navegador ejecute la aplicación todos estos artefactos pasan por el **compilador de Angular** para convertiste en Javascript ejecutable en el navegador.

Por defecto las aplicaciones en Angular en modo desarrollo, son compiladas en tiempo de ejecución por el navegador, a está estrategia se le conoce como **JIT (Just-in-Time compiler)**.

Pero esta estrategia tiene un gran problema, la aplicación podría tardar mucho más en cargarse debido a que primero debe compilarse en el navegador. Y pesar más, ya que incluye el compilador de Angular como parte de la aplicación.

La técnica **AOT (Ahead-of-Time compiler)** que nos ofrece Angular cuando ejecutamos `ng build --prod`, puede reducir el código innecesario, pre-compilar la aplicación para que el navegador cargue la aplicación mucho más rapido y además podemos detectar problemas en las plantillas antes de que la aplicación corra en el navegador.

## Pero, ¿Qué es AOT (Ahead-of-Time)?

> En informática, **Compilación anticipada** (AOT por sus siglas en inglés, ahead-of-time) es el acto de compilar un lenguaje de programación de alto nivel como C o C++, o un lenguaje intermedio como Java bytecode o el Common Intermediate Language (CIL) de .NET, a un **código de máquina nativo** (dependiente del sistema) con la intención de ejecutar el archivo binario resultante nativamente.
**AOT produce código máquina optimizado**, igual que un compilador nativo "estándar". La diferencia es que AOT transforma el bytecode de una máquina virtual (VM) a código máquina.

-- Tomado de *Wikipedia* 

Es decir con **AOT** le entregaremos al navegador un código mucho más reducido y pre-compilado aumentado el performance considerablemente y con **JIT** cada vez que se cargue la aplicación se volverá a compilar dentro del navegador.

Aquí un ejemplo de la comparación de una aplicación compilada con **AOT** y con **JIT**:

<amp-img width="1942" height="830" layout="responsive" src="https://s3.amazonaws.com/media-p.slid.es/uploads/129681/images/3335665/Developer_Tools_-_http_localhost_8000__2016-12-12_00-44-58.png" alt="jit vs aot"></amp-img>

## Razones para usar AOT (Compilación anticipada)

### Un mayor rendimiento

Con **AOT** la aplicación está pre-compilada y el navegador al leer el código la puede ejecutar casi inmediatamente. 

### Menos solicitudes asíncronas.

El código pre-compilado ya tiene los templates, así que elimina las llamadas a recursos externos para obtener las plantillas.

### Angular pesa menos.

Como ya no incluye al **compilador de Angular** dentro de la aplicación, el peso de angular es mucho menor y por consecuencia su tiempo de carga.

### Detecta errores en plantillas.

Podemos solucionar errores encontrados en los templates antes de enviar la aplicación al navegador, es más, si existe un solo error de este tipo el proceso de **AOT** se detiene y no deja seguir la compilación hasta que se solucione ese error.

### Mejor seguridad.

AOT ya tiene las plantillas y componentes compilados, así que no hay llamadas a recursos externos por consecuencia hay menos oportunidad para ataques de inyección.

{% include blog/subscribe.html %}

En el siguiente video explico a más detalle de que tratá **AOT (Ahead-of-Time compiler)** en Angular.

<amp-youtube width="560" 
            height="315"
            layout="responsive"
            data-videoid="1iQoDKRzp_g"></amp-youtube>


#### Este artículo esta basado en las siguientes lecturas

- [Demystifying Ahead-Of-Time Compilation In Angular](http://slides.com/wassimchegham/demystifying-ahead-of-time-compilation-in-angular-2-aot-jit){:target="_blank"} by Wassim Chegham 
- [AHEAD-OF-TIME COMPILATION](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html){:target="_blank"} by Angular
- [The Angular 2 Compiler](https://www.youtube.com/watch?v=kW9cJsvcsGo){:target="_blank"} by Tobias Bosch