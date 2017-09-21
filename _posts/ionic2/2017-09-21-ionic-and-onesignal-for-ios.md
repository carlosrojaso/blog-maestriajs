---
layout: post
title: " PushNotification para IOS"
keywords: "ionic push notifications, OneSignal, push notifications, notifications, notifications en ionic 2, OneSignal y ionic"
date: 2017-09-21
tags: [push, native]
categories: ionic2
author: nicobytes
repo: "https://github.com/ion-book/demo120"
cover: "https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fcover.jpg?alt=media&token=8bf070cb-51e0-445e-981f-85d9fcac6ded"
versions:
  - title: 'ionic'
    number: '3.6.1'
  - title: 'ionic-native'
    number: '4.2.1'
  - title: 'ionic-app-scripts'
    number: '2.1.4'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.10.3'
---

> Ya hemos hecho la configuración de push [notifications para Android](https://www.ion-book.com/blog/ionic2/ionic-and-onesignal/){:target="_blank"}, así que ahora en este artículo vamos a hacer las configuraciones para push notifications en IOS.
<!--summary-->

<amp-img width="1024" height="512" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fcover.jpg?alt=media&token=8bf070cb-51e0-445e-981f-85d9fcac6ded" alt="Ionic Push Notifications"></amp-img>

{% include general/net-promoter-score.html %} 

OneSignal es un servicio que provee push notifications de forma gratuita y varias empresas tienen su sistema de push con este servicio.

<amp-img width="1235" height="175" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fscreen1.png?alt=media&token=3ac903a2-e59e-4d10-8c0b-4f4e65858daf" alt="Ionic Push Notifications"></amp-img>

Ahora vamos a implementar push notifications para IOS, en el artículo anterior ya creamos una cuenta en OneSignal, si aún no la tienes revisa el artículo anterior donde creamos la cuenta paso a paso.

[Notifications para Android](https://www.ion-book.com/blog/ionic2/ionic-and-onesignal/){:target="_blank"}

Antes de iniciar con la configuración para IOS debes tener estos requisitos:
- Una cuenta en OneSignal
- El AppId que genero OneSignal

Si no lo tienes recuerda que esto lo hicimos en el artículo anterior. [Notifications para Android](https://www.ion-book.com/blog/ionic2/ionic-and-onesignal/){:target="_blank"}

## Generar certificado

Para poder desarrollar y hacer apps para IOS se debe tener una cuenta como desarrollador en Apple, esto cuesta 99 USD al año, si no tienes esta cuenta no podrás generar ningún certificado (Apple Style).

Debes en la cuenta de apple developer tener creado tu [AppID](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingProfiles/MaintainingProfiles.html){:target="_blank"}, registrar tu dispositvo de pruebas y crear el [Provision Profile](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingProfiles/MaintainingProfiles.html#//apple_ref/doc/uid/TP40012582-CH30-SW61){:target="_blank"} .

Para generar el certificado existen dos maneras una manual y la otra es usar la herramienta de OneSignal que se conecta a la cuenta de apple y genera este el certificado. Esta herramienta se llama provisionator.

[Provisionator](https://onesignal.com/provisionator){:target="_blank"}

Desde esta herramienta ingresar con tu correo y contraseña de la cuenta de Apple y el se conecta a tu App.

<amp-img width="950" height="352" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fscreen2.png?alt=media&token=9272ee74-2ad7-41f4-8bd2-6a0335abd1a9" alt="Ionic Push Notifications"></amp-img>

Después de seguir los pasos de provisionator debes tener como resultado un archivo .p12 con una contraseña, así:

<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <amp-img width="644" height="714" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fscreen3.png?alt=media&token=4d787d11-a97e-4951-8683-0fcf21cd41c5" alt="Ionic Push Notifications"></amp-img>
  </div>
</div>

Ahora debes ir la plataforma de OneSignal y configurar la app para IOS:

<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <amp-img width="843" height="346" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fscreen4.png?alt=media&token=dabaf40e-7e7f-486f-9292-1b4f7750c48d" alt="Ionic Push Notifications"></amp-img>
  </div>
</div>

Ahora se debe subir el archivo generado por el provisionator, así:

<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <amp-img width="859" height="538" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fscreen5.png?alt=media&token=411f81cd-9ae3-407b-8590-dcb70c70acdf" alt="Ionic Push Notifications"></amp-img>
  </div>
</div>

## Agregar: Service Extenion

**Se debe tener un dispositivo IOS físico (iPhone, iPad, iPod Touch) ya que los emuladores no soportan probar el sistema de notificaciones. A partir de aquí vamos a realizar todo el proceso con una Mac y un Ipod**

Debemos abrir el proyecto en Xcode para esto debemos generarlo con ionic, así:

```
ionic cordova build ios --prod
```

**Recuerda que debes tener tu entorno preparado en la docs de [cordova](http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html){:target="_blank"} esta como.**

**Si trabajas con la ultima version de cordova para IOS (4.5.0), antes de compilar debes remover el plugin de `cordova-plugin-console`, puedes ver más detalle [aquí](http://cordova.apache.org/announcements/2017/09/08/ios-release.html){:target="_blank"}**

Después de esto debes abrir Xcode y abrir el archivo `**.xcworkspace` que se encuentra dentro de `platforms/ios/**.xcworkspace`, así:

<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <amp-img width="910" height="438" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fscreen6.png?alt=media&token=d09e09b6-7d18-479e-92b5-a376cdfb66e4" alt="Ionic Push Notifications"></amp-img>
  </div>
</div>

Ahora luego de tener abierto Xcode con el proyecto generado por ionic, debemos ir a: 
- File > new > target
- Seleccionar `Notification Service Extension` y oprimir `Next`.

<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <amp-img width="730" height="519" layout="responsive" src="https://files.readme.io/74a6d44-Xcode_create_notification_service_extension_1.png" alt="Ionic Push Notifications"></amp-img>
  </div>
</div>

- Se pone como nombre `OneSignalNotificationServiceExtension` y oprimir `Finish`.

<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <amp-img width="730" height="519" layout="responsive" src="https://files.readme.io/1abfb4e-Xcode_create_notification_service_extension_2.png" alt="Ionic Push Notifications"></amp-img>
  </div>
</div>

- Después va a aparecer un mensaje de este tipo:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="420" height="233" layout="responsive" src="https://files.readme.io/5c47cf5-Xcode_create_notification_service_extension_3.png" alt="Ionic Push Notifications"></amp-img>
  </div>
</div>

- Oprime `Cancel`.
- Ahora debemos abrir el archivo `NotificationService.m`, que se encuentra en `platforms/ios/OneSignalNotificationServiceExtension/NotificationService.m` y pegamos el siguiente código en el archivo.

```
#import <OneSignal/OneSignal.h>

#import "NotificationService.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNNotificationRequest *receivedRequest;
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.receivedRequest = request;
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    
    [OneSignal didReceiveNotificationExtensionRequest:self.receivedRequest withMutableNotificationContent:self.bestAttemptContent];
    
    self.contentHandler(self.bestAttemptContent);
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    
    [OneSignal serviceExtensionTimeWillExpireRequest:self.receivedRequest withMutableNotificationContent:self.bestAttemptContent];
    
    self.contentHandler(self.bestAttemptContent);
}

@end
```

## OneSignal + Xcode

Lo primero que debemos hacer es configurar cocoapods, para poder gestionar las dependencias dentro un proyecto IOS se usa [cocoapods](https://cocoapods.org/){:target="_blank"} que es el gestor dependencias como el gradle(https://gradle.org/){:target="_blank"} en Android.

Para verificar que cocoapods está instalado se corre el siguiente comando en la terminal:

```
pod --version
```

Si no está instalado, se debe instalar con:

```
sudo gem install cocoapods
```

y luego hacemos `pod init` en la terminal estando ubicados en `platforms/ios/`, debes verificar que el archivo `platforms/ios/Podfile` quede así:

```
target 'project_name' do
  pod 'OneSignal', '>= 2.5.2', '< 3.0'
end

target 'OneSignalNotificationServiceExtension' do
  pod 'OneSignal', '>= 2.5.2', '< 3.0'
end
```

**project_name, es el nombre de la carpeta de la app.**

Luego estando ubicados en `platforms/ios/`, ejecutamos los siguientes comandos en la terminal.

```
pod repo update
pod install
```

Ahora de nuevo vamos a ir a Xcode y habilitar las capacidades de push de la aplicación, así:

<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <amp-img width="907" height="867" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fscreen7.png?alt=media&token=74d52c9f-e56d-46f6-a6f5-551b39170e2c" alt="Ionic Push Notifications"></amp-img>
  </div>
</div>

Ya casi para finalizar debemos ir al archivo `AppDelegate.m` que se encuentra en `platforms/ios/yourNameApp/Classes/AppDelegate.m` y debe quedar así:

```

#import "AppDelegate.h"
#import "MainViewController.h"
#import <OneSignal/OneSignal.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    // Replace '11111111-2222-3333-4444-0123456789ab' with your OneSignal App ID.
    [OneSignal initWithLaunchOptions:launchOptions
                              appId:@"11111111-2222-3333-4444-0123456789ab"
   				 handleNotificationAction:nil
                            settings:@{kOSSettingsKeyAutoPrompt: @false}];
   OneSignal.inFocusDisplayType = OSNotificationDisplayTypeNotification;
   
   // Recommend moving the below line to prompt for push after informing the user about
   //   how your app will use them.
   [OneSignal promptForPushNotificationsWithUserResponse:^(BOOL accepted) {
        NSLog(@"User accepted notifications: %d", accepted);
   }];

    self.viewController = [[MainViewController alloc] init];
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
```

Ahora finalmente puedes conectar el dispositivo de pruebas y compilar la aplicación desde XCode.

<div class="row">
  <div class="col col-100 col-md-80 col-lg-80">
    <amp-img width="629" height="487" layout="responsive" src="https://firebasestorage.googleapis.com/v0/b/ion-book.appspot.com/o/posts%2F2017-09-21-ionic-and-onesignal-for-ios%2Fscreen8.png?alt=media&token=dcd88d08-0cc7-4efc-bb0e-71bc67325be5" alt="Ionic Push Notifications"></amp-img>
  </div>
</div>
