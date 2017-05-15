---
layout: post
title: "Reduce el tiempo de carga de tu app"
keywords: "migrar de ionic 2 a ionic 3, de ionic 2 a ionic 3, ionic 2 a ionic 3, ionic 3, ionic page, lazy loading"
date: 2017-04-25
tags: [tips, news]
categories: tips
author: nicobytes
cover: "/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/cover.jpg"
repo: https://github.com/ion-book/demo112
versions:
  - title: 'ionic'
    number: '3.2.0'
  - title: 'ionic-native'
    number: '3.7.0'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.0'
  - title: 'ionic-cli'
    number: '3.0.0'
---

> Hace poco publicamos un artículo donde explicamos cómo actualizar una aplicación de la versión de [**ionic 2 a ionic 3**]({{site.urlbloglog}}/news/ionic-v-3){:target="_blank"}, pero sin usar el decorador @IonicPage ni lazy loading que son dos de las principales características en ionic 3.

<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/cover.jpg"></amp-img>

**Nota:** En este artículo explicaremos cómo aprovechar estas nuevas características de ionic 3, pero si estas usando ionic 2, primero lee [**cómo migrar de ionic 2 a ionic 3**]({{site.urlbloglog}}/news/ionic-v-3){:target="_blank"} para seguir este artículo.

