---
layout: post
title: "Folder Browser para Android"
keywords: "Folder Browser, explorador de archivos, sd card, archivos, memoria externa, ionic"
date: 2017-10-12
tags: [tutorial, folderbrowser, android, file, ionic]
categories: ionic2
author: Darkensses
repo: "https://github.com/Darkensses/IonicFolderBrowser"
launcher: "https://ionic-charts.firebaseapp.com/#/bar-horizontal"
cover: "https://firebasestorage.googleapis.com/v0/b/articulos-darkensses.appspot.com/o/FolderBrowserAndroid_Cover.png?alt=media&token=5f0e1647-a4fc-4986-9be4-dd8bc49c55d3"
editname: "ionic2/2017-10-12-folder-browser-para-android.md"
versions:
  - title: 'ionic'
    number: '3.9.2'
  - title: 'ionic-native'
    number: '4.2.1'
  - title: 'ionic-app-scripts'
    number: '2.1.4'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.9.2'
---

¡Saludos! Este será mi primer artículo en el cual aprenderemos a hacer un buscador de carpetas y seleccionar alguna de ellas, con la finalidad de que en tu app puedas utilizar el path completo para cargar contenido.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/articulos-darkensses.appspot.com/o/FolderBrowserAndroid_Cover.png?alt=media&token=5f0e1647-a4fc-4986-9be4-dd8bc49c55d3" alt="charts"></amp-img>

{% include general/net-promoter-score.html %}

Desde hace un tiempo se me ocurrió la idea de hacer un player de música con Ionic (me gusta muchísimo escuchar música y soy fan de los players) y si se han dado cuenta, la mayoría de los players que existen para móviles nos piden seleccionar una carpeta para escanear el contenido y así mostrar las canciones que tenemos. 

Había estado investigando y buscando un tutorial por todo internet sin embargo, los que encontraba eran para Ionic v1 y prácticamente no había nada para versiones más recientes. 

Mientras hurgaba en diferentes páginas, me topé con el plugin de [OurCodeBlog](https://docs.ourcodeworld.com/projects/cordova-our-code-world-file-browser){:target="_blank"} que esta genial y todo eso, pero realmente quería armar uno *‘a mano’* sin nada de plugins de terceros y así crear este mini-tutorial para que más personas que se les ocurra la misma idea pero que no saben cómo empezar puedan realizarlo.  

Así que tomé la documentación de Ionic y pregunté en grupos hasta dar con el resultado :) pero mejor pasemos al código que de verdad estoy muy emocionado.


## Preparando el entorno

Empezamos nuestro proyecto, añadimos la plataforma de Android y entramos en él:

```
ionic start FolderBrowser blank
ionic cordova platform add
cd FolderBrowser
```

Como vamos a andar de curiosos por los directorios de nuestro dispositivo, hay que agregar el plugin file que nos permite navegar por nuestras carpetas y si lo queremos, hasta crear y eliminar archivos:

```
ionic cordova plugin add cordova-plugin-file
```

Creamos una nueva página para visualizar las carpetas del directorio que seleccionemos y lo mostraremos como un bonito y práctico modal:

```
ionic g page FolderModal
```


## Manos al teclado

Abrimos nuestro proyecto con nuestro editor favorito (yo usé VS Code) y abrimos app.module.ts para importar el plugin y la nueva página que generamos. Aquí solo hay que agregar lo que corresponde.

```ts
//Página para mostrar las carpetas
import { FolderModalPage } from './../pages/folder-modal/folder-modal';

//Plugin File
import { File } from '@Ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FolderModalPage //Añadimos la página
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FolderModalPage //Añadimos la página
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File, //Añadimos el plugin
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
```

**[IMPORTANTE]: Si tienes problemas con el plugin file (Cannot find module '@Ionic-native/file') puedes arreglarlo escribiendo estos comandos en la consola:**

```
ionic cordova plugin remove cordova-plugin-file
npm install --save @ionic-native/core
npm install --save @ionic-native/file
ionic cordova plugin add cordova-plugin-file
```

