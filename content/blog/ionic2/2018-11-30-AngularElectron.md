---
layout: post
title: "App para escritotio con Angular y Electron"
keywords: "angular, electron"
date: 2018-12-03
tags: [angular, electron]
categories: angular
author: jheisonAlzate
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-30-AngularElectron%2Fcover.png?alt=media&token=79d1473a-73d9-468f-97c6-51712c6f471a"
---

> Al día de hoy es muy sencillo generar aplicaciones que con un mismo código se ejecuten en múltiples plataformas, esto se logra gracias al poder de javascript y de herramientas como Ionic y la que veremos el día de hoy que es Electron.
<!--summary-->

<img width="1024" height="512" class="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2018-11-30-AngularElectron%2Fcover.png?alt=media&token=79d1473a-73d9-468f-97c6-51712c6f471a">



Lo que haremos sera generar ejecutables para Windows o Mac de aplicación desarrollada con Angular.
ok, comencemos...

# Paso 1: Aplicación en Angular

Debemos tener o crear un proyecto en Angular como lo hacemos comúnmente:


```
ng new electron-classroom
```

y luego movernos al directorio:

```
cd electron-classroom
```

# Paso 2: Instalar electron

Ahora desde la terminal adicionaremos el paquete de Electron, escribiendo:

```
npm install electron --save-dev
```

# Paso 3: Archivo main

Luego en la raíz de nuestro proyecto en Angular, crearemos un archivo llamado main.js, y debe contener el siguiente código:

```js
const {app, BrowserWindow} = require('electron') //importamos lo necesario para trabajar ocn electron
const path = require('path')
const url = require('url')

let win; // esta variable tendrá el contenido de nuestra ventana de aplicación

function createWindow () { //aqui procedemos a crear la ventana
  win = new BrowserWindow({width: 800, height: 600}) //definimos un alto y ancho en el que s einicializará nuestra aplicación

  // le pasamos como ruta el archivo index que se genera luego de ocmpilar nuestra aplicación de Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/electron-classroom/index.html'), //esta es la ruta de nuestro index luego de compilar en Angular
    protocol: 'file:',
    slashes: true
  }))

//esto se dispara cuando cerremos la ventana, igualamos win en null para liberar memoria
  win.on('closed', () => {
    win = null
  })
}

//cuando la aplicación este lista llamamos al metodo que definimos arriba para crear la ventana
app.on('ready', createWindow)


app.on('window-all-closed', () => {
  // process.platform contiene el nombre del sistema operativo (darwin == mac, win32 == windows)
  if (process.platform !== 'darwin') { // con esto le decimos que tenga un proceso natural para una aplicación nativa al momento de cerrar la ventana
    app.quit()
  }
})

//aqui nos aseguramos de que cuando la ventana se active no sea nula, para esto llamamos al metodo que se encarga de crear la ventana
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
```



# Paso 3: Configuración en el package.json

Debemos modificar el package.json de nuestra aplicación en Angular, para que reconozca el archivo main.js que acabamos de crear; Y adicionalmente para que identifique en la consola el comando que empaqueta nuestra aplicación de Angular en Electron. Adicionamos lo siguiente:

```js
{
  ...

  "main": "main.js",  
  "scripts": {
    ...

    "electron": "ng build && electron .",
    "electron-aot": "ng build --prod && electron .",
    ...
  },
  
  ...
}
```

Básicamente utilizaremos el comando de "electron-aot", si deseas ver en detalla lo que es AOT en angular, te invito a que veas este fantástico vídeo: https://www.youtube.com/watch?v=1iQoDKRzp_g que realizo nuestro compañero Nicolás Molina


# Paso 4: Modificando la ruta base

Por defecto en Angular tenemos en nuestro index.html la ruta base definida como:

```html
...
<base href="/">
...
```

Debemos modificarla para que quede de la siguiente manera:

```html
...
<base href="./">
...
```

# Paso 5: Ejecutando nuestra app

Ahora que ya tenemos todo configurado, procedemos a ejecutar en la terminal el siguiente comando:

```
npm run electron-aot
```

Esto lanzará la aplicación en una ventana nativa de nuestro sistema operativo. Sin embargo, la aplicación estará en "modo debug"

<img width="470" height="368" class="responsive" src="/images/posts/ionic2/2018-11-30-AngularElectron/electron1.jpeg">


# Paso 5: Generar ejecutables

Bien ahora sigue generar archivos ejecutables para Windows y para mac.

Para esto necesitamos utilizar electron electron-packager, y lo instalamos en nuestro equipo ejecutando el siguiente comando en la terminal:


```
sudo npm install electron-packager -g
```

Para crear un ejecutable para windows, escribimos en la terminal estando ubicados en nuestro proyecto de Angular:


```
electron-packager ./ electron-classroom --platform=win32 --icon src/favicon.ico
```

Esto genera un directorio con el ejecutable y todas las librerias necesarias (.dll)

Y para generar el ejecutable para mac (es importante tener en cuenta que el icono para esta plataforma debe tener una extensión .icns, para ello podemos ocupar un convertidor de imagenes online):

```
electron-packager ./ electron-classroom --platform=darwin --icon src/favicon.icns
```

Resultado:

<img width="470" height="368" class="responsive" src="/images/posts/ionic2/2018-11-30-AngularElectron/electron2.jpeg">

Eso ha sido todo, espero que te sea de utilidad