---
layout: post
title: "¿Cómo usar webpack-bundle-analyzer en Angular?"
date: 2018-09-21
tags: [angular, news, ionic, bundle, bundlephobia, rendimiento, webpack]
categories: tips
author: nicobytes
video: true
cover: "https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-09-21-webpack-bundle-analyzer%2Fcover.jpg?alt=media&token=d05dfe6e-6a5f-4348-965d-1a798edb7947"
---
> Existen muchas librerías que cotidianamente usamos y con webpack-bundle-analyzer puedes generar un reporte interactivo para analizar el tamaño de la aplicación.

<amp-img width="1280" height="720" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-09-21-webpack-bundle-analyzer%2Fcover.jpg?alt=media&token=d05dfe6e-6a5f-4348-965d-1a798edb7947"></amp-img> 

Cada librería que le agregamos a la aplicación tiene un costo en bytes y esto debe ser tomado en cuenta ya que entre más peso tenga la aplicación puede llegar a tardar en cargar un poco más. Con el paquete de `webpack-bundle-analyzer` se puede generar un reporte de este tipo para aplicaciones Angular:

<amp-img width="1100" height="642" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-09-21-webpack-bundle-analyzer%2Freport.png?alt=media&token=02502b14-5f5e-44fc-8d87-21c6b5e2142d"></amp-img> 

El primer paso para generar el reporte anterior será instalar el paquete dentro de nuestra aplicación Angular con le siguiente comando:

```
npm install --save-dev webpack-bundle-analyzer
```

Una vez que ya temenos instalado el paquete solo debemos generar una aplicación para producción con Angular CLI, de esta manera:

```
ng build --prod --stats-json
```

La bandera `–stats-json` que le agregamos al comando hace que Angular CLI nos genere un archivo llamado `stats.json` con todo el peso de la aplicación segmentado por módulos y paquetes que se usan dentro de la aplicación.

Comúnmente cuando construimos una aplicación para producción, Angular CLI ya nos arroja estadísticas básicas del peso de la aplicación de esta manera:

<amp-img width="1280" height="390" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-09-21-webpack-bundle-analyzer%2Fscreen1.png?alt=media&token=a4ee178a-0a65-4d7a-91cd-c964460ef829"></amp-img> 

Pero ahora con `webpack-bundle-analyzer` instalado podemos generar un reporte más preciso e interactivo, ejecutando el siguiente comando:

```
npx webpack-bundle-analyzer dist/name_folder_your_app/stats.json
```

Y luego simplemente nos arrojará el reporte donde segmenta, el peso de la aplicación por módulos y paquetes, como lo muestra la siguiente imagen:

<amp-img width="1100" height="642" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ngclassroom-8ba81.appspot.com/o/posts%2F2019-09-21-webpack-bundle-analyzer%2Freport.png?alt=media&token=02502b14-5f5e-44fc-8d87-21c6b5e2142d"></amp-img> 

En una herramienta muy útil para analizar el peso de las aplicaciones, en el siguiente video explico a más detalle acerca de esta herramienta.

<amp-youtube width="560" 
            height="315"
            layout="responsive"
            data-videoid="FyLM_LqYfSY"></amp-youtube>