Llevamos buen ritmo, así que vamos a diseñar la vista principal de nuestra app. Para ello vamos a nuestro home.html (src/pages/home/home.html). Ahí cambiaremos el título, lo centramos y le daremos algo de color para que de una buena impresión.

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title text-center>
      Folder Browser
    </ion-title>
  </ion-navbar>
</ion-header>
```

Continuando en home.html, añadimos unos botones dentro de un list. A los botones les agregamos el atributo de ion-item y sólo al primer botón le agregamos el evento click que desencadenará la función showModal() que abrirá el Modal. El segundo botón es genérico, no hará nada, lo ponemos para que la vista no se mire tan vacía.

```html
<ion-content>
  <ion-list>
    <button ion-item (click)="showModal()">Select Folder</button>
    <button ion-item>Generic Button</button>
  </ion-list>
</ion-content>
```

Ahora abriremos home.ts para darle la funcionalidad a la vista.  Primero agregamos agregamos ModalController y ToastController para poder utilizar las funciones de los Modal y Toast.
Posteriormente importamos FolderModalPage que es la página que agregamos para mostrar las carpetas y ponerlo en un modal. La importamos porque la llamaremos desde nuestro home y necesitamos la referencia.
Después, al constructor le añadimos el ModalController y ToastController:

```ts
import { ModalController, ToastController } from 'ionic-angular';
import { FolderModalPage } from '../folder-modal/folder-modal';
...
constructor(public modalCtrl: ModalController, public toastCtrl: ToastController) {
    
}

```

A continuación, escribimos los métodos de showModal y presentToast.
El de showModal nos sirve para cargar la página de FolderModal y mostrarlo en un modal. Dentro del método declaramos una variable a la cual le asignaremos un objeto ModalController que se crea mandando como parámetro FolderModalPage. En otras palabras, estamos creando el modal indicando que página o vista queremos mostrar.
Luego, cuando el modal se cierre recibiremos cierta información (el path de la carpeta seleccionada) y mostraremos esa información en un toast. Si la data es undefined quiere decir que no se seleccionó ninguna carpeta y no hay que mostrar ningún toast.
Al final del método mostramos el modal.

```ts
showModal(){
    let modal = this.modalCtrl.create(FolderModalPage);    
    modal.onDidDismiss(data => {
        if(data != undefined) this.presentToast('Folder selected: ' + data,'bottom');
    });

    //Mostramos el modal
    modal.present();
}
```

El método de presentToast está en la [documentación de Ionic](https://ionicframework.com/docs/api/components/toast/ToastController/){:target="_blank"}, aquí solo lo personalizamos recibiendo como parámetros el mensaje y la posición del toast.

```ts
presentToast(msg:string, pos:string) {
    let toast = this.toastCtrl.create({
        message: msg,
        duration: 6666, //666 the number of the beast
        position: pos
    });
    toast.present();
}
```

Ahora pasaremos a la parte más importante del proyecto: la página que cargará las carpetas.

Esta parte fue la que más me gustó hacer. Diseñar la vista podría decirse que fue relativamente sencillo, sin embargo, en donde tuve algunos problemas fue a la hora de crear los métodos para obtener las carpetas. De hecho, al llegar a este punto y no avanzar empecé a preguntar en grupos y foros que me dieron respuestas muy buenas, pero las implementé hasta después de 1 mes (jaja) más que nada por falta de tiempo, ya que mi semana se va entre la universidad y el trabajo. 

El que persevera alcanza, y después de desempolvar el historial de navegación y los marcadores con las respuestas pude dar con el resultado deseado, pero apareció otro problema…. El buscador avanza de carpeta en carpeta ¿Cómo lo hago regresar hasta volver a la raíz? 

Así es este mundo de código, todo es alegría y risas hasta que notas que hace falta agregar algo y las cosas se ponen más intensas cuando tu cabeza se queda estancada y no ves cómo dar con una buena solución. Entonces decidí juntar a mi equipo (Ad Honorem) y ponerlos al tanto. Me dieron código y consejos muy buenos, en especial el de poner el proyecto en stand by unos días para despejar y descansar la mente. Y así fue, recién fui a la peluquería y mientras estaba sentado dejando que el peluquero hiciera su trabajo mientras platicaba conmigo, pude unir las ideas que mi equipo me dio y en cuanto salí de ahí me puse a codear antes de olvidarlo. *¡TA DA!* El buscador estaba completo y solo restaba ponerlo ‘presentable’.


Pero basta de salirnos de contexto. Abrimos folder-modal.html y modificamos la parte del título para que se muestra la carpeta en donde estamos situados, además añadiremos un botón en la parte derecha que servirá para cerrar el modal.

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title text-center>
   
    </ion-title>

    <ion-buttons end>
    	<button ion-button (click)="closeModal()">Close</button>
    </ion-buttons>
  </ion-navbar>
</ion-header>
```