Una de las principales características de ionic 3 está en el manejo de las urls, esto para poder dar un mejor soporte a deeplinks, aplicaciones con electron y [**progressive web apps (PWA)**](http://blog.ionic.io/announcing-pwa-support-in-ionic-2/){:target="_blank"}.

Pero ¿qué quiere decir esto?, si revisamos ionic 2 no maneja un seguimiento por urls de la aplicación, esto no tiene problemas si la app corre como app nativa en Android o iOS. Pero esto es muy necesario para aplicaciones que viven en la web como una PWA.

En resumen todo el historial de navegación con ionic 3 va quedando registrada en la url, por ejemplo:

```
http://localhost:8100/#/home
http://localhost:8100/#/events
http://localhost:8100/#/event/123
```

## ¿Qué es @IonicPage?

Este seguimiento de urls ahora se puede habilitar con el nuevo decorador @IonicPage que trabaja de la mano con NavController y aún más importante permite habilitar la función “lazy loading” en las páginas.

@IonicPage se incluye como decorador en cada página, antes del decorador @Component así:

### Sin @IonicPage

```ts
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
```

### Con @IonicPage

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
```

Con __@IonicPage__ podremos habilitar a cada página **lazy loading**, que básicamente lo que hace es que carga una pagina solo cuando es necesario. Entonces ya no sera obligacion cargar todas las páginas al inicio de la aplicación, ahora la página es cargada cuando en verdad sea necesario y **como resultado esto puede reducir el tiempo de carga de nuestra aplicación.**

Usar **@IonicPage** implica crear un módulo de la página usando **@NgModule**, que se usa para configurar dependencias de una parte específica de la aplicación, antes teníamos un solo modulo, `app.module.ts` pero podemos crear tantos como queramos.

Ahora vamos a ir convirtiendo [pasito a pasito](https://www.youtube.com/watch?v=kJQP7kiw5Fk){:target="_blank"} una aplicación que no usa **@IonicPage** a otra que sí lo hará y viendo cuales son las variaciones.

## Paso 1: Crear una página

Vamos a usar ionic generate para crear una página `ionic g page users`, esto ahora nos trae un archivo más que se llama users.module.ts, asi:

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="395" height="130" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree1.png"></amp-img>
  </div>
</div>

Puedes que tengas un error en users.module.ts (bug en el generador de ionic), pero debemos importar `IonicPageModule` y usarlo de esta manera:

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersPage } from './users';

@NgModule({
  declarations: [
    UsersPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersPage)
  ],
  exports: [
    UsersPage
  ]
})
export class UsersModule {}
```

{% include blog/subscribe.html %}

## Paso 2: Remover página de declarations y entryCompomntes

Ahora como las páginas se van a cargar solo cuando sea necesario ya no deben ir en el array de declarations y entryCompomntes de `src/app/app.module.ts`, el archivo deberá lucir así:

```ts
...
@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [...]
})
export class AppModule {}
```

## Paso 3: Cambios en navegación

Tampoco es necesario importar la página desde la página donde se quiere hacer `push` o `setRoot`, solo con el nombre de la clase como string, se puede hacer uso de push o seeRoot, asi:

```ts
goToPage(){
  this.navCtrl.push('UsersPage', {...});
}
```

También aplica para los modales así:

```ts
openModal(){
  let modal = this.modalCtrl.create('UsersPage', {...});
  modal.preset();
}
```

Y ya! Eso es todo ahora ya estás trabajando con esta increíble característica, pero una cosa más, trabajar con @NgModule tiene sus ventajas pero también implica un trabajo de más y hay dos problemas comunes que pueden tener, que resolveremos a continuación con estos tips:


## Tip 1: Trabajando con componentes, pipes y directives.

Ahora como cada página es un módulo deberás importar tus components, pipes y directives en cada una de las páginas, de lo contrario no funcionarán, para este paso seguiremos la guía de estilo de Angular. 

**Angular** tiene toda una sección de buenas prácticas para desarrollar una aplicación escalable y mantenible, puedes ver toda la guía [aqui](https://angular.io/docs/ts/latest/guide/style-guide.html){:target="_blank"}. Vamos seguir la regla [STYLE 04-10](https://angular.io/docs/ts/latest/guide/style-guide.html#!#04-10){:target="_blank"}, que nos dice como crear un módulo compartido que será implementando en otros módulos. Ha este módulo lo nombraremos **SharedModule**.

Ionic crear una carpeta de componentes y pipes pero nosotros lo organizaremos nuestros components, directives y pipes en base a la buena práctica de Angular de esta manera:

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="574" height="307" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree2.png"></amp-img>
  </div>
</div>

Nota: en el módulo compartido solo van components, pipes y directives NO providers estos si deben ser incluidos solo una vez en la aplicación, y siguen estando declarados en app.module.ts en el array de providers.

Nuestro archivo shared.module.ts, quedará de esta manera:

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemUserComponent } from './components/item-user/item-user';
import { HighlightDirective } from './directives/highlight/highlight';
import { ReversePipe } from './pipes/reverse';

@NgModule({
  declarations: [
    ItemUserComponent,
    HighlightDirective,
    ReversePipe,
  ],
  imports: [],
  exports: [
    ItemUserComponent,
    HighlightDirective,
    ReversePipe,
  ]
})
export class SharedModule {}
```

Y ahora donde queramos usar cualquiera de estos componentes en una de nuestras páginas, debemos importar el módulo SharedModule en el módulo de la página así:

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { UsersPage } from './users';

@NgModule({
  declarations: [
    UsersPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersPage),
    SharedModule
  ],
  exports: [
    UsersPage
  ]
})
export class UsersModule {}
```

## Tip 2: Usando el SDK ionic dentro de componentes propios

Si dentro de nuestros propios componentes queremos usar alguna funcionalidad de ionic debemos agregar `IonicModule` dentro del módulo SharedModule, asi:

```ts
import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { ItemUserComponent } from './components/item-user/item-user';
import { HighlightDirective } from './directives/highlight/highlight';
import { ReversePipe } from './pipes/reverse';

@NgModule({
  declarations: [
    ItemUserComponent,
    HighlightDirective,
    ReversePipe,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ItemUserComponent,
    HighlightDirective,
    ReversePipe,
  ]
})
export class SharedModule {}
```

Como parte final hemos hecho un repositorio de ejemplo con esta arquitectura y cómo usar correctamente **@IonicPage**. El proyecto está organizado así:

<div class="row wrap">
  <div class="col col-100 col-md-33 col-lg-33">
    <amp-img width="346" height="173" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree3.png"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <amp-img width="270" height="72" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree5.png"></amp-img>
  </div>
  <div class="col col-100 col-md-33 col-lg-33">
   <amp-img width="370" height="300" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree6.png"></amp-img>
  </div>
</div>  

<div class="row">
  <div class="col col-100 col-md-50 offset-md-25 col-lg-50 offset-lg-25">
    <amp-img width="460" height="626" layout="responsive" src="/images/posts/tips/2017-04-24-ionic-page-and-lazy-loading/tree4.png"></amp-img>
  </div>
</div>

