---
layout: post
title: "Ionic 3 + ngrx/store ( Redux )"
tags: [tips, angular2, ionic2, redux, ngrx]
date: 2017-05-19
categories: ionic2
author: javico2609
repo: 'https://github.com/javico2609/ionic-starter-redux'
cover: "/images/posts/ionic2/2017-05-19-ionic-redux/cover.png"
versions:
  - title: 'ionic'
    number: '3.2.1'
  - title: 'ionic-app-scripts'
    number: '1.3.7'
  - title: 'cordova-cli'
    number: '7.0.1'
  - title: 'ionic-cli'
    number: '3.1.2'
---

> Uno de los principales desafíos que presentan las aplicaciones SPA es como mantener el estado de los datos actualizados y de forma consistente a través de toda la aplicación y sus componentes, es por ello que necesitamos utilizar algún contenedor predecible de estado como [**Redux**](http://es.redux.js.org/){:target="_blank"} o [**Flux**](https://github.com/facebook/flux){:target="_blank"}, como resultado de utilizarlo obtenemos un mejor control sobre el estado de la aplicación y herramientas para erradicar los problemas asociados a la mutabilidad de los datos

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2017-05-19-ionic-redux/cover.png"></amp-img>

## Paso 1: Iniciando el proyecto

Lo primero que haremos será iniciar un nuevo proyecto con ionic:

```
ionic start ionic-redux blank
```

Ionic crea una carpeta con el nombre del proyecto, nuestro siguiente paso será ubicarnos dentro a la carpeta del proyecto:

```
cd ionic-redux
```

El proyecto inicia con el template **blank** y por esto tendremos una estructura básica del proyecto, la carpeta en la que vamos a trabajar será `src`:

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="183" layout="responsive" src="/images/posts/ionic2/2017-05-19-ionic-redux/tree1.png"></amp-img>
  </div>
</div>

## Paso 2: Instalar la implementación del patrón  **Redux** [**ngrx/store**](https://github.com/ngrx/store){:target="_blank"}

```
npm install @ngrx/core @ngrx/store @ngrx/store-devtools @ngrx/effects --save
npm install --save-dev ngrx-store-freeze
```

**@ngrx/core @ngrx/store** instalación del core. <br />
**@ngrx/effects** para cuando necesitemos realizar peticiones server-side. <br />
**@ngrx/store-devtools** instalación del la herramienta de desarrollo que nos permite utilizar el [**time-travelling debugger**](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en). <br />
**ngrx-store-freeze** instalación de una librería que nos ayudara a evitar modificar el store directamente cuando estemos en modo dev
<hr/>

## Paso 3: Configuración del Store y los Reducers ( funciones puras )

1 - Crear una carpeta donde vamos a guardar los reducers, selectors, actions, effects. <br />
2 - Crear dentro de la carpeta `redux-states\reducers` un file `index.ts` donde guardaremos la configuración, después crear los reducers y las actions. <br />

<div class="row">
  <div class="col col-100 col-md-50 col-lg-50">
    <amp-img width="376" height="220" layout="responsive" src="/images/posts/ionic2/2017-05-19-ionic-redux/tree2.png"></amp-img>
  </div>
</div>

`redux-states\actions\layout.ts`
```ts
import { Action } from '@ngrx/store';

export const ActionTypes = {
    UPDATE_THEME: '[Layout] Update Theme',
    UPDATE_THEME_COMPLETE: '[Layout] Updated Theme COMPLETE',
    UPDATE_THEME_FAIL: '[Layout] Updated Theme FAIL',
};

export class UpdateThemeAction implements Action {
    type = ActionTypes.UPDATE_THEME;

    constructor(public payload: any) { }
}

export class UpdateThemeFailAction implements Action {
    type = ActionTypes.UPDATE_THEME_FAIL;

    constructor(public payload: any) { }
}

export class UpdateThemeCompleteAction implements Action {
    type = ActionTypes.UPDATE_THEME_COMPLETE;

    constructor(public payload: any) { }
}

export type Actions =
    UpdateThemeAction |
    UpdateThemeCompleteAction |
    UpdateThemeFailAction;
```

`redux-states\reducers\layout.ts`
```ts
import * as layout from '../actions/layout';

export interface State {
    theme: string,
    lang: string,
}

const initialState: State = {
    theme: 'default-theme',
    lang: 'es',
};

export function reducer(state = initialState, action: layout.Actions): State {
    switch (action.type) {

        case layout.ActionTypes.UPDATE_THEME_COMPLETE:
            return Object.assign({}, state, { theme: action.payload.theme });

        default:
            return state;
    }
}
```

`redux-states\reducers\index.ts`
```ts
import { ActionReducer } from '@ngrx/store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';
import * as fromLayout from './layout';

const environment = {
    production: false
}

export interface State {
    layout: fromLayout.State,
}


const reducers = {
    layout: fromLayout.reducer
};

/**
* Creando dos ambientes uno para dev y otro para prod
*
*/
const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}
```

## Paso 4: Activación del Devtools y el Store

Ahora en el arhivo `app.module.ts` inicializamos la configuración de la herramientas y el store.

```ts

import { reducer } from '../redux-states/reducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer, {}),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [...]
})
export class AppModule { }

```

## Paso 5: Ejecutar una acción y suscribirse a un elemento del store.

`pages\home.ts`

```ts

import { Store } from '@ngrx/store';
import * as fromRoot from '../../redux-states/reducers';
import * as layout from '../../redux-states/actions/layout';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  theme$: Observable<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<fromRoot.State>) {
  }

  // suscribirse al elemento `theme` del **store**
  ionViewDidLoad() {
    this.theme$ = this.store.select(s => s.layout.theme);
  }

  //Acción que manda a ejecutar el calculo de un nuevo state en el store
  changeTheme(theme) {
    this.store.dispatch(new layout.UpdateThemeCompleteAction({ theme: theme }));
  }

}

```

`pages\home.html`

```html
    {% raw %}
        <ion-header>

          <ion-navbar>
            <ion-title>Home</ion-title>
          </ion-navbar>

        </ion-header>


        <ion-content padding>

          <button *ngIf="( theme$ | async ) != 'default-theme'" ion-button block (click)="changeTheme('default-theme')" >Default Theme</button>
          <button *ngIf="( theme$ | async ) == 'default-theme'" ion-button block color="secondary" (click)="changeTheme('ion-book-theme')">Ion-book Theme</button>

        </ion-content>
    {% endraw %}
```

## Resultado:

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2017-05-19-ionic-redux/devtool1.png"></amp-img>

<amp-img width="1024" height="512" layout="responsive" src="/images/posts/ionic2/2017-05-19-ionic-redux/devtool2.png"></amp-img>

<br />