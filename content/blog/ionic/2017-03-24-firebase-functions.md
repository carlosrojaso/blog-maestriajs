---
layout: post
title: "Firebase Functions"
keywords: "ionic native"
date: 2017-03-31
tags: [firebase]
categories: ionic2
author: javebratt
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-24-firebase-functions%2Ffunctions-15b.png?alt=media&token=d6777bd5-21ac-4ba6-97b2-cee72ad69721"
---
> Firebase Cloud functions administrado, privado y escalable entorno de Node.js donde tu puedes correr codigo en Javascript. El SDK de Firebase integra la Plataforma dejandote escribir codigo que responda a eventos e invoque funcionalidad de otras caracteristicas en Firebase.

<img width="1920" height="1080" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-24-firebase-functions%2Ffunctions-15b.png?alt=media&token=d6777bd5-21ac-4ba6-97b2-cee72ad69721"> 

 

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

```
$ npm install -g firebase-tools
```

Dependiendo de tu sistema operativo ( Principalmente si usas Linux ) deberas agregar ````sudo```` antes de ejecutar esa linea de codigo.

Ahora, vamos a necesitar ingresar a nuestra cuenta desde Firebase CLI, de esta manera tendras acceso a tus Apps, para esto debemos ejecutar:

```
$ firebase login
```

Desde que nuestra cuenta esta conectada a nuestra cuenta de Gmail, ese comando abrira un navegador por nosotros para que ingresemos en nuestra cuenta de Google/Gmail y autoricemos Firebase. Una vez hagas esto, el CLI va a loguear y seras capaz de acceder a todo su potencial.

{% include blog/adFirebase.html %}

Ahora, voy a asumir que estas en la carpeta de tu App en la terminal, porque tu sabes que estas trabajando en una app para Fitness, primero, sal de la carpeta de tu app,  y crea un nuevo folder para tu CF:

```
$ cd ..
$ mkdir functions
$ cd functions
```

esto te dejara con 2 carpetas, uno para tu App y otro para las funciones, ambas carpetas estan en el mismo nivel (Ellos no deben tener que estar necesariamente, pueden estar en carpetas distintas si tu quieres) y entonces debemos ir a la carpeta ` functions `, donde inicializaremos tus funciones:

```
$ firebase init functions
```

Ese comando te mostrara una lista de aplicaciones que existen en Firebase, tu deberas elegir en el que estas trabajando para que de esta manera se conecte la consola con el app en Firebase correctamente.

Cuando elijas la aplicación, se creara una estructura de carpetas dentro de la carpeta ````functions```` que creamos.

<img width="640px" height="260px" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-03-24-firebase-functions%2Ffirebase-functions-init.png?alt=media&token=bb5d09b6-ccb1-40d3-8e7b-57696536dc74">

Una pocas cosas para tener en cuenta:

* Es un entorno de Node.js, lo que significa que puede ejecutar ````npm install --save package_name```` y usar cualquier paquete que tu quieras en tus funciones.
* Todas tus funciones necesitan ser creadas y exportadas dentro del ´´´´index.js````
* Esto viene con 2 paquetes instalados e importado:

```js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
```

````firebase-functions```` hace referencia a el SDK de CF para Firebase, para cuando tengamos que escuchar la autenticacion o los cambios en la base de datos.

y el ````firebase-admin```` hace referencia a el ADMIN SDK de Firebase, para cuando tengamos que escribir y/o leer de la base de datos, Crear Usuarios y más.

Presta especial atención a esta linea.

```js
admin.initializeApp(functions.config().firebase);
```

Si has prestado atención anteriormente, la función ````.initializeApp()```` inicia nuestra App, igual que cuando nosotros usamos el JS SDK de AngularFire2 en nuestras Apps, y le estamos pasando a esta ````functions.config().firebase```` que ya tiene todos los keys/secrets del API para conectar nuestra APP, todo debido a que usamos el CLI para ingresar.

Ahora es tiempo de escribir nuestra primera función (esto fue realmente muy excitante de ejecutar y ver los cambios en la base de datos pasando sin mi escribiendo nada a ella ), nosotros vamos a escribir una función llamada ````createClientAccount()````.

La función escuchara a la base de datos, para acceder la base de datos desde CF nosotros tenemos las funciones de la base de datos en ````functions.database````, y tendremos que escuchar a un nodo especifico.

```js
exports.createClientAccount = functions.database.ref('/userProfile/{userId}/clientList/{clientId}');
```

justo ahi hemos creado una referencia a la base de datos en el nodo.

```
'/userProfile/{userId}/clientList/{clientId}'
```

Una cosa importante para tener en cuenta, es que las referencias a la base de datos dentro de CF acepta comodines, asi que la referencia, ````{userId}```` y  ````clientId```` son comodines, eso significa que:

```
'/userProfile/javebratt/clientList/client1'
'/userProfile/javebratt/clientList/client2'
'/userProfile/another_weird_id/clientList/client54'
'/userProfile/another_weird_id/clientList/client49'
```

Todos estos van a encontrar la referencia a la base de datos, y dentro de la función, vamos a ser capaz de capturar todos estos valores.

Ahora necesitaremos disparar nuestra función, y esto puede parecer familiar para ti, tu sabes que nosotros tenemos varios activadores para los escuchas en nuestras apps, especialmente cosas como ````.on()````o ````.once()````, para CF nosotros también tenemos disparadores para escuchar la base de datos, nosotros tenemos uno llamado ````.onWrite()```` que se disparara cuando alguién escriba en un nodo de la base de datos. Asi que nuestra función se vera como esto:

