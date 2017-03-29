---
layout: post
title: "Firebase Functions"
keywords: "ionic native"
date: 2017-03-31
tags: [firebase]
categories: news
author: javebratt
draft: true
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-24-firebase-functions%2Ffunctions-15b.png?alt=media&token=d6777bd5-21ac-4ba6-97b2-cee72ad69721"
---
> Firebase Cloud functions administrado, privado y escalable entorno de Node.js donde tu puedes correr codigo en Javascript. El SDK de Firebase integra la Plataforma dejandote escribir codigo que responda a eventos e invoque funcionalidad de otras caracteristicas en Firebase.

<amp-img width="1920" height="1080" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-24-firebase-functions%2Ffunctions-15b.png?alt=media&token=d6777bd5-21ac-4ba6-97b2-cee72ad69721"></amp-img> 

Ver el post [original en ingles](https://javebratt.com/firebase-cloud-functions/).

entonces, que es realmente Firebase Cloud Functions?

Es un entorno de Node.js alojado, privado y escalable donde tu puedes correr codigo en Javascript. En el pasado, si tu necesitabas hacer cosas como crear una cuenta de usuario basado en cambios en la base de datos, o enviar push notifications que has creado en tu propio servidor, la mayoria de las personas tenia una app de Node en Heroku y esto trabajaba muy bien para ellos.

La parte mala es que quizas elegiste un BaaS porque quieres concentrarte en escribir tu APP, en lugar de mantener servidores, manejar seguridad, tiempo al aire, escalabilidad y más.

Esa es la razón por la cual Firebase creo *Cloud Functions*, ahora ellos basicamente estan corriendo el servidor por ti, todo lo que tienes que hacer es escribir la función en Javascript y ellos tomaran cuidado de la configuración del servidor, escalabilidad, tiempo al aire, seguridad, etc.

Para los desarrolladores moviles, esto es grandioso, significa que no tendras que tendras que desplegar tu propio servidor, tu unicamente despliegas tus funciones y eso es todo.

Algo adicional que es grandioso, es que el equipo de Firebase creo un SDK para Cloud Functions, lo cual significa que tu no tienes que escribir codigo adicional para conectar con tu *Database*, ellos proveen los disparadores. Esta actualmente soportado:

* Disparadores en la base de datos en tiempo real => Ejecuta funciones en los cambios a la base de datos.
* Disparadores en la Autenticación en Firebase => Ejecuta funciones cuando se crea, actualiza o borra un usuario.
* Disparadores para la Analitica en Firebase => Ejecuta funciones cuando se alcancen metas en analiticas.
* Disparadores para el almacenamiento en la nube => Quieres redimensionar imagenes cuando ellas son subidas la Firebase Storage? No hay problema.
* Disparadores HTTP => obtienes URLs Get/Post basicas donde la puedes llamar para ejecutar una función.

## Como trabaja ?

Despues de que escribes y despliegas una Cloud Function, Los servidores de Google comienzan a manejar la función inmediatamente, escuchando por eventos y ejecutando la función cuando es ejecutada. Tanto si la carga crece o decrece, Google responde rapidamente escalando el numero de servidores virtuales necesarios para ejecutar tu función.

El ciclo de vida de una Cloud Function es:

* Los desarrolladores escribén codigo para una nueva Cloud Funcion, Seleccionando un proveedor de evento (Tal como la Base de datos en tiempo real ), y definiendo las condiciones bajo las cuales el Cloud Function debera ser ejecutado.
* Los desarrolladores despliegan la Cloud Function, y Firebase conecta esta al proveedor de evento seleccionado.
* Cuando el proveedor de evento genera un evento que es igual a las condiciones del Cloud Function, el codigo es invocado.
* Si la Cloud Function esta ocupada manejando muchos eventos, Google crea mas instancias para manejar el trabajo más rapido. Si la Cloud Function esta ociosa, las instancias son eliminadas.
* Cuando el desarrollador actualiza la Cloud Function desplegando el codigo, todas las instancias de la versión antigua son limpiadas y reemplazadas por nuevas instancias.
* Cuando el desarrollador borra la Cloud Function, todas las instancias son liberadas y la conexión entre la Cloud Function y el proveedor de evento son removidas.

## Cloud Functions en acción.

Vamos a ir a través de todo el Flujo de Trabajo de creación y despliegue de un Cloud Function para un App, imaginate teniendo un App para entrenadores de acondicionamiento fisico, donde ellos necesitán crear cuentas para los clientes y ayudarlos a estar en forma.

(*Nota:* Una app no te va a poner en forma, debes realmente levantar los pesos )

Entonces, cada vez que el entrenador agregue a alguien como un cliente, nosotros tendremos una Cloud Function escuchando ese nodo y creara una cuenta para esa persona.

Para empezar a escribir Cloud Functions ( Lo vamos a llamar a partir de ahora CF para ahorrarme algo de escritura ) nosotros necesitaremos instalar el Firebase CLI, vamos ahora a abrir tu terminal y tipea

````
$ npm install -g firebase-tools
````

Dependiendo de tu sistema operativo ( Principalmente si usas Linux ) deberas agregar ````sudo```` antes de ejecutar esa linea de codigo.

Ahora, vamos a necesitar ingresar a nuestra cuenta desde Firebase CLI, de esta manera tendras acceso a tus Apps, para esto debemos ejecutar:

````
$ firebase login
````

Desde que nuestra cuenta esta conectada a nuestra cuenta de Gmail, ese comando abrira un navegador por nosotros para que ingresemos en nuestra cuenta de Google/Gmail y autoricemos Firebase. Una vez hagas esto, el CLI va a loguear y seras capaz de acceder a todo su potencial.

Ahora, voy a asumir que estas en la carpeta de tu 


