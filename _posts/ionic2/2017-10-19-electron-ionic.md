---
layout: post
title: "Construyendo Apps de Escritorio con Ionic."
keywords: "electron,ionic"
date: 2017-10-19
tags: [electron,ionic]
categories: ionic2
author: carlosrojas
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-16-electron-ionic%2FCreando%20Apps%20de%20Escritorio%20con%20Ionic.png?alt=media&token=1bc1512f-dc7a-4fd2-9eea-0780250b8ea0"
editname: "ionic2/2017-10-19-electron-ionic.md"
repo: https://github.com/ion-book/electron-ionic
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
  - title: 'electron'
    number: '1.7.9'
---
> Una de las principales de utilizar componentes como los que trae Ionic y ademas utilizar tecnologias estandar como HTML/CSS/JS es que puedes utilizar el mismo proyecto para distribuir de diferentes maneras como en este caso App de escritorio.

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-10-16-electron-ionic%2FCreando%20Apps%20de%20Escritorio%20con%20Ionic.png?alt=media&token=1bc1512f-dc7a-4fd2-9eea-0780250b8ea0" alt="charts"></amp-img>

{% include general/net-promoter-score.html %}

En esta oportunidad vamos a entender que es electron y como lo podemos combinar con Ionic para poder distribuir nuestras Apps en las tiendas de APPs para escritorio como la Mac App Store o la Windows Store.

## ¿ Que es electron ?

Electron es una tecnologia que convierte tu proyecto Web HTML + CSS + JS para ser instalada en sistema operativos de escritorio ( Windows, OS X, etc ), puedes entenderlo como Cordova (Que hace posible que podamos instalar en Android e IOS ) pero para el escritorio.

El sitio oficial dice que es...

<blockquote>
Electron es un framework para crear aplicaciones nativas con tecnologias Web como HTML, CSS y Javascript. El se encarga de las partes dificiles mientras tu te enfocas en el nucleo  de tu aplicación.
</blockquote>

## Conectando Ionic y Electron.

Para poder avanzar con nuestro proyecto debemos tener nuestras dos tecnologias conectadas para eso vamos a utilizar Node y Webpack que ya estan en Ionic y agregaremos Electron para que desarrollar sea facil.

1) Crear un Proyecto de Ionic.

````

$ionic start myapp
$ionic serve

````

2) Instalar las dependencias de electron en nuestro proyecto.

````
npm install electron electron-builder foreman --save-dev
````

3) Abre tu package.json y agrega los campos ```main```,```config``` y ```build```.

````
"main": "electron/electron.js",
  "config": {
    "ionic_bundler": "webpack",
    "ionic_webpack": "./config/webpack.config.js"
  },
  "build": {
    "appId": "com.lohanitech.ionic-electron-test",
    "electronVersion": "1.7.5",
    "asar":false,
    "files": [
      "www/**/*",
      "electron/*"
    ]
  }
````

4) Crea un directorio llamado config sobre la raiz de tu proyecto.

5) Crea un archivo de configuración webpack.config.js dentro de la carpeta ```config``` y agrega lo siguiente.

````
var path = require('path');
var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);
module.exports = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  externals: [
    (function () {
        var IGNORES = ["fs","child_process","electron","path","assert","cluster","crypto","dns","domain","events","http","https","net","os","process","punycode","querystring","readline","repl","stream","string_decoder","tls","tty","dgram","url","util","v8","vm","zlib"];
        return function (context, request, callback) {
            if (IGNORES.indexOf(request) >= 0) {
                return callback(null, "require('" + request + "')");
            }
            return callback();
        };
    })()
  ],
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      }
    ]
  },
  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
````
 
6) Crea un directorio llamado ```electron````

7) Agrega un archivo nombrado ```electron.js``` dentro de la carpeta ```electron``` y pega lo siguiente.

````
'use strict';
const electron = require('electron');
// Module to control application life.
const {
    app } = electron;
// Module to create native browser window.
const {
    BrowserWindow
} = electron;
let win;
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1024,
        height: 600
    });
    var url = 'file://' + __dirname + '/../www/index.html';
    var Args = process.argv.slice(2);
    Args.forEach(function (val) {
        if (val === "test") {
            url = 'http://localhost:8100'
        }
    });
    // and load the index.html of the app.
    win.loadURL(url);
    // Open the DevTools.
    win.webContents.openDevTools();
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
````

8) Volvemos al archivo ```package.json``` y agregamos los siguientes scripts a los que ya existen.

````
"dev": "nf start",
"start":"ionic-app-scripts serve",
"electron dist": "electron .",
"ebuild":"npm run build && node_modules/.bin/build",
````

{% include blog/subscribe.html %}

9) Debido a que si miras las dependencias hemos agregado ```foreman``` debemos crear su archivo de configuración. Nos ubicamos en la raiz de nuestro proyecto y creamos un nuevo archivo llamado ```Procfile``` con lo siguiente:

````
ionic: npm start
electron: node electron-wait-ionic.js
````
10) Por ultimo vamos a agregar un nuevo archivo llamado ```electron-wait-ionic.js``` y agregamos lo siguiente:

````
const net = require('net');
const port = 8100;
process.env.E_URL = `http://localhost:${port}`;
const client = new net.Socket();
let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const exec = require('child_process').exec;
            exec('electron .');
        }
    }
);
tryConnection();
client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});

````

Perfecto, ahora debemos ejecutar nuestro proyecto con:

````
npm run dev
````




