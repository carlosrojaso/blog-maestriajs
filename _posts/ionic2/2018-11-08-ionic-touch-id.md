---
layout: post
title: "Ionic +  iOS TouchID / Android fingerprint"
tags: [tips, fingerprint, touchid]
date: 2018-11-08
categories: ionic3
author: javico2609
cover: "/images/posts/ionic2/2018-11-08-ionic-touch-id/cover.jpg"
versions:
  - title: 'ionic'
    number: '3.20.0'
  - title: 'ionic-app-scripts'
    number: '3.1.9'
  - title: 'cordova-cli'
    number: '8.1.2'
  - title: 'ionic-cli'
    number: '4.3.1'
---

> Uno de los de los requerimientos más comunes en las aplicaciones móvil en los tiempos que corren es que permita hacer auto-login o que de alguna manera le ahorre al cliente el tener que escribir todo el tiempo el user + password.
<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2018-11-08-ionic-touch-id/cover.jpg"></amp-img>

{% include general/net-promoter-score.html %} 

Algunos de los mecanismos más usado es la autenticacion mediante JWT donde el servidor de alguna forma aumentaba el tiempo de espiración del token para que el cliente sufriera lo menos posible a la hora de hacer login, pero esta solución conlleva riesgos de seguridad y un manejo mas profundo del lado del servidor. Otra solución es guardar el user y password en el storage lo cual simplemente no es recomendable bajo ningún concepto.

Lo que vamos a hacer es un pequeño demo de como podemos beneficiarnos de los métodos de autenticación que ya nos brinda el smartphone, donde le vamos a pedir que nos encrypt y guarde el password en un lugar seguro por nosotros para después pedírselo y hacer el proceso de auto-login.

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic:

```
ionic start ionic-touch-id blank --cordova
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto:

```
cd ionic-touch-id
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img  width="376" height="183" layout="responsive" src="/images/posts/ionic2/2017-05-19-ionic-redux/tree1.png"></amp-img>
  </div>
</div>

{% include blog/subscribe.html %}


## Paso 2: Instalar las dependencias de ionic/native

```
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage

ionic cordova plugin add cordova-plugin-keychain-touch-id
npm install --save @ionic-native/keychain-touch-id
```

1. **@ionic/storage** nos va a permitir almacenar en el telefono el username
1. **@ionic-native/keychain-touch-id** nos va a permitir trabajar con touch-id o fingerprint

## Paso 3: Configuración del storage

`app.module.ts`

```ts
 IonicStorageModule.forRoot({
  name: '__demo-touch-id-db',
  driverOrder: ['indexeddb', 'sqlite', 'websql']
}),
```

## Paso 4: Configurar la pantalla login

el metodo `this.touchIdHelper.tryAuth()` retorna un `Promise<boolean>`

case false:
  - No esta habilitado el touch id
  - El usuario no ha configurado ninguna huella dactilar en el smartphone
  - El smartphone no soporta touch-id
  - El usuario no seteo en nuestra app el touch-id
  - El usuario dio tap en el cancelar de la ventana de auth con touch-id

```ts
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {

  public formGroup: FormGroup;

  constructor(private store: Store<AppState>,
              private formBuilder: FormBuilder,
              private touchIdHelper: TouchIdHelper) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ionViewDidEnter() {
    // intentaremos primero hacer login usando el touch-id o fingerprint según corresponda
    this.touchIdHelper.tryAuth().then(valid => {
     // ....
    });
  }

  login() {
     // login stuff
  }
}
```

## Paso 5: Configurar en nuestra app la posibildad de hacer login con touch-id

Normalmente forma parte del profile/settings o profile/security

`pages\profile.ts`

```ts
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private touchIdHelper: TouchIdHelper) {

  }

  toggleTouchId() {
    if (this.enableTouchId) {
      this.touchIdHelper.verifyTouchAuth().then((status: boolean) => {

      });
    }
    else {
      this.touchIdHelper.verifyDeleteTouchAuth();
    }
  }
}

```

`touch-id.helper.ts`

`userInfo` - contiene los datos del current usuario

```ts
@Injectable()
export class TouchIdHelper {

  constructor(
    private storage: Storage,
    private platform: Platform,
    private keychainTouchId: KeychainTouchId,
    private alertCtrl: AlertController) {

  }

  public verifyTouchAuth(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.alertCtrl.create({
        title: 'LOGIN',
        message: 'Insertar el password que se usa para entrar en la app',
        inputs: [
          {
            name: 'password',
            placeholder: 'PASSWORD',
            type: 'password',
          },
        ],
        buttons: [
          {
            text: 'CANCEL',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: 'SAVE',
            handler: data => {
              this.saveTouchAuthCredential(data).then( status => resolve(status));
            },
          },
        ],
      }).present();
    });
  }

  public verifyDeleteTouchAuth(): void {
    this.alertCtrl.create({
      title: this.translate.instant('LOGIN'),
      message: 'Desea inhabilitar el autentificar usando huella digital?',
      buttons: [
        {
          text: 'CANCEL',
          handler: () => {
          },
        },
        {
          text: 'DELETE',
          handler: () => {
             // RemoveTouchAuthCredential
          },
        },
      ],
    }).present();
  }

  public async isAvailable(): Promise<boolean> {
    try {
      if (this.platform.is('android') || this.platform.is('ios')) {
        return await this.keychainTouchId.isAvailable();
      }
    }
    catch (e) {
    }

    return new Promise<boolean>((resolve, reject) => resolve(false));
  }

  public async tryAuth(): Promise<boolean> {
    try {
      const isAvailable = await this.isAvailable();

      // if touch id it's available
      if (isAvailable) {
        const auth: { username: string, token: string } = await <any>this.storage.get(props.FINGER_PRINT_KEY);

        // if exist in the store the username
        if (auth && auth.username) {
          const password = await this.keychainTouchId.verify(auth.username, 'LOGIN');

          // If have a correct password, trying send a request to login action
          if (password) {

            // call login stuff {username: auth.username, password}

            return true;
          }
        }

        return false;
      }
    }
    catch (e) {
    }

    return new Promise<boolean>((resolve, reject) => resolve(false));
  }

  private async saveTouchAuthCredential({password}): Promise<boolean> {
    try {
      const user = this.userInfo;
      const isAvailable = await this.isAvailable();

      if (isAvailable) {
        await this.keychainTouchId.save(user.userName, password);
        await this.storage.set(props.FINGER_PRINT_KEY, {username: user.userName, token: +Date.now()});
        return true;
      }
    }
    catch (e) {
      console.log(e);
    }

    return false;
  }
}

```


Como resultado tenemos que una vez que el usuario configura en nuestra app la autenticación mediante huella digital en el login siempre se va a intentar primero hacer login de esta forma.

En resumen lo que se hace es guardar el password usando touch-id para después en el login pedírselo si puso bien la huella y ejecutar el login de toda la vida con el {username, password} así evitamos que el usuario entre siempre los datos y el servidor no tenga que extender el tiempo de espiración del JWT

`el demo fue probado solo en android.`

<div class="row">
  <div class="col col-33 col-md-33 col-lg-33">
    <amp-img width="410" height="716" layout="responsive" src="/images/posts/ionic2/2018-11-08-ionic-touch-id/touch.png"></amp-img>
  </div>
</div>