En nuestro content, mostraremos las carpetas en forma de lista teniendo en cuenta que al principio de esta habrá un botón que nos permitirá regresar a la carpeta padre de donde estemos situados, siempre y cuando no estamos en la raíz (sí lo estamos entonces lo ocultamos).

Esto lo logramos con ```*ngIf="parent.length > 0"```. El objeto parent es un arreglo que guarda el path de las carpetas padre y va sacando del arreglo los path según retrocedamos hasta llegar a la raíz, y con esta instrucción nos permite tener control para así mostrar u ocultar el botón.
El botón cuenta con su evento click que llamará al método clickParent.

Luego mostraremos a la carpetas como ‘items slidings’ (ion-item-sliding). Esto lo obtendremos mediante un *ngFor, dependiendo del número de sub-carpetas que existan dentro de una carpeta.
Añadimos un botón como ion-item con su evento click que llamará al método clickFolder, y mostraremos el nombre de la carpeta en el botón.

Para terminar nuestro ‘item sliding’ agregamos un ion-item-options y dentro un botón que llamará al método selectFolder. Mostraremos un icono de check y la leyenda ‘Select’ en el botón. Así tendremos que deslizar el elemento de la lista para visualizar la opción lo cual hará que nuestra app tenga un aspecto más elegante.

```html
{ %raw% }
<ion-content>
  <ion-list>
    <button ion-item *ngIf="parent.length > 0" (click)="clickParent()">
      <ion-icon name="arrow-dropup"></ion-icon> Up to {{parent[0] == '' ? 'Root' : parent[0]}}
    </button>
    <ion-item-sliding *ngFor="let folder of folders">
      <button ion-item  (click)="clickFolder((folder))">
        <ion-icon ios="ios-folder" md="md-folder"></ion-icon>
        {{folder}}
      </button>  
      <ion-item-options side="right">
        <button ion-button color="secondary" (click)="selectFolder(folder)">
          <ion-icon name="checkmark"></ion-icon>            
          Select
        </button>
      </ion-item-options>
    </ion-item-sliding>	
  </ion-list>
</ion-content>
{ %endraw% }
```

Estamos por terminar. Nos pasamos a folder-modal.ts e importamos ViewController, ToastController, File e instalamos el plugin diagnostic *(que más adelante analizaremos)*. Recuerden agregarlos en el constructor. 

```ts
import { ViewController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { File } from '@Ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';
```

En nuestra clase usaremos 4 objetos:

-folders (arreglo): *almacenaremos las carpetas que estén en un directorio.*

-path (string): *se concatenará con la ruta según naveguemos.*

-basePath (string): *guarda el path de la sd card.*

-baseFileSystem (string): *se encarga de guardar la base del path (se puede tomar de this.file.\*).*

-parent (arreglo string): *almacenaremos el path antes de entrar a otra carpeta para poder regresar un nivel arriba.*

En el constructor vamos a asignarle a baseFileSystem la cadena *‘file:////’* ya que todo el sistema de archivos parte de aquí. 

