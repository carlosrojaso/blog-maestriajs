---
layout: post
title: "El Flujo de Trabajo!"
date: 2015-07-30  
categories:
---
Recordemos que Ionic es una colección de librerías y frameworks que nos ayudaran a avanzar rápidamente por nuestro proyecto. A continuación te mostramos un Flujo de Trabajo el cual te puede servir como guía en el desarrollo de tu App Movíl.

Siempre que nos enfrentamos a un Proyecto de desarrollo móvil podemos identificar 5 etapas principales.

<img src="/images/procesocompleto.png" />

**Ideación:** En esta etapa es donde tratamos de visualizar el alcance que va a tener nuestro producto.  Normalmente, se utilizan herramientas como Lluvias de ideas,  Historias de Usuarios, etc.

**Diseño:** En esta etapa vamos a tener una mayor idea de lo que se esta hablando. Normalmente, en esta etapa se trabaja de la mano de un diseñador grafico con el cual se obtienen unos wireframes inicialmente, los cuales son una versión muy temprana del aspecto general de las interfaces y son utilizados para convertirlos en Mockups, los cuales son una versión mas parecida al producto final de que estamos buscando lograr.

**Prototipado:** Esta es la etapa en la que nos vamos a enfocar ya que es donde realmente se realiza el trabajo del desarrollador, aunque se recomienda dar un acompañamiento en  las otras etapas, realmente lo que aprenderás en este libro lo podrás aplicar aquí.

**Pruebas:** En esta etapa probamos la funcionalidad que hemos implementado en la fase de prototipado en búsqueda de errores en la funcionalidad, en la usabilidad, etc. Este libro toca un poco sobre esta fase pero se recomienda profundizar con material mas especializado.

**Mediciones:**  En esta etapa tratamos de obtener datos de nuestros usuarios utilizando herramientas como Analytics implementados en nuestra App y Encuestas para nuestro usuarios. De esta manera podemos tomar decisiones sobre que características agregar, eliminar y mejorar.

El proceso explicado anteriormente es un flujo genérico el cual es muy común observar en equipos de trabajo (Gerentes de Productos, Desarrolladores, Diseñadores Graficos, etc) en estos días, pero como comentamos nos vamos a enfocar en la etapa de prototipado. Basicamente, Ionic nos ofrece una serie de herramientas que podremos utilizar aunque si observamos la siguiente imagen podremos generalizar un poco.

<img src="/images/workflow.png" />

Como podemos observar en una primera etapa realizamos la instalación con

$npm install ionic –g

Luego elegimos una plantilla para comenzar nuestro proyecto blank, tabs, maps o sidemenu.

Una vez estemos listo podemos empezar el desarrollo en nuestro navegador con

$ionic serve

Luego, podemos enviar a los emuladores con

$ionic emulate [ios, android]

o directamente a un equipo físico con

$ionic run [ios, android]

una vez hemos terminado una versión podemos agregar iconos y splash screens con

$ionic resources

y por ultimo generar los archivos necesarios con

$ionic build

y realizar el procedimiento para enviar a cada tienda (Google Play Store, App Store).

Bueno espero esta información sea de utilidad en tu proyecto.

*Keep coding* :)

@Carlosrojas_o