```js
exports.createClientAccount = functions.database
  .ref('/userProfile/{userId}/clientList/{clientId}').onWrite( event => {
  // We'll handle all the logic here
  });
```

Eso es una función activa, listo para escuchar al nodo de la base de datos y ejecutar cada vez que alguién escribe datos ahi (este también se disparara cuando se actualice o borre ese nodo, ya que borrar un nodo es basicamente hacer ````.set(null)````).

La primera cosa que debemos hacer es crear el nuevo usuario, para eso, vamos a utilizar el firebase admin, un consejo rapido que deberias entender sobre el Admin SDK, es que es exactamente la misma cosa que es JS SDK, solo que debes anteceder todo con ````admin.````. en lugar de ````firebase.````, asi que si en el JS SDK normalmente hacemos:

```js
firebase.auth().createUser(credentials);
```
en el admin SDK haremos:

```js
admin.auth().createUser(credentials);
```

Asi, que adelante crea una nueva cuenta de usuario:

```js
exports.createClientAccount = functions.database
    .ref('/userProfile/{userId}/clientList/{clientId}').onWrite( event => {

  return admin.auth().createUser({})
    .catch( error => { console.log("Error creating new user:", error); });
});
```

Nosotros queremos pasar algo de información a la función `createUser()`, tu no necesitaras realmente que hacer nada, pero si tu envias este en blanco este creara una cuenta anonima, y entonces este sera un dolor de cabeza al tratar de linkear nuestras cuentas de usuario.



Vamos a pasar varios valores, si nosotros queremos:

* El UID, No estamos apuntando a obtener uno de los UIDs automaticos de Firebase (User id) vamos a pasar nuestro propio UID, el cual Firebase crea como un ID dentro del nodo de la base de datos:

```
'/userProfile/{userId}/clientList/{clientId}'
```

Asi que vamos a tomar el `clientId` y lo vamos a pasar a la funcion como el UID, también pasaremos el email del cliente como el username/email para la autenticación, estamos pasando el nombre del cliente al objeto del usuario y vamos a crear una contraseña temporal.

Te puedes estar preguntando, pero jorge, donde diablos se esta obteniendo el email y el nombre? y te tengo grandes noticias, El CF SDK puede acceder toda la información dentro del nodo `'/userProfile/{userId}/clientList/{clientId}'`, esta disponible en la variable `event` que la función `onWrite()` retorna, asi que nuestra funcion se vera algo asi:

```js
exports.createClientAccount = functions.database
  .ref('/userProfile/{userId}/clientList/{clientId}').onWrite( event => {

  return admin.auth().createUser({
    uid: event.params.clientId, 
    email: event.data.val().email,
    password: "123456789",
    displayName: event.data.val().fullName 
  })
  .catch( error => { console.log("Error creating new user:", error); });
});
```

Note como estamos accediendo la información en 2 maneras distintas, vamos a obtener acceso a los comodines a través de la interfaz `event.params`, asi en algún punto, podremos hacer `event.params.clientId` y obtendremos el ID de cliente actual y asi lo configuramos como el nuevo ID del usuario.

y los datos dentro del objeto es disponible via la interfaz `event.data`, asi que nosotros tendremos acceso al correo electronico, el nombre completo, y aún el peso inicial a través `event.data.val().property_name`

y eso eso es, todo lo que tendremos que hacer ahora es desplegar nuestras funciones a los servidores de Firebase y *Boom*, cada vez que un entrenador crea un nuevo registro de un cliente en la base de datos, disparara CF.

Antes de desplegar esto, quiero estar seguro que yo te de unos consejos para hacer tu vida mas facil, y asegurarme que funcionen.

## Los Cloud Functions pueden morir. 

Yup, ellas pueden morir sin ser completadas, los servidores pueden matar las funciones ociosas, para evitar eso nosotros necesitamos estar seguro que estamos devolviendo una promesa, Cuando tu retornas una promesa en Javascript al CF, esa función se mantiene hasta que la promesa es resuelta o rechazada, de esa manera CF evita matar tu función hasta que se complete exitosamente o falle con un error.

## Evita ciclos infinitos a todo costo.

Esto es algo a lo que debes prestarle especial atención, ejecutar un ciclo infinito, que podria haber ocurrido (y en realidad lo hizo ) si yo hubiera decidido despues de crear el usuario, guardar algo de información sobre el usuario dentro de el nodo de los entrenadores `clientList`?

Este habria disparado la función de nuevo, el resultado deberia haber invocado la llamada de la función, y esto deberia haberse ejecutado en un ciclo infinito.

esta fue la razón por la cual decidi agregar un `uid` personalizado en lugar de dejar a Firebase crear este, mi idea original fue crear el usuario y entonces escribir el `uid` del usuario para reemplazar el ID del cliente y el nodo del perfil del entrenador. Si yo hubiese seguido ese camino, entonces cuando la función cambiara el ID en el nodo de los entrenadores este se deberia haber disparado a el mismo de nuevo.

## Desplegando tu CF a Firebase.

Ahora viene la parte divertida, vamos a desplegar nuestras funciones a los servidores de Firebase asi que este pueda realmente trabajar,  esa es la parte facil, todo lo que necesitas hacer es abrir tu terminal, recuerda que debes estar dentro de la carpeta donde creaste las funciones.  

```
$ firebase deploy --only functions
```

entonces presta atención a tu terminal, esta te dejara saber si tus funciones fueron cargadas exitosamente o fallaron por algun error de sintaxis.

Asi que, que piensas sobre CF para Firebase? es algo que usaras? Dejame saberlo.

Ver el post [original en ingles](https://javebratt.com/firebase-cloud-functions/).
 