Luego mostraremos un loader tomado de la [documentación de Ionic](https://ionicframework.com/docs/api/components/loading/LoadingController/) para que se vea más genial nuestra aplicación al momento de mostrar las carpetas. Entonces aquí viene algo muy importante: hay que solicitar **permisos** para acceder a la sd sin ningún problema y, de hecho, esto nos servirá por si en un futuro queremos eliminar archivos o carpetas.  
Para ello hay que hacer uso del plugin [Diagnostic](https://github.com/dpa99c/cordova-diagnostic-plugin), el cual nos da funcionalidades nativas sobretodo para solicitar **permisos** y obtener algunas **direcciones del sistema de archivos** de Android tales como el extenal storage, cache, entre otras.

Cuando ejecutemos la app y cargue el modal, aparecerá un cartel solicitando los permisos.

<amp-img width="360" height="640" src="https://firebasestorage.googleapis.com/v0/b/articulos-darkensses.appspot.com/o/FolderBrowserAndroid_Screenshot_20171011-232039.png?alt=media&token=77268a2a-a6d8-4fc7-b110-fc54d8a82567" alt="charts"></amp-img>

Dentro de este método vamos a obtener el path de la SD que tenga insertada el dispositivo. Este path varía en cada teléfono, así que lo solucionamos creando el método getSD *(que retorna una promesa y que iremos a más detalles en un poco más)*, el método nos regresa el path que asignaremos a nuestro this.basePath y entonces se lo mandamos como parámetro al método listDir para que nos muestre las carpetas. 

Asignamos this.basePath a this.Path (solo para asegurarnos) y cerramos nuestro loader.

```ts
constructor(public viewCtrl: ViewController, public file: File, public diagnostic: Diagnostic, 
              public modalCtrl: ModalController, private toastCtrl: ToastController,
              public loadingCtrl: LoadingController) { 
    
    this.baseFileSystem='file:///';

    this.presentLoadingDefault();

    this.diagnostic.requestExternalStorageAuthorization().then((status) => {
        console.log("Authorization request for external storage use was " + (status == this.diagnostic.permissionStatus.GRANTED ? "granted" : "denied"));
        this.getSD().then((basePath) => {
        this.basePath = basePath.toString() + '/';
        this.listPath(this.basePath);
        this.path = this.basePath;
        this.loading.dismiss();
        });
    });
        
}  
```

Tranquilos. Estamos a más de la mitad del camino. Mantengamos el ritmo.

Muy bien, ¿recuerdan que en el constructor usamos el método **getSD**? Ha llegado la hora de examinarlo…

getSD no recibe ningún parámetro y además retorna una promesa *(promise)* lo cual nos da algunas ventajas como por ejemplo el uso de **asincronía** y **espera** (**async** y **await** respectivamente). Esto nos ayuda para asegurarnos de que this.basePath tenga la ruta correcta y no cambie de valor *‘sin que nosotros nos demos cuenta’*.

{% include blog/subscribe2.html %}

Ahora lo que haremos será usar el método **getExternalSdCardDetails** que nos brindará información sobre nuestra tarjeta sd. Aquí trabajaremos con ‘details’ y desde ya, debes de saber que es un arreglo, por lo que hay que validar en caso de que el arreglo este vacío, ya que si es así quiere decir que no se encontró una sd en el teléfono y entonces hay que usar el path del externalStorage, es decir de la memoria interna. 

**NOTA: externalStorage es diferente del path de la sd.**

Si el arreglo no está vacío entonces la ruta de nuestro sd se encuentra por ahí (generalmente en el index 0) por lo que recorremos el arreglo y obtenemos el path preguntando sí en el objeto en el que estamos iterando, en su propiedad type tiene el valor de ***‘root’***, si es así entonces hemos encontrado el path de la sd. 

Almacenamos el path en la variable p que declaramos dentro del método para devolverla en la promesa del método y poderla utiliza.

Noten que tanto en la parte en donde el arreglo este vacio *(y tenemos que regresar el path de la memoria interna)*, como en donde regresamos el path de nuestra sd, se hace uso de **‘resolve’** y dentro de lo paréntesis hacemos malabares con la cadena para darle el formato adecuado y así obtener nuestro path, mismo que lo usamos dentro del constructor y que se lo mandamos al listPath para que al cargar el modal nos situé en la ruta especificada.

```ts
getSD(){
    let p:string = '';    
    return new Promise((resolve) => {

      this.diagnostic.getExternalSdCardDetails().then((details) => {
        if(details.length == 0){
          this.curFold.unshift('Internal Storage');
          resolve(this.file.externalRootDirectory.replace('file:///','').slice(0,-1));
          return;
        }
        for(let detail of details){
          if(detail.type === "root"){
            p = detail.filePath.replace('file:///','');   
          }
        }              
        this.curFold.unshift('SD Card');
        resolve(p);
      }).catch((error) => {
        console.log(error);      
      });

    });     
} 
```

El método listPath recibe como parámetro la ruta del directorio a donde queremos entrar. De inmediato vaciamos el arreglo de folder pues las carpetas que teníamos antes de entrar a una sub-carpeta, dejan de ser de nuestro interés. 

Invocamos el método del plugin file. Le mandamos *‘file:////’* y *dirName* (que es nuestra variable path). Mediante una función lambda mandamos un objeto Entry[] en el que se llama a ‘result’ y con un ciclo buscamos las carpetas que estén en él. 
Sí un elemento es un directorio entonces agregaremos el nombre del elemento al arreglo folders.
Para manejar las excepciones lo hacemos con un catch y la mostramos con un toast.

```ts
listPath(dirName:string){
    this.folders = []; 
    this.file.listDir(this.baseFileSystem, dirName).then((result)=>{
      
      for(let file of result){
        if(file.isDirectory == true){
          this.folders.push(file.name); 
          
        }
      }
      this.folders.sort();
    }).catch((error)=>{
      console.log(error);
      this.presentToast("Error al cargar " + dirName + ": " + error, "bottom");
    });  
    
}
```

Para movernos dentro de las carpetas creamos el método clickFolder que también recibe como parámetro el nombre de la carpeta. 
Aquí lo primero por hacer es meter al arreglo de curFold la carpeta en donde estábamos situados antes de dar click y colocarlo con unshift al inicio del arreglo y así trabajarlo como una pila y asi mostrar el nombre en la vista y que el usuario sepa a que carpeta entró. Con parent es algo similar, solo que lo que se almacena en el arreglo es toda la dirección de la carpeta que se usará para cuando regresemos. Entonces, toca el turno de actualizar el path agregando la ubicación de donde estamos situados (¿ya la captas? Primero guardamos la dirección anterior y luego la remplazamos cuando volvemos a dar click y así hasta que no existan más carpetas por avanzar) y llamamos al método listpath mandándole el path de la carpeta en donde estamos.

```ts
clickFolder(dirName:string){
    this.curFold.unshift(dirName);
    this.parent.unshift(this.path); 
    
    this.path = this.path + (dirName == this.basePath ? this.basePath : dirName +'/');   

    this.listPath(this.path);
}
```

Ahora, el método que usaremos cuando queremos regresar o subir un nivel de la carpeta en donde estamos se llama ClickParent. No recibimos ningún parámetro y aquí haremos dos cosas: 

1. Como subimos un nivel habrá que actualizar el path, sacando del arreglo ***parent*** al primer elemento ya que es la carpeta padre de donde estamos, siempre y cuando el arreglo no quede vacío pues al llegar a este punto significa que estamos en la raíz de nuestra sd (o memoria interna) y ya no podemos subir o regresar.
2. Listamos las carpetas de la carpeta padre y de paso validamos.

```ts
clickParent(){
    this.path = this.parent.length > 0 ?  this.parent.shift() : this.basePath;
    this.curFold.shift();
    
    this.listPath(this.path != undefined ? this.path : this.basePath);
}
```

Solo resta escribir tres métodos más (en realidad son cinco pero uno de ellos es el de presentToast que ya lo hicimos más arriba y el otro es para cuando se cierre el loader).  

¿Recuerdan el botón que se mostrará al deslizar una carpeta en la lista?, este llamará a **selectFolder** y recibirá el nombre de la carpeta que seleccionamos. Dentro, vamos a actualizar el path para mandarlo y mostrarlo en la otra vista (home) y en la siguiente línea cerramos nuestro modal.

Al cerrar, invocamos al método onDidDismiss que a su vez invoca a dismiss y es aquí en donde enviamos el path.

¿Y el botón de Cerrar? No lo he olvidado. El método se llama closeModal y aquí solo hay que mandar llamar a dismiss pero no enviaremos nada.

```ts
selectFolder(dirName:string){
    this.path += (dirName == this.basePath ? this.basePath : dirName +'/');

    this.onDidDismiss();
}

onDidDismiss(){
    this.viewCtrl.dismiss(this.path);
}

closeModal(){  	
  	this.viewCtrl.dismiss();
}

presentToast(msg:string, pos:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: pos
    });
  
    toast.present();
}

presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();
}
```

## ¡A PROBAR!

Antes de ponermos a escribir en la consola hay que poner los pies en la tierra y darnos cuenta de que no nos bastará con *ionic serve* ya que no estamos en un dispositivo móvil. 

Asi es... ¡vamos a emular! Pero primero habrá que hacer unos ajustes, algo casi de magia negra (literalmente) para evitar lo que llamo [***El problema de la línea 202.***](https://forum.ionicframework.com/t/error-cannot-read-property-replace-of-undefined-android/93297/11){:target="_blank"}

<amp-img width="992" height="559" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/articulos-darkensses.appspot.com/o/error202.PNG?alt=media&token=0a5daaa6-1d33-4da2-86a9-fda5034f46ef" alt="charts"></amp-img>

En nuestro proyecto nos dirigimos a la carpeta de platforms, luego a Android, abrimos cordova y finalmente entramos a lib (platforms/Android/cordova/lib). Aquí abriremos el archivo **emulator.js** y bajamos exactamente a la línea 202. Déjala como a continuación se muestra (nota que comenté el código que está ahí, no borres ni hagas nada más, a menos que sepas lo que estás haciendo)

```js
var num = target.match(/\d+/)[0];//target.split('(API level ')[1].replace(')', '');
```

En config xml agregamos los permisos para poder usar el almacenamiento externo:

```xml
<preference name="AndroidPersistentFileLocation" value="Compatibility" />
<preference name="AndroidExtraFilesystems" value="files,files-external,documents,sdcard,cache,cache-external,assets,root" />
<platform name="android">
    ...
    <config-file parent="/*" target="AndroidManifest.xml">
            <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
            <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        </config-file>
</platform>
```

Y borramos la siguiente línea:

```
<allow-navigation href="http://ionic.local/*" />
```

Guardamos los cambios y ahora sí en consola escribimos:

```
ionic cordova emulate Android --livereload
```

Con la bandera de livereload estaremos viendo los cambios en tiempo real. Si todo va bien, podrás ver que se inició el emulador de Android y se lanzará la app. 


Sin embargo, tal vez quieres hacer algo de debug y quieras usar el console.log para mostrar algo de lo que está sucediendo… para ello está Google Chrome que nos facilita la vida (Es la opción que uso). 
Haz build para generar el apk e instala la app en el dispositivo. Conecta tu teléfono a la computadora y abre Google Chrome.  En la barra de navegación escribe [chrome://inspect/#devices](chrome://inspect/#devices){:target="_blank"} y aprecerá el emulador con el icono de Ionic, entra y podrás ver tanto la app en ejecución como la consola. 
Yep, a eso se le llama comodidad.

---

Hemos llegado al fin de este tutorial ¡Que bien que hayas llegado hasta aquí! Si no estás seguro de haber puesto el código en el lugar correcto, no te preocupes, puedes clonar el repositorio de github.

Yo me he divertido bastante haciendo esta app y escribiendo el artículo, espero que ustedes también y también espero estar haciendo otro muy pronto de nuevo. 

>Ad Honorem, ¡gracias! como siempre puedo contar con ustedes.





















