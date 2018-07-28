---
layout: post
title: "Usando Observables en Ionic 2"
keywords: "ionic"
date: 2017-04-11
tags: [ionic2]
categories: ionic2
author: thecouk
repo: 'https://github.com/thecouk/ObservablesIonic'
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-07-08-observables-angular2%2Fobservables-and-reactive-programming-in-angular-2-rangleio%20(1).png?alt=media&token=0425540b-2b95-493c-a2f7-d061880a37a1"
remember: true
versions:
  - title: 'ionic'
    number: '2.1.0'
  - title: 'ionic-native'
    number: '2.4.1'
---

Este tutorial pretende ejemplificar el uso de los observables dentro de un proyecto en Ionic 2.

<!--summary-->

<amp-img width="918" height="410" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2016-07-08-observables-angular2%2Fobservables-and-reactive-programming-in-angular-2-rangleio%20(1).png?alt=media&token=0425540b-2b95-493c-a2f7-d061880a37a1" alt="Observables"></amp-img>

{% include general/net-promoter-score.html %} 

Porque el uso de los observables? Me encontre con la necesidad de utilizar información reflejada en la primera vista en otras vistas dentro de la aplicación lo cual no estaba logrando con las promesas ya que si realizaba un cambio en los datos presentandos en ese momento solo podia verlos en la vista donde me encontraba, pero si me movia a otra vista, el cambio no se veía reflejado a menos que por supuesto refrescara. Por otra parte viendo el funcionamiento de fireBase note algo peculiar y fue que al momento de desplegar una lista por medio de un *nFor se utiliza un pipe async y por supuesto cuando los datos ya se encontraban desplegados mi di cuenta que al cambiar el objeto dentro de fireBase mi lista automaticamente se refrescaba, lo cúal me motivo a buscar información.

## Separando temas:

Yo imaginaba que los observables harían entonces todo ya que según lo que había leído, mencionaban que eran escuchas de la información lo que permitia ver los cambios reflejados en el momento. Y en efecto asi es pero me lleve tope con que si realizaba un cambio en la base de datos nada sucedia ni se veian reflejados a menos que existiera una petición de actualización de datos.

Entonces separando temas los observables en efecto se mantienen escuchando o estan "observando" si ha existido un cambio pero dentro de la aplicación, es decir si existe un cambio en la información estos se encargan de notificar y actualizar la información a todos los suscriptores que esten en uso en ese momento dentro de tu aplicación.

Ahora que pasa se existe un cambio en la base de datos con la información que tenemos desplegada? Pues nuestra aplicación ni se entera!!!! a menos claro que haya un evento que permita invocar de nuevo la informacion a nuestra API, ya sea un refresco, la creación de un nuevo objeto, actualización o eliminación. La información entonces ya viene actualizada de la base de datos y los observables se encargan de notificar a toda la aplicación.

Pero porque fireBase si lo hace? Bueno es que es una combinación entre observables y los WebSockets (Esto lo dejo para otro día pero al menos ya les di la idea). 

{% include blog/adIonic.html %}

### Requisitos

Antes de empezar a trabajar en Ionic, empecemos por tener una fuente de datos para nuestro ejemplo. Para ello te recomiendo que te descargues:

* [JSON-SERVER](https://github.com/typicode/json-server) - Servidor para generar e imitar una API en 30 segundos, luego genera el JSON de ejemplo en un archivo

```
  "personas": [
    {
      "id": 1,
      "nombre": "Persona 1",
      "profesion": "Programador",
      "megusta": false
    }
  ]
```

Ve a la terminal de tu equipo y ejecuta el siguiente comando:

```
json-server personasbd.json
```

Y listo tendras algo como esto:

```
\{^_^}/ hi!

  Loading personasbd.json
  Done

  Resources
  http://localhost:3000/personas

  Home
  http://localhost:3000
```

Basicamente te habilita una API con todos los metodos GET,POST,PUT,DELETE para que nos sirvan para el ejemplo.

* Descarga y ejecuta el proyecto de Ionic. Lo puedes descargar [acá](https://github.com/thecouk/ObservablesIonic)

## Listo

Ahora ya tienes lo necesario para trabajar ya con el proyecto de Ionic. Descargalo, todo el codigo lo comente por lo que seguro no te perderas.

## Como funciona la App

Pantalla Inicial abierta en dos browser:

<amp-img width="627" height="432" layout="responsive" 
src="https://github.com/thecouk/ObservablesIonic/blob/master/src/assets/img-ejemplos/listaPersonasInicial.png?raw=true"></amp-img>

Pantallas al momento de agregar personas:

<amp-img width="632" height="432" layout="responsive" src="https://github.com/thecouk/ObservablesIonic/blob/master/src/assets/img-ejemplos/listaPersonasAgregar.png?raw=true"></amp-img>

Pantallas al momento de indicar Me Gusta:

<amp-img width="632" height="432" layout="responsive" src="https://github.com/thecouk/ObservablesIonic/blob/master/src/assets/img-ejemplos/listaPersonasMeGusta.png?raw=true"></amp-img>

### Agradecimientos:

Este ejemplo es una adaptación del tutorial: 
* [Angular Observable Data Services](https://coryrylan.com/blog/angular-observable-data-services)

Este tutorial es del 2015 pero me funciono muy bien, estoy seguro que habrán otros metodos quiza más resumidos de implementar los observables por lo que si conoces de alguno te pido nos ayudes a actualizar este proyecto para ponerlo a disposición de toda la comunidad.