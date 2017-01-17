---
layout: post
title: "Aumenta el performance de tu aplicación con AOT"
keywords: "aot, Ahead-of-Time, performance en ionic, como mejorar el rendimiento en ionic, performance"
date: 2017-01-16
tags: [tips, ionic2, news]
categories: tips
author: nicobytes
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FAumenta%20el%20performance%20de%20tu%20app%20con%20AOT.jpg?alt=media"
---

> Con esta técnica podremos reducir el tamaño de las aplicaciones de un 30% a un 60% y aún más importante reducir el tiempo de carga de la aplicación casi en un 50%.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2FAumenta%20el%20performance%20de%20tu%20app%20con%20AOT.jpg?alt=media" alt="Aumenta el performance de tu aplicación con AOT"></amp-img>

Primero debemos hacernos la pregunta: **¿Qué es una aplicación rápida?** y para que no sea algo ambiguo vamos a definirlo en tres aspectos claves que los usuarios califican a la hora de definir una aplicación rápida:

1. Carga de la aplicación.
1. Cambiar de una página a otra o de una ruta a otra. (Fluidez de la aplicación)
1. Actualizar datos.

Y con **AOT** podemos mejorar la carga de la aplicación y ganar gran parte de la fluidez en la aplicación, pero el tercer ítem depende de nuestro código, conexiones a API REST y el mismo tiempo que Angular tarde en actualizar los datos (Que en eso no tenemos problema, Angular actualiza valores rápido).

Antes de empezar necesitamos entender que una aplicación en Angular consta principalmente de sus componentes y plantillas y antes de que el navegador ejecute la aplicación, todos los componentes y templates pasan por el **compilador de Angular** para convertiste en Javascript ejecutable en el navegador.

Por defecto las aplicaciones en Angular, son compiladas en tiempo de ejecución por el navegador, a esta estrategia se le conoce como **JIT (Just-in-Time compiler)**.

Pero esta estrategia tiene un gran problema, la aplicación podría tardar mucho más en cargarse debido a que primero debe compilarse en el navegador. Y puede pesar más, ya que incluye el compilador de Angular como parte de la aplicación y además código innecesario de librerías dentro de la aplicación. 

Otro problema con JIT son los errores de vinculaciones en las plantillas con el controlador, estos errores se descubren dentro del navegador y en tiempo de ejecución, no antes, es decir si en una plantilla llamanos a una función que no existe, este error se ve en el navegador y no antes, y esto podría afectar a nuestro usuarios.

Por ejemplo, hagamos de cuenta que la función `doSomething` la usamos en algún template, pero no fue declarada en ningun lado.

{% highlight html%}
<button ion-button (click)="doSomething()"></button>
{% endhighlight %}

Cuando se ejecute la función click nos damos cuenta que `doSomething` nunca fue declarada y esto solo lo vemos una vez la aplicación ya está corriendo en el navegador, no antes.

Con la técnica **AOT (Ahead-of-Time compiler)**, se puede reducir el código innecesario, pre-compilar la aplicación para que el navegador cargue la aplicación mucho más rapido y además podemos detectar problemas en las plantillas antes de que la aplicación corra en el navegador.

## Pero, ¿Qué es AOT (Ahead-of-Time)?

> En informática, **Compilación anticipada** (AOT por sus siglas en inglés, ahead-of-time) es el acto de compilar un lenguaje de programación de alto nivel como C o C++, o un lenguaje intermedio como Java bytecode o el Common Intermediate Language (CIL) de .NET, a un **código de máquina nativo** (dependiente del sistema) con la intención de ejecutar el archivo binario resultante nativamente.
**AOT produce código máquina optimizado**, igual que un compilador nativo "estándar". La diferencia es que AOT transforma el bytecode de una máquina virtual (VM) a código máquina.

-- Tomado de *Wikipedia* 

Es decir con **AOT** le entregaremos al navegador un código mucho más reducido y pre-compilado aumentado el performance considerablemente y con **JIT** cada vez que se cargue la aplicación se volverá a compilar dentro del navegador.

AquÍ un ejemplo de comparación de una app de demo con **AOT** y con **JIT**:

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

## Ok Ok, entonces ¿Cómo lo uso?

Bueno si tienes una aplicación con Angular debes darle el contexto necesario con **NgModule** y instalar estas herramientas para hacerlo (**con ionic 2 NO es necesario**):


{% highlight ts%}
// The browser platform with a compiler
import { 
   platformBrowser 
} from '@angular/platform-browser';

// The generated app factory (AOT)
import { 
   AppModuleNgFactory
} from './app.module.ngfactory';

// Launch with the app module factory.
platformBrowser().bootstrapModuleFactory(
   AppModuleNgFactory
);
{% endhighlight %}

Y luego:

```
npm install \
        @angular/compiler-cli \
        @angular/platform-server \
        @angular/compiler \
        typescript@next --save
./node_modules/.bin/ngc -p tsconfig.aot.json

ng build --aot
```

## Ionic 2 + AOT

Bueno en el caso de Ionic 2, nos facilita todo el esfuerzo de configuración porque ya está habilitado y si se maneja de la versión RC4 hacia arriba solo tienes que agregar la bandera `--prod` al proceso de construcción por ejemplo:

```
ionic build android --prod
ionic build ios --prod
```

Ó para release:

```
ionic build android --release --prod
ionic build ios --release --prod
```

El equipo de Ionic hizo un ejemplo de una app con **JIT** y otra con **AOT**

<amp-img width="1400" height="1200" layout="responsive" src="http://blog.ionic.io/wp-content/uploads/2016/09/beta11-vs-beta12.gif" alt="jit vs aot"></amp-img>


#### Este artículo esta basado en las siguientes lecturas

- [Demystifying Ahead-Of-Time Compilation In Angular](http://slides.com/wassimchegham/demystifying-ahead-of-time-compilation-in-angular-2-aot-jit){:target="_blank"} by Wassim Chegham 
- [AHEAD-OF-TIME COMPILATION](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html){:target="_blank"} by Angular
- [The Angular 2 Compiler](https://www.youtube.com/watch?v=kW9cJsvcsGo){:target="_blank"} by Tobias Bosch